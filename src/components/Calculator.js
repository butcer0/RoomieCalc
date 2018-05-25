import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';

var PAGEENUMS = Object.freeze({'main':0, 'settings':1});
var CALCSTATE = Object.freeze({'default':0, 'custom':1});
const defaultPerc = (((1/2)+(1/3))/2);

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
          <View style={styles.container}>
            <View style={styles.topmenu}>
              <TouchableOpacity onPress={this.handleOnSettings}>
                <Text style={styles.settingsLink}>Settings</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                ref = {(inputElement) => {this.inputElement = inputElement;}}
                value={this.state.strTotalAmount}
                placeholder = 'Enter Amount to Split'
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={this.handleTotalChange} />
            </View>
            <View>
              <Text>{`${this.props.roommates['1']}: ${this.props.roommateAmounts['1']}`}</Text>
              <Text>{`${this.props.roommates['2a']}: ${this.props.roommateAmounts['2a']}`}</Text>
              <Text>{`${this.props.roommates['2b']}: ${this.props.roommateAmounts['2b']}`}</Text>
            </View>
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
    color: '#667292',
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
});
