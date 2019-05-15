import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>Developed with ♥ by Vanessa Ely</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 9,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});

export default Footer;
