import React, { Component } from 'react'
import { View, SafeAreaView, FlatList, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { getReceivedAppreciation, getSentAppreciation } from '../../actions/profile'
import { AppIcon } from '../../components/common/iconUtility'
import { Label } from '../../components/common/label'
import NoData from '../../components/common/noData'
import { BlankSpace } from '../../components/common/seperator'
import { Colors, CommonStyles, containerPadding, wide } from '../../constants'
import Images from '../../constants/Images'
import Navigation from '../../lib/Navigation'
import AppLoader from '../../utils/Apploader'
import { AuthHeader } from '../../utils/Headers/CustomHeader'
import { LabelButtons } from '../messages'
import AppUtils from '../../utils'
let lab1 = "Your spendings this month";
let lab2 = "Your earnings this month";


const PaymentItem = ({ active, isSubs, data }) => <View style={[{ height: wide * 0.25, backgroundColor: Colors.lightbase, marginVertical: 8 }, CommonStyles.rounded, CommonStyles.row]}>
    <View style={[{ height: wide * 0.25, width: wide * 0.25, backgroundColor: active == 0 ? Colors.blue : Colors.green, overflow: 'hidden' }, CommonStyles.rounded]}>
        <ImageBackground style={[CommonStyles.full, CommonStyles.center]} source={active == 0 ? Images.payinmask : Images.payoutmask}>
            <Label
                label={`$${data.amount}`}
                bold
                size={24}
                color={Colors.light}
            />
            {console.log(data)}
            {isSubs && <Label
                label={"Basic Plan"}
                bold
                color={Colors.light}
            />}
        </ImageBackground>
    </View>
    <View style={{ padding: 10, height: "100%", justifyContent: 'space-around' }}>
        <View style={CommonStyles.row}>
            <AppIcon
                name={Images.calx}
                size={18}
                style={{ marginRight: 5 }}
            />
            <Label
                label={AppUtils.prettierDate(data.createdAt)}
            />
            {/* <AppIcon
                name={Images.more}
                size={18}
                style={{ marginRight: 5 }}
            />
            <AppIcon
                name={Images.calx}
                size={18}
                style={{ marginRight: 5 }}
            />
            <Label
                label={"21/02/2021"}
            /> */}
        </View>
        <View style={CommonStyles.row}>
            <AppIcon
                name={Images.profile}
                size={18}
                style={{ marginRight: 5 }}
            />
            <Label
                label={`@${data.sendTo.userName}`}
                style={{ textDecorationLine: "underline" }}
            />
        </View>
        <View style={CommonStyles.row}>
            <AppIcon
                name={Images.transfer}
                size={18}
                style={{ marginRight: 5 }}
            />
            <Label
                label={"21DCuy36836752bjdsdf543"}
            />
        </View>

    </View>
</View>

const CalculateTotal = (data) => {
    var sum = 0
    data.forEach(function (value, index, arry) {
        sum += value.amount;
    });
    return sum
}
class Payments extends Component {
    state = {
        active: 0,
        loading: true,
        page: 1,
        total: 0
    }

    componentDidMount() {
        this.webCall(0)
    }

    webCall = (ind) => {
        const { page } = this.state;
        if (ind == 0) {
            this.props.dispatch(getSentAppreciation(page, res => {
                this.handleTotal()
            }))
        }
        else {
            this.props.dispatch(getReceivedAppreciation(page, res => {
                this.handleTotal()
            }))
        }
    }

    handleTotal = () => {
        debugger
        const { active } = this.state;
        const { sentAppreciation, receivedAppreciation } = this.props.data
        var sum = null
        sum = (active == 0) ? CalculateTotal(sentAppreciation) : CalculateTotal(receivedAppreciation)
        this.setState({ loading: false, total: sum })
    }

    render() {
        const { active, loading, total } = this.state;
        const { sentAppreciation, receivedAppreciation } = this.props.data
        return (
            <SafeAreaView style={[CommonStyles.container, { padding: 0 }]}>
                <View style={styles.tabs}>
                    {["Sent", "Received"].map((item, index) => <LabelButtons
                        label={item}
                        action={() => this.setState({ active: index, total: index == 0 ? CalculateTotal(sentAppreciation) : CalculateTotal(receivedAppreciation) }, () => { this.webCall(index) })}
                        active={active == index}
                    />)}
                </View>
                <View style={CommonStyles.container}>
                    <View style={[styles.banner, CommonStyles.rounded, CommonStyles.center]}>
                        <Label
                            label={active == 0 ? lab1 : lab2}
                            size={18}
                            color={Colors.dark}
                        />
                        <Label
                            label={total}
                            size={48}
                            bold
                            color={active == 0 ? Colors.blue : Colors.green}
                        />
                    </View>
                    <BlankSpace />
                    <FlatList
                        data={active == 0 ? sentAppreciation : receivedAppreciation}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <PaymentItem
                            data={item}
                            active={active}
                            isSubs={false}
                        />}
                        ListEmptyComponent={<NoData />}
                    />
                </View>
                <AppLoader visible={loading} />
            </SafeAreaView>
        )
    }
}


function mapStateToProps(state) {
    const { entities, } = state
    return {
        data: entities.profile,
    }
}


export default connect(mapStateToProps)(Payments)


const styles = {
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: containerPadding
    },
    banner: {
        height: wide * 0.25,
        backgroundColor: Colors.lightbase
    }
}