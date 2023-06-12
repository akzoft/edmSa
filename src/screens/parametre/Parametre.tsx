import { Animated, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NotificationCard } from '../../components';
import { ICompteur, ReadNotification, RootState, colors, create_compteur, deleteOneNotification, delete_compteur, getAllCompteur, getAllNotifications, handleChangeMobile, images, reverseArray, update_compteur } from '../../libs';
import { Overlay } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Parametre: FC<any> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const dispatch = useDispatch<any>();
    const [error, setError] = useState({ label: "", type: "", number: "" });
    const [visible, setVisible] = useState<boolean>(false)
    const [visible1, setVisible1] = useState<boolean>(false)
    const [visible2, setVisible2] = useState<boolean>(false)
    const init = { id: "", number: "", label: "", type: "" };
    const [inputsCompteur, setInputsCompteur] = useState<ICompteur>(init);
    const [typeCompteur, setTypeCompteur] = useState<string>("ISAGO");
    const [typeEditCompteur, setTypeEditCompteur] = useState<string>("");
    const [edit, setEdit] = useState(false);
    const [compteur, setCompteur] = useState<ICompteur>({ id: "", number: "", label: "", type: "" });
    const { auth } = useSelector((state: RootState) => state?.user)
    const { tmp, temp, compteurs, tmp_del } = useSelector((state: RootState) => state?.compteur)


    useEffect(() => {
        if (compteur)
            setTypeEditCompteur(compteur.type)
    }, [compteur]);


    //fade in animation
    useEffect(() => {
        if (isFocused) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim, isFocused]);

    const toggleOverlay = () => { setVisible(!visible) }
    const toggleOverlay1 = () => { setVisible1(!visible1) }
    const toggleOverlay2 = () => { setVisible2(!visible2) }

    //for add
    useEffect(() => {
        if (tmp) {
            setInputsCompteur(init)
            toggleOverlay1();
            dispatch({ type: "reset_tmp" });
        }
    }, [tmp]);

    //for update
    useEffect(() => {
        if (temp) {
            setCompteur(init)
            toggleOverlay2();
            dispatch({ type: "reset_temp" });
        }
    }, [temp]);

    //for delete
    useEffect(() => {
        if (auth)
            if (tmp_del) {
                setCompteur(init)
                dispatch(getAllCompteur(auth?.id, auth?.accessToken));
                toggleOverlay2();
                dispatch({ type: "reset_tmp_del" });
            }
    }, [tmp_del]);


    const handleAddCompteur = () => {

        if (inputsCompteur.label === "") { setError(old => { return { ...old, label: "Le label du compteur est requis." } }); return; } else
            setError(old => { return { ...old, label: "" } });

        if (typeCompteur === "") { setError(old => { return { ...old, type: "Le type de compteur est requis." } }); return; } else
            setError(old => { return { ...old, type: "" } });


        if (inputsCompteur.number === "") { setError(old => { return { ...old, number: "Le type de compteur est requis." } }); return; } else
            setError(old => { return { ...old, number: "" } });

        if (auth) {
            inputsCompteur.customerId = auth?.id
            inputsCompteur.type = typeCompteur

            dispatch(create_compteur(inputsCompteur, auth?.accessToken));

        }
    }

    const handleUpdate = () => {
        if (compteur.label === "") { setError(old => { return { ...old, label: "Le label du compteur est requis." } }); return; } else
            setError(old => { return { ...old, label: "" } });

        if (typeEditCompteur === "") { setError(old => { return { ...old, type: "Le type de compteur est requis." } }); return; } else
            setError(old => { return { ...old, type: "" } });


        if (compteur.number === "") { setError(old => { return { ...old, number: "Le type de compteur est requis." } }); return; } else
            setError(old => { return { ...old, number: "" } });

        if (auth) {
            compteur.customerId = auth?.id
            compteur.type = typeCompteur

            dispatch(update_compteur(compteur?.id, compteur, auth?.accessToken));

        }
    }


    const handleDelete = () => {
        if (auth)
            dispatch(delete_compteur(compteur?.id, auth?.accessToken))
    }



    return (
        <Animated.View ref={viewRef} style={[styles.container, { opacity: fadeAnim, flex: 1 }]}>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.bottomSheet]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}>Modification profile</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>

                    <TouchableOpacity style={{ borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: colors.white }}>Enregistrer les modifications</Text>
                    </TouchableOpacity>

                </ScrollView>
            </Overlay>

            <Overlay isVisible={visible1} onBackdropPress={toggleOverlay1} overlayStyle={[[styles.bottomSheet, { height: "65%" }]]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}>Nouveau compteur</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay1}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>
                    <View style={{ gap: 10 }}>
                        <View style={{ gap: 5 }}>
                            <Text>Label <Text style={{ fontSize: 13, fontStyle: "italic" }}>(Text de distinction compteur)</Text></Text>
                            <TextInput value={inputsCompteur.label} onChangeText={text => handleChangeMobile("label", text, setInputsCompteur)} style={{ borderWidth: 0.2, borderRadius: 5, padding: 15 }} />
                            <Text style={{ fontSize: 10, color: colors.danger }}>{error.label}</Text>
                        </View>

                        <Text>Type de compteur</Text>

                        <View style={[styles.input,]}>
                            <Picker
                                selectedValue={typeCompteur}
                                onValueChange={(val) => setTypeCompteur(val)}>
                                <Picker.Item label="Compteur ISAGO" value="ISAGO" />
                                <Picker.Item label="Compteur CLASSIC" value="CLASSIC" />

                            </Picker>
                        </View>
                        <Text style={{ fontSize: 10, color: colors.danger }}>{error.type}</Text>

                        <View style={{ gap: 5 }}>
                            <Text>Numéro compteur/Réference client</Text>
                            <TextInput value={inputsCompteur.number} onChangeText={text => handleChangeMobile("number", text, setInputsCompteur)} style={{ borderWidth: 0.2, borderRadius: 5, padding: 15 }} />
                            <Text style={{ fontSize: 10, color: colors.danger }}>{error.number}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleAddCompteur} style={{ borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: colors.white }}>Enregister</Text>
                    </TouchableOpacity>

                </ScrollView>
            </Overlay>

            <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2} overlayStyle={[[styles.bottomSheet, { height: edit ? "65%" : "20%" }]]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}>Options du compteur</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay2}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>
                    <View style={{ gap: 10 }}>
                        {!edit && <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity onPress={handleDelete} style={{ flex: 3, borderRadius: 5, padding: 15, backgroundColor: colors.danger, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white }}>Supprimer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setEdit(!edit)} style={{ flex: 9, borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white }}>{!edit ? "Mise à jour" : "Annuler"}</Text>
                            </TouchableOpacity>
                        </View>}


                        {edit && <>
                            <View style={{ gap: 5 }}>
                                <Text>Label <Text style={{ fontSize: 13, fontStyle: "italic" }}>(Text de distinction compteur)</Text></Text>
                                <TextInput value={compteur.label} onChangeText={text => handleChangeMobile("label", text, setCompteur)} style={{ borderWidth: 0.2, borderRadius: 5, padding: 15 }} />
                                <Text style={{ fontSize: 10, color: colors.danger }}>{error.label}</Text>
                            </View>

                            <Text>Type de compteur</Text>

                            <View style={[styles.input,]}>
                                <Picker
                                    selectedValue={typeEditCompteur}
                                    onValueChange={(val) => setTypeEditCompteur(val)}>
                                    <Picker.Item label="Compteur ISAGO" value="ISAGO" />
                                    <Picker.Item label="Compteur CLASSIC" value="CLASSIC" />

                                </Picker>
                            </View>
                            <Text style={{ fontSize: 10, color: colors.danger }}>{error.type}</Text>

                            <View style={{ gap: 5 }}>
                                <Text>Numéro compteur/Réference client</Text>
                                <TextInput value={compteur.number} onChangeText={text => handleChangeMobile("number", text, setCompteur)} style={{ borderWidth: 0.2, borderRadius: 5, padding: 15 }} />
                                <Text style={{ fontSize: 10, color: colors.danger }}>{error.number}</Text>
                            </View>
                        </>}
                    </View>
                    {edit &&
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity onPress={() => setEdit(!edit)} style={{ flex: 3, borderRadius: 5, padding: 15, backgroundColor: colors.danger, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white }}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleUpdate} style={{ flex: 9, borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: colors.white }}>Enregister les modification</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </ScrollView>
            </Overlay>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ padding: 15 }}>
                    <Ionicons name="ios-person-circle-sharp" size={100} />
                    <View style={{ paddingLeft: 15 }}>
                        <Text>Nom complet: <Text style={{ color: colors.black, fontWeight: "600" }}>{auth?.name}</Text></Text>
                        <Text>Nom utilisateur: <Text style={{ color: colors.black, fontWeight: "600" }}>{auth?.username}</Text></Text>
                        <Text>N° tel: <Text style={{ color: colors.black, fontWeight: "600" }}>{auth?.phone}</Text></Text>
                        {auth?.email && <Text>Email: <Text style={{ color: colors.black, fontWeight: "600" }}>{auth?.email}</Text></Text>}
                    </View>
                </View>

                <View style={{ padding: 15 }}>
                    {compteurs?.length > 0 && <Text style={{ fontSize: 20, color: colors.black, fontWeight: "500" }}>Mes compteurs</Text>}
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            data={compteurs}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {


                                return <View>
                                    <CompteurSmallCard setCompteur={setCompteur} toggleOverlay2={toggleOverlay2} key={item.toString()} compteur={item} />
                                </View>
                            }}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{ gap: 10 }}

                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity onPress={toggleOverlay} activeOpacity={1} style={{ borderRadius: 5, padding: 15, backgroundColor: colors.main, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <View style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center", padding: 5, backgroundColor: colors.white, borderRadius: 5 }}><FontAwesome name='user' size={20} /></View>
                            <Text style={{ color: colors.white }}>Modifier mes informations</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} color={colors.white} />

                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleOverlay1} activeOpacity={1} style={{ borderRadius: 5, padding: 15, backgroundColor: colors.main, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <View style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center", padding: 5, backgroundColor: colors.white, borderRadius: 5 }}><MaterialCommunityIcons name='electric-switch-closed' size={20} /></View>
                            <Text style={{ color: colors.white }}>Ajouter un nouveau compteur</Text>
                        </View>

                        <FontAwesome name="angle-right" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
            </ScrollView>
        </Animated.View>
    )
}

export default Parametre



const CompteurSmallCard: FC<{ compteur: ICompteur, toggleOverlay2: any, setCompteur: any }> = ({ compteur, toggleOverlay2, setCompteur }) => {
    const { auth } = useSelector((state: RootState) => state?.user)

    const handleClick = () => {
        setCompteur(compteur)
        toggleOverlay2()
    }


    return (
        <TouchableOpacity onPress={handleClick} style={{ borderRadius: 5, paddingVertical: 10, paddingHorizontal: 5, backgroundColor: colors.dark, width: 230, gap: 5 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ alignItems: "center" }}>
                    <Image source={images.compteur} style={{ width: 40, height: 40, resizeMode: "contain" }} />
                    <Text style={{ color: colors.white, fontSize: 5 }}>{compteur?.type}</Text>
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
    container: { flex: 1, justifyContent: "center", backgroundColor: colors.body },
    content: { width: "100%", padding: 10, paddingHorizontal: 15, gap: 10, justifyContent: "center" },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "30%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 18 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15, justifyContent: "center", gap: 10 },
    desc: { fontWeight: "300", textAlign: "justify" },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 20 },
    input: { borderWidth: 0.5, borderColor: colors.dark, borderRadius: 5, paddingLeft: 15, color: colors.main },
})