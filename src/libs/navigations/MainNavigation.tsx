import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { Assistance, Notification } from '../../screens'
import { useDispatch } from 'react-redux'
import { colors } from '../others/typography'
import { checking } from '../redux/actions/user.action'
import HomeStack from './stacks/HomeStack'
import { Header } from '../../components'
import NotificationStack from './stacks/NotificationStack'


const CustomTabBar: FC<any> = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ backgroundColor: colors.white, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: 60, width: "88%", alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>
                {state.routes.map((route: { key: string | number; name: any }, index: React.Key | null | undefined) => {
                    const isFocused = state.index === index;
                    const { options } = descriptors[route.key]

                    const onPress = () => {
                        const e = navigation.emit({ type: "tabPress", target: route.key })
                        if (!isFocused && !e.defaultPrevented) navigation.navigate(route.name)
                    }
                    const color = isFocused ? colors.main : colors.black
                    return (
                        <TouchableOpacity key={index} onPress={onPress} testID={options.tabBarTestID} accessibilityRole='button'>
                            {index === 0 && (
                                <View style={styles.icon}>
                                    {isFocused ? <MaterialCommunityIcons name="home" size={40} color={color} /> :
                                        <MaterialCommunityIcons name="home-outline" size={40} color={color} />
                                    }
                                </View>
                            )}

                            {index === 1 && (
                                <View style={styles.middleIcon}>
                                    {isFocused ? <SimpleLineIcons name="earphones-alt" size={40} color={"white"} /> :
                                        <SimpleLineIcons name="earphones-alt" size={40} color={"white"} />
                                    }
                                </View>
                            )}

                            {index === 2 && (
                                <View style={styles.icon}>
                                    {isFocused ? <Ionicons name="ios-notifications" size={40} color={color} /> :
                                        <Ionicons name="ios-notifications-outline" size={40} color={color} />
                                    }
                                </View>
                            )}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const MainNavigation: FC<any> = ({ route }) => {
    const tab = createBottomTabNavigator()
    const dispatch = useDispatch<any>()
    const [isTabBarVisible, setIsTabBarVisible] = useState<boolean>(true);
    const [screen, setScreen] = useState<any>("")

    //checking authentification
    useEffect(() => { dispatch(checking()) }, [screen])

    useLayoutEffect(() => {
        if (route) setScreen(getFocusedRouteNameFromRoute(route))
    }, [route])


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
            () => {
                setIsTabBarVisible(false);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
            () => {
                setIsTabBarVisible(true);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    return (
        <tab.Navigator tabBar={(props) => (isTabBarVisible ? <CustomTabBar {...props} /> : null)} screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false }}>
            <tab.Screen name='acceuil' component={HomeStack} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ title: "Acceuil", tabBarHideOnKeyboard: true }} />
            <tab.Screen name='assistance' component={Assistance} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ title: "Assistance" }} />
            <tab.Screen name='notification_stk' component={NotificationStack} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ headerShown: false }} />
        </tab.Navigator>
    )
}

export default MainNavigation

const styles = StyleSheet.create({
    icon: {

    },
    middleIcon: {
        bottom: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: colors.red, justifyContent: "center", alignItems: "center", shadowColor: colors.red, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.6, elevation: 8
    }
})