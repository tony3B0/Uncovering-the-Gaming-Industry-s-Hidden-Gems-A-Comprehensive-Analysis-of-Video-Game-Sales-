# App start
# Imports
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from bs4 import BeautifulSoup as bs
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager

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
    
    # Grabs the text of the first 12 and saves them into a list.
    i = 0
    while i <= 11:
        quotes.append(blockquote[i].get_text())
        i+=1
    return quotes


# Init App
app = Flask(__name__)

# Route Section
@app.route('/')
def index():
    quotes = scrape()
    return render_template("index.html", quotes = quotes)

@app.route("/static/js/<filename>")
def get_static(filename):
    with open(f'static/js/{filename}') as f:
        return f.read()


@app.route('/data')
def datafinder():
    username = "postgres"
    password = "postgres"

    rds_connection_string = f"{username}:{password}@localhost:5432/VideoGamesProject"
    engine = create_engine(f'postgresql://{rds_connection_string}')

    Base = automap_base()
    Base.prepare(engine, reflect=True)
    gamedata = Base.classes.games_data

    session = Session(engine)
    query = session.query(gamedata.rank, gamedata.name, gamedata.platform, gamedata.year,
                          gamedata.genre, gamedata.publisher, gamedata.na_sales, gamedata.eu_sales, gamedata.jp_sales,
                          gamedata.other_sales, gamedata.global_sales)

    data = query.all()

    session.close()

    data = [{
        'rank': rank,
        'name': name,
        'platform': platform,
        'year': year,
        'genre': genre,
        'publisher': publisher,
        'na_sales': na_sales,
        'eu_sales': eu_sales,
        'jp_sales': jp_sales,
        'other_sales': other_sales,
        'global_sales': global_sales,
    } for rank, name, platform, year, genre, publisher,
        na_sales, eu_sales, jp_sales, other_sales, global_sales in data]
    return jsonify(data)
    
    
@app.route('/linedata')
def linefinder():
    username = "postgres"
    password = "postgres"

    rds_connection_string = f"{username}:{password}@localhost:5432/VideoGamesProject"
    engine = create_engine(f'postgresql://{rds_connection_string}')

    Base = automap_base()
    Base.prepare(engine, reflect=True)
    linedata = Base.classes.sales_data

    session = Session(engine)
    query = session.query(linedata.year, linedata.na_sales, linedata.eu_sales, linedata.jp_sales,
                          linedata.other_sales, linedata.global_sales)

    data = query.all()

    session.close()

    data = [{
        'year': year,
        'na_sales': na_sales,
        'eu_sales': eu_sales,
        'jp_sales': jp_sales,
        'other_sales': other_sales,
        'global_sales': global_sales,
    } for year, na_sales, eu_sales, jp_sales, other_sales, global_sales in data]


    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)