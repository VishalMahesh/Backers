import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { View, ImageBackground, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native'
import { IconButtons } from '../../components/common/iconUtility';
import { Colors, CommonStyles, containerPadding, storyDuration, wide } from "../../constants";
import { BlurRadius } from '../../constants/constant';
import Images from '../../constants/Images';
import * as Progress from 'react-native-progress';
import { UnlockInfo } from '../../components/feed';
import Video from 'react-native-video';
let offset = wide - (containerPadding * 2)
let keyboardOffset = Platform.OS == 'ios' ? wide * 0.15 : 0
let options = [Images.storyclose, Images.storyOpt]
let val = 0;
var test = false
const ActionButtons = ({ action }) => <View style={styles.btncont}>
    {options.map((item, index) => <IconButtons
        name={item}
        size={30}
        action={() => action(index)}
    />)}
</View>

const Touchables = ({ previous, pressin, pressout, next }) => <View style={{ flex: 1, flexDirection: "row" }}>
    <TouchableOpacity
        onPress={previous}
        style={{ flex: 1, width: wide * 0.25, }} />

    <TouchableOpacity
        onPressIn={pressin}
        onPressOut={pressout}
        style={{ flex: 1, width: wide * 0.42, }} />
    <TouchableOpacity
        onPress={next}
        style={{ flex: 1, width: wide * 0.25, }} />
</View>

const ImgIndicator = ({ imgLen, progress }) => <Progress.Bar
    style={{ marginHorizontal: 5 }}
    animated
    useNativeDriver={true}
    progress={progress}
    color={Colors.base}
    width={wide * 0.78 / imgLen}
    borderWidth={0}
    height={4}
    unfilledColor={Colors.lightshade}
/>

const MediaContainer = ({ image, source, blur, ikey, user, ...props }) => {
    if (image) {
        return <ImageBackground
            source={source}
            key={ikey}
            blurRadius={blur}
            imageStyle={CommonStyles.rounded}
            style={[styles.container, { height: '95%' }]}>
            {props.children}
        </ImageBackground>
    }
    else {
        return <View style={[styles.container, { height: '95%', position: 'relative' }]}>
            <Video
                source={source}
                repeat
                key={ikey}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            {props.children}
        </View>
    }
}

const ParallaxItem = ({
    item,
    index,
    onClose,
    onMore,
    User,
    onNext,
    onPrev,
    progress,
    end = false,
    pressin,
    pressout,
    resetTime
}) => {
    const [itemIndex, changeItem] = useState(0)
    const [blur, onRemove] = useState(true)
    let imglength = item.attachments.length
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            if (test) {
                if (User == index) {
                    if (itemIndex < imglength) {
                        next()
                        test = false
                    }
                }
            }
            else {
                test = true
            }
        } else {
            isMounted.current = true;
            test = true
        }
    }, [end])
    const previous = () => {
        if (itemIndex == 0) {
            onPrev()
            resetTime()
        }
        else {
            if (imglength > itemIndex + 1) {
                changeItem(itemIndex - 1)
                resetTime()
            }
            else {
                changeItem(itemIndex - 1)
                resetTime()
            }
        }
    }

    const next = () => {
        if (imglength == 1) {
            onNext()
            setTimeout(() => {
                changeItem(0);
                resetTime()
            }, 500);
        }
        else {
            if (itemIndex + 1 < imglength) {
                changeItem(itemIndex + 1)
                resetTime()
            }
            else {
                onNext()
                setTimeout(() => {
                    resetTime()
                    changeItem(0)
                }, 500);
            }
        }
    }

    return <View style={{ flex: 1 }}>
        <MediaContainer
            source={{ uri: item.attachments[itemIndex].src }}
            //blur={(index == 1 && blur) ? BlurRadius : 0}
            blur={0}
            image={item.attachments[itemIndex].type == "image"}
            key={User}
            ikey={item.attachments.length == 0 ? `${index}${User}` : index}
        >
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardOffset}
                behavior={Platform.OS == 'ios' ? "padding" : null}
                style={styles.subcont}>
                <ActionButtons
                    action={e => (e == 0) ? onClose() : onMore()}
                />
                {/* {(index == 1 && blur) ? <View style={[CommonStyles.center, { flex: 1, position: 'relative' }]}>
                    <UnlockInfo
                        action={() => onRemove(false)}
                    />
                </View> :
                    
                } */}

                <Touchables
                    pressin={pressin}
                    pressout={pressout}
                    next={next}
                    previous={previous}
                />
                <View style={styles.inputcont}>
                    <TextInput
                        style={styles.input}
                        placeholder={"Type a message"}
                        placeholderTextColor={Colors.shade}
                        selectionColor={Colors.base}
                    />
                    <IconButtons
                        name={Images.submit}
                        size={25}
                        style={styles.sendbtn}
                    />
                </View>
            </KeyboardAvoidingView>
        </MediaContainer>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            {item.attachments.map((item, index) => <ImgIndicator
                imgLen={imglength}
                progress={index == itemIndex ? 1 : 0}
            />)}
        </View>
    </View>
}


const styles = {
    container: {
        width: offset,
        height: "100%"
    },
    subcont: {
        flex: 1,
        // justifyContent: 'space-between',
        position: "relative"
    },
    btncont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    inputcont: [
        {
            height: 50,
            justifyContent: 'center',
            backgroundColor: Colors.lightshade,
            margin: 10,
            position: 'relative'
        },
        CommonStyles.rounded
    ],
    input: {
        flex: 1,
        paddingHorizontal: containerPadding,
        width: "95%"
    },
    sendbtn: {
        position: 'absolute',
        right: 0
    }
}


export {
    ParallaxItem
}