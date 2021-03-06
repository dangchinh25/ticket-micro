import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', global.signin())
		.send({
			title: 'iowervn',
			price: 20,
		})
		.expect(404);
});
it('returns a 401 if the user is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'iowervn',
			price: 20,
		})
		.expect(401);
});
it('returns a 401 if the user does not own the ticket', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'wvwev', price: 20 });

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', global.signin())
		.send({ title: 'wjvwwsvwse', price: 1000 })
		.expect(401);
});
it('returns a 400 if the user provides an invalid title or price', async () => {
	const cookie = global.signin();
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({ title: 'wvwev', price: 20 });

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: '', price: 20 })
		.expect(400);
	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: 'cdsdc', price: -10 })
		.expect(400);
});
it('updates the ticket provided valid input', async () => {
	const cookie = global.signin();
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({ title: 'wvwev', price: 20 });

	const newTitle = 'new title';
	const newPrice = 1000;

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: newTitle, price: newPrice })
		.expect(200);

	const ticektResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send()
		.expect(200);

	expect(ticektResponse.body.title).toEqual(newTitle);
	expect(ticektResponse.body.price).toEqual(newPrice);
});

it('updates the ticket provided valid input', async () => {
	const cookie = global.signin();
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({ title: 'wvwev', price: 20 });

	const newTitle = 'new title';
	const newPrice = 1000;

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: newTitle, price: newPrice })
		.expect(200);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
