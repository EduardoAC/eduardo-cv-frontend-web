import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <p>Hello World!</p>
  </Provider>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
