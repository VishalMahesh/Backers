import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Animated } from 'react-native'
import { CommonStyles, wide } from '../../constants'
import { Suggestions } from '../../constants/dummy'
import Navigation from '../../lib/Navigation'
import FeedComponent from '../../components/feed/zoomableFeed/Photo'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import Presenters from '../presenters'
import SelectedPhoto from '../../components/feed/zoomableFeed/SelectedPhoto';
import type { Measurement } from '../../components/feed/zoomableFeed/Measurement-type';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import onShare from '../../utils/share'
import { likePosts } from '../../actions/feed'
type SelectedPhotoType = { photoURI: string; measurement: Measurement };

type State = {
    selectedPhoto?: SelectedPhotoType;
    isDragging: boolean;
};
class Details extends React.Component {

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
        };
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
                return this._scrollValue.__getValue() - wide * 0.57
            },
        };
    }

    likeAction = ({ _id }, isLiked, index) => {
        this.props.dispatch(likePosts(_id, index, isLiked))
    }

    render() {
        const { comment, pay, option, isDragging, selectedPhoto } = this.state
        let onScroll = Animated.event([
            { nativeEvent: { contentOffset: { y: this._scrollValue } } },
        ]);
        const { post } = this.props.navigation.state.params
        return (
            <SafeAreaView style={[CommonStyles.container, CommonStyles.noPadding]}>
                <AuthHeader
                    label={"Post"}
                    primaryAction={() => Navigation.back()}
                />
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    scrollEnabled={!isDragging}
                    showsVerticalScrollIndicator={false}
                >
                    {[post].map(item => <FeedComponent
                        data={item}
                        index={0}
                        shouldPlay={0}
                        suggest={Suggestions}
                        payout={() => this.setState({ pay: true })}
                        share={onShare}
                        nozoom
                        onProfile={() => Navigation.navigate("Profile")}
                        key={item.id}
                        onDetails={() => { }}
                        isDragging={true}
                        onLike={(type) => this.likeAction(item, type, index)}
                        comment={() => this.setState({ comment: true })}
                        more={() => this.setState({ option: true })}
                        onGestureStart={(selectedPhoto: SelectedPhotoType) => {
                            this.setState({
                                selectedPhoto,
                                isDragging: true,
                            });
                        }}
                        onGestureRelease={() => this.setState({ isDragging: false })}
                    />)}
                    <View
                        style={{ height: 100 }}
                    />
                </ScrollView>
                {isDragging ? (
                    <SelectedPhoto
                        key={selectedPhoto ? selectedPhoto.photoURI : ''}
                        selectedPhoto={selectedPhoto}
                    />
                ) : null}
                <Presenters
                    comment={comment}
                    closeComment={() => this.setState({ comment: false })}
                    option={option}
                    closeOption={() => this.setState({ option: false })}
                    pay={pay}
                    activePost={post._id}
                    home
                    action={() => { }}
                    closePay={() => this.setState({ pay: false })}
                />
            </SafeAreaView>
        )
    }
}


function mapStateToProps(state) {
    const { entities, feedReducer } = state
    return {
        data: entities.reel,
        feed: entities.feed,
        feedReducer
    }
}


export default connect(mapStateToProps)(Details);
