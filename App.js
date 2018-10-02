import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleWare } from 'redux';
import ReduxTunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
    apiKey: "AIzaSyD2DxJDopUU_-Rf6Rb6QRVF8p56kJyjH8o",
    authDomain: "manager-8d634.firebaseapp.com",
    databaseURL: "https://manager-8d634.firebaseio.com",
    projectId: "manager-8d634",
    storageBucket: "manager-8d634.appspot.com",
    messagingSenderId: "367606535778"
  };
  firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleWare(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
