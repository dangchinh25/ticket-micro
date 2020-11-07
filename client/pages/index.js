import axios from 'axios';

const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return <h1>Landing page</h1>;
};

// when getInitailProps get called inside the server, one of the atributes passed to it is the "req", which is the same as the req object in ExpressJs
LandingPage.getInitialProps = async ({ req }) => {
	if (typeof window === 'undefined') {
		// we are on the server
		// request should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/
		// SERVICENAME: kubectl get services
		// NAMESPACE: kubectl get namespace
		const { data } = await axios.get(
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
			{ headers: req.headers } // this is needed to inform ingress-nginx to recognise this use 'ticketing.dev' domain
		);

		return data;
	} else {
		// we are on the browser
		// request can be made using defaul domain name
		const { data } = await axios.get('/api/users/currentuser');
		return data;
	}
};

export default LandingPage;
