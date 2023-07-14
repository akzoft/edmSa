import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { colors, images } from '../../libs'
import { useNavigation } from '@react-navigation/native'

type props = { link: string, style?: StyleProp<ViewStyle>, title?: string, type?: string, Component: React.ComponentType<any>, icon: string, iconSize?: number, setShowModal: any }

const HomeCard: FC<props> = ({ title, Component, icon, iconSize, style, type, link, setShowModal }) => {
    const navigation = useNavigation<any>()

    return (
        <TouchableOpacity onPress={() => { navigation.navigate(link); setShowModal(false) }} activeOpacity={0.7} style={[styles.container, style]}>
            <View style={{ padding: 10, width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                {type === 'facture' && <Image source={images.ico_facture} style={styles.image} />}
                {type === 'actualite' && <Image source={images.ico_actualite} style={styles.image} />}
                {type === 'isago' && <Image source={images.ico_compteur} style={styles.image} />}
                {type === 'devis' && <Image source={images.ico_devis} style={styles.image} />}
                {type === 'historique' && <Image source={images.ico_historique} style={styles.image} />}
                {type === 'info' && <Image source={images.ico_info} style={styles.image} />}
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, width: "30%", height: "30%", shadowColor: colors.main, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.6, elevation: 2, borderRadius: 5, padding: 5, alignItems: "center", justifyContent: "center", },
    title: { fontSize: 10, color: colors.main, textTransform: 'uppercase' },
    image: { width: 60, height: 60, resizeMode: "contain" },
})