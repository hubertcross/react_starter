import React, { Component } from 'react';
import Header from './Header';
import CitySearchPanel from './CitySearchPanel';

var cities = require('../lib/cities');

const PageItem = props => {
  const liClassName = (props.activePage === props.pageName) ? "page-item active" : "page-item";
  return (
    <li className={liClassName} onClick={(e) => {props.updateActivePage(e, props.pageName)}}><a className="page-link">{props.pageName}</a></li>
  );
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    }
    this.updateActivePage = this.updateActivePage.bind(this);
  }

  /* Updates the highlighted page in the pagination component */
  updateActivePage(e, pageName) {
    e.preventDefault();
    console.log("pageName: " + pageName);

    // If Previous is clicked, decrement the activePage if we're not already on the first
    if (pageName === "Prev") {
      this.setState(prevState => ({
        activePage: (prevState.activePage > 1 ? prevState.activePage - 1 : 1)
      }));
    }
    // If Previous is clicked, increment the activePage if we're not already on the last
    else if (pageName === "Next") {
      this.setState(prevState => ({
        activePage: (prevState.activePage < this.props.itemsCountPerPage ? prevState.activePage + 1 : this.props.itemsCountPerPage)
      }))
    }
    // Otherwise just set the new activepage to that which was clicked
    else {
      this.setState({
        activePage: pageName
      })            
    }
    console.log("New active page: " + this.state.activePage)
  }

  // Props: activePage, itemsCountPerPage, totalItemsCount
  render() {
    const pageitems = [];
    const numberOfPages = Math.floor(this.props.totalItemsCount / this.props.itemsCountPerPage);
    console.log("fullcount: " + this.props.totalItemsCount);
    console.log("items per page:" + this.props.itemsCountPerPage);
    console.log("number of pages: " + numberOfPages);

    // Before the loop, push the "Prev" page
    pageitems.push(<PageItem key="Prev" pageName="Prev" updateActivePage={this.updateActivePage}/>);
    // Loop from "1" to the number of pages ****TODO**** this should 
    // Really break down into a "..." in the center so that we dont get a crazy long pagination
    // Component on the user interface !!! 20181004
    for (let i = 1; i <= numberOfPages; i++) {
      pageitems.push(
        <PageItem key={i} pageName={i} activePage={this.state.activePage} updateActivePage={this.updateActivePage}/>
      );
    }   
    // After the loop, push the "Next" page
    pageitems.push(<PageItem key="Next" pageName="Next" updateActivePage={this.updateActivePage}/>);

    return (
      <nav aria-label="Page navigation example"  >
        <ul className="pagination">
          {pageitems}
        </ul>
      </nav>       
    );
  }
}

class CitySearchScreen extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    // you either bind first before you specify these in state, or you bind at same moment you specify them in state
    // this.handlePageChange = this.handlePageChange.bind(this);
    // Without this, state cannot be set from function called further down in hierarchy
    this.paginationUpdate = this.paginationUpdate.bind(this);

    this.state = {
      loading: false,
      // Pagination
      // paginationActivePage: 1,
      paginationLinesPerPage: 10,
      paginationTotalCount: 40,
      myOtherStateObject: {},
      // Send the search function in my options to the dynamic components!!
      myOptions: {
        searchFunction: cities.doCitySearch,
        paginationUpdateFunction: this.paginationUpdate,
        alternoPlaceholder: "countrycode",
        originalPlaceholder: "cityname",
        descripcionPlaceholder: "district",
        aplicacionPlaceholder: "population"
      } // should our API server info go here ?
    };

    
  }

  //   handlePageChange(pageNumber) {
  //   console.log(`active page is ${pageNumber}`);
  //   this.setState({paginationActivePage: pageNumber});
  // }

  paginationUpdate(newPaginationLinesPerPage, newPaginationTotalCount) {
    console.log("Updating pagination component with: " + newPaginationLinesPerPage + ", " + newPaginationTotalCount);
    this.setState(
      { paginationLinesPerPage: newPaginationLinesPerPage,
        paginationTotalCount: newPaginationTotalCount
     });
  }

 render() {
    const columnsToDisplay = [
      "id",
      "name",
      "countrycode",
      "district",
      "population"//,
    ];

    return (
      <div className="ProductSearchScreen">
        {/*<RingLoader
          color={'#123abc'} 
          loading={this.state.loading} 
        />*/}
        <Header headerText="City search"/>
          <CitySearchPanel
          ref={this.child}
          myOptions={this.state.myOptions}
          columnsToDisplay={columnsToDisplay}
          config={this.props.config}
          uri={this.props.uri}
          totalNumberOfRows={this.state.totalNumberOfRows}
          // paginationActivePage={this.state.paginationActivePage}
          // itemsCountPerPage={this.state.paginationLinesPerPage}

        />
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-2">
              <Pagination
                activePage={this.state.paginationActivePage}
                itemsCountPerPage={this.state.paginationLinesPerPage}
                totalItemsCount={this.state.paginationTotalCount}
                // onChange={this.handlePageChange}
                // innerClass='pagination'
              />  
            </div>
          </div>
        </div>  
    
      </div>
    );
  }
}

export default CitySearchScreen;