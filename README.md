# Module 1 Group Assignment: The Describerator

CSCI 5117, Fall 2017

[Assignment description](https://docs.google.com/document/d/1956Z3EZJi9RWU6JqPHEh5ZZBmDOKFex-HtsBLz66tt4/edit#)

Please fill out all of the following sections to help us grade your submission:


## Name of App: Recipic


## Name of Team: A team has no name


## Students

* Aishwarya Gune, gune0016@umn.edu
* Aishwarya Malpani, malpa004@umn.edu
* Ameya Gurjar, gurja010@umn.edu
* Pratk Kotwal, kotwal007@umn.edu


## Link to Site

<https://recipic-csci-5117.herokuapp.com/>


## Key Features

**Describe the most challenging features you implemented
(one sentence per bullet, maximum 4 bullets):**

* Web Scraping: The data present on the website was of different types so we had to implement various techniques to access the data and display it in the proper format. 

* Image Detection using Google Vision API: Although the API has changed, a lot of the documentation we found online was for the previous version.


## Screenshots of Site

Home Page: Directs User to upload image
![](/Screenshot1.png)

Search Page: Displays Recipes of items similar to image uploaded
![](/Screenshot2.png)

Recipe Page: Displays single recipe
![](/Screenshot3.png)


## External Dependencies

* Google Vision API: Used to perform label detection, to determine what items the image contains
* Cheerio: Node module we have used to perform web scraping

## Links to Test Data

The website takes as an input a picture of food. Any image is fine as long as the food item is the major focus of the image.

Since we are using Google Vision API to perform image processing for label detection, the results may not always be accurate in some cases. But a different image of the same food item might help.
