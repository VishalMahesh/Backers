import { Colors, Fonts } from '../constants';
import { TransitionPresets } from 'react-navigation-stack';
export const Header = () => ({
  headerStyle: {
    backgroundColor: Colors.light,
  },
  headerBackTitle: null,
  headerTintColor: Colors.dark1,
  headerTitleStyle: {
    color: Colors.blackShade,
    fontSize: 20,
    fontFamily: Fonts.Regular,
    // fontWeight: '500'
  },
});

// gets the current screen from navigation state
export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

export const defaultNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: false
};
