import React, { useState } from 'react'
import { View, FlatList, StatusBar, Platform } from 'react-native'
import { Layout, Colors, CommonStyles, wide, containerPadding } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video'
import { IconButtons } from '../../components/common/iconUtility';
import Images from '../../constants/Images';
import { PostActions, UnlockInfo, } from "../../components/feed"
import Navigation from '../../lib/Navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Avatar } from '../../components/feed/comments'
import { Label } from '../../components/common/label';
import Presenters from '../presenters';
import { DEVICE_HEIGHT } from '../../constants/dimensions'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux'
import { setActiveTab, getReels, unLockPost } from '../../actions/reel';
import onShare from '../../utils/share';
import NoData from '../../components/common/noData';
import AppLoader from '../../utils/Apploader';
import { likePosts } from '../../actions/feed';
const STATUSBAR_HEIGHT = getStatusBarHeight();
const gradientArr = ['rgba(0,0,0,0.7)', "rgba(0,0,0,0.5)", 'transparent']
const gradientArr2 = ['transparent', "rgba(0,0,0,0.5)", 'rgba(0,0,0,0.7)']


const Caption = ({ data, caption }) => <>
    <Avatar
        source={Images.img1}
        size={60}
    />
    <View style={{ paddingHorizontal: containerPadding }}>
        <Label
            label={`${data.userName} • Follow`}
            color={Colors.light}
            bold
            size={16}
        />
        <Label
            label={caption}
            color={Colors.light}
        />
    </View>
</>

const VideoItem = ({ source, paused, onEnd, back, onpay, oncomment, onoption, user, caption, item, unLockPost, index, ...props }) => {
    let offset = useSafeAreaInsets()
    let contStyle = Platform.select({
        ios: { height: DEVICE_HEIGHT - STATUSBAR_HEIGHT, width: Layout.width, backgroundColor: Colors.black },
        android: { height: DEVICE_HEIGHT, width: Layout.width, backgroundColor: Colors.black, }
    })
    const [premium, onUnlock] = useState(item.premiumPost)
    let grStyle = Platform.select({
        ios: [{ height: offset.top + 40, justifyContent: 'space-between', width: wide, position: 'absolute', top: 0, zIndex: 99, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: containerPadding / 2 }],
        android: [{ height: offset.top + 60, justifyContent: 'space-between', width: wide, position: 'absolute', top: 0, zIndex: 99, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: containerPadding / 2 }]
    })
    return <View style={contStyle}>
        <LinearGradient colors={gradientArr} style={grStyle}>
            <IconButtons
                name={Images.back}
                color={Colors.light}
                size={26}
                action={back}
            />
            <IconButtons
                name={Images.more}
                color={Colors.light}
                size={26}
                action={onoption}
            />
        </LinearGradient>
        <Video
            source={{ uri: source }}
            resizeMode={'contain'}
            repeat={true}
            volume={5}
            //onEnd={onEnd}
            paused={!paused}
            style={[{ height: DEVICE_HEIGHT - (offset.bottom + wide * 0.2), width: Layout.width }, CommonStyles.absolute]}
        />
        {premium && <View style={[{ backgroundColor: "rgba(0,0,0,0.9)" }, CommonStyles.absolute, CommonStyles.center]}>
            <View style={{
                height: '50%', width: "90%", position: 'relative'
            }}>
                <UnlockInfo
                    count={1}
                    action={() => { onUnlock(!premium), unLockPost() }}
                />
            </View>
        </View>}
        {!premium && <PostActions
            reel
            payout={onpay}
            share={onShare}
            comment={oncomment}
            index={index}
            likeCount={item.likeCount}
            isLike={item.alreadyLiked}
            commentCount={item.commentCount}
            {...props}
        />}
        <LinearGradient colors={gradientArr2} style={[{ height: offset.top + 60, width: wide, position: 'absolute', bottom: offset.bottom + wide * 0.2, zIndex: 99, paddingHorizontal: containerPadding / 2 }, CommonStyles.row]}>
            <Caption
                data={user}
                caption={caption}
            />
        </LinearGradient>
    </View>
}

class ReelVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeVideo: null,
            comment: false,
            pay: false,
            option: false,
            activepost: null
        }

        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
        this.focusListenerRemover = null;
        this.blurListenerRemover = null;
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (props) => {

        });
        this.focusListenerRemover = this.props.navigation.addListener(
            "willFocus",
            this.onNavigateIn
        );
        this.blurListenerRemover = this.props.navigation.addListener(
            "willBlur",
            this.onNavigateOut
        );
    }

    componentWillUnmount() {
        if (this.focusListenerRemover !== null) {
            this.focusListenerRemover.remove();
            this.focusListenerRemover = null;
        }
        if (this.blurListenerRemover !== null) {
            this.blurListenerRemover.remove();
            this.blurListenerRemover = null;
        }
    }

    webCall = () => {
        this.props.dispatch(getReels())
    }

    onNavigateOut = () => {
        this.setState({ activeVideo: null })
    };

    onNavigateIn = (props) => {
        this.props.dispatch(setActiveTab(2))
        this.setState({ activeVideo: 0 })
        const { reelVideos } = this.props.data
        if (this.flatlist && reelVideos.length > 0) {
            this.flatlist.scrollToIndex({ animated: false, index: 0 })
        }
        this.webCall();
    };


    handleViewableItemsChanged(info) {
        this.setState({ activeVideo: info.viewableItems[0].index })
    }

    handleEnd = () => {
        const { activeVideo } = this.state;
        const { reelVideos } = this.props.data
        if (activeVideo < data.length - 1 && activeVideo && reelVideos.length > 0) {
            this.flatlist.scrollToIndex({ animated: true, index: activeVideo + 1 })
        }
        else {
            Navigation.back(), this.setState({ activeVideo: null })
        }
    }

    unLock = (item) => {
        this.props.dispatch(unLockPost(item))
        this.setState({})
    }

    actionComment = (res, id) => {
        this.setState({ comment: res, activepost: id })
    }
    likeAction = ({ _id }, isLiked, index) => {
        this.props.dispatch(likePosts(_id, index, isLiked, true))
    }


    render() {
        const { activeVideo, comment, pay, option, activepost } = this.state;
        const { reelVideos } = this.props.data
        const { isFetching } = this.props.reelReducer
        console.log(reelVideos);
        return (
            <View style={{ flex: 1, position: 'relative', backgroundColor: Colors.dark }}>
                <FlatList
                    data={reelVideos}
                    pagingEnabled={true}
                    ref={e => this.flatlist = e}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <VideoItem
                        paused={index == activeVideo && !item.premiumPost}
                        source={item.attachments[0].src}
                        onpay={() => this.setState({ pay: true })}
                        oncomment={() => this.setState({ comment: true })}
                        onEnd={this.handleEnd}
                        user={item.users}
                        index={index}
                        item={item}
                        comment={() => this.actionComment(true, item._id)}
                        onLike={(type) => this.likeAction(item, type, index)}
                        key={item.premiumPost}
                        caption={item.caption}
                        unLockPost={() => this.unLock(item)}
                        onoption={() => this.setState({ option: true })}
                        back={() => { Navigation.back(), this.setState({ activeVideo: null }) }}
                    />}
                    initialNumToRender={5}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    ListEmptyComponent={<NoData color={Colors.light} />}
                />
                <Presenters
                    comment={comment}
                    closeComment={() => this.setState({ comment: false })}
                    pay={pay}
                    closePay={() => this.setState({ pay: false })}
                    option={option}
                    action={() => { }}
                    closeOption={() => this.setState({ option: false })}
                    height={"70%"}
                    home
                    activePost={activepost}
                />
                <AppLoader visible={isFetching} />
            </View>
        )
    }
}



function mapStateToProps(state) {
    const { entities, reelReducer } = state
    return {
        data: entities.reel,
        reelReducer
    }
}


export default connect(mapStateToProps)(ReelVideo);
