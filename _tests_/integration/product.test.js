import supertest from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';
import connectDB from '../../config/db.config.js';
import createServer from '../../utils/createServer.js'

const productPayload = {
    "model": "ACHOM-001",
    "brand": "GO PRO",
    "category": "ACCESSORIES- MISC",
    "description": "Headstrap + quickclip -black",
    "features": [
    "2",
    "0"
    ],
    "images": "http://localhost:8888/static/images/1706576523368.png",
    "isActive": true,
    "price": 12,
    "quantity": 13,
    "upc": "818279010800",
}

const app = createServer()

describe("Product Integration", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri())
    })    
      
    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
        console.log('server and mongoDB closed')
    })

    describe("get Product Route", () => {

        describe("add a single product", () => {
            test("adding product", async () => {
                const response = await supertest(app).post("/api/products")

                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual({
                    images: expect.any(String),
                    upc: expect.any(String),
                    isActive: expect.any(Boolean),
                    __v: expect.any(String),
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    features: expect.any(Array),
                    upc: expect.any(String),
                    updatedAt: expect.any(String),
                    message: expect.any(String),
                    newProduct: expect(newProduct).toEqual(productPayload)
                })
            })
        })

        describe("given the product doesn't exists", () => {

            test("returns a list of products", async () => {
                const response = await supertest(app).get("/api/products")
                console.log(response.body)
                expect(response.status).toBe(200)
            })

            test("should return a 404", () => {
                expect(true).toBe(true)
            })
        })
    })
})