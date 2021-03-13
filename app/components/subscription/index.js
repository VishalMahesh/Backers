import React, { Component, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { SubmitButtons } from '../common/buttons'
import { IconButtons } from '../common/iconUtility'
import { Label } from '../common/label'
import { CommentInput } from '../feed/comments'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'

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

const Plans = ({ active, onChange }) => {
    const [activePlan, onChangePlan] = useState(active)
    let size = wide * 0.15
    return <View style={[{ height: size, borderRadius: size / 2, width: "100%", alignSelf: 'center', backgroundColor: Colors.lightbase, justifyContent: "space-evenly", marginVertical: containerPadding }, CommonStyles.row]}>
        {plantype.map((item, index) => <Tabs
            action={() => { onChange(index), onChangePlan(index) }}
            active={activePlan == index}
            label={item.title}
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
        <Plans {...props} />
        <View style={{ width: "100%", alignSelf: 'center', backgroundColor: Colors.lightbase, borderRadius: containerPadding - 6, paddingBottom: 8 }}>
            <Price value={plantype[props.active].price} />
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
            />
        </View>
    </View>
</View>

export const SubscriptionModal = ({ onClose }) => {
    const [active, onChange] = useState(1)
    return <View style={{ flex: 1 }}>
        <DismissArea action={onClose} />
        <Content active={active} onChange={onChange} close={onClose} />
        <DismissArea action={onClose} />
    </View>
}
