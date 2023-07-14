import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../libs';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/fr';

const DevisCard: FC<any> = ({ devi, setRejectedData, toggleOverlay }) => {
    const navigation = useNavigation<any>()

    const handleSetMotif = () => {
        toggleOverlay()
        setRejectedData(devi)
    }


    return (
        <TouchableOpacity onPress={() => navigation.navigate("devis_details", { devis: devi })} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "baseline" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", textDecorationLine: "underline", color: colors.dark }}>{devi?.typeCompteur}</Text>
                {devi?.status === "VALIDATED" && <View>
                    <Text style={{ fontSize: 12, color: colors.dark }}>Montant</Text>
                    <Text style={{ fontStyle: "italic", color: colors.red, alignSelf: "flex-end", fontSize: 13 }}>{devi?.amount}  fcfa</Text>
                </View>}
            </View>

            <Text style={{ color: colors.dark }}>A usage <Text style={{ fontWeight: "bold", letterSpacing: 1 }}>{devi?.usage}</Text></Text>

            {devi?.typeDemande === "Nouveau" && <Text style={{ color: colors.dark }}>Demande de <Text style={{ fontWeight: "bold", letterSpacing: 1, color: "brown", textDecorationLine: "underline" }}>{devi?.typeDemande}</Text> compteur</Text>}
            {devi?.typeDemande === "Mutation/Aug./Dim./Chang. Puissance" && <Text style={{ color: colors.dark }}>Demande de <Text style={{ fontWeight: "bold", letterSpacing: 1, color: "brown", textDecorationLine: "underline" }}>Changement de puissance</Text></Text>}
            {devi?.typeDemande === "Réabonnement" && <Text style={{ color: colors.dark }}>Demande de <Text style={{ fontWeight: "bold", letterSpacing: 1, color: "brown", textDecorationLine: "underline" }}>{devi?.typeDemande}</Text> de compteur</Text>}

            <Text>Localisation: <Text style={{ fontWeight: "bold", letterSpacing: 1 }}>{devi?.ville?.name}</Text></Text>
            {devi?.status && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", }}>
                <View style={{ borderRadius: 5, alignItems: "center", justifyContent: 'center', paddingVertical: 5 }}>
                    {devi?.paymentStatus === "PAID" && <Text style={{ color: colors.success, textAlign: "center" }}>Devi payé.</Text>}
                    {devi?.status === "VALIDATED" && devi?.paymentStatus !== "PAID" && <Text style={{ color: colors.success, textAlign: "center" }}>Devi validé.</Text>}
                    {devi?.status === "PENDING" && devi?.paymentStatus !== "PAID" && <Text style={{ color: colors.warning, textAlign: "center" }}>En attente de validation.</Text>}
                    {devi?.status === "REJECT" && devi?.paymentStatus !== "PAID" && <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: colors.danger, textAlign: "center" }}>Devi rejeté.</Text>
                    </View>}

                </View>

                <Text style={{ fontSize: 10, color: colors.dark }}>{moment(devi?.updatedAt).fromNow()}</Text>
            </View>
            }
            {devi?.status === "REJECT" && <TouchableOpacity onPress={handleSetMotif}><Text style={{ color: colors.red, textAlign: "center", textDecorationLine: "underline" }}>Motifs du rejet</Text></TouchableOpacity>}

            {devi?.status === "VALIDATED" && devi?.paymentStatus !== "PAID" &&
                <TouchableOpacity onPress={() => navigation.navigate("devis_paiement", { devis: devi })} style={{ padding: 15, borderRadius: 5, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ color: colors.white }}>Procéder au paiement</Text>
                </TouchableOpacity>}
        </TouchableOpacity>
    );
}
export default DevisCard
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white, borderRadius: 5, padding: 10
    }
})