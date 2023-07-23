from ..items import DomainAnalyitcs
from transformers import pipeline

emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

class AISentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        text = item['raw']

        phrasesArray = text.split('. ')
        emotionsArray= []

        for phrase in phrasesArray:
            emotion_labels = emotion(phrase)
            emotionL = emotion_labels[0]['label']
            # print('##################################################33')
            # print(emotionL)
            score = emotion_labels[0]['score']
            emotionObject = {'emotion': emotionL, 'score': score}

            if not emotionsArray:
                emotionsArray.append(emotionObject)

            if any(e['emotion'] == emotionL for e in emotionsArray):
                for element in emotionsArray:
                    if element['emotion'] == emotionL:
                        element['score'] = (element['score'] + score) / 2
                        break    
            else:
                emotionsArray.append(emotionObject)

            print(emotionsArray)
            

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