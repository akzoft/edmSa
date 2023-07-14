import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IHistorique, colors } from '../../../libs';
import moment from 'moment';
import 'moment/locale/fr';

const HistoryDevisCard: FC<{ facture: IHistorique, }> = ({ facture }) => {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                <View>
                    <Text style={{ textDecorationLine: "underline", color: colors.black }}>DEVIS</Text>
                    <Text style={{ fontSize: 15, color: colors.black }}>{facture?.typeCompteur}</Text>
                    <Text style={{ fontSize: 13, color: colors.black }}>{facture?.typeDemande === "Mutation/Aug./Dim./Chang. Puissance" ? "Changement de puissance" : facture?.typeDemande + " compteur"}</Text>
                    <Text style={{ fontSize: 12, color: colors.black }}>A {facture?.ville?.name}</Text>
                </View>


                {facture?.status === "VALIDATED" && <View>
                    <Text style={{ color: colors.black }}>Montant à payer</Text>
                    <Text style={{ color: colors.warning }}>{facture?.amount} FCFA</Text>
                </View>}

            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <View style={{ height: 8, width: 8, backgroundColor: facture?.status === "REJECT" ? colors.danger : facture?.status === "PENDING" ? colors.warning : (facture?.status === "VALIDATED" && facture?.paymentStatus !== "PAID") ? colors.info : colors.success, borderRadius: 50 }} />
                    <Text style={{ color: colors.dark }}>{(facture?.status === "REJECT") ? "Devis rejeté" : facture?.status === "PENDING" ? "En attente de validation" : (facture?.status === "VALIDATED" && facture?.paymentStatus !== "PAID") ? "Devis validé" : facture?.paymentStatus === "PAID" && "Devis payé"}</Text>
                </View>

                <Text style={{ fontSize: 12, fontStyle: "italic", color: colors.dark }}>{moment(facture?.updatedAt).fromNow()}</Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate("paiement_facture", { facture })} activeOpacity={0.7} style={{ padding: 15, backgroundColor: colors.red, borderRadius: 5 }}><Text style={{ color: colors.white, textAlign: "center" }}>Payer maintenant</Text></TouchableOpacity> */}
        </View>
    );
}

export default HistoryDevisCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, borderRadius: 5, padding: 10, gap: 5 },
})




//latitude,longitude