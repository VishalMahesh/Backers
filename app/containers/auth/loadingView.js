import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Navigation from '../../lib/Navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonStyles, Colors } from '../../constants';
import { setUserdata, } from '../../actions/auth';
// import { setDeviceToken } from '../../actions/home';
import { connect } from 'react-redux';
import { getUserAuth } from '../../middleware';
class LoadingView extends Component {
    async componentDidMount() {
        const user = await getUserAuth()
        if (user) {
            console.log(user);
            this.props.setUser(user);
            Navigation.navigate('App');
        } else {
            Navigation.navigate('Auth');
        }
    }

    // setTokens = () => {
    //     AsyncStorage.getItem('AppToken').then((res) => {
    //         if (res) {
    //             this.props.setToken(res)
    //         }
    //     });
    // }
    render() {
        return (
            <View style={[CommonStyles.overlay, CommonStyles.center]}>
                <ActivityIndicator size={22} color={Colors.base} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (res) => {
            dispatch(setUserdata(res));
        },
        // setToken: (res) => {
        //     dispatch(setDeviceToken(res))
        // }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
