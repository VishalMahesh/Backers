import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList } from 'react-native'
import { CommonStyles, containerPadding } from '../../constants'
import { Suggestions } from '../../constants/dummy'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import Suggestion from '../../components/feed/suggestions'
export default class SuggestionContainer extends Component {
    static navigationOptions = {
        header: null
    }

    renderSuggestions = ({ item, index }) => <View style={{ padding: containerPadding }}>
        <Suggestion large item={item} />
    </View>

    render() {
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Follow Suggestions"}
                    primaryAction={() => Navigation.back()}
                />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FlatList
                        data={Suggestions}
                        renderItem={this.renderSuggestions}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
