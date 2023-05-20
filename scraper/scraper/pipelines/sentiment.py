from ..items import DomainAnalyitcs
from nrclex import NRCLex

class SentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)
        text_object = NRCLex(item['raw'])
        item['sentiment'] = {
            'fear': 0,
            'anger': 0,
            'anticipation': 0,
            'rust': 0,
            'surprise': 0,
            'positive': 0,
            'negative': 0,
            'sadness': 0,
            'disgust': 0,
            'joy': 0,
        }
        # item['sentiment'] = text_object.raw_emotion_scores
        for i in item['sentiment'].items():
            for j in (text_object.raw_emotion_scores).items():
                # print('i: ', i)
                # print('j: ', j)
                if(i == j):
                    # item['sentiment'][i] = item['sentiment'][i] + j
                    print('i: ', i)
                    print('j: ', j)
                    print("------------------")

  
        return item