import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { colors, images } from '../../libs'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Header: FC<any> = ({ title, canGoBack, stack }) => {
    const navigation = useNavigation<any>()

    return (
        <View style={{ backgroundColor: colors.main, padding: 15, height: 100, paddingTop: 20, justifyContent: "center", }}>
            {!stack ?
                <View style={{ gap: 2, alignItems: "center" }}>
                    <View style={[{ backgroundColor: colors.white, width: 60, height: 60, borderRadius: 60, alignItems: "center", justifyContent: "center" },]}>
                        <Image source={images.logoT} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                    </View>
                    <Text style={{ color: colors.white, fontSize: 24 }}>{title}</Text>
                </View> :
                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", gap: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9} style={[{ backgroundColor: colors.white, width: 60, height: 60, borderRadius: 60, alignItems: "center", justifyContent: "center" },]}>
                        <Image source={images.logoT} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                    </TouchableOpacity>
                    <Text style={{ color: colors.white, fontSize: 24, marginLeft: "-20%" }}>{title}</Text>
                    <View><Text></Text></View>
                </View>
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})