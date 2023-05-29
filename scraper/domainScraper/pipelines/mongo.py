#Builds up a payload as the spider is run, then sends it to mongoDB after the spider closes.

from ..items import DomainAnalyitcs
import pymongo
from datetime import datetime

class MongoDBPipeline:

    # Declaring the payload that will be sent to DB, think of it as a collection model.
    payload = {
        'words': {},
        'domain': '',
        'bigrams': {},
        'trigrams': {},
        'sentiment': {}
    }
    counts = {
        'words': 0,
        'bigrams': 0,
        'trigrams': 0
    }

    def open_spider(self, spider):
        # Establishes a connection to the DB
        self.client = pymongo.MongoClient(spider.MONGO_URI)
        self.db = self.client[spider.MONGO_DB]
        self.col = self.db[spider.MONGO_COLLECTION]
        #
        jobData = {
            'timestamp':  datetime.now(),
            'pending': True,
            'domain': spider.url
        }
        self.jobs = self.db['scrapy']
        self.job = self.jobs.insert_one(jobData)      

    def close_spider(self, spider):
        # Tries to update a document or creates a new one based on the given domain.
        
        def calculateFrequency(target):
            #Calculate relative frequency of words
            for word in self.payload[target]:
                self.payload[target][word]['Frequency'] = self.payload[target][word]['Total'] / self.counts[target]

        calculateFrequency('words')
        calculateFrequency('bigrams')
        calculateFrequency('trigrams')

        query = { 'domain': self.payload['domain'] }
        data = dict(self.payload)        
        self.col.update_one(query, { '$set': data }, upsert=True)
        self.jobs.update_one({ '_id': self.job.inserted_id}, { '$set': { 'pending': False } }, upsert=True)
        self.client.close()
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        self.payload['domain'] = item['domain']

        self.counts['words'] += item['counts']['words']
        self.counts['bigrams'] += item['counts']['bigrams']
        self.counts['trigrams'] += item['counts']['trigrams']

        def buildPayload(wordList, target):
            for key, value in wordList.items():                
                # Check if word already exists in payload.
                if key in self.payload[target]:
                    # Adds up totals.
                    self.payload[target][key]['Total'] = self.payload[target][key]['Total'] + wordList[key]['Total']
                else:
                    # Adds new word to payload.
                    self.payload[target][key] = value

        buildPayload(item['words'], 'words')
        buildPayload(item['bigrams'], 'bigrams')
        buildPayload(item['trigrams'], 'trigrams')     

        def buildSentimentPayload(sentiment, target):
            for key, value in sentiment.items():
                if key in self.payload[target]:
                    self.payload[target][key]['total'] = self.payload[target][key]['total'] + sentiment[key]['total']
                else:
                    self.payload[target][key] = value  
                    
            print("Payload: ", self.payload[target])
        
        buildSentimentPayload(item['sentiment'], 'sentiment')

        return item