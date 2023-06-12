import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RootState, colors, deleteOneNotification } from '../../libs'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/fr';

const DetailNotification: FC<any> = ({ route, navigation }) => {
    const routes = route?.params
    const dispatch = useDispatch<any>();
    const [notif, setNotif] = useState<any>()
    const { auth } = useSelector((state: RootState) => state?.user)

    useEffect(() => {
        if (routes?.notif) { setNotif(routes?.notif) }
    }, [routes])

    const handleDelete = () => {
        if (auth && notif) {
            dispatch(deleteOneNotification(notif?.id, auth?.accessToken))
            navigation.navigate("notification")
        }
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={{ padding: 20, gap: 20 }}>
                <Text style={{ fontSize: 22 }}>{notif?.title}</Text>
                <Text style={{ textAlign: "justify" }}>{notif?.message}</Text>
                <Text style={{ alignSelf: "flex-end", fontStyle: "italic", fontSize: 12, color: "brown" }}>{moment(notif?.updatedAt).fromNow()}</Text>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                <TouchableOpacity onPress={handleDelete} style={{ borderRadius: 5, padding: 15, backgroundColor: colors.red, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: colors.white }}>Supprimer la notification</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailNotification

const styles = StyleSheet.create({})