from collections import Counter

class FrequencyPipeline:
    item = {}
    item['words'] = {}
    
    def process_item(self, item, spider):
        count = Counter(item['words']).most_common(100)
        for word in count:
            self.item['words'][word[0]] = word[1]/item['count']
        return self.item