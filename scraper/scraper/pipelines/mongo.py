#https://www.mongodb.com/basics/how-to-use-mongodb-to-store-scraped-data
import pymongo
import sys
import dotenv
import os
from ..items import WordsItem
import json

class MongoDBPipeline:
    item = {}
    item['domain'] = ''

    def __init__(self):
        dotenv.load_dotenv()
        MONGO_URI = os.environ["MONGO_URI"]
        MONGO_DB =  os.environ["MONGO_DB"]
        MONGO_COLLECTION =  os.environ["MONGO_COLLECTION"]
        self.client = pymongo.MongoClient(MONGO_URI)
        self.db = self.client[MONGO_DB]
        self.col = self.db[MONGO_COLLECTION]

    def close_spider(self, spider):
        query = { 'domain': self.item['domain'] }
        data = dict(self.item)
        self.col.update_one(query, { '$set':  data }, upsert=True)
        self.client.close()
    
    def process_item(self, item, spider):
        self.item = item
        self.item['domain'] = spider.url

        