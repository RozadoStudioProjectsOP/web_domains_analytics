import re
from ..items import DomainAnalyitcs
from collections import Counter

class CountPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Count total words
        item['count'] = len(item['words'])

        # Count individual words
        item['words'] = dict(Counter(item['words']))

        # Format each word into dictionaries so we can easily add more data for that word.
        for word, count in item['words'].items():
            item['words'][word] = {'Total': count}

        return item