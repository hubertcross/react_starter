import React from 'react';
import DynamicResultRow from '../components/DynamicResultRow';
import DynamicResultTableHeader from '../components/DynamicResultTableHeader';

class DynamicResultTable extends React.Component {

	render() {
    const columnsToDisplay  = this.props.columnsToDisplay;
    const resultsRows       = this.props.resultsRows;
    const headers = [];
    // This is where we cycle through the column names specified in the SearchScreen
    // component 2 levels above the current one
    // It lets us choose the columns/fields we want to see in the table
    columnsToDisplay.forEach((columnName) => {
      // console.log("resultsHeaders: " + resultsHeaders)
      // console.log("tits: " + resultsHeaders[columnName]  + " ugh: "  +  columnName);
      headers.push(
        <DynamicResultTableHeader
          key={columnName}
          headerName={columnName}
          // headerName={this.props.resultsHeaders[columnName]}
        />
      );
    });    

    if ( this.props.searchDone === true)
    {
      // console.log(columnsToDisplay);
 		return (
        <div>
        <table className="table table-striped table-bordered table-condensed table-hover">
          <thead className="thead-dark">
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
               <DynamicResultRow
                resultsRows={resultsRows}
                columnsToDisplay={{columnsToDisplay}}
              />
          </tbody>
        </table> 
        </div>
        
    	);
    }
    else {
      return null;
    }
	}
}

export default DynamicResultTable;