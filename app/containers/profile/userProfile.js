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
import { showConfirmationAlert, showErrorAlert } from '../../utils/info'
import { deleteAuth, deleteToken } from '../../middleware'
import Clipboard from '@react-native-clipboard/clipboard';
import AppLoader from '../../utils/Apploader'
import Toast from 'react-native-simple-toast';
import Presenters from '../presenters'
import { profilePosts, profileReels } from '../../actions/profile'
import NoData from '../../components/common/noData'
import Video from 'react-native-video'
import { BlankSpace } from '../../components/common/seperator'
import { setActiveTab } from '../../actions/reel'
import Modal from 'react-native-modal'
import Gallery from '../addPost/gallery'
import CameraModal from '../addPost/cameraModal'
import { checkUserName, updateProfile } from '../../actions/auth'
import { FormInputs } from '../../components/common/inputs'
import { BlurRadius } from '../../constants/constant'
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


const ProfileDeck = ({ name, isCurrent, data, id, edit, pickImage, onStory, profilePic, nameEdit,
    descEdit, nameSave, descSave }) => {
    const [descs, onDesc] = useState(data.aboutMe)
    const [namec, onName] = useState(name)
    return <View style={[{ minHeight: wide * 0.5, marginVertical: containerPadding, padding: containerPadding }, CommonStyles.rounded, CommonStyles.shadow]}>
        <View style={[{ flexDirection: 'row', height: wide * 0.3 }]}>
            <DeckLabels
                label1={data.followedCount}
                label2={"FOLLOWERS"}
            />
            <View style={[{ flex: 1.5, position: 'relative' }, CommonStyles.center]}>
                <View style={[{ borderWidth: 2, height: wide * 0.25, width: wide * 0.25, borderColor: isCurrent ? Colors.pink : Colors.emerald, borderRadius: 20 }, CommonStyles.center]}>
                    <Image
                        style={{ height: '95%', width: "95%", borderRadius: 16 }}
                        source={profilePic ? { uri: profilePic } : Images.img}
                    />
                    {edit ? <IconButtons
                        style={{ position: 'absolute', height: 25, width: 25, bottom: edit ? 5 : -10 }}
                        name={Images.editpen}
                        color={Colors.light}
                        action={pickImage}
                    />
                        :
                        isCurrent && <IconButtons
                            style={{ position: 'absolute', height: 25, width: 25, bottom: edit ? 5 : -10 }}
                            name={Images.plusedit}
                            action={onStory}
                        />}
                </View>
            </View>
            <DeckLabels
                label1={data.followingCount}
                label2={"BACKERS"}
                start
            />
        </View>
        <View style={{ width: "100%", position: 'relative' }}>
            {nameEdit ? <FormInputs
                style={{ alignSelf: 'center', marginVertical: containerPadding / 2 }}
                value={namec}
                profileInp
                onChangeText={(e) => onName(e)}
                placeholder={"Your user name here.."}
                onClear={() => nameSave(namec)}
                onSubmitEditing={() => nameSave(namec)}
                returnKeyType={"done"}
            />
                :
                <Label
                    style={{ alignSelf: 'center', marginVertical: containerPadding / 2 }}
                    size={18}
                    bold
                    label={namec}
                />}
        </View>
        <View style={{ width: "100%", position: 'relative' }}>
            {descEdit ? <FormInputs
                style={{ alignSelf: 'center', marginVertical: containerPadding / 2 }}
                value={descs}
                placeholder={"Your description here.."}
                profileInp
                returnKeyType={"done"}
                onChangeText={(e) => onDesc(e)}
                onSubmitEditing={() => descSave(descs)}
                onClear={() => descSave(descs)}
            /> :
                <Label
                    style={{ alignSelf: 'center', textAlign: 'center', lineHeight: 25 }}
                    color={Colors.shade}
                    size={16}
                    label={descs ? descs : "No description"}
                />
            }
        </View>
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
                    label={"You are a Backer"}
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
}
var arrr = []

const setIndex = (ind) => {
    let nind = ind * 3 + 1
    arrr.push(nind)
}

