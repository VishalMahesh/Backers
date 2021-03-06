import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getSchedule, getUserRecurringSlots, recurUpdateSlots, setrecurringSlots } from '../../actions/slots'
import { Label } from '../../components/common/label'
import { Seperator } from '../../components/common/seperator'
import { TimeAvailability } from '../../components/scheduler/timeAvailability'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import AppUtils from '../../utils'
import { showErrorAlert } from '../../utils/info'
import AppLoader from '../../utils/Apploader'
import { initialSlots } from '../../constants/dummy'

let twoDigVal = (month) => {
    if (`${month}`.length == 2) {
        return `${month}`.slice(-2)
    }
    else {
        return "0" + `${month}`.slice(-2)
    }
}

const getSortedArray = (data) => {
    let arr = [...data];
    let arr2 = [];
    arr.forEach(item => {
        if (Object.values(item)[0]) {
            arr2.push(Object.values(item)[0])
        }
    })
    let arr3 = [].concat.apply([], arr2)
    var result = arr3.filter(function (a) {
        var key = a.day + '|' + a.startTime + '|' + a.endTime;
        if (!this[key]) {
            this[key] = true;
            return true;
        }
    }, Object.create(null));
    return result;
}


const getIfEmpty = (arr) => {

    let a = false
    for (i = 0; i < arr.length; i++) {
        if (arr[i].selected === true) {
            a = true;
            break;
        }
    }
    return a;
}


class AvailabilityEdit extends Component {

    state = {
        loading: true,
        newSlots: [],
        calendarData: [],
        recurData: [],
        mod: false,
    }


    componentDidMount() {
        let month = new Date().getMonth() + 1;
        this.getUserSchedule(month)
    }

    getUserSchedule = (month) => {
        const { LoginData } = this.props.User;
        let dateobj = new Date();
        let year = dateobj.getFullYear();
        let totaldays = new Date(year, month, 0).getDate()
        let data = {
            userId: LoginData._id,
            startDate: `01-${twoDigVal(month)}-${year}`,
            endDate: `${totaldays}-${twoDigVal(month)}-${year}`
        }
        this.props.dispatch(getUserRecurringSlots((res, resdata) => {
            if (res) {
                this.setState({
                    loading: false,
                    recurData: [...resdata],
                    newSlots: [...resdata],
                })
            }
        }))
    }
    handleSlots = (slots) => {
        this.setState({ newSlots: [...slots], mod: Images.save })
    }

    updateSlots = () => {
        const { newSlots } = this.state;
        let arr = [...newSlots];
        let arr2 = [];
        arr.forEach(item => {
            if (item.selected) {
                item.slots.forEach(val => {
                    let obj = {
                        slotType: "recurring",
                        startTime: AppUtils.timeSlotToTimestamp(val.startTime),
                        endTime: AppUtils.timeSlotToTimestamp(val.endTime),
                        day: item.title,
                        duration: 30
                    }
                    arr2.push(obj)
                });
            }
        });
        this.props.dispatch(recurUpdateSlots(arr2, false, (status, msg) => {
            if (status) {
                setTimeout(() => {
                    showErrorAlert(msg, "Success", () => {
                        let month = new Date().getMonth() + 1;
                        this.getUserSchedule(month)
                    })
                }, 200);
            }
            else {
                setTimeout(() => {
                    showErrorAlert("Slot creation failed", "Error", () => {

                    })
                }, 200);
            }
        }))
    }

    render() {
        const { recurData, loading, mod } = this.state;
        const { isFetching } = this.props.slotReducer
        const { recurSlots } = this.props.data;
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Edit Availability"}
                    primaryAction={() => Navigation.back()}
                    style={{ borderBottomWidth: 0 }}
                    icon={Images.save}
                    size={wide * 0.2}
                    secondaryAction={this.updateSlots}
                    iconstyle={{ width: wide * 0.2 }}
                />
                <Seperator />
                <View style={CommonStyles.container}>
                    <Label
                        size={16}
                        label={"Set the weekly hours you’re usually available to take video calls. Users will be shown slots of duration 30 minutes from these dates."}
                    />
                    {recurData.length > 0 && <TimeAvailability
                        slotdata={recurData}
                        updatedSlots={this.handleSlots}
                    />}
                </View>
                <AppLoader
                    visible={isFetching || loading}
                />
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    const { entities, slotReducer } = state
    return {
        data: entities.slot,
        User: entities.user,
        slotReducer
    }
}


export default connect(mapStateToProps)(AvailabilityEdit);
