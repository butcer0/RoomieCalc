import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const PAGEENUMS = Object.freeze({'main':0, 'settings':1});
const CALCSTATE = Object.freeze({'default':0, 'custom':1});
const defaultPerc = (((1/2)+(1/3))/2);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props = {};
export default class Calculator extends Component<Props> {
    static propTypes = {
      onOpenSettings: PropTypes.func.isRequired,
      calcState: PropTypes.number.isRequired,
      calcCustomPercent: PropTypes.number.isRequired,
      roommates: PropTypes.object.isRequired,
      roommateAmounts: PropTypes.object.isRequired,
      totalAmount: PropTypes.number.isRequired,
      updateTotalAmount: PropTypes.func.isRequired,
    }

    state = {
      strCalcCustomPercent: `${this.props.calcCustomPercent}`,
      strTotalAmount: `${this.props.totalAmount}`,
      total_valid: true,
      email: '',
    }

    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      return re.test(email);
    }

    validateNumber(strTotal) {
      return !isNaN(Number(strTotal));
    }

    handleTotalChange = (strTotalAmount) => {
      this.setState({strTotalAmount});
      const totalAmount = Number(strTotalAmount);
      if(!isNaN(totalAmount))
      {
        this.props.updateTotalAmount(totalAmount);
      } 
    }

      handleOnSettings = () => {
        this.props.onOpenSettings(PAGEENUMS.settings);
      }

      render() {
        return (
          <View style={styles.loginInput}>
            <Input 
              leftIcon={
                <Icon 
                  name='user-o'
                  color='rgba(171, 189, 219, 1)'
                  size={25} />
              } 
              containerStyle={{marginVertical: 10}}
              onChangeText={this.handleTotalChange}
              value={this.state.strTotalAmount}
              inputStyle={{marginLeft: 10, color: 'white'}}
              keyboardAppearance="light"
              placeholder="Enter Amount to Split"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              returnKeyType="next"
              ref = {(inputElement) => {this.inputElement = inputElement;}}
              onSubmitEditing={() => {
                this.setState({total_valid: this.validateNumber(this.state.totalAmount)});
              }}
              blurOnSubmit={true}
              placeholderTextColor="white"
              errorStyle={{textAlign: 'center', fontSize: 16}}
              errorMessage={this.state.total_valid ? null : 'Please enter a valid total'}
            /> 
            <Text style={styles.roommateLabel}>{`${this.props.roommates['1']}: ${this.props.roommateAmounts['1']}`}</Text>
            <Text style={styles.roommateLabel}>{`${this.props.roommates['2a']}: ${this.props.roommateAmounts['2a']}`}</Text>
            <Text style={styles.roommateLabel}>{`${this.props.roommates['2b']}: ${this.props.roommateAmounts['2b']}`}</Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  topmenu: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
  settingsLink: {
    marginBottom: 5,
    color: '#87bdd8',
    marginRight: 10,
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
  roommateLabel: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
