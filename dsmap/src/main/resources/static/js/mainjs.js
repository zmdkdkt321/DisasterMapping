

// TODO [javascript] 비동기에서 reject 처리 추가
// TODO [javascript] 기능 함수로 분리하여 리팩토링
// TODO [javascript] log 생성 및 관리

function loadMain() { //main에 main body 부분 비동기 연결
    const config = {
        method: "get"
    };
    fetch("/indexContext", config)
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;

            //주소 위지 찍는거
            const addressElement = document.getElementsByClassName('addressName');
            if (addressElement) {
                for(var i = 0; i < addressElement.length; i++) {
                    addressElement[i].innerText = localStorage.getItem('region_lv1_name')+" "+localStorage.getItem('region_lv2_name')+" "+localStorage.getItem('region_lv3_name');
                }
            } else {
                console.log("Element with id 'addressName' not found.");
            }

            const config = {
                method: "get"
            };

            //자시 위치에 메시지 몇 건왔는지
            fetch("/total/"+localStorage.getItem('region_lv1_name')+"/"+localStorage.getItem('region_lv2_name')+"/"+localStorage.getItem('region_lv3_name'),{
                method: "get"
            })
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

            //오늘 통계
            fetch("/total/all", config)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    drawChart(data)
                })
                .catch(error => console.log(error));

            const clickedmain = document.getElementById("mainlist");
            const clickedmap = document.getElementById("maplist");
            const clickedlist = document.getElementById("listlist");

            clickedmain.classList.add('gradient-menubackground');
            clickedmap.classList.remove('gradient-menubackground');
            clickedlist.classList.remove('gradient-menubackground');
        })
        .catch(error => console.log("fetch indexContext 에러!"));
}

function loadMap() { //main에 지도 페이지 비동기 연결
    const config = {
        method: "get"
    };
    fetch("/map", config)
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
//            mapMsgListJson(); //초기 리스트 생성
//            mapMake()//카카오맵 생성 및 클러스트, 마커 생성
            //loadmapmarker();
        })
        .catch(error => console.log("fetch 에러!"));
    const clickedmain = document.getElementById("mainlist");
    const clickedmap = document.getElementById("maplist");
    const clickedlist = document.getElementById("listlist");

    clickedmap.classList.add('gradient-menubackground');
    clickedmain.classList.remove('gradient-menubackground');
    clickedlist.classList.remove('gradient-menubackground');
}

function loadMsgList() { //main에 통계 페이지 비동기 연결
    const config = {
        method: "get"
    };
    fetch("/msgList", config)
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
            mapMsgListJson(); //초기 리스트 생성
        })
        .catch(error => console.log("fetch 에러!"));
    const clickedmain = document.getElementById("mainlist");
    const clickedmap = document.getElementById("maplist");
    const clickedlist = document.getElementById("listlist");

    clickedlist.classList.add('gradient-menubackground');
    clickedmain.classList.remove('gradient-menubackground');
    clickedmap.classList.remove('gradient-menubackground');
}

// 페이지가 로드될 때 실행되는 함수
window.onload = function() {
    //자기 위치 가져와서
    getLocation()
        .then(position => {
            //그걸로 행정구역 이름 lv1, lv2, lv3 가져오고
            const { latitude, longitude } = position.coords;
            return getAddressFromCoords(latitude, longitude);
        })
        .then(result => {
            //로컬 저장소에 저장한다음
            console.log(result);
            localStorage.setItem('region_lv1_name',result.documents[0].address.region_1depth_name);
            localStorage.setItem('region_lv2_name',result.documents[0].address.region_2depth_name);
            localStorage.setItem('region_lv3_name',result.documents[0].address.region_3depth_name);
            //메인페이지 로드
            loadMain();
        })
        .catch(error => {
        console.error(error.message);
    });
}

function sbLawArea1_st() {
    //disasterSms_searchinfo.set("sbLawArea2", "");
    sbLawArea1.options.length=0;
    var region = ['전국', '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도'];
    for(var i=0; i<region.length; i++){
        var are1 = document.getElementById('sbLawArea1');
        var op1 = document.createElement('option');
        op1.value = region(i);
        op1.text = region(i);
        are1.appendChild(op2);
    }
}

