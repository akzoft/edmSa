import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IFactureReq, colors } from '../../libs';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/fr';

const FactureCard: FC<{ facture: IFactureReq }> = ({ facture }) => {
    const navigation = useNavigation<any>()
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text style={{ fontSize: 19, color: colors.black }}>Facture No {facture?.invoice}</Text>
                    <Text style={{ fontSize: 15, color: colors.black }}>Compteur {facture?.compteur}</Text>
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
                        <Text style={{ color: colors.black }}>Montant payé</Text>
                        <Text style={{ color: colors.warning, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.amountPaid} F CFA</Text>
                    </View>
                    {/* 
                    {facture?.amountToBePaid && facture?.amountPaid &&
                        <View>
                            <Text style={{ color: colors.black }}>Reste à payer</Text>
                            <Text style={{ color: colors.warning }}>{facture?.amountToBePaid - facture?.amountPaid} F CFA</Text>
                        </View>
                    } */}
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <View style={{ height: 8, width: 8, backgroundColor: facture?.status === "PENDING" ? colors.warning : facture?.status === "PAID" ? colors.success : colors.danger, borderRadius: 50 }} />
                    <Text>{facture?.status === "PENDING" ? "En attente de confirmation" : facture?.status === "PAID" ? "Paiement reussie" : "Paiement annulé"}</Text>
                </View>

                <Text style={{ fontSize: 12, fontStyle: "italic" }}>{moment(facture?.updatedAt).fromNow()}</Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate("paiement_facture", { facture })} activeOpacity={0.7} style={{ padding: 15, backgroundColor: colors.red, borderRadius: 5 }}><Text style={{ color: colors.white, textAlign: "center" }}>Payer maintenant</Text></TouchableOpacity> */}
        </View>
    );
}

export default FactureCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.dark, borderRadius: 15, padding: 10, gap: 5 },
})




//latitude,longitude