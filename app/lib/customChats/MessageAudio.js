import React, { Component } from 'react';
import Color from './Color';
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Colors, CommonStyles, containerPadding, wide } from '../../constants';
import { IconButtons } from '../../components/common/iconUtility';
import Images from '../../constants/Images';
import { Fonts } from '../../constants/fonts';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
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

const screenWidth = width;
const ratio = calRatio / (360 / 9);

const styles = {
  container: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: wide * 0.7,
    height: wide * 0.13
  },
  titleTxt: {
    marginTop: 100 * ratio,
    color: 'white',
    fontSize: 28 * ratio,
  },
  viewRecorder: {
    marginTop: 40 * ratio,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60 * ratio,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'center'
  },
  viewBar: {
    backgroundColor: Colors.base1,
    height: 4 * ratio,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: Colors.base,
    height: 4 * ratio,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8 * ratio,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40 * ratio,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1 * ratio,
  },
  txt: {
    color: 'white',
    fontSize: 14 * ratio,
    marginHorizontal: 8 * ratio,
    marginVertical: 4 * ratio,
  },
  txtRecordCounter: {
    marginTop: 32 * ratio,
    color: 'white',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    fontSize: 10,
    textAlignVertical: 'center',
    fontWeight: '500',
    fontFamily: Fonts.Regular,
    position: 'absolute',
    bottom: -10
  },
}

export default class MessageAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: props.currentMessage.duration,
      source: props.currentMessage.audio,
      isplaying: false
    }
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  }

  onStartPlay = async () => {
    const { source } = this.state;
    const path = source
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    this.audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        this.onStopPlay('complete')
      }
      else {
        this.setState({
          isplaying: true,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
        })
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async (val) => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    this.setState({ isplaying: false, playTime: '00:00:00' })
  };

  handlePlay = () => {
    const { isplaying } = this.state;
    if (isplaying) {
      this.onStopPlay()
    }
    else {
      this.onStartPlay()
    }
  }


  render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - wide * 0.38 * ratio);
    if (!playWidth) playWidth = 0;
    const { isplaying, playTime } = this.state;
    const { position } = this.props;
    let basecolor = position == 'left' ? Colors.light : Colors.base
    let basecolor_s = position == 'left' ? Colors.dark : Colors.base
    return (<View style={[styles.container, CommonStyles.row]}>
      <IconButtons
        name={isplaying ? Images.close : Images.play}
        size={25}
        color={basecolor}
        action={this.handlePlay}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.viewBarWrapper}
          onPress={this.onStatusPress}
        >
          <View style={styles.viewBar}>
            <View style={[styles.viewBarPlay, { width: !isplaying ? 0 : playWidth, backgroundColor: basecolor_s }]} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.txtCounter, { color: basecolor }]}>
          {this.state.playTime} / {this.state.duration}
        </Text>
      </View>
    </View>)
  }
}
//# sourceMappingURL=MessageAudio.js.map