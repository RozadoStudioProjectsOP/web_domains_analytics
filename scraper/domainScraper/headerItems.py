# The schema of item
from scrapy.item import Item, Field

class HeaderItems(Item):
    etag = Field()
    lastModified = Field()
    url = Field()
    singlePage = Field()