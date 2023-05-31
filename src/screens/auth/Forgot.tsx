import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RootState, colors, css, forget, images } from '../../libs'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'

const Forgot: FC<any> = ({ navigation }) => {

    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const { loading, errors, temp } = useSelector((state: RootState) => state?.user)

    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])

    useEffect(() => {
        if (temp) {
            navigation.navigate("verification_forgot");
            dispatch({ type: "reset_temp" })
        }
    }, [temp])


    const handleForget = () => {
        if (!username || username === "") { setError("Le nom d'utilisateur est requis."); return; }
        dispatch(forget(username))
    }


    return (
        <>
            <View style={css.auth.toast}><Toast /></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                <View style={css.auth.container}>
                    <Image source={images.logoT} />

                    <View style={css.auth.forms}>
                        <View style={css.auth.labels}>
                            <Text style={css.auth.title}>MOT DE PASSE OUBLIER</Text>
                            <Text style={css.auth.subtitle}>Veuillez renseigner votre numéro de téléphone pour la récupération de votre mot de passe.</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} keyboardType="phone-pad" placeholder="Nom d'utilisateur/Numéro de téléphone" value={username} onChangeText={(text) => setUsername(text)} />
                        </View>

                        <TouchableOpacity disabled={loading ? true : false} onPress={handleForget} style={css.auth.button}>
                            {loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Vérifier</Text>}
                        </TouchableOpacity>

                        <View style={css.auth.trybox}>
                            <Text style={css.auth.try}>Vous avez déjà un compte! </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>Connecter vous</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={css.auth.separator} />
            </ScrollView>
        </>
    )
}

export default Forgot







