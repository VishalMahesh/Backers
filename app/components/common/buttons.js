import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Colors, CommonStyles, wide } from '../../constants'
import { AppIcon, IconButtons } from './iconUtility'
import FIcon from 'react-native-vector-icons/Foundation'
import { Label } from './label'
import Images from '../../constants/Images'
import AppUtils from '../../utils/index'

const PostButton = ({ icon, label, type, style, action, extras, active }) => <TouchableOpacity activeOpacity={0.5} onPress={action} style={[CommonStyles.buttons, styles.container, CommonStyles.row, !AppUtils.exists(label) && styles.subcont, style, active && { backgroundColor: Colors.base1 }]}>
    <IconButtons
        name={icon}
        size={18}
        type={type}
        key={active}
        color={active && Colors.base}
        action={action}
    />
    {extras && extras.map(item => <IconButtons
        name={item}
        size={18}
        active={active}
        type={type}
        style={{ width: 30 }}
        color={active && Colors.base}
        action={action}
    />)}
    {AppUtils.exists(label) && <Label
        label={label}
        style={{ textAlign: "center", alignSelf: "center" }}
        color={active && Colors.base}
    />}
</TouchableOpacity>

const TipButton = () => <TouchableOpacity style={[CommonStyles.tipButton, CommonStyles.center]}>
    <View style={[CommonStyles.buttons, CommonStyles.row]}>
        <AppIcon
            name={Images.dollar}
            size={18}
            style={{ marginRight: 10 }}
            color={Colors.light}
        />
    </View>
</TouchableOpacity>


const SubmitButtons = ({ action, name, label, dark, bold, size = 16, lightTheme, style }) => {
    if (!dark) {
        return <TouchableOpacity
            activeOpacity={0.5}
            style={[CommonStyles.submitBtn2, CommonStyles.row, CommonStyles.btnRounded, style]}
            onPress={action}>
            <AppIcon
                name={name}
                size={26}
                color={Colors.dark}
            />
            <Label
                label={label}
                color={Colors.dark}
                bold={bold}
                size={size}
                style={{ marginLeft: 10 }}
            />
        </TouchableOpacity>
    }
    else {
        return <TouchableOpacity
            activeOpacity={0.5}
            style={[CommonStyles.submitBtn, CommonStyles.btnRounded, CommonStyles.center, lightTheme && { backgroundColor: Colors.light }, style]}
            onPress={action}>
            <Label
                label={label}
                color={lightTheme ? Colors.base : Colors.light}
                bold={bold}
                size={size}
            />
        </TouchableOpacity>
    }
}

const styles = {
    container: {
        backgroundColor: Colors.lightbase,
        borderRadius: 20,
        height: 40,
        marginRight: 5,
    },
    subcont: {
        width: wide * 0.12,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export {
    PostButton,
    TipButton,
    SubmitButtons
}