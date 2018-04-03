import json
import requests

data = json.load(open('blogData.json'))

for i in range(0, len(data)):
    filename = "Images/" + str(i) + ".jpg"
    imgURL = data[i]["ImageURL"]
    if imgURL != "NULL - image":
        try: 
            req = requests.get(imgURL, timeout = 2)
            if req.status_code == 200:
                f = open(filename, "w")
                f.write(req.content)
                f.close()
        except:
            print "poop"
            
        