function sbLawArea1_onchange() {
    //disasterSms_searchinfo.set("sbLawArea2", "");
    sbLawArea2.options.length=0;
    var text = "시군구선택";
    if(sbLawAea1.value == "A00") {
        optionAppendChild(text);
    } else{
        optionAppendChild(text);
        fetch_region();
    }
}

function fetch_region() { //검색에서 시군구 select option 검색
     fetch("json/mapfselect.json")
            .then(response => response.json())
            .then(data => {
                const key = sbLawAea1.value;
                const value = data[key];
                for(var i=0; i<value.length; i++){
                    optionAppendChild(value[i]);
                }
            })
            .catch(error => console.log("fetch 에러!"));
}

function mapMsgListJson() { //메세지리스트 생성
    fetch("json/dummy.json")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('mapList');
            data.forEach(rowData => {
                let msgs = rowData.messages;
                msgs.forEach(cellData => {
                    const tr = document.createElement('tr');
                    tr.id = cellData.id;
//                    tr.classList.add("overflow-hidden");
//                    tr.classList.add("clickable-row");
//                    tr.className.add(cellData.id);
                    tr.onclick = function() {
                        tr_onclickheddin();
                    };
                    //const td = document.createElement('td');
                    const addrtd = document.createElement('td');
                    const contenttd = document.createElement('td');
                    const datetd = document.createElement('td');
//                    const addrdiv = document.createElement('div');
//                    const contentdiv = document.createElement('div');
//                    const datediv = document.createElement('div');

//                    addrdiv.classList.add("overflow-y-hidden");
//                    contentdiv.classList.add("overflow-y-hidden");
//                    datediv.classList.add("overflow-y-hidden");
//                    datetd.classList.add("overflow-y-hidden");

                    addrtd.style.overflow = "hidden";
                    addrtd.style.whiteSpace = "nowrap";
                    contenttd.style.overflow = "hidden";
                    contenttd.style.whiteSpace = "nowrap";
                    datetd.style.overflow = "hidden";
                    datetd.style.whiteSpace = "nowrap";

                    addrtd.textContent = rowData.name;
                    contenttd.textContent = cellData.content;
                    datetd.textContent = cellData.date;
//                    td.textContent = cellData.content;
//                    tr.appendChild(td);
//                    addrtd.appendChild(addrdiv);
//                    contenttd.appendChild(contentdiv);
//                    datetd.appendChild(datediv);
                    tr.appendChild(addrtd);
                    tr.appendChild(contenttd);
                    tr.appendChild(datetd);
                    tbody.appendChild(tr);
                });
            });
        });
}

/*
function optionAppendChild() {
    var are2 = document.getElementById('sbLawArea2');
    var op2 = document.createElement('option');
    //op2.value = '0';
    op2.text = '시군구선택';
    are2.appendChild(op2);
}
*/
function optionAppendChild(value) {
    var are2 = document.getElementById('sbLawArea2');
    var op2 = document.createElement('option');
    op2.value = value;
    op2.text = value;
    are2.appendChild(op2);
}

//function tr_onclickheddin(){
//    const con = document.getElementById("tr_msglist");
//    if(con.style.display == 'none'){
//        con.style.display = 'table-row';
//    } else{
//        con.style.display = 'none';

//    }
//}

function tr_onclickheddin(){ //테이블 상세보기 열 추가
    const rows = document.querySelectorAll('.clickable-row');
    // 이벤트가 발생한 요소
    const clickedTd = event.target;

    // 요소의 id를 가져옴
    const tdId = clickedTd.id;
    rows.forEach(row => {
        row.addEventListener('click', function() {
            // 새로운 tr 요소가 이미 추가된 경우 삭제
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('new-row')) {
                this.nextElementSibling.remove();
                this.nextElementSibling.remove();
            } else {
//                fetch("json/dummy.json")
//                    .then(response => response.json())
//                    .then(data => {
//                        const tbody = document.getElementById('mapList');
//                        data.forEach(rowData => {
//                            let msgs = rowData.messages;
//                            msgs.forEach(cellData => {
//                            const id = cellData.id;
//                            if(id == tdId ){
//                                const addr = rowData.name;
//                                const content = rowData.content;
//                                const date = rowData.date;
//                                // 새로운 tr 요소 추가
                                const newRowHTML = `
                                    <tr class="new-row">

                                          <td>주소</td>
                                          <td>일자</td>
                                          <td>시간</td>
                                    </tr>
                                    <tr class="new-row">

                                          <td colspan='3'>내용</td>
                                    </tr>
                                `;
                                this.insertAdjacentHTML('afterend', newRowHTML);
                            }

//                        });
//                    });
//                });
//            }
        });
    });
}

