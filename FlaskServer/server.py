import requests
import json
import os
import sys
import pymysql
import time

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

conn = pymysql.connect(host=config["db"]["HOST"], user=config["db"]["user"], password=config["db"]["password"], db=config["db"]["db"], charset='utf8')
cur = conn.cursor()

def getMessageByPage(pageNo):
    url = config["api"]["url"]
    url=url+'?ServiceKey='+config["api"]["serviceKey"]
    url=url+'&pageNo='+str(pageNo)
    url=url+'&numOfRows=100'
    url=url+'&type=json'
    # print(url)
    response = requests.get(url)
    # print(response.url)
    if response.status_code == 200:
        data = json.loads(response.text)
    else:
        print("에러 발생:", response.status_code)
    return [len(data["DisasterMsg"][1]["row"]),data["DisasterMsg"][1]["row"]]


while True:
    pageNo = 1
    while True:
        count,data = getMessageByPage(pageNo)
        print(data[0]["md101_sn"])
        cur.execute("SELECT count(*) FROM message WHERE id="+data[0]["md101_sn"])
        result = cur.fetchall()
        if (result[0][0] == 1): break

        for message in data:
            print("INSERT IGNORE INTO MESSAGE VALUES("+message['md101_sn']+",'"+
                        message['msg']+"','"+
                        message['create_date']+"')")
            cur.execute("INSERT IGNORE INTO MESSAGE VALUES("+message['md101_sn']+",'"+
                        message['msg']+"','"+
                        message['create_date']+"')")
            for locationID in message['location_id'].split(","):
                print("INSERT IGNORE INTO MESSAGE_REGION VALUES("+locationID+",'"+message['md101_sn']+"')")
                cur.execute("INSERT IGNORE INTO MESSAGE_REGION VALUES("+locationID+",'"+message['md101_sn']+"')")
        pageNo+=1
        conn.commit()
    print("wait")
    time.sleep(60)  # 60초 동안 대기