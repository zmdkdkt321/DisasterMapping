import * as Client from '/js/client.js';
import * as Server from '/js/server.js';

// 페이지가 로드될 때 실행되는 함수

window.onload = Client.loadMain;
let sseSource = null;
Server.sseConn(sseSource);
var infowindow = null;
var map = null;
var clusterer = null;
let myList = [];
let polygons = [];

window.addEventListener('beforeunload', function (e) {
    Server.closeSSE(sseSource);
});


export function initMap(){
console.log("initMap");
   if(map==null){
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
}

export function loadMap() { //main에 지도 페이지 비동기 연결
 console.log("loadmap");
//            mapMsgListJson(); //초기 리스트 생성
//            mapMake()//카카오맵 생성 및 클러스트, 마커 생성
    const container = document.getElementById("content");
    container.innerHTML = "";

    document.getElementById('map').style.display = "block";

    initMap();
    noneMapmMsg();
    const myElement = document.getElementById("type");
    myElement.setAttribute("showType", "map");
    fetchDataAndPlotMarkers();
}

export function fetchDataAndPlotMarkers() {
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

            clusterer.clear();
            myList.forEach(function(obj) {
                obj.setMap(null);
            });

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

                var markerPosition = new kakao.maps.LatLng(parseFloat(item.y), parseFloat(item.x));
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                    image: markerImage
                });

                myList.push(marker);
                clusterer.addMarker(marker);

                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayAreaInfo(markerPosition, item, infowindow);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function() {
                     infowindow.setMap(null)
                });

                kakao.maps.event.addListener(marker, 'click', function() {
                    map.setLevel(10);
                    map.panTo(markerPosition);

                    //여기 마커 클릭 이벤트
                    deleteMapMsg();
                    mapMsg(item.name);

                    var code = item.code;
                    var name = item.name;
                    console.log(name,  code);

                    if(code % 1000 != 0){
                        readBLGPolygon(code);
                    }else{
                        readRLGPolygon(code);
                    }
                });
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

export function deleteMapMsg() {
    const table = document.getElementById('mapmsgtable');

    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

}

export function noneMapmMsg() {
    const table = document.getElementById('mapmsgtable');
    while (table.rows.length > 0) {
    table.deleteRow(0);
    }

    const mapmsg = document.getElementById('mapmsg');
    mapmsg.style.display = "none";

}

export function mapMsg(regionName) {
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
                const mapmsg = document.getElementById('mapmsg');
                mapmsg.style.display = "block";
                dataArray.forEach(item => {
                    if(item.name == regionName) {
                        const messageContent = item.messages;
                        messageContent.forEach(msg => {
                            const tbody = document.getElementById('mapmsglist');
                            const tr = document.createElement('tr');

                            tr.id = msg.id;
                            tr.classList.add("clickable-row");

                            const contenttd = document.createElement('td');
                            const datetd = document.createElement('td');

                            contenttd.style.overflow = "hidden";
                            contenttd.style.whiteSpace = "nowrap";
                            contenttd.style.textOverflow = "ellipsis";
                            datetd.style.overflow = "hidden";
                            datetd.style.whiteSpace = "nowrap";
                            contenttd.style.textOverflow = "ellipsis";

                            contenttd.textContent = msg.message;
                            datetd.textContent = msg.date;
                            console.log(msg);

                            tr.appendChild(contenttd);
                            tr.appendChild(datetd);
                            tbody.appendChild(tr);

                        });
                    }

                });
            });

}

// 지역 정보 표시 함수
export function displayAreaInfo(coords, messages) {
    var messageContent = '';
    messageContent += '<div class = "customInfoWindow">' + messages.name + '</div>';

    if (infowindow) infowindow.setMap(null);

    infowindow =  new kakao.maps.CustomOverlay({
        position: coords,
        content: messageContent,
        removable: true,
        zIndex: 3,
        disableAutoPan: true
    });
    infowindow.setMap(map);
}

function displayArea(area) {
      var polygon = new kakao.maps.Polygon({
        map: map,
        path: area.path,
        strokeWeight: 1,
        strokeColor: '#FFF',
        strokeOpacity: 0,
        fillColor: '#298A08',
        fillOpacity: 0.4
      });
      polygons.push(polygon);
    }

    function removePolygon() {
    for (let i = 0; i < polygons.length; i++) {
       polygons[i].setMap(null);
    }
    polygons = [];
    }


    function readRLGPolygon(code){
      fetch("json/polyRLG.json")
            .then(response => response.json())
            .then(geojson => {
                var units = geojson.features;

                removePolygon();
                var coordinates = null;

                for(const feature of units){
                    var id = feature.properties.CTPRVN_CD;

                    if (id == code) {
                      var coordinates = feature.geometry.coordinates;
                      break;
                    }
                }
                addPoly(coordinates);

            })
            .catch(error => console.error('Error fetching GeoJSON:', error));
      }

      function readBLGPolygon(code){
      fetch("json/polyBLG.json")
            .then(response => response.json())
            .then(geojson => {
                var units = geojson.features;

                removePolygon();
                var coordinates = null;

                for(const feature of units){
                    var id = feature.properties.SIG_CD;

                    if (id == code) {
                      var coordinates = feature.geometry.coordinates;
                      break;
                    }
                }
                addPoly(coordinates);

            })
            .catch(error => console.error('Error fetching GeoJSON:', error));
      }

        function addPoly(coordinates){
          var data = [];

          coordinates.forEach(function(coords) {
            var ob = { name: name, path: [] };

            coords.forEach(function(coordinate) {
              ob.path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
            });

            data.push(ob);
          });

          data.forEach(function(item) {
            displayArea(item);
          });
      }



//html 에서 함수를 사용하기 위해 전역으로 등록
window.loadMain = Client.loadMain;
window.loadMap = loadMap;
window.loadMsgList = Client.loadMsgList;
window.updateMainData = Server.updateMainData;
window.tr_onclickheddin = Client.tr_onclickheddin;
window.sbLawArea1_onchange = Client.sbLawArea1_onchange;
window.sbLawArea1_onchange = Client.sbLawArea1_onchange;
window.sbLawArea2_onchange = Client.sbLawArea2_onchange;
window.changeStartDate = Client.changeStartDate;
window.changeEndDate = Client.changeEndDate;
window.msgList  = Client.msgList;
window.nextPage  = Client.nextPage;
window.beforePage  = Client.beforePage;