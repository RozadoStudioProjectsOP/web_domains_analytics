#Crawls through all internal links of a given domain, outputs all text data.

from pathlib import Path
from trafilatura import fetch_url, extract
import scrapy
from ..items import DomainAnalyitcs

class AuthorSpider(scrapy.Spider):
    name = 'spider'
    def start_requests(self):
        #Takes url arg to start requests.
        yield scrapy.Request('https://' + self.url)

    def parse(self, response):
        item = DomainAnalyitcs()
        #Extract text and pass to pipeline.
        downloaded = fetch_url(response.url)
        
        item['domain'] = self.url
        item['raw'] = extract(downloaded)

        yield item

        #If statement ensures only internal links are followed.
        if self.url in response.url:
            yield from response.follow_all(css='body a', callback=self.parse)
        