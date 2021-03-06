import { StyleSheet, Platform } from 'react-native';
import { Colors, wide } from '../../../../../../constants';
import { Fonts } from '../../../../../../constants/fonts';
import * as defaultStyle from '../../../style';

const STYLESHEET_ID = 'stylesheet.day.basic';

export default function styleConstructor(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      alignItems: 'center'
    },
    base: {
      height: wide * 0.1,
      alignItems: 'center'
    },
    text: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
      fontSize: 12,
      fontFamily: Fonts.Regular,
      // fontWeight: "500",
      color: Colors.dark,
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: Colors.base1,
      borderRadius: 2
    },
    today: {
      flex: 1,
      // backgroundColor: Colors.base
    },
    todayText: {
      color: Colors.dark
    },
    selectedText: {
      color: Colors.base,
      fontFamily: Fonts.Bold
    },
    disabledText: {
      color: Colors.shade,
      fontFamily: Fonts.Regular,
      fontSize: 12
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0,
      ...appStyle.dotStyle
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    disabledDot: {
      backgroundColor: appStyle.disabledDotColor || appStyle.dotColor
    },
    todayDot: {
      backgroundColor: appStyle.todayDotColor || appStyle.dotColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
