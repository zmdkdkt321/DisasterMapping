import * as Client from '/js/client.js';
import * as Server from '/js/server.js';

// 페이지가 로드될 때 실행되는 함수

window.onload = Client.loadMain;

let sseSource = null;
Server.sseConn(sseSource);

window.addEventListener('beforeunload', function (e) {
    Server.closeSSE(sseSource);
});

var infowindow = null;
var map = new kakao.maps.Map(document.getElementById('map'),
 {
     center: new kakao.maps.LatLng(35.2383, 128.6922), // 경상남도 중심 좌표
     level: 8 // 지도의 초기 확대 레벨
 });
var clusterer = new kakao.maps.MarkerClusterer({
    map: map,
    averageCenter: true,
    minLevel: 6
});

export function fetchDataAndPlotMarkers() {
// 데이터 불러오는 부부
    fetch("/json/dummy.json")
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

export function loadMap() { //main에 지도 페이지 비동기 연결
//            mapMsgListJson(); //초기 리스트 생성
//            mapMake()//카카오맵 생성 및 클러스트, 마커 생성
    const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
    container.innerHTML = "";
    document.getElementById('map').style.display = "block";
    fetchDataAndPlotMarkers();
}

//html 에서 함수를 사용하기 위해 전역으로 등록
window.loadMain = Client.loadMain;
window.loadMap = loadMap;
window.loadMsgList = Client.loadMsgList;
window.updateMainData = Server.updateMainData;