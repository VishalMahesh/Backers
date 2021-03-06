import React, { useState } from 'react'
import { View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { onChange } from 'react-native-reanimated'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { Fonts } from '../../constants/fonts'
import Images from '../../constants/Images'
import { PostButton, SubmitButtons, TipButton } from '../common/buttons'
import { AppIcon, IconButtons } from '../common/iconUtility'
import { Label } from '../common/label'
import Suggestion from './suggestions'
import ProfileButton from '../../components/profile'
import AppUtils from '../../utils/index'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const PostActions = ({ comment, share, payout, reel, index, likeCount = "2.4k", commentCount = "344", isLike, ...props }) => {
    const [likes, onChange] = useState(likeCount)
    let offset = useSafeAreaInsets()
    const [like, onLike] = useState(isLike);
    return <View style={[{ height: reel ? wide * 0.5 : wide * 0.15, }, reel && { justifyContent: 'space-around', position: 'absolute', right: 5, bottom: wide * 0.4 + offset.bottom, alignItems: 'flex-end' }, !reel && CommonStyles.row]}>
        <PostButton action={() => { onLike(!like), onChange(!like ? likes + 1 : likes - 1), props.onLike(isLike, index) }} icon={like ? Images.heartred : Images.heart} label={likes} />
        <PostButton action={comment} icon={Images.message} label={commentCount} />
        <PostButton action={share} icon={Images.send} />
        <PostButton action={payout} style={reel ? CommonStyles.payButton : CommonStyles.tipButton} icon={Images.dollar} />
    </View>
}



const IconLabel = ({ label, image }) => <View style={[CommonStyles.row]}>
    <AppIcon
        name={image}
        color={Colors.light}
        size={16}
    />
    <Label
        label={` ${label}`}
        size={16}
        bold
        color={Colors.light}
    />
</View>

const PriceInfo = () => <View style={[{ height: 30, justifyContent: 'space-between' }, CommonStyles.row]}>
    <IconLabel label={"3"} image={Images.png} />
    <IconLabel label={"4"} image={Images.dollar} />
</View>

const UnlockInfo = ({ action }) => <View style={{ flex: 1, padding: containerPadding / 2, position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
    <View style={[{ flex: 1 }, CommonStyles.center]}>
        <IconButtons name={Images.lock} color={Colors.light} size={26} />
        <Label label={"Unlock"} size={18} bold color={Colors.light} />
    </View>
    <View style={[styles.subCont, CommonStyles.rounded]}>
        <PriceInfo />
        <Label
            label={"Unlock this post & more such amazing posts from this creator for a month for just $4"}
            bold
            style={{ lineHeight: 20, marginVertical: 5 }}
            color={Colors.light}
        />
        <SubmitButtons
            label={"Subscribe & unlock for $4"}
            bold
            style={styles.btn}
            dark
            action={action}
        />
    </View>
</View>


const UserProfile = ({ onMore, onProfile, data }) => <View
    style={[{ height: wide * 0.12, marginBottom: 5 }, CommonStyles.row]}
>
    <ProfileButton
        activeOpacity={1}
        user={(data.users) ? data.users : null}
    >
        <Image
            source={Images.img1}
            style={CommonStyles.avatarsmall}
        />
    </ProfileButton>
    <View style={styles.container}>
        <ProfileButton
            activeOpacity={1}
            style={{ paddingHorizontal: 10 }}
            user={(data.users) ? data.users : null}
        >
            <Label
                label={(data.users) ? data.users.userName : "Test"}
                color={Colors.dark}
                style={styles.name}
            />
            <Label
                label={AppUtils.timeDiff(data.createdAt)}
                color={Colors.shade}
                style={styles.desc}
            />
        </ProfileButton>
        <IconButtons
            name={Images.more}
            size={26}
            action={onMore}
        />
    </View>
</View>

const Description = ({ action, value }) => <Label
    label={value}
    style={styles.desc2}
    size={16}
    onPress={action}
/>



const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    desc: {
        fontSize: 12
    },
    desc2: {
        lineHeight: 20, marginVertical: 10, fontFamily: Fonts.Regular
    },
    name: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20
    },
    subCont: {
        minHeight: wide * 0.42,
        borderWidth: 2,
        borderColor: Colors.light,
        padding: containerPadding,
        justifyContent: 'space-between'
    },
    medcont: {
        marginTop: 10,
        backgroundColor: Colors.light
    },
    btn: {
        width: wide * 0.78,
        height: wide * 0.12,
        marginVertical: 0
    }
}

export {
    Description,
    UserProfile,
    UnlockInfo,
    PostActions,
    Suggestion,
}