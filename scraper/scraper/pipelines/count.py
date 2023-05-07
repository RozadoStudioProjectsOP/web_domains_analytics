import re
from ..items import DomainAnalyitcs
from collections import Counter

class CountPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        item['count'] = len(item['words'])

        item['words'] = dict(Counter(item['words']))

        for word, count in item['words'].items():
            item['words'][word] = {'Total': count}

        return item