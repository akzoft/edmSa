import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { IInfoRes, RootState, colors, css } from '../../libs'
import { ActualiteCard, CustomLoader } from '../../components'
import { useSelector } from 'react-redux'
import { Overlay } from 'react-native-elements'
import Fontisto from 'react-native-vector-icons/Fontisto'


const Actualite: FC<any> = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const toggleOverlay = () => { setVisible(!visible) }
    const [info, setInfo] = useState<IInfoRes>()
    const { actualites, actu_loading } = useSelector((state: RootState) => state?.actu)

    if (actu_loading)
        return <CustomLoader />

    return (
        <View style={[css.home.container, { backgroundColor: colors.body }]}>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.bottomSheet]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}></Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.black, marginBottom: 15 }}>
                        {info?.title}
                    </Text>
                    <Text style={[styles.desc]}>
                        {info?.content}
                    </Text>
                </ScrollView>
            </Overlay>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
            <View style={{ backgroundColor: colors.body }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {actualites?.map((info, i) => (<ActualiteCard key={i} info={info} setInfo={setInfo} toggleOverlay={toggleOverlay} />))}
                    </View>
                    <View style={styles.separator} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Actualite

const styles = StyleSheet.create({
    container: { gap: 25, flex: 1, padding: 10, paddingHorizontal: 15, paddingTop: 20, alignItems: "center", justifyContent: "center" },
    button: { padding: 15, backgroundColor: colors.main, width: "100%", borderRadius: 5, alignItems: "center", justifyContent: "center" },
    button_text: { fontWeight: "bold", color: colors.white },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "70%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 22 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15 },
    desc: { fontWeight: "300", textAlign: "justify", color: colors.dark },
    screen_title_line: { width: "20%", height: 4, backgroundColor: colors.black, borderRadius: 50, marginVertical: 2, marginBottom: 10, alignSelf: 'center' },
    separator: { height: 50 }
})