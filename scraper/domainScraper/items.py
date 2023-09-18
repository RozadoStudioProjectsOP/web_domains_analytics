# The schema of item
from scrapy.item import Item, Field

class DomainAnalyitcs(Item):
    raw = Field()
    counts = Field()
    domain = Field()
    words = Field()
    bigrams = Field()
    trigrams = Field()
    classification = Field()
    llama2_sentiment = Field()
    sentiment = Field()
    AI_Sentiment = Field()
    ner = Field()
    singlePage = Field()