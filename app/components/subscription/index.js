import React, { Component, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SubmitButtons } from '../common/buttons'
import { IconButtons } from '../common/iconUtility'
import { Label } from '../common/label'
import { CommentInput } from '../feed/comments'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import { connect } from 'react-redux'
import { fetchUserSubscriptions, subscribeToPost } from '../../actions/subscription'
import AppUtils from '../../utils'
import { showErrorAlert } from '../../utils/info'
let plantype = [{
    title: "Basic",
    price: "10"
}, {
    title: "Standard",
    price: "15"
}, {
    title: "Premium",
    price: "20"
}]

const Tabs = ({ active, action, label }) => <TouchableOpacity onPress={action} style={[{ height: wide * 0.11, width: wide * 0.27, backgroundColor: active ? Colors.base : Colors.lightbase, borderRadius: wide * 0.11 / 2 }, CommonStyles.center]}>
    <Label
        label={label}
        color={active ? Colors.light : Colors.base}
        bold
        size={14}
    />
</TouchableOpacity>

const Plans = ({ active, onChange, ...props }) => {
    const [activePlan, onChangePlan] = useState(active)
    let size = wide * 0.15
    return <View style={[{ height: size, borderRadius: size / 2, width: "100%", alignSelf: 'center', backgroundColor: Colors.lightbase, justifyContent: "space-evenly", marginVertical: containerPadding }, CommonStyles.row]}>
        {props.data.map((item, index) => <Tabs
            action={() => { onChange(index), onChangePlan(index) }}
            active={activePlan == index}
            label={item.name}
        />)}
    </View>
}

const Price = ({ value }) => <View style={[{ height: wide * 0.14, backgroundColor: Colors.base, borderTopStartRadius: 11, borderTopEndRadius: 11, margin: 10 }, CommonStyles.center]}>
    <Label
        label={`$${value}/month`}
        color={Colors.light}
        bold
        style={{ fontWeight: "900" }}
        size={22}
    />
</View>

const DismissArea = ({ action }) => <TouchableOpacity
    activeOpacity={1}
    onPress={action}
    style={{ flex: 1 }}>

</TouchableOpacity>


const Content = ({ ...props }) => <View style={{ padding: containerPadding }}>
    <CommentInput style={[CommonStyles.center, { zIndex: 99 }]}>
        <Label
            label={"Subscription Plans"}
            size={18}
        />
        <IconButtons
            style={{ position: 'absolute', right: 10 }}
            name={Images.close}
            size={25}
            action={props.close}
        />
    </CommentInput>
    <View style={[{ padding: 10, marginTop: -10, borderBottomLeftRadius: containerPadding, borderBottomRightRadius: containerPadding }, CommonStyles.shadow]}>
        {props.loading ? <View style={[{ height: wide * 0.8, width: "100%" }, CommonStyles.center]}>
            <ActivityIndicator color={Colors.base} />
        </View> : <>
            <Plans {...props} />
            <View style={{ width: "100%", alignSelf: 'center', backgroundColor: Colors.lightbase, borderRadius: containerPadding - 6, paddingBottom: 8 }}>
                {AppUtils.exists(props.data[props.active]) && <Price value={props.data[props.active].price} />}
                <Label
                    label={"Tempor ipsum enim sit do officia irure. Esse reprehenderit labore.\n"}
                    style={{ width: "80%", textAlign: "center", alignSelf: "center", lineHeight: 25 }}
                    size={16}
                />
                <Label
                    label={"Non consequat proident anim ex consequat mollit duis sint nostrud laborum deserunt."}
                    color={Colors.shade}
                    size={16}
                    style={{ width: "80%", textAlign: "center", alignSelf: "center", lineHeight: 25 }}
                />
                <SubmitButtons
                    dark
                    label={"Subscribe"}
                    action={() => props.purchase(props.active)}
                />
            </View>
        </>}
    </View>
</View>

const SubscriptionModalContainer = ({ onClose, ById, onComplete, ...props }) => {

    useEffect(() => {
        props.dispatch(fetchUserSubscriptions(ById))
    }, [])
    const { otherSubscriptions } = props.data
    const [active, onChange] = useState(1)
    const { LoginData } = props.user
    const handlePurchase = (e) => {
        props.dispatch(subscribeToPost({
            "subscribedTo": ById,
            "subscribedFrom": LoginData._id,
            "subscriptionId": otherSubscriptions[active].id,
            "validTill": "10/10/2021"
        }, res => {
            if (res) {
                onComplete()
            }
            else {
                showErrorAlert("Subscription Failed", "Error", () => {
                    onClose()
                })
            }
        }))
    }
    const { isFetching } = props.reelReducer
    return <View style={{ flex: 1 }}>
        <DismissArea action={onClose} />
        <Content
            active={active}
            onChange={onChange}
            close={onClose}
            loading={isFetching}
            data={otherSubscriptions}
            purchase={handlePurchase}
        />
        <DismissArea action={onClose} />
    </View>
}




function mapStateToProps(state) {
    const { entities, reelReducer } = state
    return {
        data: entities.profile,
        user: entities.user,
        reelReducer
    }
}


export const SubscriptionModal = connect(mapStateToProps)(SubscriptionModalContainer);
