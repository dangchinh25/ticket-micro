import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />;
		</div>
	);
};

// this is an app component that wrap the application, not a single component so the argument pass in has the form {component, ctx: {req, res}}
AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');

	// this is to solve the problem of the get initial props of child component not auto invoke anymore
	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx
		);
	}

	return { pageProps, ...data };
};

export default AppComponent;
