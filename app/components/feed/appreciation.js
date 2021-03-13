import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text, KeyboardAvoidingView, FlatList, Keyboard } from 'react-native'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import { PostButton, SubmitButtons } from '../common/buttons'
import { AppIcon, IconButtons } from '../common/iconUtility'
import { FormInputs } from '../common/inputs'
import { Label } from '../common/label'
import { OrSeperator } from '../common/seperator'

const CloseArea = ({ action }) => <TouchableOpacity style={{ flex: 1 }} onPress={action}>

</TouchableOpacity>


const CaptionButton = [
    {
        id: 0,
        icon: Images.cookie,
        value: 4
    },
    {
        id: 0,
        icon: Images.coffee,
        value: 6
    },
    {
        id: 0,
        icon: Images.cookie,
        icon1: Images.add,
        icon2: Images.coffee,
        value: 10
    },
]

const ModalBox = ({ mainLabel, icon, description, btnlabel, onSubmit, closeModal, btncolor = Colors.base, ...props }) => <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
    <CloseArea action={closeModal} />
    <View style={styles.light}>
        <Image
            style={{ height: wide * 0.15, width: wide * 0.15, margin: containerPadding }}
            resizeMode="contain"
            source={icon}
        />
        <Label
            label={mainLabel}
            size={18}
            style={{ marginBottom: containerPadding }}
        />
        <Label
            label={description}
            size={16}
            style={{ textAlign: 'center' }}
            color={Colors.shade}
        />
        {props.children}
        <SubmitButtons
            dark
            label={btnlabel}
            bold
            style={{ backgroundColor: btncolor }}
            action={onSubmit}
        />
    </View>
    <CloseArea action={closeModal} />
</KeyboardAvoidingView>

// const ScrollButtons = ({ data, width, icon, action, activeItem }) => {
//     const [count, onCount] = useState(1)

//     const handleCount = () => {
//         if (activeItem) {
//             onCount(count + 1)
//         }
//         else {
//             action()
//             onCount(1)
//         }
//     }

//     return <View style={[{ height: 40, width: width, backgroundColor: activeItem ? Colors.base1 : Colors.lightbase, borderRadius: 20, marginHorizontal: 5 }]}>
//         <TouchableOpacity activeOpacity={0.5} onPress={handleCount} style={[{ height: 40, width: width, justifyContent: 'center', justifyContent: 'space-evenly', position: 'relative' }, CommonStyles.row]}>
//             <AppIcon
//                 name={icon}
//                 size={18}
//                 color={activeItem ? Colors.base : Colors.dark}
//             />
//             <Label
//                 label={`$ 6`}
//                 color={activeItem ? Colors.base : Colors.dark}
//             />
//             {activeItem && <View style={[{ position: 'absolute', bottom: -containerPadding + 5, right: containerPadding - 10, height: 20, width: 20, backgroundColor: Colors.base1, borderRadius: 10, borderWidth: 1, borderColor: Colors.base }, CommonStyles.center]}>
//                 <Label
//                     label={`x${count}`}
//                     size={10}
//                     color={Colors.base}
//                 />
//             </View>}
//         </TouchableOpacity>
//     </View>
// }

const DonateButton = ({ active, count, show, ...props }) => {
    return <View style={{ position: 'relative' }}>
        {props.children}
        {active && <View style={[{ position: 'absolute', bottom: -containerPadding + 5, right: containerPadding - 10, height: 20, width: 20, backgroundColor: Colors.base1, borderRadius: 10, borderWidth: 1, borderColor: Colors.base }, CommonStyles.center]}>
            <Label
                label={`x${count}`}
                size={10}
                color={Colors.base}
            />
        </View>}
        {show && active && <AppIcon
            name={Images.tap}
            size={20}
            color={Colors.base}
            style={{ position: 'absolute', bottom: -10, alignSelf: 'center' }}
        />}
    </View>
}

const IncButton = ({ action, icon }) => <TouchableOpacity
    activeOpacity={0.5}
    onPress={action}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    style={styles.button}>
    <AppIcon
        name={icon}
        size={12}
        color={Colors.base}
    />
