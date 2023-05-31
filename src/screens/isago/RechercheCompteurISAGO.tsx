import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../libs'

const RechercheCompteurISAGO: FC<any> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.forms}>
                        <View style={{ width: "100%", gap: 40 }}>

                            <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black }}>Paiement ISAGO</Text>
                            <Text style={{ textAlign: "center" }}>Veuillez inserer dans le champ ci-dessous, votre numéro de compteur ISAGO</Text>

                            <View>
                                <TextInput placeholder='Numéro de compteur' style={styles.input} />
                            </View>

                            <View style={{ gap: 15 }}>
                                <TouchableOpacity onPress={() => navigation.navigate("resultat_isago")} style={styles.button}>
                                    <Text style={styles.btn_text}>Rechercher</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.btn_text}>Consulter un reçu</Text>
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

export default RechercheCompteurISAGO

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
    btn_text: { textAlign: "center", fontWeight: "bold", color: colors.white }
})



