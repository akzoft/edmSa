import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { IInfoRes, RootState, colors, css } from '../../libs'
import { InfoCard } from '../../components'
import { useSelector } from 'react-redux'
import { Overlay } from 'react-native-elements'
import Fontisto from 'react-native-vector-icons/Fontisto'


const Infos: FC<any> = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const toggleOverlay = () => { setVisible(!visible) }
    const [info, setInfo] = useState<IInfoRes>()
    const { infos, loading } = useSelector((state: RootState) => state?.info)

    if (loading)
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.body }}><ActivityIndicator size={40} color={colors.main} pointerEvents="none" /></View >

    return (
        <View style={[css.home.container, { backgroundColor: colors.body }]}>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.bottomSheet]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}>Description</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>
                    <Text style={[styles.desc]}>
                        {info?.content}
                    </Text>
                </ScrollView>
            </Overlay>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
            <View style={{ backgroundColor: colors.body }}>
                {/* <View style={css.home.content}> */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {infos?.map((info, i) => (<InfoCard key={i} info={info} setInfo={setInfo} toggleOverlay={toggleOverlay} />))}
                    </View>
                    <View style={styles.separator} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Infos

const styles = StyleSheet.create({
    container: { gap: 25, flex: 1, padding: 10, paddingHorizontal: 15, paddingTop: 20, alignItems: "center", justifyContent: "center" },
    button: { padding: 15, backgroundColor: colors.main, width: "100%", borderRadius: 5, alignItems: "center", justifyContent: "center" },
    button_text: { fontWeight: "bold", color: colors.white },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "70%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 22 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15 },
    desc: { fontWeight: "300", textAlign: "justify" },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 50 }
})