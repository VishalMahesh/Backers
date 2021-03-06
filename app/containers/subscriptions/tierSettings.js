import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import { Label } from '../../components/common/label'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { TierPlans } from '../../constants/dummy'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { Actions } from './editSubscription'

const des = "You can edit all these settings and save. This will be the default plan a user gets subscribed to when he follows you."

const getHeader = (ind) => {
    if (ind == 0) {
        return "Free"
    }
    else if (ind == 1) {
        return "Basic"
    }
    else if (ind == 2) {
        return "Standard"
    }
    else {
        return "Premium"
    }
}

const TierOptions = ({ item }) => <View style={[CommonStyles.verticalMargin, { flexDirection: 'row' }]}>
    <View style={{ flex: 1, minHeight: wide * 0.1 }}>
        <Label
            label={item.label}
            size={16}
        />
        <Label
            label={item.desc}
            color={Colors.shade}
            style={{ maxWidth: '80%' }}
        />
    </View>
    <Actions size={wide * 0.1} align={"flex-start"} />
</View>

const TierSetting = ({ ...props }) => {
    const { id } = props.navigation.state.params
    return <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
        <AuthHeader
            label={`${getHeader(id)} Tier`}
            primaryAction={() => Navigation.back()}
            icon={Images.save}
            size={wide * 0.2}
            secondaryAction={() => { }}
            iconstyle={{ width: wide * 0.2 }}
        />
        <View style={CommonStyles.container}>
            <Label
                label={des}
                size={16}
                style={{ marginBottom: containerPadding }}
            />
            <FlatList
                data={TierPlans[getHeader(id)]}
                renderItem={({ item, index }) => <TierOptions
                    item={item}
                />}
            />
        </View>
    </SafeAreaView>

}
export default TierSetting