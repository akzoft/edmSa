import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { checking } from '../../../redux/actions/user.action'
import { Historique } from '../../../../screens'
import { Header } from '../../../../components'
import { RootState } from '../../../redux/Store'
import { getAllFacture } from '../../../redux/actions/facture.action'
import { getAllISAGO } from '../../../redux/actions/isago.action'
import { getAllDevi } from '../../../redux/actions/devis.action'


const HistoriqueStack: FC<{ route: any }> = ({ route }) => {
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
        <stack.Navigator screenOptions={{ headerShown: true }}>
            <stack.Screen name='historique' component={Historique} options={{ headerShown: true, title: "Historiques", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} stack={true} /> }} />
        </stack.Navigator>

    )
}

export default HistoriqueStack