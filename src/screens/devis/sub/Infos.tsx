import { FC } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../libs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Infos: FC<any> = ({ tabs, activeTab, setActiveTab, setVal }) => {
    const handleNext = () => {
        setActiveTab((prevTab: number) => (prevTab < tabs.length - 1 ? prevTab + 1 : prevTab));
    };

    const handlePrevious = () => {
        setVal(2)
        setActiveTab((prevTab: number) => (prevTab > 0 ? prevTab - 1 : prevTab));
    };

    return (
        <View>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
                {[1, 2, 3, 4, 5]?.map(dot => (
                    <View key={dot} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: colors.dark }} />
                        <View style={{ borderRadius: 20, width: 20, height: 20, alignItems: "center", justifyContent: "center", backgroundColor: dot === 4 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                        <View style={{ width: "15%", height: 1, backgroundColor: dot === 4 ? colors.primary : colors.dark }} />
                    </View>))}
            </View>


            <Text style={[styles.title, { marginVertical: 10 }]}>4. Dossier à fournir</Text>

            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: colors.black }}>4.1 Propriétaire</Text>

                <View style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity style={styles.btn}>
                        <Text>Titre de propriété ou équivalent</Text>
                        <FontAwesome name="check-circle" size={20} color={colors.success} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Quitus EDM / point de livraison</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Copie carte ID ou NINA ou PP</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Copie VISA conformité ACAVIF</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>
                </View>

                <Text style={{ color: colors.black, marginTop: 15 }}>4.2 Locataire (facultatif)</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity style={styles.btn}>
                        <Text>Titre de propriété ou équivalent</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Attestation Aut. branchement</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Copie carte ID ou NINA ou PP / proprio</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Copie carte ID ou NINA ou PP / local</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text>Copie VISA conformité ACAVIF</Text>
                        <FontAwesome name="plus-circle" size={20} color={colors.main} />
                    </TouchableOpacity>
                </View>


            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={handlePrevious} disabled={activeTab === 0} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                    <Text style={styles.button_text}>Précedent</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNext} disabled={activeTab === tabs.length - 1} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                    <Text style={styles.button_text}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Infos

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