import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IValidation, RootState, colors, css, empty, getCode, handleChangeMobile, images, validation } from '../../libs'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'

const Validation = () => {
    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>("")
    const [inputs, setinputs] = useState<IValidation>({ userId: "", pin: "", deviceId: "" })
    const { loading, errors, user, username, auth } = useSelector((state: RootState) => state?.user)

    //display errors if exists
    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])

    //reset la variable username if auth
    useEffect(() => {
        if (!empty(auth)) dispatch({ type: "reset_username" })
    }, [auth])

    //validate inscription
    const handleValidate = () => {
        if (!inputs.pin || inputs.pin === "") { setError("Le code de validation est requis."); return; }

        messaging().getToken().then(res => {
            if (user) inputs.userId = user?.id
            inputs.deviceId = res
            dispatch(validation(inputs))
        }).catch(err => console.log(err))
    }

    //retrieve another sms for the code if not yet got
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
                            <Text style={css.auth.title}>AUTHENTIFICATION</Text>
                            <Text style={css.auth.subtitle}>Veuillez renseigner le code de validation reçu sur votre téléphone.</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} keyboardType="number-pad" placeholder='Code de validation' value={inputs.pin} onChangeText={(text) => handleChangeMobile("pin", text, setinputs)} />
                        </View>



                        <TouchableOpacity onPress={handleValidate} style={css.auth.button}>
                            {loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Vérifier</Text>}
                        </TouchableOpacity>

                        <View style={css.auth.trybox}>
                            <Text style={css.auth.try}>Vous n'avez pas reçu de code? </Text>
                            <TouchableOpacity onPress={handleRetry}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>réessayer</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={css.auth.separator} />
            </ScrollView>
        </>
    )
}

export default Validation




// keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android