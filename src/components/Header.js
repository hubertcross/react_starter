import React from 'react';

// Stateless functional component wes bos #08

const Header = (props) => {
    return (
    	 <div>
    	 	<p>{props.headerText}</p>
    	 </div>
    );
}

export default Header;