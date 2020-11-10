import request from 'supertest';
import { app } from '../../app';

it('has a route handler listing to /api/tickets for post request', async () => {
	const response = await request(app).post('/api/tickets').send({});

	expect(response.status).not.toEqual(404);
});

it('can only be access if the user is signed in', async () => {
	await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({});
	expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: '', price: 10 })
		.expect(400);

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ price: 10 })
		.expect(400);
});

it('returns an error if an invalid price is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'qkwcbqkw', price: -10 })
		.expect(400);

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'wiebciew' })
		.expect(400);
});
it('create a ticket with valid input', async () => {
	await request(app)
		.post('/api/tickets')
		.send({ title: 'kwjbnrcsd', price: 20 })
		.expect(201);
});
