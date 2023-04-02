import re

class CountPipeline:
    item = {}
    item['words'] = {}
    item['count'] = 0
    
    def process_item(self, item, spider):
        for word in item:
            self.item['count'] += 1
            if word in self.item['words']:
                self.item['words'][word] += 1
            else:
                self.item['words'][word] = 1
        return self.item