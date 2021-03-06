import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AppLoader from '../../utils/Apploader';
import Login from './login';

var SigninInfo = "Create a Backers account";
var SignupInfo = "Sign in to your existing account"

export default class Auth extends Component {
    state = {
        signin: true,
        loading: false
    }
    render() {
        const { signin, loading } = this.state;
        return (
            <>
                <Login
                    primaryInfo={signin ? SigninInfo : SignupInfo}
                    onChange={() => {
                        this.setState({ loading: true })
                        setTimeout(() => {
                            this.setState({ signin: !signin, loading: false })
                        }, 100);
                    }}
                    signin={signin}
                />
                <AppLoader visible={loading} />
            </>
        )
    }
}
