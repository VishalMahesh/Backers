import React from 'react'
import { View, Text } from 'react-native'
import Chats from '../../components/messages/chats'
const ChatRoom = (props) => {
    return (
        <Chats {...props} />
    )
}

export default ChatRoom
