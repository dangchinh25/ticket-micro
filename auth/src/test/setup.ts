import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: any;

declare global {
	namespace NodeJS {
		interface Global {
			signin(): Promise<string[]>;
		}
	}
}

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

global.signin = async () => {
	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post('/api/users/signup')
		.send({ email, password })
		.expect(201);

	const cookie = response.get('Set-Cookie');

	return cookie;
};
