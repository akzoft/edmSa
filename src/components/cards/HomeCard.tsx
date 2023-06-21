import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { colors, images } from '../../libs'
import { useNavigation } from '@react-navigation/native'

type props = { link: string, style?: StyleProp<ViewStyle>, title?: string, type?: string, Component: React.ComponentType<any>, icon: string, iconSize?: number, setShowModal: any }

const HomeCard: FC<props> = ({ title, Component, icon, iconSize, style, type, link, setShowModal }) => {
    const navigation = useNavigation<any>()

    return (
        <TouchableOpacity onPress={() => { navigation.navigate(link); setShowModal(false) }} activeOpacity={0.7} style={[styles.container, style]}>
            <View style={{ backgroundColor: colors.main, padding: 10, borderRadius: type === "info" ? 50 : 5 }}>
                {type !== "isago" ? <Component name={icon} size={iconSize || 20} color={colors.white} /> :
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "flex-end", }}>
                            <Text style={{ backgroundColor: colors.white, color: colors.main, padding: 2 }}>ISAGO</Text>
                        </View>
                        <Image source={images.logo_min} style={styles.image} />
                    </View>
                }
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, width: "30%", height: 110, shadowColor: colors.main, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.6, elevation: 2, borderRadius: 5, padding: 5, alignItems: "center", justifyContent: "center", },
    title: { fontSize: 17, color: colors.main },
    image: { width: 20, height: 40, resizeMode: "cover" },
})