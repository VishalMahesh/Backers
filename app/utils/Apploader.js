import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  Easing,
} from 'react-native';
import { Colors } from '../constants';

export const Loader = () => <View style={styles.container}>
  <ActivityIndicator animating size={20} color={Colors.base} />
</View>

class AppLoader extends React.Component {
  render() {
    const { onRequestClose, type } = this.props;
    return (
      <Modal
        animated
        animationType={'fade'}
        transparent
        onRequestClose={onRequestClose}
        {...this.props}>
        <Loader />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill
  },
});


AppLoader.defaultProps = {
  onRequestClose: () => { },
};

export default AppLoader;
