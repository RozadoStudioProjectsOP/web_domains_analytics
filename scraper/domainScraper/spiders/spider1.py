# Downloads and extracts text from inputted URL, will attempt to go a little deeper
# into the website if it can.

from trafilatura import extract
import scrapy
import tldextract
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

        if (self.settings.attributes['CLOSESPIDER_PAGECOUNT'].value == "1"):
            item['singlePage'] = True
        else:
            item['singlePage'] = False
            # Extracts the domain from a URL
            extractDomainResult = tldextract.extract(self.url)
            domain = '.'.join([extractDomainResult.domain, extractDomainResult.suffix])
            # Extracts links from current page that are in the same domain.
            link_extractor = LinkExtractor(allow_domains=domain, unique=True)
            # Calls parse method for each link extracted.        
            for link in link_extractor.extract_links(response):
                yield scrapy.Request(link.url, callback=self.parse)
        # Passes item down into the pipeline.
        yield item