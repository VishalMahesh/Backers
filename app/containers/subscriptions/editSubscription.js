import React, { Component, useState } from 'react'
import { SafeAreaView, View, FlatList } from 'react-native'
import { AppIcon, IconButtons } from '../../components/common/iconUtility'

import { Label } from '../../components/common/label'
import { BlankSpace } from '../../components/common/seperator'
import { Colors, CommonStyles } from '../../constants'
import { PredefinedSubscription } from '../../constants/dummy'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'

export const Actions = ({ size = 34, align = "flex-end" }) => {
    const [active, onChange] = useState(false)
    return <IconButtons
        name={active ? Images.on : Images.off}
        action={() => onChange(!active)}
        size={size}
        style={[CommonStyles.noPadding, { justifyContent: align, height: 40 }]}
    />
}

export default class EditSubscription extends Component {

    handleActions = (ind) => {
        Navigation.navigate("TierSettings", { id: ind })
    }

    renderItems = ({ item, index }) => <View style={[
        CommonStyles.rounded,
        CommonStyles.containerPadding,
        { backgroundColor: Colors.lightbase, flexDirection: 'row' }
    ]}>
        <View style={{ flex: 1, }}>
            <Label
                label={item.title}
                size={18}
            />
            <Label
                label={item.desc}
                style={{ lineHeight: 20 }}
                color={Colors.shade}
            />
        </View>
        <View style={{ flex: 0.2, justifyContent: 'space-between', alignItems: 'flex-end', }}>
            <IconButtons
                name={Images.editalt}
                size={24}
                style={{ justifyContent: 'flex-start', height: 40 }}
                action={() => this.handleActions(index)}
            />
            <Actions />
        </View>
    </View>

    render() {
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Subscription tiers"}
                    primaryAction={() => Navigation.back()}
                />
                <View style={CommonStyles.container}>
                    <Label
                        label={"To get you started, we have defined some plans for you. You can edit this plans."}
                        size={16}
                        style={{ marginBottom: 20 }}
                    />
                    <FlatList
                        data={PredefinedSubscription}
                        renderItem={this.renderItems}
                        ItemSeparatorComponent={() => <BlankSpace />}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
