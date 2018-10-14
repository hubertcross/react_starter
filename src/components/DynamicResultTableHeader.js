import React from 'react';

class DynamicResultTableHeader extends React.Component {
	render() {
	  	return (
	        <th>{this.props.headerName}</th>
	    );
	}
}

export default DynamicResultTableHeader;