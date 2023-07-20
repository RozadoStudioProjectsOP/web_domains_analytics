from ..items import DomainAnalyitcs
from transformers import pipeline

emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

class AISentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        text = item['raw']

        phrasesArray = text.split('. ')

        print(phrasesArray)

        # item['sentiment'] = text_object.raw_emotion_scores

        # def getTotals(sentiment):

        #     for item, value in sentiment.items():
        #         sentiment[item] = {
        #             'total': value,
        #             'name': item.capitalize()
        #         } 
        #     return sentiment 

        # item['sentiment'] = getTotals(item['sentiment'])
        # print (item['sentiment'])

        # return item