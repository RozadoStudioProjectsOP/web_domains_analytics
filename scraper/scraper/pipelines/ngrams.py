#Prcoess the data from the spider into a dictionary that counts the freqency of words.
import re
from nltk.corpus import stopwords
from ..items import DomainAnalyitcs

class NGramPipeline: 

    def process_item(self, item, spider):
        item = DomainAnalyitcs(item)
        punctuation = ['\'', '\"', ',', '.', ':', ';']

        # Replaces - and _ with space, and lowercase every letter.
        sanitizedData = re.sub('[-_]', ' ', item['raw'].lower())

        item['bigrgams'] = list(ngrams(sanitizedData.split(), 2))

        # Filter out ngrams where punctuation separates items
        item['bigrgams'][:] = [x for x in ngramSet if x[-1][0] not in punctuation and x[0][-1] not in punctuation]

        return item
        