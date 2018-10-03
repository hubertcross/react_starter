import React from 'react';
// import DynamicSearchBar from '../components/DynamicSearchBar';
import Header from '../components/Header';

import DynamicResultTable from '../components/DynamicResultTable';
// import Button from 'react-bootstrap/lib/Button';

// import Grid from 'react-bootstrap/lib/Grid';
// import Col from 'react-bootstrap/lib/Col';
// import Row from 'react-bootstrap/lib/Row';
// import * as ReactBootstrap from 'react-bootstrap';
// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// import { LoadingOverlay, Loader } from 'react-overlay-loader';
// import 'react-overlay-loader/styles.css';
import { PulseLoader } from 'react-spinners';

// var products = require('../lib/products');




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
class ProductSearchPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			// filterText: '',
			// inStockOnly: false,
			// myString: '',
			alternoSearchInput: '',
			originalSearchInput: '',
			descripcionSearchInput: '',
			aplicacionSearchInput: '',
			resultsRows: [],
			resultsHeaders: [],
			searchDone: false // track if a search has been made, to render DynamicResultTable or not
		};
		// this assigns the handler functions to the class
		// this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		// this.handleInStockChange = this.handleInStockChange.bind(this);
		// this.handleButtonClick = this.handleButtonClick.bind(this);
		// this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleAlternoSearchInputTextChange		= this.handleAlternoSearchInputTextChange.bind(this);
		// this.handleOriginalSearchInputTextChange	= this.handleOriginalSearchInputTextChange.bind(this);
		// this.doProductSearch = this.doProductSearch.bind(this);
		// 	this.doProductSearch = products.doProductSearch.bind(this);
		this.searchFunction = this.props.myOptions.searchFunction.bind(this);
		this.paginationUpdateFunction = this.props.myOptions.paginationUpdateFunction.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	// handleFilterTextChange(filterText) {
	// 	this.setState({
	// 		filterText: filterText
	// 	});
	// }

	// handleInStockChange(inStockOnly) {
	// 	this.setState({
	// 		inStockOnly: inStockOnly
	// 	});
	// }

	// this is known as prop diffing
	// it makes sure we only operate when the property we care about has changed
	// because this componentDidUpdate fires a ton
	componentDidUpdate(prevProps) {
		if (prevProps.paginationActivePage === this.props.paginationActivePage) {
			return;
		}
		console.log("componentDidUpdate called");
		this.handleSubmit(null);
	}

	handleSubmit(event) {
		if (event) {
			event.preventDefault();
		}
		console.log("ARG! You submitted the form.");
		console.log(this.state.alternoSearchInput)
		console.log(this.state.originalarchInput)

		/************
		CALL /api/products and get search results here
		update state with search results!
		**********/
		// this.searchFunction(this.state.alternoSearchInput);
		// the config, the /api/(service), and an array of parameter objects
		const parameterArray = []
		parameterArray[parameterArray.length] = { pName : "countrycode", pData : this.state.alternoSearchInput};
		parameterArray[parameterArray.length] = { pName : "o", pData : this.state.originalSearchInput};
		parameterArray[parameterArray.length] = { pName : "d", pData : this.state.descripcionSearchInput};
		parameterArray[parameterArray.length] = { pName : "ap", pData : this.state.aplicacionSearchInput};
		// page size
		parameterArray[parameterArray.length] = { pName : "ps", pData : 5};
		// if it's a new submit, we grab page 1, otherwise we grab the page being clicked on in the pagination component
		if (event) {
			parameterArray[parameterArray.length] = { pName : "pn", pData : 1};	
		}
		else {
			parameterArray[parameterArray.length] = { pName : "pn", pData : this.props.paginationActivePage};
		}
		

		// this.searchFunction(this.props.config, 'sav/productdetails', parameterArray, this.props.itemsCountPerPage	);
		this.searchFunction(this.props.config, 'cities', parameterArray, this.props.itemsCountPerPage	);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		console.log("Current field value changed to: " + value);

		this.setState({
		  [name]: value
		});
	}	

	render() {
 		return (
 			<div className="container">
 			<form className="dynamic-search" onSubmit={(event) => this.handleSubmit(event)}>
	    		<div className="row">
	    			<div className="col-md-4 offset-md-2 mt-2">
	    	 			<input
	    	 				type="text"
	    	 				placeholder={this.props.myOptions.alternoPlaceholder}
	    	 				onChange={this.handleInputChange}
	    	 				name="alternoSearchInput"
	    	 			/>
	    	 		</div>
	    	 		<div className="col-md-4 mt-2">
	    	 			<input
	    	 				type="text"
	    	 				placeholder={this.props.myOptions.originalPlaceholder}
	    	 				onChange={this.handleInputChange}
	    	 				name="originalSearchInput"
	    	 			/>
	    	 		</div>
	    	 	</div>
	    		
 				<div className="row">
	    			<div className="col-md-4 offset-md-2 mt-2">
	    	 			<input
	    	 				type="text"
	    	 				placeholder={this.props.myOptions.descripcionPlaceholder}
	    	 			 	onChange={this.handleInputChange}
	    	 				name="descripcionSearchInput"
	    	 			/>
	    	 		</div>
	    			<div className="col-md-4 mt-2">
	    	 			<input
	    	 				type="text"
	    	 				placeholder={this.props.myOptions.aplicacionPlaceholder}
	    	 			 	onChange={this.handleInputChange}
	    	 				name="aplicacionSearchInput"
	    	 			/>
	    	 		</div>	    	 		
	    	 	</div> 
	    	 	<div className="row">
	    	 		<div className="col-md-2 offset-md-5 col-sm-4 offset-sm-4 col-xs-2">
						<div className="form-group" controlId="formControlsSelect">
						<label className="mr-sm-2">Results per page</label> 
							<select className="col-xs-1 custom-select" componentClass="select" placeholder="select">
								<option value="10">10</option>
								<option value="11">11</option>
							</select>
						</div>
    				</div>
				</div>	    	 	
				<div className="row">
	    	 		<div className="col-md-2 offset-md-5">
	    	 			<button className="btn btn-primary">Search</button>
	    	 		</div>
				</div>
	    	{/*
			    <Row>
			    	<Col className="col-sm-2 col-sm-offset-5">
						<PulseLoader color={'#123abc'} loading={this.state.loading}/>			    	
			    	</Col>
			    </Row>			
			    <div className="row">
			    	<div classame="col">
			    		<DynamicResultTable
			    			resultsRows={this.state.resultsRows}
			    			resultsHeaders={this.state.resultsHeaders}
			    			columnsToDisplay={this.props.columnsToDisplay}
			    			searchDone={this.state.searchDone}
			    			className="col-md-12"
			    		/>				            				            
			    	</div>
			    </div>        
			    */}    
    	 	</form>
    	 	</div>
    	);
	}
}
			
export default ProductSearchPanel;