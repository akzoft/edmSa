import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NotificationCard } from '../../components';
import { ReadNotification, RootState, colors, deleteOneNotification, getAllNotifications } from '../../libs';
import { Overlay } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Notification: FC<any> = ({ navigation }) => {
    const dispatch = useDispatch<any>();
    const [notif, setNotif] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const { auth } = useSelector((state: RootState) => state?.user)
    const { notifications } = useSelector((state: RootState) => state?.notif)

    useEffect(() => {
        if (auth)
            dispatch(getAllNotifications(auth?.id, auth?.accessToken));
    }, [dispatch, auth])

    const toggleOverlay = () => { setVisible(!visible) }

    const handleRead = () => {
        if (notif && auth) {
            dispatch(ReadNotification(notif.id, auth?.accessToken));
            navigation.navigate("detail_notif", { notif })
            dispatch({ type: "reset_tmp" })
        }
    }

    const handleDelete = () => {
        if (auth && notif)
            dispatch(deleteOneNotification(notif?.id, auth?.accessToken))
    }

    return (
        <View style={styles.container}>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.bottomSheet]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}>Options notification</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>

                    <TouchableOpacity onPress={handleRead} style={{ borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: colors.white }}>Lire la notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={{ borderRadius: 5, padding: 15, backgroundColor: colors.red, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: colors.white }}>Supprimer la notification</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Overlay>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.content}>
                    {notifications?.map(notif => (<NotificationCard key={notif?.id} notif={notif} handleLongPress={toggleOverlay} setNotif={setNotif} />))}
                </View>
                <View style={styles.separator} />
            </ScrollView>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.body },
    content: { width: "100%", padding: 10, paddingHorizontal: 15, gap: 10, alignItems: "center" },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "30%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 18 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15, justifyContent: "center", gap: 10 },
    desc: { fontWeight: "300", textAlign: "justify" },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 20 }
})