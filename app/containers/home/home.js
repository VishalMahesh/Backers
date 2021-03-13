import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, Animated, RefreshControl } from 'react-native'
import { BottomTab } from '../../components/common/bottomtabs'
import FeedComponent from '../../components/feed/zoomableFeed/Photo'
import Stories from '../../components/home'
import { Colors, CommonStyles, wide } from '../../constants'
import { CurrentpostOptions, OptionList } from '../../constants/dummy'
import { Header } from '../../utils/Headers/CustomHeader'
import { Suggestions } from '../../constants/dummy'
import Modal from 'react-native-modal'
import { Comments } from '../../components/feed/comments'
import { FeedOption } from '../../components/feed/options'
import { Appreciation, ModalBox } from '../../components/feed/appreciation'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import Story from '../stories'
import SelectedPhoto from '../../components/feed/zoomableFeed/SelectedPhoto';
import type { Measurement } from '../../components/feed/zoomableFeed/Measurement-type';
import PropTypes from 'prop-types';
import PhotoComponent from '../../components/feed/zoomableFeed/Photo'
import Presenters from '../presenters'
import { connect } from 'react-redux'
import AppLoader from '../../utils/Apploader'
import { setActiveTab } from '../../actions/reel'
import onShare from '../../utils/share'
import { deletePosts, fetchFeeds, likePosts } from '../../actions/feed'
import { Label } from '../../components/common/label'
import { showConfirmationAlert, showErrorAlert } from '../../utils/info'
import NoData from '../../components/common/noData'
import { fetchStories } from '../../actions/story'
type SelectedPhotoType = { photoURI: string; measurement: Measurement };

type State = {
    selectedPhoto?: SelectedPhotoType;
    isDragging: boolean;
};

let FeedKey = 1;

class Home extends Component {
    static navigationOptions = {
        header: null
    }

    state: State;
    _scrollValue: Animated.Value;
    _scaleValue: Animated.Value;
    _gesturePosition: Animated.ValueXY;

    constructor() {
        super(...arguments);

        this._scrollValue = new Animated.Value(0);
        this._scaleValue = new Animated.Value(1);
        this._gesturePosition = new Animated.ValueXY();
        this.state = {
            isDragging: false,
            comment: false,
            option: false,
            pay: false,
            verifyEmail: false,
            story: false,
            activepost: null,
            activeuser: null,
            activeIndex: null,
            viewPortPostIndex: null,
            loading: true,
            subscription: false
        };
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
    }

    static childContextTypes = {
        gesturePosition: PropTypes.object,
        getScrollPosition: PropTypes.func,
        scaleValue: PropTypes.object,
    };

    getChildContext() {
        return {
            gesturePosition: this._gesturePosition,
            scaleValue: this._scaleValue,
            getScrollPosition: () => {
                return this._scrollValue.__getValue() - wide * 0.467
            },
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (props) => {
            this.props.dispatch(setActiveTab(1))
        });
        this.webCall()
    }

    webCall = () => {
        this.props.dispatch(fetchFeeds(res => {
            this.props.dispatch(fetchStories(e => {
                this.setState({ loading: false })
            }))
            FeedKey = FeedKey + 1;
        }))
    }

    actionComment = (res, id) => {
        this.setState({ comment: res, activepost: id })
    }

    handleActions = (type) => {
        if (type == "Chat") {
            Navigation.navigate("Chats")
        }
        else if (type == "Search") {
            Navigation.navigate("SearchUser")
        }
        else {
            Navigation.navigate("InfluencerScheduler")
        }
    }

    likeAction = ({ _id }, isLiked, index) => {
        this.props.dispatch(likePosts(_id, index, isLiked))
    }

    getOptions = () => {
        const { activeuser } = this.state;
        const { LoginData } = this.props.user
        if (activeuser && activeuser._id == LoginData._id) {
            return CurrentpostOptions
        }
        else {
            return OptionList
        }
    }

