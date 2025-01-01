import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import { User } from "../../models/userModel.js";
import { UserProgressEnum } from "../../enums/UserProgressEnum.js";

describe('User Controller e2e', () => {
    const user = {
        name: 'name',
        email: 'mail@mail.com',
        password: 'password',
    };
    let mongodb;
    
    beforeAll(async () => {
        mongodb = await MongoMemoryServer.create();
        const mongoUri = mongodb.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
    });

    it('should create a user', async () => {
        
    
        await request(app).post('/api/user').send(user).expect(201);
        
        const userDoc = await User.findOne({ email: user.email });
        const { progress: { level, completion }} = userDoc;

        expect(userDoc).not.toBeNull();
        expect({ level, completion }).toEqual(UserProgressEnum);
        expect(userDoc.password).not.toBe(user.password);
    });

    it('should not create with duplicated email', async () => {
        await request(app).post('/api/user').send(user).expect(400);
    });

    it('should get a user progress', async() => {
        const { id } = await User.findOne({ email: user.email });
        await request(app).get(`/api/user/${id}/progress`).expect(200);
    })
})