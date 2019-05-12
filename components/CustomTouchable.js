import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { white, purple } from '../utils/colors';

const CustomTouchable = (props) => {
  const { backgroundColor, color, onPress, title, icon } = props;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgroundColor || purple, borderColor: color || white }]}
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: .5,
    height: 40,
    borderRadius: 5 ,
    margin: 5,
    padding:10,
  },
});

export default CustomTouchable;
