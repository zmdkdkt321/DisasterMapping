// JSON 데이터를 함수로 받아 그래프를 그리는 함수
function drawChart(jsonData) {
    // JSON 데이터를 파싱하여 지역명과 재난 문자 개수 추출
    const labels = jsonData.map(item => item.region);
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

// 외부 JSON 파일을 불러와서 그래프를 그리는 함수 호출
fetch("json/graph.json")
    .then(response => response.json())
    .then(data => drawChart(data))
    .catch(error => console.error('Error fetching JSON data:', error));