import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

let mongo: any;

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}

jest.mock('../nats-wrapper');

beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

beforeEach(async () => {
	// reset the test db for each test so we have clean data
	const collections = await mongoose.connection.db.collections();

	for (let connection of collections) {
		await connection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = () => {
	// Build a JWT payload {id, email}
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com',
	};
	// Create the JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);
	// Build a session object {jwt: MY_JWT}
	const session = { jwt: token };
	// Take the JSON and encode as based64
	const sessionJson = JSON.stringify(session);
	const base64 = Buffer.from(sessionJson).toString('base64');
	// return a string that is a cookie with the encoded data
	return [`express:sess=${base64}`];
};
