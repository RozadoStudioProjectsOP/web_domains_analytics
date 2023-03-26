import scrapy

class WordsItem(scrapy.Item):
    words = scrapy.Field()