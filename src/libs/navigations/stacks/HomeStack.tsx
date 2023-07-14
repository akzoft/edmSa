import { StyleSheet, } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Infos, Actualite } from '../../../screens'
import { useDispatch, } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { checking } from '../../redux/actions/user.action'
import { Header } from '../../../components'
import Isago from './isago/Isago'
import Facture from './facture/Facture'
import DevisStack from './devis/DevisStack'


const HomeStack: FC<{ route: any }> = ({ route }) => {
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
            <stack.Screen name="home" component={Home} options={{ title: "Accueil", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} /> }} />
            <stack.Screen name="isago" component={Isago} options={{ headerShown: false, }} />
            <stack.Screen name="facture" component={Facture} options={{ headerShown: false, }} />
            <stack.Screen name="devis" component={DevisStack} options={{ headerShown: false, }} />
            <stack.Screen name="infos" component={Infos} options={{ title: "Informations", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} stack={true} /> }} />
            <stack.Screen name="actualite" component={Actualite} options={{ title: "Actualités", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} stack={true} /> }} />
        </stack.Navigator>

    )
}

export default HomeStack
const styles = StyleSheet.create({})