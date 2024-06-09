import * as Client from '/js/client.js';
import * as Server from '/js/server.js';

// 페이지가 로드될 때 실행되는 함수

window.onload = function() {
    //자기 위치 가져와서
    Server.getLocation()
        .then(position => {
            //그걸로 행정구역 이름 lv1, lv2, lv3 가져오고
            const { latitude, longitude } = position.coords;
            return Server.getAddressFromCoords(latitude, longitude);
        })
        .then(result => {
            //로컬 저장소에 저장한다음
            console.log(result);

            localStorage.setItem('region_lv1_name',result.documents[0].region_1depth_name);
            localStorage.setItem('region_lv2_name',result.documents[0].region_2depth_name);
            localStorage.setItem('region_lv3_name',result.documents[0].region_3depth_name);
            //메인페이지 로드
            Client.loadMain();
        })
        .catch(error => {
            //error code 1 == 권한 거부
            if(error.code == 1){
                console.log("크아악 권한 거부!!!");
            }
        console.error(error.message);
    });
}

let sseSource = null;

Server.sseConn(sseSource);

window.addEventListener('beforeunload', function (e) {
    Server.closeSSE(sseSource);
});

//html 에서 함수를 사용하기 위해 전역으로 등록
window.loadMain = Client.loadMain;
window.loadMap = Client.loadMap;
window.loadMsgList = Client.loadMsgList;