import { FC, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IDevisReq, colors, devis_validation1, devis_validation2, handleChangeMobile, typeID } from "../../../libs";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

type TFiles = { proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete: any, autBranchement: any, locCopieIdentiteProprietaire: any, locCopieIdentiteLocataire: any, locCopieVisa: any }
type props = { files: TFiles, setFiles: any, typeVille: any, setTypeVille: any, scrollViewRef: any, tabs: any, activeTab: any, setActiveTab: any, val: number, typeCpt: any, setTypeCpt: any, typeDemande: any, setTypeDemande: any, typeUsage: any, setTypeUsage: any, typeCivilite: any, setTypeCivilite: any, typeTID: any, setTypeTID: any, inputs: IDevisReq, setInputs: any, setError: any, }
const General: FC<props> = ({ files, setFiles, typeVille, setTypeVille, scrollViewRef, setError, tabs, activeTab, setActiveTab, val, typeCpt, setTypeCpt, typeDemande, setTypeDemande, typeUsage, setTypeUsage, typeCivilite, setTypeCivilite, typeTID, setTypeTID, inputs, setInputs }) => {

    const totalSections = 5;
    const [currentSection, setCurrentSection] = useState(val || 0);
    const [activeSection, setActiveSection] = useState<number[]>()

    const pickerRef = useRef<any>();

    useEffect(() => {
        const tab = []
        for (let index = 0; index < totalSections; index++) {
            tab.push(index)
        }
        setActiveSection(tab)
    }, [])


    //add to local storage
    useEffect(() => {
        AsyncStorage.getItem("quit").then((data: any) => {
            let _inputs: IDevisReq = JSON.parse(data)
            if (_inputs?.typeCompteur !== inputs?.typeCompteur || _inputs?.typeDemande !== inputs.typeDemande ||
                _inputs?.usage === inputs.usage || _inputs?.typeIdentification !== inputs?.typeIdentification ||
                _inputs?.civilite !== inputs?.civilite || _inputs?.ville !== inputs?.ville
            ) {

                inputs.typeCompteur = typeCpt
                inputs.typeDemande = typeDemande
                inputs.usage = typeUsage
                inputs.typeIdentification = typeTID
                inputs.civilite = typeCivilite
                inputs.ville = typeVille;
                on_cancel_store_data_to_asyncstore(inputs)
            }
        })
    }, [inputs, typeCpt, typeDemande, typeUsage, typeDemande, typeCivilite, typeVille, typeTID]);


    //retrieve from local storage
    useEffect(() => {
        AsyncStorage.getItem("quit").then((data: any) => {
            let _inputs: IDevisReq = JSON.parse(data)
            if (_inputs !== null && _inputs !== undefined) {
                setInputs(_inputs);
                setTypeCpt(_inputs.typeCompteur)
                setTypeDemande(_inputs?.typeDemande)
                setTypeCivilite(_inputs?.civilite)
                setTypeTID(_inputs?.typeIdentification)
                setTypeUsage(_inputs?.usage)
                setTypeVille(_inputs?.ville)
            }
        }).catch(err => console.log(err));
    }, []);


    const on_cancel_store_data_to_asyncstore = async (data: IDevisReq) => {
        try {
            await AsyncStorage.setItem("quit", JSON.stringify(data))
        } catch (error) {
            console.error('Error writing to JSON file:', error);
        }
    };

    // for sections


    const goToNextSection = () => {
        if (currentSection === 0) {
            inputs.typeCompteur = typeCpt
            inputs.typeDemande = typeDemande
            inputs.usage = typeUsage

            if (devis_validation1(inputs) !== "") { setError(devis_validation1(inputs)); return; }
        }


        setCurrentSection(currentSection + 1);
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };



    const goToPreviousSection = () => {
        setCurrentSection(currentSection - 1);
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };


    const handleNext = () => {
        if (currentSection === 2) {
            inputs.civilite = typeCivilite
            inputs.typeIdentification = typeTID
            if (devis_validation2(inputs) !== "") { setError(devis_validation2(inputs)); return; }
        }
        setActiveTab((prevTab: number) => (prevTab < tabs.length - 1 ? prevTab + 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 25 }}>
                {activeSection?.map(dot => (
                    <View key={dot} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: currentSection === dot ? colors.primary : colors.dark }} />
                        <View style={{ borderRadius: 20, width: 20, height: 20, alignItems: "center", justifyContent: "center", backgroundColor: currentSection === dot ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot + 1}</Text></View>
                        <View style={{ width: "15%", height: 1, backgroundColor: currentSection === dot ? colors.primary : colors.dark }} />
                    </View>))}
            </View>


            {/* section 1 */}
            {currentSection === 0 && (
                <View>
                    <Text style={styles.title}>1. Nouvelle demande</Text>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Type de compteur <Text style={styles.required}>*</Text></Text>
                        <View style={[styles.input,]}>
                            <Picker
                                ref={pickerRef}
                                selectedValue={typeCpt}
                                onValueChange={(val) => setTypeCpt(val)}>
                                <Picker.Item label="Type de compteur" value="" />
                                <Picker.Item label="Compteur Conventionnel" value="Compteur Conventionnel" />
                                <Picker.Item label="Compteur ISAGO" value="Compteur ISAGO" />

                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Type de demande <Text style={styles.required}>*</Text></Text>
                        <View style={[styles.input,]}>
                            <Picker
                                ref={pickerRef}
                                selectedValue={typeDemande}
                                onValueChange={(val) => setTypeDemande(val)}>
                                <Picker.Item label="Type de demande" value="" />
                                <Picker.Item label="Nouveau" value="Nouveau" />
                                <Picker.Item label="Mutation/Aug./Dim./Chang. Puissance" value="Mutation/Aug./Dim./Chang. Puissance" />
                                <Picker.Item label="Réabonnement" value="Réabonnement" />

                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Usage <Text style={styles.required}>*</Text></Text>
                        <View style={[styles.input,]}>
                            <Picker
                                ref={pickerRef}
                                selectedValue={typeUsage}
                                onValueChange={(val) => setTypeUsage(val)}>
                                <Picker.Item label="Usage" value="" />
                                <Picker.Item label="Domestique" value="Domestique" />
                                <Picker.Item label="Commercial" value="Commercial" />

                            </Picker>
                        </View>
                    </View>

                    <View style={styles.separator} />


                    {currentSection < totalSections - 1 && (
                        <TouchableOpacity onPress={goToNextSection} activeOpacity={0.7} style={styles.button} >
                            <Text style={styles.button_text}>Suivant</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}


            {/* section 2 */}
            {currentSection === 1 && (
                <View>
                    <Text style={styles.title}>2. Charge prévue</Text>

                    <View style={[styles.forms, { marginBottom: 15 }]}>
                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Climatiseurs</Text>
                                <TextInput keyboardType="number-pad" placeholder='Nombre de climateur' style={[styles.input,]} value={inputs?.climatiseur ? inputs.climatiseur?.toString() : ""} onChangeText={text => handleChangeMobile("climatiseur", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ventilateurs</Text>
                                <TextInput keyboardType="number-pad" placeholder='Nombre de ventilateurs' style={[styles.input,]} value={inputs?.ventilateur ? inputs.ventilateur?.toString() : ""} onChangeText={text => handleChangeMobile("ventilateur", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Machine à laver</Text>
                                <TextInput keyboardType="number-pad" placeholder='Nombre de machine à laver' style={[styles.input,]} value={inputs?.machineLaver ? inputs.machineLaver?.toString() : ""} onChangeText={text => handleChangeMobile("machineLaver", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ampoules</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre d'ampoules" style={[styles.input,]} value={inputs?.ampoule ? inputs.ampoule?.toString() : ""} onChangeText={text => handleChangeMobile("ampoule", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Chauffe eau</Text>
                                <TextInput keyboardType="number-pad" placeholder='Nombre de chauffe eau' style={[styles.input,]} value={inputs?.chauffeEau ? inputs.chauffeEau?.toString() : ""} onChangeText={text => handleChangeMobile("chauffeEau", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ordinateurs</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre d'ordinateur" style={[styles.input,]} value={inputs?.ordinateur ? inputs.ordinateur?.toString() : ""} onChangeText={text => handleChangeMobile("ordinateur", text, setInputs)} />
                            </View>

                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Congélateurs</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre de congélateur" style={[styles.input,]} value={inputs?.congelateur ? inputs.congelateur?.toString() : ""} onChangeText={text => handleChangeMobile("congelateur", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Réfrigerateurs</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre de réfrigérateur" style={[styles.input,]} value={inputs?.refrigerateur ? inputs.refrigerateur?.toString() : ""} onChangeText={text => handleChangeMobile("refrigerateur", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Téléviseur</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre de téléviseur" style={[styles.input,]} value={inputs?.televiseur ? inputs.televiseur?.toString() : ""} onChangeText={text => handleChangeMobile("televiseur", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Boulloire électrique</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre de bouilloire électrique" style={[styles.input,]} value={inputs?.bouilloireElectrique ? inputs.bouilloireElectrique?.toString() : ""} onChangeText={text => handleChangeMobile("bouilloireElectrique", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Fer à repasser</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre de fer à repasser" style={[styles.input,]} value={inputs?.ferRepasser ? inputs.ferRepasser?.toString() : ""} onChangeText={text => handleChangeMobile("ferRepasser", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Téléphone</Text>
                                <TextInput keyboardType="number-pad" placeholder="Nombre de téléphone" style={[styles.input,]} value={inputs?.telephone ? inputs.telephone?.toString() : ""} onChangeText={text => handleChangeMobile("telephone", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Autres</Text>
                                <TextInput keyboardType="number-pad" placeholder="Autres" style={[styles.input,]} value={inputs?.autre ? inputs.autre?.toString() : ""} onChangeText={text => handleChangeMobile("autre", text, setInputs)} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.separator} />


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        {currentSection > 0 && (
                            <TouchableOpacity onPress={goToPreviousSection} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                                <Text style={styles.button_text}>Précedent</Text>
                            </TouchableOpacity>
                        )}

                        {currentSection < totalSections - 1 && (
                            <TouchableOpacity onPress={goToNextSection} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                                <Text style={styles.button_text}>Suivant</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            {/* section 3 */}
            {currentSection === 2 && (
                <View>
                    <Text style={styles.title}>3. ID Signataire</Text>

                    <View style={{ gap: 10 }}>
                        <View >
                            <Text style={styles.label}>Civilité <Text style={styles.required}>*</Text></Text>
                            <View style={[styles.input,]}>
                                <Picker
                                    ref={pickerRef}
                                    selectedValue={typeCivilite}
                                    onValueChange={(val) => setTypeCivilite(val)}>
                                    <Picker.Item label="Civilité" value="" />
                                    <Picker.Item label="Mlle" value="Mlle" />
                                    <Picker.Item label="Mme" value="Mme" />
                                    <Picker.Item label="M." value="M." />
                                </Picker>
                            </View>
                        </View>


                        <View >
                            <Text style={styles.label}>Type ID <Text style={styles.required}>*</Text></Text>
                            <View style={[styles.input,]}>
                                <Picker
                                    ref={pickerRef}
                                    selectedValue={typeTID}
                                    onValueChange={(val) => setTypeTID(val)}>
                                    <Picker.Item label="Type d'identification" value="" />
                                    <Picker.Item label="Passeport" value="Passeport" />
                                    <Picker.Item label="Carte d'identité" value="Carte d'identité" />
                                    <Picker.Item label="NINA" value="NINA" />
                                </Picker>
                            </View>
                        </View>

                        <View >
                            <Text style={styles.label}>Numéro d'identification <Text style={styles.required}>*</Text></Text>
                            <TextInput placeholder="Numéro d'identification" style={[styles.input,]} value={inputs?.numeroIdentification ? inputs.numeroIdentification?.toString() : ""} onChangeText={text => handleChangeMobile("numeroIdentification", text, setInputs)} />
                        </View>

                        <View >
                            <Text style={styles.label}>Profession</Text>
                            <TextInput placeholder="Profession" style={[styles.input,]} value={inputs?.profession ? inputs.profession?.toString() : ""} onChangeText={text => handleChangeMobile("profession", text, setInputs)} />
                        </View>

                    </View>

                    <View style={[styles.forms, { marginVertical: 10 }]}>
                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nom <Text style={styles.required}>*</Text></Text>
                                <TextInput placeholder='Nom' style={styles.input} value={inputs?.nom ? inputs.nom?.toString() : ""} onChangeText={text => handleChangeMobile("nom", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Prénom <Text style={styles.required}>*</Text></Text>
                                <TextInput placeholder='Prénom' style={styles.input} value={inputs?.prenom ? inputs.prenom?.toString() : ""} onChangeText={text => handleChangeMobile("prenom", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nom de jeune fille</Text>
                                <TextInput placeholder='Nom de jeune fille' style={styles.input} value={inputs?.nomJeuneFille ? inputs.nomJeuneFille?.toString() : ""} onChangeText={text => handleChangeMobile("nomJeuneFille", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Téléphone mobile <Text style={styles.required}>*</Text></Text>
                                <TextInput keyboardType="phone-pad" placeholder='Téléphone mobile' style={styles.input} value={inputs?.telephoneMobile ? inputs.telephoneMobile?.toString() : ""} onChangeText={text => handleChangeMobile("telephoneMobile", text, setInputs)} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Téléphone fixe</Text>
                                <TextInput keyboardType="phone-pad" placeholder='Téléphone fixe' style={styles.input} value={inputs?.telephoneFixe ? inputs.telephoneFixe?.toString() : ""} onChangeText={text => handleChangeMobile("telephoneFixe", text, setInputs)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Adresse e-mail</Text>
                                <TextInput placeholder='Adresse e-mail' style={styles.input} value={inputs?.email ? inputs.email?.toString() : ""} onChangeText={text => handleChangeMobile("email", text, setInputs)} />
                            </View>
                        </View>
                    </View>


                    <View style={styles.separator} />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        {currentSection > 0 && (
                            <TouchableOpacity onPress={goToPreviousSection} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                                <Text style={styles.button_text}>Précedent</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity activeOpacity={0.7} style={[styles.button, { flex: 1 }]} onPress={handleNext} disabled={activeTab === tabs.length - 1}>
                            <Text style={styles.button_text}>Suivant</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}

            <View style={styles.separator} />
        </View>
    )
}

export default General

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
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white }
})