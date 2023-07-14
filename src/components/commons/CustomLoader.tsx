import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../libs'

const CustomLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.main} />
            <View style={styles.txtbox}>
                <Text style={styles.text}>Veuillez patienter pendant le chargement des données.</Text>
                <Text style={styles.text}>Merci</Text>
            </View>
        </View>
    )
}

export default CustomLoader

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: "center", justifyContent: "center", width: '100%' },
    txtbox: { alignItems: 'center', justifyContent: 'center', },
    text: { fontSize: 12, color: colors.main, },
})