function loadmapmarker() {
    kakao.maps.load(function() {
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(35.2383, 128.6922),
            level: 3
        };
        var map = new kakao.maps.Map(mapContainer, mapOption);


        var clusterer = new kakao.maps.MarkerClusterer({
                        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
                        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                        minLevel: 6 // 클러스터 할 최소 지도 레벨
                    });

            // x,y좌표 데이터 모음
            var coordinates = [
              // 위도 ,경도, count(메시지 개수)
                { "name": "부산", "latitude": 35.1796, "longitude": 129.0756,"count" : 10 },
                { "name": "울산", "latitude": 35.5384, "longitude": 129.3114,"count" : 20 },
                { "name": "창원", "latitude": 35.2272, "longitude": 128.6811,"count" : 30 },
                { "name": "진주", "latitude": 35.1798, "longitude": 128.1076,"count" : 40 },
                { "name": "통영", "latitude": 34.8543, "longitude": 128.4286,"count" : 50 },
                { "name": "거제", "latitude": 34.8801, "longitude": 128.6249,"count" : 60 },
                { "name": "김해", "latitude": 35.2274, "longitude": 128.8714,"count" : 70 },
                { "name": "양산", "latitude": 35.3381, "longitude": 129.0266,"count" : 80 },
                { "name": "사천", "latitude": 35.0031, "longitude": 128.2590,"count" : 90 },
                { "name": "밀양", "latitude": 35.4923, "longitude": 128.7547,"count" : 100 }
            ];

            // 인자는 x,y좌표로
            coordinates.forEach(coord => {
                createMarker(coord);
                });
    });
}

function mapMake(){
    var geocoder = new kakao.maps.services.Geocoder();

    var infowindow = null;
    const mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(35.2383, 128.6922), // 경상남도 중심 좌표
        level : 8 // 지도의 초기 확대 레벨
    };
    // map에 카카오맵 할당
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var clusterer = new kakao.maps.MarkerClusterer({
                map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
                averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                minLevel: 6 // 클러스터 할 최소 지도 레벨
            });

    // x,y좌표 데이터 모음
    var coordinates = [
      // 위도 ,경도, count(메시지 개수)
        { "name": "부산", "latitude": 35.1796, "longitude": 129.0756,"count" : 10 },
        { "name": "울산", "latitude": 35.5384, "longitude": 129.3114,"count" : 20 },
        { "name": "창원", "latitude": 35.2272, "longitude": 128.6811,"count" : 30 },
        { "name": "진주", "latitude": 35.1798, "longitude": 128.1076,"count" : 40 },
        { "name": "통영", "latitude": 34.8543, "longitude": 128.4286,"count" : 50 },
        { "name": "거제", "latitude": 34.8801, "longitude": 128.6249,"count" : 60 },
        { "name": "김해", "latitude": 35.2274, "longitude": 128.8714,"count" : 70 },
        { "name": "양산", "latitude": 35.3381, "longitude": 129.0266,"count" : 80 },
        { "name": "사천", "latitude": 35.0031, "longitude": 128.2590,"count" : 90 },
        { "name": "밀양", "latitude": 35.4923, "longitude": 128.7547,"count" : 100 }
    ];

    // 인자는 x,y좌표로
    coordinates.forEach(coord => {
        var id;
        // id 변수
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(coord.latitude, coord.longitude)
        });
        // 이벤트 함수(마우스를 올렸을 때 해당지역정보 표시)
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            displayAreaInfo(marker.getPosition(), coord.count,coord.name); // 마커 위치 얻어서 지역명,메시지 수 표시
        });

        // 클릭했을때 리스트 조회 하는 함수
        kakao.maps.event.addListener(marker, 'click', function() {
            // id 조회하는 함수하면됨
        });


        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarker(marker);
        });
}

