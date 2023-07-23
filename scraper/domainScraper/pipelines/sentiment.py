from ..items import DomainAnalyitcs
from nrclex import NRCLex

class SentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        text_object = NRCLex(item['raw'])

        item['sentiment'] = text_object.raw_emotion_scores

        def getTotals(sentiment):

            for item, value in sentiment.items():
                sentiment[item] = {
                    'total': value,
                    'name': item.capitalize()
                } 
            return sentiment 

        item['sentiment'] = getTotals(item['sentiment'])
        # print (item['sentiment'])

        return item