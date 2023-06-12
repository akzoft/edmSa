import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IDevisReq, colors, } from "../../../libs";

type props = { scrollViewRef: any, tabs: any, activeTab: any, setActiveTab: any, val: number, inputs: IDevisReq, }
const GeneralDisplay: FC<props> = ({ scrollViewRef, tabs, activeTab, setActiveTab, val, inputs, }) => {

    const totalSections = 5;
    const [currentSection, setCurrentSection] = useState(val || 0);
    const [activeSection, setActiveSection] = useState<number[]>()

    useEffect(() => {
        const tab = []
        for (let index = 0; index < totalSections; index++) {
            tab.push(index)
        }
        setActiveSection(tab)
    }, [])


    // for sections
    const goToNextSection = () => {
        setCurrentSection(currentSection + 1);
        scrollViewRef.current.scrollTo({ y: 0, animated: true })

    };

    const goToPreviousSection = () => {
        setCurrentSection(currentSection - 1);
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };


    const handleNext = () => {
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
                    <Text style={styles.title}>1. Infos demande</Text>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Type de compteur: <Text style={{ fontWeight: "bold", paddingLeft: 20, color: colors.black, fontStyle: "italic" }}>{inputs?.typeCompteur || "N/A"}</Text></Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Type de demande: <Text style={{ fontWeight: "bold", paddingLeft: 20, color: colors.black, fontStyle: "italic" }}>{inputs?.typeDemande ? inputs?.typeDemande === "Mutation/Aug./Dim./Chang. Puissance" ? "Changement de puissance" : inputs?.typeDemande : "N/A"}</Text></Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Usage: <Text style={{ fontWeight: "bold", paddingLeft: 20, color: colors.black, fontStyle: "italic" }}>{inputs?.usage ? inputs?.usage : "N/A"}</Text></Text>
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
                                <Text>Nb. Climatiseurs: <Text style={styles.inf}>{inputs?.climatiseur || "N/A"}</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Ventilateurs: <Text style={styles.inf}>{inputs?.ventilateur || "N/A"}</Text></Text>
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Machine à laver: <Text style={styles.inf}>{inputs?.machineLaver || "N/A"}</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Ampoules: <Text style={styles.inf}>{inputs?.ampoule || "N/A"}</Text></Text>
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Chauffe eau:  <Text style={styles.inf}>{inputs?.chauffeEau || "N/A"}</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Ordinateurs: <Text style={styles.inf}>{inputs?.ordinateur || "N/A"}</Text></Text>
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Congélateurs: <Text style={styles.inf}>{inputs?.congelateur || "N/A"}</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Réfrigerateurs: <Text style={styles.inf}>{inputs?.refrigerateur || "N/A"}</Text></Text>
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Téléviseur: <Text style={styles.inf}>{inputs?.televiseur || "N/A"}</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Boulloire électrique: <Text style={styles.inf}>{inputs?.bouilloireElectrique || "N/A"}</Text></Text>
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Fer à repasser: <Text style={styles.inf}>{inputs?.ferRepasser || "N/A"}</Text></Text>

                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Téléphone: <Text style={styles.inf}>{inputs?.telephone || "N/A"}</Text></Text>

                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nb. Autres: <Text style={styles.inf}>{inputs?.autre || "N/A"}</Text></Text>
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
                        <Text style={styles.label}>Civilité: <Text style={styles.inf}>{inputs?.civilite || "N/A"}</Text></Text>
                        <Text style={styles.label}>Nom: <Text style={styles.inf}>{inputs?.nom || "N/A"}</Text></Text>
                        <Text style={styles.label}>Prénom: <Text style={styles.inf}>{inputs?.prenom || "N/A"}</Text></Text>
                        <Text style={styles.label}>Nom de jeune fille: <Text style={styles.inf}>{inputs?.nomJeuneFille || "N/A"}</Text></Text>
                        <Text style={styles.label}>Type ID: <Text style={styles.inf}>{inputs?.typeIdentification || "N/A"}</Text></Text>
                        <Text style={styles.label}>Numéro d'identification: <Text style={styles.inf}>{inputs?.numeroIdentification || "N/A"}</Text></Text>
                        <Text style={styles.label}>Profession: <Text style={styles.inf}>{inputs?.profession || "N/A"}</Text></Text>
                        <Text style={styles.label}>Téléphone mobile: <Text style={styles.inf}>{inputs?.telephoneMobile || "N/A"}</Text></Text>
                        <Text style={styles.label}>Téléphone fixe: <Text style={styles.inf}>{inputs?.telephoneFixe || "N/A"}</Text></Text>
                        <Text style={styles.label}>Adresse e-mail: <Text style={[styles.inf]}>{inputs?.email || "N/A"}</Text></Text>
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

export default GeneralDisplay

const styles = StyleSheet.create({
    container: { paddingTop: 20 },
    title: { fontSize: 18, color: colors.black },
    separator: { height: 20 },
    forms: { gap: 10 },
    form_item: { flexDirection: "row", gap: 5, marginVertical: 5 },
    input: { borderWidth: 0.5, borderColor: colors.dark, borderRadius: 5, paddingLeft: 15, color: colors.main },
    required: { color: colors.warning },
    info: { fontSize: 10, fontStyle: "italic" },
    inf: { fontWeight: "bold", paddingLeft: 20, color: colors.black },
    label: { marginVertical: 4, paddingLeft: 10 },
    button: { borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white }
})