// 마커 만드는 함수


// 지역 정보 표시
function displayAreaInfo(coords, count, name) {
    searchAddrFromCoords(coords, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = '<div>지역 명 : ' + name + '</div>'; // 지역명
            detailAddr += '<div>메시지 수 : ' + count + '</div>'; // 메시지 수

            if (infowindow) infowindow.close();

            infowindow = new kakao.maps.InfoWindow({
                position: coords,
                content: detailAddr,
                removable: true,
                zIndex: 3, // 쌓임 순서를 3으로 지정
                disableAutoPan: true
            });

            infowindow.open(map);
        } else {
            console.error('Failed to get address:', status);
        }
    });
}

//좌표를 받아서 지역명으로 던져준다.
function searchAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

function getAddressFromCoords(latitude, longitude) {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
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

// JSON 데이터를 함수로 받아 그래프를 그리는 함수
function drawChart(jsonData) {
    // JSON 데이터를 파싱하여 지역명과 재난 문자 개수 추출
    const labels = jsonData.map(item => item.name);
    const data = jsonData.map(item => item.count);

    // 색상 팔레트 정의
    const colorPalette = [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(199, 199, 199, 0.2)',
        'rgba(83, 102, 255, 0.2)',
        'rgba(60, 179, 113, 0.2)',
        'rgba(255, 140, 0, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(199, 199, 199, 0.2)'
    ];

    const borderColorPalette = colorPalette.map(color => color.replace('0.2', '1'));

    // 각 데이터 항목에 대해 색상을 순환하여 적용
    const backgroundColors = data.map((_, index) => colorPalette[index % colorPalette.length]);
    const borderColors = data.map((_, index) => borderColorPalette[index % borderColorPalette.length]);

    // 그래프를 그릴 캔버스 요소 선택
    const ctx = document.getElementById('myChart').getContext('2d');

    // Chart.js를 사용하여 그래프 생성
    new Chart(ctx, {
        type: 'bar', // 수직 막대 그래프
        data: {
            labels: labels,
            datasets: [{
                label: '', // 빈 문자열로 설정하여 라벨을 숨김
                data: data,
                backgroundColor: backgroundColors, // 각 지역별로 다른 색상 적용
                borderColor: borderColors, // 각 지역별로 다른 테두리 색상 적용
                borderWidth: 1 // 막대 그래프 테두리 두께
            }]
        },
        options: {
            indexAxis: 'x', // x축을 기준으로 막대를 수직으로 설정
            responsive: true,
            maintainAspectRatio: false, // 비율 유지를 해제
            scales: {
                y: {
                    beginAtZero: true, // y축의 시작을 0으로 설정
                    title: {
                        display: true,
                        text: '메시지 수', // y축 라벨 추가
                        font: {
                            size: 16 // y축 라벨 텍스트 크기 조정
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '지역', // x축 라벨 추가
                        font: {
                            size: 16 // x축 라벨 텍스트 크기 조정
                        }
                    },
                    ticks: {
                        autoSkip: false, // 모든 라벨 표시
                        maxRotation: 0, // 최대 회전 각도
                        minRotation: 0 // 최소 회전 각도
                    },
                    grid: {
                        display: false // x축 그리드 숨기기
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} messages`; // 툴팁에서 지역명을 제외한 메시지 수만 표시
                        }
                    }
                },
                legend: {
                    display: false // 범례 숨기기
                }
            },
            // 막대 너비 조정
            barPercentage: 0.5, // 막대 너비를 50%로 설정
            categoryPercentage: 0.8 // 카테고리 너비를 80%로 설정
        }
    });
}

 const sseUrl = '/events/sse';

    function sseConn() {
        const sseSource = new EventSource(sseUrl);

        sseSource.onmessage = function(event) {
            // TODO [javascript] 이벤트 응답시 fetch 수행
            // TODO [javascript] 포커스 페이지 확인
            console.log("event 발생");
        };

        sseSource.onerror = function(event) {
            console.error('SSE connection error! Reconnecting...');
            sseSource.close(); // 기존 SSE 연결 닫기
            sseConn(); // 다시 연결
        };
    }

 sseConn();
