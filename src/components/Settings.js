import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Input, Card, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'

const PAGEENUMS = Object.freeze({'main':0, 'settings':1});
const CALCSTATE = Object.freeze({'default':0, 'custom':1});
const defaultPerc = (((1/2)+(1/3))/2);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props = {};
export default class Settings extends Component<Props> {
  
    static propTypes = {
      calcState: PropTypes.number.isRequired,
      onBack: PropTypes.func.isRequired,
      updateSettings: PropTypes.func.isRequired,
      calcCustomPercent: PropTypes.number.isRequired,
      roommates: PropTypes.object.isRequired,
      BG_IMAGES: PropTypes.object.isRequired,
      selectedBG_Image: PropTypes.number.isRequired,
      updateWallpaper: PropTypes.func.isRequired,
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
  
    updateSelectedWallpaper = (selectedWallpaper) => {
      this.props.updateWallpaper(selectedWallpaper);
    }

    // component1 = () => <Text>Hello</Text>
    // component2 = () => <Text>World</Text>
    // component3 = () => <Text>ButtonGroup</Text>
    wallpaper0 = () => <Image source={this.props.BG_IMAGES[0]} />
    wallpaper1 = () => <Image source={this.props.BG_IMAGES[1]} />
    wallpaper2 = () => <Image source={this.props.BG_IMAGES[2]} />
    wallpaper3 = () => <Image source={this.props.BG_IMAGES[3]} />
    wallpaper4 = () => <Image source={this.props.BG_IMAGES[4]} />
    wallpaper5 = () => <Image source={this.props.BG_IMAGES[5]} />
    wallpaper6 = () => <Image source={this.props.BG_IMAGES[6]} />
    wallpaper7 = () => <Image source={this.props.BG_IMAGES[7]} />

    render() {
      const buttons = [{ element: this.wallpaper0 }
        , { element: this.wallpaper1 }
        , { element: this.wallpaper2 }
        , { element: this.wallpaper3 }
        , { element: this.wallpaper4 }
        , { element: this.wallpaper5 }
        , { element: this.wallpaper6 }
        , { element: this.wallpaper7 } ]
      return (
       
          <View style={styles.main}>
           
            <View style={styles.navBar}>
              <TouchableOpacity onPress={this.handleOnBack}>
                <Ionicon
                  name= {'ios-arrow-back'}
                  size={30}
                  style={styles.backLink}
                />
                {/* <Text style={styles.backLink}>Back</Text> */}
              </TouchableOpacity>
            </View>
          
            <ScrollView style={styles.scrollViewMain} >
              <Card title = 'Settings' >
                <RadioGroup
                  size={24}
                  thickness={2}
                  color='#87bdd8'
                  highlightColor='#cfe0e8'
                  selectedIndex={this.state.calcState}
                  onSelect = {(index, calcState) => this.onSelectRadio(index, calcState)}
                >
                  <RadioButton value={CALCSTATE.default}>
                    <Text style={styles.radioButtonText}>Default</Text>
                  </RadioButton>

                  <RadioButton value={CALCSTATE.custom}>
                    <Text style={styles.radioButtonText}>Custom</Text>
                  </RadioButton>
                </RadioGroup>
              
                {this.state.calcState == CALCSTATE.custom && (
                  <View style={styles.textInputRow}>
                    <Input
                      ref = {(inputElement) => {this.inputElement = inputElement;}}
                      value={this.state.strCalcCustomPercent}
                      inputStyle={{marginLeft: 10, color: 'black'}}
                      placeholder = 'Enter Custom Percentage'
                      style={styles.input}
                      keyboardType = 'numeric'
                      onChangeText={this.handlePercentChange} />
                    <TouchableOpacity onPress={this.handleClear}>
                      <Feather name= {'delete'} size={25} />
                    </TouchableOpacity>
                  </View>
                )}
              </Card>
              <Card>
                <View>
                  <Text style={styles.roommateheader}>Room 1</Text>
                  <Input
                    leftIcon={
                      <Icon 
                        name='user-o'
                        color='rgba(171, 189, 219, 1)'
                        size={25} />
                    } 
                    ref = {(inputElement) => {this.inputElement = inputElement;}}
                    value={this.state.roommates['1']}
                    inputStyle={{marginLeft: 10, color: 'black'}}
                    placeholder = 'Roommate 1 Name'
                    style={styles.input}
                    keyboardType = 'default'
                    onChangeText={(text) => this.handleRoommateChange(text,'1')} />
                </View>
                <View>
                  <Text style={styles.roommateheader}>Room 2</Text>
                  <Input
                    leftIcon={
                      <Icon 
                        name='user-o'
                        color='rgba(171, 189, 219, 1)'
                        size={25} />
                    } 
                    ref = {(inputElement) => {this.inputElement = inputElement;}}
                    value={this.state.roommates['2a']}
                    inputStyle={{marginLeft: 10, color: 'black'}}
                    placeholder = 'Roommate 1 Name'
                    style={styles.input}
                    keyboardType = 'default'
                    onChangeText={(text) => this.handleRoommateChange(text,'2a')} />
                  <Input
                    leftIcon={
                      <Icon 
                        name='user-o'
                        color='rgba(171, 189, 219, 1)'
                        size={25} />
                    } 
                    ref = {(inputElement) => {this.inputElement = inputElement;}}
                    value={this.state.roommates['2b']}
                    inputStyle={{marginLeft: 10, color: 'black'}}
                    placeholder = 'Roommate 2 Name'
                    style={styles.input}
                    keyboardType = 'default'
                    onChangeText={(text) => this.handleRoommateChange(text,'2b')} />
                </View>
              </Card>
              <Card title='Background' >
              <ButtonGroup
                onPress={this.updateSelectedWallpaper}
                selectedIndex={this.props.selectedBG_Image}
                buttons={buttons}
                containerStyle={{height: 100}} />
              </Card>
            </ScrollView>
          </View>
        
      );
    }
}

const styles = StyleSheet.create({
  scrollViewMain: {
    flex:1,
    height: '80%',
  },
  navBar: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  backLink: {
    marginBottom: 0,
    color: '#87bdd8',
    marginLeft: 10,
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
  inputStyle: {
    marginLeft: 10,
    color: 'white'
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
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'rgba(47,44,60,1)',
  },
  roommateheader: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
  },
  radioButtonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  }
});
