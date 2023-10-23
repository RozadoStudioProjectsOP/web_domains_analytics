# The schema of item
from scrapy.item import Item, Field

class HeaderItems(Item):
    header = Field()
    url = Field()
    singlePage = Field()