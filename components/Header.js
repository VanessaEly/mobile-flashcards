import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { lightGray, purple } from '../utils/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
    borderColor: purple,
    borderWidth: 1,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  logoImage: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
  },
});

export default Header;