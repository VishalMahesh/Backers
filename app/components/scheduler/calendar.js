import React, { useState } from 'react'
import { Colors } from '../../constants';
import { Calendar } from '../../lib/calendar/src';

const getColor = (selected, current) => {
    if (selected == current) {
        return Colors.base1
    }
    else {
        return Colors.light
    }
}


const CalendarComponent = ({ changed, onMonthChange, data = [] }) => {
    const [selected, setSelected] = useState(null);
    const onDayPress = day => {
        setSelected(day.dateString);
        changed(day)
    };
    let obj = data.reduce((c, v) => Object.assign(c, { [v]: { selected: true, marked: true, selectedColor: getColor(v, selected) } }), {})
    return <Calendar
        current={`${new Date().toISOString().slice(0, 10)}`}
        style={{ padding: 0, marginVertical: 20 }}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        minDate={new Date()}
        markedDates={{
            [`${new Date().toISOString().slice(0, 10)}`]: { marked: true, dotColor: Colors.base },
            [selected]: { selected: true, marked: true },
            ...obj
        }}
        firstDay={1}
    />
}

export {
    CalendarComponent
}