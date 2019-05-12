import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store'

export default class App extends React.Component {
  state = {
    appLoaded: false,
  };

  render() {
    const { appLoaded } = this.state;

    if (!appLoaded) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={() => this.setState({ appLoaded: true })}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo.png'),
      ]),
    ]);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
