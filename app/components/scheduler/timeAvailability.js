import React, { useState } from 'react'
import { View, Tiuchabl, FlatList } from 'react-native'
import { CommonStyles, containerPadding, wide } from '../../constants'
import { AvailabilityDates, DayTime, TimeData } from '../../constants/dummy'
import Images from '../../constants/Images'
import { IconButtons } from '../common/iconUtility'
import { Label } from '../common/label'
import { MenuContainer } from './menu'
import AppUtils from '../../utils'

const MenuForSlots = ({ item, ind, setTime, onadd, removeSlot, slotlength, index }) => {
    const [active, onActive] = useState(item.start)
    return <>
        <View style={styles.subcont}>
            <MenuContainer
                Data={DayTime}
                active={item.start}
                timeAvail
                style={styles.itemcont}
                onChange={(dateIndex) => { setTime(dateIndex, ind, index, true, DayTime[dateIndex], DayTime.slice(active + 1)[dateIndex]), onActive(dateIndex) }}
                containerstyle={styles.container}
            />
            <Label
                label={" - "}
            />
            <MenuContainer
                Data={DayTime}
                active={item.end}
                timeAvail
                style={styles.itemcont}
                onChange={(dateIndex) => setTime(dateIndex, ind, index, false, DayTime.slice(active)[dateIndex])}
                containerstyle={styles.container}
            />
            <View>
                {
                    slotlength > 1 && <IconButtons
                        name={Images.minussq}
                        size={20}
                        action={() => removeSlot(index, ind)}
                        style={styles.iconbtn}
                    />
                }
                <IconButtons
                    name={Images.plussq}
                    size={20}
                    action={onadd}
                    style={styles.iconbtn}
                />
            </View>
        </View>
    </>
}


const TimeItem = ({ item, index, action, onadd, setTime, removeSlot }) => {
    let slotlength = item.slots.length
    return <View style={styles.item}>
        <View style={[styles.selItem, slotlength > 1 && { paddingTop: 5 }]}>
            <IconButtons
                name={item.selected ? Images.checkon : Images.checkoff}
                action={() => action(item.selected, index)}
            />
            <Label
                label={item.name}
                size={16}
                style={{ marginTop: containerPadding * 1.2 }}
            />
        </View>
        <View pointerEvents={item.selected ? 'auto' : 'none'} style={{ flex: 1, opacity: item.selected ? 1 : 0.5 }}>
            {item.slots.map((item, ind) => <MenuForSlots
                item={item}
                ind={ind}
                setTime={setTime}
                slotlength={slotlength}
                onadd={onadd}
                removeSlot={removeSlot}
                index={index}
            />
            )}
        </View>
    </View>
}


const TimeAvailability = ({ slotdata, updatedSlots }) => {
    const [data, onChange] = useState(slotdata)

    const toggle = (check, index) => {
        let arr = [...data]
        arr[index].selected = !check
        onChange([...arr])
        updatedSlots([...arr])
    }

    const addSlot = (index) => {
        let arr = [...data]
        let slot = arr[index].slots
        let slotlen = slot.length
        arr[index].slots = slot.concat([{
            id: slotlen,
            start: 0,
            end: 0,
            startTime: "12:00 PM",
            endTime: "12:30 PM"
        }])
        onChange([...arr])
        updatedSlots([...arr])
    }

    const setTime = (time, slotid, index, start) => {
        let arr = [...data]
        let slot = arr[index].slots[slotid]
        if (start) {
            slot.start = AppUtils.timeIndex(AppUtils.timeSlotToTimestamp
                (time));
            slot.startTime = time
        }
        else {
            slot.end = AppUtils.timeIndex(AppUtils.timeSlotToTimestamp
                (time));
            slot.endTime = time
        }
        onChange([...arr])
        updatedSlots([...arr])
    }

    deleteSlot = (index, slotid) => {
        let arr = [...data]
        let slot = arr[index].slots
        slot.splice(slotid, 1)
        onChange([...arr])
        updatedSlots([...arr])
    }

    return <View style={CommonStyles.row, { marginVertical: containerPadding }}>
        <FlatList
            data={data}
            renderItem={({ item, index }) => <TimeItem
                item={item}
                index={index}
                setTime={setTime}
                action={toggle}
                onadd={() => addSlot(index)}
                removeSlot={deleteSlot}
            />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View
                style={{ height: wide * 0.3 }}
            />}
        />
    </View>
}

const styles = {
    item: [
        CommonStyles.row,
        {
            minHeight: wide * 0.2
        }
    ],
    iconbtn: {
        height: 30, width: 30
    },
    container: {
        width: wide * 0.3, height: wide
    },
    itemcont: {
        width: wide * 0.28
    },
    subcont: [
        {
            flex: 1,
            justifyContent: 'space-around',
            maxHeight: wide * 0.17,
        },
        CommonStyles.row
    ],
    selItem: {
        flex: 0.3,
        height: "100%",
        flexDirection: 'row',
        paddingTop: 10
    }
}

export {
    TimeAvailability
}