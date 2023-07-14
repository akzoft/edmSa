import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RootState, colors, css, getCode, images, verify } from '../../libs'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Verification: FC<any> = ({ navigation, route }) => {
    const routes = route?.params
    const [pin, setpin] = useState<any>('')
    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>("")
    const { user_loading, errors, temp, code } = useSelector((state: RootState) => state?.user)


    ///VERIFICATION POUR LE MOT DE PASSE OUBLIER

    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])


    const [cod, setCc] = useState<any>('');
    const [c_code, setC_code] = useState<any>();
    useEffect(() => {
        const setCod = async () => {
            try {
                if (code?.pin) await AsyncStorage.setItem('cod', JSON.stringify(code))
                else if (routes?.code?.pin) await AsyncStorage.setItem('cod', JSON.stringify(routes?.code))
            } catch (error) {
                console.log(error)
            }
        }

        const getCod = async () => {
            try {
                const cc: any = await AsyncStorage.getItem('cod')
                const pcc: any = JSON.parse(cc)
                if (pcc) { setCc(pcc.pin); setC_code(pcc) }
            } catch (error) {
                console.log(error)
            }
        }

        setCod()
        getCod()
    }, [code, routes?.code?.pin]);


    useEffect(() => {
        if (temp) {
            if (routes?.code || code) {
                navigation.navigate("reset", { code: c_code || routes?.code });
                dispatch({ type: "reset_temp" })
                dispatch({ type: "reset_username" })
                routes.code = null
                routes.username = null
            }
        }
    }, [temp])



    const cd: any = code?.pin || routes?.code.pin
    const handleVerify = () => {
        dispatch(verify({ type: "sms", pin, id: routes?.code.id }, cod?.toString()))
    }


    const handleRetry = () => {
        if (routes?.username)
            dispatch(getCode(routes?.username))
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
                            <Text style={css.auth.subtitle}>Veuillez renseigner le code de récupération reçu sur votre téléphone.</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput placeholderTextColor={'rgba(0,0,0,0.5)'} style={css.auth.input} keyboardType="number-pad" placeholder='Code de récupération' value={pin} onChangeText={text => setpin(text)} />
                        </View>


                        <TouchableOpacity onPress={handleVerify} style={css.auth.button}>
                            {user_loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!user_loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Vérifier</Text>}
                        </TouchableOpacity>

                        <View style={[css.auth.trybox, { marginBottom: 15 }]}>
                            <Text style={css.auth.try}>Vous n'avez pas reçu de code? </Text>
                            <TouchableOpacity onPress={handleRetry}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>réessayez</Text></TouchableOpacity>
                        </View>

                        <View style={css.auth.trybox}>
                            <Text style={css.auth.try}>Vous avez déjà un compte! </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>Connectez-vous</Text></TouchableOpacity>
                        </View>

                        <Text style={{ color: colors.dark }}>code: {cod || cd}</Text>
                    </View>

                </View>
                <View style={css.auth.separator} />
            </ScrollView>
        </>
    )
}

export default Verification

