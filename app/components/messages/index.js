import React, { useState, useRef, useEffect } from 'react'
import { FlatList, View, TouchableOpacity, TextInput, ImageBackground, Keyboard, Dimensions } from "react-native";
import { wide, containerPadding, Colors, CommonStyles, } from "../../constants";
import { Fonts } from '../../constants/fonts';
import Images from '../../constants/Images';
import { AppIcon, IconButtons } from '../common/iconUtility';
import { Label } from '../common/label';
import { Avatar } from "../feed/comments"
import EmojiBoard from 'react-native-emoji-board'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import _ from 'lodash'
const { width, height } = Dimensions.get('window');
let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);
if (width <= height) {
    if (calRatio < 9) {
        calRatio = width / 9;
    } else {
        calRatio = height / 18;
    }
} else {
    if (calRatio < 9) {
        calRatio = height / 9;
    } else {
        calRatio = width / 18;
    }
}

const actualWidth = (val) => {
    if (!_.isNaN(val) && _.isFinite(val)) {
        return val
    }
    else {
        return 0
    }
}

const screenWidth = width;
const ratio = calRatio / (360 / 9);
const Badge = ({ size, style }) => <View style={[
    {
        height: size,
        width: size,
        borderRadius: size / 2,
    },
    style
]} />

const KeyButons = ({ icon, action, style, size = 26, color = Colors.dark }) => <View style={[{ height: wide * 0.13, width: wide * 0.13, backgroundColor: Colors.lightbase, marginLeft: containerPadding / 2 }, CommonStyles.center, CommonStyles.rounded, style]}>
    <IconButtons
        name={icon}
        size={size}
        action={action}
        color={color}
    />
</View>

