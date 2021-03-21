import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchMyBookedSubscriptions } from '../../actions/subscription'
import { containerPadding } from '../../constants'


const MySubscriptions = ({ ...props }) => {
    const [activePage, onChange] = useState(0)
    useEffect(() => {
        props.dispatch(fetchMyBookedSubscriptions())
    }, [])
    const { bookedSubscriptions } = props.data
    console.log(bookedSubscriptions);
    return (
        <View style={{ flex: 1, padding: containerPadding }}>
            <FlatList
                data={[1, 2, 2, 2, 2]}
                renderItem={() => <View style={{ height: 100, borderWidth: 1 }}>

                </View>}
            />
        </View>
    )
}

function mapStateToProps(state) {
    const { entities, reelReducer } = state
    return {
        data: entities.profile,
        user: entities.user,
        reelReducer
    }
}


export default connect(mapStateToProps)(MySubscriptions)