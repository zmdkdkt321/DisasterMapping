import pandas as pd
import openpyxl
data = pd.read_excel('지역코드.csv', engine='openpyxl')

print(data)