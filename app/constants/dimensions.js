import { Dimensions, Platform, StatusBar } from 'react-native';

const Dim = Dimensions.get('window');

const xOffset = Platform.OS == 'ios' ? Dim.width * 0.04 : 0;
const yOffset = Platform.OS == 'ios' ? Dim.width * 0.03 : 0;

export const deviceHeight = Dimensions.get('window').height;
export const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight + StatusBar.currentHeight,
});

export const Layout = {
  width: Dim.width,
  height: Dim.height,
  xOffset,
  yOffset,
};
