import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    
    // adding a header status bar to the app
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default CustomStatusBar;