#Prcoess the data from the spider into a dictionary that counts the freqency of words.
import re
from nltk.corpus import stopwords
from nltk import ngrams
from nltk.corpus import stopwords
from ..items import DomainAnalyitcs

class NGramPipeline: 

    def process_item(self, item, spider):
        item = DomainAnalyitcs(item)
        punctuation = ['\'', '\"', ',', '.', ':', ';']
        stop_words = set(stopwords.words('english'))   
        sanitizedData = re.sub('[-_]', ' ', item['raw'].lower())
        
        def CreateNGrams(data, size):            
            ngramList = list(ngrams(data.split(), size))
            ngramList[:] = [list(ngram) for ngram in ngramList]
            ngramList = FilterNGramBreaks(ngramList, size)    
            ngramList[:] = [[re.sub('/\s\'|\'\s', '', word) for word in ngram] for ngram in ngramList]    
            ngramList[:] = [[re.sub('[^a-z\']', '', word) for word in ngram] for ngram in ngramList]    
            ngramList = RemoveStopWords(ngramList)
            if size > 1:
                ngramList[:] = [' '.join(ngram) for ngram in ngramList]               
            return ngramList

        def RemoveStopWords(ngramList):
            ngramList = [ngram for ngram in ngramList if all(word not in stop_words and word != '' for word in ngram)]
            return ngramList

        def FilterNGramBreaks(ngramList, size):
            ngramList[:] = [ngram for ngram in ngramList if ngram[-1][0] not in punctuation and ngram[0][-1] not in punctuation]    
            if size > 2:
                ngramList[:] = [ngram for ngram in ngramList if all(word[0] not in punctuation and word[-1] not in punctuation for word in ngram)]
            return ngramList

        item['bigrams'] = CreateNGrams(sanitizedData, 2)
        item['trigrams'] = CreateNGrams(sanitizedData, 3)

        return item
        