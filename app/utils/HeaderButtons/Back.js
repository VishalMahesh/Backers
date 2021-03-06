import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Layout, Colors } from '../../constants';
import Icon from 'react-native-vector-icons/Feather';
let wide = Layout.width;
const Back = ({ onPress, go }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{ paddingHorizontal: wide * 0.02 }}
    onPress={onPress}>
    <View
      style={{ justifyContent: 'center', height: '100%', width: wide * 0.1, alignItems: 'center' }}>
      <Icon size={22} name={go ? "chevron-right" : 'arrow-left'} color={Colors.dark1} />
    </View>
  </TouchableOpacity>
);
export default Back;
