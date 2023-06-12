import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IHistorique, colors } from '../../../libs';
import moment from 'moment';
import 'moment/locale/fr';

const HistoryISAGOCard: FC<{ facture: IHistorique }> = ({ facture }) => {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                <View>
                    <Text style={{ textDecorationLine: "underline" }}>ISAGO</Text>
                    <Text style={{ fontSize: 15, color: colors.black }}>Compteur {facture?.compteur}</Text>
                    <Text style={{ fontSize: 13, color: colors.black }}>{facture?.owner}</Text>
                    <Text style={{ fontSize: 12, color: colors.black }}>{facture?.address}</Text>
                </View>

                <View>
                    <Text style={{ color: colors.black }}>Montant de credit</Text>
                    <Text style={{ color: colors.warning }}>{facture?.amount} FCFA</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View></View>
                <View style={{ gap: 5 }}>
                    <View>
                        <Text style={{ color: colors.black, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>Nombre KWH</Text>
                        <Text style={{ color: colors.warning, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.nbKw} KWH</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <View style={{ height: 8, width: 8, backgroundColor: facture?.status === "PENDING" ? colors.warning : facture?.status === "PAID" ? colors.success : colors.danger, borderRadius: 50 }} />
                    <Text>{facture?.status === "PENDING" ? "En attente de paiement" : facture?.status === "PAID" ? "Paiement reussie" : "Paiement annulé"}</Text>
                </View>

                <Text style={{ fontSize: 12, fontStyle: "italic" }}>{moment(facture?.updatedAt).fromNow()}</Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate("paiement_facture", { facture })} activeOpacity={0.7} style={{ padding: 15, backgroundColor: colors.red, borderRadius: 5 }}><Text style={{ color: colors.white, textAlign: "center" }}>Payer maintenant</Text></TouchableOpacity> */}
        </View>
    );
}

export default HistoryISAGOCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.dark, borderRadius: 15, padding: 10, gap: 5 },
})




//latitude,longitude