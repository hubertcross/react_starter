import React from 'react';

class DynamicResultRow extends React.Component {

  // This syntax is known as public class fields syntax, and it's experimental, enabled in create-react-app by default
  testClick = (e) => {
    e.preventDefault();
  }

	render() {
    const resultsRows       = this.props.resultsRows;
    const columnsToDisplay  = this.props.columnsToDisplay['columnsToDisplay'];

    var rows = resultsRows.map((row, i) => 

      <tr onClick={this.testClick} key={i}>
        {
          columnsToDisplay.map((col, i) =>
            <td id={i} key={i}>{row[col]}</td>)
        }
      </tr>);

    return (
      rows
    );
	}
}

export default DynamicResultRow;