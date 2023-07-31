import { ActivityIndicator, Animated, FlatList, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAssistanceModel, ReadNotification, RootState, colors, css, deleteOneNotification, handleChangeMobile, sendAssistance } from '../../libs';
import { Overlay } from 'react-native-elements';
import { CustomLoader, NotificationCard } from '../../components';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { get_all_assistance_chats } from '../../libs/redux/actions/assistance.action';
import moment from 'moment';
import 'moment/locale/fr';

const Assistance: FC<any> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const dispatch = useDispatch<any>();
    const [error, setError] = useState('');
    const init: IAssistanceModel = { counter: '', type: '', message: '', latitude: '', longitude: '', customerId: '', }
    const { auth, user_loading } = useSelector((state: RootState) => state?.user)
    const { errors, assistances, assistance_loading } = useSelector((state: RootState) => state?.assistance)
    const [inputs, setInputs] = useState(init);
    const [click, setClick] = useState(false);
    const pickerRef = useRef<any>();
    const [typeAssistance, setTypeAssistance] = useState<any>("Type d'assistance 1");


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
    }, [fadeAnim, isFocused, assistance_loading, user_loading]);

    useEffect(() => {
        if (auth?.id) {
            dispatch(get_all_assistance_chats(auth?.id, auth?.accessToken))
        }
    }, [auth?.id, dispatch]);

    //display errors if exist
    useEffect(() => {
        if (((errors && errors !== null) || (error && error != ""))) { Toast.show({ type: 'error', text1: 'Informations', text2: error ? error : errors ? errors : '', }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])


    const handleSetLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permission de géolocalisation',
                    message: 'L\'application a besoin d\'accéder à votre position pour fonctionner.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Annuler',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // L'autorisation a été accordée, vous pouvez maintenant utiliser la géolocalisation
                Geolocation.getCurrentPosition(info => setInputs((old: any) => { return { ...old, longitude: info.coords.longitude, latitude: info.coords.latitude } }));
            } else {
                // L'autorisation a été refusée
                Geolocation.getCurrentPosition(info => setInputs((old: any) => { return { ...old, latitude: "", longitude: '' } }));
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleSendAssistance = () => {

        if (!inputs.latitude || inputs?.latitude === '') { setError('La latitude est requise.'); return; }
        if (!inputs.longitude || inputs?.longitude === '') { setError('La longitude est requise.'); return; }
        if (!inputs.counter || inputs?.counter === '') { setError('Le numéro de compteur est requis.'); return; }
        if (!inputs.message || inputs?.message === '') { setError('Le message ne doit passe être vide.'); return; }
        if (!typeAssistance || typeAssistance === '') { setError('Le type d\'assistance est requis.'); return; }

        if (auth) {
            inputs.customerId = auth?.id
            inputs.type = typeAssistance

            dispatch(sendAssistance(inputs, auth?.accessToken))
            setClick(true)
            setInputs(init)
        }
    }


    const SmallCard = ({ assist }: any) => {
        return (
            <>
                <View style={{ borderRadius: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 5, marginBottom: 25 }}>
                    <View style={{ width: '60%' }}>
                        <View style={{ flex: 1, borderRadius: 5, backgroundColor: '#DDD', padding: 5 }}>
                            <Text style={{ color: colors.black }}>{assist?.message}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end', width: '100%' }}>
                            <Text style={{ textAlign: 'right', fontSize: 12, marginRight: 10, color: colors.dark }}>{moment(assist?.updatedAt).fromNow()}</Text>
                        </View>
                    </View>
                    <FontAwesome name='user-circle' size={14} color={colors.black} />
                </View>
                {assist?.response &&
                    <View style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginBottom: 25 }}>
                        <FontAwesome name='user-circle' size={14} color={colors.info} />
                        <View style={{ width: '60%' }}>
                            <View style={{ flex: 1, borderRadius: 5, backgroundColor: colors.info, padding: 5 }}>
                                <Text style={{ color: colors.white }}>{assist?.response}</Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end', width: '100%' }}>
                                <Text style={{ textAlign: 'right', fontSize: 10, marginRight: 10, color: colors.dark }}>{moment(assist?.updatedAt).fromNow()}</Text>
                            </View>
                        </View>
                    </View >
                }
            </>

        )
    }

    if (!click && (assistance_loading || user_loading))
        return <CustomLoader />


    return (
        <Animated.View ref={viewRef} style={[styles.container, { opacity: fadeAnim, flex: 1 }]}>
            <View style={css.auth.toast}><Toast /></View>
            {/* <View style={[styles.content, { flex: 1, paddingTop: 15, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' }]}> */}
            <View style={{ height: '45%', paddingHorizontal: 20, paddingTop: 15 }}>


                {assistances?.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={assistances}
                        renderItem={({ item }) => <SmallCard assist={item} />}
                    /> :
                    <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: colors.main }}>Liste de demande d'assistance vide</Text>
                    </View>}
            </View>

            <View style={{ height: '55%', justifyContent: 'center', width: '100%', backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View style={{ paddingHorizontal: 20, justifyContent: 'center' }}>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', gap: 8 }}>
                            <View style={styles.inputbox}>
                                <Text style={styles.label}>Type d'assistance</Text>
                                <View style={[styles.input,]}>
                                    <Picker
                                        ref={pickerRef}
                                        selectedValue={typeAssistance}
                                        onValueChange={(val, i) => setTypeAssistance(val)} style={{ color: colors.dark }}>
                                        <Picker.Item label="Type d'assistance 1" value="Type d'assistance 1" />
                                        <Picker.Item label="Type d'assistance 2" value="Type d'assistance 2" />
                                        <Picker.Item label="Type d'assistance 3" value="Type d'assistance 3" />
                                    </Picker>
                                </View>


                            </View>

                            <View style={styles.inputbox}>
                                <Text style={styles.label}>N° Compteur</Text>
                                <TextInput style={[styles.input]} value={inputs.counter} onChangeText={text => handleChangeMobile('counter', text, setInputs)} />
                            </View>
                        </View>

                        <View style={[styles.form_item, { alignItems: "center", justifyContent: "center" }]}>
                            <View style={{ flex: 10 }}>
                                <Text style={styles.label}>Localisation (latitude,longitude)</Text>
                                <View style={[styles.input, { height: 48, justifyContent: "center" }]}>
                                    {inputs.latitude && <Text style={{ color: colors.dark }}>{inputs.latitude + ',' + inputs.longitude}</Text>}
                                </View>
                            </View>

                            <TouchableOpacity onPress={handleSetLocation} activeOpacity={0.7} style={{ backgroundColor: colors.main, alignItems: "center", justifyContent: "center", height: 48, width: 48, marginTop: 20, borderRadius: 5 }}>
                                <MaterialIcons name="my-location" size={28} color={colors.white} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputbox, { marginBottom: 0 }]}>
                            <Text style={styles.label} > Message</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%', gap: 10, borderWidth: 0.5, borderColor: colors.dark, padding: 4, borderRadius: 5 }}>
                                <TextInput multiline={true} numberOfLines={4} style={[styles.msginput, { flex: 1 }]} value={inputs.message} onChangeText={(text) => handleChangeMobile('message', text, setInputs)} />

                                <TouchableOpacity activeOpacity={0.8} onPress={handleSendAssistance} style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center' }}>
                                    {assistance_loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <FontAwesome name='send' size={20} color={colors.white} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* <TouchableOpacity activeOpacity={0.7} style={[styles.button]} >
<Text style={styles.button_text}>Envoyer</Text>
</TouchableOpacity> */}
                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>

        </Animated.View >
    )
}

export default Assistance

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", backgroundColor: colors.body, },
    content: { width: "100%", padding: 10, paddingHorizontal: 5, gap: 10, alignItems: "center" },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "30%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 18 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15, justifyContent: "center", gap: 10 },
    desc: { fontWeight: "300", textAlign: "justify", color: colors.dark },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 20 },
    inputbox: { marginVertical: 15, flex: 1 },
    input: { borderRadius: 5, paddingLeft: 15, color: colors.main, width: '100%', borderWidth: 0.5, borderColor: colors.dark, },
    msginput: { borderRadius: 5, paddingLeft: 15, color: colors.main, width: '100%' },
    label: { color: colors.dark },
    form_item: { flexDirection: "row", gap: 5, marginVertical: 5 },
    button: { width: '100%', borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center", marginTop: 20 },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white },
})