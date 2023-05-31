
import { FC } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../libs";

const Finalisation: FC<any> = ({ tabs, activeTab, setActiveTab }) => {
    const handleNext = () => {
        setActiveTab((prevTab: number) => (prevTab < tabs.length - 1 ? prevTab + 1 : prevTab));
    };

    const handlePrevious = () => {
        setActiveTab((prevTab: number) => (prevTab > 0 ? prevTab - 1 : prevTab));
    };

    return (
        <View>
            <View style={{ flexDirection: "row", marginVertical: 15, width: "100%" }}>
                {[1, 2, 3, 4, 5]?.map(dot => (
                    <View key={dot} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: colors.dark }} />
                        <View style={{ borderRadius: 20, width: 20, height: 20, alignItems: "center", justifyContent: "center", backgroundColor: dot === 5 ? colors.primary : colors.dark }}><Text style={{ color: colors.white }}>{dot}</Text></View>
                        <View style={{ width: "15%", height: 1, backgroundColor: dot === 5 ? colors.primary : colors.dark }} />
                    </View>))}
            </View>

            <View>
                <Text style={[styles.title, { marginVertical: 10 }]}>4. Notez Bien</Text>


                <View style={{ paddingHorizontal: 10, gap: 15 }}>
                    <View>
                        <Text>4.1 Le compteur est une propriété d'EDM et ne peut être déplacé sous aucun prétexte.</Text>
                    </View>

                    <View>
                        <Text>4.1 Aucun dévis n'est valable au delà des périodes suivant:</Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>-Devis de branchement simple (6) mois</Text>
                            <Text>-Devis de branchement avec extension trois (3) mois.</Text>
                        </View>
                    </View>


                </View>

                <Text style={[styles.title, { marginVertical: 10 }]}>5. Validation de la demande</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={handlePrevious} disabled={activeTab === 0} activeOpacity={0.7} style={[styles.button, { flex: 3 }]} >
                    <Text style={styles.button_text}>Précedent</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={activeTab === tabs.length - 1} activeOpacity={0.7} style={[styles.button, { flex: 9 }]} >
                    <Text style={styles.button_text}>Valider et envoyer la demande</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Finalisation


const styles = StyleSheet.create({
    title: { fontSize: 18, color: colors.black },
    button: { borderRadius: 5, padding: 15, backgroundColor: colors.main, alignItems: "center", justifyContent: "center" },
    button_text: { textAlign: "center", fontWeight: "bold", color: colors.white }
})