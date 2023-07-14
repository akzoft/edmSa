
import { FC, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IDevisReq, IVille, RootState, colors, getVilles, handleChangeMobile } from "../../../libs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from "@react-native-async-storage/async-storage";

type props = { scrollViewRef: any, setError: any, tabs: any, activeTab: any, setActiveTab: any, handleSendDevis: any, inputs: IDevisReq, setInputs: any, typeVille: any, setTypeVille: any, typeCommune: any, setTypeCommune: any, typeQuartier: any, setTypeQuartier: any }
const Finalisation: FC<props> = ({ scrollViewRef, setError, tabs, activeTab, setActiveTab, handleSendDevis, inputs, setInputs, typeVille, setTypeVille, typeCommune, setTypeCommune, typeQuartier, setTypeQuartier }) => {
    const pickerRef = useRef<any>();
    const { auth, user_loading } = useSelector((state: RootState) => state?.user)
    const { villes, ville_loading } = useSelector((state: RootState) => state?.ville)
    const { s_loading } = useSelector((state: RootState) => state?.devis)
    const [cities, setCities] = useState<IVille[]>();
    const dispatch = useDispatch<any>()

    useEffect(() => {
        setCities(villes)
    }, [villes]);

    useEffect(() => {
        if (auth)
            dispatch(getVilles(auth?.accessToken))
    }, [dispatch, auth]);

    useEffect(() => {
        AsyncStorage.getItem("quit").then((data: any) => {
            let _inputs: IDevisReq = JSON.parse(data)
            if (_inputs !== null && _inputs !== undefined) {
                setInputs(_inputs)
                setTypeVille(_inputs?.ville)
            }
        }).catch(err => console.log(err));
    }, []);


    useEffect(() => {
        AsyncStorage.getItem("quit").then((data: any) => {
            let _inputs: IDevisReq = JSON.parse(data)
            if (_inputs?.typeCompteur !== "") {
                inputs.ville = typeVille
                on_cancel_store_data_to_asyncstore(inputs)
            }
        })
    }, [typeVille, inputs]);

    const on_cancel_store_data_to_asyncstore = async (data: IDevisReq) => {
        try {
            await AsyncStorage.setItem("quit", JSON.stringify(data))
        } catch (error) {
            console.error('Error writing to JSON file:', error);
        }
    };



    const handlePrevious = () => {
        setActiveTab((prevTab: number) => (prevTab > 0 ? prevTab - 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };


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
                Geolocation.getCurrentPosition(info => setInputs((old: IDevisReq) => { return { ...old, localisation: info.coords.latitude + "," + info.coords.longitude } }));
            } else {
                // L'autorisation a été refusée
                Geolocation.getCurrentPosition(info => setInputs((old: IDevisReq) => { return { ...old, localisation: "" } }));
            }
        } catch (err) {
            console.warn(err);
        }
    };

    var dot = 5;

    return (
        <View>
            {/* <View style={{ flexDirection: "row", marginVertical: 15, width: "100%" }}>
                {[1, 2, 3, 4, 5]?.map(dot => (
                    <View key={dot} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: colors.dark }} />
                        <View style={{ borderRadius: 20, width: 20, height: 20, alignItems: "center", justifyContent: "center", backgroundColor: dot === 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                        <View style={{ width: "15%", height: 1, backgroundColor: dot === 5 ? colors.primary : colors.dark }} />
                    </View>))}
            </View> */}

            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20, }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: dot === 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                    <Text style={{ marginHorizontal: 8, color: colors.dark }}> sur </Text><View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.dark }}><Text style={{ color: colors.white }}>{5}</Text></View>
                </View>
            </View>

            <View>
                <Text style={[styles.title, { marginVertical: 10 }]}>5. Adresse principale</Text>

                <View style={{ marginTop: 15, flex: 4 }}>
                    <Text style={styles.label}>Ville <Text style={styles.required}>*</Text></Text>
                    <View style={[styles.input,]}>
                        <Picker
                            ref={pickerRef}
                            selectedValue={typeVille}
                            onValueChange={(val) => setTypeVille(val)} style={{ color: colors.dark }}>
                            <Picker.Item label="---Votre ville---" value="" style={{ color: "rgba(0,0,0,0.2)" }} />
                            {cities?.map((ville: IVille) => (<Picker.Item key={ville?.id} label={ville?.name} value={ville?.id} />))}
                        </Picker>
                    </View>
                </View>


                <View style={{ display: 'flex', flexDirection: "row", gap: 15, alignItems: 'baseline' }}>

                    <View style={{ marginTop: 15, flex: 6 }}>
                        <Text style={styles.label}>Commune <Text style={styles.required}>*</Text></Text>
                        <TextInput placeholder='Commune' placeholderTextColor={'rgba(0,0,0,0.5)'} style={styles.input} value={inputs?.commune ? inputs.commune?.toString() : ""} onChangeText={text => handleChangeMobile("commune", text, setInputs)} />
                    </View>

                    <View style={{ marginVertical: 15, flex: 6 }}>
                        <Text style={styles.label}>Quartier <Text style={styles.required}>*</Text></Text>
                        <TextInput placeholder='Quartier' placeholderTextColor={'rgba(0,0,0,0.5)'} style={styles.input} value={inputs?.quartier ? inputs.quartier?.toString() : ""} onChangeText={text => handleChangeMobile("quartier", text, setInputs)} />
                    </View>
                </View>

                <View style={[styles.form_item, { marginBottom: 15, gap: 15, }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label} >Rue</Text>
                        <TextInput placeholder='Rue' placeholderTextColor={'rgba(0,0,0,0.5)'} style={styles.input} value={inputs?.rue ? inputs.rue?.toString() : ""} onChangeText={text => handleChangeMobile("rue", text, setInputs)} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Porte</Text>
                        <TextInput placeholder='Porte' placeholderTextColor={'rgba(0,0,0,0.5)'} keyboardType="number-pad" style={styles.input} value={inputs?.porte ? inputs.porte?.toString() : ""} onChangeText={text => handleChangeMobile("porte", text, setInputs)} />
                    </View>
                </View>

                <View style={[styles.form_item, { marginBottom: 15, gap: 15, }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Lot</Text>
                        <TextInput placeholder='Lot' placeholderTextColor={'rgba(0,0,0,0.5)'} style={styles.input} value={inputs?.lot ? inputs.lot?.toString() : ""} onChangeText={text => handleChangeMobile("lot", text, setInputs)} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Proche de</Text>
                        <TextInput placeholder='Proche de' placeholderTextColor={'rgba(0,0,0,0.5)'} style={styles.input} value={inputs?.procheDe ? inputs.procheDe?.toString() : ""} onChangeText={text => handleChangeMobile("procheDe", text, setInputs)} />
                    </View>
                </View>


                <View style={[styles.form_item, { alignItems: "center", justifyContent: "center" }]}>
                    <View style={{ flex: 10 }}>
                        <Text style={styles.label}>Localisation (latitude,longitude)</Text>
                        <View style={[styles.input, { height: 48, justifyContent: "center" }]}>
                            <Text style={{ color: colors.dark }}>{inputs?.localisation ? inputs?.localisation : "latitude,longitude"}</Text>
                        </View>

                        {/* <TextInput placeholder='Lattitude,Longitude' style={styles.input} value={inputs?.lot ? inputs.lot?.toString() : ""} onChangeText={text => handleChangeMobile("lot", text, setInputs)} /> */}
                    </View>

                    <TouchableOpacity onPress={handleSetLocation} activeOpacity={0.7} style={{ backgroundColor: colors.main, alignItems: "center", justifyContent: "center", height: 48, width: 48, marginTop: 20, borderRadius: 5 }}>
                        <MaterialIcons name="my-location" size={28} color={colors.white} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ flexDirection: "row", gap: 5, marginTop: 20 }}>
                <TouchableOpacity onPress={handlePrevious} disabled={activeTab === 0} activeOpacity={0.7} style={[styles.button, { flex: 4 }]} >
                    <Text style={styles.button_text}>Précédent</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={s_loading ? true : false} onPress={handleSendDevis} activeOpacity={0.7} style={[styles.button, { flex: 8 }]} >
                    {!s_loading ? <Text style={styles.button_text}>Valider et envoyer la demande</Text> :
                        <ActivityIndicator size={"small"} color={colors.white} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Finalisation


const styles = StyleSheet.create({
    title: { fontSize: 18, color: colors.black },
    label: { marginVertical: 4, paddingLeft: 10, color: colors.dark },
    form_item: { flexDirection: "row", gap: 5, marginVertical: 5 },
    input: { borderWidth: 0.5, borderColor: colors.dark, borderRadius: 5, paddingLeft: 15, color: colors.main },
    button: { borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white },
    required: { color: colors.warning },
    sec_label: { color: colors.dark }
})