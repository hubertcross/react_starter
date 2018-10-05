import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css'; 

//import StorePicker from './components/StorePicker';
import Header from './Header';
import ProductSearchPanel from './ProductSearchPanel';

// import Grid from 'react-bootstrap/lib/Grid';
// import Col from 'react-bootstrap/lib/Col';
// import Row from 'react-bootstrap/lib/Row';

// import Pagination from "react-js-pagination";
// import Pagination from 'react-bootstrap/lib/Pagination';

// import { RingLoader } from 'react-spinners';
var cities = require('../lib/cities');

const PageItem = props => {
  // const pageURI = window.location.hash + window.location.search;
  const liClassName = (props.activePage === props.pageName) ? "page-item active" : "page-item";
  // const ahrefClassName = (props.disabled) ? "nav-link disabled" : "nav-link" ;
  return (
    <li className={liClassName} onClick={(e) => {props.updateActivePage(e, props.pageName)}}><a className="page-link">{props.pageName}</a></li>
  );
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linesPerPage: 10,
      linesTotalCount: 100
    }
    this.updateActivePage = this.updateActivePage.bind(this);
  }

  updateActivePage(e, pageName) {
    e.preventDefault();
    // console.log("ugh lele: " + console.log((e.detail)));
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

    pageitems.push(<PageItem key="Prev" pageName="Prev" updateActivePage={this.updateActivePage}/>);
    for (let i = 1; i <= this.props.itemsCountPerPage; i++) {
      // pageString = (i == 0 ? "Previous" : i);
      // pageString = (i == this.props.itemsCountPerPage - 1 ? "Next" : i);
      pageitems.push(
        <PageItem key={i} pageName={i} activePage={this.state.activePage} updateActivePage={this.updateActivePage}/>
      );
    }   
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

class ProductSearchScreen extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    // you either bind first before you specify these in state, or you bind at same moment you specify them in state
    // this.handlePageChange = this.handlePageChange.bind(this);
    // this.paginationUpdate = this.paginationUpdate.bind(this);

    this.state = {
      loading: false,
      // Pagination
      paginationActivePage: 1,
      paginationLinesPerPage: 10,
      paginationTotalCount: 100,
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
          <ProductSearchPanel
          ref={this.child}
          myOptions={this.state.myOptions}
          columnsToDisplay={columnsToDisplay}
          config={this.props.config}
          uri={this.props.uri}
          // paginationActivePage={this.state.paginationActivePage}
          // itemsCountPerPage={this.state.paginationLinesPerPage}

        />
        <Pagination
          activePage={this.state.paginationActivePage}
          itemsCountPerPage={this.state.paginationLinesPerPage}
          totalItemsCount={this.state.paginationTotalCount}
          // onChange={this.handlePageChange}
          // innerClass='pagination'
        />    
    
      </div>
    );
  }
}

export default ProductSearchScreen;