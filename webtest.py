import requests
import csv
import sys
import time
from bs4 import BeautifulSoup

nonWords = "with, at, from, into, during, including, until, against, among, throughout, the, how, my, or, to, and, a, no, towards, upon, concerning, of, to, in, for, on, by, about, like, through, over, before, between, after, since, without, under, within, along, following, across, behind, beyond, plus, except, but, up, around, down, off, above, near, day".split(", ")

def getPostUrls(pages):
    postUrls = []
    for page in pages:
        req = requests.get(page)
        soup = BeautifulSoup(req.content, 'html.parser')

        soup = errorHandling(soup)
        
        # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        allHtml = soup.find_all(class_="archive-item-link")
        for x in range(0, len(allHtml)):
            
            # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            postUrls.append("https://www.goingzerowaste.com" + allHtml[x]['href'])
    return postUrls

# if there is an issue with too many requests this should fix most of it
def errorHandling(soup):
        time.sleep(3)
        # some error handling when you have a bad url becasue of too many requests
        getTitle = soup.find_all(class_="entry-title")
        if len(getTitle) is 0:
            print 'REQ'
            print req.content
            time.sleep(40)
            req = requests.get(post)
            soup = BeautifulSoup(req.content, 'html.parser')
        return soup

    
def getPostContent(postUrls):
    content = []
    for post in postUrls:
        req = requests.get(post)
        soup = BeautifulSoup(req.content, 'html.parser')

        soup = errorHandling(soup)
        
        print "URL " + post

        # get title / CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if len(soup.find_all(class_="entry-title")) > 0:
            content.append(soup.find_all(class_="entry-title")[0].get_text().strip())
            title = soup.find_all(class_="entry-title")[0].get_text()
        else:
            content.append("NULL - title")
            title = "NULL - keywords"

        # get image / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        getImage = soup.find_all(class_="thumb-image")
        if soup.find_all(class_="thumb-image"):
            content.append(getImage[0]['data-image'])
        else:
            content.append("NULL - image")

        # get date / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!11!!!!!
        getDate = soup.find_all(class_="dt-published")
        if len(getDate) > 0:
            content.append(getDate[0].get_text().strip())
        else:
            content.append("NULL - date")

        # writes post URL
        content.append(post.strip())

        # write Blog Name / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!
        content.append("Going Zero Waste")

        # getkeywords
        words = title.split(" ")
        keywords = ""
        for word in words:
            if word.lower() not in nonWords and not word.isdigit():
                keywords = keywords + " " + word
                content.append(keywords.strip())
                writeContent(content)

   
                

def writeContent(content):
    with open('output.tsv', 'a') as f:
        for item in content:
            try:
                f.write((item.strip()) + '|')
            except UnicodeIncodeError:
                f.write("it was not a ascii-encoded unicode string" + '|')
        f.write('\n')

def main():
    
    # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    pages = ["https://www.goingzerowaste.com/archives"]
    postUrls = getPostUrls(pages)
    getPostContent(postUrls)

main()
    


