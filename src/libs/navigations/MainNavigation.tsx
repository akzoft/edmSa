import { ActivityIndicator, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { Assistance, Historique, Notification, Parametre } from '../../screens'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../others/typography'
import { checking } from '../redux/actions/user.action'
import HomeStack from './stacks/HomeStack'
import NotificationStack from './stacks/NotificationStack'
import { RootState } from '../redux/Store'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HistoriqueStack from './stacks/historique/HistoriqueStack'
import { Header } from '../../components'



const CustomTabBar: FC<any> = ({ state, descriptors, navigation, screen }) => {
    const { notifications } = useSelector((state: RootState) => state?.notif)
    const [notif, setNotif] = useState(false);

    useEffect(() => {
        notifications?.some(notif => { (notif.readed === false) && setNotif(true) })
    }, [notifications, screen]);


    return (
        <View style={{ backgroundColor: colors.white, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: 60, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>
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
                                    {isFocused ? <MaterialIcons name="history" size={45} color={color} /> :
                                        <MaterialIcons name="history" size={45} color={color} />
                                    }
                                </View>

                            )}

                            {index === 1 && (
                                <View style={styles.icon}>
                                    {isFocused ? <SimpleLineIcons name="earphones-alt" size={35} color={color} /> :
                                        <SimpleLineIcons name="earphones-alt" size={35} color={color} />
                                    }
                                </View>

                            )}



                            {index === 2 && (
                                <View style={styles.middleIcon}>
                                    {isFocused ? <MaterialCommunityIcons name="home" size={40} color={colors.white} /> :
                                        <MaterialCommunityIcons name="home" size={40} color={colors.white} />
                                    }
                                </View>


                            )}

                            {index === 3 && (
                                <View style={styles.icon}>
                                    {isFocused ? <View>
                                        <Ionicons name="ios-notifications" size={38} color={color} />
                                        {notif && <View style={{ position: "absolute", height: 10, width: 10, borderRadius: 50, backgroundColor: colors.danger, right: 6, top: 2 }} />}
                                    </View> :
                                        <View>
                                            <Ionicons name="ios-notifications" size={38} color={color} />
                                            {notif && <View style={{ position: "absolute", height: 10, width: 10, borderRadius: 50, backgroundColor: colors.danger, right: 6, top: 2 }} />}
                                        </View>
                                    }
                                </View>
                            )}

                            {index === 4 && (
                                <View style={styles.icon}>
                                    {isFocused ? <FontAwesome5 name="cog" size={35} color={color} /> :
                                        <FontAwesome5 name="cog" size={35} color={color} />
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
        <tab.Navigator initialRouteName='acceuil' tabBar={(props) => (isTabBarVisible ? <CustomTabBar screen={screen} {...props} /> : null)} screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false }}>
            <tab.Screen name='historique_stk' component={HistoriqueStack} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ title: "Assistance" }} />
            <tab.Screen name='assistance' component={Assistance} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ title: "Assistance" }} />
            <tab.Screen name='acceuil' component={HomeStack} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ title: "Acceuil", tabBarHideOnKeyboard: true }} />
            <tab.Screen name='notification_stk' component={NotificationStack} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ headerShown: false }} />
            <tab.Screen name='parametres' component={Parametre} listeners={({ navigation, route }) => ({ tabPress: () => navigation.navigate(route.name) })} options={{ headerShown: true, title: "Parametre", header: ({ options, route, navigation }) => <Header title={options.title} route={route} navigation={navigation} stack={true} /> }} />
        </tab.Navigator>
    )
}

export default MainNavigation

const styles = StyleSheet.create({
    icon: {

    },
    middleIcon: {
        bottom: 20, width: 50, height: 50, borderRadius: 30, backgroundColor: colors.red, justifyContent: "center", alignItems: "center", shadowColor: colors.red, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.6, elevation: 8
    }
})