import React, { Component } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import requestExternalStoreageRead from '../utils/requestExternalStorage';
import { Platform } from 'react-native';

const RequireStorage = (WrappedComponent) => {
  return class WithStorageAcess extends Component {
    state = { photos: null, videos: null };
    async componentDidMount() {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (Platform.OS !== 'ios' ? await requestExternalStoreageRead() : true) {
        this.getPhotosAsync({ first: 100, assetType: 'All' });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.photos !== nextState.photos) {
        return true;
      } else if (this.state.videos !== nextState.videos) {
        return true;
      }
      return false;
    }

    async getPhotosAsync(params) {
      let filecheck = Platform.OS == 'ios' ? "video" : "video/mp4"
      return new Promise((res, rej) =>
        CameraRoll.getPhotos(params)
          .then((data) => {
            const assets = data.edges;
            const arr = assets.map((asset) => asset.node);
            let videos = [];
            let photos = [];
            arr.forEach((item, index) => {
              let obj = {
                uri: item.image.uri,
                type: item.type
              }
              photos.push({ ...obj, id: index + 1 });
              if (item.type == filecheck) {
                videos.push({ ...obj, id: index + 1 });
              }
            });
            this.setState({ videos, photos });
            res({ videos, photos });
          })
          .catch(rej)
      );
    }
    render() {
      return (
        <WrappedComponent
          photos={this.state.photos}
          videos={this.state.videos}
          {...this.props}
        />
      );
    }
  };
};

export default RequireStorage;
