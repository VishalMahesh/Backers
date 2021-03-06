import React from 'react';
import { View, StatusBar } from 'react-native';
import { CommonStyles } from '../constants';

const AppStatusBar = ({ color, ...props }) => (
    <View style={[CommonStyles.statusBar, { backgroundColor: color }]}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={color} {...props} />
    </View>
);

export default AppStatusBar;
