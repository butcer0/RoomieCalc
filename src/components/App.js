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
    roommates: {'1': 'Laura', '2a': 'Erik', '2b' : 'Christine'},
    roommateAmounts: {'1':5.22, '2a':2.12, '2b':3.12},
    totalAmount: 512.00,
  }

setCurrentPage = (currentPage) => {
  this.setState({currentPage});
}

updateSettings = (calcState, calcCustomPercent, roommates) => {
  this.setState({calcState, calcCustomPercent, roommates});
  this.updateSplit(this.state.totalAmount, calcState, calcCustomPercent);
}

updateTotalAmount = (totalAmount) => {
  this.setState({totalAmount});
  this.updateSplit(totalAmount);
}

updateSplit = (totalAmount, calcState, calcCustomPercent) => {
  const roommate1Amount = 
    (calcState === CALCSTATE.default) ?
      (totalAmount * defaultPerc) :
      (totalAmount * calcCustomPercent);

  const otherAmount = ((totalAmount - roommate1Amount) / 2);

  const roommateAmounts = {
    '1': roommate1Amount,
    '2a': otherAmount,
    '2b': otherAmount,
  };

  this.setState({roommateAmounts});
}

render() {
  if(this.state.currentPage == PAGEENUMS.main) {
    return (
      <Calculator onOpenSettings={this.setCurrentPage} 
        calcState={this.state.calcState}
        calcCustomPercent={this.state.calcCustomPercent}
        roommates={this.state.roommates}  
        roommateAmounts={this.state.roommateAmounts}
        totalAmount={this.state.totalAmount}
        updateTotalAmount = {this.updateTotalAmount}
        style={styles.main}/>
    );
  } else if(this.state.currentPage == PAGEENUMS.settings) {
    return (
      <Settings updateSettings={this.updateSettings} 
        calcState={this.state.calcState}
        onBack={this.setCurrentPage} 
        calcCustomPercent={this.state.calcCustomPercent}
        roommates={this.state.roommates}
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
