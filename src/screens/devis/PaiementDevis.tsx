import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { IDevisPayment, IDevisReq, RootState, colors, css, images, paiement_devis } from '../../libs'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'

const PaiementDevis: FC<any> = ({ navigation, route }) => {
    const routes = route?.params;
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch<any>()
    const [devis, setDevis] = useState<IDevisReq>();
    const [error, setError] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [overType, setOverType] = useState({ process: true, message: false, cancel: false })
    const { tmp, ok, s_loading, errors } = useSelector((state: RootState) => state?.devis)
    const { auth } = useSelector((state: RootState) => state?.user)


    //display errors if exist
    useEffect(() => {
        if (((errors && errors !== null) || (error && error != ""))) { Toast.show({ type: 'error', text1: 'Erreurs', text2: errors ? errors : error && error, }); }
    }, [error, errors])

    const toggleOverlay = () => { setVisible(!visible) }

    useEffect(() => {
        setDevis(routes?.devis)
    }, [routes]);

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
        if (!phone || phone === "") { setError("Le numéro de téléphone est requis."); return; } else setError("")
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

                            <View style={{ position: "absolute", borderWidth: 0, borderColor: colors.white, width: 180, height: 180, top: "-250%", alignItems: "center", justifyContent: "center", borderRadius: 180, backgroundColor: colors.white, alignSelf: "center" }}>
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
                                    <Text style={{ fontSize: 22 }}>Téléphone</Text>
                                    <TextInput keyboardType="phone-pad" placeholder="Numéro orange (sans l'indicatif)" value={phone} onChangeText={text => setPhone(text)} />
                                    <Text style={{ color: colors.red, textAlign: "center" }}>{error && error}</Text>
                                </View>

                                <View style={{ marginVertical: 30, paddingHorizontal: 40 }}>
                                    <Text style={{ textAlign: "center" }}>Payer votre transaction depuis votre téléphone</Text>
                                </View>

                                <View >
                                    <TouchableOpacity onPress={handleBuy} style={{ backgroundColor: colors.main, padding: 30, borderRadius: 10 }}>
                                        {s_loading ?
                                            <View style={{ alignItems: "center", justifyContent: "center", }}>
                                                <ActivityIndicator size={40} color={colors.white} pointerEvents="none" />
                                                <Text style={{ color: colors.white }}>Paiement devis en cours..</Text>
                                            </View > :
                                            <Text style={{ textAlign: "center", fontSize: 24, color: colors.white }}>Payer {devis?.amount} F CFA</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView> :
                        overType.message ?
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, color: colors.warning, textAlign: "center" }}>PAIEMENT DEVIS {devis?.typeCompteur} en attente</Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 15, color: colors.black, textAlign: "center", marginTop: 10 }}>Nom et Prénom: {`${devis?.nom} ${devis?.prenom}`}</Text>
                                    <Text style={{ fontSize: 15, color: colors.black, textAlign: "center" }}>{devis?.typeCompteur}</Text>
                                    {/* <Text style={{ fontSize: 20, color: colors.black, textAlign: "center", marginTop: 20 }}>Vous avez un paiement en attente. Composez <Text style={{ fontWeight: "bold" }}>#144#3*6#</Text> pour le valider avant 60 minutes.</Text> */}

                                    <Text style={{ fontSize: 18, color: colors.black, textAlign: "justify", marginTop: 10, }}>
                                        Pour valider et terminer votre transaction, veuillez suivre les instructions envoyées au <Text style={{ fontWeight: "bold", color: colors.red }}>{phone}</Text>. Vous pouvez également saisir directement <Text style={{ fontWeight: "bold", color: colors.red }}>#144#3*6#</Text> (code USSD) sur votre téléphone pour afficher le menu de confirmation de paiement.
                                    </Text>
                                </View>

                                {/* <View style={{ position: "absolute", bottom: 0, flexDirection: "row", gap: 10 }}>
                                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: colors.main, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontWeight: "bold" }}>Nouvelle recharge</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={toggleOverlay} style={{ borderRadius: 5, backgroundColor: colors.red, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontWeight: "bold" }}>Fermer</Text>
                                </TouchableOpacity>
                            </View> */}
                            </ScrollView> :
                            overType.cancel &&
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                                <View style={{ alignItems: "center", justifyContent: "center", gap: 5 }}>
                                    <View style={{ width: 90, height: 90, borderRadius: 90, backgroundColor: colors.danger, alignItems: "center", justifyContent: "center" }}>
                                        <MaterialCommunityIcons name="cancel" size={50} color={colors.white} />
                                    </View>
                                    <Text style={{ color: colors.danger, textTransform: "uppercase", fontSize: 18 }}>PAIEMENT ANNULEE</Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", marginTop: 20 }}>Votre paiement de devis a été annulé. Veuillez réessayer de nouveau</Text>
                                </View>
                                {/* 
                            <View style={{ position: "absolute", bottom: 0, flexDirection: "row", gap: 10 }}>
                                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: colors.main, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontWeight: "bold" }}>Nouvelle recharge</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={toggleOverlay} style={{ borderRadius: 5, backgroundColor: colors.red, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontWeight: "bold" }}>Fermer</Text>
                                </TouchableOpacity>
                            </View> */}
                            </ScrollView>
                    }
                </Overlay>

                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.forms}>
                            <View style={{ width: "100%", gap: 40 }}>

                                <View style={{ gap: 20 }}>
                                    <View>
                                        <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black, marginBottom: 20 }}>Paiement devis</Text>
                                        <Text style={{ textAlign: "center", fontSize: 18, textTransform: "uppercase", color: colors.dark }}>{devis?.typeCompteur}</Text>
                                    </View>

                                    <View style={{ gap: 2 }}>
                                        <Text style={{ textAlign: "center", fontSize: 15, }}>Nom et Prenom: <Text style={{ color: colors.black, fontWeight: "bold" }}>{`${devis?.nom} ${devis?.prenom}`}</Text></Text>
                                        <Text style={{ textAlign: "center", fontSize: 15 }}>Type de demande: <Text style={{ color: colors.black, fontWeight: "bold" }}>{devis?.typeDemande === "Réabonnement" ? "Réabonnement" : devis?.typeDemande === "Nouveau" ? "Nouveau compteur" : "Augmentation de puissance"}</Text></Text>
                                        <Text style={{ textAlign: "center", fontSize: 15 }}>Localisation: <Text style={{ color: colors.black, fontWeight: "bold" }}>{`${devis?.ville?.name}`}</Text></Text>
                                    </View>
                                </View>


                                <View>
                                    <Text style={{ paddingLeft: 10, paddingBottom: 5 }}>Montant à payer</Text>

                                    <View style={[styles.input, { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }]}>
                                        <Text style={[{ paddingVertical: 15, fontWeight: "bold", color: colors.black, fontSize: 18 }]}>{devis?.amount}</Text>
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