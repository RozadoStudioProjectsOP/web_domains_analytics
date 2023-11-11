import agent from './auth.test.js'
import User from '../models/user.js'

/**
 * Delete all resources. If you want to mock your data,
 * avoid using seeder.js
 */
const deleteResources = () => {
    User.deleteMany()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send(err)
    })
}

/**
 * Delete all resources before each test. This method is
 * commonly called setUp in other programming languages, i.e., Python
 */
before((done) => {
    deleteResources()
    done()
})

/**
 * Delete all resources after each test. This method is
 * commonly called tearDown in other programming languages, i.e., Python
 */
after((done) => {
    agent.close()
    done()
})