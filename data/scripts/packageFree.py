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
        allHtml = soup.find_all(class_="grid__image")
        for x in range(0, len(allHtml)):
            # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            # find the link text
            postUrls.append("https://packagefreeshop.com" + allHtml[x]['href'])
    return postUrls

# if there is an issue with too many requests this should fix most of it
def errorHandling(soup, req, post):
        time.sleep(3)
        # some error handling when you have a bad url becasue of too many requests

        # CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find a class on the page
        getTitle = soup.find_all(class_="shopify-section")
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
        # find the class that has the name of the item
        try:
            content.append(soup.find_all(class_="h2")[0].get_text().strip())
            title = soup.find_all(class_="h2")[0].get_text()
        except:
            content.append("NULL - title")
            title = "NULL - keywords"

        # find the class that has the price of the item
        try:
            getPrice = soup.select("#ProductPrice-product")
            content.append(getPrice[0].get_text())
        except:
            content.append("NULL - price")

        # get image / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # find the class that has image url
        try:
            getImage = soup.find_all(class_="ProductImg-product")
            content.append('https:' + getImage[0]['src'])
        except:
            content.append("NULL - image")

        # writes post URL
        content.append(post.strip())

        # write Blog Name / CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!
        # literally just write the blog's name
        content.append("Package Free")

        # getkeywords
        words_all = re.sub('[^a-zA-Z0-9 \n\.]', '', title.lower())
        words = words_all.split(" ")
        keywords = ""
        for word in words:
            if word.lower() not in nonWords and not word.isdigit():
                keywords = keywords + " " + word
        content.append(keywords.strip())

        writeContent(content)

   
                

def writeContent(content):
    with open('packagefree_output.tsv', 'a') as f:
        for item in content:
            try:
                f.write((item.strip()) + '|')
            except UnicodeEncodeError:
                f.write("it was not a ascii-encoded unicode string" + '|')
        f.write('\n')

def main():

    # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # this is a list 
    pages = ["https://packagefreeshop.com/collections/all", 
    "https://packagefreeshop.com/collections/all/page/2",
    "https://packagefreeshop.com/collections/all/page/3"]
    postUrls = getPostUrls(pages)
    getPostContent(postUrls)

main()

# product name, price, image, link, store name, keywords 

