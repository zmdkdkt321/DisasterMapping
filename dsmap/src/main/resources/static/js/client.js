import * as Server from '/js/server.js';
import * as Main from '/js/mainjs.js';

export function loadMain() { //main에 main body 부분 비동기 연결
    document.getElementById('map').style.display = "none";
    Main.noneMapmMsg();
    markerLvAlarmNone();


    loadMainHTML().then(
        data => {
            const myElement = document.getElementById("type");
            myElement.setAttribute("showType", "main");
            Server.updateMainData();
        })
        .catch(error => {
            //html 불러오기 실패!
            console.error(error.message);
        });
``}

export function loadMainHTML() {
    return fetch("/mainContext", { method: "get" })
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
            return data; // 데이터를 반환하여 다음 .then()에서 사용할 수 있게 함
        })
        .catch(error => {
            console.log("fetch mainContext 에러!");
            throw error; // 에러를 다시 던져 다음 .catch()에서 처리할 수 있게 함
        });
}

export function loadListHTML() {
    return fetch("/msgList", { method: "get" })
        .then(response => response.text())
        .then(data => {
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
            return data; // 데이터를 반환하여 다음 .then()에서 사용할 수 있게 함
        })
        .catch(error => {
            console.log("fetch indexContext 에러!");
            throw error; // 에러를 다시 던져 다음 .catch()에서 처리할 수 있게 함
        });
}

//주소 위지 찍는거
export function setAddress(){
    const addressElement = document.getElementsByClassName('addressName');
    if (addressElement) {
        for(var i = 0; i < addressElement.length; i++) {
            addressElement[i].innerText = localStorage.getItem('region_lv1_name')+" "+localStorage.getItem('region_lv2_name')+" "+localStorage.getItem('region_lv3_name');
        }
    } else {
        console.log("Element with id 'addressName' not found.");
    }
}

export function loadMap() { //main에 지도 페이지 비동기 연결
    const config = {
        method: "get"
    };
    fetch("/map", config)
        .then(response => response.text())
        .then(data => {
            console.log(clusterer);
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;

            Main.fetchDataAndPlotMarkers();
        })
        .catch(error => console.log(error.message));
}

export function loadMsgList() { //main에 통계 페이지 비동기 연결
    document.getElementById('map').style.display = "none";
    const config = {
        method: "get"
    };
    loadListHTML()
        .then(data => {
            //오늘 날짜 등록
            var today = new Date();
            console.log(today.toISOString().slice(0, 10));
            setEndDate(today.toISOString().slice(0, 10));
            today.setDate(today.getDate() - 7);
            console.log(today.toISOString().slice(0, 10));
            setStartDate(today.toISOString().slice(0, 10));
        })
        .catch(error => console.log(error.message));
    Main.noneMapmMsg();
    markerLvAlarmNone();
}

export function sbLawArea1_onchange() {
    const sbLawArea1 = document.getElementById('sbLawArea1');
    const sbLawArea2 = document.getElementById('sbLawArea2');
    const sbLawArea3 = document.getElementById('sbLawArea3');
    if(sbLawArea1.value === "전국"){
        sbLawArea2.innerHTML = '';
        sbLawArea3.innerHTML = '';
        let option = document.createElement('option');
        option.value = "전국";
        option.text = "시군구 선택";
        sbLawArea2.appendChild(option);
        let option2 = document.createElement('option');
        option2.value = "전국";
        option2.text = "읍면동 선택";
        sbLawArea3.appendChild(option2);
    }else{
        sbLawArea2.disabled = false;
        sbLawArea3.disabled = false;
        fetch("json/locationJson.json")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                sbLawArea2.innerHTML = '';
                console.log(data[sbLawArea1.value]);
                console.log(Object.keys(data[sbLawArea1.value]));
                for(let lv2_location of Object.keys(data[sbLawArea1.value])){
                    let option = document.createElement('option');
                    option.value = lv2_location;
                    option.text = lv2_location;
                    sbLawArea2.appendChild(option);
                }
                sbLawArea2_onchange();
            })
            .catch(error => console.log(error.message));
    }
}

export function sbLawArea2_onchange() {
    const sbLawArea1 = document.getElementById('sbLawArea1');
    const sbLawArea2 = document.getElementById('sbLawArea2');
    const sbLawArea3 = document.getElementById('sbLawArea3');
    fetch("json/locationJson.json")
        .then(response => response.json())
        .then(data => {
            sbLawArea3.innerHTML = '';
            for(let lv3_location of data[sbLawArea1.value][sbLawArea2.value]){
                let option = document.createElement('option');
                option.value = lv3_location;
                option.text = lv3_location;
                sbLawArea3.appendChild(option);
            }
        })
        .catch(error => console.log(error.message));
}

export function changeStartDate(){
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    endDate.min = startDate.value;
}
export function changeEndDate(){
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    startDate.max = endDate.value;
}

export function setStartDate(newDate){
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    startDate.value = newDate;
    endDate.min = newDate;
}

