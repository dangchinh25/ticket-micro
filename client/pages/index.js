import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed in </h1>
	) : (
		<h1>You are not signed in </h1>
	);
};

// when getInitailProps get called inside the server, one of the atributes passed to it is the "req", which is the same as the req object in ExpressJs
LandingPage.getInitialProps = async (context) => {
	const client = await buildClient(context);

	const { data } = await client.get('/api/users/currentuser');

	return data;
};

export default LandingPage;
