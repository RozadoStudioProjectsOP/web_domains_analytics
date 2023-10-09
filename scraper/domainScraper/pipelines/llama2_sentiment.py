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
    max_length=300,
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

        template = """Classify the text into joy, anger, disgust, fear, sadness, surprise, trust or neutral. Reply with only one word and nothing else: Joy, Anger, Disgust, Fear, Sadness, Surprise, Trust, Neutral.

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
                    return answer.lstrip()

                emotion = classify(text)

                emotionObject = {emotion: {'name': emotion.capitalize(), 'Total': 1}}

                sentiment.append(emotionObject)

            return sentiment

        item['llama2_sentiment'] = getTotals(item['llama2_sentiment'])

        def getCounts(sentiments):
            # Create a dictionary to keep track of the counts for each key
            summed_sentiments = {}

            for item in sentiments:
                key = list(item.keys())[0]
                value = item[key]
                if key in summed_sentiments:
                    summed_sentiments[key]['Total'] += value['Total']
                else:
                    summed_sentiments[key] = value

            result_sentiments = [{key: value} for key, value in summed_sentiments.items()]

            return result_sentiments

        item['llama2_sentiment'] = getCounts(item['llama2_sentiment'])
        print(item['llama2_sentiment'])
        return item
