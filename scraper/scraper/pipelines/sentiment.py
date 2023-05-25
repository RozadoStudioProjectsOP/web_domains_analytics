from ..items import DomainAnalyitcs
from nrclex import NRCLex

class SentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        text_object = NRCLex(item['raw'])

        item['sentiment']['total'] = text_object.raw_emotion_scores

        return item