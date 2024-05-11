from bs4 import BeautifulSoup
import requests
import json
url = "https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses"

page = requests.get(url)

content = page.text


soup = BeautifulSoup(content, "lxml")
table_content = soup.find("table")
table_data=[]

header_name = table_content.thead.tr.find_all("th")
headers = {}
#get headers
if header_name:
    for i in range(len(header_name)):
        headers[i] = header_name[i].text.strip()

data = []
#get row  content
rows = soup.tbody.find_all("tr")
for row in rows:
    tds = row.find_all("td")
    items={}
    for index in headers:
        items[headers[index]] = tds[index].text
    table_data.append(items)

with open("type-char.json", "w") as write_file:
  json.dump({"items": table_data}, write_file)
