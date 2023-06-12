import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import { DemandeDevis, Devis, DevisDetails, DevisList, PaiementDevis, PaiementISAGO, PayerUnDevis, RechercheCompteurISAGO } from '../../../../screens'
import { checking } from '../../../redux/actions/user.action'
import { Header } from '../../../../components'

const DevisStack: FC<{ route: any }> = ({ route }) => {
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
            <stack.Screen name="devis_home" component={Devis} options={{ title: "Devis", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="demande_devis" component={DemandeDevis} options={{ title: "Nouveau devis", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="devis_list" component={DevisList} options={{ title: "Liste de devis", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="devis_paiement" component={PaiementDevis} options={{ title: "Paiement devis", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="devis_details" component={DevisDetails} options={{ title: "Details du devis", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
            <stack.Screen name="payer_un_devis" component={PayerUnDevis} options={{ title: "Payer un devis", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} canGoBack={true} stack={true} /> }} />
        </stack.Navigator>

    )
}

export default DevisStack
const styles = StyleSheet.create({})

