#Prcoess the data from the spider into a dictionary that counts the freqency of words.
import re
from nltk.corpus import stopwords

class SanitiserPipeline:
    
           

    def process_item(self, item, spider):  
        stop_words = set(stopwords.words('english'))        

        # Takes the raw data from the spider and creates a list of unigrams, while also setting
        # all characters to lowercase.
        data = item['text'].lower().split()

        # Remove single quotes, except where used as apostrophees
        words = [re.sub('/\s\'|\'\s', '', word) for word in data]       
        # Removes any character that is not lower case alphabet or single quote.
        words = [re.sub('[^a-z\']', '', word) for word in words]   
    
        #Removes stopwords
        words[:] = [word for word in words if word not in stop_words and word != ''] 

        return words