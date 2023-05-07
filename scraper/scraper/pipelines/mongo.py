#Builds up a payload as the spider is run, then sends it to mongoDB after the spider closes.

from ..items import DomainAnalyitcs
import pymongo
import sys
import dotenv
import os
import json

class MongoDBPipeline:

    # Declaring the payload that will be sent to DB, think of it as a collection model.
    payload = {
        'words': {},
        'domain': ''
    }

    def __init__(self):
        # Establishes a connection to the DB
        dotenv.load_dotenv()
        MONGO_URI = os.environ["MONGO_URI"]
        MONGO_DB =  os.environ["MONGO_DB"]
        MONGO_COLLECTION =  os.environ["MONGO_COLLECTION"]
        self.client = pymongo.MongoClient(MONGO_URI)
        self.db = self.client[MONGO_DB]
        self.col = self.db[MONGO_COLLECTION]

    def close_spider(self, spider):
        # Tries to update a document or creates a new one based on the given domain.
        query = { 'domain': self.payload['domain'] }
        data = dict(self.payload)        
        self.col.update_one(query, { '$set': data }, upsert=True)
        self.client.close()
    
    def process_item(self, item, spider):
        item = DomainAnalyitcs(item)

        self.payload['domain'] = item['domain']

        # Check if word already exists in payload.
        for key, value in item['words'].items():
            if key in self.payload['words']:
                # Adds up totals.
                self.payload['words'][key]['Total'] = self.payload['words'][key]['Total'] + item['words'][key]['Total']
                # Averages frequencies.
                self.payload['words'][key]['Frequency'] = (self.payload['words'][key]['Frequency'] + item['words'][key]['Frequency']) / 2
            else:
                # Adds new word to payload.
                self.payload['words'][key] = value