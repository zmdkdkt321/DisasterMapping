import requests
import json
import os
import sys
import pymysql
import time

conn = pymysql.connect(host='127.0.0.1', user='dws', password='dws', db='dws', charset='utf8')
cur = conn.cursor()

# 플라스크 서버의 URL
url = 'https://www.safetydata.go.kr/V2/api/DSSP-IF-00247'

def readPageNo():
    with open("FlaskServer/data.json", 'r') as f:
        data = json.load(f)
    return data["pageNo"]

def writePageNo(pageNo):
    with open("FlaskServer/data.json", 'w') as f:
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
    if response.status_code == 200:
        data = json.loads(response.text)
    else:
        print("에러 발생:", response.status_code)
    return [len(data["body"]),data["body"]]

# print(getMessageByPage(1)[1])

file_path = "FlaskServer/data.json"
if not(os.path.exists(file_path)):
    # 파일이 존재하는 경우 JSON 파일 열기
    sys.exit("초기화부터 시작")

pageNo = readPageNo()

while True:
    pageNo = readPageNo()
    while True:
        pageCount,data = getMessageByPage(pageNo)
        print(pageNo)
        for message in data:
            print("INSERT IGNORE INTO CATEGORY VALUES("+message['DST_SE_ID']+",'"+message['DST_SE_NM']+"')")
            cur.execute("INSERT IGNORE INTO CATEGORY VALUES("+message['DST_SE_ID']+",'"+message['DST_SE_NM']+"')")

            print("INSERT IGNORE INTO MESSAGE VALUES("+str(message['SN'])+","+
                        ("true" if message['EMRG_STEP_NM'] == "안전안내" else "false")+","+
                        message['DST_SE_ID']+",'"+
                        message['MSG_CN'].replace("\'","")+"','"+
                        message['CRT_DT']+"')")
            cur.execute("INSERT IGNORE INTO MESSAGE VALUES("+str(message['SN'])+","+
                        ("true" if message['EMRG_STEP_NM'] == "안전안내" else "false")+","+
                        message['DST_SE_ID']+",'"+
                        message['MSG_CN'].replace("\'","")+"','"+
                        message['CRT_DT']+"')")
            for locationID in message['RCPTN_RGN_ID'].split(","):
                print("INSERT IGNORE INTO MESSAGE_LOCATION VALUES("+str(message['SN'])+",'"+message['DST_SE_NM']+"')")
                cur.execute("INSERT IGNORE INTO MESSAGE_LOCATION VALUES("+str(message['SN'])+",'"+message['DST_SE_NM']+"')")
        if(pageCount < 100): break
        pageNo+=1
    writePageNo(pageNo)
    conn.commit()
    print("wait")
    time.sleep(120)  # 120초(2분) 동안 대기

conn.close()