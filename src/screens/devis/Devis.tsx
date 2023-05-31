import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { colors, css } from '../../libs'


const Devis: FC<any> = ({ navigation }) => {

    return (
        <View style={css.home.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
            <View style={css.home.content}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.navigate("demande_devis")} style={styles.button}>
                            <Text style={styles.button_text}>Demande de devis</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.button_text}>Consulter les devis</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.button_text}>Payer un devis</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Devis

const styles = StyleSheet.create({
    container: {
        gap: 25, flex: 1, padding: 35, alignItems: "center", justifyContent: "center"
    },
    button: {
        padding: 15, backgroundColor: colors.main, width: "100%", borderRadius: 5, alignItems: "center", justifyContent: "center"

    },
    button_text: {
        fontWeight: "bold", color: colors.white
    }
})