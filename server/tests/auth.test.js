import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../app.js'

process.env.NODE_ENV = 'testing'

chai.use(chaiHttp)

const agent = chai.request.agent(app)

const user = {
    username: 'John Doe',
    email: 'john.doe@email.com',
    password: 'P@ssw0rd123'
}

const goodUser = {
    username: 'test',
    email: 'test@email.com',
    password: 'password'
}

/**
 * This file runs all tests related with authentication
 */

it('should register user with valid input', (done) => {
    agent
      .post('/auth/register')
      .send(user)
      .end((error, res) => {
        console.log(error)
        chai.expect(res.status).to.be.equal(201)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.msg).to.be.equal('Registered')
        done()
      })
  })

  it('should login user with valid input', (done) => {
    agent
      .post('/auth/login')
      .send(user)
      .end((error, res) => {
        console.log(error)
        chai.expect(res.status).to.be.equal(201)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.msg).to.be.equal('Logged in')
        done()
      })
  })


/** Export agent variable so it can used in other test files */
export default agent