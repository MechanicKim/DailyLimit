/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import Main from './page/Main';
import FixedOut from './page/FixedOutForm';
import RecordView from './page/RecordView';
import RecordForm from './page/RecordForm';

import {NativeRouter, Route} from 'react-router-native';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/main/:ym" component={Main} />
        <Route exact path="/fixedOut" component={FixedOut} />
        <Route exact path="/record/:id" component={RecordView} />
        <Route exact path="/record/:id/:rid" component={RecordForm} />
      </NativeRouter>
    );
  }
}
