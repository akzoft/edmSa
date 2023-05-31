import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RootState } from '../redux/Store'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './MainNavigation'
import { empty } from '../others/functions'
import AuthStack from './stacks/AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const RootNavigation = () => {
    const { auth } = useSelector((state: RootState) => state?.user)
    // const auth = { ok: "super" }
    const stack = createNativeStackNavigator()


    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
                {!empty(auth) ?
                    <stack.Screen name='main' component={MainNavigation} /> :
                    <stack.Screen name='auth' component={AuthStack} />}

            </stack.Navigator>
        </NavigationContainer>

    )
}

export default RootNavigation

const styles = StyleSheet.create({})