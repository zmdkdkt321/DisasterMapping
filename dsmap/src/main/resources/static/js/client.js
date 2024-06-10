import * as Server from '/js/server.js';
import * as Main from '/js/mainjs.js';

export function loadMain() { //main에 main body 부분 비동기 연결
    loadMainHTML().then(
        data => {
            Server.updateMainData();
        })
        .catch(error => {
            //html 불러오기 실패!
            console.error(error.message);
        });
}

export function loadMainHTML() {
    return fetch("/mainContext", { method: "get" })
        .then(response => response.text())
        .then(data => {
            document.getElementById('map').style.display = "none";
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
//            mapMsgListJson(); //초기 리스트 생성
//            mapMake()//카카오맵 생성 및 클러스트, 마커 생성
            Main.fetchDataAndPlotMarkers();
        })
        .catch(error => console.log(error.message));

//    const clickedmain = document.getElementById("mainlist");
//    const clickedmap = document.getElementById("maplist");
//    const clickedlist = document.getElementById("listlist");
//
//    clickedmap.classList.add('gradient-menubackground');
//    clickedmain.classList.remove('gradient-menubackground');
//    clickedlist.classList.remove('gradient-menubackground');
}

export function loadMsgList() { //main에 통계 페이지 비동기 연결
    const config = {
        method: "get"
    };
    fetch("/msgList", config)
        .then(response => response.text())
        .then(data => {
            document.getElementById('map').style.display = "none";
            // map-container라는 id를 가진 div 요소를 선택
            const container = document.getElementById("content");
            // 가져온 데이터를 해당 div에 추가
            container.innerHTML = data;
            mapMsgListJson(); //초기 리스트 생성
        })
        .catch(error => console.log("fetch 에러!"));

//    const clickedmain = document.getElementById("mainlist");
//    const clickedmap = document.getElementById("maplist");
//    const clickedlist = document.getElementById("listlist");
//
//    clickedlist.classList.add('gradient-menubackground');
//    clickedmain.classList.remove('gradient-menubackground');
//    clickedmap.classList.remove('gradient-menubackground');
}

export function sbLawArea1_st() {
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

export function sbLawArea1_onchange() {
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

export function mapMsgListJson() { //메세지리스트 생성
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

export function optionAppendChild(value) {
    var are2 = document.getElementById('sbLawArea2');
    var op2 = document.createElement('option');
    op2.value = value;
    op2.text = value;
    are2.appendChild(op2);
}

export function tr_onclickheddin(){ //테이블 상세보기 열 추가
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