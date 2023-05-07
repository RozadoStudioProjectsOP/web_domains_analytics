from scrapy.item import Item, Field

class DomainAnalyitcs(Item):
    raw = Field()
    counts = Field()
    domain = Field()
    words = Field()
    bigrams = Field()
    trigrams = Field()