import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Layout } from './dimensions';
import { Colors } from './colors';
import { Fonts } from './fonts';
import { getStatusBarHeight } from 'react-native-status-bar-height';
let wide = Layout.width;
const STATUSBAR_HEIGHT = getStatusBarHeight();
export const containerPadding = wide * 0.04
export const TitleSize = 20
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: containerPadding,
    backgroundColor: Colors.light,
  },

  noPadding: {
    padding: 0
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },

  containerPadding: {
    padding: containerPadding
  },

  seperator: {
    backgroundColor: Colors.darkshade,
    width: wide * 0.9,
    alignSelf: 'center'
  },

  seperator2: {
    backgroundColor: Colors.lightshade,
    height: 1,
    width: wide * 0.34
  },

  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  noInternet: {
    position: 'absolute',
    bottom: 0,
    height: wide * 0.08,
    width: '100%',
    backgroundColor: Colors.base,
  },
  showinfo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 30,
    backgroundColor: Colors.base,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  horizontalPadding: {
    paddingHorizontal: containerPadding,
  },
  horizontalMargin: {
    marginHorizontal: containerPadding,
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  verticalPadding: {
    paddingVertical: wide * 0.02,
  },
  verticalMargin: {
    marginVertical: wide * 0.02,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  large: {
    height: '80%',
    width: '80%',
  },
  medium: {
    height: '60%',
    width: '60%',
  },
  small: {
    height: '45%',
    width: '45%',
  },
  xsmall: {
    height: '20%',
    width: '20%',
  },
  logo: {
    height: wide * 0.4,
    width: wide * 0.4,
  },
  topRounded: {
    borderTopLeftRadius: containerPadding / 1.5,
    borderTopRightRadius: containerPadding / 1.5,
  },
  btmRounded: {
    borderBottomLeftRadius: containerPadding / 1.5,
    borderBottomRightRadius: containerPadding / 1.5,
  },
  topRounded1: {
    borderTopLeftRadius: wide * 0.04,
    borderTopRightRadius: wide * 0.04,
  },

  leftRounded: {
    borderTopLeftRadius: wide * 0.02,
    borderBottomLeftRadius: wide * 0.02,
  },
  rightRounded: {
    borderTopRightRadius: wide * 0.02,
    borderBottomRightRadius: wide * 0.02,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: Colors.shade,
  },
  btmborder: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: Colors.lightshade,
  },
  verticalBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.shade,
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    fontStyle: "italic"
  },
  shadow: {
    shadowColor: Colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    backgroundColor: Colors.light,
  },
  shadowBlur: {
    shadowColor: Colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    backgroundColor: Colors.light,
  },
  lightshadow: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: Colors.light,
    elevation: 3,
  },
  topBorder: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.light,
    elevation: 15,
  },
  topshadow: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16.0,
    backgroundColor: Colors.light,
    elevation: 10,
  },
  info: {
    color: Colors.base,
    fontWeight: '500',
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    height: wide * 0.12,
    position: 'relative',
    borderColor: 'grey',
    justifyContent: 'center',
  },
  stickylabel: {
    position: 'absolute',
    top: -wide * 0.038,
    left: wide * 0.06,
    backgroundColor: Colors.light,
    marginVertical: 0,
  },
  text: {
    fontSize: 16,
    color: Colors.dark,
    lineHeight: wide * 0.05,
    fontFamily: Fonts.Regular
  },
  title: {
    fontSize: 18,
    color: Colors.darkshade,
    lineHeight: wide * 0.06,
  },
  icon: {
    height: wide * 0.25,
    width: wide * 0.25,
    marginHorizontal: 10,
  },
  underLine: {
    textDecorationLine: 'underline'
  },
  header: {
    // paddingHorizontal: containerPadding,
    height: wide * 0.15
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: Colors.dark
  },
  buttons: {
    width: wide * 0.2,
    height: wide * 0.15
  },
  clickable: {
    width: wide * 0.1,
    height: wide * 0.15
  },
  story: {
    height: wide * 0.36,
    width: wide * 0.26,
    borderWidth: 2,
    marginLeft: containerPadding,
    padding: 5
  },
  avatarsmall: {
    height: wide * 0.1,
    width: wide * 0.1,
    borderRadius: wide * 0.1 / 2,
  },
  feed: {
    minHeight: wide * 1.3,
    width: wide,
    padding: containerPadding,
    paddingBottom: 0,
    borderRadius: 10,
  },
  rounded: {
    borderRadius: containerPadding / 1.5
  },
  rounded1: {
    borderRadius: containerPadding / 1.5 - 4,
  },
  tipButton: {
    position: 'absolute',
    right: -5
  },
  payButton: {
    marginTop: 0
  },
  tab: {
    height: wide * 0.15,
    backgroundColor: Colors.light,
    marginHorizontal: containerPadding,
    width: wide * 0.9,
    bottom: containerPadding / 2,
    position: 'absolute'
  },
  btnRounded: {
    borderRadius: 10
  },
  submitBtn: {
    height: wide * 0.13,
    width: wide * 0.8,
    backgroundColor: Colors.base,
    alignSelf: 'center',
    marginVertical: wide * 0.03
  },
  submitBtn2: {
    height: wide * 0.15,
    width: wide * 0.8,
    borderWidth: 2,
    borderColor: Colors.dark,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: wide * 0.03
  },
  headerLabel: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.dark
  }
});
