import React, { useState, useEffect } from 'react'
import { FlatList, TouchableOpacity, View, Image } from 'react-native'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants';
import { Avatar } from '../common/avatar';
import { Label } from '../common/label';
import { BlurView } from '@react-native-community/blur'
import { IconButtons } from '../common/iconUtility';
import Images from '../../constants/Images';
import { BlurRadius } from '../../constants/constant';
const imglink = (ind) => `https://randomuser.me/api/portraits/men/${ind}.jpg`

const UserStory = ({ item, index, action }) => {
    const [color, onChange] = useState(null);
    useEffect(() => {
        var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        onChange(ColorCode)
    }, [])
    const getImage = (image) => {
        if (image.attachments.length !== 0) {
            return { uri: image.attachments[0].src }
        }
        else {
            return { uri: imglink(0) }
        }
    }
    return <TouchableOpacity onPress={action} activeOpacity={1}>
        <View style={[CommonStyles.story, CommonStyles.center, CommonStyles.rounded, { borderColor: Colors.base, position: 'relative' }]}>
            <Avatar
                source={getImage(item)}
            // blur={index == 2 ? BlurRadius : 0}
            />
            {/* {index == 2 && <>
                <IconButtons
                    name={Images.lock}
                    style={{ position: "absolute" }}
                    color={Colors.dark}
                    size={25}
                />
            </>} */}
        </View>
        <View style={styles.container}>
            <Image
                style={styles.avatar2}
                source={{ uri: imglink(index + 13) }}
            />
            <Label
                label={item.users.userName}
                color={Colors.dark}
                style={styles.label}
            />
        </View>
    </TouchableOpacity>
}

const StoriesWrapper = ({ data, action }) => <FlatList
    data={data}
    horizontal
    style={{ flexGrow: 0, marginVertical: data.length > 0 ? containerPadding : 0 }}
    contentContainerStyle={{ paddingRight: 20 }}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, index }) => <UserStory
        item={item}
        action={action}
        index={index}
    />}
/>


const styles = {
    container: {
        flexDirection: 'row',
        height: wide * 0.1,
        marginTop: 5,
        paddingLeft: containerPadding,
        alignItems: 'center',
        width: wide * 0.3
    },
    avatar2: {
        height: 28,
        width: 28,
        borderRadius: 14
    },
    label: {
        fontSize: 14,
        marginLeft: 5
    }
}

export default React.memo(StoriesWrapper)