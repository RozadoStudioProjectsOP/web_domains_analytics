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

# Useful:
To use scrapy in git bash (this is assuming your use Anaconda):
1. Install Anaconda Python
2. Find where conda.sh is, probably: C:\Users\<USER>\anaconda3\etc\profile.d
3. Open Git Bash in the folder.
4. Enter `PWD`
5. Enter `echo ". ${PWD}/conda.sh" >> ~/.bashrc`
6. Reopen the terminal.
7. Enter `conda activate`
8. Now you can use scrapy or anything conda related in git bash terminal.
