import axios from 'axios';

const LandingPage = ({ currentUser }) => {
	console.log(currentUser);

	return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async () => {
	if (typeof window === 'undefined') {
		// we are on the server
		// request should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/
		// SERVICENAME: kubectl get services
		// NAMESPACE: kubectl get namespace
		const { data } = await axios.get(
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
			{ headers: { Host: 'ticketing.dev' } } // this is needed to inform ingress-nginx to recognise this use 'ticketing.dev' domain
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
