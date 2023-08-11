from ..items import DomainAnalyitcs
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer

model = AutoModelForSequenceClassification.from_pretrained("alimazhar-110/website_classification")
tokenizer = AutoTokenizer.from_pretrained("alimazhar-110/website_classification")

class WebClassificationPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get classification for the scraped page
        rawText = item['raw']

        pipe = pipeline("text-classification", model=model, tokenizer=tokenizer)
        classification = pipe(rawText)
        
        classLabel = classification[0]['label']
        score = classification[0]['score']
        classObject = {classLabel: {'accuracy': score, 'name': classLabel, 'Total': 1}} 

        item['classification'] = classObject
        # print (item['classification'])

        return item