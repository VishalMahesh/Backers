import React from 'react'
import { View } from 'react-native'
import { CommonStyles, wide } from '../../constants'
import { Label } from './label'

const NoData = ({ color }) => <View style={[{ height: wide, width: wide }, CommonStyles.center]}>
    <Label
        label={"No data to display."}
        color={color}
    />
</View>

export default NoData