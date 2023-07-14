import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Forgot, Login, Verification, Validation, Reset, Register, Home, Devis, Infos, Actualite, Notification, DetailNotification } from '../../../screens'
import { useDispatch } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { checking } from '../../redux/actions/user.action'
import { Header } from '../../../components'
import Isago from './isago/Isago'
import Facture from './facture/Facture'
import DevisStack from './devis/DevisStack'

const NotificationStack: FC<{ route: any }> = ({ route }) => {
    const stack = createNativeStackNavigator()
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
        <stack.Navigator >
            <stack.Screen name='notification' component={Notification} options={{ headerShown: true, title: "Notifications", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} stack={true} /> }} />
            <stack.Screen name="detail_notif" component={DetailNotification} options={{ title: "Notification", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} stack={true} /> }} />
        </stack.Navigator>
    )
}

export default NotificationStack
const styles = StyleSheet.create({})