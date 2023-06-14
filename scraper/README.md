## Scraper documentation

# Setup

Install the following packages in your python enviroment.

- Scrapy: `pip install Scrapy`, https://docs.scrapy.org/en/latest/
- PyMongo: `pip install pymongo`, https://pymongo.readthedocs.io/en/stable/
- Trafilatura: `pip install trafilatura`, https://trafilatura.readthedocs.io/en/latest/installation.html
- NRCLex  `pip install NRCLex`, https://pypi.org/project/NRCLex/
- NLTK `pip install NLTK`, https://www.nltk.org/install.html

# Usage

Run locally: `scrapy crawl spider -a url=<url> -a MONGO_URI=<uri> -a MONGO_DB=<db> -a MONGO_COLLECTION=<col>`
