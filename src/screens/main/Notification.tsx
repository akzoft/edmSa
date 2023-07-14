import { ActivityIndicator, Animated, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CustomLoader, NotificationCard } from '../../components';
import { ReadNotification, RootState, colors, deleteOneNotification, getAllNotifications, reverseArray } from '../../libs';
import { Overlay } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useIsFocused } from '@react-navigation/native';

const Notification: FC<any> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const dispatch = useDispatch<any>();
    const [notif, setNotif] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)

    const [loadedItems, setLoadedItems] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const { auth, user_loading } = useSelector((state: RootState) => state?.user)
    const { notifications } = useSelector((state: RootState) => state?.notif)


    //fade in animation
    useEffect(() => {
        if (isFocused) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim, isFocused, user_loading]);

    const toggleOverlay = () => { setVisible(!visible) }

    const handleRead = () => {
        if (notif && auth) {
            dispatch(ReadNotification(notif.id, auth?.accessToken));
            navigation.navigate("detail_notif", { notif })
            dispatch({ type: "reset_tmp" })
            toggleOverlay()
        }
    }


    const handleEndReached = () => {
        if (loadedItems < notifications.length && loadedItems % 5 === 0) {
            setIsLoading(true);

            setTimeout(() => {
                setLoadedItems((prevLoadedItems) => prevLoadedItems + 5);
                setIsLoading(false);
            }, 1000);
        }
    };

    const handleDelete = () => {
        if (auth && notif) {
            dispatch(deleteOneNotification(notif?.id, auth?.accessToken))
            toggleOverlay()
        }
    }

    if ((user_loading))
        return <CustomLoader />

    return (
        <Animated.View ref={viewRef} style={[styles.container, { opacity: fadeAnim, flex: 1 }]}>
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
            <View style={[styles.content, { flexGrow: 1, paddingTop: 15 }]}>
                {/* {notifications?.map(notif => (<NotificationCard key={notif?.id} notif={notif} handleLongPress={toggleOverlay} setNotif={setNotif} />))} */}

                <FlatList
                    data={notifications?.slice(0, loadedItems)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <NotificationCard key={notif?.id} notif={item} handleLongPress={toggleOverlay} setNotif={setNotif} />}
                    keyExtractor={(item) => item?.id.toString()}
                    contentContainerStyle={{ padding: 10, gap: 10 }}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.8} // Appeler onEndReached lorsque vous êtes à 50% de la fin de la liste
                />
                {isLoading && <ActivityIndicator size="large" color="gray" style={{ marginBottom: 20 }} />}

            </View>
            <View style={styles.separator} />

        </Animated.View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.body },
    content: { width: "100%", padding: 10, paddingHorizontal: 5, gap: 10, alignItems: "center" },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "30%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 18 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15, justifyContent: "center", gap: 10 },
    desc: { fontWeight: "300", textAlign: "justify", color: colors.dark },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 20 }
})