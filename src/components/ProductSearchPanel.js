import React from 'react';
// import DynamicSearchBar from '../components/DynamicSearchBar';
// import Header from '../components/Header';

import DynamicResultTable from '../components/DynamicResultTable';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// import { LoadingOverlay, Loader } from 'react-overlay-loader';
// import 'react-overlay-loader/styles.css';
import { PulseLoader } from 'react-spinners';


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
			searchDone: false, // track if a search has been made, to render DynamicResultTable or not
			selectedPageSizeOption: {value: 5, label: "5"}, // default page size
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
		this.updateSelectedPageSize = this.updateSelectedPageSize.bind(this);
	}

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
		console.log(this.state.alternoSearchInput);
		console.log(this.state.originalarchInput);
		console.log("pagesize: " + this.state.selectedPageSizeOption.value);

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
		// page size - must be grabbed from pageSize combobox in this component
		parameterArray[parameterArray.length] = { pName : "pagesiz", pData : this.state.selectedPageSizeOption.value};
		// if it's a new submit, we grab page 1, otherwise we grab the page being clicked on in the pagination component
		if (event) {
			parameterArray[parameterArray.length] = { pName : "pagenum", pData : 1};	
		}
		else {
			parameterArray[parameterArray.length] = { pName : "pagenum", pData : this.props.paginationActivePage};
		}
		

		// this.searchFunction(this.props.config, 'cities', parameterArray, this.props.itemsCountPerPage	);
		this.searchFunction(this.props.config, 'cities', parameterArray, this.state.selectedPageSizeOption.value	);
	}

	updateSelectedPageSize(newSelection) {
		this.setState({
			selectedPageSizeOption: newSelection
		});
		console.log("New page size option: " + JSON.stringify(newSelection));
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
 
		const pageSizeOptions = [{ value:  5, label:  "5" }
								,{ value:  6, label:  "6" }
								,{ value:  7, label:  "7" }
								,{ value:  8, label:  "8" }
								,{ value:  9, label:  "9" }
								,{ value: 10, label: "10" }
								,{ value: 11, label: "11" }
								,{ value: 12, label: "12" }
								,{ value: 13, label: "13" }
								,{ value: 14, label: "14" }
								,{ value: 15, label: "15" }
								,{ value: 16, label: "16" }
								,{ value: 17, label: "17" }
								,{ value: 18, label: "18" }
								,{ value: 19, label: "19" }
								,{ value: 20, label: "20" }];

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
	    	 {/* Should this page size selector be a component so we can track its state? */}
	    	 	<div className="row">
	    	 		<div className="col-md-2 offset-md-5 col-sm-4 offset-sm-4 col-xs-2">
						{/*<div className="form-group" controlid="formControlsSelect">
						<label className="mr-sm-2">Results per page</label> 
							<select className="col-xs-1 custom-select" componentclass="select" placeholder="select">
								<option value="10">10</option>
								<option value="11">11</option>
							</select>
						</div>*/}
						<Dropdown options={pageSizeOptions} onChange={(newSelection) => {this.updateSelectedPageSize(newSelection)}} value={this.state.selectedPageSizeOption.label} placeholder="Select an option" />
    				</div>
				</div>	    	 	
				<div className="row">
	    	 		<div className="col-md-2 offset-md-5">
	    	 			<button className="btn btn-primary">Search</button>
	    	 		</div>
				</div>
	    	
			    <div className="row">
			    	<div className="col-md-2 offset-md-5 mt-2 mb-2">
						<PulseLoader color={'#123abc'} loading={this.state.loading}/>			    	
			    	</div>
			    </div>			
			    <div className="row">
			    	<div className="col">
			    		<DynamicResultTable
			    			resultsRows={this.state.resultsRows}
			    			resultsHeaders={this.state.resultsHeaders}
			    			columnsToDisplay={this.props.columnsToDisplay}
			    			searchDone={this.state.searchDone}
			    			className="col-md-12"
			    		/>				            				            
			    	</div>
			    </div>        
			       
    	 	</form>
    	 	</div>
    	);
	}
}
			
export default ProductSearchPanel;