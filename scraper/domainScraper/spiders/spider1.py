#Crawls through all internal links of a given domain, outputs all text data.

from trafilatura import extract
import scrapy
from scrapy.linkextractors import LinkExtractor
from ..items import DomainAnalyitcs

class AuthorSpider(scrapy.Spider):
    name = 'spider'
    

    def start_requests(self):
        #Takes url arg to start requests.
        yield scrapy.Request(self.url)

    def parse(self, response):
        #If statement ensures only internal links are processed.
        # if self.url in response.url:
        item = DomainAnalyitcs()
        #Extract text and pass to pipeline.
        item['domain'] = self.url
        item['raw'] = extract(response.body)
        # yield from response.follow_all(css='body a', callback=self.parse)            
        link_extractor = LinkExtractor(allow=self.url, unique=True)
        print('here!!!!!!')
        print(link_extractor.extract_links(response))
        for link in link_extractor.extract_links(response):
            yield scrapy.Request(link.url, callback=self.parse)
        yield item