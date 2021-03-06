import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Image, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import Modal from 'react-native-modal'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import { StoryOptionList } from '../../constants/dummy';
import { IconButtons } from '../../components/common/iconUtility';
import { CarouselContainer } from '../../components/story';
import { UserLists } from '../../components/story/userLists';
import { FeedOption } from '../../components/feed/options'
import { connect } from 'react-redux'

const StoryView = ({ onClose, ...props }) => {
    const [active, onChange] = useState(0)
    const [storydata, onStoryChange] = useState([])
    const userRef = useRef(null)
    var datalen = storydata.length
    const [info, onInfo] = useState(false)
    const [show, onShow] = useState(false)
    useEffect(() => {
        const { stories } = props.story
        let arr = [...stories]
        // if (arr[0].img.length == 0) {
        //     arr.shift()
        //     onStoryChange([...arr])
        // }
        // else {
        onStoryChange([...arr])
        // }
        setTimeout(() => {
            onShow(true)
        }, 400);
    }, [])
    if (show) {
        return <SafeAreaView style={styles.container}>
            <CarouselContainer
                Close={onClose}
                data={storydata}
                user={active}
                options={info}
                onPrev={() => {
                    if (active == 0) {

                    }
                    else {
                        onChange(active - 1);
                        userRef.current.handleUser(active - 1)
                    }
                }}
                onNext={() => {
                    if (datalen !== active + 1) {
                        onChange(active + 1);
                        userRef.current.handleUser(active + 1)
                    }
                    else {
                        onClose()
                    }
                }}
                onChange={(active) => {
                    onChange(active);
                    userRef.current.handleUser(active)
                }}
                onMore={() => onInfo(true)}
            />
            <UserLists
                data={storydata}
                user={active}
                ref={userRef}
                setData={(e) => onChange(e)}
            />
            <Modal
                isVisible={info}
                swipeDirection={"down"}
                style={{ padding: 0, margin: 0 }}
                animationOut={"slideOutDown"}
                animationIn={"slideInUp"}
                useNativeDriver={true}
                onBackButtonPress={() => onInfo(false)}
                onSwipeComplete={() => onInfo(false)}
            >
                <FeedOption
                    onCancel={() => onInfo(false)}
                    data={StoryOptionList}
                    action={() => onInfo(false)}
                />
            </Modal>
        </SafeAreaView>
    }
    else {
        return <View style={{ flex: 1, backgroundColor: Colors.black }} />
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
}

function mapStateToProps(state) {
    const { entities, feedReducer } = state
    return {
        story: entities.story,
        feedReducer
    }
}


export default connect(mapStateToProps)(StoryView);