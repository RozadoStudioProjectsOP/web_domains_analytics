from ..items import DomainAnalyitcs
import pymongo
import sys
import dotenv
import os
import json

class MongoDBPipeline:

    payload = {
        'words': {},
        'domain': ''
    }

    def __init__(self):
        dotenv.load_dotenv()
        MONGO_URI = os.environ["MONGO_URI"]
        MONGO_DB =  os.environ["MONGO_DB"]
        MONGO_COLLECTION =  os.environ["MONGO_COLLECTION"]
        self.client = pymongo.MongoClient(MONGO_URI)
        self.db = self.client[MONGO_DB]
        self.col = self.db[MONGO_COLLECTION]

    def close_spider(self, spider):
        query = { 'domain': self.payload['domain'] }
        data = dict(self.payload)        
        self.col.update_one(query, { '$set': data }, upsert=True)
        self.client.close()
    
    def process_item(self, item, spider):
        item = DomainAnalyitcs(item)

        self.payload['domain'] = item['domain']

        for key, value in item['words'].items():
            if key in self.payload['words']:
                self.payload['words'][key]['Total'] = self.payload['words'][key]['Total'] + item['words'][key]['Total']
                self.payload['words'][key]['Frequency'] = (self.payload['words'][key]['Frequency'] + item['words'][key]['Frequency']) / 2
            else:
                self.payload['words'][key] = value