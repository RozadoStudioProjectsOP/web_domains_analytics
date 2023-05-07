from collections import Counter
from ..items import DomainAnalyitcs

class FrequencyPipeline:
    
    def process_item(self, item, spider): 
        item = DomainAnalyitcs(item)

        # Gets the relative frequency of a word by, dividing its occurance by the total number of words.
        for word in item['words']:
            item['words'][word]['Frquency'] = item['words'][word]['Total'] / item['count']

        return item