import mongoose from 'mongoose';

// interface required to create a new record
interface TicketAttrs {
	title: string;
	price: number;
	userId: string;
}

// a represent of a record after going through mongoose (may have some new attributes)
interface TicketDoc extends mongoose.Document {
	title: string;
	price: number;
	userId: string;
}

// properties tied to the Model
interface TicketModel extends mongoose.Model<TicketDoc> {
	build(attrs: TicketAttrs): TicketDoc;
}

// definition of the model
const ticketSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

// add method to the model
ticketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
