# Downloads and extracts text from inputted URL, will attempt to go a little deeper
# into the website if it can.

from trafilatura import extract
import scrapy
from scrapy.linkextractors import LinkExtractor
from ..items import DomainAnalyitcs

class AuthorSpider(scrapy.Spider):
    # Name used to call spider.
    name = 'spider'    

    def start_requests(self):
        # Starts making requests to targeted website from inputted URL, and downloads
        # the HTML and returns it into the response argument in the parse method.
        yield scrapy.Request(self.url)

    def parse(self, response):      
        # Uses scrapy items as a sort of schema  
        item = DomainAnalyitcs()
        # Sets item domain as the inputted URL
        item['domain'] = self.url
        # Use Trafilatura extraction method to pull text out of the HTML that was
        # downloaded from scrapy into a string.
        item['raw'] = extract(response.body)
        # Extracts links found in the downloaded HTML, accepts only links that use
        # the inputted URL as a base, to attempt to get related material.
        link_extractor = LinkExtractor(allow=self.url, unique=True)
        # Calls parse method for each link extracted.
        for link in link_extractor.extract_links(response):
            yield scrapy.Request(link.url, callback=self.parse)
        # Passes item down into the pipeline.
        yield item