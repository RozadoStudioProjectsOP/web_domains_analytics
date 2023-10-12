from ..items import DomainAnalyitcs
from huggingface_hub.hf_api import HfFolder
from langchain import HuggingFacePipeline
from transformers import AutoTokenizer
from langchain import PromptTemplate,  LLMChain
import transformers
import torch
import spacy

if torch.cuda.is_available():
    device = torch.device("cuda")  # Check if a GPU is available, if yes, use it
    print("GPU is available and being used")
else:
    device = torch.device("cpu")  # If no GPU is available, use CPU
    print("GPU is not available, using CPU instead")

HfFolder.save_token('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')  # Save a token to HfFolder

model = "meta-llama/Llama-2-7b-chat-hf"  # Define the model you want to use

tokenizer = AutoTokenizer.from_pretrained(model)  # Load the tokenizer for the specified model

nlp = spacy.load('en_core_web_sm')  # Load the spaCy English language model

pipeline = transformers.pipeline(
    "text-generation",
    device=0,
    model=model,
    tokenizer=tokenizer,
    torch_dtype=torch.bfloat16,
    max_length=300,
    do_sample=True,
    top_k=10,
    num_return_sequences=1,
    batch_size=64,
    eos_token_id=tokenizer.eos_token_id
)  # Configure a text generation pipeline using the specified model and settings

llm = HuggingFacePipeline(pipeline=pipeline, model_kwargs={'temperature': 0})  # Create a HuggingFacePipeline

class Llama2SentimentPipeline:

    def process_item(self, item, spider):
        item = DomainAnalyitcs(item)  # Create a DomainAnalytics item from the input item

        # Get sentiment scores for the scraped page
        raw_text = item['raw']  # Extract the 'raw' text from the item
        doc = nlp(raw_text)  # Process the text with spaCy

        phrasesArray = [sent.text.strip() for sent in doc.sents]  # Split the processed text into sentences

        template = """Classify the text into joy, anger, disgust, fear, sadness, surprise, trust or neutral. 
        Reply with only one word and nothing else: Joy, Anger, Disgust, Fear, Sadness, Surprise, Trust, Neutral.
        Examples:
        Text: I can't believe you would betray my trust like this, after everything we've been through. Your actions have left me seething with anger and disappointment.
        Sentiment: Anger.
        Text: Winning the championship was an absolute thrill, and I'm overflowing with happiness and excitement!
        Sentiment: Joy.
        Text: {text}
        Sentiment:"""  # Define a template for sentiment classification

        item['llama2_sentiment'] = []  # Initialize an empty list to store sentiment results

        def getTotals(sentiment):
            for text in phrasesArray:
                prompt = PromptTemplate(template=template, input_variables=["text"])  # Create a prompt template
                llm_chain = LLMChain(prompt=prompt, llm=llm)  # Create an LLMChain

                def classify(text):
                    raw_llm_answer = llm_chain.run(text)  # Run the LLMChain with the text
                    answer = raw_llm_answer.split('.')[0]
                    return answer.lstrip()

                emotion = classify(text)  # Classify the sentiment of the text
                emotionObject = {emotion: {'name': emotion.capitalize(), 'Total': 1}}  # Create a sentiment object

                sentiment.append(emotionObject)  # Append the sentiment object to the results

            return sentiment

        item['llama2_sentiment'] = getTotals(item['llama2_sentiment'])  # Get sentiment totals

        def getCounts(sentiments):
            summed_sentiments = {}  # Create a dictionary to store summed sentiment counts

            for item in sentiments:
                key = list(item.keys())[0]
                value = item[key]
                if key in summed_sentiments:
                    summed_sentiments[key]['Total'] += value['Total']  # Update sentiment counts
                else:
                    summed_sentiments[key] = value  # Add a new sentiment count

            return summed_sentiments

        item['llama2_sentiment'] = getCounts(item['llama2_sentiment'])  # Summarize sentiment counts
        print(item['llama2_sentiment'])  # Print the sentiment results
        return item 