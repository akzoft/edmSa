import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RootState, colors, css, getAllFacture, images, searchFacture } from '../../libs'
import { useDispatch, useSelector } from 'react-redux'
import { ICompteur, IFactureSearchReq } from '../../libs/others/models'
import { useNavigation } from '@react-navigation/native'
import { CustomLoader } from '../../components'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RechercheFacture: FC<any> = ({ navigation }) => {
    const dispatch = useDispatch<any>()
    const [searchText, setSearchText] = useState<string>();
    const [error, setError] = useState('');
    const { auth, user_loading } = useSelector((state: RootState) => state?.user)
    const { factures, tmp, facture_loading, errors } = useSelector((state: RootState) => state?.facture)
    const { classics_cpt, c_loading } = useSelector((state: RootState) => state?.compteur)
    const [click, setClick] = useState(false);


    //display errors if exist
    useEffect(() => {
        if (((errors && errors !== null) || (error && error != ""))) { Toast.show({ type: 'error', text1: 'Informations', text2: error ? error : errors ? errors : '', }); setError(""); dispatch({ type: "reset_errors" }) }
    }, [error, errors])

    useEffect(() => {
        if (tmp) {
            navigation.navigate("paiement_facture", { factures })
            dispatch({ type: "reset_tmp" })
            setClick(false)
        }
    }, [tmp]);

    useEffect(() => {
        AsyncStorage.removeItem('notif').then((ans: any) => { console.log('') }).catch(err => console.log(err))
        dispatch({ type: 'receive_notif', payload: 'pending' })
    }, [dispatch]);




    const handleSearch = () => {
        if (!searchText || searchText === '') {
            setError('Référence client requise.'); return;
        } else { setError(''); }

        const data: IFactureSearchReq = {
            ref: searchText,
            customerId: auth?.id,
        }

        if (auth) dispatch(searchFacture(data, auth?.accessToken));
        setClick(true)
    }

    if (!click && (facture_loading || c_loading || user_loading))
        return <CustomLoader />

    return (
        <View style={styles.container}>
            <View style={css.auth.toast}><Toast /></View>
            <View style={styles.content}>

                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ padding: 10, marginTop: 15 }}>
                        {classics_cpt?.length > 0 && <Text style={{ fontSize: 15, color: colors.black, fontWeight: "500" }}>Mes compteurs POST PAID</Text>}
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={classics_cpt}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return <View>
                                        <CompteurSmallCard key={index} compteur={item} />
                                    </View>
                                }}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={{ gap: 10 }}

                            />
                        </View>
                    </View>


                    <View style={[styles.forms, { padding: 30 }]}>
                        <View style={{ width: "100%", gap: 20 }}>

                            <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black }}>FACTURE POST PAID</Text>
                            <Text style={{ textAlign: "center", color: colors.dark }}>Veuillez indiquer votre référence client dans la case ci-dessous.</Text>

                            <View>
                                <TextInput placeholder='Référence client' placeholderTextColor={'rgba(0,0,0,0.5)'} style={styles.input} value={searchText} onChangeText={(text) => setSearchText(text)} />
                            </View>

                            <View style={{ gap: 15 }}>
                                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                                    {!facture_loading ? <Text style={styles.btn_text}>Rechercher la facture</Text> :
                                        <ActivityIndicator size={'small'} color={'white'} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 15 }} />
                </ScrollView>
            </View>
        </View>
    )
}

export default RechercheFacture

const CompteurSmallCard: FC<{ compteur: ICompteur }> = ({ compteur }) => {
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { auth } = useSelector((state: RootState) => state?.user)
    const { facture, tmp } = useSelector((state: RootState) => state?.facture)

    useEffect(() => {
        if (tmp) {
            navigation.navigate("paiement_facture", { facture })
            dispatch({ type: "reset_tmp" })
        }
    }, [tmp]);


    const handleSearch = () => {
        const data: IFactureSearchReq = {
            ref: compteur?.number,
            customerId: auth?.id,
        }

        if (auth)
            dispatch(searchFacture(data, auth?.accessToken));
    }

    return (
        <TouchableOpacity onPress={handleSearch} activeOpacity={0.9} style={{ borderRadius: 5, paddingVertical: 10, paddingHorizontal: 5, backgroundColor: colors.dark, width: 230, gap: 5 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ alignItems: "center" }}>
                    <Image source={images.compteur} style={{ width: 40, height: 40, resizeMode: "contain" }} />
                </View>
                <View>
                    <Text style={{ color: colors.wheat }}>{auth?.name?.slice(0, 17)}{auth && auth?.name?.length > 17 && "..."}</Text>
                    <Text style={{ color: colors.white }}>{compteur?.number?.slice(0, 17)}{compteur?.number?.length > 17 && "..."}</Text>
                    <Text style={{ color: colors.white, fontSize: 8 }}>{compteur?.label?.slice(0, 35)}{compteur?.label?.length > 35 && "..."}</Text>
                </View>
            </View>
        </TouchableOpacity>)
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.main, },
    content: { flex: 1, backgroundColor: colors.body },
    forms: { flex: 1, alignItems: "center", gap: 10, justifyContent: "center", },
    input: { width: "100%", borderWidth: 0.5, borderColor: colors.white, borderRadius: 5, color: colors.main, backgroundColor: colors.white, paddingHorizontal: 10 },
    button: { padding: 15, borderRadius: 5, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: colors.main },
    btn_text: { textAlign: "center", fontWeight: "bold", color: colors.white }
})



