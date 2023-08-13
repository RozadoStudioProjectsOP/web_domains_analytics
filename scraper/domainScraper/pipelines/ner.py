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
        # Tokens have labels with B or I, B indicating that the token's word is
        # the first word of a full name, and I is a following word, Tokens should
        # also be ordered based on where they appear in the text.
        # E.g: Text: University of Otago would be split in to three tokens
        # with university having the B label.

        item['ner'] = []
        # Take the words from the NER tokens and populates a list with them, join
        # multi-word names where possible.
        for result in ner_results:                            
            # Before checking labels, sometimes NER results have split up words
            # like Geralt = G, ##eralt, I don't think this is intended behaviour
            # and might be limitations on the training data, I am not sure.
            
            # If the token word starts with ## concatinate it on to the previous word.
            if result['word'][0:2] == '##':
                item['ner'][len(item['ner']) - 1] = item['ner'][len(item['ner']) - 1] + result['word'][2:]
            # If the token label is B, append a new word to the list.
            elif result['entity'][0] == 'B':
                item['ner'].append(result['word'])
            # If the token label is I, concatinate the word to the previous list item,
            # with whitespace to separate the words.
            elif result['entity'][0] == 'I':
                item['ner'][len(item['ner']) - 1] = item['ner'][len(item['ner']) - 1] + " " + result['word']
        return item