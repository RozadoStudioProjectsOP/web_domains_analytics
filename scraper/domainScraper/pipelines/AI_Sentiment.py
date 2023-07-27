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

        def getTotals(sentiment):
            for phrase in phrasesArray:
                emotion_labels = emotion(phrase)
                emotionL = emotion_labels[0]['label']
                score = emotion_labels[0]['score']
                emotionObject ={ emotionL: {'total': score, 'name': emotionL}} 

                if not sentiment:
                    sentiment.append(emotionObject)

                else:
                    for element in sentiment:
                        if 'name' in element and element['name'] == emotionL:
                            element[emotionL]['total'] = (element[emotionL]['total'] + score) / 2
                            break
                    else:  # If the loop didn't break, the emotionL was not found in any element
                        sentiment.append(emotionObject)
                    
            return sentiment
        
        print(item['AI_Sentiment'])    
        item['AI_Sentiment'] = getTotals(item['AI_Sentiment'])     
        return item