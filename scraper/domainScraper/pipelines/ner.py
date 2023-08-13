# Pipeline used to count the absolute frequency of words.

from ..items import DomainAnalyitcs
from transformers import pipeline, AutoTokenizer, AutoModelForTokenClassification

class NamedEntityRecognitionPipeline:
    
    def process_item(self, item, spider):
        item = DomainAnalyitcs(item)

        tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
        model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")
        nlp = pipeline("ner", model=model, tokenizer=tokenizer)

        ner_results = nlp(item['raw'])
        item['ner'] = []
        for result in ner_results:                            
            if result['word'][0:2] == '##':
                item['ner'][len(item['ner']) - 1] = item['ner'][len(item['ner']) - 1] + result['word'][2:]
            elif result['entity'][0] == 'B':
                item['ner'].append(result['word'])
            elif result['entity'][0] == 'I':
                item['ner'][len(item['ner']) - 1] = item['ner'][len(item['ner']) - 1] + " " + result['word']
        return item