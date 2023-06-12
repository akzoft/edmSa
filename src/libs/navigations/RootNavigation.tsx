import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './MainNavigation'
import { empty } from '../others/functions'
import AuthStack from './stacks/AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getAllFacture } from '../redux/actions/facture.action'
import { getAllISAGO } from '../redux/actions/isago.action'
import { getAllDevi } from '../redux/actions/devis.action'
import { getAllNotifications } from '../redux/actions/notification.action'
import { getAllCompteur, getAllCompteurClassic, getAllCompteurISAGO } from '../redux/actions/compteur.action'

const RootNavigation = () => {
    const { auth } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const stack = createNativeStackNavigator()


    useEffect(() => {
        if (auth) {
            dispatch(getAllFacture(auth?.id, auth?.accessToken))
            dispatch(getAllISAGO(auth?.id, auth?.accessToken))
            dispatch(getAllDevi(auth?.id, auth?.accessToken))
            dispatch(getAllNotifications(auth?.id, auth?.accessToken));

            dispatch(getAllCompteurClassic(auth?.id, auth?.accessToken));
            dispatch(getAllCompteurISAGO(auth?.id, auth?.accessToken));
            dispatch(getAllCompteur(auth?.id, auth?.accessToken));
        }
    }, [dispatch, auth])


    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    !empty(auth) ?
                        <stack.Screen name='main' component={MainNavigation} /> :
                        <stack.Screen name='auth' component={AuthStack} />}

            </stack.Navigator>
        </NavigationContainer>

    )
}

export default RootNavigation

const styles = StyleSheet.create({})