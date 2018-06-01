# WasteLess

## Intro
Welcome to the home of *WasteLess* (formally known as GetWasted). This repo is the culmination of 6 months of work from 4  undergraduate students from the University of Washington's Informatics program. A requirement of the University of Washington's Informatics program is to complete a Capstone project with one simple goal: solve a problem in this world. Here is our problem solving!

## Overview
WasteLess is an IOS application that is both an educational tool as well as a social media platform for people hoping to become Zero Waste. Zero Waste is a philosophy that encourages the redesign of resource life cycles so that all products are reused.  The overall problem we found was that while many people were interseted in the movement, trying to figure out what information was legit or where even to begin represented a daunting task. Our goal was to help people who are interested in becoming Zero Waste learn more about the movement, form waste-conscious habits, and make friends along the way. 

We started our journey with extensive user research. Interviews were conducted with Zero Wasters as well as people who were interested in the movement in general. We additionally reached out to blogs and online-shops of Zero Wasters to learn more about pain-points for people who are the Zero Waste movement. Based on the information gathered, we synthesized 4 main features: Equip, Connect, Reduce, and Explore. 

* Equip - links to Zero Waste shops that would send low-packing specialty items
* Connect - social media aspect where you could see pictures and tricks posted by your Zero Waste friends
* Reduce - habit forming aspect that would allow you to set goals and reminders (e.g. "stop using plastic straws")
* Explore - links to Zero Waste blogs from professional bloggers. 

In order to provide information for Equip and Explore, we had to hand collect serveral blogs and online stores and scrape them  to form our own database! We of course reached out to the blogs and stores first to get their permission. Additionally everything is directly linked so we are serving basically as free advertising. 

From there, we moved to the designing phase to wrap everything in an aesthetically pleasing manner. This took several design iterations as well as user focus-groups to decide what was working and what wasn't.

Although we are not currently launched on the App store, we hope to continue working on this as a passion project. We have received enough positive feedback that we know there is a user group out there who would love this application. Stay tuned to see if this project comes to light!

## List of Contents
Fair warning: you may see a bit of entropy in action here when trying to navigate our Repo. Here we've summarized the most important locations. 
* "App" directory: this is where a majority of the code lives in order for our application to run! if you navigate inside you will see JS store file, images, several json/JS scripts all necessary for the application to run
* "Data" directory: this is where all the data we have web-scraped in order to provide content for the Equip and Explore pages
* The first few lose files are necessary for our splash-page website to run. This was built with the intention of teaching others about our project

## Summary of Major Techology Decisions 
1. Decision: Choosing to make an IOS application.  <br> Rationale: We wanted people to be able to snap pictures and use this application on the go. This type of free-form movement seemed to better suite a mobile application.
2. Decision: Choosing React-Native as our language of choice. <br> Rationale: We wanted to cater to both the iPhone and Android market and not exclude any potential users.
3. Decision: Using Firebase to store our data. <br> Rationale: It had the best compatibility with React Native.

## Contact Information
* *PM* MacKenzie Olson - mackenzieolson15@gmail.com
* *Dev* Alyssa Holzer - holzealy@uw.edu
* *Dev* Alison McGuire - alimcguire2@gmail.com
* *Design* Michelle Ho - michho@uw.edu
