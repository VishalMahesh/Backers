import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Label } from '../../components/common/label'
import { Seperator } from '../../components/common/seperator'
import { CalendarComponent } from '../../components/scheduler/calendar'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import AppLoader from '../../utils/Apploader';
import { SubmitButtons } from '../../components/common/buttons'
import { connect } from 'react-redux'
import { addBooking, getOtherUserSchedule } from '../../actions/slots'
import { formatAMPM } from '../../utils'
import { showErrorAlert } from '../../utils/info'

const schedule = [
    { id: 0, time: "2:00pm" },
    { id: 1, time: "2:30pm" },
    { id: 2, time: "3:00pm" },
    { id: 3, time: "3:30pm" },
    { id: 4, time: "4:00pm" },
    { id: 5, time: "4:30pm" },
    { id: 6, time: "5:00pm" },
    { id: 7, time: "5:30pm" },
    { id: 8, time: "6:00pm" },
    { id: 9, time: "6:30pm" },
    { id: 10, time: "7:00pm" },
    { id: 11, time: "7:30pm" }
]

let twoDigVal = (month) => {
    if (`${month}`.length == 2) {
        return `${month}`.slice(-2)
    }
    else {
        return "0" + `${month}`.slice(-2)
    }

}

class UserScheduler extends Component {

    state = {
        loading: false,
        data: [],
        dateString: "",
        active: null,
        calendarData: [],
        date: null,
        selectedIndex: null,
        starttime: null
    }

    componentDidMount() {
        let month = new Date().getMonth() + 1;
        this.getUserSchedule(month)
    }

    getUserSchedule = (month) => {
        let dateobj = new Date();
        const { userId } = this.props.navigation.state.params
        console.log(userId);
        debugger
        let year = dateobj.getFullYear();
        let totaldays = new Date(year, month, 0).getDate()
        let userObj = {
            userId: userId,
            startDate: `01-${twoDigVal(month)}-${year}`,
            endDate: `${totaldays}-${twoDigVal(month)}-${year}`
        }
        this.props.dispatch(getOtherUserSchedule(userObj, (res, data) => {
            if (res) {
                let arr = [...data];
                console.log(arr);
                let arr2 = [];
                arr.forEach(item => {
                    if (Object.values(item)[0]) {
                        arr2.push(Object.keys(item)[0].split("-").reverse().join("-"))
                    }
                })
                this.setState({ calendarData: [...arr2], active: null })
            }
        }))
    }


    retrieveData = (date) => {
        let val = new Date(date.dateString)
        this.setState({
            loading: true,
            dateString: val.toDateString(),
            data: schedule,
            active: null
        }, () => {
            setTimeout(() => {
                this.setState({ loading: false })
            }, 500);
        })
    }

    renderItem = ({ item, index }) => {
        const { dateString, active } = this.state
        let check = active == index
        return <TouchableOpacity
            style={[
                styles.container,
                CommonStyles.rounded,
                CommonStyles.row,
                check && { borderWidth: 0, backgroundColor: Colors.base }
            ]}
            activeOpacity={1}
            onPress={() => this.setState({ active: index, starttime: formatAMPM(new Date(item.startTime)) })}
        >
            <Label label={dateString} color={check ? Colors.light : Colors.dark} />
            <Label label={formatAMPM(new Date(item.startTime))} color={check ? Colors.light : Colors.dark} />
        </TouchableOpacity>
    }

    onMonthChange = (obj) => {
        let tts = new Date(obj.dateString)
        let tt = new Date();
        // if (tt < tts) {
        this.getUserSchedule(obj.month)
        // }
    }

    onDateChange = (e) => {
        const { userSlots } = this.props.Data
        let val = new Date(e.dateString).toLocaleDateString().replaceAll("/", "-");
        let arrData = Object.values(userSlots[e.day - 1])[0]
        this.setState({ date: e, selectedIndex: e.day - 1, data: arrData ? arrData : [], dateString: val })
    }

    bookSLot = () => {
        const { active, data, dateString } = this.state;
        let obj = {
            bookingDate: dateString,
            bookingStartTime: data[active].startTime,
            bookingEndTime: data[active].endTime,
            userId: data[active].userId
        }
        this.props.dispatch(addBooking(obj, (res, data) => {
            if (res) {
                showErrorAlert("Slot Booked Successfully", "Success", () => {
                    let month = new Date().getMonth() + 1;
                    this.getUserSchedule(month)
                })
            }
        }))
    }

    render() {
        const { data, loading, active, dateString, calendarData, starttime } = this.state;
        const { isFetching } = this.props.slotReducer;
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Schedule video call"}
                    primaryAction={() => Navigation.back()}
                    style={{ borderBottomWidth: 0 }}
                />
                <Seperator />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[CommonStyles.container, { flex: 0 }]}
                >
                    <Label
                        label={"Please select a time slot according to your comfort."}
                        size={16}
                    />
                    {/* <CalendarComponent
                        changed={this.retrieveData}
                    /> */}
                    <CalendarComponent
                        changed={this.onDateChange}
                        onMonthChange={this.onMonthChange}
                        data={calendarData}
                    />
                    <Seperator />
                    <FlatList
                        data={data}
                        scrollEnabled={false}
                        renderItem={this.renderItem}
                        ListFooterComponent={() => <View style={{ height: 50 }} />}
                    />
                </ScrollView>
                <AppLoader visible={loading} />
                {active !== null ? <View style={[
                    { height: 100, backgroundColor: Colors.light, paddingHorizontal: containerPadding, justifyContent: 'space-between' },
                    CommonStyles.topshadow,
                    CommonStyles.topRounded,
                    CommonStyles.row
                ]}>
                    <View style={{ flex: 1 }}>
                        <Label label={dateString} bold size={18} />
                        <Label label={`${starttime}  • `} color={Colors.shade}>
                            <Label label={" 30m"} bold color={Colors.base} />
                        </Label>
                    </View>
                    <View style={{ flex: 1, }}>
                        <SubmitButtons
                            label={"Schedule for $4"}
                            dark
                            bold
                            action={this.bookSLot}
                            style={{ width: wide * 0.4 }}
                        />
                    </View>
                </View> : null}
                <AppLoader
                    visible={isFetching}
                />
            </SafeAreaView>
        )
    }
}




const styles = {
    container: {
        height: 50,
        borderWidth: 0.5,
        marginTop: 10,
        justifyContent: 'space-between',
        paddingHorizontal: containerPadding
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

export default connect(mapStateToProps)(UserScheduler);
