import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { HashRouter } from 'react-router-dom';

// import StorePicker from './components/StorePicker';

import 'bootstrap/dist/css/bootstrap.min.css';


const Root = () => {
	return (
		<HashRouter>
		<App/>
		</HashRouter>
		
		/*
		<BrowserRouter>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/store" component={StorePicker} />
			</div>
		</BrowserRouter>
		*/
		
	)
}

ReactDOM.render(<Root/>, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
