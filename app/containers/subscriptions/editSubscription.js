import React, { Component, useState } from 'react'
import { SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchMySubscriptions, fetchSubscriptions, fetchUserSubscriptions, updateSubscriptions } from '../../actions/subscription'
import { AppIcon, IconButtons } from '../../components/common/iconUtility'

import { Label } from '../../components/common/label'
import { BlankSpace } from '../../components/common/seperator'
import { Colors, CommonStyles } from '../../constants'
import { PredefinedSubscription } from '../../constants/dummy'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import AppLoader from '../../utils/Apploader'
import { AuthHeader } from '../../utils/Headers/CustomHeader'

export const Actions = ({ size = 34, align = "flex-end", activeVal = false, Changed }) => {
    const [active, onChange] = useState(activeVal)
    return <IconButtons
        name={active ? Images.on : Images.off}
        action={() => { onChange(!active), Changed(!active) }}
        size={size}
        style={[CommonStyles.noPadding, { justifyContent: align, height: 40 }]}
    />
}

export const Container = ({ ...props }) => <View style={[
    CommonStyles.rounded,
    CommonStyles.containerPadding,
    CommonStyles.verticalPadding,
    { backgroundColor: Colors.lightbase, flexDirection: 'row' }
]}>
    {props.children}
</View>


const getDisplayName = (title, displayName, ind, check) => {
    if (displayName && !ind == 0) {
        if (check) {
            return displayName + ' • $'
        }
        else {
            return displayName
        }
    }
    else {
        if (ind == 0) {
            return title
        }
        else {
            if (check) {
                return title + ' • $'
            }
            else {
                return title
            }
        }
    }
}

class EditSubscription extends Component {


    state = {
        data: []
    }

    componentDidMount() {
        this.webCall()
    }


    webCall = () => {
        this.props.dispatch(fetchMySubscriptions()).then(() => {
            const { userSubscriptions } = this.props.data
            let arr = []
            PredefinedSubscription.forEach(item => {
                let ObjInd = userSubscriptions.findIndex((e) => e.type == item.type);
                let obj = {}
                obj = { ...userSubscriptions[ObjInd], ...item }
                arr.push(obj)
            })
            this.setState({ data: [...arr] })
        })
    }

    handleActions = (ind, item, tiername) => {
        Navigation.navigate("TierSettings", { id: ind, item: item, refresh: this.webCall, tiername: tiername })
    }

    handleChange = (type, id,) => {
        this.props.dispatch(updateSubscriptions(id, false, { active: type }, res => {

        }))
    }

    renderItems = ({ item, index }) => <Container>
        <View style={{ flex: 1, }}>
            <Label
                label={index == 0 ? item.title : `${getDisplayName(item.title, item.displayName, index, true) + item.price}/m`}
                size={18}
            />
            <Label
                label={item.desc}
                style={{ lineHeight: 20 }}
                color={Colors.shade}
            />
        </View>
        <View style={{ flex: 0.2, justifyContent: 'space-between', alignItems: 'flex-end', }}>
            <IconButtons
                name={Images.editalt}
                size={24}
                style={{ justifyContent: 'flex-start', height: 40 }}
                action={() => this.handleActions(index, item, getDisplayName(item.title, item.displayName, index, false))}
            />
            <Actions activeVal={item.active} Changed={(e) => this.handleChange(e, item._id)} />
        </View>
    </Container>

    render() {
        const { isFetching } = this.props.reelReducer
        const { data } = this.state
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <AuthHeader
                    label={"Subscription tiers"}
                    primaryAction={() => Navigation.back()}
                />
                <View style={CommonStyles.container}>
                    <Label
                        label={"To get you started, we have defined some plans for you. You can edit this plans."}
                        size={16}
                        style={{ marginBottom: 20 }}
                    />
                    <FlatList
                        data={data}
                        renderItem={this.renderItems}
                        ItemSeparatorComponent={() => <BlankSpace />}
                    />
                </View>
                <AppLoader visible={isFetching} />
            </SafeAreaView>
        )
    }
}
function mapStateToProps(state) {
    const { entities, reelReducer } = state
    return {
        data: entities.profile,
        user: entities.user,
        reelReducer
    }
}


export default connect(mapStateToProps)(EditSubscription)