import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { IInfoRes, api_fichiers, colors } from '../../libs'

const ActualiteCard: FC<{ info: IInfoRes, setInfo: any, toggleOverlay: any }> = ({ info, setInfo, toggleOverlay }) => {

    const handleDescription = () => {
        setInfo(info)
        toggleOverlay()
    }

    return (
        <TouchableOpacity onPress={handleDescription} activeOpacity={0.8} style={[styles.container, { height: info?.image ? 360 : 170 }]}>
            {info?.image && <View style={{ backgroundColor: "gray", width: "100%", height: 200, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Image source={{ uri: `${api_fichiers}/${info?.image}` }} style={{ width: "100%", height: "100%", resizeMode: "cover", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
            </View>}

            <View style={styles.infos}>
                <Text style={styles.title}>{info?.title?.slice(0, 50)}{info?.title?.length > 50 && "..."}</Text>
                <Text style={styles.content}>{info?.content?.slice(0, 180)}{info?.content?.length > 180 && "..."}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ActualiteCard

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, borderWidth: 0.3, borderColor: colors.main, width: "100%", height: 360, marginBottom: 10, borderRadius: 5 },
    infos: { gap: 10, padding: 10 },
    title: { fontSize: 20, fontWeight: "bold", letterSpacing: 1, color: colors.black },
    content: { textAlign: "justify" }
})