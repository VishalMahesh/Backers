import React from 'react';
import { View } from 'react-native';
import { Colors, CommonStyles, wide } from '../../constants';
import { Label } from './label';

const Seperator = ({ style }) => (
  <View
    style={[{
      height: 0.5,
      backgroundColor: Colors.shade,
    }, style]}
  />
);

const OrSeperator = () => <View style={[CommonStyles.row, CommonStyles.center, { alignSelf: 'center', height: 40 }]}>
  <View style={CommonStyles.seperator2} />
  <Label
    label={"or"}
    style={{ marginHorizontal: 10, color: Colors.lightshade }}
    bold
    size={18}
  />
  <View style={CommonStyles.seperator2} />
</View>

const BlankSpace = ({ offset = wide * 0.05, xAxis, color }) => (
  <View
    style={[{
      height: offset,
      backgroundColor: color,
    }, xAxis && { width: offset }]}
  />
);

export { Seperator, BlankSpace, OrSeperator };