</TouchableOpacity>

const Caption = ({ icon, icon1, icon2, value, color }) => <View style={[{ flex: 1, justifyContent: 'space-evenly' }, CommonStyles.row]}>
    <View style={CommonStyles.row}>
        <AppIcon
            name={icon}
            size={25}
            color={color}
        />
        {icon1 && <AppIcon
            name={icon1}
            size={25}
            color={color}
        />}
        {icon2 && <AppIcon
            name={icon2}
            size={25}
            color={color}
        />}
    </View>
    <Label
        label={`$${value}`}
        size={16}
        color={color}
        style={{ marginRight: 5 }}
    />
</View>

const Appreciation = ({ onClose }) => {
    const [active, onChange] = useState(0)
    const [count, onCount] = useState(1)
    const [inputVal, onChangeInput] = useState("0")
    const activePrice = () => {
        if (active !== null) {
            return `${CaptionButton[active].value * count}`
        }
        else {
            return inputVal
        }
    }

    const handleInput = (e) => {
        if (e == "") {
            onChangeInput("4")
            onChange(0)
        }
        else {
            onChangeInput(e)
            onChange(null)
        }
    }

    return <ModalBox
        mainLabel={"Send appreciation"}
        onSubmit={onClose}
        closeModal={onClose}
        icon={Images.appreciation}
        btnlabel={`Send appreciation for $${activePrice()}`}
        description={"To your lovable creators"}
    >
        <View style={[CommonStyles.row, { paddingVertical: containerPadding }]}>
            {CaptionButton.map((item, index) => {
                return <>
                    {index == active && <View style={styles.btncont}>
                        <IncButton
                            icon={Images.plussq}
                            action={() => onCount(count + 1)}
                        />
                        <IncButton
                            icon={Images.minussq}
                            action={() => {
                                if (count !== 1) {
                                    onCount(count - 1)
                                }
                            }}
                        />
                    </View>}
                    <TouchableOpacity
                        onPress={() => { onChange(index); onChangeInput("0"); Keyboard.dismiss() }}
                        activeOpacity={0.5}
                        style={[
                            styles.captionbtn,
                            {
                                width: index == 2 ? wide * 0.3 : wide * 0.2,
                                backgroundColor: index == active ? Colors.base1 : Colors.lightbase
                            }
                        ]}>
                        <Caption
                            icon={item.icon}
                            icon1={item.icon1}
                            icon2={item.icon2}
                            value={item.value}
                            color={index == active ? Colors.base : Colors.darkgrey}
                        />
                        {active == index && <View style={[{ position: 'absolute', bottom: -containerPadding + 5, right: containerPadding - 10, height: 24, width: 24, backgroundColor: Colors.base, borderRadius: 12 }, CommonStyles.center]}>
                            <Label
                                label={`x${count}`}
                                size={10}
                                bold
                                color={Colors.light}
                            />
                        </View>}
                    </TouchableOpacity>
                </>
            })}
        </View>
        <OrSeperator />
        <View style={{ height: wide * 0.12, width: wide * 0.9, alignItems: 'center' }}>
            <FormInputs
                type="comment"
                style={{ height: 40 }}
                onChangeText={handleInput}
                onFocus={() => { onChange(null); onChangeInput("0") }}
                appreciation
                placeholder={"Donate a custom amount"}
            />
        </View>
    </ModalBox>

}

const styles = {
    light: [
        {
            backgroundColor: Colors.light,
            padding: containerPadding,
            margin: containerPadding
        },
        CommonStyles.rounded,
        CommonStyles.horizontalCenter
    ],
    btncont: [
        {
            width: 30,
            height: 50,
            justifyContent: 'space-around',
            alignItems: 'center'
        }],
    button: [
        {
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: Colors.base1
        },
        CommonStyles.center
    ],
    captionbtn: {
        height: 50,
        borderRadius: 25,
        marginHorizontal: 5,
        position: 'relative'
    }

}

export {
    Appreciation,
    ModalBox
}