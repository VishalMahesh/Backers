import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, ScrollView, LayoutAnimation, Platform, UIManager, Linking } from 'react-native'
import { SubmitButtons } from '../../components/common/buttons'
import { IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { Colors, CommonStyles, containerPadding, Dummy, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { OptionButton } from './influencer'
import { CalendarComponent } from '../../components/scheduler/calendar'
import { getMyBookedSlots } from '../../actions/slots'
import { connect } from 'react-redux'
import AppLoader from '../../utils/Apploader'
import NoData from '../../components/common/noData'
import AppUtils from '../../utils'



class ScheduledCalls extends Component {
    constructor() {
        super();
        this.state = { expanded: false }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }


    componentDidMount() {
        const { LoginData } = this.props.User;
        let user = {
            bookedBy: LoginData._id
        }
        this.props.dispatch(getMyBookedSlots(user))
    }

    handleCall = (url) => {
        Linking.openURL(url)
            .catch((err) => alert(`Can't Open URL: ${url}`))
    }

    renderInfo = ({ item, index }) => <View style={styles.container}>
        <View style={[CommonStyles.row, CommonStyles.btmborder, { padding: 10, justifyContent: "space-between" }]}>
            <Label
                label={AppUtils.prettierDate(item.bookingDate)}
            />
            <Label
                label={`${AppUtils.prettierTime(item.bookingStartTime)} - ${AppUtils.prettierTime(item.bookingEndTime)}`}
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
                    label={item.bookedBy.userName}
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
                    label={item.description ? item.description : "No Description"}
                    style={{ lineHeight: 20 }}
                    size={15}
                    color={item.description ? Colors.dark : Colors.shade}
                />
            </Label>
            <View style={[CommonStyles.row, { justifyContent: 'space-between' }]}>
                <SubmitButtons
                    dark
                    label={"Join the video call"}
                    style={{ height: 40, width: "70%" }}
                    action={() => this.handleCall(item.videoCallUrl)}
                />
                <IconButtons
                    name={Images.callbox}
                    action={() => this.handleCall(item.videoCallUrl)}
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
        const { expanded } = this.state;
        const { isFetching } = this.props.slotReducer
        const { bookedSlots } = this.props.Data
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                {/* <AuthHeader
                    label={"Scheduled video calls"}
                    primaryAction={() => Navigation.back()}
                /> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={CommonStyles.horizontalPadding}>
                        <OptionButton
                            label={"These are your scheduled video calls sorted by newest first."}
                            nosep
                            action={this.changeLayout}
                            icon={Images.calendartog}
                        />
                        <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
                            <CalendarComponent
                                changed={(e) => console.log(e)}
                                onMonthChange={e => console.log(e)}
                                data={[]}
                            />
                        </View>
                        <FlatList
                            data={bookedSlots}
                            renderItem={this.renderInfo}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<NoData />}
                        />
                        <View style={{ height: 100 }} />
                    </View>
                </ScrollView>
                <AppLoader visible={isFetching} />
            </SafeAreaView>
        )
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

export default connect(mapStateToProps)(ScheduledCalls);


const styles = {
    container: {
        borderWidth: 0.5,
        borderColor: Colors.shade,
        marginVertical: 8,
        borderRadius: 6
    }
}