const getStaus = (ind) => {
    return arrr.includes(ind)
}

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
            reel: false,
            edit: false,
            picker: false,
            cameracapture: false,
            nameEdit: false,
            descEdit: false
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

    onEditCall = () => {
        setTimeout(() => {
            this.setState({ edit: true, nameEdit: true, descEdit: true })
        }, 200);
    }

    handleMedia = (e,) => {
        this.setState({ picker: false, cameracapture: false, }, () => {
            this.update(e, true);
        })
    }

    update = (data, isimage, isname) => {
        this.setState({ loading: true })
        this.props.dispatch(updateProfile(data, isimage, res => {
            this.setState({ loading: false })
            if (isname) {
                this.setState({ nameEdit: false })
            }
            else {
                if (!isimage) {
                    this.setState({ descEdit: false })
                }
            }
        }))
    }

    handleDetails = (item) => {
        const { reel, user } = this.state
        const { LoginData } = this.props.Data
        let obj = {}
        obj._id = user ? user._id : LoginData._id
        obj.profileImg = user ? user.profileImg : LoginData.profileImg
        obj.userName = user ? user.userName : LoginData.userName
        if (!reel) {
            Navigation.navigate("Details", { post: item, user: obj })
        }
        else {
            Navigation.navigate("ReelVideo", { type: "USER", user: obj })
        }
    }

    handleNameChange = (name) => {
        this.setState({ loading: true })
        this.props.dispatch(checkUserName({
            "userName": name
        }), res => {
            if (res) {
                this.update({ userName: name }, false, true)
            }
            else {
                showErrorAlert("Sorry! This user name is not available", "Alert", () => {
                    this.setState({ loading: false })
                })
            }
        })
    }


    render() {
        const { data, name, loading, option, reel, user, edit, picker, cameracapture, nameEdit, descEdit } = this.state;
        const { LoginData } = this.props.Data
        const { userPosts, userReels } = this.props.Profile
        return (
            <SafeAreaView style={[CommonStyles.container, CommonStyles.noPadding]}>
                <AuthHeader
                    label={name}
                    primaryAction={() => Navigation.back()}
                    icon={this.isCurrentUserProfile() ? Images.more : null}
                    secondaryAction={() => Navigation.navigate("AllSetting", { onEdit: this.onEditCall })}
                >
                    {edit && <IconButtons
                        name={Images.close}
                        style={{ position: 'absolute', right: wide * 0.13 }}
                        color={Colors.base}
                        action={() => this.setState({ edit: false, nameEdit: false, descEdit: false })}
                    />}
                </AuthHeader>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
                        <ProfileDeck
                            name={this.isCurrentUserProfile() ? LoginData.userName : name}
                            data={LoginData}
                            edit={edit}
                            nameEdit={nameEdit}
                            descEdit={descEdit}
                            profilePic={user ? user.profileImg : LoginData.profileImg}
                            pickImage={() => this.setState({ picker: true })}
                            onStory={() => {
                                this.props.dispatch(setActiveTab(0));
                                Navigation.navigate("AddPost")
                            }}
                            nameSave={(name) => this.update({ userName: name }, false, true)}
                            descSave={(desc) => this.update({ aboutMe: desc }, false)}
                            id={user ? user._id : LoginData._id}
                            isCurrent={this.isCurrentUserProfile()}
                        />
                        <ProfileOptions
                            action={(index) => this.setState({ reel: index == 0 ? false : true })}
                        />
                        <FlatList
                            data={reel ? userReels : userPosts}
                            key={reel}
                            renderItem={({ item, index }) => <TouchableOpacity
                                onLayout={() => setIndex(index)}
                                onPress={() => this.handleDetails(item)}
                                activeOpacity={0.5}
                                style={[{ flex: 1, height: wide * 0.3, maxWidth: wide * 0.29 }, getStaus(index) && { marginHorizontal: 7 }]}>
                                {item.attachments[0].type == "image" ? <Image
                                    source={{ uri: item.attachments[0].src }}
                                    blurRadius={item.premiumPost && !this.isCurrentUserProfile() ? BlurRadius : 0}
                                    style={[{ borderRadius: 5 }, CommonStyles.full]}
                                />
                                    :
                                    <Video
                                        source={{ uri: item.attachments[0].src }}
                                        paused
                                        style={[{ borderRadius: 5 }, CommonStyles.full]}
                                    />
                                }
                                {(item.attachments[0].type == "video" || item.attachments[0].type == "application") && <AppIcon
                                    name={Images.playfill}
                                    size={30}
                                    color={Colors.base}
                                    style={{ position: 'absolute', top: wide * 0.12, alignSelf: 'center' }}
                                />}
                            </TouchableOpacity>}
                            contentContainerStyle={[{ marginVertical: containerPadding, justifyContent: 'space-between' }]}
                            numColumns={3}
                            ItemSeparatorComponent={() => <BlankSpace offset={7} color={Colors.light} />}
                            scrollEnabled={false}
                            ListFooterComponent={() => <View
                                style={{ height: 100 }}
                            />}
                            ListEmptyComponent={<NoData />}
                        />
                    </View>
                </ScrollView>
                {/* <Presenters
                    optiondata={Dummy.ProfileSetting}
                    option={option}
                    action={this.handleAction}
                    closeOption={() => this.setState({ option: false })}
                /> */}
                <Modal
                    onBackButtonPress={() => this.setState({ picker: false })}
                    isVisible={picker}
                >
                    <Gallery
                        onCancel={() => this.setState({ picker: false })}
                        onlyPhoto={true}
                        onlyVideo={false}
                        onComplete={(data) => this.handleMedia(data)}
                        cameraMode={() => this.setState({ picker: false }, () => setTimeout(() => {
                            this.setState({ cameracapture: true })
                        }, 500))}
                        noMulti
                    />
                </Modal>
                <Modal style={{ margin: 0, padding: 0 }} isVisible={cameracapture}>
                    <CameraModal
                        handleBack={() => this.setState({ cameracapture: false })}
                        CapturedImage={(data) => this.handleMedia(data)}
                        CapturedVideo={() => alert("Video not be used")}
                        noVideo
                    />
                </Modal>
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
