import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Layout, Colors } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
let wide = Layout.width;
const Done = ({ onPress }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{ paddingHorizontal: wide * 0.02 }}
    onPress={onPress}>
    <View
      style={{ justifyContent: 'center', height: '100%', width: wide * 0.1 }}>
      <Icon size={22} name={'check'} color={Colors.base} />
    </View>
  </TouchableOpacity>
);
export default Done;
