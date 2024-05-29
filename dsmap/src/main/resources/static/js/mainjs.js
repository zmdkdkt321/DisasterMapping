function loadMain() { //main에 main body 부분 비동기 연결
    const config = {
        method: "get"
    };
    fetch("indexContext.html", config)
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
        })
        .catch(error => console.log("fetch 에러!"));
}

function loadMap() { //main에 지도 페이지 비동기 연결
    const config = {
        method: "get"
    };
    fetch("map.html", config)
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
        })
        .catch(error => console.log("fetch 에러!"));
}

function loadMsgList() { //main에 통계 페이지 비동기 연결
    const config = {
        method: "get"
    };
    fetch("msgList.html", config)
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
        })
        .catch(error => console.log("fetch 에러!"));
}

window.onload = loadMain(); //페이지가 로드될 때 indexContext를 화면에 출력

// 페이지가 로드될 때 실행되는 함수
window.onload = function() {
    // 로컬 저장소에서 상태를 가져옵니다.
    var savedState = localStorage.getItem('pageState');

    // 로컬 저장소에 상태가 있다면 상태를 복원합니다.
    if (savedState) {
        document.getElementById('content').value = savedState;
    }
}

// 페이지를 떠날 때 실행되는 함수
window.onbeforeunload = function() {
    // 현재 상태를 로컬 저장소에 저장합니다.
    var currentState = document.getElementById('content').value;
    localStorage.setItem('pageState', currentState);
}

// 페이지가 로드될 때 실행되는 함수
window.onload = function() {
    // 각 섹션의 상태를 복원합니다.
    restoreSectionState('section1');
}

// 페이지를 떠날 때 실행되는 함수
window.onbeforeunload = function() {
    // 각 섹션의 상태를 저장합니다.
    saveSectionState('section1');
}

// 특정 섹션의 상태를 저장하는 함수
function saveSectionState(sectionId) {
    var sectionInput = document.querySelector(`#${sectionId} .section-input`);
    if (sectionInput) {
        var sectionState = sectionInput.value;
        localStorage.setItem(sectionId, sectionState);
    }
}

// 특정 섹션의 상태를 복원하는 함수
function restoreSectionState(sectionId) {
    var sectionInput = document.querySelector(`#${sectionId} .section-input`);
    if (sectionInput) {
        var sectionState = localStorage.getItem(sectionId);
        if (sectionState) {
            sectionInput.value = sectionState;
        }
    }
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

function mapMsgListJson() {
//    fetch("json/maplist.json")
//        .then(response => response.json())
//        .then(data => {
            const data = [
                ["경상남도", "폭우주의보", "2024-00-00"],
                ["진주시", "폭우주의보", "2024-00-00"],
                ["진주시", "폭우특보", "2024-00-00"]
            ];
            const tbody = document.getElementById('mapList');
            data.forEach(rowData => {
                const tr = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
//        });
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

function tr_onclickheddin(){ //테이블 열 추가
    const rows = document.querySelectorAll('.clickable-row');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            // 새로운 tr 요소가 이미 추가된 경우 삭제
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('new-row')) {
                this.nextElementSibling.remove();
            } else {
                // 새로운 tr 요소 추가
                const newRowHTML = `
                    <tr class="new-row">
                        <td colspan='3'><div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div></td>
                    </tr>
                `;
                this.insertAdjacentHTML('afterend', newRowHTML);
            }
        });
    });
}