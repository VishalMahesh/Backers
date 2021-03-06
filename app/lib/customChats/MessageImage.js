import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Modal } from 'react-native';
// TODO: support web
// @ts-ignore

import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors, wide } from '../../constants';
import { StylePropType } from './utils';
const styles = StyleSheet.create({
    container: {},
    image: {
        width: wide * 0.6,
        height: wide * 0.4,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
});
export default class MessageImage extends Component {
    state = {
        active: false
    }
    render() {
        const { containerStyle, lightboxProps, imageProps, imageStyle, currentMessage, } = this.props;
        const { active } = this.state
        if (!!currentMessage) {
            return (<View style={[styles.container, containerStyle]}>
                <TouchableOpacity onPress={() => this.setState({ active: true })} activeOpacity={1}>
                    <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }} />
                </TouchableOpacity>
                <Modal visible={active} onRequestClose={() => this.setState({ active: false })} transparent={true}>
                    <ImageViewer
                        imageUrls={[{ url: currentMessage.image }]}
                        enableSwipeDown
                        swipeDownThreshold={30}
                        onSwipeDown={() => this.setState({ active: false })}
                        renderIndicator={() => { }}
                    />
                </Modal>
            </View>);
        }
        return null;
    }
}
MessageImage.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
};
MessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: StylePropType,
    imageStyle: StylePropType,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
};
//# sourceMappingURL=MessageImage.js.map