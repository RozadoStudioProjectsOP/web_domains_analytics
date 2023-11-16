import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import agent from './auth.test.js'

chai.use(chaiHttp)

const search = {
    domain: 'https://quotes.toscrape.com/',
    // limit: 1
}

it('should get scraped data', (done) => {
    agent
        .get('/scrapy')
        .query(search)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(200)
            done()
        })
})

it('should get domains', (done) => {
    agent
        .get('/scrapy/domains')
        .query(search)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(200)
            done()
        })
})