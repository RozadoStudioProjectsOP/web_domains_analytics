#Prcoess the data from the spider into a dictionary that counts the freqency of words.
import re
from nltk.corpus import stopwords
from ..items import DomainAnalyitcs

class SanitiserPipeline:

    def process_item(self, item, spider):  
        item = DomainAnalyitcs(item)
        stop_words = set(stopwords.words('english'))        

        # Takes the raw data from the spider and creates a list of unigrams, while also setting
        # all characters to lowercase.
        item['words'] = item['raw'].lower().split()

        # Remove single quotes, except where used as apostrophees
        item['words'] = [re.sub('/\s\'|\'\s', '', word) for word in item['words']]       
        # Removes any character that is not lower case alphabet or single quote.
        item['words'] = [re.sub('[^a-z\']', '', word) for word in item['words']]   
    
        #Removes stopwords
        item['words'][:] = [word for word in item['words'] if word not in stop_words and word != ''] 

        return item