from ..items import DomainAnalyitcs
from nrclex import NRCLex

class SentimentPipeline:
    

    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)
        item['raw']
      
        

        return item