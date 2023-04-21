#Crawls through all internal links of a given domain, outputs all text data.

from pathlib import Path
from trafilatura import fetch_url, extract
import scrapy

class AuthorSpider(scrapy.Spider):
    name = 'spider'
    def start_requests(self):
        #Takes url arg to start requests.
        yield scrapy.Request('https://' + self.url)

    def parse(self, response):
        #Extract text and pass to pipeline.
        downloaded = fetch_url(response.url)
        result = extract(downloaded)
        yield { 'text': result }
        #If statement ensures only internal links are followed.
        if self.url in response.url:
            yield from response.follow_all(css='body a', callback=self.parse)
        