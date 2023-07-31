import { ActivityIndicator, Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home: FC<any> = ({ navigation }) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useDispatch<any>();
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const { auth, edm_news, edm_actus } = useSelector((state: RootState) => state?.user)


    useEffect(() => {
        if (auth) {
            AsyncStorage.getItem('quartierId').then((res: any) => {
                const quarterId = JSON.parse(res)
                dispatch(getAllInformations(quarterId, auth?.accessToken))
            }).catch(err => console.log(err))
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

    useEffect(() => {
        if (edm_news === undefined) {
            navigation.navigate('infos')
            dispatch({ type: 'reset_edm_news' })
        }

        if (edm_actus === undefined) {
            navigation.navigate('actualite')
            dispatch({ type: 'reset_edm_actus' })
        }
    }, [edm_news, edm_actus, dispatch, navigation]);


    const handleDisconnect = () => {
        dispatch(deconnexion())
    }



    return (
        <Animated.View ref={viewRef} style={[css.home.container, { opacity: fadeAnim, flex: 1 }]}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
            <TouchableOpacity onPress={() => setShowModal(false)} activeOpacity={1} style={[css.home.content]}>

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
                                    <TouchableOpacity onPress={() => { navigation.navigate('parametres', { openUserEditForm: true }); setShowModal(false) }} style={{ padding: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <FontAwesome5 name="user-edit" size={20} color={colors.black} />
                                        <Text style={{ color: colors.black }} >Modifier</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDisconnect} style={{ padding: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <AntDesign name="logout" size={20} color={colors.black} />
                                        <Text style={{ color: colors.black }}>Déconnexion</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
                <View style={{ height: 28 }} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={css.home.swiper_container}>
                        <ActualitySwiper setShowModal={setShowModal} />
                    </View>
                    <View style={{ height: 20 }} />

                    <View style={css.home.cards}>
                        <HomeCard type='facture' link='facture' Component={MaterialCommunityIcons} setShowModal={setShowModal} icon='cellphone-check' iconSize={40} title={'Factures'} style={css.home.home_card_container} />
                        <HomeCard type='isago' link='isago' Component={Fontisto} setShowModal={setShowModal} icon='list-2' iconSize={40} title={'ISAGO'} style={css.home.home_card_container} />
                        <HomeCard type='devis' link='devis' Component={Fontisto} setShowModal={setShowModal} icon='list-2' iconSize={40} title={'Devis'} style={css.home.home_card_container} />
                        <HomeCard type='historique' link='historique_stk' Component={Octicons} setShowModal={setShowModal} icon='history' iconSize={40} title={'Historiques'} style={css.home.home_card_container} />
                        <HomeCard type='actualite' link='actualite' Component={Entypo} setShowModal={setShowModal} icon='calendar' iconSize={40} title={'Actualités'} style={css.home.home_card_container} />
                        <HomeCard type='info' link='infos' Component={Ionicons} setShowModal={setShowModal} icon='information' iconSize={40} title={'Infos'} style={css.home.home_card_container} />
                    </View>
                    <View style={{ height: 60 }} />
                </ScrollView>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default Home

const styles = StyleSheet.create({
    modal: { position: "absolute", backgroundColor: colors.white, borderWidth: 1, borderColor: colors.main, width: 200, height: 100, right: 25, borderRadius: 5 }
})