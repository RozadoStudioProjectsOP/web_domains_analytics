#https://www.mongodb.com/basics/how-to-use-mongodb-to-store-scraped-data
import pymongo
import sys
import dotenv
import os
from ..items import WordsItem
import json

class MongoDBPipeline:
    item = WordsItem()

    # def __init__(self):
    #     dotenv.load_dotenv()
    #     MONGO_URI = os.environ["MONGO_URI"]
    #     MONGO_DB =  os.environ["MONGO_DB"]
    #     MONGO_COLLECTION =  os.environ["MONGO_COLLECTION"]
    #     self.client = pymongo.MongoClient(MONGO_URI)
    #     self.db = self.client[MONGO_DB]
    #     self.col = self.db[MONGO_COLLECTION]
    #     self.col.delete_many({})

    def close_spider(self, spider):
        # self.col.insert_one(dict(self.item))
        # self.client.close()
        self.file = open('data.json', 'w')
        line = json.dumps(dict(self.item)) + "\n"
        self.file.write(line)
        self.file.close()
    
    def process_item(self, item, spider):
        self.item = item

        