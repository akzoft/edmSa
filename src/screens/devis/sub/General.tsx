import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { colors } from "../../../libs";

const General: FC<any> = ({ tabs, activeTab, setActiveTab, val }) => {
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
    };

    const goToPreviousSection = () => {
        setCurrentSection(currentSection - 1);
    };


    const handleNext = () => {
        setActiveTab((prevTab: number) => (prevTab < tabs.length - 1 ? prevTab + 1 : prevTab));
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
                        <Text style={styles.label}>Type de compteur</Text>
                        <SelectList
                            setSelected={(val: any) => console.log(val)}
                            data={[]}
                            save="value"
                            search={false}
                            placeholder='Selectionner un état'
                            inputStyles={{ color: colors.dark }}
                            // labelStyles={{ color: colors.black }}
                            dropdownTextStyles={{ color: colors.black }}
                            dropdownStyles={{ borderWidth: 0.5, borderColor: colors.dark }}
                            boxStyles={{ borderWidth: 0.5, borderColor: colors.dark, }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Type de demande</Text>
                        <SelectList
                            setSelected={(val: any) => console.log(val)}
                            data={[]}
                            save="value"
                            search={false}
                            placeholder='Selectionner un état'
                            inputStyles={{ color: colors.dark }}
                            // labelStyles={{ color: colors.black }}
                            dropdownTextStyles={{ color: colors.black }}
                            dropdownStyles={{ borderWidth: 0.5, borderColor: colors.dark }}
                            boxStyles={{ borderWidth: 0.5, borderColor: colors.dark, }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.label}>Usage</Text>
                        <SelectList
                            setSelected={(val: any) => console.log(val)}
                            data={[]}
                            save="value"
                            search={false}
                            placeholder='Selectionner un état'
                            inputStyles={{ color: colors.dark }}
                            // labelStyles={{ color: colors.black }}
                            dropdownTextStyles={{ color: colors.black }}
                            dropdownStyles={{ borderWidth: 0.5, borderColor: colors.dark }}
                            boxStyles={{ borderWidth: 0.5, borderColor: colors.dark, }}
                        />
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
                                <TextInput placeholder='Nombre de climateur' style={[styles.input,]} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ventilateurs</Text>
                                <TextInput placeholder='Nombre de ventilateurs' style={[styles.input,]} value={""} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Machine à laver</Text>
                                <TextInput placeholder='Nombre de machine à laver' style={[styles.input,]} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ampoules</Text>
                                <TextInput placeholder="Nombre d'ampoules" style={[styles.input,]} value={""} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Chauffe eau</Text>
                                <TextInput placeholder='Nombre de chauffe eau' style={[styles.input,]} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ordinateurs</Text>
                                <TextInput placeholder="Nombre d'ordinateur" style={[styles.input,]} value={""} />
                            </View>

                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Congélateurs</Text>
                                <TextInput placeholder="Nombre de congélateur" style={[styles.input,]} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Réfrigerateurs</Text>
                                <TextInput placeholder="Nombre de réfrigérateur" style={[styles.input,]} value={""} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Téléviseur</Text>
                                <TextInput placeholder="Nombre de téléviseur" style={[styles.input,]} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Boulloire électrique</Text>
                                <TextInput placeholder="Nombre de bouilloire électrique" style={[styles.input,]} value={""} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Fer à repasser</Text>
                                <TextInput placeholder="Nombre de fer à repasser" style={[styles.input,]} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Autres</Text>
                                <TextInput placeholder="Autres" style={[styles.input,]} value={""} />
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
                            <Text style={styles.label}>Civilité</Text>
                            <SelectList
                                setSelected={(val: any) => console.log(val)}
                                data={[]}
                                save="value"
                                search={false}
                                placeholder='Selectionner un état'
                                inputStyles={{ color: colors.dark }}
                                // labelStyles={{ color: colors.black }}
                                dropdownTextStyles={{ color: colors.black }}
                                dropdownStyles={{ borderWidth: 0.5, borderColor: colors.dark }}
                                boxStyles={{ borderWidth: 0.5, borderColor: colors.dark, }}
                            />
                        </View>

                        <View >
                            <Text style={styles.label}>Profession</Text>
                            <SelectList
                                setSelected={(val: any) => console.log(val)}
                                data={[]}
                                save="value"
                                search={false}
                                placeholder='Selectionner un état'
                                inputStyles={{ color: colors.dark }}
                                // labelStyles={{ color: colors.black }}
                                dropdownTextStyles={{ color: colors.black }}
                                dropdownStyles={{ borderWidth: 0.5, borderColor: colors.dark }}
                                boxStyles={{ borderWidth: 0.5, borderColor: colors.dark, }}
                            />
                        </View>

                        <View >
                            <Text style={styles.label}>Type ID</Text>
                            <SelectList
                                setSelected={(val: any) => console.log(val)}
                                data={[]}
                                save="value"
                                search={false}
                                placeholder='Selectionner un état'
                                inputStyles={{ color: colors.dark }}
                                // labelStyles={{ color: colors.black }}
                                dropdownTextStyles={{ color: colors.black }}
                                dropdownStyles={{ borderWidth: 0.5, borderColor: colors.dark }}
                                boxStyles={{ borderWidth: 0.5, borderColor: colors.dark, }}
                            />
                        </View>
                    </View>

                    <View style={[styles.forms, { marginVertical: 10 }]}>
                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nom</Text>
                                <TextInput placeholder='Nom' style={styles.input} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Prénom</Text>
                                <TextInput placeholder='Prénom' style={styles.input} value={""} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Nom de jeune fille</Text>
                                <TextInput placeholder='Nom de jeune fille' style={styles.input} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Téléphone mobile</Text>
                                <TextInput placeholder='Téléphone mobile' style={styles.input} value={""} />
                            </View>
                        </View>

                        <View style={styles.form_item}>
                            <View style={{ flex: 1 }}>
                                <Text>Téléphone fixe</Text>
                                <TextInput placeholder='Téléphone fixe' style={styles.input} value={""} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Adresse e-mail</Text>
                                <TextInput placeholder='Adresse e-mail' style={styles.input} value={""} />
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