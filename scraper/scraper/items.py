from scrapy.item import Item, Field

class DomainAnalyitcs(Item):
    raw = Field()
    count = Field()
    domain = Field()
    words = Field()
    bigrams = Field()
    trigrams = Field()