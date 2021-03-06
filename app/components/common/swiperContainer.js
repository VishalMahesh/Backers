import React from 'react'
import { View } from 'react-native'
import { Colors } from "../../constants"
import Swiper from "../../lib/Swiper"

const SwipeContainer = ({ dotSize = 15, ...props }) => {
    const Type1dot = <View style={{ backgroundColor: Colors.light, width: dotSize, height: dotSize, borderRadius: dotSize / 2, margin: 3, borderColor: Colors.shade, borderWidth: 0.5 }} />
    const Type2dot = <View style={{ backgroundColor: Colors.base, width: dotSize, height: dotSize, borderRadius: dotSize / 2, margin: 3, borderColor: Colors.base, borderWidth: 0.5 }} />
    return <Swiper {...props} dot={Type1dot} activeDot={Type2dot} dotColor={Colors.lightshade} dotStyle={{ borderColor: Colors.base }} activeDotColor={Colors.base} loop={false}>
        {props.children}
    </Swiper>
}

export default SwipeContainer