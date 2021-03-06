import { StyleSheet, Platform } from 'react-native';
import { Layout, Colors, Fonts } from '../../constants';
const wide = Layout.width;
export default StyleSheet.create({
  container: {
    width: '100%',
    height: wide * 0.3,
    backgroundColor: Colors.light,
    elevation: 4,
    borderBottomWidth: 0.5,
    borderColor: Colors.shade,
    marginTop: 0,
  },
  subCont: {
    flex: 1,
    backgroundColor: Colors.light,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  titleContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingHorizontal: wide * 0.04,
    alignItems: Platform.OS == 'ios' ? 'center' : 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: Colors.base,
    fontFamily: Fonts.SemiBold,
    lineHeight: 25,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.base,
    fontFamily: Fonts.Regular,
  },
  label: {
    color: Colors.base,
    fontSize: 20,
    fontFamily: Fonts.SemiBold,
    paddingVertical: 0,
    paddingHorizontal: 20,
    lineHeight: 40,
  },
});
