import React, { Component } from 'react'
import { View, SafeAreaView, FlatList, ImageBackground } from 'react-native'
import { AppIcon } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { BlankSpace } from '../../components/common/seperator'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { LabelButtons } from '../messages'

let lab1 = "Your spendings this month";
let lab2 = "Your earnings this month";

export default class Payments extends Component {
    state = {
        active: 0,
    }
    render() {
        const { active } = this.state;
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Payments"}
                    primaryAction={() => Navigation.back()}
                />
                <View style={styles.tabs}>
                    {["Sent", "Received"].map((item, index) => <LabelButtons
                        label={item}
                        action={() => this.setState({ active: index })}
                        active={active == index}
                    />)}
                </View>
                <View style={CommonStyles.container}>
                    <View style={[styles.banner, CommonStyles.rounded, CommonStyles.center]}>
                        <Label
                            label={active == 0 ? lab1 : lab2}
                            size={18}
                            color={Colors.dark}
                        />
                        <Label
                            label={active == 0 ? "$89.34" : "$233.44"}
                            size={48}
                            bold
                            color={active == 0 ? Colors.blue : Colors.green}
                        />
                    </View>
                    <BlankSpace />
                    <FlatList
                        data={[1, 2, 3, 44, 5, 5, 5, 5,]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <View style={[{ height: wide * 0.25, backgroundColor: Colors.lightbase, marginVertical: 8 }, CommonStyles.rounded, CommonStyles.row]}>
                            <View style={[{ height: wide * 0.25, width: wide * 0.25, backgroundColor: active == 0 ? Colors.blue : Colors.green, overflow: 'hidden' }, CommonStyles.rounded]}>
                                <ImageBackground style={[CommonStyles.full, CommonStyles.center]} source={active == 0 ? Images.payinmask : Images.payoutmask}>
                                    <Label
                                        label={"$14"}
                                        bold
                                        size={24}
                                        color={Colors.light}
                                    />
                                    <Label
                                        label={"Basic Plan"}
                                        bold
                                        color={Colors.light}
                                    />
                                </ImageBackground>
                            </View>
                            <View style={{ padding: 10, height: "100%", justifyContent: 'space-around' }}>
                                <View style={CommonStyles.row}>
                                    <AppIcon
                                        name={Images.calx}
                                        size={18}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Label
                                        label={"21/02/2021"}
                                    />
                                    <AppIcon
                                        name={Images.more}
                                        size={18}
                                        style={{ marginRight: 5 }}
                                    />
                                    <AppIcon
                                        name={Images.calx}
                                        size={18}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Label
                                        label={"21/02/2021"}
                                    />
                                </View>
                                <View style={CommonStyles.row}>
                                    <AppIcon
                                        name={Images.profile}
                                        size={18}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Label
                                        label={"@parineetayyy"}
                                        style={{ textDecorationLine: "underline" }}
                                    />
                                </View>
                                <View style={CommonStyles.row}>
                                    <AppIcon
                                        name={Images.transfer}
                                        size={18}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Label
                                        label={"21DCuy36836752bjdsdf543"}
                                    />
                                </View>

                            </View>
                        </View>}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: containerPadding
    },
    banner: {
        height: wide * 0.25,
        backgroundColor: Colors.lightbase
    }
}