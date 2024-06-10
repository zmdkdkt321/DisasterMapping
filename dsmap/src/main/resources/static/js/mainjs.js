import * as Client from '/js/client.js';
import * as Server from '/js/server.js';

// 페이지가 로드될 때 실행되는 함수

window.onload = Client.loadMain;

let sseSource = null;
Server.sseConn(sseSource);

window.addEventListener('beforeunload', function (e) {
    Server.closeSSE(sseSource);
});

//html 에서 함수를 사용하기 위해 전역으로 등록
window.loadMain = Client.loadMain;
window.loadMap = Client.loadMap;
window.loadMsgList = Client.loadMsgList;
window.updateMainData = Server.updateMainData;

var infowindow = null;
var clusterer = new kakao.maps.MarkerClusterer({
    map: new kakao.maps.Map(document.getElementById('map'),
         {
             center: new kakao.maps.LatLng(35.2383, 128.6922), // 경상남도 중심 좌표
             level: 8 // 지도의 초기 확대 레벨
         }),
    averageCenter: true,
    minLevel: 6
});

// 페이지 로드 시 JSON 데이터를 가져와서 마커 표시(함수 실행)
window.onload = fetchDataAndPlotMarkers;