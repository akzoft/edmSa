import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Forgot, Login, Verification, Validation, Reset, Register } from '../../../screens'
import { useDispatch } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { checking } from '../../redux/actions/user.action'

const AuthStack: FC<{ route: any }> = ({ route }) => {
    const autStack = createNativeStackNavigator()
    const dispatch = useDispatch<any>()
    const [screen, setScreen] = useState<any>("")

    useEffect(() => {
        dispatch(checking())
    }, [screen])

    useLayoutEffect(() => {
        if (route)
            setScreen(getFocusedRouteNameFromRoute(route))
    }, [route])


    return (
        <autStack.Navigator>
            <autStack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <autStack.Screen name="register" component={Register} options={{ headerShown: false }} />
            <autStack.Screen name="validation" component={Validation} options={{ headerShown: false }} />
            <autStack.Screen name="reset" component={Reset} options={{ headerShown: false }} />
            <autStack.Screen name="verification_forgot" component={Verification} options={{ headerShown: false }} />
            <autStack.Screen name="forgot" component={Forgot} options={{ headerShown: false }} />
        </autStack.Navigator>

    )
}

export default AuthStack
const styles = StyleSheet.create({})