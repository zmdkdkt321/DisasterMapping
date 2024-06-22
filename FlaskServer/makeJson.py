import csv
import pymysql
import json
import requests

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

locationJson = {}

f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] == '해당 시도 전체'):
        locationJson[line[1]] = {"전체":["전체"]}
        
f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] =='해당 시군구 전체'):
        locationJson[line[1]][line[2]] = ["전체"]

locationJson['세종특별자치시']['세종특별자치시'] = ["전체"]

f = open('FlaskServer/location.csv','r')
rdr = csv.reader(f)
for line in rdr:
    if(line[7] != '해당 시군구 전체' and line[7] != '해당 시도 전체' and line[7] != '법정동(읍면동)'):
        locationJson[line[1]][line[2]].append(line[3])
    
del locationJson['경기도']['임진강 수계지역(연천군,파주시)']

with open('FlaskServer/locationJson.json', 'w', encoding='utf-8') as file:
    json.dump(locationJson, file, ensure_ascii=False, indent=4)