import React, { Component, useState } from 'react'
import { Text, SafeAreaView, View, TouchableOpacity, FlatList, Image, Platform } from 'react-native'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants';
import RequireStorage from '../../lib/requireStorage'
import { ModalHeader } from '../../utils/Headers/CustomHeader';
import FastImage from 'react-native-fast-image'
import { AppIcon, IconButtons } from '../../components/common/iconUtility';
import Images from '../../constants/Images';
import { Label } from '../../components/common/label';
let filecheck = Platform.OS == 'ios' ? "video" : "video/mp4"
const ImageSelector = ({ item, handleAction }) => {
    const [selected, onSelect] = useState(false)
    return <TouchableOpacity
        activeOpacity={1}
        onPress={() => { onSelect(!selected), handleAction(!selected) }}
        style={styles.item}>
        <Image
            source={{ uri: item.uri }}
            style={[{ borderRadius: 10, height: wide * 0.26, width: wide * 0.25 }]}
            resizeMode={'cover'}
        />
        {selected && <IconButtons
            style={{ position: 'absolute', top: 5, left: 5 }}
            name={Images.checkon}
            action={() => { onSelect(!selected), handleAction(!selected) }}
        />}
        {item.type == filecheck && <AppIcon
            name={Images.playfill}
            size={30}
            color={Colors.base}
            style={{ position: 'absolute', top: containerPadding * 2.9, left: containerPadding * 2.6 }}
        />}
    </TouchableOpacity>
}

const SubmitButton = ({ length, action }) => <TouchableOpacity onPress={action} activeOpacity={0.5} style={[{ height: 50, position: 'absolute', bottom: containerPadding, width: "80%", backgroundColor: Colors.base, alignSelf: 'center' }, CommonStyles.rounded, CommonStyles.center]}>
    <Label
        label={`Add (${length}) items`}
        color={Colors.light}
        bold
        size={16}
    />
</TouchableOpacity>

class Gallery extends Component {

    state = {
        selected: [],
        data: [[{ id: 0 }]],
    }

    handleImages = (item, index, select) => {
        const { selected } = this.state;
        const { noMulti } = this.props
        let arr = [...selected]
        if (select) {
            arr.push(item)
        }
        else {
            var objInd = arr.findIndex((e) => e.id == item.id);
            arr.splice(objInd, 1);
        }
        this.setState({ selected: [...arr] })
        if (this.props.onlyVideo) {
            this.props.onComplete(arr)
        }
        if (noMulti) {
            this.props.onComplete(arr[0])
        }
    }

    handleCapture = () => {
        this.setState({ picker: false })
    }

    renderImages = ({ item, index }) => {
        return index == 0 ? (
            <TouchableOpacity
                onPress={this.props.cameraMode}
                style={[styles.item, CommonStyles.center]}>
                <AppIcon
                    name={Images.vectorCamera}
                    size={40}
                />
            </TouchableOpacity>
        ) : (
            <ImageSelector
                item={item}
                handleAction={(type) => this.handleImages(item, index, type)}
                selected={item.selected}
            />
        );
    };

    render() {
        const { photos, videos, onCancel, onlyVideo, onlyPhoto, pics, noMulti } = this.props;
        const { selected, data } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={onCancel} />
                <View style={[styles.subcont, CommonStyles.topRounded, { height: '95%', position: 'relative' }]}>
                    <ModalHeader
                        label={"Pick any"}
                        onClose={onCancel}
                    />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={onlyVideo ? data.concat(videos) : (onlyPhoto) ? data.concat(pics) : data.concat(photos)}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={{ paddingHorizontal: containerPadding }}
                        keyboardShouldPersistTaps={'always'}
                        renderItem={this.renderImages}
                    />
                    {selected.length !== 0 && !onlyVideo && <SubmitButton
                        length={selected.length}
                        action={() => this.props.onComplete(selected)}
                    />}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    subcont: {
        width: '100%',
        backgroundColor: Colors.light
    },
    item: [
        {
            height: wide * 0.3,
            width: wide * 0.274,
            borderRadius: 10,
            position: 'relative'
        }, CommonStyles.center]
}

export default RequireStorage(Gallery)