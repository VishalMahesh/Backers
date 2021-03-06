import React from 'react'
import { Image } from 'react-native'
import { CommonStyles } from '../../constants'

const Avatar = ({ source, blur }) => <Image
    source={source}
    style={[CommonStyles.full, CommonStyles.rounded1]}
    resizeMode={'cover'}
    blurRadius={blur}
/>

export {
    Avatar
}
