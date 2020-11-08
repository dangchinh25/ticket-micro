import axios from 'axios';

export default ({ req }) => {
	if (typeof window === 'undefined') {
		//we are on the server
		// request should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/
		// SERVICENAME: kubectl get services
		// NAMESPACE: kubectl get namespace
		return axios.create({
			baseURL:
				'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers,
		});
	} else {
		// we are on the browser
		return axios.create({
			baseURL: '/',
		});
	}
};
