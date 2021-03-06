import React from 'react';
import { Text, View } from 'react-native';
import {
  CommonStyles,
  Layout,
} from '../../constants';
import { Fonts } from '../../constants/fonts';

const DefaultLabel = ({ label, small, style, ...props }) => (
  <Text {...props} style={[CommonStyles.text, small && { fontSize: 14 }, style]}>
    {data}
    {" "}
    {props.children}
  </Text>
);

const Label = ({ label, style, bold, semi, color, size = 14, ...props }) => <Text style={[{ fontFamily: bold ? Fonts.Bold : Fonts.Regular }, color && { color: color }, size && { fontSize: size }, semi && { fontFamily: Fonts.SemiBold }, style]} {...props}>
  {label}
  {props.children}
</Text>

const TitleLabel = ({ data, style, bold, ...props }) => (
  <Text
    {...props}
    style={[
      CommonStyles.title,
      style,
      // bold && { fontFamily: Fonts.SemiBold },
    ]}>
    {data}
    {props.children}
  </Text>
);


export { DefaultLabel, TitleLabel, Label };
