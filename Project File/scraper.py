# Imports
from bs4 import BeautifulSoup as bs
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import requests

# Scrape Function


def scrape():
    # Splinter set up
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)
    # Create dictonary instance
    dict = {}
    # URL
    url = "https://www.wepc.com/news/video-game-statistics/"
    # Request response from URL
    browser.visit(url)
    # Assign the document grab to a variable



    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    quotes = []
    
    # Pulls all of the website's game quotes.
    blockquote = soup.find_all('p', class_= "elementor-blockquote__content")
    
    # Grabs the text of the first 12 and saves them into a
    i = 0
    while i <= 11:
        quotes.append(blockquote[i].get_text())
        i+=1


scrape()
