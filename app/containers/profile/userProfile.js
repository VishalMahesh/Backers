import React, { Component, useState } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { AppIcon, IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { Colors, CommonStyles, containerPadding, Dummy, wide } from '../../constants'
import { ProfileTabs } from '../../constants/dummy'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import AppUtils from '../../utils'
import { connect } from 'react-redux'
import { showConfirmationAlert } from '../../utils/info'
import { deleteAuth, deleteToken } from '../../middleware'
import Clipboard from '@react-native-clipboard/clipboard';
import AppLoader from '../../utils/Apploader'
import Toast from 'react-native-simple-toast';
import Presenters from '../presenters'
import { profilePosts, profileReels } from '../../actions/profile'
import NoData from '../../components/common/noData'
import Video from 'react-native-video'
const DeckLabels = ({ start, label1, label2 }) => <View style={{ flex: 1, justifyContent: 'center', alignItems: start ? 'flex-start' : 'flex-end' }}>
    <Label
        label={label1}
        size={22}
    />
    <Label
        label={label2}
        color={Colors.shade}
        size={14}
        style={{ lineHeight: 25 }}
    />
</View>

const ProfileOptions = ({ action }) => {
    const [imgtab, onChange] = useState(0)
    return <View style={[{ height: wide * 0.15, position: 'relative' }, CommonStyles.shadow, CommonStyles.rounded, CommonStyles.row]}>
        {ProfileTabs.map((item, index) => <TouchableOpacity onPress={() => { onChange(index), action(index) }} style={[{ flex: 1 }, CommonStyles.center]}>
            <IconButtons
                name={item.img}
                color={imgtab == index ? Colors.base : Colors.darkgrey}
                size={22}
                action={() => { onChange(index), action(index) }}
            />
        </TouchableOpacity>
        )}
        <View style={{
            height: wide * 0.1, width: 1, backgroundColor: Colors.lightshade, position: 'absolute',
            left: wide * 0.46
        }} />
    </View>
}

export const ActionButtons = ({ icon, label, base, width, action }) => <TouchableOpacity
    onPress={action}
    style={[{ height: wide * 0.12, marginVertical: containerPadding / 2, backgroundColor: base ? Colors.base : Colors.lightbase, width: width }, CommonStyles.rounded, CommonStyles.row, CommonStyles.verticalCenter]}>
    <AppIcon
        name={icon}
        size={24}
        color={base ? Colors.light : Colors.base}
    />
    <Label
        label={label}
        size={14}
        bold
        color={base ? Colors.light : Colors.base}
        style={{ marginLeft: containerPadding / 2 }}
    />
</TouchableOpacity>


const ProfileDeck = ({ name, isCurrent, data, id }) => <View style={[{ minHeight: wide * 0.5, marginVertical: containerPadding, padding: containerPadding }, CommonStyles.rounded, CommonStyles.shadow]}>
    <View style={[{ flexDirection: 'row', height: wide * 0.3 }]}>
        <DeckLabels
            label1={data.counts.followed}
            label2={"FOLLOWERS"}
        />
        <View style={[{ flex: 1.5, position: 'relative' }, CommonStyles.center]}>
            <TouchableOpacity style={[{ borderWidth: 2, height: wide * 0.25, width: wide * 0.25, borderColor: isCurrent ? Colors.pink : Colors.emerald, borderRadius: 20 }, CommonStyles.center]}>
                <Image
                    style={{ height: '95%', width: "95%", borderRadius: 16 }}
                    source={Images.img}

                />
                {isCurrent && <Image
                    style={{ position: 'absolute', height: 25, width: 25, bottom: -10 }}
                    source={Images.plusedit}
                />}
            </TouchableOpacity>
        </View>
        <DeckLabels
            label1={data.counts.following}
            label2={"BACKERS"}
            start
        />
    </View>
    <Label
        style={{ alignSelf: 'center', marginVertical: containerPadding / 2 }}
        size={18}
        bold
        label={name}
    />
    <Label
        style={{ alignSelf: 'center', textAlign: 'center', lineHeight: 25 }}
        color={Colors.shade}
        size={16}
        label={data.aboutMe}
    />
    {!isCurrent && <View>
        <View style={[CommonStyles.row, { justifyContent: 'space-between' }]}>
            <ActionButtons
                icon={Images.usercheck}
                label={"Following"}
                width={wide * 0.35}
                base
            />
            <ActionButtons
                icon={Images.checkall}
                label={"You are a Loyal fan"}
                width={wide * 0.45}
                base
            />
        </View>
        <ActionButtons
            icon={Images.videoCall}
            label={"Schedule one time video call"}
            width={wide * 0.84}
            action={() => Navigation.navigate("UserScheduler", { userId: id })}
        />
    </View>}
</View>

class UserProfile extends Component {
    constructor(props) {
        super(props)
        var user = null
        var name = ""
        if (AppUtils.exists(props.navigation.state.params)) {
            user = props.navigation.state.params.user;
            name = props.navigation.state.params.user.userName
        }
        this.state = {
            data: Array.from({ length: 39 }, () => Math.floor(Math.random() * 39)),
            user,
            name,
            loading: true,
            option: false,
            reel: false
        }
    }

    componentDidMount() {
        const { LoginData } = this.props.Data
        const { user } = this.state;
        if (user) {
            this.setState({ name: user.userName })
        }
        else {
            this.setState({ name: LoginData.userName })
        }
        this.webCall()
    }

    isCurrentUserProfile() {
        const { user } = this.state;
        const { LoginData } = this.props.Data
        if (user) {
            return user._id === LoginData._id
        }
        else {
            return true
        }
    }


    webCall = () => {
        const { user } = this.state;
        const { LoginData } = this.props.Data
        let id = null
        if (user) {
            id = user._id
        }
        else {
            id = LoginData._id
        }
        this.props.dispatch(profilePosts(id, res => {
            this.props.dispatch(profileReels(id, e => {
                this.setState({ loading: false })
            }))
        }))
    }

    handleAction = (e) => {
        setTimeout(() => {
            if (e == 1) {
                Navigation.navigate("ScheduledCalls")
                // Navigation.navigate("EditDate")
            }
            else if (e == 3) {
                Clipboard.setString("Test One")
                setTimeout(() => {
                    Toast.show('Link Copied');
                }, 500);
            }
            else if (e == 4) {
                Navigation.navigate("AllSetting")
            }
        }, 300);
    }

    render() {
        const { data, name, loading, option, reel, user } = this.state;
        const { LoginData } = this.props.Data
        console.log(LoginData);
        const { userPosts, userReels } = this.props.Profile
        console.log(user);
        return (
            <SafeAreaView style={[CommonStyles.container, CommonStyles.noPadding]}>
                <AuthHeader
                    label={name}
                    primaryAction={() => Navigation.back()}
                    icon={this.isCurrentUserProfile() ? Images.more : null}
                    secondaryAction={() => this.setState({ option: true })}
                />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: containerPadding }}>
                    <ProfileDeck
                        name={name}
                        data={LoginData}
                        // id={user._id}
                        isCurrent={this.isCurrentUserProfile()}
                    />
                    <ProfileOptions
                        action={(index) => this.setState({ reel: index == 0 ? false : true })}
                    />
                    <FlatList
                        data={reel ? userReels : userPosts}
                        key={reel}
                        renderItem={({ item, index }) => <View style={[{ flex: 1, height: wide * 0.34, maxWidth: wide * 0.3 }, CommonStyles.center]}>
                            {item.attachments[0].type == "image" ? <Image
                                source={{ uri: item.attachments[0].src }}
                                style={{ height: "95%", width: "95%", borderRadius: 5 }}
                            />
                                :
                                <Video
                                    source={{ uri: item.attachments[0].src }}
                                    paused
                                    style={{ height: "95%", width: "95%", borderRadius: 5 }}
                                />
                            }
                            {console.log(item.attachments[0].type)}
                            {(item.attachments[0].type == "video" || item.attachments[0].type == "application") && <AppIcon
                                name={Images.playfill}
                                size={30}
                                color={Colors.light}
                                style={{ position: 'absolute', top: wide * 0.14 }}
                            />}
                        </View>}
                        contentContainerStyle={[{ marginVertical: containerPadding }, CommonStyles.shadow]}
                        numColumns={3}
                        scrollEnabled={false}
                        ListFooterComponent={() => <View
                            style={{ height: 100 }}
                        />}
                        ListEmptyComponent={<NoData />}
                    />
                </ScrollView>
                <Presenters
                    optiondata={Dummy.ProfileSetting}
                    option={option}
                    action={this.handleAction}
                    closeOption={() => this.setState({ option: false })}
                />
                <AppLoader
                    visible={loading}
                />
            </SafeAreaView>
        )
    }
}


function mapStateToProps(state) {
    const { entities, authReducer, profileReducer } = state;
    return {
        Data: entities.user,
        Profile: entities.profile,
        authReducer,
        profileReducer
    };
}

export default connect(mapStateToProps)(UserProfile);
