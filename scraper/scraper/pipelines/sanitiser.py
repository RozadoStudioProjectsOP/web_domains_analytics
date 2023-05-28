#Prcoess the data from the spider into a dictionary that counts the freqency of words.
import re
from nltk.corpus import stopwords
from ..items import DomainAnalyitcs

class SanitiserPipeline:

    def process_item(self, item, spider):  
        item = DomainAnalyitcs(item)
        stop_words = set(stopwords.words('english'))    
        def Sanatize(wordList):
            # Remove single quotes, except where used as apostrophees
            wordList[:] = [re.sub('/\s\'|\'\s', '', word) for word in wordList]    
            # Removes any character that is not lower case alphabet or single quote.    
            wordList[:] = [re.sub('[^a-z\']', '', word) for word in wordList]    
            #Removes stopwords
            wordList[:] = [word for word in wordList if word not in stop_words and word != '']
            return wordList

        # Takes the raw data from the spider and creates a list of unigrams, while also setting
        # all characters to lowercase.
        item['words'] = item['raw'].lower().split()   
        
        item['words'] = Sanatize(item['words'])

        return item