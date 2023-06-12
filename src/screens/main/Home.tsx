import { ActivityIndicator, Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Octicons from "react-native-vector-icons/Octicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { RootState, colors, css, deconnexion, getAllActualites, getAllInformations, images } from '../../libs'
import { ActualitySwiper, HomeCard } from '../../components'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const Home = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useDispatch<any>();
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const { auth } = useSelector((state: RootState) => state?.user)

    useEffect(() => {
        if (auth) {
            dispatch(getAllInformations(auth?.accessToken))
            dispatch(getAllActualites(auth?.accessToken))
        }
    }, [auth, dispatch])

    //fade in animation
    useEffect(() => {
        if (isFocused) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim, isFocused]);



    const handleDisconnect = () => {
        dispatch(deconnexion())
    }


    return (
        <Animated.View ref={viewRef} style={[css.home.container, { opacity: fadeAnim, flex: 1 }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
            <View style={[css.home.content]}>

                <View style={css.home.infos}>
                    <View style={css.home.linebox}>
                        <View style={css.home.line} />
                    </View>

                    <View style={css.home.info_card}>
                        <View style={css.home.info_card_texts}>
                            <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: colors.white }}><Image source={images.profile_avatar} style={{ width: "100%", height: "100%", resizeMode: "cover" }} /></View>
                            <View>
                                <Text style={css.home.name}>{auth?.name?.slice(0, 20)}{auth?.name && auth?.name?.length > 20 && "..."}</Text>
                                <Text style={css.home.sub_name}>{auth?.phone}</Text>
                                <Text style={css.home.sub_name}>{auth?.email || auth?.username}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                            <Entypo name="dots-three-vertical" color={colors.dark} size={20} />
                        </TouchableOpacity>


                        {showModal &&
                            <TouchableWithoutFeedback onAccessibilityAction={() => setShowModal(false)} >
                                <View style={styles.modal}>
                                    <TouchableOpacity style={{ padding: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <FontAwesome5 name="user-edit" size={20} />
                                        <Text>Modifier</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDisconnect} style={{ padding: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <AntDesign name="logout" size={20} />
                                        <Text>Déconnexion</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={css.home.swiper_container}>
                        <ActualitySwiper />
                    </View>
                    <View style={{ height: 20 }} />

                    <View style={css.home.cards}>
                        <HomeCard link='facture' Component={MaterialCommunityIcons} icon='cellphone-check' iconSize={40} title={'Facture'} style={css.home.home_card_container} />
                        <HomeCard link='isago' Component={Fontisto} icon='list-2' iconSize={40} title={'ISAGO'} style={css.home.home_card_container} type='isago' />
                        <HomeCard link='devis' Component={Fontisto} icon='list-2' iconSize={40} title={'Devis'} style={css.home.home_card_container} />
                        <HomeCard link='historique_stk' Component={Octicons} icon='history' iconSize={40} title={'Historique'} style={css.home.home_card_container} />
                        <HomeCard link='actualite' Component={Entypo} icon='calendar' iconSize={40} title={'Actualité'} style={css.home.home_card_container} />
                        <HomeCard link='infos' Component={Ionicons} icon='information' iconSize={40} title={'Infos'} style={css.home.home_card_container} type='info' />
                    </View>
                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        </Animated.View>
    )
}

export default Home

const styles = StyleSheet.create({
    modal: { position: "absolute", backgroundColor: colors.white, borderWidth: 1, borderColor: colors.main, width: 200, height: 100, right: 25, borderRadius: 5 }
})