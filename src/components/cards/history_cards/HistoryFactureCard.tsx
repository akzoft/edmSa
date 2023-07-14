import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IHistorique, colors } from '../../../libs';
import moment from 'moment';
import 'moment/locale/fr';

const HistoryFactureCard: FC<{ facture: IHistorique, }> = ({ facture }) => {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                <View>
                    <Text style={{ textDecorationLine: "underline", color: colors.black }}>FACTURE</Text>
                    <Text style={{ fontSize: 19, color: colors.black }}>Facture n° {facture?.invoice}</Text>
                    <Text style={{ fontSize: 15, color: colors.black }}>Compteur n° {facture?.compteur}</Text>
                    <Text style={{ fontSize: 13, color: colors.black }}>{facture?.owner}</Text>
                    <Text style={{ fontSize: 12, color: colors.black }}>{facture?.address}</Text>
                </View>

                <View>
                    <Text style={{ color: colors.black }}>Montant à payer</Text>
                    <Text style={{ color: colors.warning }}>{facture?.amountToBePaid} FCFA</Text>
                </View>


            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View></View>
                <View style={{ gap: 5 }}>
                    <View>
                        <Text style={{ color: colors.black, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.status === "PENDING" ? "Montant" : "Montant payé"}</Text>
                        <Text style={{ color: colors.warning, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.amountPaid} F CFA</Text>
                    </View>
                </View>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <View style={{ height: 8, width: 8, backgroundColor: facture?.status === "PENDING" ? colors.warning : facture?.status === "PAID" ? colors.success : colors.danger, borderRadius: 50 }} />
                    <Text style={{ color: colors.dark }}>{(facture?.status === "PENDING") ? "En attente de paiement" : (facture?.status === "CANCELED") ? "Paiement annulé" : facture?.status === "PAID" && "Paiement réussi"}</Text>
                </View>

                <Text style={{ fontSize: 12, fontStyle: "italic", color: colors.dark }}>{moment(facture?.updatedAt).fromNow()}</Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate("paiement_facture", { facture })} activeOpacity={0.7} style={{ padding: 15, backgroundColor: colors.red, borderRadius: 5 }}><Text style={{ color: colors.white, textAlign: "center" }}>Payer maintenant</Text></TouchableOpacity> */}
        </View>
    );
}

export default HistoryFactureCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, borderRadius: 5, padding: 10, gap: 5 },
})




//latitude,longitude