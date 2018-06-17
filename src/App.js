import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './configure-store'
import {HeaderComponent} from './Components/SearchBar'
import  MainComponent from './Components/SearchBar/MainComponent'
const initialState = window.__initialState
const store = configureStore(initialState)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div >
          <HeaderComponent />
          <MainComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
