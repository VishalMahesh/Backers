import React, { Component } from 'react'
import { FlatList, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Label } from '../../components/common/label'
import { Colors, containerPadding, wide } from '../../constants'
import { postComments, postComments2 } from '../../constants/dummy'
import { Messages } from '../../components/messages'
import Navigation from '../../lib/Navigation'
export const LabelButtons = ({ label, action, active }) => <TouchableOpacity
    onPress={action}
    activeOpacity={0.5}
    style={styles.labbtn}
>
    <Label
        label={label}
        size={18}
        color={active ? Colors.dark : Colors.shade}
    />
</TouchableOpacity>

export default class ChatContainer extends Component {
    state = {
        active: 0,
    }
    renderViews = ({ item, index }) => {
        return <Messages
            data={item == 1 ? postComments : postComments2}
            handler={(room) => Navigation.navigate("ChatRoom", room)}
        />
    }

    handleActions = (ind) => {
        this.flatlist_ref.scrollToIndex({
            animated: true,
            index: ind
        })
        this.setState({ active: ind })
    }

    onViewableItemsChanged = ({ viewableItems }) => {
        this.setState({ active: viewableItems[0].index })
    }

    render() {
        const { active } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, }}>
                    <View style={styles.subcont}>
                        {["Free", "Subscribed"].map((item, index) => <LabelButtons
                            label={item}
                            active={active == index}
                            action={() => this.handleActions(index)}
                        />)}
                    </View>
                    <FlatList
                        data={[1, 2]}
                        keyboardShouldPersistTaps={'always'}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ref={(e) => this.flatlist_ref = e}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 50
                        }}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        renderItem={this.renderViews}
                        pagingEnabled
                        onMomentumScrollEnd={() => this.flatlist_ref.get}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: Colors.light
    },
    subcont: {
        flexDirection: 'row',
        paddingHorizontal: containerPadding
    },
    labbtn: {
        paddingVertical: containerPadding,
        minWidth: wide * 0.12
    }
}