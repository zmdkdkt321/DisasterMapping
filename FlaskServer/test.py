import requests
import json
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
    url = config["api"]["url"]
    url=url+'?ServiceKey='+config["api"]["serviceKey"]
    url=url+'&pageNo='+str(pageNo)
    url=url+'&numOfRows=100'
    url=url+'&type=json'
    print(url)
    response = requests.get(url)
    print(response.url)
    if response.status_code == 200:
        print(response.text)
        data = json.loads(response.text)
    else:
        print("에러 발생:", response.status_code)
    return [len(data["DisasterMsg"][1]["row"]),data["DisasterMsg"][1]["row"]]

pageNo = 1

while True:
    print(pageNo)
    pageCount,data = getMessageByPage(pageNo)
    for message in data:

        print("INSERT IGNORE INTO MESSAGE VALUES("+str(message['md101_sn'])+",'"+
                    message['msg'].replace("\'","")+"',"+
                    "date_format('"+message['create_date']+"','%Y/%m/%d %H:%i:%s'))")
        cur.execute("INSERT IGNORE INTO MESSAGE VALUES("+str(message['md101_sn'])+",'"+
                    message['msg'].replace("\'","")+"',"+
                    "date_format('"+message['create_date']+"','%Y/%m/%d %H:%i:%s'))")
        for locationID in message['location_id'].split(","):
            print("INSERT IGNORE INTO MESSAGE_LOCATION VALUES("+locationID+",'"+message['md101_sn']+"')")
            cur.execute("INSERT IGNORE INTO MESSAGE_LOCATION VALUES("+locationID+",'"+message['md101_sn']+"')")
        cur.callproc('protestx', [message['md101_sn']])
    print(pageCount)
    if(pageNo == 1): break
    pageNo+=1
    
print(pageNo)

conn.commit()
conn.close()