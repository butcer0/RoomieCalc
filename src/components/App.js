import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Settings from './Settings';
import Calculator from './Calculator';
import Ionicon from 'react-native-vector-icons/Ionicons';

const defaultPerc = (((1/2)+(1/3))/2);
const PAGEENUMS = Object.freeze({'main':0, 'settings':1});
const CALCSTATE = Object.freeze({'default':0, 'custom':1});
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');

type Props = {};
export default class App extends Component<Props> {

  state = {
    currentPage: PAGEENUMS.main,
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
  this.updateSplit(totalAmount, this.state.calcState, this.state.calcCustomPercent);
}

updateSplit = (totalAmount, calcState, calcCustomPercent) => {
  const roommate1Amount = 
    (calcState === CALCSTATE.default) ?
      (totalAmount * defaultPerc).toFixed(2) :
      (totalAmount * calcCustomPercent).toFixed(2) ;

  const otherAmount = ((totalAmount - roommate1Amount) / 2).toFixed(2);

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
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage} 
        >
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.travelText}>ROOMIE</Text>
              </View>
              <View style={{marginTop: -10}}>
                <Text style={styles.travelText}>CALCULATOR</Text>
              </View>
            </View>

            <Calculator onOpenSettings={this.setCurrentPage} 
              calcState={this.state.calcState}
              calcCustomPercent={this.state.calcCustomPercent}
              roommates={this.state.roommates}  
              roommateAmounts={this.state.roommateAmounts}
              totalAmount={this.state.totalAmount}
              updateTotalAmount = {this.updateTotalAmount}
              style={styles.main}/>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.setCurrentPage(PAGEENUMS.settings)}>
              <Ionicon
                name= {'ios-settings'}
                size={30}
                style={styles.settingsLink}
              />
              {/* <Text style={styles.settingsLink}>Settings</Text> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
   
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
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loginView: {
    marginTop: 150,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  travelText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Montserrat-Bold'
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
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  settingsLink: {
    marginBottom: 5,
    color: 'white',
    
  },
});
