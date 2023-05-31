import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors, images } from '../../libs'
import { Image } from 'react-native'

const Header: FC<any> = ({ title, canGoBack, stack }) => {

    return (
        <View style={{ backgroundColor: colors.main, padding: 15, height: 100, paddingTop: 20, justifyContent: "center", }}>
            {!stack ?
                <View style={{ gap: 2, alignItems: "center" }}>
                    <View style={[{ backgroundColor: colors.white, width: 60, height: 60, borderRadius: 60, alignItems: "center", justifyContent: "center" },]}>
                        <Image source={images.logoT} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                    </View>
                    <Text style={{ color: colors.white, fontSize: 24 }}>{title}</Text>
                </View> :
                <View style={{ gap: 2, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={[{ backgroundColor: colors.white, width: 60, height: 60, borderRadius: 60, alignItems: "center", justifyContent: "center" },]}>
                        <Image source={images.logoT} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
                    </View>
                    <Text style={{ color: colors.white, fontSize: 24, marginLeft: "-20%" }}>{title}</Text>
                    <View><Text></Text></View>
                </View>
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})