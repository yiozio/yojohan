import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './components/Main';

ReactDOM.render(<Main />, document.getElementById('yojohan'));

window.navigator.serviceWorker.register('./worker.js').then();
