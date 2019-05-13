import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { white, purple } from '../utils/colors';

const CustomTouchable = (props) => {
  const { backgroundColor, color, onPress, title, icon } = props;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgroundColor || purple }]}
      activeOpacity={0.5}
      onPress={() => onPress()}
    >
      { icon &&
        <Ionicons
          name={icon}
          color={color || white}
          style={{paddingRight: 10}}
          size={20}
        />
      }
      <Text style={ { color: color || white }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginBottom: 5,
    marginHorizontal: 15,
    padding: 10,
    elevation: 3,
    borderWidth: .1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
});

export default CustomTouchable;
