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
import Ionicon from 'react-native-vector-icons/Ionicons';
import Input from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const PAGEENUMS = Object.freeze({'main':0, 'settings':1});
const CALCSTATE = Object.freeze({'default':0, 'custom':1});
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
      email_valid: true,
      email: '',
    }

    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      return re.test(email);
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
              placeholder="Email"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref = {(inputElement) => {this.inputElement = inputElement;}}
              onSubmitEditing={() => {
                this.setState({email_valid: this.validateEmail(this.state.email)});
                this.passwordInput.focus();
              }}
              blurOnSubmit={false}
              placeholderTextColor="white"
              errorStyle={{textAlign: 'center', fontSize: 12}}
              errorMessage={this.state.email_valid ? null : 'Please enter a valid email address'}
            />
            <Text>{`${this.props.roommates['1']}: ${this.props.roommateAmounts['1']}`}</Text>
            <Text>{`${this.props.roommates['2a']}: ${this.props.roommateAmounts['2a']}`}</Text>
            <Text>{`${this.props.roommates['2b']}: ${this.props.roommateAmounts['2b']}`}</Text>
          </View>

        //   <View style={styles.container}>
        //     <View style={styles.topmenu}>
        //       <TouchableOpacity onPress={this.handleOnSettings}>
        //         <Ionicon
        //           name= {'ios-settings'}
        //           size={30}
        //           style={styles.settingsLink}
        //         />
        //         {/* <Text style={styles.settingsLink}>Settings</Text> */}
        //       </TouchableOpacity>
        //     </View>
        //     <View>
        //       <TextInput
        //         ref = {(inputElement) => {this.inputElement = inputElement;}}
        //         value={this.state.strTotalAmount}
        //         placeholder = 'Enter Amount to Split'
        //         style={styles.input}
        //         keyboardType = 'numeric'
        //         onChangeText={this.handleTotalChange} />
        //     </View>
        //     <View>
        //       <Text>{`${this.props.roommates['1']}: ${this.props.roommateAmounts['1']}`}</Text>
        //       <Text>{`${this.props.roommates['2a']}: ${this.props.roommateAmounts['2a']}`}</Text>
        //       <Text>{`${this.props.roommates['2b']}: ${this.props.roommateAmounts['2b']}`}</Text>
        //     </View>
        //   </View>
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
});
