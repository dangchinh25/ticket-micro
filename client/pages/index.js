import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return <h1>Landing page</h1>;
};

// when getInitailProps get called inside the server, one of the atributes passed to it is the "req", which is the same as the req object in ExpressJs
LandingPage.getInitialProps = async (context) => {
	const client = await buildClient(context);

	const { data } = client.get('/api/users/currentuser');

	return data;
};

export default LandingPage;
