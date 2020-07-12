import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

document.getElementById('preloader-div').remove();

ReactDOM.render(<App/>, document.getElementById('root'));

