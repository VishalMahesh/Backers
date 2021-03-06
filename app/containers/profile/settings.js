import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { FormInputs } from '../../components/common/inputs'
import { BlankSpace } from '../../components/common/seperator'
import { CommentInput } from '../../components/feed/comments'
import { FeedOption } from '../../components/feed/options'
import { CommonStyles, wide } from '../../constants'
import { ProfileAllSetting } from '../../constants/dummy'
import Navigation from '../../lib/Navigation'
import { deleteAuth, deleteToken } from '../../middleware'
import AppLoader from '../../utils/Apploader'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { showConfirmationAlert } from '../../utils/info'
let cnf = "Are you sure you want to logout?"
export default class AllSettings extends Component {

    state = {
        loading: false
    }

    handleAction = (ind) => {
        if (ind == 1) {
            Navigation.navigate('EditSubscription')
        }
        else if (ind == 2) {
            Navigation.navigate('InfluencerScheduler')
        }
        else if (ind == 3) {
            Navigation.navigate('ScheduledCalls')
        }
        else if (ind == 4) {
            Navigation.navigate('Payments')
        }
        else if (ind == 5) {
            Navigation.navigate('Settlements')
        }
        else if (ind == 10) {
            this._logout()
        }
    }

    _logout = () => {
        showConfirmationAlert(cnf, () => {
            this.setState(
                { loading: true },
                async () => {
                    await deleteAuth();
                    await deleteToken();
                    Navigation.navigate("Auth")
                }
            );
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Settings"}
                    primaryAction={() => Navigation.back()}
                    style={{ borderBottomWidth: 0 }}
                />
                <CommentInput noshadow>
                    <FormInputs
                        type="search"
                        placeholder="Search settings"
                    />
                </CommentInput>
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <FeedOption
                        data={ProfileAllSetting}
                        action={this.handleAction}
                        onCancel={() => { }}
                    />
                    <BlankSpace
                        offset={wide * 0.2}
                    />
                </ScrollView>
                <AppLoader
                    visible={loading}
                />
            </SafeAreaView>
        )
    }
}
