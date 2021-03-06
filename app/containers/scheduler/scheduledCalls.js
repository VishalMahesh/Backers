import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { SubmitButtons } from '../../components/common/buttons'
import { IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { Colors, CommonStyles, containerPadding, Dummy, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { OptionButton } from './influencer'

export default class ScheduledCalls extends Component {

    renderInfo = ({ item, index }) => <View style={styles.container}>
        <View style={[CommonStyles.row, CommonStyles.btmborder, { padding: 10, justifyContent: "space-between" }]}>
            <Label
                label={item.date}
            />
            <Label
                label={item.time}
            />
        </View>
        <View style={{ padding: 10 }}>
            <Label
                label={"User :  "}
                bold
                style={{ lineHeight: 20 }}
                size={15}
            >
                <Label
                    label={item.user}
                    style={{ lineHeight: 20 }}
                    size={15}
                />
            </Label>
            <Label
                label={"Description :  "}
                bold
                style={{ lineHeight: 20 }}
                size={15}
            >
                <Label
                    label={item.desc}
                    style={{ lineHeight: 20 }}
                    size={15}
                />
            </Label>
            <View style={[CommonStyles.row, { justifyContent: 'space-between' }]}>
                <SubmitButtons
                    dark
                    label={"Join the video call"}
                    style={{ height: 40, width: "70%" }}
                />
                <IconButtons
                    name={Images.callbox}
                    action={() => { }}
                    size={40}
                />
                <IconButtons
                    name={Images.messagebox}
                    action={() => { }}
                    size={40}
                />
            </View>
        </View>
    </View>

    render() {
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Scheduled video calls"}
                    primaryAction={() => Navigation.back()}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={CommonStyles.horizontalPadding}>
                        <OptionButton
                            label={"These are your scheduled video calls sorted by newest first."}
                            nosep
                            icon={Images.calendartog}
                        />
                        <FlatList
                            data={Dummy.ScVideoCalls}
                            renderItem={this.renderInfo}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ height: 100 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = {
    container: {
        borderWidth: 0.5,
        borderColor: Colors.shade,
        marginVertical: 8,
        borderRadius: 6
    }
}