import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IDevisReq, api_fichiers, colors, devis_validation3, images } from "../../../libs";

type TFiles = { proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete: any, autBranchement: any, locCopieIdentiteProprietaire: any, locCopieIdentiteLocataire: any, locCopieVisa: any }
type props = { scrollViewRef: any, setError: any, tabs: any, activeTab: any, setActiveTab: any, setVal: any, inputs: IDevisReq, setInputs: any, files: TFiles, setFiles: any }
const InfosDisplay: FC<props> = ({ scrollViewRef, tabs, activeTab, setActiveTab, setVal, inputs }) => {
    var dot = 4;

    const handleNext = () => {
        setActiveTab((prevTab: number) => (prevTab < tabs.length - 1 ? prevTab + 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };

    const handlePrevious = () => {
        setVal(2)
        setActiveTab((prevTab: number) => (prevTab > 0 ? prevTab - 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20, }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: dot !== 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                    <Text style={{ marginHorizontal: 8, color: colors.dark }}> sur </Text><View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: dot === 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{5}</Text></View>
                </View>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[styles.title, { marginVertical: 10 }]}>4. Dossier à fournir</Text>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: colors.black }}>4.1 Propriétaire</Text>

                <View style={{ paddingHorizontal: 10, gap: 15 }}>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            <Image source={{ uri: `${api_fichiers}/${inputs?.proTitrePropriete}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} />
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Titre de propriété ou équivalent</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            <Image source={{ uri: `${api_fichiers}/${inputs?.quittusEdm}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} />
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Quitus EDM / point de livraison</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            <Image source={{ uri: `${api_fichiers}/${inputs?.proCopieIdentite}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} />
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Copie carte ID ou NINA ou PP</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            <Image source={{ uri: `${api_fichiers}/${inputs?.proCopieVisa}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} />
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Copie VISA conformité ACAVIF</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ color: colors.black, marginTop: 15 }}>4.2 Locataire (facultatif)</Text>

                <View style={{ paddingHorizontal: 10, gap: 15 }}>
                    <View style={{ marginTop: 10, flexDirection: "row", width: "100%", justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            {inputs?.locTitrePropriete ? <Image source={{ uri: `${api_fichiers}/${inputs?.locTitrePropriete}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} /> : <Text style={{ color: colors.black, fontWeight: "bold" }}>N/A</Text>}
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Titre de propriété ou équivalent</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            {inputs?.autBranchement ? <Image source={{ uri: `${api_fichiers}/${inputs?.autBranchement}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} /> : <Text style={{ color: colors.black, fontWeight: "bold" }}>N/A</Text>}
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Attestation Aut. branchement</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            {inputs?.locCopieIdentiteProprietaire ? <Image source={{ uri: `${api_fichiers}/${inputs?.locCopieIdentiteProprietaire}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} /> : <Text style={{ color: colors.black, fontWeight: "bold" }}>N/A</Text>}
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Copie carte ID ou NINA ou PP / proprio</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                            {inputs?.locCopieIdentiteLocataire ? <Image source={{ uri: `${api_fichiers}/${inputs?.locCopieIdentiteLocataire}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} /> : <Text style={{ color: colors.black, fontWeight: "bold" }}>N/A</Text>}
                            <View >
                                <Text style={{ textAlign: "center", color: colors.dark }}>Copie carte ID ou NINA ou PP / local</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, alignItems: "center" }} >
                        {inputs?.locCopieVisa ? <Image source={{ uri: `${api_fichiers}/${inputs?.locCopieVisa}` }} style={{ width: "100%", height: 100, resizeMode: 'contain' }} /> : <Text style={{ color: colors.black, fontWeight: "bold" }}>N/A</Text>}
                        <View >
                            <Text style={{ textAlign: "center", color: colors.dark }}>Copie VISA conformité ACAVIF</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
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

export default InfosDisplay

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
    btn: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 2, padding: 15 }
})