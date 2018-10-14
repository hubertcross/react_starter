import React from 'react';
import { getName } from '../helpers/helpers';

class StorePicker extends React.Component {
    //constructor() {
        //super();
        // this.goToStore = this.goToStore.bind(this);
    //}

    goToStore(event) {
        event.preventDefault();

        console.log("You changed the URL");

        console.log(this.storeInput.value);
    }


  render() {
    return (
    	 <form className="store-selector" onSubmit={(event) => this.goToStore(event)}>
    	 	{ /* Comment formatting */}
             <h2>Please enter a store</h2>

    	 	 <input type="text" required placeholder="Store Name" defaultValue={getName()}
             ref={(input) => { this.storeInput = input}} />
    	 	 
    	 	 <button type="submit">Visit store -></button>
    	 	<p>Cat of the day: {this.props.myarg}</p>
    	 </form>
    );
  }
}

export default StorePicker;