const KeyBoardView = ({ onSend, value, onChange, reply, content, closereply, emojiadd,
    emojirem, onImage, cursorposition, recordAudio, isrecording, VoicePrev,
    voiceObj, closeSound, submitSound }) => {
    const [emoji, onEmoji] = useState(false)
    const [isKeyboard, onKeyboard] = useState(false)
    const [playTime, onChangeTime] = useState('00:00:00')
    const [isPlaying, onChangePlay] = useState(false)
    const [dur, onDur] = useState(voiceObj.duration)
    const [currentPositionSec, onCurrentPos] = useState(0)
    const [currentDurationSec, onCurrentDur] = useState(0)
    const textinpRef = useRef(null)
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    useEffect(() => {
        onDur(voiceObj.duration)
    }, [VoicePrev])
    const audioRecorderPlayer = new AudioRecorderPlayer();

    audioRecorderPlayer.setSubscriptionDuration(0.09)

    const onStartPlay = async () => {
        const path = voiceObj.path
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        audioRecorderPlayer.addPlayBackListener((e: any) => {
            if (e.current_position === e.duration) {
                onStopPlay()
            }
            else {
                onChangePlay(true)
                onChangeTime(audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ))
            }
            onCurrentPos(e.current_position)
            onCurrentDur(e.duration)
            onDur(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
        });
    };

    const onStopPlay = async () => {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        onChangeTime('00:00:00')
        onChangePlay(false)
    };

    const handlePlay = () => {
        if (isPlaying) {
            onStopPlay()
        }
        else {
            onStartPlay()
        }
    }

    const _keyboardDidShow = () => {
        onKeyboard(true)
    };

    const _keyboardDidHide = () => {
        onKeyboard(false)
    };
    const handleEmoji = () => {
        if (!emoji) {
            onEmoji(true)
            Keyboard.dismiss();
        }
        else {
            onEmoji(false)
            setTimeout(() => {
                textinpRef.current.focus()
                onKeyboard(false)
                onEmoji(false)
            }, 50);
        }
    }
    let playWidth =
        (currentPositionSec / currentDurationSec) *
        (screenWidth - wide * 0.38 * ratio);
    if (playTime == '00:00:00') playWidth = 0;
    return <>
        {reply && !VoicePrev && <View style={[{ height: wide * 0.2, paddingHorizontal: containerPadding }, CommonStyles.topBorder, CommonStyles.rounded, CommonStyles.row]}>
            <View style={{ flex: 1, height: "75%", backgroundColor: Colors.lightbase, padding: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Label
                        label={content.user._id == 1 ? "You" : content.user.name}
                        color={Colors.base}
                        size={12}
                    />
                    {content.audio && <View style={CommonStyles.row}>
                        <AppIcon
                            name={Images.mic}
                            size={16}
                        />
                        <Label
                            label={content.duration}
                            size={12}
                            style={{ marginLeft: 5 }}
                        />
                    </View>}
                    <Label
                        label={content.text}
                        size={14}
                        numberOfLines={2}
                    />
                </View>
                {content.image && <ImageBackground
                    source={{ uri: content.image }}
                    resizeMode={'cover'}
                    style={{ flex: 0.3 }}>

                </ImageBackground>}
            </View>
            <IconButtons
                name={Images.close}
                color={Colors.base}
                action={closereply}
            />
        </View>}
        <View style={styles.inpContainer}>
            {VoicePrev ? <>
                <View style={[{ flex: 1, }, CommonStyles.row]}>
                    <IconButtons
                        name={Images.play}
                        size={25}
                        action={handlePlay}
                    />
                    <View style={styles.viewBar}>
                        <View style={[styles.viewBarPlay, { width: actualWidth(playWidth), backgroundColor: Colors.base }]} />
                        <Label
                            size={10}
                            label={`${playTime} / ${dur}`}
                            style={{ position: 'absolute', top: -20 }}
                        />
                    </View>
                </View>
                <IconButtons
                    name={Images.close}
                    color={"red"}
                    size={25}
                    action={closeSound}
                />
                <IconButtons
                    name={Images.submit}
                    size={25}
                    action={submitSound}
                />
            </> : <>
                    <View style={styles.inpWrapper}>
                        <TextInput
                            multiline
                            style={styles.input}
                            ref={textinpRef}
                            value={value}
                            onFocus={() => onEmoji(false)}
                            onSelectionChange={cursorposition}
                            // editable={!emoji}
                            selectionColor={Colors.base}
                            onChangeText={onChange}
                            placeholder={"Type a message"}
                        />
                        <KeyButons
                            icon={emoji ? Images.abc : Images.smile}
                            action={handleEmoji}
                            style={{ position: 'absolute', right: 0 }}
                        />
                    </View>
                    {value.trim() == "" ? <View style={CommonStyles.row}>
                        <KeyButons
                            icon={Images.mic}
                            action={recordAudio}
                            size={22}
                            color={isrecording ? Colors.base : Colors.dark}
                        />
                        <KeyButons
                            icon={Images.imageattach}
                            action={onImage}
                        />
                    </View>
                        :
                        <KeyButons
                            icon={Images.submit}
                            action={onSend}
                        />
                    }
                </>}
        </View>
        {!isKeyboard && emoji && <View style={{ height: wide * 0.72 }}>
            <EmojiBoard
                showBoard={emoji}
                onClick={emojiadd}
                onRemove={emojirem}
            />
        </View>}
    </>
}

const MessageItem = ({ item, index, action }) => <TouchableOpacity
    activeOpacity={0.5}
    onPress={action}
    style={styles.listItem}>
    <View style={styles.pic}>
        <Avatar
            source={item.img}
            size={wide * 0.16}
        />
        {(index == 2 || index == 4) && <Badge
            style={styles.badge}
            size={20}
        />}
    </View>
    <View style={styles.msg}>
        <Label
            label={item.user + " • 2h"}
            bold
        />
        <Label
            label={item.comment}
            numberOfLines={1}
            color={Colors.shade}
        />
    </View>
    <View style={[{ flex: 0.1 }, CommonStyles.center]}>
        {(index == 1 || index == 4) && <Label
            label={"•"}
            size={40}
            color={Colors.shade}
        />}
    </View>
</TouchableOpacity>

const Messages = ({ data, handler }) => <FlatList
    data={data}
    contentContainerStyle={styles.container}
    renderItem={({ item, index }) => <MessageItem
        index={index}
        item={item}
        action={() => handler(item)}
    />}
/>

const styles = {
    container: {
        paddingHorizontal: containerPadding,
        width: wide
    },
    listItem: {
        height: wide * 0.2,
        flexDirection: "row"
    },
    pic: {
        flex: 0.3,
        justifyContent: 'center',
        position: "relative"
    },
    msg: {
        flex: 1,
        justifyContent: 'center'
    },
    badge: {
        position: "absolute",
        top: containerPadding - 5,
        right: containerPadding - 5,
        borderWidth: 4,
        borderColor: Colors.light,
        backgroundColor: Colors.green,
    },
    inpContainer: [
        {
            minHeight: wide * 0.15,
            maxHeight: wide * 0.4,
            padding: containerPadding,
            marginBottom: 0
        },
        CommonStyles.topBorder,
        CommonStyles.topRounded,
        CommonStyles.row
    ],
    inpWrapper: [
        {
            flex: 1,
            backgroundColor: Colors.lightbase,
            position: 'relative'
        },
        CommonStyles.rounded
    ],
    input: {
        minHeight: wide * 0.13, textAlignVertical: 'center',
        paddingRight: wide * 0.13,
        paddingLeft: 10,
        fontFamily: Fonts.Regular,
        lineHeight: wide * 0.075,
        fontSize: 14
    },
    viewBar: {
        backgroundColor: Colors.base1,
        height: 4 * ratio,
        alignSelf: 'stretch',
        width: '80%',
        marginTop: wide * 0.07,
        position: 'relative'
    },
    viewBarPlay: {
        backgroundColor: Colors.base,
        height: 4 * ratio,
        width: 0,
    },
}

export {
    Messages,
    KeyBoardView
}
