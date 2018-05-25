import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Settings from './Settings';
import Calculator from './Calculator';
const defaultPerc = (((1/2)+(1/3))/2);

var PAGEENUMS = Object.freeze({'main':0, 'settings':1});
var CALCSTATE = Object.freeze({'default':0, 'custom':1});

type Props = {};
export default class App extends Component<Props> {

  state = {
    currentPage: PAGEENUMS.settings,
    calcState: CALCSTATE.default,
    calcCustomPercent: defaultPerc,
  }

setCurrentPage = (currentPage) => {
  this.setState({currentPage});
}

updateSettings = (calcState, calcCustomPercent) => {
  this.setState({calcState, calcCustomPercent});
}

render() {
  if(this.state.currentPage == PAGEENUMS.main) {
    return (
      <Calculator onOpenSettings={this.setCurrentPage} calcCustomPercent={this.state.calcCustomPercent}
        style={styles.main}/>
    );
  } else if(this.state.currentPage == PAGEENUMS.settings) {
    return (
      <Settings updateSettings={this.updateSettings} onBack={this.setCurrentPage} calcCustomPercent={this.state.calcCustomPercent}
        style={styles.main}/>
    );
  }
   
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  main: {
    //Erik - 5/3/2018 If 'ios' then 30, otherwise if 'android' 10
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
});
