
import React, { Component } from 'react'
import { Platform, Text, View } from 'react-native'
import { Colors, containerPadding } from '../../constants';
import { RNCamera } from 'react-native-camera';
import RequireStorage from '../../lib/requireStorage'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Navigation from '../../lib/Navigation';
import ImageResizer from 'react-native-image-resizer';
import { showErrorAlert } from '../../utils/info';
import { BottomNav, Capture, TopNav } from '.';
import { compressRatio } from '../../constants/constant';
import AppStatusBar from '../../utils/AppStatusBar';
const STATUSBAR_HEIGHT = getStatusBarHeight();
const MaxDuration = 29;
var timer;

var imageConst = Platform.OS == 'ios' ? "image" : "image/jpg"
var videoConst = Platform.OS == 'ios' ? "video" : "video/mp4"
class CameraModal extends Component {

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

    captureImage = async () => {
        const { activetab } = this.state;
        if (this.camera && activetab !== 2) {
            const options = { quality: 0.3 };
            const data = await this.camera.takePictureAsync(options);
            return ImageResizer.createResizedImage(data.uri, data.width / 2, data.height / 2, "JPEG", compressRatio)
                .then(response => {
                    let imageobj = {
                        uri: response.uri,
                        type: imageConst
                    }
                    this.props.CapturedImage(imageobj);
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
                    let videoobj = {
                        uri: data.uri,
                        type: videoConst
                    }
                    this.props.CapturedVideo(videoobj)
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

    render() {
        const { picker, flash, front, points, activetab, cameracapture } = this.state;
        const { photos, videos } = this.props;
        const fill = (points / MaxDuration) * 100;
        return (
            <>
                <AppStatusBar color={Colors.base1} />
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
                        close={this.props.handleBack}
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
                    </BottomNav>
                </RNCamera>
            </>
        )
    }
}

export default RequireStorage(CameraModal)
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
