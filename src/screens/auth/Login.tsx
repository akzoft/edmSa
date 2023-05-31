import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ILoginReq, RootState, colors, connexion, css, handleChangeMobile, images, login_validation } from '../../libs'
import { NavigationProp } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import { StatusBar } from 'react-native'

type props = { navigation: NavigationProp<any>, route: any }
const Login: FC<props> = ({ navigation }) => {
    const dispatch = useDispatch<any>();
    const [inputs, setinputs] = useState<ILoginReq>({ username: "", password: "", mobile: true, deviceId: "" })
    const [error, setError] = useState<string>()
    const { errors, loading } = useSelector((state: RootState) => state?.user)

    //display errors if exist
    useEffect(() => {
        if (((errors && errors !== null) || (error && error != ""))) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])


    const handleLogin = () => {
        //validation
        if (login_validation(inputs) !== "") { setError(login_validation(inputs)); return; } else setError("")

        messaging().getToken().then(res => {
            inputs.deviceId = res
            inputs.mobile = true

            dispatch(connexion(inputs))
        }).catch(err => console.log(err))
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
                            <Text style={css.auth.title}>IDENTIFICATION</Text>
                            <Text style={css.auth.subtitle}>Veuillez vous identifier</Text>
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholder='Nom utilisateur/Téléphone' value={inputs.username} onChangeText={text => handleChangeMobile("username", text, setinputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} secureTextEntry={true} placeholder='Mot de passe' value={inputs.password} onChangeText={text => handleChangeMobile("password", text, setinputs)} />
                        </View>

                        <View style={css.auth.trybox}>
                            <Text style={css.auth.try}>Mot de passe </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("forgot")}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>Oublier ?</Text></TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleLogin} style={css.auth.button}>
                            {loading && <ActivityIndicator size={20} color={colors.white} pointerEvents="none" />}
                            {!loading && <Text style={{ color: colors.white, fontWeight: "bold" }}>Vérifier</Text>}
                        </TouchableOpacity>


                        <View style={[css.auth.trybox, { marginTop: 20 }]}>
                            <Text style={css.auth.try}>Vous n'avez pas encore de compte? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("register")}><Text style={{ color: colors.main, textDecorationLine: "underline" }}>Inscriver vous</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={css.auth.separator} />
            </ScrollView>
        </>
    )
}

export default Login
