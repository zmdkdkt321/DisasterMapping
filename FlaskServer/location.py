import csv
import pymysql
import json
import requests


def getGPSByLocation(location):
    url = config["kakaoAPI"]["url"]
    url=url+'?query='+location
    print(url)
    headers = {
        "Authorization" : config["kakaoAPI"]["serviceKey"]
    }
    print(config["kakaoAPI"]["serviceKey"])
    response = requests.get(url,headers=headers)
    print(response.url)
    data = ""
    if response.status_code == 200:
        print(response.text)
        data = json.loads(response.text)
        if len(data["documents"]) == 0:
            return "NULL","NULL"
        return [data["documents"][0]["address"]["x"],data["documents"][0]["address"]["y"]]
    else:
        print("에러 발생:", response.status_code)
    return [data["documents"][0]["address"]["x"],data["documents"][0]["address"]["y"]]

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

conn = pymysql.connect(host=config["db"]["HOST"], user=config["db"]["user"], password=config["db"]["password"], db=config["db"]["db"], charset='utf8')
cur = conn.cursor()

f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] == '해당 시도 전체'):
        print(line)
        x,y = getGPSByLocation(line[1])
        cur.execute("INSERT IGNORE INTO REGION VALUES("+line[0]+",'"+line[1]+"','None','None',"+x+","+y+")")

f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    print("cc")
    if(line[7] =='해당 시군구 전체'):
        print(line)
        print(line)
        x,y = getGPSByLocation(line[1] + " " + line[2])
        cur.execute("INSERT IGNORE INTO REGION VALUES("+line[0]+",'"+line[1]+"','"+line[2]+"','None',"+x+","+y+")")

f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] != '해당 시군구 전체' and line[7] != '해당 시도 전체' and line[7] != '법정동(읍면동)'):
        print(line)
        x,y = getGPSByLocation(line[1] + " " + line[2] + " " + line[3])
        cur.execute("INSERT IGNORE INTO REGION VALUES("+line[0]+",'"+line[1]+"','"+line[2]+"','"+line[3]+"',"+x+","+y+")")
 
f.close()

conn.commit()
conn.close()
