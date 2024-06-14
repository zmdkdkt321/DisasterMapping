import requests
import json
import pymysql
import time

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

conn = pymysql.connect(host=config["db"]["HOST"], user=config["db"]["user"], password=config["db"]["password"], db=config["db"]["db"], charset='utf8')
cur = conn.cursor()

def is_valid_json_string(json_string):
    try:
        json.loads(json_string)
        return True
    except json.JSONDecodeError:
        return False
    
def getMessageByPage(pageNo):
    url = config["api"]["url"]
    url=url+'?ServiceKey='+config["api"]["serviceKey"]
    url=url+'&pageNo='+str(pageNo)
    url=url+'&numOfRows=100'
    url=url+'&type=JSON'
    print(url)
    headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': '*/*;q=0.9',
        'Connection': 'keep-alive'
    }
    while(True):
        response = requests.get(url,headers=headers)
        print(response.url)
        if response.status_code == 200:
            print(response.text)
            if(is_valid_json_string(response.text)):
                data = json.loads(response.text)
                return [len(data["DisasterMsg"][1]["row"]),data["DisasterMsg"][1]["row"]]
            else:
                time.sleep(3)
        else:
            print("에러 발생:", response.status_code)

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
            print("INSERT IGNORE INTO MESSAGE_REGION VALUES("+locationID+",'"+message['md101_sn']+"')")

            cur.execute("INSERT IGNORE INTO MESSAGE_REGION VALUES("+locationID+",'"+message['md101_sn']+"')")

        cur.callproc('protest', [message['md101_sn']])

    print(pageCount)

    if(pageNo == 10): break
    pageNo+=1
    
print(pageNo)

conn.commit()
conn.close()