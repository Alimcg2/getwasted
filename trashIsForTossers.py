import requests
import csv
import sys
import time
from bs4 import BeautifulSoup
import string
import re

nonWords = "with, at, from, into, during, including, until, against, among, throughout, the, how, my, or, to, and, a, no, towards, upon, concerning, of, to, in, for, on, by, about, like, through, over, before, between, after, since, without, under, within, along, following, across, behind, beyond, plus, except, but, up, around, down, off, above, near, day".split(", ")

def getPostUrls(pages):
    postUrls = []
    for page in pages:
        req = requests.get(page)
        soup = BeautifulSoup(req.content, 'html.parser')

        soup = errorHandling(soup, req, page)
        
        # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class where there is a link to the blog post url
        allHtml = soup.select(".post-more a")
        for x in range(0, len(allHtml)):

            # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            # find the link text
            postUrls.append(allHtml[x]['href'])
    return postUrls

# if there is an issue with too many requests this should fix most of it
def errorHandling(soup, req, post):
        time.sleep(3)
        # some error handling when you have a bad url becasue of too many requests

        # CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find a class on the page
        getTitle = soup.find_all(class_="logo-image")
        if len(getTitle) is 0:
            print('REQ')
            print(req.content)
            time.sleep(40)
            req = requests.get(post)
            soup = BeautifulSoup(req.content, 'html.parser')
        return soup

    
def getPostContent(postUrls):
    for post in postUrls:
        content = []
        req = requests.get(post)
        soup = BeautifulSoup(req.content, 'html.parser')

        soup = errorHandling(soup, req, post)
        
        # print("URL " + post)

        # get title / CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class that has the title of the post
        try:
            content.append(soup.find_all(class_="entry-title")[0].get_text().strip())
            title = soup.find_all(class_="entry-title")[0].get_text()
        except:
            content.append("NULL - title")
            title = "NULL - keywords"

        # get image / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class that has image url
        try:
            getImage = soup.find("div",class_="post-wrap").select('img')
            content.append('https:' + getImage[0]['src'])
            print(getImage[0]['src'])
        except:
            content.append("NULL - image")

        # get date / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!11!!!!!
        # find the class containing the date
        try: 
            getDate = soup.find_all(class_="entry-date")
            content.append(getDate[0].get_text().strip())
        except:
            content.append("NULL - date")

        # writes post URL
        content.append(post.strip())

        # write Blog Name / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!
        # literally just write the blog's name
        content.append("Trash is for Tossers")

        # getkeywords
        words_all = re.sub('[^a-zA-Z0-9 \n\.]', '', title.lower())
        words = words_all.split(" ")
        keywords = ""
        for word in words:
            if word.lower() not in nonWords and not word.isdigit():
                keywords = keywords + " " + word

        categories = soup.find(class_="post-categories").find_all('a')

        for cat in categories:
            keywords = keywords + " " + cat.get_text().strip().lower()
        
        content.append(keywords.strip())

        writeContent(content)

   
                

def writeContent(content):
    with open('trashIsForTossers_output.tsv', 'a') as f:
        for item in content:
            try:
                f.write((item.strip()) + '|')
            except UnicodeEncodeError:
                f.write("it was not a ascii-encoded unicode string" + '|')
        f.write('\n')

def main():

    # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # this is a list 
    pages = ["http://trashisfortossers.com/category/home/",
    "http://trashisfortossers.com/category/home/page/2",
    "http://trashisfortossers.com/category/home/page/3", 
    "http://trashisfortossers.com/category/home/page/4", 
    "http://trashisfortossers.com/category/home/page/5",  "http://trashisfortossers.com/category/bathroom/", 
    "http://trashisfortossers.com/category/bathroom/page/2", 
    "http://trashisfortossers.com/category/bathroom/page/3", 
    "http://trashisfortossers.com/category/bathroom/page/4", 
    "http://trashisfortossers.com/category/kitchen/", 
    "http://trashisfortossers.com/category/kitchen/page/2",
    "http://trashisfortossers.com/category/kitchen/page/3", 
    "http://trashisfortossers.com/category/kitchen/page/4", 
    "http://trashisfortossers.com/category/kitchen/page/5",  
    "http://trashisfortossers.com/category/cleaning/",
    "http://trashisfortossers.com/category/cleaning/page/2",
    "http://trashisfortossers.com/category/food/",
    "http://trashisfortossers.com/category/food/page/2",
    "http://trashisfortossers.com/category/food/page/3", 
    "http://trashisfortossers.com/category/food/page/4", 
    "http://trashisfortossers.com/category/food/page/5",  
    "http://trashisfortossers.com/category/toiletries/",  
    "http://trashisfortossers.com/category/toiletries/page/2",
    "http://trashisfortossers.com/category/toiletries/page/3",  
    "http://trashisfortossers.com/category/travel/",
    "http://trashisfortossers.com/category/travel/page/2",
    "http://trashisfortossers.com/category/travel/page/3", 
    "http://trashisfortossers.com/category/travel/page/4", 
    "http://trashisfortossers.com/category/travel/page/5", 
    "http://trashisfortossers.com/category/travel/page/6", 
    "http://trashisfortossers.com/category/shopping/",   
    "http://trashisfortossers.com/category/shopping/page/2",
    "http://trashisfortossers.com/category/shopping/page/3", 
    "http://trashisfortossers.com/category/shopping/page/4", 
    "http://trashisfortossers.com/category/office/",
    "http://trashisfortossers.com/category/office/page/2"]
    postUrls = getPostUrls(pages)
    getPostContent(postUrls)

main()
    


