import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
	await request(app).get('/api/tickets/eveijr').send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
	const title = 'concert';
	const price = 20;

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title, price })
		.expect(201);

	const ticektResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send()
		.expect(200);

	expect(ticektResponse.body.title).toEqual(title);
	expect(ticektResponse.body.price).toEqual(price);
});
