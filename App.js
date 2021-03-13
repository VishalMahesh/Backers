import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SubscriptionModal } from './app/components/subscription'

export default class App extends Component {
  render() {
    return (
      <SubscriptionModal
        onClose={() => alert("test")}
      />
    )
  }
}
