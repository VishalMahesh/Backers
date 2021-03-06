import React, { useState, Component } from 'react'
import { FlatList, View, SafeAreaView, Text } from 'react-native'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/auth'
import { EmailInput, UserModeSetting } from '../../components/auth'
import { SubmitButtons } from '../../components/common/buttons'
import { FormInputs } from '../../components/common/inputs'
import { Label } from '../../components/common/label'
import { Colors, containerPadding, wide } from '../../constants'
import { AppURLs, RegisterParams } from '../../constants/constant'
import Navigation from '../../lib/Navigation'
import AppLoader from '../../utils/Apploader'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { isEmptyFeild, isPasswordMatched, isValidEmail, isValidPassword } from '../../utils/isValid'


class Walkthrough extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            cnfpass: "",
            mode: 0,
            fname: "",
            lname: "",
            uname: ""
        }
        this.inputs = {};
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    handleSignup = () => {
        this.props.dispatch()
    }

    handleValidValues = (index) => {
        const { email, password, cnfpass, fname, lname, uname } = this.state;
        if (index == 0
            && isValidEmail(email)
            && isEmptyFeild(fname, "First Name")
            && isEmptyFeild(lname, "Last Name")
            && isEmptyFeild(uname, "User Name")
        ) {
            this.flatlist_ref.scrollToIndex({ animated: true, index: 1 })
        }
        else if (index == 1) {
            if (isValidPassword(password) && isPasswordMatched(password, cnfpass)) {
                const user = RegisterParams(fname, lname, uname, email, password, "email")
                this.props.dispatch(registerUser(user, AppURLs.emailsignup, res => {
                    if (res) {
                        Navigation.navigate("App")
                    }
                }))
            }
        }
        // else {

        // }
    }

    renderViews = ({ item, index }) => {
        const { email, password, cnfpass, fname, lname, uname } = this.state
        if (item == 1) {
            return <View style={{ height: wide, width: wide * 0.92 }}>
                <EmailInput
                    label={"Enter your registered email address"}
                    onChange={(email) => this.setState({ email })}
                    value={email}
                    onRef={(ref) => {
                        this.inputs['email'] = ref;
                    }}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.focusNextField('fname');
                    }}
                    placeholder={"Email"}
                    onSubmitEditing={() => {
                        this.focusNextField('fname');
                    }}
                />
                <EmailInput
                    label={"Enter your first name"}
                    onChange={(fname) => this.setState({ fname })}
                    value={fname}
                    onRef={(ref) => {
                        this.inputs['fname'] = ref;
                    }}
                    returnKeyType={'next'}
                    placeholder={"First Name"}
                    onSubmitEditing={() => {
                        this.focusNextField('lname');
                    }}
                />
                <EmailInput
                    label={"Enter your last name"}
                    onChange={(lname) => this.setState({ lname })}
                    value={lname}
                    placeholder={"Last Name"}
                    onRef={(ref) => {
                        this.inputs['lname'] = ref;
                    }}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.focusNextField('username');
                    }}
                />
                <EmailInput
                    label={"Enter user name"}
                    onChange={(uname) => this.setState({ uname })}
                    value={uname}
                    placeholder={"User Name"}
                    onRef={(ref) => {
                        this.inputs['username'] = ref;
                    }}
                    onSubmitEditing={() => {
                        this.handleValidValues(index)
                    }}
                    returnKeyType={'go'}
                />
                <SubmitButtons
                    dark
                    action={() => this.handleValidValues(index)}
                    label={"Submit"}
                    style={{ width: "100%" }}
                />
            </View>
        }
        else if (item == 2) {
            return <View style={{ height: wide, width: wide * 0.92, }}>
                <Label
                    label={"Set a strong password!"}
                    size={16}
                />
                <FormInputs
                    placeholder={"Password"}
                    row
                    onSubmitEditing={(e) => this.handleValidValues(index)}
                    onClear={password => this.setState({ password })}
                    value={password}
                    onChangeText={password => this.setState({ password })}
                />
                <FormInputs
                    placeholder={"Confirm password"}
                    row
                    onSubmitEditing={(e) => console.log(e)}
                    onClear={cnfpass => this.setState({ cnfpass })}
                    value={cnfpass}
                    onChangeText={cnfpass => this.setState({ cnfpass })}
                />
                <SubmitButtons
                    dark
                    action={() => this.handleValidValues(index)}
                    label={"Continue"}
                    style={{ width: "100%" }}
                />
            </View>
        }
        else {
            return <View style={{ height: wide, width: wide * 0.921, }}>
                <UserModeSetting
                    onSet={(mode) => this.setState({ mode })}
                />
                <SubmitButtons
                    dark
                    action={() => this.handleValidValues(index)}
                    label={"Continue"}
                    style={{ width: "100%" }}
                />
            </View>
        }
    }

    render() {
        const { isFetching } = this.props.authReducer
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
                <AuthHeader
                    label={"Create Account"}
                    primaryAction={() => Navigation.back()}
                />
                <View style={{ flex: 1, padding: containerPadding }}>
                    <FlatList
                        data={[1, 2]}
                        keyboardShouldPersistTaps={'always'}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        ref={(e) => this.flatlist_ref = e}
                        scrollEnabled={false}
                        renderItem={this.renderViews}
                    />
                </View>
                <AppLoader
                    visible={isFetching}
                />
            </SafeAreaView>
        )
    }
}



function mapStateToProps(state) {
    const { entities, authReducer } = state
    return {
        authReducer: state.authReducer,
        home: entities.home,
    }
}


export default connect(mapStateToProps)(Walkthrough);


