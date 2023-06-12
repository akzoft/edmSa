import { StyleSheet } from "react-native";
import { colors } from "./typography";

const auth = StyleSheet.create(
    {
        container: { flex: 1, backgroundColor: colors.body, alignItems: "center", justifyContent: "center" },
        forms: { paddingHorizontal: 30, width: "100%", gap: 15, marginTop: 20 },
        form_item: { alignItems: "center", justifyContent: "center" },
        input: { paddingHorizontal: 10, borderWidth: 0.5, borderColor: colors.white, backgroundColor: colors.white, width: "100%", borderRadius: 5 },
        labels: { alignItems: "center", justifyContent: "center" },
        title: { fontSize: 24, letterSpacing: 1, color: colors.black },
        subtitle: { color: colors.black, letterSpacing: 1, textAlign: "center", fontSize: 13, marginBottom: 10 },
        button: { backgroundColor: colors.red, padding: 15, alignItems: "center", justifyContent: "center", borderRadius: 5 },
        separator: { height: 20 },
        trybox: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
        try: { textAlign: "center" },
        toast: { zIndex: 100, },
    }
)

const home = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.main, marginBottom: -40
    },
    infos: { flexDirection: "row", justifyContent: "center", zIndex: 10, backgroundColor: colors.white, padding: 10, borderRadius: 10, width: "90%", alignSelf: "center", marginTop: "-15%" },
    // infos: { flexDirection: "row", justifyContent: "center", zIndex: 10, backgroundColor: colors.white, padding: 10, borderRadius: 10, width: "90%", alignSelf: "center", position: "absolute", top: "-5%" },
    linebox: { width: "100%", position: "absolute", top: "-17%", alignItems: "center" },
    line: { height: 10, width: "100%", borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: colors.red, alignSelf: "center" },
    info_card: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
    info_card_texts: { flexDirection: "row", gap: 10 },
    title: { color: colors.black, fontSize: 16 },
    name: { color: colors.black, fontSize: 12 },
    sub_name: { color: colors.black, fontSize: 12 },
    swiper_container: { height: 240, backgroundColor: colors.white },
    home_card_container: { alignItems: "center", justifyContent: "center", gap: 5, },
    content: {
        position: "relative",
        flex: 1,
        gap: 5, marginTop: 60,
        backgroundColor: colors.body, borderTopLeftRadius: 60, borderTopRightRadius: 60, paddingVertical: 20
    },
    cards: {
        paddingHorizontal: 10,
        flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 10, justifyContent: "space-between", width: "100%"
    }
})

export const css = { auth, home }