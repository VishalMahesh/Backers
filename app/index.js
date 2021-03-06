import React, { Component } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import configureStore from './store/stor-config';
import { Provider, connect } from 'react-redux';
import {
  onNavigationStateChange
} from './utils/navigation';
import './middleware/http.Interceptor';
import Navigation from './lib/Navigation';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AuthStack, HomeStack } from './routes';
import TabNavigator from './routes/AppNav';
import { MenuProvider } from 'react-native-popup-menu';
import { Colors } from './constants';
import AppStatusBar from './utils/AppStatusBar';
import moment from 'moment'
export const App = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      AuthLoading: {
        getScreen: () => require('./containers/auth/loadingView').default,
      },
      App: TabNavigator,
    },
    {
      initialRouteName: "AuthLoading"
    }
  ),
);


export default class LoyalFans extends Component {
  render() {
    let content = (
      <App
        ref={(navigatorRef) => {
          Navigation.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={onNavigationStateChange}
      />
    );
    return <MenuProvider>
      <SafeAreaProvider>
        <AppStatusBar color={Colors.light} />
        <Provider store={configureStore()}>
          {content}
        </Provider>
      </SafeAreaProvider>
    </MenuProvider>
  }
}
