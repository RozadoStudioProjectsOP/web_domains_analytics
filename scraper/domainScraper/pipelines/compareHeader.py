from ..headerItems import HeaderItems
import pymongo
from datetime import datetime
from pytz import timezone

class MongoDBComparePipeline:

    headerData = []
    url = ''
    singlePage = True
    
    def open_spider(self, spider):
        # Establishes a connection to the DB
        self.client = pymongo.MongoClient(spider.MONGO_URI)
        self.db = self.client[spider.MONGO_DB]
        self.col = self.db[spider.MONGO_COLLECTION]
        

    def close_spider(self, spider):
        query = { 
            '$and': 
            [
                { 'domain': self.url },
                { 'singlePage': self.singlePage }
            ],
        }
        detected = False
        project = { 'headers': 1, '_id': 0}
        data = self.col.find_one(query, project)
        for header in data['headers']:
            if header not in self.headerData:
                detected = True
        if detected:            
            self.col.update_one(query, { '$set': {'expired': True }}, upsert=False)        
        else:
            time = datetime.now(timezone('NZ'))
            time = time.strftime("%a, %d %b %Y %X %Z")
            self.col.update_one(query, { '$set': {'expiredChecked': time }}, upsert=True)        
        self.client.close()
    
    def process_item(self, item, spider):        
        item = HeaderItems(item)
        self.headerData.append(item['header'])
        self.url = item['url']
        self.singlePage = item['singlePage']
        return item