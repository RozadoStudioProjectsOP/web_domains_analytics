from scrapy.item import Item, Field

class WordsItem(Item):
    domain = Field()
    words = Field()
    bigram = Field()
    trigram = Field()