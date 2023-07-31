import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Image } from 'react-native'
import { colors, images } from '../../libs'
import { formatNumberWithSpaces } from '../../libs/others/functions'

const FavoriteFactureCard: FC<any> = ({ facture }) => {
    return (
        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'rgba(0,0,0,0.5)', width: 220, padding: 5, borderRadius: 5 }}>
            <Image source={images.ico_facture} style={{ width: 40, height: 60, resizeMode: 'contain', tintColor: colors.black }} />
            {/* <FontAwesome name='file-text' size={60} color={colors.black} /> */}
            <View style={{ paddingLeft: 4 }}>
                <Text style={{ fontSize: 10, color: colors.dark }}>N° compteur: <Text style={{ fontWeight: 'bold', color: colors.black }}>{facture?.compteur}</Text></Text>
                <Text style={{ fontSize: 10, color: colors.dark }}>Montant: <Text style={{ fontWeight: 'bold', color: colors.black }}>{formatNumberWithSpaces(facture?.amountToBePaid)} FCFA</Text></Text>
                <Text style={{ fontSize: 10, color: colors.dark }}>Facture de: <Text style={{ fontWeight: 'bold', color: colors.black }}>{facture?.edition}</Text></Text>
                <Text style={{ fontSize: 10, color: colors.dark }}>Date échéance: <Text style={{ fontWeight: 'bold', color: colors.black }}>{facture?.expire}</Text></Text>
            </View>
        </View>
    )
}

export default FavoriteFactureCard

const styles = StyleSheet.create({})