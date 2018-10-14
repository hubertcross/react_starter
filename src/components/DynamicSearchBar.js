import React from 'react';
//import { getName } from '../helpers/helpers';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

class DynamicSearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSearchInputTextChange = this.handleSearchInputTextChange.bind(this);
	}

	handleFilterTextChange(e) {
		console.log("herro");
		this.props.onFilterTextChange(e.target.value);
	}

	handleInStockChange(e) {
		this.props.onInStockChange(e.target.checked);
	}

	handleSearch(input) {
		console.log("handleSearch in DynamicSearchBar");
		this.props.handleSearch(input);
	}

	handleSearchInputTextChange(e) {
		this.props.handleSearchInputTextChange(e.target.value);
	}

	render() {


 		return (
    		
    		<div>
	    		<Row>
	    			<Col xs={2} xsOffset={0}>
	    	 			<input
	    	 				type="text"
	    	 				required placeholder={this.props.placeholder}
	    	 				value={this.props.inputTextValue}
	    	 				onChange={this.handleSearchInputTextChange}
	    	 			/>
	    	 		</Col>
	    	 	</Row>
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
	    	 			<input
	    	 				type="checkbox"
	    	 				checked={this.props.inStockOnly}
	    	 				onChange={this.handleInStockChange}
	    	 			/>
	    	 			{' '}
	    	 			Only show products in stock
	    	 		{ /* 
					    <ButtonToolbar> 
					      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
					        <ToggleButton value={2}>Checkbox 2</ToggleButton>
					      </ToggleButtonGroup>
					    </ButtonToolbar>
					*/ }					    
				    </Col>
				</Row>

    	 	</div>
    	);
	}
}

export default DynamicSearchBar;