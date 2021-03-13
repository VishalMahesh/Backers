import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchSubscriptions, updateSubscriptions } from '../../actions/subscription'
import { IconButtons } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import { BlankSpace } from '../../components/common/seperator'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import { TierPlans } from '../../constants/dummy'
import { Fonts } from '../../constants/fonts'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { showErrorAlert } from '../../utils/info'
import { Actions, Container } from './editSubscription'

const des = "You can edit all these settings and save. This will be the default plan a user gets subscribed to when he follows you."

const getHeader = (ind) => {
    if (ind == 0) {
        return "Free"
    }
    else if (ind == 1) {
        return "Basic"
    }
    else if (ind == 2) {
        return "Standard"
    }
    else {
        return "Premium"
    }
}

const TierOptions = ({ item, onchange }) => <View style={[CommonStyles.verticalMargin, { flexDirection: 'row' }]}>
    <View style={{ flex: 1, minHeight: wide * 0.1 }}>
        <Label
            label={item.label}
            size={16}
        />
        <Label
            label={item.desc}
            color={Colors.shade}
            style={{ maxWidth: '80%' }}
        />
    </View>
    <Actions activeVal={item.active} size={wide * 0.1} align={"flex-start"} Changed={onchange} />
</View>

const EditIcon = ({ action, color }) => <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end', }}>
    <IconButtons
        name={Images.editpen}
        style={{ alignItems: 'flex-end' }}
        action={action}
        color={color}
    />
</View>

const LabelInputs = ({ title, value, onChange, multi = false, number }) => {
    const [textVal, onChanges] = useState(value)
    return <View style={{ flex: 1, }}>
        <Label
            label={title}
            color={Colors.shade}
        />
        <TextInput
            value={textVal}
            multiline={multi}
            returnKeyType={'done'}
            keyboardType={number ? 'decimal-pad' : 'default'}
            onChangeText={(e) => { onChanges(e), onChange(e) }}
            style={{
                fontSize: 16,
                minHeight: 40,
                color: Colors.dark,
                fontFamily: Fonts.Regular,
            }}
        />
    </View>
}

const TierInputs = ({ onPriceSubmit, onDescSubmit, onNameSubmit, desc, price, tierName }) => {
    return <>
        <Container>
            <LabelInputs
                title={"Tier name"}
                value={tierName}
                number
                onChange={(e) => onNameSubmit(e)}
            />
            <EditIcon />
        </Container>
        <BlankSpace />
        <Container>
            <LabelInputs
                title={"Tier monthly price in $"}
                value={JSON.stringify(price)}
                number
                onChange={(e) => onPriceSubmit(e)}
            />
            <EditIcon
                color={Colors.shade}
            />
        </Container>
        <BlankSpace />
        <Container>
            <LabelInputs
                title={"Tier description"}
                value={desc}
                multi
                onChange={(e) => onDescSubmit(e)}
            />
            <EditIcon
                color={Colors.shade}
            />
        </Container>
        <BlankSpace />
    </>
}


const TierSetting = ({ ...props }) => {
    const [data, onChange] = useState([])
    const [price, onChangePrice] = useState("")
    const [desc, onChangeDesc] = useState("")
    const [name, onChangeName] = useState("")
    const { id, item, refresh, tiername } = props.navigation.state.params
    useEffect(() => {
        let arr = [...TierPlans]
        arr.forEach(e => {
            e.active = item[e.key]
        })
        onChange(arr)
    }, [])

    const handleChange = (e, ind) => {
        let arr = [...data]
        arr[ind].active = e
        onChange([...arr])
    }

    const saveSettings = () => {
        let obj = {}
        if (price !== "") {
            obj.price = price
        }
        if (desc !== "") {
            obj.description = desc
        }
        if (name !== "") {
            obj.displayName = name
        }
        props.dispatch(updateSubscriptions(item._id, data, obj, (res, msg) => {
            if (res) {
                showErrorAlert(msg, "Success", () => {
                    refresh()
                    Navigation.back();
                })
            }
            else {
                showErrorAlert(msg, "Error", () => {
                    Navigation.back();
                })
            }
        }))
    }

    return <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
        <AuthHeader
            label={`${getHeader(id)} Tier`}
            primaryAction={() => Navigation.back()}
            icon={Images.save}
            size={wide * 0.2}
            secondaryAction={saveSettings}
            iconstyle={{ width: wide * 0.2 }}
        />
        <ScrollView style={CommonStyles.container}>
            <Label
                label={des}
                size={16}
                style={{ marginBottom: containerPadding }}
            />
            {id != 0 && <TierInputs
                onPriceSubmit={(e) => onChangePrice(e)}
                onDescSubmit={e => onChangeDesc(e)}
                onNameSubmit={e => onChangeName(e)}
                price={item.price}
                desc={item.description}
                tierName={tiername}
            />}
            <FlatList
                data={data}
                renderItem={({ item, index }) => <TierOptions
                    item={item}
                    onchange={(w) => handleChange(w, index)}
                />}
            />
            <BlankSpace
                offset={wide * 0.3}
            />
        </ScrollView>
    </SafeAreaView>

}


function mapStateToProps(state) {
    const { entities, reelReducer } = state
    return {
        data: entities.profile,
        user: entities.user,
        reelReducer
    }
}


export default connect(mapStateToProps)(TierSetting)