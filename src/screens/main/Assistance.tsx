import { ActivityIndicator, Animated, FlatList, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ReadNotification, RootState, colors, deleteOneNotification } from '../../libs';
import { Overlay } from 'react-native-elements';
import { NotificationCard } from '../../components';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';

const Assistance: FC<any> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const dispatch = useDispatch<any>();
    const [notif, setNotif] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const pickerRef = useRef<any>();
    const [typeAssistance, setTypeAssistance] = useState<any>('Paiement facture');
    const [inputs, setInputs] = useState();


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
                Geolocation.getCurrentPosition(info => setInputs((old: any) => { return { ...old, localisation: info.coords.latitude + "," + info.coords.longitude } }));
            } else {
                // L'autorisation a été refusée
                Geolocation.getCurrentPosition(info => setInputs((old: any) => { return { ...old, localisation: "" } }));
            }
        } catch (err) {
            console.warn(err);
        }
    };



    return (
        <Animated.View ref={viewRef} style={[styles.container, { opacity: fadeAnim, flex: 1 }]}>

            {/* <View style={[styles.content, { flex: 1, paddingTop: 15, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' }]}> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputbox}>
                    <Text style={styles.label}>Type d'assistance</Text>
                    <View style={[styles.input,]}>
                        <Picker
                            ref={pickerRef}
                            selectedValue={typeAssistance}
                            onValueChange={(val, i) => setTypeAssistance(val)} style={{ color: colors.dark }}>
                            <Picker.Item label="Recharge ISAGO" value="Recharge ISAGO" />
                            <Picker.Item label="Paiement facture" value="Paiement facture" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputbox}>
                    <Text style={styles.label}>N° Compteur</Text>
                    <TextInput style={[styles.input]} />
                </View>




                <View style={styles.inputbox}>
                    <Text style={styles.label}>Message</Text>
                    <TextInput multiline={true} numberOfLines={8} style={[styles.input]} />
                </View>


                <View style={[styles.form_item, { alignItems: "center", justifyContent: "center" }]}>
                    <View style={{ flex: 10 }}>
                        <Text style={styles.label}>Localisation (latitude,longitude)</Text>
                        <View style={[styles.input, { height: 48, justifyContent: "center" }]}>
                            <Text style={{ color: colors.dark }}>{ }</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleSetLocation} activeOpacity={0.7} style={{ backgroundColor: colors.main, alignItems: "center", justifyContent: "center", height: 48, width: 48, marginTop: 20, borderRadius: 5 }}>
                        <MaterialIcons name="my-location" size={28} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={0.7} style={[styles.button]} >
                    <Text style={styles.button_text}>Envoyer</Text>
                </TouchableOpacity>

                <View style={{ height: 60 }} />
            </ScrollView>
            {/* </View> */}

        </Animated.View>
    )
}

export default Assistance

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", backgroundColor: colors.body, paddingHorizontal: 20 },
    content: { width: "100%", padding: 10, paddingHorizontal: 5, gap: 10, alignItems: "center" },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "30%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 18 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15, justifyContent: "center", gap: 10 },
    desc: { fontWeight: "300", textAlign: "justify", color: colors.dark },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 20 },
    inputbox: { marginVertical: 15, width: '100%' },
    input: { borderWidth: 0.5, borderColor: colors.dark, borderRadius: 5, paddingLeft: 15, color: colors.main, width: '100%' },
    label: { color: colors.dark },
    form_item: { flexDirection: "row", gap: 5, marginVertical: 5 },
    button: { width: '100%', borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center", marginTop: 20 },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white },
})