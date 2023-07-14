import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import { ListeFacture, PaiementFacture, RechercheFacture } from '../../../../screens'
import { checking } from '../../../redux/actions/user.action'
import { Header } from '../../../../components'

const Facture: FC<{ route: any }> = ({ route }) => {
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
            <stack.Screen name="recherche_facture" component={RechercheFacture} options={{ title: "Facture POST PAID", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="liste_facture" component={ListeFacture} options={{ title: "Liste de factures", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="paiement_facture" component={PaiementFacture} options={{ title: "Paiement facture", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
        </stack.Navigator>

    )
}

export default Facture
const styles = StyleSheet.create({})