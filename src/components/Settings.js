import React, { Component } from 'react';
import {
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
export default class Settings extends Component<Props> {
  
    static propTypes = {
      onBack: PropTypes.func.isRequired,
      updateSettings: PropTypes.func.isRequired,
    }

    handleOnBack = () => {
      this.props.onBack(PAGEENUMS.main);
    }

    state = {
      calcState: CALCSTATE.default,
      calcCustomPercent: defaultPerc,
    }  

    handlePercentChange = (calcCustomPercent) => {
      this.setState({calcCustomPercent});
      this.props.updateSettings(this.state.calcState, calcCustomPercent);
    }
  
    render() {
      return (
        <View >
          <TouchableOpacity onPress={this.handleOnBack}>
            <Text style={styles.backLink}>Back</Text>
          </TouchableOpacity>
          
          <View style={styles.main}>
            <Text style={styles.radiobutton}>
                * Radio Button 1
            </Text>
            <Text style={styles.radiobutton}>
                * Radio Button 2
            </Text>
            {this.state.calcState == CALCSTATE.custom && (
              <TextInput
                ref = {(inputElement) => {this.inputElement = inputElement;}}
                value={this.state.calcCustomPercent}
                placeholder = 'Enter Custom Percentage'
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={this.handlePercentChange} />
            )}
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },
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
});
