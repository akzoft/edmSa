import { Text, TouchableOpacity, View } from 'react-native'
import React, { FC, } from 'react'
import { INotification, RootState, colors, ReadNotification } from '../../libs'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import 'moment/locale/fr';

type props = { notif: INotification, handleLongPress: any, setNotif: any, }

const NotificationCard: FC<props> = ({ notif, handleLongPress, setNotif }) => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>();
    const { auth } = useSelector((state: RootState) => state?.user)

    const handlePress = () => {
        handleLongPress()
        if (notif) setNotif(notif)
    }


    const handleRead = () => {
        if (notif && auth) {
            dispatch(ReadNotification(notif.id, auth?.accessToken));
            navigation.navigate("detail_notif", { notif })
            dispatch({ type: "reset_tmp" })
        }
    }


    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleRead} onLongPress={handlePress} style={{ backgroundColor: !notif?.readed ? "#ADD8E6" : colors.white, padding: 10, borderRadius: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ padding: 2, width: "95%", flexDirection: "row", gap: 5 }}>
                    {!notif?.readed && <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: colors.info }} />}
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.black, marginBottom: 10 }}>{notif?.title?.slice(0, 30)}{notif?.title?.length > 30 && "..."}</Text>
                        <Text>{notif?.message?.slice(0, 120)}{notif?.message?.length > 120 && "..."}</Text>
                        <Text style={{ fontSize: 12, fontStyle: "italic", alignSelf: "flex-end", }}>{moment(notif?.updatedAt).fromNow()}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handlePress}>
                    <Entypo name="dots-three-vertical" color={colors.dark} size={20} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default NotificationCard

// const styles = StyleSheet.create({
//     container: { paddingTop: 20, alignItems: "center" },
//     content: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", backgroundColor: "gray" },
//     bounce: { flexDirection: "row", gap: 5 }
// })

{/*  */ }