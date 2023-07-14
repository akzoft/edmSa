import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IValidation, RootState, colors, css, empty, getCode, handleChangeMobile, images, validation } from '../../libs'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Validation: FC<any> = ({ route }) => {
    const routes = route?.params
    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>("")
    const [inputs, setinputs] = useState<IValidation>({ userId: "", pin: "", deviceId: "" })
    const { user_loading, errors, auth, code } = useSelector((state: RootState) => state?.user)



    //display errors if exists
    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])

    //reset la variable username if auth
    useEffect(() => {
        if (!empty(auth)) dispatch({ type: "reset_username" })
    }, [auth])


    const [cod, setCc] = useState<any>('');
    const [c_code, setC_code] = useState<any>();
    useEffect(() => {
        const setCod = async () => {
            try {
                if (code?.pin) await AsyncStorage.setItem('cod', JSON.stringify(code))
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


    //validate inscription
    const handleValidate = () => {
        if (!inputs.pin || inputs.pin === "") { setError("Le code de validation est requis."); return; }

        messaging().getToken().then(res => {
            if (routes?.user) inputs.userId = routes?.user?.id
            inputs.deviceId = res
            dispatch(validation(inputs))
        }).catch(err => console.log(err))
    }

    //retrieve another sms for the code if not yet got
    const handleRetry = () => {
        if (routes?.username) dispatch(getCode(routes?.username))
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
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} keyboardType="number-pad" placeholder='Code de validation' value={inputs.pin} onChangeText={(text) => handleChangeMobile("pin", text, setinputs)} />
                        </View>



                        <TouchableOpacity onPress={handleValidate} style={css.auth.button}>
                            {user_loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!user_loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Vérifier</Text>}
                        </TouchableOpacity>

                        <View style={css.auth.trybox}>
                            <Text style={css.auth.try}>Vous n'avez pas reçu de code? </Text>
                            <TouchableOpacity onPress={handleRetry}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>réessayez</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ color: colors.dark }}>code: <Text style={{ color: 'blue' }}>{cod || routes?.user?.confirm}</Text></Text>
                </View>
                <View style={css.auth.separator} />
            </ScrollView>
        </>
    )
}

export default Validation




// keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android