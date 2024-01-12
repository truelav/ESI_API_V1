import request from 'supertest';
import mongoose from 'mongoose';
import dontenv from  "dotenv"
import app  from "../../server.js"
import connectDB from '../../config/db.config.js';
import User from '../../models/User/User.js';
dontenv.config()

const newUser = {
    name: 'test_name',
    email: 'test_user1@example.com',
    password: '123',
    role: "ADMIN"
}

let server

describe('User Controllers', () => {
    beforeAll(async () => {
        connectDB()
        server = app.listen(8888, (err) => {
            if (err) return console.log(err);
            console.log('testing server running')
        })
    })    
      
    afterAll(async () => {
        server.close()
        await mongoose.connection.close()
        console.log('server and mongoDB closed')
    })

    describe('GET /auth/users', () => {
        it('should get all users', async () => {
            const res = await request(server)
                .get("/api/auth/users")

            const data = res.body
    
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(data))
        })
    })

    describe('POST /auth/register', () => {
        it('should add one user to DB', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(newUser);

            const addedUser = res.body
            console.log(addedUser)
            newUser.id = res.body.newUser._id    

            expect(res.statusCode).toBe(201);
            expect(addedUser).toHaveProperty('email');
            expect(addedUser.email).toBe(newUser.email);
            expect(addedUser.name).toBe(newUser.name);

        })
    })

    // describe('DELETE /auth/users/:id', () => {
    //     it('should Delete the new User', async () => {
    //         const res = await request(server)
    //             .delete(`/api/auth/users/${newUser.id}`)  

    //         expect(res.statusCode).toBe(200);
    //         console.log(res.body)
    //     })
    // })


});

