import React, { Component } from 'react'
import { View, Image, ImageBackground, FlatList, Platform, Alert } from 'react-native'
import { SubmitButtons } from '../../components/common/buttons'
import { Label, } from '../../components/common/label'
import { OrSeperator } from '../../components/common/seperator'
import { Colors, CommonStyles, Layout, wide } from '../../constants'
import { LoginButtons } from '../../constants/dummy'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { connect } from 'react-redux'
import { AccessToken, LoginManager } from "react-native-fbsdk";
import AppLoader from '../../utils/Apploader'
import { styles } from './styles'
import config from '../../config'
import { AuthButtons, EmailOptions } from '../../components/auth'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { validLogin } from '../../utils/isValid'
import { AppURLs, LoginParams, RegisterParams } from '../../constants/constant'
import { login, registerUser } from '../../actions/auth'
import { showErrorAlert } from '../../utils/info'
import Backend from '../../config/backend'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const STATUSBAR_HEIGHT = getStatusBarHeight();

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
        this.inputs = {}
    }

    state = {
        userInfo: null,
        error: null,
    };

    async componentDidMount() {
        this._configureGoogleSignIn();
        await this._getCurrentUser();
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: false,
        });
    }

    async _getCurrentUser() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo, error: null });
        } catch (error) {
            const errorMessage =
                error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
            this.setState({
                error: new Error(errorMessage),
            });
        }
    }

    hanldeGoogleSignup = (user) => {
        let data = user.user
        const userdata = RegisterParams(data.name, "", data.name, data.email, "", "google")
        this.props.dispatch(registerUser(userdata, AppURLs.googlesignup, res => {
            if (res) {
                Navigation.navigate("App")
            }
        }))
    }


    _googlesignIn = async () => {
        const { signin } = this.props;
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (signin) {
                let user = { email: userInfo.user.email }
                this.handleloginDispatch(user, AppURLs.googlelogin)
            }
            else {
                this.hanldeGoogleSignup(userInfo)
            }
            //this._signOut()
            this.setState({ userInfo, error: null });
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    // sign in was cancelled
                    Alert.alert('cancelled');
                    break;
                case statusCodes.IN_PROGRESS:
                    // operation (eg. sign in) already in progress
                    Alert.alert('in progress');
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    // android only
                    Alert.alert('play services not available or outdated');
                    break;
                default:
                    Alert.alert('Something went wrong', error.toString());
                    this.setState({
                        error,
                    });
            }
        }
    };

    handleFacebookSignup = (data) => {
        const user = RegisterParams(data.name, "", data.username, data.email, "", "facebook")
        this.props.dispatch(registerUser(user, AppURLs.fbsignup, res => {
            if (res) {
                Navigation.navigate("App")
            }
        }))
    }

    _fblogin = () => {
        const { signin } = this.props;
        var that = this;
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    if (signin) {
                        Backend.fbIinfo((data) => {
                            let user = { email: data.email }
                            that.handleloginDispatch(user, AppURLs.fblogin)
                        })
                    }
                    else {
                        Backend.fbIinfo((data) => {
                            that.handleFacebookSignup(data)
                        })
                    }
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );

    }

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            this.setState({ userInfo: null, error: null });
            Navigation.navigate("App")
        } catch (error) {
            this.setState({
                error,
            });
        }
    };

    handleLogin = (index) => {
        const { signin } = this.props;
        if (signin) {
            if (index == 0) {
                this._fblogin()
            }
            else if (index == 1) {
                // LoginManager.logOut()
                this._googlesignIn()
            }
            else if (index == 2) {
                this.flatlist_ref.scrollToIndex({ animated: true, index: 1 })
            }
        }
        else {
            if (index == 0) {
                this._fblogin()
            }
            else if (index == 1) {
                this._googlesignIn()
            }
            else if (index == 2) {
                Navigation.navigate("WalkThrough")
            }
        }
    }

    handleloginDispatch = (user, url) => {
        this.props.dispatch(login(user, url, (res, data) => {
            if (res) {
                Navigation.navigate("App")
            }
            else {
                showErrorAlert(data, "Error")
            }
        }))
    }

    handleEmailLogin = (e, p) => {
        if (validLogin(e, p)) {
            let user = LoginParams(e, p)
            this.handleloginDispatch(user, AppURLs.emaillogin)
        }
    }

    renderViews = ({ item, index }) => {
        const { signin } = this.props;
        if (item == 1) {
            return <View style={[{ height: wide * 1.2, width: wide }]}>
                <AuthButtons
                    action={(e) => this.handleLogin(e)}
                    signin={signin}
                />
            </View>
        }
        else {
            return <View style={{ height: wide * 1.2, width: wide }}>
                <EmailOptions
                    onForgot={() => Navigation.navigate("Forgot")}
                    signin={signin}
                    onSubmit={(e, p) => signin ? this.handleEmailLogin(e, p) : Navigation.navigate("WalkThrough")}
                />
            </View>
        }
    }

    render() {
        const { primaryInfo, onChange, authReducer } = this.props
        const { isFetching } = authReducer;
        return (
            <KeyboardAwareScrollView style={{ marginTop: -STATUSBAR_HEIGHT }} keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
                <View style={[styles.container, { height: Platform.OS == "android" ? Layout.height + STATUSBAR_HEIGHT + 20 : Layout.height, }]}>
                    <Image
                        source={Images.cover}
                        style={styles.topcover}
                    />
                    <View style={{ flex: 0.8, justifyContent: 'flex-end' }}>
                        <Image
                            source={Images.logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 1, height: wide * 1.2 }}>
                            <FlatList
                                data={[1, 2]}
                                keyboardShouldPersistTaps={'always'}
                                horizontal
                                removeClippedSubviews={true}
                                showsHorizontalScrollIndicator={false}
                                ref={(e) => this.flatlist_ref = e}
                                scrollEnabled={false}
                                renderItem={this.renderViews}
                            />
                        </View>
                        <OrSeperator />
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <SubmitButtons
                            label={primaryInfo}
                            bold
                            dark
                            action={() => { onChange(), this.flatlist_ref.scrollToIndex({ animated: true, index: 0 }) }}
                        />
                    </View>
                </View>
                <AppLoader
                    visible={isFetching}
                />
            </KeyboardAwareScrollView>
        )
    }
}

function mapStateToProps(state) {
    const { entities, authReducer, homeReducer } = state
    return {
        authReducer: state.authReducer,
        home: entities.home
    }
}


export default connect(mapStateToProps)(Login);


