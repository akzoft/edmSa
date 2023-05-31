import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors, images } from '../../libs'
import { Image } from 'react-native'

const Header: FC<any> = ({ title, canGoBack }) => {






    return (
        <View style={{ backgroundColor: colors.main, padding: 10, paddingHorizontal: 35, paddingTop: 15, height: 100, justifyContent: "center", }}>
            <View style={{ gap: 2, alignItems: "center" }}>
                <View style={{ backgroundColor: colors.white, width: 60, height: 60, borderRadius: 60, alignItems: "center", justifyContent: "center" }}>
                    <Image source={images.logoT} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                </View>
                <Text style={{ color: colors.white, fontSize: 24 }}>{title}</Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})