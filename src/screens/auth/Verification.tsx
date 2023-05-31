import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RootState, colors, css, getCode, images, verify } from '../../libs'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'

const Verification: FC<any> = ({ navigation }) => {
    const [pin, setpin] = useState<number>(0)
    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>("")
    const { loading, errors, temp, code, username } = useSelector((state: RootState) => state?.user)



    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])


    useEffect(() => {
        if (temp) {
            navigation.navigate("reset");
            dispatch({ type: "reset_temp" })
            dispatch({ type: "reset_username" })
        }
    }, [temp])


    const handleVerify = () => {
        dispatch(verify({ type: "sms", pin, id: code.id }, code.pin))
    }


    const handleRetry = () => {
        if (username)
            dispatch(getCode(username))
    }

    return (
        <>
            <View style={css.auth.toast}><Toast /></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                <View style={css.auth.container}>
                    <Image source={images.logoT} />

                    <View style={css.auth.forms}>
                        <View style={css.auth.labels}>
                            <Text style={css.auth.title}>Vérification code de récupération</Text>
                            <Text style={css.auth.subtitle}>Veuillez renseigner le code de recuperation reçu sur votre téléphone.</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} keyboardType="number-pad" placeholder='Code de récupération' value={pin === 0 ? "" : pin.toString()} onChangeText={text => setpin(parseInt(text))} />
                        </View>


                        <TouchableOpacity onPress={handleVerify} style={css.auth.button}>
                            {loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Vérifier</Text>}
                        </TouchableOpacity>

                        <View style={[css.auth.trybox, { marginBottom: 15 }]}>
                            <Text style={css.auth.try}>Vous n'avez pas reçu de code? </Text>
                            <TouchableOpacity onPress={handleRetry}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>réessayer</Text></TouchableOpacity>
                        </View>

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

export default Verification

