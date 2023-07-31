import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { IISAGOreq, RootState, colors, images, paiement_isago } from '../../libs'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CustomLoader } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PaiementISAGO: FC<any> = ({ navigation, route }) => {
    const routes = route?.params;
    const dispatch = useDispatch<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const [overType, setOverType] = useState({ process: true, message: false, cancel: false, decline: false })
    const [isago, setIsago] = useState<IISAGOreq>();
    const [montant, setMontant] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<any>({ phone: '', montant: '' });
    const [click, setClick] = useState(false);
    const [result, setResult] = useState<any>('');
    const { auth, user_loading } = useSelector((state: RootState) => state?.user)
    const { tmp, ok, isago_loading, notif } = useSelector((state: RootState) => state?.isago)


    const toggleOverlay = () => { setVisible(!visible) }

    useEffect(() => {
        setIsago(routes?.isago)
    }, [routes]);

    useEffect(() => {
        if (ok && ok !== 'sent') {
            setOverType(old => { return { ...old, process: false, message: false, decline: true } })
        }
    }, [ok]);

    useEffect(() => {
        if (tmp && (ok && ok === 'sent')) {
            setOverType(old => { return { ...old, process: false, message: true } })
            dispatch({ type: "reset_tmp" })
            setClick(false)
        }
    }, [tmp]);

    useEffect(() => {
        AsyncStorage.getItem('notif').then((ans: any) => {
            const _ans = JSON.parse(ans)
            setResult(notif || _ans)
        }).catch(err => console.log(err))
    }, [notif]);

    const handleBuy = () => {

        if (phone === "") { setError((old: any) => { return { ...old, phone: "Votre numéro de téléphone est requis." } }); return; } else
            setError((old: any) => { return { ...old, phone: "" } });

        if (montant === "") { setError((old: any) => { return { ...old, montant: "Le montant à payer est requis." } }); return; } else
            setError((old: any) => { return { ...old, montant: "" } });


        if (auth)
            if (isago) {
                const data: IISAGOreq = {
                    compteur: isago?.compteur,
                    owner: isago?.owner,
                    address: isago?.address,
                    customerCode: isago?.customerCode,
                    amount: parseInt(montant),
                    phone: parseInt(phone),
                    customerId: isago?.customerId,
                }

                console.log(data)
                dispatch(paiement_isago(data, auth?.accessToken))
            }
        setClick(true)
    }


    if (!click && (isago_loading || user_loading))
        return <CustomLoader />

    return (
        <View style={styles.container}>
            {/* overlay vitepay */}
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.overlay, { height: "70%" }]} animationType="slide">
                <View style={{ height: 180, }}>
                    <View style={[{ position: "relative", alignItems: "center", justifyContent: "center" }]}>

                        <View style={{ position: "absolute", borderWidth: 0, borderColor: colors.white, width: 180, height: 180, top: "-250%", alignItems: "center", justifyContent: "center", borderRadius: 180, backgroundColor: colors.white, alignSelf: "center" }}>
                            <Image source={images.vitepay} style={{ width: "100%", height: "100%", borderRadius: 180, resizeMode: "contain", }} />
                        </View>
                        <TouchableOpacity style={{ alignSelf: "flex-end", padding: 10 }} activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={{ color: colors.red }} /></TouchableOpacity>

                    </View>
                    <View style={{ alignItems: "center", marginTop: 50 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: colors.black, textTransform: "uppercase" }}>VITEPAY</Text>
                        <Text style={{ fontSize: 14, fontWeight: "bold", color: colors.black }}>Achat chez vitepay</Text>
                    </View>
                    <View style={[styles.line, { alignSelf: "center", width: "100%" }]} />
                </View>

                {overType.process ?
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.sheetcontainer}>
                        <View>
                            <View style={{ gap: 15 }}>
                                <View style={{ borderWidth: 1, borderColor: colors.dark, padding: 10, paddingBottom: 5, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, color: colors.dark }}>Téléphone</Text>
                                    <TextInput keyboardType="phone-pad" placeholderTextColor={'rgba(0,0,0,0.5)'} style={{ color: colors.main }} placeholder="Numéro orange (sans l'indicatif)" value={phone} onChangeText={text => setPhone(text)} />
                                    <Text style={{ fontSize: 10, color: colors.danger }}>{error.phone}</Text>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: colors.dark, padding: 10, paddingBottom: 5, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, color: colors.dark }}>Montant</Text>
                                    <TextInput keyboardType="phone-pad" placeholderTextColor={'rgba(0,0,0,0.5)'} style={{ color: colors.main }} placeholder="Montant à payer" value={montant} onChangeText={text => setMontant(text)} />
                                    <Text style={{ fontSize: 10, color: colors.danger }}>{error.montant}</Text>
                                </View>

                            </View>
                            <View style={{ marginVertical: 15, paddingHorizontal: 40 }}>
                                <Text style={{ textAlign: "center", color: colors.dark }}>Payer votre transaction depuis votre téléphone.</Text>
                            </View>

                            <View >
                                <TouchableOpacity onPress={handleBuy} style={{ backgroundColor: colors.main, padding: 15, borderRadius: 10 }}>
                                    {!isago_loading ? <Text style={{ textAlign: "center", color: colors.white }}>Payer maintenant</Text> :
                                        <ActivityIndicator size={'small'} color={'white'} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView> :

                    overType.message &&
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.sheetcontainer}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 14, color: colors.black, textAlign: "center" }}>Paiement crédit ISAGO</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {result && result === 'pending' &&
                                <>
                                    <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", marginTop: 10 }}>Nom et Prénom: {isago?.owner}</Text>
                                    <Text style={{ fontSize: 12, color: colors.black, textAlign: "center" }}>Compteur N° {isago?.compteur}</Text>
                                </>
                            }

                            {result && result === 'pending' &&
                                <Text style={{ fontSize: 12, color: colors.black, textAlign: "justify", marginTop: 10, }}>
                                    Pour valider et terminer votre transaction, veuillez suivre les instructions envoyées au <Text style={{ fontWeight: "bold", color: colors.red }}>{phone}</Text>. Vous pouvez également saisir directement <Text style={{ fontWeight: "bold", color: colors.red }}>#144#3*6#</Text> (code USSD) sur votre téléphone pour afficher le menu de confirmation de paiement.
                                </Text>
                            }

                            <View style={{ marginTop: 20 }}>
                                {result && result === 'pending' ?
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <ActivityIndicator size={80} color={colors.warning} style={{ width: 40 }} />
                                        <Text style={{ color: colors.warning, fontSize: 10, marginTop: 4 }}>En attente de confirmation</Text>
                                    </View> :
                                    result && result === 'échoué' ?
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={images.echec} style={{ width: 100, height: 100, tintColor: colors.danger }} />
                                            <Text style={{ color: colors.danger, fontSize: 14, marginTop: 4, }}>Paiement crédit ISAGO échoué</Text>
                                        </View> :
                                        result && result === 'reussi' &&
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={images.correct} style={{ width: 80, height: 80, tintColor: colors.success }} />
                                            <Text style={{ color: colors.success, fontSize: 14, marginTop: 4, }}>Paiement crédit ISAGO réussi</Text>
                                        </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                }
            </Overlay>

            <View style={styles.content}>

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.forms}>
                        <View style={{ width: "100%", gap: 40 }}>

                            <View style={{ gap: 20 }}>
                                <View>
                                    <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black, marginBottom: 20 }}>Paiement ISAGO</Text>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>Compteur N° {isago?.compteur}</Text>
                                </View>

                                <View style={{ gap: 2 }}>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>Nom et Prenom: <Text style={{ fontWeight: "bold", color: colors.black }}>{isago?.owner}</Text></Text>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>Adresse: <Text style={{ fontWeight: "bold", color: colors.black }}>{isago?.address}</Text></Text>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>N° compteur: <Text style={{ fontWeight: "bold", color: colors.black }}>{isago?.compteur}</Text></Text>
                                </View>
                            </View>

                            <View style={{ gap: 15 }}>
                                <TouchableOpacity onPress={toggleOverlay} style={styles.button}>
                                    <Text style={styles.btn_text}>Procéder au paiement</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 15 }} />
                </ScrollView>
            </View>
        </View>
    )
}

export default PaiementISAGO

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.main,
    },
    content: {
        flex: 1,
        backgroundColor: colors.body, borderTopLeftRadius: 60, borderTopRightRadius: 60, padding: 30
    },
    forms: {
        flex: 1, alignItems: "center", gap: 10, justifyContent: "center",
    },
    input: { width: "100%", borderWidth: 0.5, borderColor: colors.white, borderRadius: 5, backgroundColor: colors.white, paddingHorizontal: 10 },
    button: { padding: 15, borderRadius: 5, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: colors.main },
    btn_text: { textAlign: "center", fontWeight: "bold", color: colors.white },
    overlay: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "50%", bottom: 0 },
    sheettitle: { color: colors.black, fontWeight: "300", letterSpacing: 1.5, fontSize: 22 },
    sheetheader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheetcontainer: { flexGrow: 1, paddingVertical: 15 },
    line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
})