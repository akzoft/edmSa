import { FC, useEffect, useState } from "react";
import { LogBox, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IDevisReq, colors, devis_validation3, file_size_validation } from "../../../libs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DocumentPicker from 'react-native-document-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import { request, PERMISSIONS } from 'react-native-permissions';
import { Image } from 'react-native-compressor';



type TFiles = { proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete: any, autBranchement: any, locCopieIdentiteProprietaire: any, locCopieIdentiteLocataire: any, locCopieVisa: any }
type props = { scrollViewRef: any, setError: any, tabs: any, activeTab: any, setActiveTab: any, setVal: any, inputs: IDevisReq, setInputs: any, files: TFiles, setFiles: any }
const Infoss: FC<props> = ({ scrollViewRef, setError, tabs, activeTab, setActiveTab, setVal, files, setFiles, inputs, setInputs }) => {
    const init: TFiles = { proTitrePropriete: null, quittusEdm: null, proCopieIdentite: null, proCopieVisa: null, locTitrePropriete: null, autBranchement: null, locCopieIdentiteProprietaire: null, locCopieIdentiteLocataire: null, locCopieVisa: null };
    const [visible, setVisible] = useState(false);
    const [fieldName, setFieldName] = useState('');
    var dot = 4;

    LogBox.ignoreAllLogs();



    //add to local storage
    useEffect(() => {
        AsyncStorage.getItem("quit").then((data: any) => {
            let _inputs: IDevisReq = JSON.parse(data)
            if (_inputs?.typeCompteur !== "" ||
                _inputs?.proTitrePropriete !== inputs?.proTitrePropriete || _inputs?.quittusEdm !== inputs?.quittusEdm ||
                _inputs?.proCopieIdentite !== inputs?.proCopieIdentite || _inputs?.proCopieVisa !== inputs?.proCopieVisa
            ) {
                inputs.proTitrePropriete = files.proTitrePropriete
                inputs.quittusEdm = files.quittusEdm
                inputs.proCopieIdentite = files.proCopieIdentite
                inputs.proCopieVisa = files.proCopieVisa

                inputs.locTitrePropriete = files?.locTitrePropriete
                inputs.autBranchement = files?.autBranchement
                inputs.locCopieIdentiteProprietaire = files?.locCopieIdentiteProprietaire
                inputs.locCopieIdentiteLocataire = files?.locCopieIdentiteLocataire
                inputs.locCopieVisa = files?.locCopieVisa

                on_cancel_store_data_to_asyncstore(inputs)
            }
        })
    }, [files]);


    //retrieve from local storage
    // useEffect(() => {
    //     AsyncStorage.getItem("quit").then((data: any) => {
    //         let _inputs: IDevisReq = JSON.parse(data)
    //         if (_inputs !== null && _inputs !== undefined) {
    //             setFiles({ proTitrePropriete: _inputs?.proTitrePropriete, quittusEdm: _inputs?.quittusEdm, proCopieIdentite: _inputs?.proCopieIdentite, proCopieVisa: _inputs?.proCopieVisa, locTitrePropriete: _inputs?.locTitrePropriete, autBranchement: _inputs?.autBranchement, locCopieIdentiteProprietaire: _inputs?.locCopieIdentiteProprietaire, locCopieIdentiteLocataire: _inputs?.locCopieIdentiteLocataire, locCopieVisa: _inputs?.locCopieVisa })
    //         }
    //     }).catch(err => console.log(err));
    // }, []);


    const on_cancel_store_data_to_asyncstore = async (data: IDevisReq) => {
        try {
            await AsyncStorage.setItem("quit", JSON.stringify(data))
        } catch (error) {
            console.error('Error writing to JSON file:', error);
        }
    };



    const handleNext = () => {
        inputs.proTitrePropriete = files?.proTitrePropriete
        inputs.quittusEdm = files?.quittusEdm
        inputs.proCopieIdentite = files?.proCopieIdentite
        inputs.proCopieVisa = files?.proCopieVisa

        inputs.locTitrePropriete = files?.locTitrePropriete
        inputs.autBranchement = files?.autBranchement
        inputs.locCopieIdentiteProprietaire = files?.locCopieIdentiteProprietaire
        inputs.locCopieIdentiteLocataire = files?.locCopieIdentiteLocataire
        inputs.locCopieVisa = files?.locCopieVisa

        if (devis_validation3(inputs) !== "") {
            setError(devis_validation3(inputs));
            return;
        }


        if (file_size_validation(inputs) !== "") {
            setError(file_size_validation(inputs));
            return;
        }

        setActiveTab((prevTab: number) => (prevTab < tabs.length - 1 ? prevTab + 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };

    const handlePrevious = () => {
        setVal(2)
        setActiveTab((prevTab: number) => (prevTab > 0 ? prevTab - 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };

    // gestion upload image
    const pickImage = async () => {
        try {
            const _files: any = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            });

            setFiles((prevFiles: TFiles) => ({
                ...prevFiles,
                [fieldName]: _files[0],
            }));
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
            } else {
                console.error('Error picking multiple files:', err);
            }
        }
    };


    //select image
    const selectImage = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((granted) => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    ImageCropPicker.openPicker({ cropping: true, cropperCircleOverlay: false, mediaType: 'photo', includeBase64: false, })
                        .then((response: any) => {
                            if (!response.cancelled) {
                                //  setFile({ uri: response.path, type: 'image/jpeg', name: 'image.jpg', })

                                Image.compress(response?.path, { compressionMethod: 'auto', quality: 0.2 })
                                    .then(image => {
                                        const imgs = image?.split('/')
                                        const filename = imgs[imgs?.length - 1].split('.')[0]

                                        setFiles((prevFiles: TFiles) => ({
                                            ...prevFiles,
                                            [fieldName]: { uri: image, type: 'image/jpeg', name: filename + '-image.jpg' },
                                        }));
                                    }).catch(err => { console.log(err) });
                            }
                        })
                        .catch((error) => { setError(error) });
                }
            }).catch(err => { console.log(err) })

        setVisible(false)
    };

    const takePhoto = async () => {

        try {
            const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
            const granted = await request(permission);
            if (granted === 'granted') {
                const image = await ImageCropPicker.openCamera({ width: 300, height: 400, cropping: true, includeBase64: false })

                const img = await Image.compress(image?.path, { compressionMethod: 'auto', quality: 0.2 })
                const imgs = image?.path?.split('/')
                const filename = imgs[imgs?.length - 1].split('.')[0]

                setFiles((prevFiles: TFiles) => ({
                    ...prevFiles,
                    [fieldName]: { uri: img, type: 'image/jpeg', name: filename + '-image.jpg' },
                }));

            } else {
                console.log('Permission refusée pour accéder à la caméra');
            }
            setVisible(false)
        } catch (error) {
            console.log(error);
        }




    };

    const openToggle = (fieldName: string) => {
        setVisible(!visible)
        setFieldName(fieldName)
    }

    const reset = () => {
        setFiles(init)
    }

    return (
        <View>
            {/* <View style={{ flexDirection: "row", marginVertical: 15 }}>
                {[1, 2, 3, 4, 5]?.map(dot => (
                    <View key={dot} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: colors.dark }} />
                        <View style={{ borderRadius: 20, width: 20, height: 20, alignItems: "center", justifyContent: "center", backgroundColor: dot === 4 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                        <View style={{ width: "15%", height: 1, backgroundColor: dot === 4 ? colors.primary : colors.dark }} />
                    </View>))}
            </View> */}

            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} >
                <Dialog.Title>Choisissez une option</Dialog.Title>
                <Dialog.Description>
                    {'\n'}
                    <Dialog.Button onPress={() => takePhoto()} label="Prendre une photo" style={{ textAlign: 'center', color: colors.info }} />
                    {'\n'}
                    {'\n'}
                    <Dialog.Button onPress={() => selectImage()} label="Choisissez une image" style={{ textAlign: 'center', color: colors.info }} />
                </Dialog.Description>
                <Dialog.Button onPress={() => setVisible(false)} label="Annuler" style={{ color: colors.danger }} />
            </Dialog.Container>

            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20, }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: dot !== 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                    <Text style={{ marginHorizontal: 8, color: colors.dark }}> sur </Text><View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: dot === 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{5}</Text></View>
                </View>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[styles.title, { marginVertical: 10 }]}>4. Dossier à fournir</Text>
                <TouchableOpacity onPress={reset}><Text style={{ fontWeight: "bold", fontSize: 10, textDecorationLine: "underline", color: colors.main }}>Effacer tout</Text></TouchableOpacity>
            </View>

            {/* <View><Image source={files.proTitrePropriete} style={{ width: 80, height: 80 }} /></View> */}


            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: colors.black, marginBottom: 20 }}>4.1 Propriétaire</Text>

                <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("proTitrePropriete")}>
                        <Text style={styles.sec_label}>Titre de propriété ou équivalent</Text>
                        {files?.proTitrePropriete ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("quittusEdm")}>
                        <Text style={styles.sec_label}>Quitus EDM / point de livraison</Text>
                        {files?.quittusEdm ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("proCopieIdentite")}>
                        <Text style={styles.sec_label}>Copie carte ID ou NINA ou PP</Text>
                        {files?.proCopieIdentite ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("proCopieVisa")}>
                        <Text style={styles.sec_label}>Copie VISA conformité ACAVIF</Text>
                        {files?.proCopieVisa ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />
                </View>

                <Text style={{ color: colors.black, marginVertical: 15 }}>4.2 Locataire (facultatif)</Text>
                <View style={{ paddingHorizontal: 10 }}>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("locTitrePropriete")}>
                        <Text style={styles.sec_label}>Titre de propriété ou équivalent</Text>
                        {files?.locTitrePropriete ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("autBranchement")}>
                        <Text style={styles.sec_label}>Attestation Aut. branchement</Text>
                        {files?.autBranchement ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("locCopieIdentiteProprietaire")}>
                        <Text style={styles.sec_label}>Copie carte ID ou NINA ou PP / proprio</Text>
                        {files?.locCopieIdentiteProprietaire ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("locCopieIdentiteLocataire")}>
                        <Text style={styles.sec_label}>Copie carte ID ou NINA ou PP / local</Text>
                        {files?.locCopieIdentiteLocataire ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />

                    <TouchableOpacity style={styles.btn} onPress={() => openToggle("locCopieVisa")}>
                        <Text style={styles.sec_label}>Copie VISA conformité ACAVIF</Text>
                        {files?.locCopieVisa ? <FontAwesome name="check-circle" size={35} color={colors.success} /> :
                            <FontAwesome name="plus-circle" size={35} color={colors.main} />}
                    </TouchableOpacity>

                    <View style={styles.separateur} />


                    <View>
                        <Text style={[styles.title, { marginVertical: 10 }]}>4.3. Notez Bien</Text>


                        <View style={{ paddingHorizontal: 10, gap: 15, marginBottom: 15 }}>
                            <View>
                                <Text style={styles.sec_label}>4.3.1 Le compteur est une propriété d'EDM et ne peut être déplacé sous aucun prétexte.</Text>
                            </View>

                            <View style={{ gap: 3 }}>
                                <Text style={styles.sec_label}>4.3.2 Aucun devis n'est valable au delà des périodes suivantes:</Text>
                                <View style={{ paddingHorizontal: 10, gap: 3 }}>
                                    <Text style={styles.sec_label}>-Devis de branchement simple (6) mois</Text>
                                    <Text style={styles.sec_label}>-Devis de branchement avec extension trois (3) mois.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={handlePrevious} disabled={activeTab === 0} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                    <Text style={styles.button_text}>Précédent</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNext} disabled={activeTab === tabs.length - 1} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                    <Text style={styles.button_text}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Infoss

const styles = StyleSheet.create({
    container: { paddingTop: 20 },
    title: { fontSize: 18, color: colors.black },
    separator: { height: 20 },
    forms: { gap: 10 },
    form_item: { flexDirection: "row", gap: 5, marginVertical: 5 },
    input: { borderWidth: 0.5, borderColor: colors.dark, borderRadius: 5, paddingLeft: 15, color: colors.main },
    required: { color: colors.warning },
    info: { fontSize: 10, fontStyle: "italic" },
    label: { marginVertical: 4, paddingLeft: 10 },
    button: { borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white },
    btn: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 2, paddingVertical: 5, width: '100%' },
    sec_label: { color: colors.dark, fontSize: 14 },
    separateur: { height: 0.5, backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', alignSelf: 'flex-end' },

})