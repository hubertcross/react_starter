import React from 'react';
import DynamicSearchBar from '../components/DynamicSearchBar';
import Header from '../components/Header';

import DynamicResultTable from '../components/DynamicResultTable';
import Button from 'react-bootstrap/lib/Button';

import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
// import * as ReactBootstrap from 'react-bootstrap';


import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

var products = require('../lib/products');


// 2018-01-25
/*
	Need to parameterize:
	The service URI to search from.
	The column headers to include in the results \
	                                             *** see columnsToDisplay prop!
	The columns to include int the results rows  /
	The regular expression for search parameters ?
*/

/*
 * Configurable search panel
 * props:
 * columnsToDisplay
*/
class DynamicSearchPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false,
			myString: '',
			searchInput: '',
			resultsRows: [],
			resultsHeaders: [],
			searchDone: false // track if a search has been made, to render DynamicResultTable or not
		};
		// this assigns the handler functions to the class
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
		// this.handleButtonClick = this.handleButtonClick.bind(this);
		// this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSearchInputTextChange = this.handleSearchInputTextChange.bind(this);
		// this.doProductSearch = this.doProductSearch.bind(this);
		// this.doProductSearch = products.doProductSearch.bind(this);
		this.searchFunction = this.props.myOptions.searchFunction;
	}

	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}

	handleInStockChange(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		});
	}

	// handleButtonClick() {
	// 	console.log("wtf");
	// 	var numreg='5520846';
	// 	var url='http://192.168.44.22:3002/api/series?cod_emp=03&cod_suc=026&tip_dia=F';
	// 	//fetch('http://192.168.44.22:3002/api/balls', {method: 'GET',dataType:'json'}).then(response => response.text()).then((response) => {
	// 	fetch(url, {method: 'GET',dataType:'json'})
	// 		.then(response => response.json())
	// 			.then((response) => {
	// 	    	 // Set the state to the response here
	// 	   		  //this.setState({myState : response});
	// 	    	 //console.dir(response['results'][0]);
	// 	    	 var opts = [];
	// 	    	 for (var i = 0; i < response['results'][0].length; i++) {
	// 	    	 	// console.log("bleh" + response['results'][0][i]);
	// 	    	 	 opts[opts.length] = { 
	// 	    	 	 	value : response['results'][0][i]['COD_DIA'],
	// 	    	 	 	label : response['results'][0][i]['COD_DIA'] }
	// 	    	 }
	// 	    	 console.log(JSON.stringify(opts));
	// 	    	 this.setState({
	// 	    	 	myString: JSON.stringify(response)
	// 	    	 });
	// 	}).catch(error => {
	// 	     console.log('AJAX request failed with the error', error);
	// 	});		
	// }

	handleSubmit(event) {
		event.preventDefault();
		console.log("ASS! You submitted the form.");
		console.log(this.state.searchInput)

		/************
		CALL /api/products and get search results here
		update state with search results!
		**********/
		this.searchFunction(this.state.searchInput);
	}

	// example call: doSearchRequest('192.168.44.22', '3002', '/api/products?', [{ "alt": "D8EA" }])
	doSearchRequest(server, port, baseURI, paramObjectArray) {
		const protocol = 'http://';
		var URL = protocol + server; // http://192.168.44.22
		URL = URL + ':' + port; // http://192.168.44.22:3002
		URL = URL + baseURI; // http://192.168.44.22:3002/api/products?

		// append each parameter
		paramObjectArray.forEach(obj => {
			URL = URL + obj['pName'] + '=' + obj['pData'] + '&';
		});

		var initObject = {
			method : 'GET',
			dataType : 'json'
		};
	}

	// doProductSearch(searchParam) {
	// 	console.log("Doing product search with param: " + searchParam);
	// 	const url = 'http://192.168.44.22:3002/api/products?alt=' + searchParam;

	// 	fetch(url, { method : 'GET', dataType : 'json' })
	// 		.then(response => response.json())
	// 			.then((response) => {
	// 				console.log(JSON.stringify(response['results']));
	// 	    	 this.setState({
	// 	    	 	resultsRows: response['results'],
	// 	    	 	resultsHeaders: response['colNames'],
	// 	    	 	searchDone: true
	// 	    	 });
	// 	}).catch(error => {
	// 	     console.log('AJAX request failed with the error', error);
	// 	});			
	// }

	// handleSearch(event) {
	// 	event.preventDefault();
	// 	console.log("TITS! You submitted the form.");
	// 	// console.log(event);

	// }

	handleSearchInputTextChange(inputText) {
		console.log("Text changed");
		this.setState({
			searchInput: inputText
		});
	}

	render() {
 		return (
 			<form className="dynamic-search" onSubmit={(event) => this.handleSubmit(event)}>
			      	<DynamicSearchBar
			      		filterText={this.state.filterText}
			      		inStockOnly={this.state.inStockOnly}
			      		onFilterTextChange={this.handleFilterTextChange}
			      		onInStockChange={this.handleInStockChange}
			      		handleSearch={this.handleSearch}
						handleSearchInputTextChange={this.handleSearchInputTextChange}
						inputTextValue={this.state.searchInput}
						placeholder={this.props.placeholder}
			      	/>
			    <Row>
			    	<Col xs={6} xsOffset={0}>
			    		<DynamicResultTable
			    			products={this.props.products}
			    			filterText={this.state.filterText}
			    			inStockOnly={this.state.inStockOnly}
			    			resultsRows={this.state.resultsRows}
			    			resultsHeaders={this.state.resultsHeaders}
			    			columnsToDisplay={this.props.columnsToDisplay}
			    			searchDone={this.state.searchDone}
			    		/>
			    	</Col>
			    </Row>
			    {/*
			    <Row>
			    	<Col>
			    		<input
			    			type="button"
			    			value="ugh"
			    			onClick={this.handleButtonClick}
			    		/>
			    	</Col>
			    </Row>

			    <Row>
			    	<Col xs={6} xsOffset={0}>
			    		<Dropdown options={this.props.myOptions} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
			    	</Col>
			    </Row>
			    */}
    	 	</form>
    	);
	}
}

export default DynamicSearchPanel;