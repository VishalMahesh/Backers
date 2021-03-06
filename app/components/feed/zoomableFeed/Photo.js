// @flow
/* global requestAnimationFrame */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'class-autobind';
import ReactNative, { View, Animated, PanResponder, Easing, Image, FlatList, Platform } from 'react-native';

import getDistance from './helpers/getDistance';
import getScale from './helpers/getScale';
import measureNode from './helpers/measureNode';
import AppUtils from '../../../utils'
import type { Measurement } from './Measurement-type';
import type { Touch } from './Touch-type';
import { Fonts } from '../../../constants/fonts';
import { Colors, CommonStyles, containerPadding, wide } from '../../../constants';
import { UserProfile, Description, UnlockInfo, PostActions, Suggestion } from "../"
import { Label } from '../../common/label';
import Navigation from '../../../lib/Navigation';
import { BlurRadius } from '../../../constants/constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PaginationDot from 'react-native-animated-pagination-dot'
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image'
const getVideoSource = (source) => {
  var videoUri = '';
  if (Platform.OS == 'ios') {
    const appleId = source.substring(5, 41);
    const ext = 'MOV';
    videoUri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
  } else {
    videoUri = source;
  }
  return videoUri
}

const RESTORE_ANIMATION_DURATION = 200;

type Event = {
  nativeEvent: {
    touches: Array<Touch>;
  };
};

type GestureState = {
  stateID: string;
  dx: number;
  dy: number;
};

type Photo = {
  name: string;
  avatar: {
    uri: string;
  };
  photo: { uri: string };
};

type Props = {
  data: Photo;
  isDragging: boolean;
  onGestureStart: ({ photoURI: string, measurement: Measurement }) => void;
  onGestureRelease: () => void;
};

type Context = {
  gesturePosition: Animated.ValueXY;
  scaleValue: Animated.Value;
  getScrollPosition: () => number;
};

export default class PhotoComponent extends Component {
  props: Props;
  context: Context;
  _parent: ?Object;
  _photoComponent: ?Object;
  _gestureHandler: Object;
  _initialTouches: Array<Object>;
  _selectedPhotoMeasurement: Measurement;
  _gestureInProgress: ?string;

  _opacity: Animated.Value;

  static contextTypes = {
    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object,
    getScrollPosition: PropTypes.func,
  };

