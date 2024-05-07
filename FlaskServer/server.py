import requests
import json
import os

# 플라스크 서버의 URL
url = 'https://www.safetydata.go.kr/V2/api/DSSP-IF-00247'

def readPageNo():
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data["pageNo"]

def writePageNo(pageNo):
    with open(file_path, 'w') as f:
        data = {
            "pageNo": pageNo
        }
        json.dump(data, f)

def getMessageByPage(pageNo):
    params = {
        'serviceKey': '5IF0GM45A509WY1S',
        'pageNo': pageNo,
        'numOfRows': '100',
    }
    response = requests.get(url, params=params)
    # 응답 확인
    count = 0
    if response.status_code == 200:
        data = json.loads(response.text)
        for bodyData in data["body"]:
            print(bodyData)
            count+=1
    else:
        print("에러 발생:", response.status_code)
    return count

print(getMessageByPage(1))

file_path = "data.json"
if os.path.exists(file_path):
    # 파일이 존재하는 경우 JSON 파일 열기
    pageNo = readPageNo()
    while(getMessageByPage(pageNo) == 100):
        pageNo+=1
    print(pageNo)
    writePageNo(pageNo)
else:
    # 파일이 존재하지 않는 경우
    print("JSON 파일이 존재하지 않습니다.")
    writePageNo(0)