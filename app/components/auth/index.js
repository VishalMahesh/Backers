import React, { useRef, useState } from 'react'
import { LoginButtons, UserMode } from '../../constants/dummy'
import { SubmitButtons } from '../common/buttons'
import { View, TouchableOpacity } from 'react-native'
import { FormInputs } from '../common/inputs'
import { Label } from '../common/label'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { AppIcon } from '../common/iconUtility'

const AuthButtons = ({ action, signin }) => {
    var caption = `Sign ${signin ? "in" : "up"} with `
    return LoginButtons.map((item, index) => <SubmitButtons
        label={caption + item.label}
        action={() => action(index)}
        size={16}
        name={item.image}
    />)
}

const EmailOptions = ({ onForgot, signin, onSubmit }) => {
    const [email, onEmail] = useState("")
    const [password, onPassword] = useState("")
    const passwordRef = useRef(null)
    return <View style={{ flex: 1 }}>
        <FormInputs
            placeholder={"Email"}
            onClear={() => onEmail("")}
            value={email}
            onChangeText={(e) => onEmail(e)}
            returnKeyType={"next"}
            onSubmitEditing={() => passwordRef.current.focus()}
        />
        <FormInputs
            placeholder={"Password"}
            onClear={() => onPassword("")}
            value={password}
            onChangeText={(e) => onPassword(e)}
            returnKeyType={"go"}
            ref={passwordRef}
            secured
            onSubmitEditing={() => onSubmit(email, password)}
        />
        <SubmitButtons
            label={signin ? "Log in" : "Sign up"}
            dark
            bold
            action={() => onSubmit(email, password)}
        />
        {signin && <SubmitButtons
            label={"Forgot Password?"}
            lightTheme
            dark
            action={onForgot}
        />}
    </View>
}

const EmailInput = ({ label, placeholder, onChange, value, onRef, returnKeyType, onSubmitEditing }) => <>
    <Label
        label={label}
        size={16}
    />
    <FormInputs
        placeholder={placeholder}
        row
        onSubmitEditing={onSubmitEditing}
        onRef={onRef}
        returnKeyType={returnKeyType}
        onClear={() => onChange("")}
        value={value}
        onChangeText={(e) => onChange(e)}
    />
</>

const ModeButton = ({ label, icon, action, active }) => <TouchableOpacity onPress={action} style={[styles.modecontainer, CommonStyles.rounded, active && { borderColor: Colors.base, backgroundColor: Colors.lightbase }]}>
    <AppIcon
        name={icon}
        size={wide * 0.2}
        color={active ? Colors.base : Colors.dark}
    />
    <Label
        label={label}
        color={active ? Colors.base : Colors.dark}
    />
</TouchableOpacity>

const UserModeSetting = ({ onSet }) => {
    const [mode, onChange] = useState(0)
    return <View style={{ alignItems: 'center' }}>
        <Label
            label={"Are you a creator?"}
        />
        {UserMode.map((item, index) => <ModeButton
            label={item.label}
            icon={item.icon}
            active={mode == index}
            action={() => { onChange(index); onSet(index) }}
        />)}
    </View>
}


const styles = {
    modecontainer: {
        height: wide * 0.4,
        width: wide * 0.9,
        borderWidth: 2,
        borderColor: Colors.dark,
        marginVertical: wide * 0.02,
        alignItems: 'center',
        padding: containerPadding,
        justifyContent: 'space-evenly'
    }
}

export {
    AuthButtons,
    EmailOptions,
    EmailInput,
    UserModeSetting
}