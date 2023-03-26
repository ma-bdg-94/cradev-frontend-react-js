// -- React and related libs
import React from 'react';
import { render } from 'react-dom';

// -- Redux
import store from './redux-store'
import { Provider } from 'react-redux';

// -- App
import App from './App';


// -- Rendering Application
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
