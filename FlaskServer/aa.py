import requests
import json

with open("FlaskServer/config.json", 'r') as f:
    config = json.load(f)

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
    else:
        print("에러 발생:", response.status_code)
    return [data["documents"][0]["address"]["x"],data["documents"][0]["address"]["y"]]

print(getGPSByLocation("경기도 임진강"))
