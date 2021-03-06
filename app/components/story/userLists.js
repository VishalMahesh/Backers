import { Colors, containerPadding, wide } from "../../constants"
import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Avatar } from '../feed/comments'
import { Label } from "../common/label";
import Images from "../../constants/Images";
class UserLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 0
        };
    }

    handleUser = (index) => {
        this._slider1Ref.snapToItem(index)
        this.props.setData(index)
    }

    _renderItemWithParallax = ({ item, index }) => {
        const { user } = this.props;
        if (user == index) {
            return (
                <TouchableOpacity onPress={() => this.handleUser(index)} style={[styles.tab]}>
                    <View style={styles.active}>
                        <Avatar
                            source={Images.img}
                            size={40}
                        />
                        <View>
                            <Label
                                label={item.users.userName}
                                style={{ marginLeft: 5, width: wide * 0.16 }}
                                color={Colors.light}
                                numberOfLines={1}
                            />
                            <Label
                                label={"3 min ago"}
                                style={{ marginLeft: 5 }}
                                color={Colors.shade}
                                size={12}
                                numberOfLines={1}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity onPress={() => this.handleUser(index)} style={[styles.inactive, styles.tab]}>
                    <Avatar
                        size={60}
                        source={Images.img}
                    />
                </TouchableOpacity>
            );
        }
    }
    render() {
        const { data, user } = this.props;
        return (
            <View style={styles.bottomcont}>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={data}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={wide}
                    enableSnap
                    itemWidth={wide * 0.3}
                    firstItem={0}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    onSnapToItem={(index) => {
                        this.setState({ slider1ActiveSlide: index });
                        this.handleUser(index)
                    }}
                />
            </View>
        )
    }
}

export {
    UserLists
}

const styles = {
    bottomcont: {
        height: wide * 0.2,
        borderColor: Colors.light
    },
    tab: {
        height: wide * 0.18,
        width: wide * 0.25,
        paddingHorizontal: 5,
        alignSelf: 'center',
    },
    active: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center",
        backgroundColor: Colors.darkgrey, marginRight: -containerPadding, marginLeft: -containerPadding,
        borderRadius: (wide * 0.18 - 20) / 2
    },
    inactive: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}