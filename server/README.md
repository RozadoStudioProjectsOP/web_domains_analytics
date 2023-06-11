# Studio 5 Project - Backend

---
## Setting up development environment
1. Clone the repository and open it in VSCode and install the dependencies using ``` npm install ``` in the terminal. 
2. Make a copy of the [example.env](https://github.com/RozadoStudioProjectsOP/web_domains_analytics/blob/78f0dc8080b88901a82c50b7b303f401beb65b93/server/example.env) file and fill the variables with the needed data.
3. ``` npm run start ``` in the terminal to start the server.

#### Server/Database
```
MONGO_URI_PROD = mongodb+srv://<user>:<password>@<cluster URI>/prod?retryWrites=true&w=majority
MONGO_URI_DEV = mongodb+srv://<user>:<password>@<cluster URI>/dev?retryWrites=true&w=majority
MONGO_URI_TEST = mongodb+srv://<user>:<password>@<cluster URI>/test?retryWrites=true&w=majority
NODE_ENV = < e.g. development> 
PORT = <port num>
JWT_SECRET = < > 
JWT_LIFETIME = <time e.g. 1h>

# CORS Config
CORS_ORIGIN_DEV = <frontend dev url e.g. localhost>
CORS_ORIGIN_PROD = <frontend prod url>
```
---
#### OAuth
```
# To use social media login, OAuth apps need to be created for the 
# following providers and add the required client IDs/secrets.

# OAuth Config
CALLBACK_URL_DEV = <backend dev url>
CALLBACK_URL_PROD = <backend prod url>

# Google OAuth
GOOGLE_CLIENT_ID = < >
GOOGLE_CLIENT_SECRET = < >

# Github OAuth
GITHUB_CLIENT_ID = < >
GITHUB_CLIENT_SECRET = < >
```
Create Google OAuth app here: [Google Developers Console](https://console.developers.google.com/)  
Instructions for GitHub OAuth app here: [GitHub Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

---
#### Scrapy
```
# To use live scraping, the scraper in ./scraper needs to be deployed on Zyte
# and the following variables be set.

# Scrapy Config
PROJECT_ID = < Zyte project id>
DB = < database environment e.g dev > 
API_KEY = < Zyte auth >
```
---
