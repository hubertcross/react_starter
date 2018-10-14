var axios = require('axios');

// example call: doSearchRequest('192.168.44.22', '3002', '/api/products?', [{ "alt": "D8EA" }])
module.exports.doCitySearch = function doCitySearch(config, service, paramObjectArray, itemsPerPage) {
	const protocol = config.protocol;
	const server = config.server;
	const port = config.port;
	const baseURI = config.baseURI;

	let totalNumberOfResultRows;
	// const uri = config.uri;

	let URL = protocol + server; // http://192.168.44.22
	URL = URL + ':' + port; // http://192.168.44.22:3002
	URL = URL + baseURI; // http://192.168.44.22:3002/api
	URL = URL + '/' + service; // http://192.168.44.22:3002/api/products?
	// URL = URL + uri;
	URL = URL + '?';

	// append each parameter
	paramObjectArray.forEach(obj => {
		URL = URL + obj['pName'] + '=' + obj['pData'] + '&';
	});

	console.log("URL with query parameters: " + URL);
	this.setState({
		// resultsRows: [],
		// resultsHeaders: [],
		searchDone: false,
		loading: true});

	axios.get(URL)
	.then((response) => {
		// console.log("AXIOS: " + JSON.stringify(response['data']));

		// the stuff in response depends on the db driver / API
		// "this" refers to ProductSearchPanel
		this.setState({
			resultsRows: response['data']['rows'],
			resultsHeaders: response['data']['fields'],
			// resultsHeaders: response['data']['colNames'],
			searchDone: true,
			loading: false
		});

		// if (response['data']['results'][0]['TotalRecords']) {
		// 	totalNumberOfResultRows = response['data']['results'][0]['TotalRecords'];	
		// }
		// else {
		if (response['data']['rows'].length > 0) {
			totalNumberOfResultRows = response['data']['rows'][0]['fullcount'];
		}
		// }

		// we dont know ahead of time how many pages we're going to get back from a search
		// but we do know a head of time how many items we want per page
		this.props.myOptions.paginationUpdateFunction(itemsPerPage, totalNumberOfResultRows);

	}).catch(function(error) {
		console.log("AXIOS ERROR: " + error);
	});

}