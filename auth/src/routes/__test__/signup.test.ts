import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on succesful signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);
});

it('returns a 400 with an invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'fvsdfvsdvsd', password: 'password' })
		.expect(400);
});

it('returns a 400 with an invalid pasword', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'p' })
		.expect(400);
});

it('returns a 400 with mising email and password', async () => {
	return request(app).post('/api/users/signup').send({}).expect(400);
});

it('disallows duplicate emails', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(400);
});
