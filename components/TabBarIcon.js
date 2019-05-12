import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { lightBlue, lightGray } from '../utils/colors';

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