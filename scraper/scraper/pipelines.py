#Prcoess the data from the spider into a dictionary that counts the freqency of words.

import json
import re
from .items import WordsItem

class ScraperPipeline:
    item = WordsItem()
    item['words'] = {}
    
    def process_item(self, item, spider):
        #The scraper returns a list with any text from each elements on the crawled page, we first join
        #the text together, then make it all lower case so we don't get duplicates of different cases,
        #then split any text seperated by space into a list.
        data = ''.join(item['text']).lower().split()
        for word in data:
            #Further process the word so that there are no special characters.
            subWord = re.sub('[^a-z]', '', word)
            #Add the word to dictionary or increment its value.
            if subWord in self.item['words']:
                self.item['words'][subWord] += 1
            else:
                self.item['words'][subWord] = 1
        return self.item