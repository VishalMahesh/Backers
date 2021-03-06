import React, { useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Colors, CommonStyles, wide } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import { Label } from '../common/label'

const gradientArr = ['rgba(0,0,0,1)', "rgba(0,0,0,0.8)", 'transparent',]

const SuggestedUser = ({ item, onProfile, large }) => {
    const [follow, onFollow] = useState(false)
    return <View style={[styles.container, CommonStyles.rounded, CommonStyles.bordered, large && styles.container2]}>
        <TouchableOpacity activeOpacity={0.5} onPress={onProfile} style={{ flex: 1 }}>
            <LinearGradient colors={gradientArr} style={[styles.subcont, CommonStyles.topRounded, CommonStyles.center]}>
                <Label
                    label={item.name}
                    color={Colors.light}
                    bold
                />
            </LinearGradient>
            <Image
                source={item.image}
                style={[CommonStyles.full, CommonStyles.topRounded]}
            />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onFollow(!follow)} style={[{ height: 40, backgroundColor: Colors.base }, CommonStyles.btmRounded, CommonStyles.center]}>
            <Label
                label={follow ? "✓  Following" : "Follow"}
                color={Colors.light}
                bold
                size={16}
            />
        </TouchableOpacity>
    </View>
}

const styles = {
    container: {
        width: wide * 0.35,
        height: wide * 0.5
    },
    container2: {
        width: wide * 0.4,
        height: wide * 0.55,
    },
    subcont: {
        height: 40, width: '100%', position: 'absolute', zIndex: 1
    }
}

export default SuggestedUser