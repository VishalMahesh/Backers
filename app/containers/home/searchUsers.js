import React, { useState } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { SubmitButtons } from '../../components/common/buttons'
import { FormInputs } from '../../components/common/inputs'
import { Label } from '../../components/common/label'
import { Avatar, CommentInput } from '../../components/feed/comments'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'

const UserItem = () => {
    const [follow, onFollow] = useState(false)
    return <View style={[{ height: 64, marginVertical: containerPadding / 2, backgroundColor: Colors.lightbase, paddingHorizontal: 10 },
    CommonStyles.rounded,
    CommonStyles.row]}>
        <Avatar
            source={Images.img}
            size={48}
        />
        <View style={{ paddingLeft: 10 }}>
            <Label
                label={"Alexis.ren"}
                style={{ width: wide * 0.4 }}
                bold
            />
            <Label
                label={"248k followers"}
                numberOfLines={1}
                color={Colors.shade}
            />
        </View>
        <SubmitButtons
            label={!follow ? "Follow" : "Unfollow"}
            dark
            size={14}
            bold
            action={() => onFollow(!follow)}
            style={{ height: 36, width: 110, position: 'absolute', right: 10, borderRadius: 6 }}
        />
    </View>
}

const SearchUsers = () => {
    SearchUsers.navigationOptions = {
        header: null
    }

    const renderUser = () => <UserItem />

    return (
        <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
            <AuthHeader
                label={"Search Users"}
                primaryAction={() => Navigation.back()}
                style={{ borderBottomWidth: 0 }}
            />
            <CommentInput noshadow>
                <FormInputs
                    type="search"
                    placeholder="Search Users"
                />
            </CommentInput>
            <FlatList
                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                renderItem={renderUser}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ margin: containerPadding }}
            />
        </SafeAreaView>
    )
}

export default SearchUsers
