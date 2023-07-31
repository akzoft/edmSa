import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import { PaiementISAGO, RechercheCompteurISAGO } from '../../../../screens'
import { checking } from '../../../redux/actions/user.action'
import { Header } from '../../../../components'

const Isago: FC<{ route: any }> = ({ route }) => {
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
            <stack.Screen name="recherche_isago" component={RechercheCompteurISAGO} options={{ title: "ISAGO", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="resultat_isago" component={PaiementISAGO} options={{ title: "Crédit ISAGO", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
        </stack.Navigator>

    )
}

export default Isago
const styles = StyleSheet.create({})