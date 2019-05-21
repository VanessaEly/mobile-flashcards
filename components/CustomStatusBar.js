import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
/**
 * Adding a header status bar to the app
 */
const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default CustomStatusBar;