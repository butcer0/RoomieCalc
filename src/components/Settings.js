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
import Ionicon from 'react-native-vector-icons/Ionicons';

var PAGEENUMS = Object.freeze({'main':0, 'settings':1});
var CALCSTATE = Object.freeze({'default':0, 'custom':1});
const defaultPerc = (((1/2)+(1/3))/2);

type Props = {};
export default class Settings extends Component<Props> {
  
    static propTypes = {
      calcState: PropTypes.number.isRequired,
      onBack: PropTypes.func.isRequired,
      updateSettings: PropTypes.func.isRequired,
      calcCustomPercent: PropTypes.number.isRequired,
      roommates: PropTypes.object.isRequired,
    }

    state = {
      calcState: this.props.calcState,
      calcCustomPercent: this.props.calcCustomPercent,
      strCalcCustomPercent: `${this.props.calcCustomPercent}`,
      roommates: this.props.roommates,
    }  

    handlePercentChange = (strCalcCustomPercent) => {
      this.setState({strCalcCustomPercent});
      const calcCustomPercent = Number(strCalcCustomPercent);
      if(!isNaN(calcCustomPercent)) {
        this.setState({calcCustomPercent});
      }    
    }

    handleOnBack = () => {
      this.props.updateSettings(this.state.calcState
        , this.state.calcCustomPercent
        , this.state.roommates);    
      this.props.onBack(PAGEENUMS.main);
    }

    handleClear = () => {
      this.setState({
        strCalcCustomPercent: '',
        calcCustomPercent: defaultPerc,
      });
    }

    handleRoommateChange = (newName, roommate) => {
      let roommates = this.state.roommates;
      roommates[roommate] = newName;
      this.setState({roommates});
    }

    onSelectRadio = (index, calcState) => {
      this.setState({calcState});
    }
  
    render() {
      return (
        <View style={styles.main}>
          <TouchableOpacity onPress={this.handleOnBack}>
            <Ionicon
              name= {'ios-arrow-back'}
              size={30}
              style={styles.backLink}
            />
            {/* <Text style={styles.backLink}>Back</Text> */}
          </TouchableOpacity>
          
          <View>
            <RadioGroup
              size={24}
              thickness={2}
              color='#87bdd8'
              highlightColor='#cfe0e8'
              selectedIndex={this.state.calcState}
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
              <View style={styles.textInputRow}>
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
          <View>
            <Text>Room 1</Text>
            <TextInput
              ref = {(inputElement) => {this.inputElement = inputElement;}}
              value={this.state.roommates['1']}
              placeholder = 'Roommate 1 Name'
              style={styles.input}
              keyboardType = 'default'
              onChangeText={(text) => this.handleRoommateChange(text,'1')} />
          </View>
          <View>
            <Text>Room 2</Text>
            <TextInput
              ref = {(inputElement) => {this.inputElement = inputElement;}}
              value={this.state.roommates['2a']}
              placeholder = 'Roommate 1 Name'
              style={styles.input}
              keyboardType = 'default'
              onChangeText={(text) => this.handleRoommateChange(text,'2a')} />
            <TextInput
              ref = {(inputElement) => {this.inputElement = inputElement;}}
              value={this.state.roommates['2b']}
              placeholder = 'Roommate 2 Name'
              style={styles.input}
              keyboardType = 'default'
              onChangeText={(text) => this.handleRoommateChange(text,'2b')} />
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  backLink: {
    marginBottom: 5,
    color: '#87bdd8',
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
  textInputRow: {
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
