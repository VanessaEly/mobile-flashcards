import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { lightBlue, lightGray } from '../utils/colors';
/**
 * Creating the tab bar icon, used by our navigation bar
 */
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? lightBlue : lightGray}
      />
    );
  }
}