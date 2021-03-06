import * as ImagePicker from 'react-native-image-picker';
const Imgoptions = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
        skipBackup: true,
    },
    mediaType: 'image',
};
const Videooptions = {
    title: 'Video Picker',
    takePhotoButtonTitle: 'Take Video...',
    mediaType: 'video',
    videoQuality: 'medium',
};


class MediaHelper {
    selectMedia(video, callback) {
        ImagePicker.launchImageLibrary(
            video ? Videooptions : Imgoptions,
            (response) => {
                if (response.didCancel) {
                    callback(false);
                } else if (response.error) {
                    callback(false);
                } else {
                    let source = response.uri;
                    callback(source, video);
                }
            },
        );
    }

    captureMedia(video, callback) {
        ImagePicker.launchCamera(video ? Videooptions : Imgoptions, (response) => {
            if (response.didCancel) {
                callback(false);
            } else if (response.error) {
                callback(false);
            } else {
                let source = response.uri;
                callback(source, video);
            }
        })
    }
}

export default new MediaHelper();
