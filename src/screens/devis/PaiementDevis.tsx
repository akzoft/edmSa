import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { IDevisPayment, IDevisReq, RootState, colors, css, images, paiement_devis } from '../../libs'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { formatNumberWithSpaces } from '../../libs/others/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PaiementDevis: FC<any> = ({ navigation, route }) => {
    const routes = route?.params;
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch<any>()
    const [devis, setDevis] = useState<IDevisReq>();
    const [error, setError] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [result, setResult] = useState<any>('');
    const [overType, setOverType] = useState({ process: true, message: false, cancel: false })
    const { tmp, ok, s_loading, errors, notif } = useSelector((state: RootState) => state?.devis)
    const { auth } = useSelector((state: RootState) => state?.user)


    //display errors if exist
    useEffect(() => {
        if (((errors && errors !== null) || (error && error != ""))) { Toast.show({ type: 'error', text1: 'Erreurs', text2: errors ? errors : error && error, }); }
    }, [error, errors])

    const toggleOverlay = () => { setVisible(!visible) }
    useEffect(() => {
        setDevis(routes?.devis)
    }, [routes, tmp, ok, route]);

    useEffect(() => {
        AsyncStorage.getItem('notif').then((ans: any) => {
            const _ans = JSON.parse(ans)
            setResult(notif || _ans)
        }).catch(err => console.log(err))
    }, [notif]);

    useEffect(() => {
        if (ok && ok !== 'sent') {
            setOverType(old => { return { ...old, process: false, message: false, cancel: true } })
            setError(ok)
        }
    }, [ok]);

    useEffect(() => {
        if (tmp && (ok && ok === 'sent')) {
            setOverType(old => { return { ...old, process: false, message: true } })
            dispatch({ type: "reset_tmp" })
        }
    }, [tmp]);

    const handleBuy = () => {
        if (!phone || phone === "") { setError("Votre numéro de téléphone est requis."); return; } else setError("")

        if (auth)
            if (devis) {
                const data: IDevisPayment = { id: devis?.id, phone: parseInt(phone), }
                dispatch(paiement_devis(data, auth?.accessToken))
            }
    }

    return (
        <>
            <View style={[css.auth.toast]}><Toast /></View>
            <View style={styles.container}>
                {/* overlay vitepay */}
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.overlay, { height: "70%" }]} animationType="slide">
                    <View style={{ height: 180, }}>
                        <View style={[{ position: "relative", alignItems: "center", justifyContent: "center" }]}>

                            <View style={{ position: "absolute", borderWidth: 0, borderColor: colors.white, width: 170, height: 170, top: "-250%", alignItems: "center", justifyContent: "center", borderRadius: 180, backgroundColor: colors.white, alignSelf: "center" }}>
                                <Image source={images.vitepay} style={{ width: "100%", height: "100%", borderRadius: 180, resizeMode: "contain", }} />
                            </View>
                            <TouchableOpacity style={{ alignSelf: "flex-end", padding: 10, backgroundColor: colors.black, borderRadius: 50 }} activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={{ color: colors.red }} /></TouchableOpacity>
                        </View>

                        <View style={{ alignItems: "center", marginTop: 50 }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", color: colors.black, textTransform: "uppercase" }}>VITEPAY</Text>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: colors.black }}>Achat chez vitepay</Text>
                        </View>
                        <View style={[styles.line, { alignSelf: "center", width: "100%" }]} />
                    </View>

                    {overType.process ?
                        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                            <View>
                                <View style={{ borderWidth: 1, borderColor: colors.dark, padding: 15, paddingBottom: 5, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 22, color: colors.dark }}>Téléphone</Text>
                                    <TextInput style={{ color: colors.main }} keyboardType="phone-pad" placeholderTextColor={'rgba(0,0,0,0.5)'} placeholder="Numéro orange (sans l'indicatif)" value={phone} onChangeText={text => setPhone(text)} />
                                    <Text style={{ color: colors.red, textAlign: "center" }}>{error && error}</Text>
                                </View>

                                <View style={{ marginVertical: 30, paddingHorizontal: 40 }}>
                                    <Text style={{ textAlign: "center", color: colors.dark }}>Payer votre transaction depuis votre téléphone</Text>
                                </View>

                                <View >
                                    <TouchableOpacity onPress={handleBuy} style={{ backgroundColor: colors.main, padding: 30, borderRadius: 10 }}>
                                        {s_loading ?
                                            <View style={{ alignItems: "center", justifyContent: "center", }}>
                                                <ActivityIndicator size={40} color={colors.white} pointerEvents="none" />
                                                <Text style={{ color: colors.white }}>Paiement devis en cours..</Text>
                                            </View > :
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                <Text style={{ textAlign: "center", fontSize: 24, color: colors.white, flexWrap: 'wrap' }}>Payer  </Text><Text style={{ textAlign: "center", fontSize: 24, color: colors.white, flexWrap: 'wrap' }}>{formatNumberWithSpaces(devis?.amount)}</Text><Text style={{ textAlign: "center", fontSize: 24, color: colors.white, flexWrap: 'wrap' }}> F CFA</Text>
                                            </View>
                                            // <Text style={{ textAlign: "center", fontSize: 24, color: colors.white, flexWrap: 'wrap' }}>Payer {formatNumberWithSpaces(devis?.amount)} F CFA  </Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView> :
                        overType.message &&
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.sheetcontainer}>


                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 16, color: colors.black, textAlign: "center" }}>Paiement de devis</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {result && result === 'pending' &&
                                    <>
                                        <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", marginTop: 10 }}>Nom et Prénom: <Text style={{ color: colors.black, fontWeight: 'bold' }}>{`${devis?.nom} ${devis?.prenom}`}</Text></Text>
                                        <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", fontWeight: 'bold' }}>{devis?.typeCompteur}</Text>
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
                                                <Text style={{ color: colors.danger, fontSize: 14, marginTop: 4, }}>Paiement devis échoué</Text>
                                            </View> :
                                            result && result === 'reussi' &&
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={images.correct} style={{ width: 80, height: 80, tintColor: colors.success }} />
                                                <Text style={{ color: colors.success, fontSize: 14, marginTop: 4, }}>Paiement devis réussi</Text>
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
                                        <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black, marginBottom: 20 }}>Paiement devis</Text>
                                        <Text style={{ textAlign: "center", fontSize: 18, textTransform: "uppercase", color: colors.black }}>{devis?.typeCompteur}</Text>
                                    </View>

                                    <View style={{ gap: 2 }}>
                                        <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>Nom et Prenom: <Text style={{ color: colors.black, fontWeight: "bold" }}>{`${devis?.nom} ${devis?.prenom}`}</Text></Text>
                                        <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>Type de demande: <Text style={{ color: colors.black, fontWeight: "bold" }}>{devis?.typeDemande === "Réabonnement" ? "Réabonnement" : devis?.typeDemande === "Nouveau" ? "Nouveau compteur" : "Augmentation de puissance"}</Text></Text>
                                        <Text style={{ textAlign: "center", fontSize: 15, color: colors.dark }}>Localisation: <Text style={{ color: colors.black, fontWeight: "bold" }}>{`${devis?.ville?.name}`}</Text></Text>
                                    </View>
                                </View>


                                <View>
                                    <Text style={{ paddingLeft: 10, paddingBottom: 5, color: colors.dark }}>Montant à payer</Text>

                                    <View style={[styles.input, { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }]}>
                                        <Text style={[{ paddingVertical: 15, fontWeight: "bold", color: colors.black, fontSize: 18, flexWrap: 'wrap' }]}>{formatNumberWithSpaces(devis?.amount)}</Text>
                                        <Text style={[{ paddingVertical: 15, fontWeight: "bold", color: colors.dark, fontSize: 18 }]}>fcfa</Text>
                                    </View>
                                </View>

                                <View style={{ gap: 15 }}>
                                    <TouchableOpacity onPress={toggleOverlay} style={styles.button}>
                                        <Text style={styles.btn_text}>Poursuivre le paiement</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 15 }} />
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default PaiementDevis

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.main },
    content: {
        flex: 1, backgroundColor: colors.body, borderTopLeftRadius: 60, borderTopRightRadius: 60, padding: 30
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