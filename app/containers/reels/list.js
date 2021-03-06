import React, { Component } from 'react'
import { Text, SafeAreaView, FlatList, View, TouchableOpacity } from 'react-native'
import { CommonStyles, wide, containerPadding } from '../../constants'
import { Videos } from '../../constants/videos'
import Navigation from '../../lib/Navigation'
import { Header } from '../../utils/Headers/CustomHeader'
import Video from 'react-native-video'
let data = [
    {
        id: 0,
        source: Videos.one
    },
    {
        id: 1,
        source: Videos.two
    },
    {
        id: 2,
        source: Videos.three
    },
    {
        id: 3,
        source: Videos.four
    },
    {
        id: 1,
        source: Videos.two
    },
    {
        id: 2,
        source: Videos.three
    },
    {
        id: 3,
        source: Videos.four
    }
]

export default class ReelList extends Component {
    render() {
        return (
            <SafeAreaView style={[CommonStyles.container, CommonStyles.noPadding]}>
                <Header
                    actions={() => { }}
                    reel
                />
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.5} onPress={() => Navigation.navigate("ReelVideo")}>
                        <Video
                            source={item.source}
                            style={[{
                                height: 200, width: wide / 2.3, marginLeft: containerPadding, marginVertical: 10
                            }, CommonStyles.rounded]}
                            resizeMode={'cover'}
                            repeat
                            volume={0}
                        />
                    </TouchableOpacity>}
                    ListFooterComponent={() => <View
                        style={{ height: 200 }}
                    />}
                />
            </SafeAreaView>
        )
    }
}
