from ..items import DomainAnalyitcs
from huggingface_hub.hf_api import HfFolder
from langchain import HuggingFacePipeline
from transformers import AutoTokenizer
from langchain import PromptTemplate,  LLMChain
import transformers
import torch
import spacy 

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("GPU is available and being used")
else:
    device = torch.device("cpu")
    print("GPU is not available, using CPU instead")


HfFolder.save_token('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')

model = "meta-llama/Llama-2-7b-chat-hf"

tokenizer = AutoTokenizer.from_pretrained(model)

nlp = spacy.load('en_core_web_sm') 

pipeline = transformers.pipeline(
    "text-generation",
    device=0,
    model=model,
    tokenizer=tokenizer,
    torch_dtype=torch.bfloat16,
    max_length=200,
    do_sample=True,
    top_k=10,
    num_return_sequences=1,
    eos_token_id=tokenizer.eos_token_id
)

llm = HuggingFacePipeline(pipeline = pipeline, model_kwargs = {'temperature':0})

class Llama2SentimentPipeline:
    
    def process_item(self, item, spider):        
        item = DomainAnalyitcs(item)

        # Get sentiment scores for the scraped page
        raw_text = item['raw']
        doc = nlp(raw_text) 

        phrasesArray = [sent.text.strip() for sent in doc.sents] 

        template = """Classify the text into joy, anger, disgust, fear, sadness, surprise, trust anticipation. Reply with only one word and nothing else: Joy, Anger, Disgust, Fear, Sadness, Surprise, Trust.

                Examples:
                Text: I can't believe you would betray my trust like this, after everything we've been through. Your actions have left me seething with anger and disappointment.
                Sentiment: Anger.

                Text: Winning the championship was an absolute thrill, and I'm overflowing with happiness and excitement!
                Sentiment: Joy.

                Text: {text}
                Sentiment:"""

        item['llama2_sentiment'] = []

        def getTotals(sentiment):
                       
            for text in phrasesArray:

                prompt = PromptTemplate(template=template, input_variables=["text"])
               
                llm_chain = LLMChain(prompt=prompt, llm=llm)

                def classify(text):
                    raw_llm_answer = llm_chain.run(text)
                    answer = raw_llm_answer.split('.')[0]
                    return answer

                emotion = classify(text)

                emotionObject = {emotion: {'name': emotion.capitalize(), 'Total': 0}} 

                if not sentiment:
                    sentiment.append(emotionObject)
        
            return sentiment
        
        counts = []  
           
        item['Llama2_Sentiment'] = getTotals(item['Llama2_Sentiment']) 
        
        def getCounts(sentiment):
            # Create a dictionary to keep track of the counts for each key
            key_counts = {}

            for item in sentiment: 
                key = list(item.keys())[0]
                value = item[key]

                # Check if the key already exists in the key_counts dictionary
                if key in key_counts:
                    key_counts[key] = 1  # Increment the count if the key is repeated
                else:
                    key_counts[key] = 1   # Initialize the count if the key is encountered for the first time

                # Add the 'count' key to each dictionary and update its value
                value['Total'] = key_counts[key]
            return sentiment
        
        item['Llama2_Sentiment'] = getCounts(item['Llama2_Sentiment'])                
        print(item['Llama2_Sentiment'])
        return item