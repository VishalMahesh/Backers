import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Label } from '../../components/common/label'
import { Seperator } from '../../components/common/seperator'
import { Colors, CommonStyles, containerPadding, Dummy, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { AppIcon, IconButtons } from '../../components/common/iconUtility'
import { initialSlots, OptionList, TimeData, TimeZoneData } from '../../constants/dummy'
import { MenuContainer } from '../../components/scheduler/menu'
import { connect } from 'react-redux'
import { getSchedule, setrecurringSlots } from '../../actions/slots'
import { formatAMPM } from '../../utils'
export const OptionButton = ({ label, action, primaryLabel, nosep, icon = Images.editbtn }) => <>
    {!nosep && <Seperator style={{ marginBottom: containerPadding }} />}
    <Label size={16} label={primaryLabel} />
    <View style={styles.optbtn}>
        <Label
            label={label}
            size={16}
            style={{ width: wide * 0.7 }}
            bold
        />
        <IconButtons
            name={icon}
            action={action}
            size={40}
        />
    </View>
</>

const calcTime = (offset) => {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return formatAMPM(nd)
}

const getTimeOffset = (index) => {
    if (index == 0) {
        //IST
        return calcTime("+5.5")
    }
    else if (index == 1) {
        //MET
        return calcTime("+4")
    }
    else if (index == 2) {
        //NST
        return calcTime("+12")
    }
    else {
        //PST
        return calcTime("-8")
    }
}


class InfluencerScheduler extends Component {

    state = {
        loading: false,
        data: [],
        dateString: "",
        active: 0,
        activezone: 0
    }

    render() {
        const { active, activezone } = this.state;
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Video call"}
                    primaryAction={() => Navigation.back()}
                    style={{ borderBottomWidth: 0 }}
                    icon={Images.save}
                    size={wide * 0.2}
                    iconstyle={{ width: wide * 0.2 }}
                />
                <Seperator />
                <ScrollView showsVerticalScrollIndicator={false} style={CommonStyles.container}>
                    <Label size={16} label={"How long will your video calls be?"} />
                    <MenuContainer
                        Data={TimeData}
                        active={active}
                        onChange={(index) => this.setState({ active: index })}
                    />
                    <Label size={16} label={"Set your timezone"} />
                    <MenuContainer
                        Data={TimeZoneData}
                        active={activezone}
                        style={{ height: wide * 0.18, width: wide * 0.92 }}
                        containerstyle={{ width: wide * 0.7 }}
                        onChange={(index) => this.setState({ activezone: index })}
                    >
                        <Label
                            label={`(Currently in your timezone: ${getTimeOffset(activezone)})`}
                            color={Colors.shade}
                            style={{ lineHeight: 25 }}
                        />
                    </MenuContainer>
                    <OptionButton
                        label={"Set/edit your usual weekly availablity hours"}
                        primaryLabel={"Set the weekly hours you’re usually available to take video calls."}
                        action={() => Navigation.navigate("AvailabilityEdit")}
                    />
                    <View style={{ flexDirection: 'row', marginBottom: containerPadding }}>
                        {Dummy.AvailabilityDates.map(item => <View style={styles.outContainer}>
                            <View style={[styles.inContainer, { backgroundColor: item.selected ? Colors.lightshade : Colors.base1 }, CommonStyles.center]}>
                                <Label
                                    label={item.name.charAt(0)}
                                    color={item.selected ? Colors.darkgrey : Colors.base}
                                    size={16}
                                />
                            </View>
                        </View>)}
                    </View>
                    <OptionButton
                        primaryLabel={"Update hours for specific dates"}
                        label={"Update / add hours for specific dates"}
                        action={() => Navigation.navigate("EditDate")}
                    />
                    <Seperator style={{ marginBottom: containerPadding }} />
                    <Label size={16} label={"You can copy this web link and paste it in your other social media profiles to schedule a video call using our platform"} />
                    <TouchableOpacity style={styles.copybtn}>
                        <Label
                            label={"Tap to copy link"}
                            size={16}
                        />
                        <AppIcon
                            name={Images.copy}
                            size={25}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = {
    menu: [{
        marginVertical: containerPadding,
        height: wide * 0.12,
        borderWidth: 1,
        width: wide * 0.4,
        justifyContent: "space-between",
        padding: containerPadding
    }, CommonStyles.rounded, CommonStyles.row],
    option: [
        {
            marginTop: wide * 0.16,
            paddingVertical: containerPadding,
            paddingHorizontal: 5
        },
        CommonStyles.rounded
    ],
    item: {
        height: 40,
        borderRadius: 5,
        paddingLeft: 10
    },
    optbtn: [
        {
            height: wide * 0.2,
            justifyContent: 'space-between'
        },
        CommonStyles.row
    ],
    copybtn: [{
        marginVertical: containerPadding,
        paddingHorizontal: containerPadding,
        marginBottom: 50,
        height: wide * 0.15,
        borderWidth: 1,
        borderStyle: "dashed",
        justifyContent: 'space-between'
    },
    CommonStyles.rounded,
    CommonStyles.row
    ],
    outContainer: [
        {
            height: wide * 0.131,
            width: wide * 0.131
        },
        CommonStyles.center
    ],
    inContainer: {
        height: wide * 0.11,
        width: wide * 0.11,
        borderRadius: wide * 0.11 / 2,
    }
}


function mapStateToProps(state) {
    const { entities, slotReducer } = state;
    return {
        Data: entities.slot,
        User: entities.user,
        slotReducer
    };
}

export default connect(mapStateToProps)(InfluencerScheduler);
