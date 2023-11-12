import agent from './auth.test.js'
import User from '../models/user.js'
import Data from "../models/data.js";

/**
 * Check if there are existing users in the database.
 */
const hasExistingUsers = async () => {
    try {
        const userCount = await User.countDocuments();
        return userCount > 0;
    } catch (err) {
        throw err;
    }
};

/**
 * Delete all resources. If you want to mock your data,
 * avoid using seeder.js
 */
const deleteResources = async () => {
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
before(async () => {
    process.env.NODE_ENV = 'testing'
    try {
        const usersExist = await hasExistingUsers();

        if (usersExist) {
            console.log('Existing users found:', await User.countDocuments());
            await deleteResources();
        } else {
            console.log('No existing users found. Skipping deletion.');
        }
    } catch (err) {
        console.error(err);
    }
});

/**
 * Delete all resources after each test. This method is
 * commonly called tearDown in other programming languages, i.e., Python
 */
after((done) => {
    agent.close()
    done()
})