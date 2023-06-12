import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IHistorique, colors } from '../../libs';
import moment from 'moment';
import 'moment/locale/fr';

const HistoryCard: FC<{ facture: IHistorique, type: string }> = ({ facture, type }) => {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                {type !== "devis" ?
                    <View>
                        <Text style={{ textDecorationLine: "underline" }}>{type === "facture" ? "FACTURE" : type === "devis" ? "DEVIS" : "ISAGO"}</Text>
                        {type === "facture" && <Text style={{ fontSize: 19, color: colors.black }}>Facture N° {facture?.invoice}</Text>}
                        <Text style={{ fontSize: 15, color: colors.black }}>Compteur {facture?.compteur}</Text>
                        <Text style={{ fontSize: 13, color: colors.black }}>{facture?.owner}</Text>
                        <Text style={{ fontSize: 12, color: colors.black }}>{facture?.address}</Text>
                    </View> :
                    <View>
                        <Text style={{ textDecorationLine: "underline" }}>{"DEVIS"}</Text>
                        <Text style={{ fontSize: 19, color: colors.black }}>{facture?.typeCompteur}</Text>
                        <Text style={{ fontSize: 15, color: colors.black }}>{facture?.typeDemande === "Nouveau" ? "Nouveau compteur" : facture?.typeDemande === "Réabonnement" ? "Réabonnement" : "Augmentation de puissance"}</Text>
                        <Text style={{ fontSize: 12, color: colors.black }}>A {facture?.ville?.name}</Text>
                    </View>
                }

                {type === "facture" && <View>
                    <Text style={{ color: colors.black }}>Montant à payer</Text>
                    <Text style={{ color: colors.warning }}>{facture?.amountToBePaid} FCFA</Text>
                </View>}

                {type === "devis" && facture?.status === "VALIDATED" && <View>
                    <Text style={{ color: colors.black }}>Montant à payer</Text>
                    <Text style={{ color: colors.warning }}>{facture?.amount} FCFA</Text>
                </View>}

                {type === "isago" && <View>
                    <Text style={{ color: colors.black }}>Montant de credit</Text>
                    <Text style={{ color: colors.warning }}>{facture?.amount} FCFA</Text>
                </View>}
            </View>

            {type === "facture" && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View></View>
                <View style={{ gap: 5 }}>
                    <View>
                        <Text style={{ color: colors.black, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.status === "PENDING" ? "Montant" : "Montant payé"}</Text>
                        <Text style={{ color: colors.warning, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.amountPaid} F CFA</Text>
                    </View>
                </View>
            </View>
            }

            {type === "isago" && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View></View>
                <View style={{ gap: 5 }}>
                    <View>
                        <Text style={{ color: colors.black, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>Nombre KWH</Text>
                        <Text style={{ color: colors.warning, textDecorationLine: facture?.status === "CANCELED" ? "line-through" : "none" }}>{facture?.nbKw} KWH</Text>
                    </View>
                </View>
            </View>}

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {type !== "devis" ? <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <View style={{ height: 8, width: 8, backgroundColor: facture?.status === "PENDING" ? colors.warning : facture?.status === "PAID" ? colors.success : colors.danger, borderRadius: 50 }} />
                    <Text>{facture?.status === "PENDING" ? "En attente de confirmation" : facture?.status === "PAID" ? "Paiement reussie" : "Paiement annulé"}</Text>
                </View> :
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <View style={{ height: 8, width: 8, backgroundColor: facture?.status === "PENDING" ? colors.warning : facture?.paymentStatus === "PAID" ? colors.success : colors.danger, borderRadius: 50 }} />
                        <Text>{(facture?.status === "PENDING" && facture?.paymentStatus !== "PAID") ? "En attente de confirmation" : (facture?.status === "REJECT" && facture?.paymentStatus !== "PAID") ? "Paiement annulé" : facture?.paymentStatus === "PAID" && "Paiement reussie"}</Text>
                    </View>
                }

                <Text style={{ fontSize: 12, fontStyle: "italic" }}>{moment(facture?.updatedAt).fromNow()}</Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate("paiement_facture", { facture })} activeOpacity={0.7} style={{ padding: 15, backgroundColor: colors.red, borderRadius: 5 }}><Text style={{ color: colors.white, textAlign: "center" }}>Payer maintenant</Text></TouchableOpacity> */}
        </View>
    );
}

export default HistoryCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.dark, borderRadius: 15, padding: 10, gap: 5 },
})




//latitude,longitude