export function setEndDate(newDate){
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    startDate.max = newDate;
    endDate.value = newDate;
}

export function markerLvAlarmNone() {
    const elements = document.getElementsByClassName("alarm");
    Array.from(elements).forEach(element => {
            element.style.display = "none";
            console.log("알림 none");
    });
    console.log("알림 none 완료");
}

export function markerLvAlarmBlock() {
    const elements = document.getElementsByClassName("alarm");
    Array.from(elements).forEach(element => {
            element.style.display = "block";
            console.log("알림 block");
    });
    console.log("알림 block 완료");
}

export function fetch_region() { //검색에서 시군구 select option 검색
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

export function msgList(page=0) { //메세지리스트 생성
    const sbLawArea1 = document.getElementById('sbLawArea1');
    const sbLawArea2 = document.getElementById('sbLawArea2');
    const sbLawArea3 = document.getElementById('sbLawArea3');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    const params = {
        offset : page,
        start_date: startDate.value,
        end_date: endDate.value
    };
    const url = `msg/${sbLawArea1.value}/${sbLawArea2.value}/${sbLawArea3.value}?${new URLSearchParams(params).toString()}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('mapList');
            tbody.innerHTML = "";
            let index = 0;

            const messageCount = document.getElementById("messageCount");
            messageCount.innerText = data.size;

            const buttonContainer = document.getElementById('buttonContainer');
            buttonContainer.endPage = Math.floor((data.size-1)/10) + 1;
            buttonContainer.startPage = Math.floor(data.offset/100)*10+1;
            buttonContainer.clickNum = page+1;
            createButtons(buttonContainer.startPage,
                buttonContainer.endPage > buttonContainer.startPage+9?
                    buttonContainer.startPage+9 : buttonContainer.endPage);
            if(data.messages !== null) {
                data.messages.forEach(message => {
                    const tr = document.createElement('tr');
                    tr.classList.add("clickable-row");

                    //const td = document.createElement('td');
                    const addrtd = createTD();
                    const contenttd = createTD();
                    const datetd = createTD();

                    addrtd.textContent = message.name;
                    contenttd.textContent = message.content.substr(0, 25) + "...";
                    datetd.textContent = message.date;

                    tr.appendChild(addrtd);
                    tr.appendChild(contenttd);
                    tr.appendChild(datetd);

                    const insidetr = document.createElement('tr');
                    insidetr.id = "tr" + index;
                    insidetr.style.display = "none";
                    const insideTd = document.createElement('td');
                    insideTd.classList.add("insideTd");
                    insideTd.colSpan = 3;
                    insideTd.textContent = message.content;
                    insidetr.appendChild(insideTd);
                    tr.child = "tr" + index;
                    tr.onclick = function () {
                        foldInsideMessage(tr.child)
                    };

                    tbody.appendChild(tr);
                    tbody.appendChild(insidetr);

                    index++;
                });
            }   
        });
}

function createTD(){
    let td = document.createElement('td');
    td.style.overflow = "hidden";
    td.style.whiteSpace = "nowrap";
    return td;
}

function foldInsideMessage(childID){
    console.log(childID);
    const insideMessage = document.getElementById(childID);
    insideMessage.style.display = insideMessage.style.display==="none"?"":"none";
}

function createButtons(startIndex, endIndex){
    console.log("start", startIndex);
    console.log("end", endIndex);
    const beforePageButton = document.getElementById('beforePage');
    const nextPageButton = document.getElementById('nextPage');
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = "";
    beforePageButton.disabled = (startIndex===1);
    nextPageButton.disabled = (buttonContainer.endPage===endIndex);

    for (let i = startIndex; i <= endIndex; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = "btn btn-outline-primary";
        button.addEventListener('click',()=>{
            buttonContainer.clickNum = Number(button.textContent);
            msgList(Number(button.textContent)-1);
        });
        if(i === buttonContainer.clickNum) button.style.color = "purple"
        buttonContainer.appendChild(button);
    }
}

export function beforePage(){
    const buttonContainer = document.getElementById('buttonContainer');
    createButtons(buttonContainer.startPage-10, buttonContainer.startPage-1);
    buttonContainer.startPage = buttonContainer.startPage-10;
}

export function nextPage(){
    const buttonContainer = document.getElementById('buttonContainer');
    createButtons(buttonContainer.startPage+10,
        buttonContainer.endPage > buttonContainer.startPage+19?
            buttonContainer.startPage+19 : buttonContainer.endPage);
    buttonContainer.startPage = buttonContainer.startPage+10;
}

export function optionAppendChild(value) {
    var are2 = document.getElementById('sbLawArea2');
    var op2 = document.createElement('option');
    op2.value = value;
    op2.text = value;
    are2.appendChild(op2);
}

export function tr_onclickheddin(trObj){ //테이블 상세보기 열 추가
    const rows = document.querySelectorAll('.clickable-row');

    rows.forEach(row => {
        row.addEventListener('click', function(event) {
            // 클릭된 요소가 <tr> 요소인지 확인
            let clickedElement = event.target;

            if (this.nextElementSibling && this.nextElementSibling.classList.contains('new-row')) {
                                            this.nextElementSibling.remove();
                                            this.nextElementSibling.remove();

            } else {
            // 클릭된 요소가 <tr>가 아닐 경우 가장 가까운 <tr>을 찾음
                while (clickedElement && clickedElement.tagName !== 'TR') {
                    clickedElement = clickedElement.parentElement;
                }
                if (clickedElement && clickedElement.tagName === 'TR') {
                    const trId = clickedElement.id; // 클릭된 <tr>의 ID 가져오기

                    const trClassName = clickedElement.className; // 클릭된 <tr>의 클래스 이름 가져오기
                    console.log(trClassName);
                    const classNames = trClassName.split(' ');
                    const elements = document.getElementsByClassName(classNames[1]);
                    // 나중에 하이픈을 다시 공백 문자로 변환
                    //const originalText = trClassName.replace(/-/g, ' ');
                    fetch("json/dummy.json")
                        .then(response => response.json())
                        .then(data => {
                            const tbody = document.getElementById('mapList');
                            data.forEach(rowData => {
                                let msgs = rowData.messages;
                                const addr = rowData.name;
                                for(let j; j<elements.length; j++) {

                                }

                                msgs.forEach(cellData => {
                                const id = cellData.id;

                                const content = cellData.content;
                                const date = cellData.date;
                                console.log(classNames[1]);
                                for(let i=0; i<elements.length; i++) {
                                    console.log(elements[i].id);
                                    console.log(trId);
                                    if(elements[i].id == trId){
                                        const newRowHTML = `
                                            <tr class="new-row">
                                                  <td>${addr}</td>
                                                  <td>${trId}</td>
                                                  <td>${date}</td>
                                            </tr>
                                            <tr class="new-row">
                                                  <td colspan='3'>${content}</td>
                                            </tr>
                                        `;
                                        this.insertAdjacentHTML('afterend', newRowHTML);
                                        break;
                                    }
                                }
//                                if(id == trId){
                                    // 새로운 tr 요소 추가
                                    //여기//
//                                }

                                });
                            });
                        });
                    }
            }
            // 새로운 tr 요소가 이미 추가된 경우 삭제

        });
    });
}

// 지역 정보 표시
export function displayAreaInfo(coords, count, name) {
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

// JSON 데이터를 함수로 받아 그래프를 그리는 함수
export function drawChart(jsonData) {
    // JSON 데이터를 파싱하여 지역명과 재난 문자 개수 추출
    const full_labels = jsonData.map(item => item.fullName);
    const labels = jsonData.map(item => item.name);
    const data = jsonData.map(item => item.count);
    const region = localStorage.getItem('region_lv1_name');

    const backgroundColors = full_labels.map(label =>
        label === region ? 'rgba(255, 0, 0, 0.2)' : 'rgba(75, 192, 192, 0.2)'
    );
    const borderColors = full_labels.map(label =>
        label === region ? 'rgba(255, 0, 0, 1)' : 'rgba(75, 192, 192, 0.2)'
    );

    let chartStatus = Chart.getChart('myChart');
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }
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
                        display: false,
                        text: '메시지 수', // y축 라벨 추가
                        font: {
                            size: 16 // y축 라벨 텍스트 크기 조정
                        }
                    }
                },
                x: {
                    title: {
                        display: false,
                        text: '지역', // x축 라벨 추가
                        font: {
                            size: 8 // x축 라벨 텍스트 크기 조정
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
                },
                title : {
                    display: true, // 제목 표시 여부
                    text: '지역별 재난 문자 수', // 제목 텍스트
                    font: {
                        size: 18, // 제목 폰트 크기
                        weight : 'bold'
                    },
                    color: '#000000'
                }
            },
            // 막대 너비 조정
            barPercentage: 0.5, // 막대 너비를 50%로 설정
            categoryPercentage: 0.8 // 카테고리 너비를 80%로 설정
        }
    });
}

export function headerHide() {
    localStorage.removeItem('region_lv1_name')
    localStorage.removeItem('region_lv2_name')
    localStorage.removeItem('region_lv3_name')
    const addressNames = document.getElementsByClassName("addressName");
    for(let i = 0; i < addressNames.length; i++){
        addressNames[i].innerText = "권한을 허용해 주세요";
    }
    const myAddressCounts = document.getElementsByClassName("myAddressCount");
    for(let i = 0; i < myAddressCounts.length; i++){
        myAddressCounts[i].style.visibility = "hidden";
    }
    const guns = document.getElementsByClassName("gun");
    for(let i = 0; i < guns.length; i++){
        guns[i].style.visibility = "hidden";
    }
}

export function headerShow() {
    const myAddressCounts = document.getElementsByClassName("myAddressCount");
    for(let i = 0; i < myAddressCounts.length; i++){
        myAddressCounts[i].style.visibility = "visible";
    }
    const guns = document.getElementsByClassName("gun");
    for(let i = 0; i < guns.length; i++){
        guns[i].style.visibility = "visible";
    }
}

