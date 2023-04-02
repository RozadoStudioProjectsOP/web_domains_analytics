#Prcoess the data from the spider into a dictionary that counts the freqency of words.
import re

class SanitiserPipeline:
    
    def process_item(self, item, spider):
        #The scraper returns a list with any text from each elements on the crawled page, we first join
        #the text together, then make it all lower case so we don't get duplicates of different cases,
        #then split any text seperated by space into a list.
        data = ''.join(item['text']).lower().split()

        #Removes special characters, leaves only a-z.
        words = [re.sub('[^a-z]', '', word) for word in data]        
        
        return words