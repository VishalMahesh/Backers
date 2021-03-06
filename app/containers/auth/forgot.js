import React, { useState } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { SubmitButtons } from '../../components/common/buttons'
import { FormInputs } from '../../components/common/inputs'
import { Label } from '../../components/common/label'
import { Colors, containerPadding } from '../../constants'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { EmailInput } from '../../components/auth'
const Forgot = () => {
    const [email, onEmail] = useState("")
    return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
        <AuthHeader
            label={"Find your account"}
            primaryAction={() => Navigation.back()}
        />
        <View style={{ flex: 1, padding: containerPadding }}>
            <EmailInput
                label={"Enter your registered email address"}
                onChange={(e) => onEmail(e)}
                value={email}
                submit={() => { }}
            />
        </View>
    </SafeAreaView>
}

export default Forgot