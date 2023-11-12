import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../app.js'

chai.use(chaiHttp)

const agent = chai.request.agent(app)

const user = {
    username: 'John Doe',
    email: 'john.doe@email.com',
    password: 'P@ssw0rd123'
}

const badUser = {
    username: 'badUser',
    email: 'bad@email.com',
    password: 'password',
    role: 'admin'
}

const noUser = {
    username: 'noUser',
    email: 'noUser@email.com',
    password: 'password',
}

const wrongPass = {
    username: 'John Doe',
    email: 'john.doe@email.com',
    password: 'wrongPass'
}

/**
 * This file runs all tests related with authentication
 */

it('should register user with valid input', (done) => {
    agent
        .post('/auth/register')
        .send(user)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(201)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.msg).to.be.equal('Registered')
            done()
        })
})

it('should fail to register user with admin role', (done) => {
    agent
        .post('/auth/register')
        .send(badUser)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(401)
            chai.expect(res.body).to.be.a('object')
            chai
                .expect(res.body.msg)
                .to.be.equal('Not authorized to register as an admin')
            done()
        })
}
)
it('should fail login with invalid password', (done) => {
    agent
        .post('/auth/login')
        .send(wrongPass)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(401)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.msg).to.be.equal('Invalid password')
            done()
        })
})

it('should login user with valid input', (done) => {
    agent
        .post('/auth/login')
        .send(user)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(201)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.msg).to.be.equal('Logged in')
            done()
        })
})

it('should fail login with non registered user', (done) => {
    agent
        .post('/auth/login')
        .send(noUser)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(401)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.msg).to.be.equal('User not found')
            done()
        })
})

it('should logout user', (done) => {
    agent
        .post('/auth/logout')
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(200)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.msg).to.be.equal('Logged out')
            done()
        })
})

it('should login again for the rest of tests', (done) => {
    agent
        .post('/auth/login')
        .send(user)
        .end((error, res) => {
            chai.expect(res.status).to.be.equal(201)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.msg).to.be.equal('Logged in')
            done()
        })
})

/** Export agent variable so it can used in other test files */
export default agent