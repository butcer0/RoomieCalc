import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

var PAGEENUMS = Object.freeze({'main':0, 'settings':1});
var CALCSTATE = Object.freeze({'default':0, 'custom':1});
const defaultPerc = (((1/2)+(1/3))/2);

type Props = {};
export default class Calculator extends Component<Props> {
    static propTypes = {
      onOpenSettings: PropTypes.func.isRequired,
      calcCustomPercent: PropTypes.number.isRequired,
    }

      state = {
        calcState: CALCSTATE.default,
        calcCustomPercent: this.props.calcCustomPercent,
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
