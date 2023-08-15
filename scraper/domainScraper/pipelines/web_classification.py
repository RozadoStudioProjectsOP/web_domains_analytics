from ..items import DomainAnalyitcs
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer

model = AutoModelForSequenceClassification.from_pretrained("alimazhar-110/website_classification")
tokenizer = AutoTokenizer.from_pretrained("alimazhar-110/website_classification")

class WebClassificationPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get classification for the scraped page
        rawText = (item['raw'])[:500]

        # Run model 
        pipe = pipeline("text-classification", model=model, tokenizer=tokenizer)
        classification = pipe(rawText)
        
        # Modify result to get the necessary parameters needed for front end 
        classLabel = classification[0]['label']
        score = classification[0]['score']
        classObject = {classLabel: {'accuracy': score, 'name': classLabel, 'Total': 1}} 

        item['classification'] = classObject

        return item