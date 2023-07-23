from ..items import DomainAnalyitcs
from transformers import pipeline

emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

class AISentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        text = item['raw']

        phrasesArray = text.split('. ')
        item['AI_Sentiment'] = []

        for phrase in phrasesArray:
            emotion_labels = emotion(phrase)
            emotionL = emotion_labels[0]['label']
            score = emotion_labels[0]['score']
            emotionObject = {'emotion': emotionL, 'score': score}

            if not item['AI_Sentiment']:
                item['AI_Sentiment'].append(emotionObject)

            if any(e['emotion'] == emotionL for e in item['AI_Sentiment']):
                for element in item['AI_Sentiment']:
                    if element['emotion'] == emotionL:
                        element['score'] = (element['score'] + score) / 2
                        break    
            else:
                item['AI_Sentiment'].append(emotionObject)

            #print(item['AI_Sentiment'])
            

        return item