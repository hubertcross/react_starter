import React from 'react';

/* stateless functional component for bootstrap navitem */
const NavItem = props => {
	// const pageURI = window.location.pathname + window.location.search;
	const pageURI = window.location.hash + window.location.search;
	const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
	const ahrefClassName = (props.disabled) ? "nav-link disabled" : "nav-link" ;
	return (

	<li className={liClassName}>
	  <a href={props.path} className={ahrefClassName}>
	  	{props.name}
	  	{(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
	  </a>
	</li>
	);
}

class NavDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
  }

  showDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn : !prevState.isToggleOn
    }));
  }

  render() {
    const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '');
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle"
          href={this.props.path}
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          onClick={(e) => {this.showDropdown(e)}}>
          {this.props.name}
        </a>
        <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/">Action</a>
          <a className="dropdown-item" href="/">Another action</a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="/">Something else here</a>
        </div>    
      </li>
    );
  }
}

class NavBar extends React.Component {
	render() {
 		return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          	<NavItem path="#/" name="Home"/>
            <NavItem path="#/cities" name="Cities"/>
            <NavDropDown path="#/" name="Dropdown"/>
            <NavItem path="#/disabled" name="Disabled" disabled="True"/>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav> 	
    	);
	}
}

export default NavBar;