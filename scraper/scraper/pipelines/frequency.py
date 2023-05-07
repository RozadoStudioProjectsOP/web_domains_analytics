from collections import Counter
from ..items import DomainAnalyitcs

class FrequencyPipeline:
    
    def process_item(self, item, spider): 
        item = DomainAnalyitcs(item)

        for word in item['words']:
            item['words'][word]['Frquency'] = item['words'][word]['Total'] / item['count']

        return item