import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { colors, images } from '../../libs'
import { Overlay } from 'react-native-elements'

const PaiementISAGO: FC<any> = ({ navigation }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [overType, setOverType] = useState({ process: true, success: false, cancel: false, decline: false })
    const toggleOverlay = () => { setVisible(!visible) }

    return (
        <View style={styles.container}>
            {/* overlay vitepay */}
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.overlay, { height: "70%" }]} animationType="slide">
                <View style={{ height: 180, }}>
                    <View style={[{ position: "relative", alignItems: "center", justifyContent: "center" }]}>

                        <View style={{ position: "absolute", borderWidth: 2, borderColor: colors.white, width: 180, height: 180, top: "-250%", alignItems: "center", justifyContent: "center", borderRadius: 180, backgroundColor: colors.white, alignSelf: "center" }}>
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
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                        <Text>ok</Text>
                    </ScrollView> :
                    overType.success ?
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                            <View style={{ alignItems: "center", justifyContent: "center", gap: 5 }}>
                                <View style={{ width: 90, height: 90, borderRadius: 90, backgroundColor: colors.success, alignItems: "center", justifyContent: "center" }}>
                                    <MaterialCommunityIcons name="check-all" size={50} color={colors.white} />
                                </View>
                                <Text style={{ color: colors.success, textTransform: "uppercase", fontSize: 18 }}>RECHARGE EFFECTUEE</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 15, color: colors.black, textAlign: "center", marginTop: 10 }}>Nom et Prénom: Akougnon Pierre DOLO</Text>
                                <Text style={{ fontSize: 15, color: colors.black, textAlign: "center" }}>No. compteur: 100225N</Text>
                                <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", marginTop: 20 }}>Votre code de recharge vous sera envoyé par notification et SMS sur votre numéro de téléphone.</Text>
                            </View>

                            <View style={{ position: "absolute", bottom: 0, flexDirection: "row", gap: 10 }}>
                                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: colors.main, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontWeight: "bold" }}>Nouvelle recharge</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={toggleOverlay} style={{ borderRadius: 5, backgroundColor: colors.red, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.white, fontWeight: "bold" }}>Fermer</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView> :
                        overType.cancel ?
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                                <View style={{ alignItems: "center", justifyContent: "center", gap: 5 }}>
                                    <View style={{ width: 90, height: 90, borderRadius: 90, backgroundColor: colors.danger, alignItems: "center", justifyContent: "center" }}>
                                        <MaterialCommunityIcons name="cancel" size={50} color={colors.white} />
                                    </View>
                                    <Text style={{ color: colors.danger, textTransform: "uppercase", fontSize: 18 }}>RECHARGE ANNULEE</Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", marginTop: 20 }}>Votre achat de crédit ISAGO a été annulé. Veuillez réessayer de nouveau</Text>
                                </View>

                                <View style={{ position: "absolute", bottom: 0, flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: colors.main, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: colors.white, fontWeight: "bold" }}>Nouvelle recharge</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={toggleOverlay} style={{ borderRadius: 5, backgroundColor: colors.red, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: colors.white, fontWeight: "bold" }}>Fermer</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView> :
                            overType.decline &&
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetcontainer}>
                                <View style={{ alignItems: "center", justifyContent: "center", gap: 5 }}>
                                    <View style={{ width: 90, height: 90, borderRadius: 90, backgroundColor: colors.danger, alignItems: "center", justifyContent: "center" }}>
                                        <Ionicons name="ios-close" size={50} color={colors.white} />
                                    </View>
                                    <Text style={{ color: colors.danger, textTransform: "uppercase", fontSize: 18 }}>RECHARGE ECHOUEE</Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 12, color: colors.black, textAlign: "center", marginTop: 20 }}>Votre achat de crédit ISAGO à echouer. Veuillez réessayer de nouveau</Text>
                                </View>

                                <View style={{ position: "absolute", bottom: 0, flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity style={{ borderRadius: 5, backgroundColor: colors.main, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: colors.white, fontWeight: "bold" }}>Nouvelle recharge</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={toggleOverlay} style={{ borderRadius: 5, backgroundColor: colors.red, padding: 15, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: colors.white, fontWeight: "bold" }}>Fermer</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                }
            </Overlay>

            <View style={styles.content}>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.forms}>
                        <View style={{ width: "100%", gap: 40 }}>

                            <View style={{ gap: 20 }}>
                                <View>
                                    <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black }}>Paiement ISAGO</Text>
                                    <Text style={{ textAlign: "center", fontSize: 15 }}>Compteur No 100225N</Text>
                                </View>

                                <View style={{ gap: 2 }}>
                                    <Text style={{ textAlign: "center", fontSize: 15, }}>Nom et Prenom: Akougnon DOLO</Text>
                                    <Text style={{ textAlign: "center", fontSize: 15 }}>No. compteur:  100225N</Text>
                                </View>
                            </View>


                            <View>
                                <TextInput placeholder='Montant crédit ISAGO' style={styles.input} />
                            </View>

                            <View style={{ gap: 15 }}>
                                <TouchableOpacity onPress={toggleOverlay} style={styles.button}>
                                    <Text style={styles.btn_text}>Payer</Text>
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
        flex: 1, backgroundColor: colors.main, paddingTop: 20
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