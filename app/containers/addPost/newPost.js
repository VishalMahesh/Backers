
import React, { Component, useState } from 'react'
import { Text, SafeAreaView, View, FlatList, ImageBackground, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { Seperator } from '../../components/common/seperator'
import CaptionInput from '../../components/newpost'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { BlurView } from '@react-native-community/blur'
import Gallery from './gallery';
import Modal from 'react-native-modal'
import VideoPlayer from '../../lib/videoPlayer'
import { connect } from 'react-redux'
import { addReelVideo } from '../../actions/reel'
import { showErrorAlert } from '../../utils/info'
import CameraModal from './cameraModal'
import { addFeed } from '../../actions/feed'
import { addStory } from '../../actions/story';
import PaginationDot from 'react-native-animated-pagination-dot'
import { PostModes } from '../../constants/dummy'
import AppLoader from '../../utils/Apploader'
let filecheck = Platform.OS == 'ios' ? "video" : "video/mp4"

const getMediaStatus = (index) => {
    if (index == 2) {
        return true;
    }
    else {
        return false
    }
}

const data = [
    {
        id: 0,
        title: "Turn off commenting",
        description: "Comments would be off for this post",
        value: false
    },
    {
        id: 1,
        title: "Premium post",
        description: "Only your backers would be able to see this post.",
        value: true
    },
    {
        id: 2,
        title: "Post this to Instagram",
        description: "peter.mckinnin",
        value: false
    },
    {
        id: 3,
        title: "Post this to Facebook",
        description: "Peter McKinnin",
        value: true
    },
]

const Buttons = ({ style, action, radius, ...props }) => <TouchableOpacity
    activeOpacity={0.5}
    onPress={action}
    style={[{ position: 'relative' }, CommonStyles.row, CommonStyles.rounded, style, Platform.OS == 'android' && { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
    {Platform.OS == 'ios' ? <BlurView style={[CommonStyles.absolute, { borderRadius: radius }]} blurAmount={0} />
        :
        null}
    {props.children}
</TouchableOpacity>

const MediaItem = ({ source, onDelete, onadd, isvideo, play, reel }) => <ImageBackground
    style={{ height: wide * 0.92, width: wide * 0.92, padding: containerPadding, justifyContent: 'space-between' }}
    source={{ uri: source }}
    imageStyle={CommonStyles.rounded}
>
    {isvideo && <IconButtons
        style={{ position: 'absolute', top: wide * 0.39, left: wide * 0.42 }}
        size={40}
        name={Images.playfill}
        color={Colors.base}
        action={play}
    />}
    <View style={[CommonStyles.row, { justifyContent: 'space-between' }]}>
        {!reel && <Buttons
            style={{ height: 40, borderRadius: 20, width: wide * 0.3 }}
            action={onadd}
            radius={20}>
            <IconButtons
                name={Images.plus}
                color={Colors.light}
                action={onadd}
                size={18}
                style={CommonStyles.center}
            />
            <Label
                label={"Add More"}
                color={Colors.light}
                bold
            />
        </Buttons>}

        <Buttons style={{ height: 40, width: 40, borderRadius: 20 }} radius={20}>
            <IconButtons
                name={Images.trash}
                action={onDelete}
            />
        </Buttons>
    </View>
</ImageBackground>

const PostOptions = ({ item, index }) => {
    const [selected, onSelected] = useState(item.value)
    return <View style={[CommonStyles.row, { height: wide * 0.17 }]}>
        <View style={{ flex: 1, maxWidth: wide * 0.75, marginRight: containerPadding }}>
            <Label
                label={item.title}
                color={Colors.dark}
                bold
                size={16}
            />
            <Label
                label={item.description}
                color={Colors.shade}
            />
        </View>
        <IconButtons
            size={50}
            name={selected ? Images.on : Images.off}
            action={() => onSelected(!selected)}
        />
    </View>
}

const Pager = ({ data = [], active }) => {
    return <View style={[{ height: 20, position: 'absolute', top: wide - containerPadding * 2, right: containerPadding * 2 }, CommonStyles.row]}>
        <PaginationDot
            activeDotColor={Colors.light}
            curPage={active}
            maxPage={data.length}
            sizeRatio={1}
        />
    </View>
}
function findHashtags(searchText) {
    let str = searchText.toLowerCase();
    var regexp = /\B\#\w\w+\b/g;
    var result = str.match(regexp);
    if (result) {
        let t = result.toString();
        return t.split(",").join("");
    } else {
        return "";
    }
}

class NewPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            media: props.navigation.state.params.media,
            picker: false,
            player: false,
            vidsrc: null,
            mode: props.navigation.state.params.mode,
            caption: "",
            activePost: 0
        }
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
        this.viewabilityConfig = { itemVisiblePercentThreshold: 50 }
    }

    handleDelete = (index) => {
        const { media } = this.state;
        let arr = [...media]
        arr.splice(index, 1)
        if (arr.length !== 0) {
            this.setState({ media: [...arr] })
        }
        else {
            Navigation.back()
        }
    }


    VideoPlay = (item) => {
        var videoUri = '';
        if (Platform.OS == 'ios') {
            const appleId = item.uri.substring(5, 41);
            const ext = 'MOV';
            videoUri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
        } else {
            videoUri = `file://${item.uri}`;
        }

        this.setState({ vidsrc: videoUri, player: true });
    };
    renderAttachment = ({ item, index }) => {
        const { mode } = this.state;
        return <MediaItem
            source={item.uri}
            isvideo={item.type == filecheck}
            play={() => this.VideoPlay(item)}
            onadd={() => this.setState({ picker: true })}
            onDelete={() => this.handleDelete(index)}
            reel={mode == 2}
        />
    }

    handleMedia = (data) => {
        const { media } = this.state;
        let arr = [...media]
        let newarr = arr.concat(data)
        this.setState({ media: [...newarr], picker: false })
    }

    submitPost = () => {
        const { mode, media, caption } = this.state;
        this.setState({ loading: true })
        if (mode == 2) {
            var videoUri = '';
            if (Platform.OS == 'ios') {
                const appleId = media[0].uri.substring(5, 41);
                const ext = 'MOV';
                videoUri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
            } else {
                videoUri = `${media[0].uri}`;
            }

            let feed = {
                source: media,
                params: {
                    caption: caption,
                    postType: "reels",
                    tags: findHashtags(caption),
                }
            }
            this.uploadAction(feed)
            // this.props.dispatch(addReelVideo(videoUri, res => {
            //     this.finalisePost()
            // }))
        }
        else if (mode == 1) {
            let feed = {
                source: media,
                params: {
                    caption: caption,
                    postType: "post",
                    tags: findHashtags(caption),
                }
            }
            this.uploadAction(feed)
        }
        else {
            let feed = {
                source: media,
                params: {
                    postType: "story",
                }
            }
            this.uploadAction(feed)
            // this.props.dispatch(addStory(media, res => {
            //     this.finalisePost()
            // }))
        }
    }

    uploadAction = (feed) => {
        this.props.dispatch(addFeed(feed, (res, msg) => {
            if (res) {
                this.finalisePost()
            }
        }))
    }

    finalisePost = () => {
        this.setState({ loading: false }, () => setTimeout(() => {
            showErrorAlert("Post Uploaded Successfully", "Success", () => {
                this.props.navigation.pop(2);
                Navigation.back()
            })
        }, 50))
    }

    handleCaptured = (obj) => {
        const { media } = this.state;
        this.setState({ cameracapture: false })
        let arr = [...media]
        arr.push(obj)
        this.setState({ media: [...arr] })
    }

    handleViewableItemsChanged({ viewableItems, changed }) {
        if (viewableItems[0]) {
            this.setState({ activePost: viewableItems[0].index })
        }
    }

    render() {
        const { media, picker, player, vidsrc, mode, activePost, cameracapture } = this.state;
        const { isFetching } = this.props.feedReducer
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"New Post"}
                    primaryAction={() => Navigation.back()}
                    icon={Images.postcheck}
                    secondaryAction={this.submitPost}
                    size={wide * 0.2}
                    iconstyle={{ width: wide * 0.2 }}
                />
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: containerPadding }}>
                    <View style={{ height: wide, marginTop: containerPadding }}>
                        <FlatList
                            pagingEnabled={true}
                            horizontal={true}
                            data={media}
                            key={media.length}
                            showsHorizontalScrollIndicator={false}
                            renderItem={this.renderAttachment}
                            onViewableItemsChanged={this.handleViewableItemsChanged}
                            viewabilityConfig={this.viewabilityConfig}
                        />
                    </View>
                    <Pager
                        data={media}
                        active={activePost}
                        key={media.length}
                    />
                    {mode !== 0 && <CaptionInput
                        onChangeText={caption => this.setState({ caption })}
                    />}
                    <Seperator />
                    {data.map((item, index) => <PostOptions
                        item={item}
                        index={index}
                    />)}
                </ScrollView>
                <Modal
                    onBackButtonPress={() => this.setState({ picker: false })}
                    isVisible={picker}
                >
                    <Gallery
                        onCancel={() => this.setState({ picker: false })}
                        onlyVideo={getMediaStatus(mode)}
                        onComplete={(data) => this.handleMedia(data)}
                        cameraMode={() => this.setState({ picker: false }, () => setTimeout(() => {
                            this.setState({ cameracapture: true })
                        }, 500))}
                    />
                </Modal>
                <Modal
                    style={{ padding: 0, margin: 0 }}
                    onBackButtonPress={() => this.setState({ player: false })}
                    isVisible={player}>
                    <VideoPlayer
                        source={vidsrc}
                        close={() => this.setState({ player: false })}
                    />
                </Modal>
                <Modal style={{ margin: 0, padding: 0 }} isVisible={cameracapture}>
                    <CameraModal
                        handleBack={() => this.setState({ cameracapture: false })}
                        CapturedImage={this.handleCaptured}
                        CapturedVideo={this.handleCaptured}
                    />
                </Modal>
                <AppLoader visible={isFetching} />
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    const { entities, feedReducer } = state
    return {
        data: entities.reel,
        feedReducer
    }
}


export default connect(mapStateToProps)(NewPost);