  constructor() {
    super(...arguments);
    autobind(this);

    this._generatePanHandlers();
    this._initialTouches = [];
    this._opacity = new Animated.Value(1);
    this.state = {
      locked: true,
      blur: BlurRadius,
      activePage: 0
    }
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }
  }


  handleViewableItemsChanged(info) {
    this.setState({ activePage: info.viewableItems[0].index })
  }

  render() {
    let { data, index, suggest, payout, comment, share, more, onDetails, shouldPlay } = this.props;
    const { locked, blur, activePage } = this.state;
    return (
      <View ref={(parentNode) => (this._parent = parentNode)}>
        <>
          <View style={[CommonStyles.feed, CommonStyles.shadow]}>
            <UserProfile
              onMore={more}
              data={data}
            />
            {AppUtils.exists(data.caption) && <Description
              action={onDetails}
              value={data.caption}
            />}

            <View style={{ flex: 1, position: 'relative' }}>
              <FlatList
                data={data.attachments}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onViewableItemsChanged={this.handleViewableItemsChanged}
                viewabilityConfig={this.viewabilityConfig}
                renderItem={({ item, index }) => <>
                  {(data.premiumPost) ? <>
                    <Image
                      source={{ uri: item.src }}
                      style={[{ height: wide, width: wide * 0.92 }, CommonStyles.rounded]}
                      resizeMode={"cover"}
                      blurRadius={data.premiumPost ? blur : 0}
                    />
                    <UnlockInfo
                      action={() => this.setState({ locked: false, blur: 0 })}
                    />
                  </>
                    :
                    <>
                      {item.type == "image" ? <Animated.View
                        ref={(node) => (this._photoComponent = node)}
                        {...this._gestureHandler.panHandlers}
                        style={{ opacity: this._opacity }}
                      >
                        <FastImage
                          source={{ uri: item.src }}
                          style={[{ height: wide, width: wide * 0.92 }, CommonStyles.rounded]}
                          resizeMode={FastImage.resizeMode.cover}
                          blurRadius={data.locked ? blur : 0}
                        />
                      </Animated.View>
                        :
                        <Video
                          style={{ height: wide, width: wide * 0.92 }}
                          resizeMode={"contain"}
                          repeat
                          paused
                          volume={0}
                          source={{ uri: item.src }}
                        />
                      }
                    </>}
                </>}
              />

              <View key={index} style={[{ height: 40, marginLeft: 10, position: 'absolute', bottom: 0, left: 0, zIndex: 99 }, CommonStyles.center]}>
                <PaginationDot
                  activeDotColor={Colors.light}
                  curPage={activePage}
                  key={index}
                  maxPage={data.attachments.length}
                  sizeRatio={1}
                />
              </View>

            </View>
            <PostActions
              payout={payout}
              share={share}
              comment={comment}
              index={index}
              likeCount={data.likeCount}
              isLike={data.alreadyLiked}
              commentCount={data.commentCount}
              {...this.props}
            />
          </View>
          {(index == 1) && <>
            <View style={styles.medcont}>
              <View style={[CommonStyles.row, { justifyContent: "space-between" }]}>
                <Label
                  label={"Suggested for you"}
                  size={16}
                  color={Colors.dark}
                  style={{ margin: containerPadding }}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={() => Navigation.navigate("Suggestion")} hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                  <Label
                    label={"See All"}
                    size={16}
                    color={Colors.base}
                    style={{ margin: containerPadding }}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={suggest}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ paddingLeft: containerPadding }}
                renderItem={({ item, index }) => <Suggestion onProfile={() => { }} item={item} />}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              />
            </View>
          </>}
        </>
      </View>
    );
  }

  _generatePanHandlers() {
    this._gestureHandler = PanResponder.create({
      onStartShouldSetResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: (event: Event) => {
        return event.nativeEvent.touches.length === 2;
      },
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (event: Event) => {
        return event.nativeEvent.touches.length === 2;
      },
      onPanResponderGrant: this._startGesture,
      onPanResponderMove: this._onGestureMove,
      onPanResponderRelease: this._onGestureRelease,
      onPanResponderTerminationRequest: () => {
        return this._gestureInProgress == null;
      },
      onPanResponderTerminate: (event, gestureState) => {
        return this._onGestureRelease(event, gestureState);
      },
    });
  }

  async _startGesture(event: Event, gestureState: GestureState) {
    // Sometimes gesture start happens two or more times rapidly.
    if (this._gestureInProgress) {
      return;
    }

    this._gestureInProgress = gestureState.stateID;
    let { data, onGestureStart } = this.props;
    let { gesturePosition, getScrollPosition } = this.context;
    let { touches } = event.nativeEvent;

    this._initialTouches = touches;

    let selectedPhotoMeasurement = await this._measureSelectedPhoto();
    this._selectedPhotoMeasurement = selectedPhotoMeasurement;
    onGestureStart({
      photoURI: data.attachments[this.state.activePage].src,
      measurement: selectedPhotoMeasurement,
    });

    gesturePosition.setValue({
      x: 0,
      y: 0,
    });

    gesturePosition.setOffset({
      x: 0,
      y: selectedPhotoMeasurement.y - getScrollPosition(),
    });

    Animated.timing(this._opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  _onGestureMove(event: Event, gestureState: GestureState) {
    let { touches } = event.nativeEvent;
    if (!this._gestureInProgress) {
      return;
    }
    if (touches.length < 2) {
      // Trigger a realease
      this._onGestureRelease(event, gestureState);
      return;
    }

    // for moving photo around
    let { gesturePosition, scaleValue } = this.context;
    let { dx, dy } = gestureState;
    gesturePosition.x.setValue(dx);
    gesturePosition.y.setValue(dy);

    // for scaling photo
    let currentDistance = getDistance(touches);
    let initialDistance = getDistance(this._initialTouches);
    let newScale = getScale(currentDistance, initialDistance);
    scaleValue.setValue(newScale);
  }

  _onGestureRelease(event, gestureState: GestureState) {
    if (this._gestureInProgress !== gestureState.stateID) {
      return;
    }

    this._gestureInProgress = null;
    this._initialTouches = [];
    let { onGestureRelease } = this.props;
    let { gesturePosition, scaleValue, getScrollPosition } = this.context;

    // set to initial position and scale
    Animated.parallel([
      Animated.timing(gesturePosition.x, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        // useNativeDriver: true,
      }),
      Animated.timing(gesturePosition.y, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        // useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        // useNativeDriver: true,
      }),
    ]).start(() => {
      gesturePosition.setOffset({
        x: 0,
        y:
          (this._selectedPhotoMeasurement &&
            this._selectedPhotoMeasurement.y) ||
          0 - getScrollPosition(),
      });

      this._opacity.setValue(1);

      requestAnimationFrame(() => {
        onGestureRelease();
      });
    });
  }

  async _measureSelectedPhoto() {
    let parent = ReactNative.findNodeHandle(this._parent);
    let photoComponent = ReactNative.findNodeHandle(this._photoComponent);

    let [parentMeasurement, photoMeasurement] = await Promise.all([
      measureNode(parent),
      measureNode(photoComponent),
    ]);

    return {
      x: photoMeasurement.x,
      y: parentMeasurement.y + photoMeasurement.y,
      w: photoMeasurement.w,
      h: photoMeasurement.h,
    };
  }
}


const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  desc: {
    fontSize: 12
  },
  desc2: {
    lineHeight: 20,
    marginBottom: 6,
    fontFamily: Fonts.Regular
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20
  },
  subCont: {
    minHeight: wide * 0.42,
    borderWidth: 2,
    borderColor: Colors.light,
    padding: containerPadding,
    justifyContent: 'space-between'
  },
  medcont: {
    marginTop: 10,
    backgroundColor: Colors.light
  },
  btn: {
    width: wide * 0.78,
    height: wide * 0.12,
    marginVertical: 0
  }
}
