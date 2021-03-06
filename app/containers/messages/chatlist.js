import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import ChatContainer from '.'
import { FormInputs } from '../../components/common/inputs'
import { Seperator } from '../../components/common/seperator'
import { CommentInput } from '../../components/feed/comments'
import { CommonStyles, containerPadding } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'

export default class ChatList extends Component {
    render() {
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Messaging"}
                    primaryAction={() => Navigation.back()}
                    style={{ borderBottomWidth: 0 }}
                    icon={Images.chatadd}
                />
                <CommentInput noshadow>
                    <FormInputs
                        type="search"
                        placeholder="Search Messages"
                    />
                </CommentInput>
                <ChatContainer />
            </SafeAreaView>
        )
    }
}
