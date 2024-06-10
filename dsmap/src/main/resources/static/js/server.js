import * as Client from '/js/client.js';

export function updateMainData(){
    getLocation()
        .then(position => {
            //그걸로 행정구역 이름 lv1, lv2, lv3 가져오고
            const { latitude, longitude } = position.coords;
            return getAddressFromCoords(latitude, longitude);
        })
        .then(result => {
            //권한 허용
            Client.locationAuthPermission();
            //로컬 저장소에 저장한다음
            console.log(result);
            localStorage.setItem('region_lv1_name',result.documents[0].region_1depth_name);
            localStorage.setItem('region_lv2_name',result.documents[0].region_2depth_name);
            localStorage.setItem('region_lv3_name',result.documents[0].region_3depth_name);
            //클라쪽 문자열 넣고
            Client.setAddress();
            //현제 지역 메시지수 가져와서 넣고
            updateMessageCountByMyLocation();
            //차트 업데이트
            updateChart();
        })
        .catch(error => {
            //error code 1 == 권한 거부
            if(error.code == 1){
                console.log("크아악 권한 거부!!!");
                Client.locationAuthDenied();
                //차트 업데이트
                updateChart();
            }
            console.error(error.message);
        });
}

export function updateMessageCountByMyLocation(){
    fetch("/total/"+localStorage.getItem('region_lv1_name')+"/"
        +localStorage.getItem('region_lv2_name')+"/"
        +localStorage.getItem('region_lv3_name')
        ,{method: "get"})
        .then(response => response.text())
        .then(data => {
                const countElement = document.getElementsByClassName('myAddressCount');
                if (countElement) {
                    for(var i = 0; i < countElement.length; i++){
                        countElement[i].innerText = data;
                    }
                } else {
                    console.log("Element with id 'myAddressCount' not found.");
                }
            }
        ).catch(error => console.log("오늘거 못가져왔네!!"));
}

export function updateChart(){
    //오늘 통계
    fetch("/total", {method: "get"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            Client.drawChart(data)
        })
        .catch(error => console.log(error));
}

//좌표를 받아서 지역명으로 던져준다.
export function searchAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

export function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

export function getAddressFromCoords(latitude, longitude) {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
    const headers = {
        'Authorization': `KakaoAK f79bf08e7d9f87c71463ed7a992aa26d`
    };

    return fetch(url, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch address");
            }
            return response.json();
        })
        .then(data => {
            if (data.documents && data.documents.length > 0) {
                return data;
            } else {
                throw new Error("No address found for the given coordinates");
            }
        });
}

export function sseConn(sseSource) {
    sseSource = new EventSource('/sse/sub');

    sseSource.addEventListener('event', (e) => {
        const { data: uptTime } = e;
        document.getElementById('time').innerHTML = '<small> 안전재난문자 업데이트 시간 : ' + uptTime + '</small>';
        console.log(uptTime);
        updateMainData();
    });

    sseSource.onerror = function(event) {
        console.error('SSE connection error! Reconnecting...');
        sseSource.close(); // 기존 SSE 연결 닫기
    };
}

export function closeSSE(sseSource) {
    if (sseSource) {
        sseSource.close();
    }
}



// JSON 데이터를 가져와서 처리하는 함수
export function fetchDataAndPlotMarkers(clusterer, infowindow) {
// 데이터 불러오는 부부
    fetch("json/dummy.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let dataArray;
            if (Array.isArray(data)) {
                dataArray = data;
            } else {
                dataArray = [data];
            }

            // JSON 데이터를 받아와서 마커를 생성하고 클러스터에 추가
            dataArray.forEach(item => {
                var markerPosition = new kakao.maps.LatLng(parseFloat(item.x), parseFloat(item.y));
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: markerPosition
                });
                clusterer.addMarker(marker);

                // 마커에 이벤트 리스너 등록
                kakao.maps.event.addListener(marker, 'click', function() {
                    // 클릭 시 처리할 내용
                });

                // 마우스 호버 이벤트
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayAreaInfo(markerPosition, item, infowindow);
                });
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// 지역 정보 표시 함수
export function displayAreaInfo(coords, messages) {
    var messageContent = '';
    messageContent += '<div>지역 명 : ' + messages.name + '</div>';
    messageContent += '<div>메시지 수 : ' + messages.message_num + '</div>'; // 변경: 메시지 수로 표시

    if (infowindow) infowindow.close();

    infowindow = new kakao.maps.InfoWindow({
        position: coords,
        content: messageContent,
        removable: true,
        zIndex: 3,
        disableAutoPan: true
    });
    infowindow.open(map);
}