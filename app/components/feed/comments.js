import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { dummyComments } from '../../constants/dummy'
import Images from '../../constants/Images'
import AppLoader from '../../utils/Apploader'
import { ModalHeader } from '../../utils/Headers/CustomHeader'
import { AppIcon, IconButtons } from '../common/iconUtility'
import { FormInputs } from '../common/inputs'
import { Label } from '../common/label'
import { fetchComments, createComments, likeComment, unlikeComment } from '../../actions/feed'
import NoData from '../common/noData'
import AppUtils from '../../utils'
const Avatar = ({ size, source, style }) => <View style={[CommonStyles.center, { height: size, width: size, borderRadius: size / 2, padding: 2 }]}>
    <Image
        style={[
            { height: size - 2, width: size - 2, borderRadius: (size - 2) / 2 },
            style
        ]}
        source={source}
        resizeMode={"cover"}
    />
</View>

const CommentItem = ({ item, likeAction }) => {
    const [like, onLike] = useState(item.alreadyLiked)
    const [count, onCount] = useState(item.likeCount)
    return <View style={styles.container}>
        <View style={{ flex: 0.2 }}>
            <Avatar
                size={wide * 0.12}
                source={Images.img}
            />
        </View>
        <View style={{ flex: 0.9, }}>
            <Label
                label={`${item.users.userName} • ${AppUtils.timeDiff(item.createdAt)}`}
                bold
            />
            <Label
                label={item.comment}
                color={Colors.shade}
            />
        </View>
        <TouchableOpacity onPress={() => { onLike(!like), onCount(like ? count - 1 : count + 1), likeAction(!like, item._id) }} activeOpacity={0.5} style={styles.like}>
            <Label
                label={count == 0 ? "" : `${count}  `}
                size={12}
                style={{ lineHeight: null }}
            />
            <AppIcon
                name={like ? Images.heartred : Images.heart}
                size={14}
            />
        </TouchableOpacity>
    </View>
}



const CommentInput = ({ noshadow, dark, ...props }) => {
    return <View style={[{
        height: noshadow ? 60 : 70,
        paddingHorizontal: containerPadding,
        paddingVertical: containerPadding / 1.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    !noshadow && CommonStyles.shadow,
    CommonStyles.rounded,
    noshadow && { paddingTop: 0, borderBottomWidth: 0.5, borderColor: Colors.shade },
    dark && { backgroundColor: Colors.dark }
        // CommonStyles.row
    ]}>
        {props.children}
    </View>
}
const CommentWrapper = React.forwardRef((props, ref) => {
    const [comm, onComm] = useState([])
    const [comment, onChange] = useState("")
    const height = props.height ? props.height : '90%'

    useEffect(() => {
        if (props.home) {
            setTimeout(() => {
                props.dispatch(fetchComments(props.activePost, data => {
                    onComm(data)
                }))
            }, 200);
        }
        else {
            onComm(dummyComments)
        }
    }, [])

    function handleComment(comment) {
        const { LoginData } = props.user
        if (comment.trim() !== "") {
            if (props.home) {
                props.dispatch(createComments(props.activePost, comment, data => {
                    onComm(data)
                }))
            }
            else {
                onComm(comm.concat([
                    {
                        id: comm.length + 1,
                        count: 0,
                        comment: comment,
                        img: Images.img,
                        user: LoginData.userName
                    }
                ]))
                setTimeout(() => {
                    // if (ref.current) {
                    //     ref.current.scrollToEnd({ animated: true })
                    // }
                }, 100);
            }
        }
    }

    const handleCommentLike = (like, commid) => {
        if (like) {
            props.dispatch(likeComment(commid))
        }
        else {
            props.dispatch(unlikeComment(commid))
        }
    }

    const { isFetching } = props.feedReducer
    return <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={props.onCancel} />
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={[styles.subcont, CommonStyles.topRounded, { height: height }]}>
            <ModalHeader
                label={"Comments"}
                onClose={props.onCancel}
            />
            <ScrollView
                ref={ref}
                onScroll={props.handleOnScroll}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps={'always'}
            >
                {comm.map((item) => <CommentItem
                    item={item}
                    likeAction={handleCommentLike}
                />)}
                {comm.length == 0 && <NoData />}
            </ScrollView>
            <CommentInput>
                <FormInputs
                    type="comment"
                    Data={comment}
                    onChangeText={(inp) => onChange(inp)}
                    onSubmitEditing={() => { handleComment(comment), onChange("") }}
                    placeholder={"Write a comment"}
                />
                <IconButtons
                    name={Images.submit}
                    size={30}
                    action={() => { handleComment(comment), onChange("") }}
                />
            </CommentInput>
        </KeyboardAvoidingView>
        <AppLoader visible={isFetching} />
    </SafeAreaView>
})

function mapStateToProps(state) {
    const { entities, feedReducer } = state
    return {
        feed: entities.feed,
        user: entities.user,
        feedReducer,
    }
}


const Comments = connect(mapStateToProps)(CommentWrapper);



const styles = {
    container: {
        flexDirection: "row",
        padding: containerPadding
    },
    like: {
        flex: 0.2,
        height: wide * 0.12,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    subcont: {
        width: '100%',
        backgroundColor: Colors.light
    },
}

export {
    Comments,
    CommentInput,
    CommentItem,
    Avatar
}