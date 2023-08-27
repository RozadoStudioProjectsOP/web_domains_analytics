from ..items import DomainAnalyitcs
from transformers import pipeline
import spacy 

emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

nlp = spacy.load('en_core_web_sm') 

class AISentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        raw_text = item['raw']
        doc = nlp(raw_text) 

        phrasesArray = [sent.text.strip() for sent in doc.sents] 

        item['AI_Sentiment'] = []

        def getTotals(sentiment):
                       
            for phrase in phrasesArray:
                emotion_labels = emotion(phrase) #Get sentiment
                emotionL = emotion_labels[0]['label']
                score = emotion_labels[0]['score']
                emotionObject = {emotionL: {'accuracy': score, 'name': emotionL.capitalize(), 'Total': 0}} 

                if not sentiment:
                    sentiment.append(emotionObject)

                else:
                    for element in sentiment:
                        # If sentiment already exists, add the scores and divide by 2 to get the average
                        if 'name' in element and element['name'] == emotionL:
                            element[emotionL]['accuracy'] = (element[emotionL]['accuracy'] + score) / 2
                            break
                    else:  # If the loop didn't break, the emotionL was not found in any element
                        sentiment.append(emotionObject)
        
            return sentiment
        
        counts = []  
           
        item['AI_Sentiment'] = getTotals(item['AI_Sentiment']) 
        
        def getCounts(sentiment):
            # Create a dictionary to keep track of the counts for each key
            key_counts = {}

            for item in sentiment: 
                key = list(item.keys())[0]
                value = item[key]

                # Check if the key already exists in the key_counts dictionary
                if key in key_counts:
                    key_counts[key] = 1  # Increment the count if the key is repeated
                else:
                    key_counts[key] = 1   # Initialize the count if the key is encountered for the first time

                # Add the 'count' key to each dictionary and update its value
                value['Total'] = key_counts[key]
            return sentiment
        
        item['AI_Sentiment'] = getCounts(item['AI_Sentiment'])                

        return item