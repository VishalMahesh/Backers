import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { FollowUser, searchUsers } from '../../actions/auth'
import { SubmitButtons } from '../../components/common/buttons'
import { FormInputs } from '../../components/common/inputs'
import { Label } from '../../components/common/label'
import NoData from '../../components/common/noData'
import { Avatar, CommentInput } from '../../components/feed/comments'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import ProfileButton from '../../components/profile'
const UserItem = ({ item, action, current }) => {
    const [follow, onFollow] = useState(item.isFollow)
    return <View style={[{ height: 64, marginVertical: containerPadding / 2, backgroundColor: Colors.lightbase, paddingHorizontal: 10 },
    CommonStyles.rounded,
    CommonStyles.row]}>
        <ProfileButton style={[CommonStyles.row]} user={item}>
            <Avatar
                source={Images.img}
                size={48}
            />
            <View style={{ paddingLeft: 10 }}>
                <Label
                    label={item.userName}
                    style={{ width: wide * 0.4 }}
                    bold
                />
                <Label
                    label={`${item.followedCount} followers`}
                    numberOfLines={1}
                    color={Colors.shade}
                />
            </View>
        </ProfileButton>
        {!current && <SubmitButtons
            label={!follow ? "Follow" : "Unfollow"}
            dark
            size={14}
            bold
            action={() => { onFollow(!follow), action(!follow, item._id) }}
            style={{ height: 36, width: 110, position: 'absolute', right: 10, borderRadius: 6 }}
        />}
    </View>
}

const SearchUsersWrapper = ({ ...props }) => {
    SearchUsersWrapper.navigationOptions = {
        header: null
    }
    const currentuser = props.user.LoginData._id
    const [users, onSearch] = useState([])

    const handleFollow = (status, id) => {
        let obj = {}
        if (!status) {
            obj.followTo = id;
            obj.active = false
        }
        else {
            obj.followTo = id;
            obj.active = true
        }
        props.dispatch(FollowUser(obj))
    }

    const renderUser = ({ item, index }) => <UserItem
        item={item}
        action={handleFollow}
        current={item._id == currentuser}
    />

    const setInput = (query) => {
        if (query == '') {
            onSearch([])
        }
        else {
            props.dispatch(searchUsers(query, res => {
                onSearch([...res])
            }))
        }
    }

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
                    onChangeText={setInput}
                />
            </CommentInput>
            <FlatList
                data={users}
                renderItem={renderUser}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ margin: containerPadding }}
                ListEmptyComponent={<NoData />}
            />
        </SafeAreaView>
    )
}

function mapStateToProps(state) {
    const { entities, feedReducer } = state
    return {
        data: entities.reel,
        feed: entities.feed,
        user: entities.user,
        feedReducer
    }
}

const SearchUsers = connect(mapStateToProps)(SearchUsersWrapper)

export default SearchUsers
