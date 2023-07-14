import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IRegisterReq, RootState, colors, css, handleChangeMobile, images, inscription, register_validation, removePhoneIndicatif, } from '../../libs'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp } from '@react-navigation/native'

type props = { navigation: NavigationProp<any> }

const Register: FC<props> = ({ navigation }) => {
    const init = { name: "", username: "", email: "", phone: "", password: "" }
    const dispatch = useDispatch<any>();
    const [inputs, setInputs] = useState<IRegisterReq>(init)
    const [error, setError] = useState<string>()
    const { user_loading, errors, temp, user, username } = useSelector((state: RootState) => state?.user)

    //display errors if exist
    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])

    //go to verification screen if signup succeed
    useEffect(() => {
        if (temp) {
            navigation.navigate("validation", { user, username });
            dispatch({ type: "reset_temp" })
        }
    }, [temp])

    //signup user
    const handleRegister = () => {
        inputs.phone = removePhoneIndicatif(inputs.phone.toString().trim())
        if (inputs.email && inputs.email !== "") inputs.email = inputs.email.toLowerCase().trim()

        //validation
        if (register_validation(inputs) !== "") { setError(register_validation(inputs)); return; } else setError("")
        dispatch(inscription(inputs))
    }

    return (
        <>
            <View style={css.auth.toast}><Toast /></View>
            <StatusBar barStyle={"dark-content"} backgroundColor={colors.body} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                <View style={css.auth.container}>
                    <Image source={images.logoT} />

                    <View style={css.auth.forms}>
                        <View style={css.auth.labels}>
                            <Text style={css.auth.title}>INSCRIPTION</Text>
                            <Text style={css.auth.subtitle}>Veuillez vous inscrire</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} placeholder='Nom complet*' value={inputs.name.toString()} onChangeText={(text) => handleChangeMobile("name", text, setInputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} placeholder="Nom d'utilisateur*" value={inputs.username.toString()} onChangeText={(text) => handleChangeMobile("username", text, setInputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} placeholder='Email (Optionnel)' value={inputs.email ? inputs.email.toString() : ""} onChangeText={(text) => handleChangeMobile("email", text, setInputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} keyboardType="phone-pad" placeholder='Numéro de téléphone*' value={inputs.phone.toString()} onChangeText={(text) => handleChangeMobile("phone", text, setInputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} secureTextEntry={true} placeholder='Mot de passe*' value={inputs.password.toString()} onChangeText={(text) => handleChangeMobile("password", text, setInputs)} />
                        </View>

                        <TouchableOpacity onPress={handleRegister} style={css.auth.button}>
                            {user_loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!user_loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>S'inscrire</Text>}
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

export default Register