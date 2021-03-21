import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList } from 'react-native'
import { CommonStyles, containerPadding, wide } from '../../constants'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { LabelButtons } from '../messages'
import Payments from '../payment/payment'
import ScheduledCalls from '../scheduler/scheduledCalls'
import MySubscriptions from '../subscriptions/mySubscriptions'

export default class MyBooking extends Component {
    state = {
        active: 0,
        mount: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ mount: true })
        }, 50);
    }

    handleActions = (ind) => {
        // this.flatlist_ref.scrollToIndex({
        //     animated: true,
        //     index: ind
        // })
        this.setState({ active: ind })
    }

    onViewableItemsChanged = ({ viewableItems }) => {
        this.setState({ active: viewableItems[0].index })
    }

    // renderItem = ({ item, index }) => {
    //     return <View style={{ width: wide }}>
    //         {index == 0 && <ScheduledCalls />}
    //         {index == 1 && <MySubscriptions />}
    //         {index == 2 && <Payments />}
    //     </View>
    // }

    render() {
        const { active, mount } = this.state
        return (
            <SafeAreaView style={[CommonStyles.container, CommonStyles.noPadding]}>
                <AuthHeader
                    label={"My Bookings"}
                    primaryAction={() => Navigation.back()}
                />
                {<View style={styles.subcont}>
                    {["Video Call", "Subscription", "Appreciation"].map((item, index) => <LabelButtons
                        label={item}
                        active={active == index}
                        action={() => this.handleActions(index)}
                    />)}
                </View>}
                {active == 0 && <ScheduledCalls />}
                {active == 1 && <MySubscriptions />}
                {active == 2 && <Payments />}
            </SafeAreaView>
        )
    }
}


const styles = {
    subcont: {
        flexDirection: 'row',
        paddingHorizontal: containerPadding,
    },
}