import requests
from bs4 import BeautifulSoup


def getPostUrls(pages):
    postUrls = []
    for page in pages:
        req = requests.get(page)
        soup = BeautifulSoup(req.content, 'html.parser')
        # change this
        allHtml = soup.find_all(class_="archive-item-link")
        for x in range(0, len(allHtml)):
            postUrls.append("https://www.goingzerowaste.com" + allHtml[x]['href'])
    return postUrls


def getPostContent(postUrls):
    content = {}
    for post in postUrls:
        req = requests.get(post)
        soup = BeautifulSoup(req.content, 'html.parser')

        # get title
        if len(soup.find_all(class_="entry-title")) > 0:
            print soup.find_all(class_="entry-title")[0].get_text()
            conten
        

def main():
    # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    pages = ["https://www.goingzerowaste.com/archives"]
    postUrls = getPostUrls(pages)
    getPostContent(postUrls)

main()
    


