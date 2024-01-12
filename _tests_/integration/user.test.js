import faker from '@faker-js/faker'
import request from 'supertest'

import app from '../../server.js'
import setupTestDB from '../../utils/setupTestDB.js'
import * as AuthControllers from '../../controllers/Auth/AuthControllers.js'

setupTestDB()

describe('User routes', () => {

    describe('POST /api/auth/register', () => {
        let newUser

        beforeEach(() => {
            newUser = {
                name: faker.name.findName(),
                email: faker.internet.email().toLowerCase(),
                password: "password123",
                role: "ADMIN"
            }
        })

        test('it should return 200 and successfully create new user if data is good', async () => {
            await AuthControllers.register()
        })
    })

})