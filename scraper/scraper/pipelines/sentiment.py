from ..items import DomainAnalyitcs
from nrclex import NRCLex

class SentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)
        text_object = NRCLex(item['raw'])
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        print(text_object.sentences)
        print("Top emotions: ", text_object.raw_emotion_scores)
        item['sentiment'] = text_object.raw_emotion_scores

        def countSentiment(sentiments):
            item['sentiment'] += sentiments

            return item


        item['sentiment'] = countSentiment(item['sentiment'])   

        
        return item