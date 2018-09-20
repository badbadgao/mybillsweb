import React, { Component } from 'react';
import { Provider } from "react-redux";
import './App.css';

import Main from './container/layout'
import store from './reducers/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main /> 
      </Provider>
    );
  }
}

export default App;
