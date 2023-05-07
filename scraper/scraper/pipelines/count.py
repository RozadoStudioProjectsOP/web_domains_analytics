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
        
        def countWords(wordList, total):
            # Count individual words
            wordList =  dict(Counter(wordList))
            # Format the data to better show total, also calculate relative frequency.
            for word, count in wordList.items():
                wordList[word] = {
                    'Total': count,
                    'Frequency': count / total
                }                
            return wordList

        item['words'] = countWords(item['words'], len(item['words']))
        item['bigrams'] = countWords(item['bigrams'], len(item['bigrams']))
        item['trigrams'] = countWords(item['trigrams'], len(item['trigrams']))

        return item