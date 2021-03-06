import React, { Component } from 'react'
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FormInputs } from '../../components/common/inputs'
import { Label } from '../../components/common/label'
import { Avatar, CommentInput } from '../../components/feed/comments'
import { Colors, CommonStyles, containerPadding, Dummy, Layout, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'


const NotificationItem = ({ item, index, action }) => <TouchableOpacity
    activeOpacity={0.5}
    onPress={action}
    style={[{ height: wide * 0.2 }, CommonStyles.row]}>
    <Avatar
        size={wide * 0.15}
        source={item.avatar}
    />
    <View style={{ paddingHorizontal: containerPadding }}>
        <Label
            label={item.name}
            bold
            size={16}
        />
        <Label
            label={item.des}
        >
            <Label
                label={`  ${item.dur}`}
                color={Colors.shade}
            />
        </Label>
    </View>
</TouchableOpacity>

export default class Notification extends Component {

    state = {
        data: Dummy.NotificationData
    }

    renderNotification = ({ item, index }) => {
        return <NotificationItem
            item={item}
            index={index}
            action={() => this.setState({ data: [] })}
        />
    }

    renderEmptyComponent = () => <View style={[{ height: Layout.height * 0.56 }, CommonStyles.center]}>
        <Image
            source={Images.mtnotif}
            style={{ height: wide * 0.4, width: wide * 0.4 }}
            resizeMode={'contain'}
        />
        <Label
            label={"No Notifications"}
            size={18}
            style={{ lineHeight: 40 }}
        />
        <Label
            label={"You don't have any notifications"}
            color={Colors.shade}
        />
    </View>

    render() {
        const { data } = this.state;
        return (
            <SafeAreaView style={[CommonStyles.container, CommonStyles.noPadding]}>
                <AuthHeader
                    label={"Notifications"}
                    primaryAction={() => Navigation.back()}
                    style={{ borderBottomWidth: 0 }}
                />
                <CommentInput noshadow>
                    <FormInputs
                        type="search"
                        placeholder="Search notifications"
                    />
                </CommentInput>
                <View style={CommonStyles.container}>
                    <FlatList
                        data={data}
                        renderItem={this.renderNotification}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => <View style={{ height: 100 }}>

                        </View>}
                        ListEmptyComponent={this.renderEmptyComponent}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
