// polyfills
import 'whatwg-fetch';
import 'url-polyfill';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './view/App';
import '../reset.css';


ReactDOM.render(<App/>, document.getElementById('app'));