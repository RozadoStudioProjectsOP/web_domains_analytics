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
        #If statement ensures only internal links are processed.
        if self.url in response.url:
            item = DomainAnalyitcs()
            #Extract text and pass to pipeline.
            item['domain'] = self.url
            item['raw'] = extract(response.body)

            yield from response.follow_all(css='body a', callback=self.parse)
            yield item        
        