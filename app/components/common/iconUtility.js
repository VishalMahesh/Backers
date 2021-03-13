import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Colors, CommonStyles } from '../../constants'

const AppIcon = ({ name, size, color, style }) => <Image
    style={[{ height: size, width: size, tintColor: color }, style]}
    resizeMode={'contain'}
    source={name}
/>

const IconButtons = ({ name, size = 20, color, action, style, active, pressin, pressout }) => <TouchableOpacity style={[CommonStyles.clickable, CommonStyles.center, style]} onPress={action} onLongPress={pressin} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }} onPressOut={pressout} activeOpacity={0.5}>
    <AppIcon
        size={size}
        color={color}
        key={active}
        name={name}
    />
</TouchableOpacity>

export {
    IconButtons,
    AppIcon
}
