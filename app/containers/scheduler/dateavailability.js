import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getSchedule, recurUpdateSlots } from '../../actions/slots'
import { IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { BlankSpace, Seperator } from '../../components/common/seperator'
import { CalendarComponent } from '../../components/scheduler/calendar'
import { MenuContainer } from '../../components/scheduler/menu'
import { TimeAvailability } from '../../components/scheduler/timeAvailability'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { DayTime, TimeData } from '../../constants/dummy'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import AppLoader from '../../utils/Apploader'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import AppUtils, { formatAMPM } from '../../utils'
import { showErrorAlert } from '../../utils/info'

let twoDigVal = (month) => {
    if (`${month}`.length == 2) {
        return `${month}`.slice(-2)
    }
    else {
        return "0" + `${month}`.slice(-2)
    }
}

const TimeMenu = ({ onadd, onDelete, startTime, endTime, onChange }) => <View style={[CommonStyles.row]}>
    <View style={[{ flex: 1, marginRight: containerPadding, justifyContent: 'space-between' }, CommonStyles.row]}>
        <MenuContainer
            Data={DayTime}
            onChange={(id) => onChange(id, true)}
            active={startTime}
            timeAvail
            style={{ width: wide * 0.3 }}
            containerstyle={{ height: wide, width: wide * 0.3 }}
        />
        <Label
            label={" - "}
        />
        <MenuContainer
            Data={DayTime}
            onChange={(id) => onChange(id, false)}
            active={endTime}
            timeAvail
            style={{ width: wide * 0.3 }}
            containerstyle={{ height: wide, width: wide * 0.3 }}
        />
    </View>
    <View style={[{ flex: 0.3, }, CommonStyles.row]}>
        <IconButtons
            name={Images.minussq}
            action={onDelete}
        />
        <IconButtons
            name={Images.plussq}
            action={onadd}
        />
    </View>
</View>

var activeDate = null

const getActiveDateTimeStamp = () => {
    var myDate = activeDate.split("-");
    var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    return newDate
}

const changeTSDate = (date) => {
    let a = formatAMPM(new Date(date))
    let b = AppUtils.timeSlotToTimestamp(a, getActiveDateTimeStamp())
    return b
}

class EditDate extends Component {

    state = {
        loading: false,
        slots: [],
        calendarData: [],
        date: null,
        selectedIndex: null,
        slotsdata: [],
        activeMonth: new Date().getMonth() + 1
    }

    componentDidMount() {
        const { activeMonth } = this.state;
        var a = new Date().toLocaleDateString();
        activeDate = a.split("/").join("-");
        this.getUserSchedule(activeMonth)
    }

    getUserSchedule = (month) => {
        const { LoginData } = this.props.User;
        let dateobj = new Date();
        let year = dateobj.getFullYear();
        let totaldays = new Date(year, month, 0).getDate()
        let userObj = {
            userId: LoginData._id,
            startDate: `01-${twoDigVal(month)}-${year}`,
            endDate: `${totaldays}-${twoDigVal(month)}-${year}`
        }
        this.props.dispatch(getSchedule(userObj, (res, data) => {
            if (res) {
                let arr = [...data];
                let arr2 = [];
                arr.forEach(item => {
                    if (Object.values(item)[0]) {
                        arr2.push(Object.keys(item)[0].split("-").reverse().join("-"))
                    }
                })
                this.setState({ calendarData: [...arr2], slotsdata: Object.values(arr), activeMonth: month, slots: [] })
            }
        }))
    }

    handleIndex = (slotid, index, start, prevSlots) => {
        const { slots, slotsdata, selectedIndex } = this.state;
        const { userSlots } = this.props.Data
        var mainkey = Object.keys(userSlots[selectedIndex])
        let arr = prevSlots ? [...slotsdata] : [...slots]
        if (arr[slotid].default) {
            if (start) {
                arr[slotid].startTime = AppUtils.timeSlotToTimestamp(index, getActiveDateTimeStamp())
            }
            else {
                arr[slotid].endTime = AppUtils.timeSlotToTimestamp(index, getActiveDateTimeStamp())
            }
            this.setState({ slots: [...arr] })
        }
        else {
            if (start) {
                arr[selectedIndex][mainkey][slotid].startTime = AppUtils.timeSlotToTimestamp(index, getActiveDateTimeStamp())
            }
            else {
                arr[selectedIndex][mainkey][slotid].endTime = AppUtils.timeSlotToTimestamp(index, getActiveDateTimeStamp())
            }
            this.setState({ slotsdata: [...arr] })
        }
    }

    addSlot = () => {
        const { userSlots } = this.props.Data
        const { slots, selectedIndex } = this.state
        var mainkey = Object.keys(userSlots[selectedIndex])
        let arr = [...slots]
        activeDate = mainkey[0];
        arr = arr.concat([{
            slotType: "once",
            slotDate: mainkey[0],
            startTime: AppUtils.timeSlotToTimestamp("12:00 PM", getActiveDateTimeStamp()),
            endTime: AppUtils.timeSlotToTimestamp("12:30 PM", getActiveDateTimeStamp()),
            duration: 30,
            default: true
        }])
        this.setState({ slots: [...arr] })
    }
    deleteSlot = (slotid, prevslot) => {

        const { slots, slotsdata, selectedIndex } = this.state;
        let arr = prevslot ? [...slotsdata] : [...slots]
        if (prevslot) {

            var mainkey = Object.keys(arr[selectedIndex])

            arr[selectedIndex][mainkey].splice(slotid, 1)

            this.setState({ slotdata: [...arr] })
        }
        else {

            arr.splice(slotid, 1)
            this.setState({ slots: [...arr] })
        }
    }

    onMonthChange = (obj) => {
        let tts = new Date(obj.dateString)
        let tt = new Date();
        // if (tt < tts) {
        this.getUserSchedule(obj.month)
        // }
    }

    submitSlots = () => {
        const { slots, slotsdata, selectedIndex, activeMonth } = this.state;
        let arr = [...slotsdata]
        let newslot = [...slots]
        var mainkey = Object.keys(arr[selectedIndex])
        let arr2 = arr[selectedIndex][mainkey]
        let allData = arr2 ? arr2.concat(newslot) : newslot
        let dataToPass = [];
        allData.forEach(item => {
            let obj = {
                "slotType": "once",
                "startTime": changeTSDate(item.startTime),
                "endTime": changeTSDate(item.endTime),
                "duration": 30
            }
            obj.slotDate = mainkey[0]
            dataToPass.push(obj)
        });
        this.props.dispatch(recurUpdateSlots(dataToPass, true, (status, msg) => {
            if (status) {
                setTimeout(() => {
                    showErrorAlert(msg, "Success", () => {
                        this.getUserSchedule(activeMonth)
                    })
                }, 200);
            }
            else {
                setTimeout(() => {
                    showErrorAlert("Slot creation failed", "Error")
                }, 200);
            }
        }))
    }

    handleChangedDate = (e) => {
        const { userSlots } = this.props.Data
        var mainkey = Object.keys(userSlots[e.day - 1])
        activeDate = mainkey[0];
    }

    render() {
        const { slots, calendarData, date, selectedIndex, slotsdata } = this.state;
        const { isFetching } = this.props.slotReducer
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Edit specific date"}
                    primaryAction={() => Navigation.back()}
                    secondaryAction={this.submitSlots}
                    style={{ borderBottomWidth: 0 }}
                    icon={Images.save}
                    size={wide * 0.2}
                    iconstyle={{ width: wide * 0.2 }}
                />
                <Seperator />
                <ScrollView style={CommonStyles.container}>
                    <Label
                        size={16}
                        label={"In case you want to edit hours for specific dates due to some conditions, you can edit it from down below & we will update calendar for upcoming week."}
                    />
                    <CalendarComponent
                        changed={(e) => {
                            this.setState({ date: e, selectedIndex: e.day - 1, slots: [] });
                            this.handleChangedDate(e)
                        }}
                        onMonthChange={this.onMonthChange}
                        data={calendarData}
                    />
                    <Seperator />
                    {date && <View style={{ marginVertical: containerPadding }}>
                        <Label
                            label={"What hours are you available ?"}
                            size={16}
                        />
                        {(Object.values(slotsdata[selectedIndex])[0] || slots.length > 0) ? <>
                            {(Object.values(slotsdata[selectedIndex])[0]) && <>
                                {Object.values(slotsdata[selectedIndex])[0].map((item, index) => <TimeMenu
                                    index={index}
                                    onadd={this.addSlot}
                                    onDelete={() => this.deleteSlot(index, true)}
                                    startTime={AppUtils.timeIndex(item.startTime)}
                                    endTime={AppUtils.timeIndex(item.endTime)}
                                    onChange={(id, isStart) => this.handleIndex(index, id, isStart, true)}
                                />)}
                            </>}
                            {slots.map((item, index) => <TimeMenu
                                index={index}
                                onadd={this.addSlot}
                                onDelete={() => this.deleteSlot(index, false)}
                                startTime={AppUtils.timeIndex(item.startTime)}
                                endTime={AppUtils.timeIndex(item.endTime)}
                                onChange={(id, isStart) => this.handleIndex(index, id, isStart, false)}
                            />)}
                        </> : <View style={[{ height: 100, }, CommonStyles.center]}>
                                <Label
                                    label={"No data found."}
                                />
                                <IconButtons
                                    name={Images.plus}
                                    size={30}
                                    action={this.addSlot}
                                />
                            </View>}
                    </View>
                    }
                    <BlankSpace
                        offset={wide * 0.4}
                    />
                </ScrollView>
                <AppLoader
                    visible={isFetching}
                />
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

export default connect(mapStateToProps)(EditDate);
// import React, { Component } from 'react'
// import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
// import { getSchedule } from '../../actions/slots'
// import { IconButtons } from '../../components/common/iconUtility'
// import { Label } from '../../components/common/label'
// import { BlankSpace, Seperator } from '../../components/common/seperator'
// import { CalendarComponent } from '../../components/scheduler/calendar'
// import { MenuContainer } from '../../components/scheduler/menu'
// import { TimeAvailability } from '../../components/scheduler/timeAvailability'
// import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
// import { DayTime, TimeData } from '../../constants/dummy'
// import Images from '../../constants/Images'
// import Navigation from '../../lib/Navigation'
// import AppLoader from '../../utils/Apploader'
// import { AuthHeader } from '../../utils/Headers/CustomHeader'
// import AppUtils from '../../utils'

// let twoDigVal = (month) => {
//     if (`${month}`.length == 2) {
//         return `${month}`.slice(-2)
//     }
//     else {
//         return "0" + `${month}`.slice(-2)
//     }

// }

// class EditDate extends Component {

//     state = {
//         loading: false,
//         slots: [
//             {
//                 id: 0,
//                 start: 0,
//                 end: 0
//             }
//         ],
//         calendarData: [],
//         slotsdata: [],
//         date: null,
//         selectedIndex: null
//     }

//     componentDidMount() {
//         let month = new Date().getMonth() + 1;
//         this.getUserSchedule(month)
//     }

//     getUserSchedule = (month) => {
//         const { LoginData } = this.props.User;
//         let dateobj = new Date();
//         let year = dateobj.getFullYear();
//         let totaldays = new Date(year, month, 0).getDate()
//         let userObj = {
//             userId: LoginData._id,
//             startDate: `01-${twoDigVal(month)}-${year}`,
//             endDate: `${totaldays}-${twoDigVal(month)}-${year}`
//         }
//         this.props.dispatch(getSchedule(userObj, (res, data) => {
//             if (res) {
//                 let arr = [...data];
//                 let arr2 = [];
//                 arr.forEach(item => {
//                     if (Object.values(item)[0]) {
//                         arr2.push(Object.keys(item)[0].split("-").reverse().join("-"))
//                     }
//                 })
//                 this.setState({ calendarData: [...arr2], slotsdata: Object.values(arr) })
//             }
//         }))
//     }

//     handleIndex = (slotid, index, start) => {
//         const { slots } = this.state;
//         let arr = [...slots]
//         if (start) {
//             arr[slotid].start = index
//         }
//         else {
//             arr[slotid].end = index
//         }
//         this.setState({ slots: [...arr] })
//     }

//     addSlot = () => {
//         const { slotsdata, selectedIndex } = this.state
//         let alldata = [...slotsdata]
//         var mainkey = Object.keys(alldata[selectedIndex])
//         let daydata = Object.values(alldata[selectedIndex])[0]
//         let arr = [...daydata]
//         arr = arr.concat([{
//             slotType: "once",
//             slotDate: mainkey[0],
//             startTime: "2021-02-21T22:00:00+05:30",
//             endTime: "2021-02-21T23:00:00+05:30",
//             duration: 30
//         }])
//         alldata[selectedIndex][mainkey] = [...arr]
//         this.setState({ slotsdata: [...alldata] })
//     }
//     deleteSlot = (slotid) => {
//          
//         const { slots } = this.state
//         let arr = [...slots]
//         arr.splice(slotid, 1)
//         this.setState({ slots: [...arr] })
//     }

//     onMonthChange = (obj) => {
//         let tts = new Date(obj.dateString)
//         let tt = new Date();
//         // if (tt < tts) {
//         this.getUserSchedule(obj.month)
//         // }
//     }

//     render() {
//         const { slotsdata, calendarData, date, selectedIndex, slots } = this.state;
//         const { isFetching } = this.props.slotReducer
//         const { userSlots } = this.props.Data
//         console.log(slotsdata);
//         console.log(slotsdata[selectedIndex]);
//         return (
//             <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
//                 <AuthHeader
//                     label={"Edit specific date"}
//                     primaryAction={() => Navigation.back()}
//                     style={{ borderBottomWidth: 0 }}
//                     icon={Images.save}
//                     size={wide * 0.2}
//                     iconstyle={{ width: wide * 0.2 }}
//                 />
//                 <Seperator />
//                 <ScrollView style={CommonStyles.container}>
//                     <Label
//                         size={16}
//                         label={"In case you want to edit hours for specific dates due to some conditions, you can edit it from down below & we will update calendar for upcoming week."}
//                     />
//                     <CalendarComponent
//                         changed={(e) => this.setState({ date: e, selectedIndex: e.day - 1 })}
//                         onMonthChange={this.onMonthChange}
//                         data={calendarData}
//                     />
//                     <Seperator />
//                     {date && <View style={{ marginVertical: containerPadding }}>
//                         <Label
//                             label={"What hours are you available ?"}
//                             size={16}
//                         />
//                         {Object.values(slotsdata[selectedIndex])[0] ? <>
//                             {Object.values(slotsdata[selectedIndex])[0].map((item, index) => <View style={[CommonStyles.row]}>
//                                 <View style={[{ flex: 1, marginRight: containerPadding, justifyContent: 'space-between' }, CommonStyles.row]}>
//                                     <MenuContainer
//                                         Data={DayTime}
//                                         onChange={(id) => this.handleIndex(index, id, true)}
//                                         active={AppUtils.timeIndex(item.startTime)}
//                                         style={{ width: wide * 0.3 }}
//                                         containerstyle={{ height: wide, width: wide * 0.3 }}
//                                     />
//                                     <Label
//                                         label={" - "}
//                                     />
//                                     <MenuContainer
//                                         Data={DayTime}
//                                         onChange={(id) => this.handleIndex(index, id, false)}
//                                         active={AppUtils.timeIndex(item.endTime)}
//                                         style={{ width: wide * 0.3 }}
//                                         containerstyle={{ height: wide, width: wide * 0.3 }}
//                                     />
//                                 </View>
//                                 <View style={[{ flex: 0.3, }, CommonStyles.row]}>
//                                     <IconButtons
//                                         name={Images.minussq}
//                                         action={() => this.deleteSlot(index)}
//                                     />
//                                     <IconButtons
//                                         name={Images.plussq}
//                                         action={this.addSlot}
//                                     />
//                                 </View>
//                             </View>)}
//                         </> : <View style={[{ height: 100, }, CommonStyles.center]}>
//                                 <Label
//                                     label={"No data found."}
//                                 />
//                                 <IconButtons
//                                     name={Images.plus}
//                                     size={30}
//                                 />
//                             </View>}
//                     </View>
//                     }
//                     <BlankSpace
//                         offset={wide * 0.4}
//                     />
//                 </ScrollView>
//                 <AppLoader
//                     visible={isFetching}
//                 />
//             </SafeAreaView>
//         )
//     }
// }


// function mapStateToProps(state) {
//     const { entities, slotReducer } = state;
//     return {
//         Data: entities.slot,
//         User: entities.user,
//         slotReducer
//     };
// }

// export default connect(mapStateToProps)(EditDate);
