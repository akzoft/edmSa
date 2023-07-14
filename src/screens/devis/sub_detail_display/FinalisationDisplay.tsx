
import { FC, useEffect, useState, } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IDevisReq, colors } from "../../../libs";
import { useRoute } from "@react-navigation/native";

type props = { scrollViewRef: any, activeTab: any, setActiveTab: any, inputs: IDevisReq, }
const FinalisationDisplay: FC<props> = ({ scrollViewRef, activeTab, setActiveTab, inputs }) => {
    const route = useRoute<any>()
    const routes = route?.params;
    var dot = 5;
    const [devis, setDevis] = useState<IDevisReq>();

    useEffect(() => {
        setDevis(routes?.devis)
    }, [routes]);

    const handlePrevious = () => {
        setActiveTab((prevTab: number) => (prevTab > 0 ? prevTab - 1 : prevTab));
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
    };

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20, }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: dot === 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                    <Text style={{ marginHorizontal: 8, color: colors.dark }}> sur </Text><View style={{ borderRadius: 40, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.dark }}><Text style={{ color: colors.white }}>{5}</Text></View>
                </View>
            </View>
            <View>
                <Text style={[styles.title, { marginVertical: 10 }]}>5. Adresse principale</Text>
                <View style={{ marginTop: 15, flex: 4 }}>
                    <Text style={styles.label}>Ville: <Text style={styles.inf}>{devis?.ville?.name || "N/A"}</Text></Text>
                    <Text style={styles.label}>Commune: <Text style={styles.inf}>{devis?.commune || "N/A"}</Text></Text>
                    <Text style={styles.label}>Quartier: <Text style={styles.inf}>{devis?.quartier || "N/A"}</Text></Text>
                    <Text style={styles.label}>Rue: <Text style={styles.inf}>{devis?.rue || "N/A"}</Text></Text>
                    <Text style={styles.label}>Porte: <Text style={styles.inf}>{devis?.porte || "N/A"}</Text></Text>
                    <Text style={styles.label}>Lot: <Text style={styles.inf}>{devis?.lot || "N/A"}</Text></Text>
                    <Text style={styles.label}>Proche de: <Text style={styles.inf}>{devis?.procheDe || "N/A"}</Text></Text>
                    <Text style={styles.label}>Localisation: <Text style={styles.inf}>({devis?.localisation})</Text></Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                <TouchableOpacity onPress={handlePrevious} disabled={activeTab === 0} activeOpacity={0.7} style={[styles.button, { flex: 1 }]} >
                    <Text style={styles.button_text}>Précédent</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FinalisationDisplay


const styles = StyleSheet.create({
    title: { fontSize: 18, color: colors.black },
    label: { marginVertical: 4, paddingLeft: 10, color: colors.dark },
    form_item: { flexDirection: "row", gap: 5, marginVertical: 5 },
    input: { borderWidth: 0.5, borderColor: colors.dark, borderRadius: 5, paddingLeft: 15, color: colors.main },
    button: { borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white },
    required: { color: colors.warning },
    inf: { fontWeight: "bold", paddingLeft: 20, color: colors.black },
})