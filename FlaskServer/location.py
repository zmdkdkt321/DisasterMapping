import csv
import pymysql
import json

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

conn = pymysql.connect(host=config["db"]["HOST"], user=config["db"]["user"], password=config["db"]["password"], db=config["db"]["db"], charset='utf8')
cur = conn.cursor()

cur.execute("INSERT IGNORE INTO REGION VALUES("+str(0)+",'"+"전국"+"',"+str(0)+",NULL,NULL)")

f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] == '해당 시도 전체'):
        print(line)
        cur.execute("INSERT IGNORE INTO REGION VALUES("+line[0]+",'"+line[1]+"',"+str(1)+","+str(0)+","+line[4]+")")


f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    print("cc")
    if(line[7] =='해당 시군구 전체'):
        print(line)
        cur.execute("SELECT id FROM REGION WHERE name='"+line[1]+"'")
        result = cur.fetchall()
        print(result[0][0])
        cur.execute("INSERT IGNORE INTO REGION VALUES("+line[0]+",'"+line[2]+"',"+str(2)+","+str(result[0][0])+","+line[4]+")")


f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] != '해당 시군구 전체' and line[7] != '해당 시도 전체' and line[7] != '법정동(읍면동)'):
        print(line)
        cur.execute("SELECT id FROM REGION WHERE level IN (1,2) AND name='"+line[2]+"'")
        result = cur.fetchall()
        print(result[0][0])
        cur.execute("INSERT IGNORE INTO REGION VALUES("+line[0]+",'"+line[3]+"',"+str(3)+","+str(result[0][0])+","+line[4]+")")
 
f.close()

conn.commit()



conn.close()