    handlePostActions = (ind) => {
        switch (ind) {
            case "MESSAGE":
                break;
            case "FOLLOWUNFOLLOW":
                break;
            case "COPYLINK":
                break;
            case "FLAG":
                break;
            case "HIDE":
                break;
            case "DELETE":
                this.deletePost();
                break;
            default:
                break;
        }
    }

    deletePost = () => {
        const { activepost, activeIndex } = this.state;
        showConfirmationAlert("Are you sure to delete this post?", () => {
            this.props.dispatch(deletePosts(activepost, activeIndex, res => {
                if (res) {
                    showErrorAlert("Post deleted successfully", "Success")
                }
            }))
        })
    }

    _onRefresh = () => {
        FeedKey = FeedKey + 1;
        this.webCall()
    }



    handleViewableItemsChanged(info) {
        if (info.viewableItems[0]) {
            this.setState({ viewPortPostIndex: info.viewableItems[0].index })
        }
    }


    render() {
        const { comment, option, pay, verifyEmail, story, isDragging, selectedPhoto, activepost, viewPortPostIndex, loading, subscription } = this.state;
        const { feeds, homeFeeds } = this.props.feed
        const { stories } = this.props.story
        const { isFetching, isRefreshing } = this.props.feedReducer
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
                <View style={{ flex: 1 }}>
                    <Header
                        actions={this.handleActions}
                    />
                    <FlatList
                        data={homeFeeds}
                        key={FeedKey}
                        ListHeaderComponent={() => <Stories
                            data={stories}
                            action={() => this.setState({ story: true })}
                        />}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this._onRefresh}
                                tintColor={Colors.base}
                            />
                        }
                        renderItem={({ item, index }) => <FeedComponent
                            data={item}
                            index={index}
                            shouldPlay={viewPortPostIndex !== index}
                            suggest={Suggestions}
                            payout={() => this.setState({ pay: true })}
                            share={onShare}
                            onProfile={() => Navigation.navigate("Profile")}
                            key={item.id}
                            onDetails={() => Navigation.navigate("Details", { post: item })}
                            isDragging={isDragging}
                            comment={() => this.actionComment(true, item._id)}
                            onLike={(type) => this.likeAction(item, type, index)}
                            more={() => this.setState({ option: true, activeuser: item.users, activepost: item._id, activeIndex: index })}
                            onGestureStart={(selectedPhoto: SelectedPhotoType) => {
                                this.setState({
                                    selectedPhoto,
                                    isDragging: true,
                                });
                            }}
                            onGestureRelease={() => this.setState({ isDragging: false })}
                        />}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<NoData />}
                        onViewableItemsChanged={this.handleViewableItemsChanged}
                        viewabilityConfig={this.viewabilityConfig}
                        ListFooterComponent={<View style={{ height: wide * 0.2 }} />}
                    />
                    {isDragging ? (
                        <SelectedPhoto
                            key={selectedPhoto ? selectedPhoto.photoURI : ''}
                            selectedPhoto={selectedPhoto}
                        />
                    ) : null}
                </View>
                <Presenters
                    comment={comment}
                    closeComment={() => this.setState({ comment: false })}
                    option={option}
                    closeOption={() => this.setState({ option: false })}
                    pay={pay}
                    closePay={() => this.setState({ pay: false })}
                    verifyEmail={verifyEmail}
                    closeVerify={() => this.setState({ verifyEmail: false })}
                    story={story}
                    action={() => { }}
                    closeStory={() => this.setState({ story: false })}
                    home
                    activePost={activepost}
                    optiondata={this.getOptions()}
                    action={this.handlePostActions}
                    subscription={subscription}
                    closeSubscription={() => this.setState({ subscription: false })}
                />
                <AppLoader
                    visible={loading}
                />
            </SafeAreaView>
        )
    }
}


function mapStateToProps(state) {
    const { entities, feedReducer, storyReducer } = state
    return {
        data: entities.reel,
        feed: entities.feed,
        story: entities.story,
        user: entities.user,
        feedReducer,
        storyReducer
    }
}


export default connect(mapStateToProps)(Home);
