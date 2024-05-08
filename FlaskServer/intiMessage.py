import requests
import json
import os
import pymysql

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

conn = pymysql.connect(host=config["db"]["HOST"], user=config["db"]["user"], password=config["db"]["password"], db='dws', charset='utf8')
cur = conn.cursor()

# 플라스크 서버의 URL
url = config["api"]["url"]

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
        'serviceKey': config["api"]["serviceKey"],
        'pageNo': pageNo,
        'numOfRows': '100',
        'type':'JSON'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        print(response.text)
        data = json.loads(response.text)
    else:
        print("에러 발생:", response.status_code)
    return [len(data["DisasterMsg"][1]["row"]),data["DisasterMsg"][1]["row"]]

print((getMessageByPage(6)[1]))

pageNo = 1

while True:
    pageCount,data = getMessageByPage(pageNo)
    print(pageNo)
    for message in data:

        print("INSERT IGNORE INTO MESSAGE VALUES("+str(message['md101_sn'])+","+
                    message['msg']+",'"+
                    "STR_TO_DATE("+message['create_date']+"','%Y/%m/%d %H:%i:%s')")
        cur.execute("INSERT IGNORE INTO MESSAGE VALUES("+str(message['md101_sn'])+","+
                    message['msg']+",'"+
                    "STR_TO_DATE("+message['create_date']+"','%Y/%m/%d %H:%i:%s')")
        for locationID in message['location_id'].split(","):
            print("INSERT IGNORE INTO MESSAGE_LOCATION VALUES("+locationID+",'"+message['md101_sn']+"')")
            cur.execute("INSERT IGNORE INTO MESSAGE_LOCATION VALUES("+locationID+",'"+message['md101_sn']+"')")
    if(pageCount < 100): break
    pageNo+=1
writePageNo(pageNo)

conn.commit()
conn.close()