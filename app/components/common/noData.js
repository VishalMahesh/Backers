import React from 'react'
import { View } from 'react-native'
import { CommonStyles, wide } from '../../constants'
import { Label } from './label'

const NoData = () => <View style={[{ height: wide, width: wide }, CommonStyles.center]}>
    <Label
        label={"No data to display."}
    />
</View>

export default NoData