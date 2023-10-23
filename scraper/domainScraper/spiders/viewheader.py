# Used to compare headers with previously scraped sites, to detect changes.

import scrapy
from scrapy.linkextractors import LinkExtractor
from ..headerItems import HeaderItems
import tldextract

class ViewHeadersSpider(scrapy.Spider):
    # Name used to call spider.
    name = 'viewHeader'

    custom_settings = {
        "ITEM_PIPELINES": {
            'domainScraper.pipelines.compareHeader.MongoDBComparePipeline': 200,
        }
    }

    def start_requests(self):
        # Sends the first request using inputted URL, also using the HEAD method
        # to only get HTTP header data.
        yield scrapy.Request(self.url)

    def parse(self, response):     
        # Uses scrapy items as a sort of schema  
        item = HeaderItems()    
        # Sets item domain as the inputted URL
        item['url'] = self.url

        # Check if response headers have Etag. (Not all sites support Etag)
        if b'Etag' in response.headers:
            # Decode the header from bytes to string so it can be used in JSON.
            item['header'] = response.headers['Etag'].decode('utf-8')
        else:
            item['header'] = response.headers['Last-Modified'].decode('utf-8')
        
        if (self.settings.attributes['CLOSESPIDER_PAGECOUNT'].value in (1, '1')):
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