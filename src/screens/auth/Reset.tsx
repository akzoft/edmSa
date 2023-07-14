import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RootState, colors, css, handleChangeMobile, images, reset, reset_validation } from '../../libs'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'

type Treset = { password: string, confirm: string, id: string, pin: number, type: string }
const Reset: FC<any> = ({ navigation, route }) => {
    const routes = route?.params
    const [inputs, setInputs] = useState<Treset>({ id: "", pin: 0, type: "", password: "", confirm: "" })
    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>("")
    const { user_loading, errors, temp } = useSelector((state: RootState) => state?.user)


    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])


    useEffect(() => {
        if (temp) {
            if (routes?.code) {
                navigation.navigate("login");
                dispatch({ type: "reset_temp" })
                routes.code = null
            }
        }
    }, [temp])

    const handleReset = () => {
        if (reset_validation(inputs)) { setError(reset_validation(inputs)); return; } else setError("")
        if (routes?.code) {
            inputs.id = routes?.code?.id;
            inputs.type = "sms";
            inputs.pin = routes?.code?.pin
            dispatch(reset(inputs))
        }

    }

    return (
        <>
            <View style={css.auth.toast}><Toast /></View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                <View style={css.auth.container}>
                    <Image source={images.logoT} />

                    <View style={css.auth.forms}>
                        <View style={css.auth.labels}>
                            <Text style={css.auth.title}>Réinitialiser votre mot de passe</Text>
                            <Text style={css.auth.subtitle}>Renseignez votre nouveau mot de passe.</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} secureTextEntry={true} placeholder='Mot de passe' value={inputs.password} onChangeText={text => handleChangeMobile("password", text, setInputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} secureTextEntry={true} placeholder='Confirmation' value={inputs.confirm} onChangeText={text => handleChangeMobile("confirm", text, setInputs)} />
                        </View>

                        <TouchableOpacity onPress={handleReset} style={css.auth.button}>
                            {user_loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!user_loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Réinitialiser</Text>}
                        </TouchableOpacity>

                        <View style={css.auth.trybox}>
                            <Text style={css.auth.try}>Vous avez déjà un compte! </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>Connectez-vous</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={css.auth.separator} />
            </ScrollView>
        </>
    )
}

export default Reset
