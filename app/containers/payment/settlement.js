import React, { Component } from 'react'
import { Text, SafeAreaView, View, Image } from 'react-native'
import { SubmitButtons } from '../../components/common/buttons'
import { AppIcon } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { Seperator } from '../../components/common/seperator'
import { Colors, CommonStyles, Dummy, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { ActionButtons } from '../profile/userProfile'

export default class Settlements extends Component {
    render() {
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Settlements"}
                    primaryAction={() => Navigation.back()}
                    icon={Images.save}
                    size={wide * 0.2}
                    secondaryAction={() => { }}
                    iconstyle={{ width: wide * 0.2 }}
                />
                <View style={[CommonStyles.container]}>
                    <Label
                        label={"Please connect to one of the payment services to enable any kind of monetization"}
                        size={16}
                    />
                    {Dummy.PaymentOptions.map((item, index) => <>
                        <View style={[CommonStyles.row, { paddingVertical: 10 },]}>
                            <View style={[{ height: wide * 0.15, width: wide * 0.15, backgroundColor: Colors.lightbase }, CommonStyles.rounded, CommonStyles.center]}>
                                <Image
                                    style={CommonStyles.large}
                                    resizeMode={'contain'}
                                    source={item.img}
                                />
                            </View>
                            <View style={{ flex: 1, height: '100%', paddingHorizontal: 10 }}>
                                <Label
                                    label={item.name}
                                    bold
                                    size={16}
                                />
                                <Label
                                    label={item.desc}
                                    color={Colors.shade}
                                />
                            </View>
                        </View>
                        <ActionButtons
                            label={`Connect your ${item.name} account`}
                        />
                        {index == 0 && <Seperator style={{ marginVertical: 10 }} />}
                    </>)}
                </View>
            </SafeAreaView>
        )
    }
}
