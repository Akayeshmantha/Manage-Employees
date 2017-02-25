import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyC6ce91gSGpH-LHF7RxyUgqSfXLl94mR1w',
    authDomain: 'manager-739f9.firebaseapp.com',
    databaseURL: 'https://manager-739f9.firebaseio.com',
    storageBucket: 'manager-739f9.appspot.com',
    messagingSenderId: '993261032203'
    };
    firebase.initializeApp(config);
  }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
          <Provider store={store}>
            <Router />
          </Provider>  
        );
    }
}

export default App;
