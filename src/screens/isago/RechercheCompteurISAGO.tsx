import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ICompteur, IISAGOsearch, RootState, colors, images, searchISAGO } from '../../libs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const RechercheCompteurISAGO: FC<any> = ({ navigation }) => {
    const dispatch = useDispatch<any>()
    const [searchText, setSearchText] = useState<string>();
    const { auth } = useSelector((state: RootState) => state?.user)
    const { isago, tmp } = useSelector((state: RootState) => state?.isago)
    const { isago_cpt } = useSelector((state: RootState) => state?.compteur)

    useEffect(() => {
        if (tmp) {
            navigation.navigate("resultat_isago", { isago })
            dispatch({ type: "reset_tmp" })
        }
    }, [tmp]);


    const handleSearch = () => {
        const data: IISAGOsearch = {
            compteur: searchText,
            customerId: auth?.id,
        }
        if (auth)
            dispatch(searchISAGO(data, auth?.accessToken));
    }


    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ padding: 10, marginTop: 15 }}>
                        {isago_cpt?.length > 0 && <Text style={{ fontSize: 15, color: colors.black, fontWeight: "500" }}>Mes compteurs ISAGO</Text>}
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={isago_cpt}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {


                                    return <View>
                                        <CompteurSmallCard key={item.id.toString()} compteur={item} />
                                    </View>
                                }}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={{ gap: 10 }}

                            />
                        </View>
                    </View>

                    <View style={styles.forms}>
                        <View style={{ width: "100%", gap: 20 }}>

                            <Text style={{ textAlign: "center", fontSize: 22, textTransform: "uppercase", color: colors.black }}>Paiement ISAGO</Text>
                            <Text style={{ textAlign: "center" }}>Veuillez inserer dans le champ ci-dessous, votre numéro de compteur ISAGO</Text>

                            <View>
                                <TextInput placeholder='Numéro de compteur' value={searchText} onChangeText={text => setSearchText(text)} style={styles.input} />
                            </View>

                            <View style={{ gap: 15 }}>
                                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                                    <Text style={styles.btn_text}>Rechercher</Text>
                                </TouchableOpacity>

                                {/* <TouchableOpacity style={styles.button}>
                                    <Text style={styles.btn_text}>Consulter un reçu</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 15 }} />
                </ScrollView>
            </View>
        </View>
    )
}

export default RechercheCompteurISAGO


const CompteurSmallCard: FC<{ compteur: ICompteur }> = ({ compteur }) => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const { auth } = useSelector((state: RootState) => state?.user)
    const { isago, tmp } = useSelector((state: RootState) => state?.isago)

    useEffect(() => {
        if (tmp) {
            navigation.navigate("resultat_isago", { isago })
            dispatch({ type: "reset_tmp" })
        }
    }, [tmp]);


    const handleSearch = () => {
        const data: IISAGOsearch = {
            compteur: compteur?.number,
            customerId: auth?.id,
        }
        if (auth)
            dispatch(searchISAGO(data, auth?.accessToken));
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
    container: {
        flex: 1, backgroundColor: colors.main,
    },
    content: {
        flex: 1,
        backgroundColor: colors.body,
    },
    forms: {
        flex: 1, alignItems: "center", gap: 10, justifyContent: "center", padding: 30
    },
    input: { width: "100%", borderWidth: 0.5, borderColor: colors.white, borderRadius: 5, backgroundColor: colors.white, paddingHorizontal: 10 },
    button: { padding: 15, borderRadius: 5, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: colors.main },
    btn_text: { textAlign: "center", fontWeight: "bold", color: colors.white }
})



