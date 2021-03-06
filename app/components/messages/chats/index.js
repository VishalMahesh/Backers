import React, { Component } from 'react'
import { Platform, View, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import Modal from 'react-native-modal'
import { GiftedChat, Bubble } from '../../../lib/customChats'
import { Colors, CommonStyles, containerPadding, wide, } from '../../../constants'
import { Messages } from '../../../constants/dummy'
import Images from '../../../constants/Images'
import Navigation from '../../../lib/Navigation'
import { AuthHeader } from '../../../utils/Headers/CustomHeader'
import { IconButtons } from '../../common/iconUtility'
import { KeyBoardView } from '..'
import MediaHelper from '../../../lib/MediaHelper'
import { Label } from '../../common/label'
import { ListItem } from '../../feed/options'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

let cameraOption = [
    {
        icon: Images.google,
        label: "Pick from camera"
    },
    {
        icon: Images.google,
        label: "Pick from gallery"
    },
]

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const CloseTab = ({ Close }) => <TouchableOpacity onPress={Close} style={{ flex: 1.2, }} />

export default class ChatRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.navigation.state.params,
            messages: [],
            msgText: "",
            reply: false,
            replycontent: null,
            emoji: false,
            image: "",
            picker: false,
            cursor: 0,
            isrecording: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            voicepreview: false,
            voiceobj: {}
        }
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09);
    }

    componentDidMount() {
        this.setState({ messages: [...Messages] })
    }

    onSend = (res, img, audio) => {
        const { msgText, replycontent, recordTime } = this.state;
        if (img && res) {
            setTimeout(() => {
                var msg
                if (audio) {
                    msg = {
                        _id: Math.random(),
                        createdAt: new Date(),
                        content: replycontent,
                        audio: res,
                        duration: recordTime,
                        user: {
                            _id: 1,
                            name: 'Developer',
                        },
                    }
                }
                else {
                    msg = {
                        _id: Math.random(),
                        createdAt: new Date(),
                        content: replycontent,
                        image: res,
                        user: {
                            _id: 1,
                            name: 'Developer',
                        },
                    }
                }
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, msg),
                    msgText: "",
                    replycontent: null,
                    reply: false,
                    voiceobj: {},
                    voicepreview: false
                }))
                this._giftedchat.scrollToBottom()
            }, 50);
        }
        else {
            if (msgText.trim() !== "") {
                let msg = {
                    _id: Math.random(),
                    text: msgText,
                    createdAt: new Date(),
                    content: replycontent,
                    user: {
                        _id: 1,
                        name: 'Developer',
                    },
                }
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, msg),
                    msgText: "",
                    replycontent: null,
                    reply: false
                }))
                this._giftedchat.scrollToBottom()
            }
        }
    }

    handleReply = (reply) => {
        this.setState({
            reply: true,
            replycontent: reply
        })
    }

    handleEmoji = (val) => {
        const { msgText, cursor } = this.state;
        let currmsg = ""
        if (val) {
            currmsg = msgText.splice(cursor, 0, val.code)
        }
        else {
            currmsg = msgText.substring(0, msgText.length - 1);
        }
        this.setState({ msgText: currmsg })
    }

    handleImage = (ind) => {
        this.setState({ picker: false }, () => {
            setTimeout(() => {
                if (ind == 1) {
                    MediaHelper.selectMedia(false, res => {
                        this.onSend(res, true)
                    })
                }
                else {
                    MediaHelper.captureMedia(false, res => {
                        this.onSend(res, true)
                    })
                }
            }, 500);
        })
    }

    handleRecord = () => {
        const { isrecording } = this.state
        if (isrecording) {
            this.onStopRecord()
        }
        else {
            this.onStartRecord()
        }
    }


    onStartRecord = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        const path = Platform.select({
            ios: `${makeid(5)}.m4a`,
            android: `sdcard/${makeid(5)}.mp4`,
        });
        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
        this.audioRecorderPlayer.addRecordBackListener((e: any) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                isrecording: true
            });
        });
        console.log(`uri: ${uri}`);
    };

    onStopRecord = async () => {
        const { recordTime } = this.state;
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
            isrecording: false,
            voiceobj: {
                path: result,
                duration: recordTime
            }
        }, () => {
            this.setState({ voicepreview: true, })
        });

        // if (action !== "stop") {
        //     this.onSend(result, true, true)
        // }
    };


    render() {
        const { user, msgText, reply, replycontent, picker, cursor, isrecording, voiceobj, voicepreview } = this.state;
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? 'padding' : null} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
                    <AuthHeader
                        label={user.user}
                        primaryAction={() => Navigation.back()}
                        icon={Images.videoCall}
                        size={22}
                        avatar={user.img}
                        chat
                    >
                        <IconButtons
                            name={Images.call}
                            style={{ position: 'absolute', right: wide * 0.11 }}
                            size={22}
                        />
                        <IconButtons
                            style={{ position: 'absolute', right: wide * 0.2 }}
                            name={Images.block}
                            size={22}
                        />
                    </AuthHeader>
                    <GiftedChat
                        messages={this.state.messages}
                        wrapInSafeArea={true}
                        isKeyboardInternallyHandled={false}
                        user={{
                            _id: 1,
                        }}
                        replyObj={this.handleReply}
                        ref={(e) => this._giftedchat = e}
                    />
                    <KeyBoardView
                        value={msgText}
                        onChange={(msgText) => this.setState({ msgText })}
                        onSend={this.onSend}
                        reply={reply}
                        emojiadd={this.handleEmoji}
                        emojirem={this.handleEmoji}
                        content={replycontent}
                        closereply={() => this.setState({ reply: false })}
                        onImage={() => {
                            // MediaHelper.selectMedia(false, (res) => {
                            //     this.onSend(res, true)
                            // })
                            this.setState({ picker: true })
                        }}
                        cursorposition={event => this.setState({ cursor: event.nativeEvent.selection.end })}
                        recordAudio={this.handleRecord}
                        isrecording={isrecording}
                        VoicePrev={voicepreview}
                        voiceObj={voiceobj}
                        closeSound={() => this.setState({ voicepreview: false, voiceobj: {} })}
                        submitSound={() => this.onSend(voiceobj.path, true, true)}
                    />
                </SafeAreaView>
                <Modal
                    isVisible={picker}
                    useNativeDriver={true}
                    onBackButtonPress={() => this.setState({ picker: false })}
                >
                    <View style={{ flex: 1 }}>
                        <CloseTab
                            Close={() => this.setState({ picker: false })}
                        />
                        <View style={[{ backgroundColor: Colors.light, paddingBottom: containerPadding / 2 }, CommonStyles.rounded]}>
                            {cameraOption.map((item, index) => <ListItem
                                item={item}
                                index={index}
                                action={() => this.handleImage(index)}
                            />)}
                        </View>
                        <CloseTab
                            Close={() => this.setState({ picker: false })}
                        />
                    </View>
                </Modal>
            </KeyboardAvoidingView >
        )
    }
}