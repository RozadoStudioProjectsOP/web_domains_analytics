#Prcoess the data from the spider into a dictionary that counts the freqency of words.

import json
import re
from itemadapter import ItemAdapter

class ScraperPipeline:
    wordCount = {}

    #Once the spider is finished, write contents of wordCount to JSON file.
    def close_spider(self, spider):
        self.file = open('data.json', 'w')
        line = json.dumps(self.wordCount) + "\n"
        self.file.write(line)
        self.file.close()

    #Updates wordCount with data extracted from spider.
    def process_item(self, item, spider):
        data = ''.join(item['text']).lower().split()
        for word in data:
            subWord = re.sub('[^a-z]', '', word)
            if subWord in self.wordCount:
                self.wordCount[subWord] += 1
            else:
                self.wordCount[subWord] = 1