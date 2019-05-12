import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Asset } from 'expo';
import { Provider } from 'react-redux';
import store from './store'
import CustomStatusBar from './components/CustomStatusBar';
import AppNavigator from './navigation/AppNavigator';
import { purple } from './utils/colors';



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
            <CustomStatusBar backgroundColor='black' barStyle='light-content' />
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
