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
                emotion_labels = emotion(phrase) #Get sentiment
                emotionL = emotion_labels[0]['label']
                score = emotion_labels[0]['score']
                emotionObject = {emotionL: {'total': score, 'name': emotionL, 'count': 0}} 

                if not sentiment:
                    sentiment.append(emotionObject)

                else:
                    for element in sentiment:
                        # If sentiment already exists, add the scores and divide by 2 to get the average
                        if 'name' in element and element['name'] == emotionL:
                            element[emotionL]['total'] = (element[emotionL]['total'] + score) / 2
                            break
                    else:  # If the loop didn't break, the emotionL was not found in any element
                        sentiment.append(emotionObject)
            #print(sentiment)        
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
                    key_counts[key] += 1  # Increment the count if the key is repeated
                else:
                    key_counts[key] = 1   # Initialize the count if the key is encountered for the first time

                # Add the 'count' key to each dictionary and update its value
                value['count'] = key_counts[key]
            return sentiment
        
        item['AI_Sentiment'] = getCounts(item['AI_Sentiment'])                
         
        return item