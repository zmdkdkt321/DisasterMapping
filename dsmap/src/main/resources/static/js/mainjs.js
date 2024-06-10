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
window.tr_onclickheddin = Client.tr_onclickheddin;