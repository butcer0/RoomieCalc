import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

var PAGEENUMS = Object.freeze({'main':0, 'settings':1});
var CALCSTATE = Object.freeze({'default':0, 'custom':1});
const defaultPerc = (((1/2)+(1/3))/2);

type Props = {};
export default class Settings extends Component<Props> {
  
    static propTypes = {
      onBack: PropTypes.func.isRequired,
      updateSettings: PropTypes.func.isRequired,
      calcCustomPercent: PropTypes.number.isRequired,
    }

    state = {
      calcState: CALCSTATE.default,
      calcCustomPercent: this.props.calcCustomPercent,
      strCalcCustomPercent: `${this.props.calcCustomPercent}`,
    }  

    handlePercentChange = (strCalcCustomPercent) => {
      this.setState({strCalcCustomPercent});
      let calcCustomPercent = Number(strCalcCustomPercent);
      if(!isNaN(calcCustomPercent)) {
        this.setState({calcCustomPercent});
        this.props.updateSettings(this.state.calcState, calcCustomPercent);    
      }    
    }

    handleOnBack = () => {
      this.props.onBack(PAGEENUMS.main);
    }

    handleClear = () => {
      this.setState({
        strCalcCustomPercent: '',
        calcCustomPercent: defaultPerc,
      });
    }

    onSelectRadio = (index, calcState) => {
      this.setState({calcState});
    }
  
    render() {
      return (
        <View style={styles.main}>
          <TouchableOpacity onPress={this.handleOnBack}>
            <Text style={styles.backLink}>Back</Text>
          </TouchableOpacity>
          
          <View>
            <RadioGroup
              size={24}
              thickness={2}
              color='#87bdd8'
              highlightColor='#cfe0e8'
              selectedIndex={0}
              onSelect = {(index, calcState) => this.onSelectRadio(index, calcState)}
            >
              <RadioButton value={CALCSTATE.default}>
                <Text>Default</Text>
              </RadioButton>

              <RadioButton value={CALCSTATE.custom}>
                <Text>Custom</Text>
              </RadioButton>
            </RadioGroup>
          
            {this.state.calcState == CALCSTATE.custom && (
              <View style={styles.textInputContainer}>
                <TextInput
                  ref = {(inputElement) => {this.inputElement = inputElement;}}
                  value={this.state.strCalcCustomPercent}
                  placeholder = 'Enter Custom Percentage'
                  style={styles.input}
                  keyboardType = 'numeric'
                  onChangeText={this.handlePercentChange} />
                <TouchableOpacity onPress={this.handleClear}
                  style={styles.cirButton}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  backLink: {
    marginBottom: 5,
    color: '#667292',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    marginHorizontal: 2,
    width: '80%',
  },
  cirButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:15,
    height:15,
    backgroundColor:'#fff',
    borderRadius:100,
  },
  main: {
    //Erik - 5/3/2018 If 'ios' then 30, otherwise if 'android' 10
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    justifyContent: 'space-around',
  },
});
