import re
from ..items import DomainAnalyitcs
from collections import Counter

class CountPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Count total words and ngrams
        
        item['counts'] = {}   
        item['counts']['words'] = len(item['words'])
        item['counts']['bigrams'] = len(item['bigrams'])
        item['counts']['trigrams'] = len(item['trigrams'])
        
        def countWords(wordList):
            # Count individual words
            wordList =  dict(Counter(wordList))
            # Format the data to show total as dict, and to make easy to add other dicts to words.
            for word, count in wordList.items():
                wordList[word] = {
                    'Total': count
                }                
            return wordList

        item['words'] = countWords(item['words'])
        item['bigrams'] = countWords(item['bigrams'])
        item['trigrams'] = countWords(item['trigrams'])

        return item