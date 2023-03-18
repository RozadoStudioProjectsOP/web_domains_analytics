#Crawls through all internal links of a given domain, outputs all text data.

from pathlib import Path

import scrapy

class AuthorSpider(scrapy.Spider):
    name = 'spider'
    def start_requests(self):
        #Takes url arg to start requests.
        yield scrapy.Request('https://' + self.url)

    def parse(self, response):
        #Outputs entire body as text.
        yield{            
            'text': response.css('body *::text').getall(),
        }
        #If statement ensures only internal links are followed.
        if self.url in response.url:
            yield from response.follow_all(css='body a', callback=self.parse)
        