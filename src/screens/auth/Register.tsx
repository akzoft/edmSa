import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IRegisterReq, RootState, colors, css, handleChangeMobile, images, inscription, register_validation, removePhoneIndicatif, } from '../../libs'
import Toast from 'react-native-toast-message'
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp } from '@react-navigation/native'
import { getQuartiers } from '../../libs/redux/actions/quartier.action'
import { requestUserPermission } from '../../libs/others/functions'
import { IQuartier } from '../../libs/others/models'
import AsyncStorage from '@react-native-async-storage/async-storage'

type props = { navigation: NavigationProp<any> }

const Register: FC<props> = ({ navigation }) => {
    const init = { name: "", username: "", email: "", phone: "", password: "", quarterId: '' }
    const dispatch = useDispatch<any>();
    const [inputs, setInputs] = useState<IRegisterReq>(init)
    const [error, setError] = useState<string>()
    const [quartierList, setQuartierList] = useState<any>();
    const { user_loading, errors, temp, user, username, auth } = useSelector((state: RootState) => state?.user)
    const { quartier_loading, quartiers } = useSelector((state: RootState) => state?.quartier)

    // const quartiers: any = [
    //     { id: '1', name: 'magnambougou', commune: { id: 'cm-1', name: 'commune 1', city: { id: 'v-1', name: 'ville 1' } } },
    //     { id: '2', name: 'faladié', commune: { id: 'cm-2', name: 'commune 2', city: { id: 'v-2', name: 'ville 2' } } },
    //     { id: '3', name: 'lafiabougou', commune: { id: 'cm-3', name: 'commune 3', city: { id: 'v-3', name: 'ville 3' } } },
    //     { id: '4', name: 'kalaban', commune: { id: 'cm-4', name: 'commune 4', city: { id: 'v-4', name: 'ville 4' } } },
    //     { id: '5', name: 'attbougou', commune: { id: 'cm-5', name: 'commune 5', city: { id: 'v-5', name: 'ville 5' } } },
    // ]


    //display errors if exist
    useEffect(() => {
        if ((errors || error)) { Toast.show({ type: 'error', text1: 'Informations', text2: errors || error, }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])

    //go to verification screen if signup succeed
    useEffect(() => {
        if (temp) {
            navigation.navigate("validation", { user, username });
            const qrtier = quartiers?.find((quartier: any) => quartier?.id?.toString() === inputs?.quarterId?.toString())

            const subjet = [qrtier?.id, qrtier?.commune?.id, qrtier?.commune?.city?.id]
            requestUserPermission(subjet).then(res => console.log(res)).catch(err => console.log(err))

            AsyncStorage.setItem('quartierId', JSON.stringify(qrtier?.id)).then(res => console.log('')).catch(err => console.log(err))

            dispatch({ type: "reset_temp" })
        }
    }, [temp])

    useEffect(() => { setQuartierList(quartiers.map((quartier: any) => { return { key: quartier?.id, value: quartier.name } })) }, [quartiers]);

    //get all quarters
    useEffect(() => {
        dispatch(getQuartiers())
    }, [dispatch]);

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
                        <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                            <SelectList
                                setSelected={(val: any) => setInputs((old: any) => { return { ...old, quarterId: val } })}
                                fontFamily='lato'
                                data={quartierList}
                                searchPlaceholder='Rechercher le quartier'
                                placeholder='Selectionner votre quartier*'
                                notFoundText='Liste de quatier vide'
                                search={true}
                                save="key"
                                inputStyles={{ color: colors.dark, borderRadius: 5, }}
                                boxStyles={{ borderWidth: 0.5, borderRadius: 5, borderColor: 'rgba(0,0,0,0.5)' }}
                                dropdownStyles={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.5)', borderRadius: 3 }}
                                dropdownTextStyles={{ color: colors.dark }}
                            />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} keyboardType="phone-pad" placeholder='Numéro de téléphone*' value={inputs.phone.toString()} onChangeText={(text) => handleChangeMobile("phone", text, setInputs)} />
                        </View>
                        <View style={css.auth.form_item}>
                            <TextInput style={css.auth.input} placeholderTextColor={'rgba(0,0,0,0.5)'} secureTextEntry={true} placeholder='Mot de passe*' value={inputs.password.toString()} onChangeText={(text) => handleChangeMobile("password", text, setInputs)} />
                        </View>

                        <TouchableOpacity disabled={(quartier_loading && user_loading) ? true : false} onPress={handleRegister} style={css.auth.button}>
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