import React, { Component, useState } from 'react'
import { Text, Image, View, TouchableOpacity, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppIcon, IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import Modal from 'react-native-modal'
import Gallery from './gallery'
import { RNCamera } from 'react-native-camera';
import RequireStorage from '../../lib/requireStorage'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const STATUSBAR_HEIGHT = getStatusBarHeight();
import { compressRatio } from '../../constants/constant';
import ImageResizer from 'react-native-image-resizer';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { showErrorAlert } from '../../utils/info'
import { connect } from 'react-redux'
import { PostModes } from '../../constants/dummy'
const MaxDuration = 29;
var timer;
var imageConst = Platform.OS == 'ios' ? "image" : "image/jpg"
var videoConst = Platform.OS == 'ios' ? "video" : "video/mp4"
const getratio = (val) => {
    if (val == 0) {
        return "1:1"
    }
    else if (val == 1) {
        return "3:2"
    }
    else {
        return "16:9"
    }
}

const getMediaStatus = (index) => {
    if (index == 2) {
        return true;
    }
    else {
        return false
    }
}

export const AspectRatios = () => {
    const [ratio, onChange] = useState(0)
    const handleChange = () => {
        if (ratio == 0) {
            onChange(1)
        }
        else if (ratio == 1) {
            onChange(2)
        }
        else {
            onChange(0)
        }
    }
    return <TouchableOpacity onPress={handleChange} style={[{ height: 40, width: 60 }, CommonStyles.center]}>
        <Label
            label={getratio(ratio)}
            color={Colors.light}
            size={18}
            bold
        />
    </TouchableOpacity>

}

export const TopNav = ({ flash, close }) => {
    const inset = useSafeAreaInsets()
    return <View style={[styles.contain, CommonStyles.row, { top: inset.top }]}>
        <IconButtons
            name={Images.flash}
            color={Colors.light}
            action={flash}
        />
        <AspectRatios />
        <IconButtons
            name={Images.close}
            color={Colors.light}
            action={close}
            size={28}
        />
    </View>
}

export const ButtonLabel = ({ label, active, action }) => {
    let bg = !active ? 'transparent' : Colors.darkgrey;
    let font = active ? Colors.light : Colors.darkgrey;
    return <TouchableOpacity activeOpacity={1} onPress={action} style={[{ height: 40, width: wide * 0.19, borderRadius: 23, backgroundColor: bg }, CommonStyles.center]}>
        <Label
            label={label}
            color={font}
        />
    </TouchableOpacity>
}

const PostTabs = ({ onAlter, tab }) => {
    const [active, onChange] = useState(tab)
    return <View style={[{ height: 50, width: wide * 0.6, borderRadius: 25, backgroundColor: Colors.lightshade, justifyContent: 'center', alignSelf: 'center' }, CommonStyles.row]}>
        {PostModes.map((item, index) => <ButtonLabel
            active={index == active}
            label={item}
            action={() => { onChange(index), onAlter(index) }}
        />)}
    </View>
}

export const LastImage = ({ action, source }) => <TouchableOpacity onPress={action} style={{ height: 32, width: 32, borderRadius: 7, padding: 2, backgroundColor: Colors.light, marginRight: 10 }}>
    <Image
        style={[CommonStyles.full, { borderRadius: 6 }]}
        source={{ uri: source }}
        resizeMode={'cover'}
    />
</TouchableOpacity>

export const BottomNav = ({ onPick, onBack, source, ...props }) => {
    const inset = useSafeAreaInsets()
    return <View style={[styles.contain, CommonStyles.row, { bottom: inset.bottom }]}>
        {props.children}
        <IconButtons
            name={Images.repeat}
            size={28}
            action={onBack}
        />
    </View>
}

export const Capture = ({ action, pressin, pressout, fill }) => {
    const inset = useSafeAreaInsets()
    let bottom = inset.bottom + 100
    return <TouchableOpacity
        onPress={action}
        onLongPress={pressin}
        onPressOut={pressout}
        activeOpacity={1}
        style={[{ position: 'absolute', bottom: bottom }, CommonStyles.center]}>
        <AppIcon
            name={Images.capture}
            size={80}
        />
        <AnimatedCircularProgress
            size={80}
            width={5}
            backgroundWidth={5}
            fill={fill}
            duration={2000}
            tintColor={Colors.base}
            backgroundColor={Colors.lightshade}
            rotation={0}
            lineCap="round"
            style={{ position: 'absolute' }}
        />
    </TouchableOpacity>
}


class AddPost extends Component {

    state = {
        picker: false,
        flash: false,
        front: false,
        points: 0,
        onlyImage: false,
        recordOptions: {
            mute: false,
            maxDuration: 29,
            quality: RNCamera.Constants.VideoQuality['480p'],
        },
        activetab: 1,
        cameracapture: false,
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (props) => {
            const { prevactiveTab } = this.props.data
            this.previousTab(prevactiveTab)
        });
    }

    previousTab = (e) => {
        this.setState({ activetab: e })
    }

    handleSelected = (data) => {
        const { activetab } = this.state;
        let items = [...data]
        this.setState({ picker: false, cameracapture: false })
        setTimeout(() => {
            Navigation.navigate("NewPost", { media: items, mode: activetab })
        }, 200);
    }


    captureImage = async () => {
        const { activetab } = this.state;
        if (this.camera && activetab !== 2) {
            const options = { quality: 0.3 };
            const data = await this.camera.takePictureAsync(options);
            return ImageResizer.createResizedImage(data.uri, data.width / 2, data.height / 2, "JPEG", compressRatio)
                .then(response => {
                    let items = [{
                        uri: response.uri,
                        type: imageConst
                    }]
                    this.setState({ cameracapture: false, activetab: 1 })
                    Navigation.navigate("NewPost", { media: items, mode: activetab })
                    // this.props.CapturedImageObj(response);
                })
                .catch(err => {
                });
        }
        else {
            showErrorAlert("Only Video can be uploaded. Press and hold capture icon to record video or select one from gallery.", "Message", () => {

            })
        }
    };

    increm = () => {
        timer = setInterval(() => {
            if (this.state.points <= MaxDuration) {
                this.setState({ points: this.state.points + 1 });
            } else {
                this._endVideo();
            }
        }, 1000);
    };


    startRecord = () => {
        if (!this.state.onlyImage) {
            this.increm();
            setTimeout(this._recordVideo.bind(this), 50);
        }
    };

    async _recordVideo() {
        const { activetab } = this.state;
        if (this.camera) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);
                if (promise) {
                    const data = await promise;
                    this.setState({
                        points: 0,
                        picker: false,
                        flash: false,
                        front: false,
                    });
                    let items = [{
                        uri: data.uri,
                        type: videoConst
                    }]
                    Navigation.navigate("NewPost", { media: items, mode: activetab })
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
    _endVideo() {
        clearInterval(timer);
        if (this.camera) {
            this.camera.stopRecording();
        }
    }
    stopRecord = () => {
        if (!this.state.onlyImage) {
            this._endVideo();
        }
    };


    handleBack = () => {
        const { cameracapture } = this.state;
        if (cameracapture) {
            this.setState({ cameracapture: false, activetab: 1 });
        }
        else {
            Navigation.back()
        }
    }

    render() {
        const { picker, flash, front, points, activetab, cameracapture } = this.state;
        const { photos, videos } = this.props;
        const fill = (points / MaxDuration) * 100;
        return (
            <RNCamera
                flashMode={flash ? "torch" : 'off'}
                style={styles.main}
                type={front ? 'front' : 'back'}
                ref={(ref) => {
                    this.camera = ref;
                }}
            >
                <TopNav
                    flash={() => this.setState({ flash: !flash })}
                    close={this.handleBack}
                />
                <Capture
                    action={this.captureImage}
                    pressin={this.startRecord}
                    pressout={this.stopRecord}
                    fill={fill}
                />
                <BottomNav
                    onBack={() => this.setState({ front: !front })}
                >
                    {!cameracapture && <>
                        <LastImage
                            action={() => this.setState({ picker: true })}
                            source={photos ? photos[0].uri : ""}
                        />
                        <PostTabs
                            tab={activetab}
                            key={activetab}
                            onAlter={activetab => this.setState({ activetab })}
                        />
                    </>}
                </BottomNav>
                <Modal onBackButtonPress={() => this.setState({ picker: false })} isVisible={picker}>
                    <Gallery
                        onCancel={() => this.setState({ picker: false })}
                        onlyVideo={getMediaStatus(activetab)}
                        onComplete={this.handleSelected}
                        cameraMode={() => this.setState({ picker: false, cameracapture: true })}
                    />
                </Modal>
            </RNCamera>
        )
    }
}

function mapStateToProps(state) {
    const { entities } = state
    return {
        data: entities.reel,
    }
}


const AddPostComponent = RequireStorage(AddPost)

export default connect(mapStateToProps)(AddPostComponent);

const styles = {
    main: {
        flex: 1,
        backgroundColor: Colors.dark,
        paddingHorizontal: containerPadding,
        alignItems: 'center',
        marginTop: -STATUSBAR_HEIGHT
    },
    contain: {
        height: 80,
        width: '96%',
        position: 'absolute',
        justifyContent: 'space-between'
    }
}