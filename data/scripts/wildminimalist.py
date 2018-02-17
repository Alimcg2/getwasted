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

        soup = errorHandling(soup, page)
        
        # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class where there is a link to the blog post url
        allHtml = soup.find_all(class_="continue-reading")
        for x in range(0, len(allHtml)):
            # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            # find the link text
            postUrls.append("https://wildminimalist.com" + allHtml[x].find_all("a")[0]['href'])
    return postUrls

# if there is an issue with too many requests this should fix most of it
def errorHandling(soup, url):
        time.sleep(3)
        # some error handling when you have a bad url becasue of too many requests

        # CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find a class on the page
        getTitle = soup.find_all(class_="multi-level-nav")
        if len(getTitle) is 0:
            print 'REQ'
            time.sleep(40)
            req = requests.get(url)
            soup = BeautifulSoup(req.content, 'html.parser')
        return soup

    
def getPostContent(postUrls):
    for post in postUrls:
        content = []
        req = requests.get(post)
        soup = BeautifulSoup(req.content, 'html.parser')

        soup = errorHandling(soup, post)
    
            
        # get title / CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class that has the title of the post
        try:
            title = soup.find_all(class_="majortitle")[0].get_text().strip()
            content.append(title)
            print title
        except:
            content.append("NULL - title")
            title = "NULL - keywords"

        # get image / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class that has image url
        try:
            getImage = soup.find_all(class_="article-container")[0].find_all("img")[0]['src']
            content.append("http:" + getImage)
        except:
            content.append("NULL - image")

        # get date / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!11!!!!!
        # find the class containing the date
        try: 
            getDate = soup.find_all(class_="time")
            content.append(getDate[0].get_text().strip())
        except:
            content.append("NULL - date")

        # writes post URL
        content.append(post.strip())

        # write Blog Name / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!
        # literally just write the blog's name
        content.append("Wild Minimalist")

        # remove special characters from title
        words_all = re.sub('[^a-zA-Z0-9 \n\.]', '', title)
        # getkeywords
        words = words_all.split(" ")
        keywords = ""
        for word in words:
            if word.lower() not in nonWords and not word.isdigit():
                keywords = keywords + " " + word
        content.append(keywords.strip())

        writeContent(content)

   
def writeContent(content):
    # possibly chage output.tsv name during testing
    with open('output-wildminimalist.tsv', 'a') as f:
        for item in content:
            printable = set(string.printable)
            itemFiltered = filter(lambda x: x in printable, item)
            f.write((itemFiltered.strip()) + '|')
        f.write('\n')

        
def main():
    # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # this is a list
    pages = ["https://wildminimalist.com/blogs/news"]
    for i in range(2, 5):
        pages.append("https://wildminimalist.com/blogs/news?page=" + str(i))
    postUrls = getPostUrls(pages)
    getPostContent(postUrls)

main()
    


