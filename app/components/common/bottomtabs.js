import React from 'react'
import { View } from 'react-native'
import { Colors, CommonStyles } from '../../constants'
import { TabData } from '../../constants/dummy'
import { IconButtons } from './iconUtility'
const BottomTab = () => <View style={[CommonStyles.bordered, CommonStyles.btnRounded, CommonStyles.row, { justifyContent: 'space-evenly' }]}>
    {TabData.map((item, index) => <IconButtons
        name={item.name}
        type={item.type}
        color={index == 0 ? Colors.dark : Colors.shade}
        size={24}
    />)}
</View>

export {
    BottomTab
}