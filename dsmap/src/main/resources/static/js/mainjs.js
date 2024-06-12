import * as Client from '/js/client.js';
import * as Server from '/js/server.js';

// 페이지가 로드될 때 실행되는 함수

window.onload = Client.loadMain;
let sseSource = null;
Server.sseConn(sseSource);
var infowindow = null;
var map = null;
var clusterer = null;

initMap();
window.addEventListener('beforeunload', function (e) {
    Server.closeSSE(sseSource);
});

export function initMap(){
    map = new kakao.maps.Map(document.getElementById('map'),
     {
         center: new kakao.maps.LatLng(36.3504, 127.3845),
         level: 13 // 지도의 초기 확대 레벨
     });
    clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 6
    });
    map.setDraggable(true);
}

let myList = [];

export function fetchDataAndPlotMarkers() {
// 데이터 불러오는 부부
    fetch("/msg")
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

            console.log(dataArray);

          var x = localStorage.getItem('x');
          var y = localStorage.getItem('y');

          var imageSrc = 'http://localhost:8080/img/red', // 마커이미지의 주소입니다
              imageSize = new kakao.maps.Size(28, 36), // 마커이미지의 크기입니다
              imageOption = {offset: new kakao.maps.Point(5, 1)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImageGreen = new kakao.maps.MarkerImage('http://localhost:8080/img/green', imageSize, imageOption);
          var markerImageYellow = new kakao.maps.MarkerImage('http://localhost:8080/img/yellow', imageSize, imageOption);
          var markerImageRed = new kakao.maps.MarkerImage('http://localhost:8080/img/red', imageSize, imageOption);


          if (x !== null && y !== null) {
               var mp  = new kakao.maps.LatLng(x, y);

               var m = new kakao.maps.Marker({
                   position: mp,
                   map: map
                   });
          }


            // JSON 데이터를 받아와서 마커를 생성하고 클러스터에 추가
            dataArray.forEach(item => {

                var markerImage = null;
                if(item.message_num == 1){
                    markerImage = markerImageGreen;
                }
                else if(item.message_num == 2){
                    markerImage = markerImageYellow;
                }else{
                    markerImage = markerImageRed;
                }

                var markerPosition = new kakao.maps.LatLng(parseFloat(item.x), parseFloat(item.y));
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                    image: markerImage
                });

                myList.push(marker);
                clusterer.addMarker(marker);

                // 마커에 이벤트 리스너 등록
                kakao.maps.event.addListener(marker, 'click', function() {
                    // 클릭 시 처리할 내용
                });

                // 마우스 호버 이벤트
                // TODO [javascript] 해당 하는 폴리건 표시
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

    clusterer.clear();
    myList.forEach(function(obj) {
        obj.setMap(null);
    });

    const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
    container.innerHTML = "";
    document.getElementById('map').style.display = "block";
    initMap();
    fetchDataAndPlotMarkers();
}

//html 에서 함수를 사용하기 위해 전역으로 등록
window.loadMain = Client.loadMain;
window.loadMap = loadMap;
window.loadMsgList = Client.loadMsgList;
window.updateMainData = Server.updateMainData;
window.tr_onclickheddin = Client.tr_onclickheddin;