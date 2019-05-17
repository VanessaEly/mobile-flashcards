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
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
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