import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CustomLoader, DevisCard, Tabs } from '../../components';
import { useSelector } from 'react-redux';
import { IDevisReq, RootState, colors } from '../../libs';
import { Overlay } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function DevisList() {
    const [activeTab, setActiveTab] = useState<number>(0);
    const scrollViewRef = useRef<any>(null)
    const { devis, s_loading } = useSelector((state: RootState) => state?.devis)
    const [valides, setValides] = useState<IDevisReq[]>([]);
    const [attentes, setAttentes] = useState<IDevisReq[]>([]);
    const [rejetes, setRejetes] = useState<IDevisReq[]>([]);
    const [paid, setPaid] = useState<IDevisReq[]>([]);
    const [visible, setVisible] = useState<boolean>(false)
    const [rejectedData, setRejectedData] = useState<IDevisReq>()

    const tabs = [
        { title: 'Validés', icon: <Text>Tab 1</Text>, },
        { title: 'En attente', icon: <Text>Tab 2</Text>, },
        { title: 'Rejetés', icon: <Text>Tab 3</Text>, },
        { title: 'Payés', icon: <Text>Tab 3</Text>, },
    ];


    useEffect(() => {
        setValides(devis?.filter(devi => devi?.status === "VALIDATED" && devi?.paymentStatus !== "PAID"));
        setAttentes(devis?.filter(devi => devi?.status === "PENDING" && devi?.paymentStatus !== "PAID"));
        setRejetes(devis?.filter(devi => devi?.status === "REJECT" && devi?.paymentStatus !== "PAID"));
        setPaid(devis?.filter(devi => devi?.paymentStatus === "PAID"));
    }, [devis]);


    const onPressTab = (index: number) => { setActiveTab(index); };
    const toggleOverlay = () => { setVisible(!visible) }


    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return (valides?.length > 0 && (valides)?.map(devi => (<DevisCard devi={devi} key={devi?.id} />)))
            case 1:
                return (attentes?.length > 0 && (attentes)?.map(devi => (<DevisCard devi={devi} key={devi?.id} />)))
            case 2:
                return (rejetes?.length > 0 && (rejetes)?.map(devi => (<DevisCard toggleOverlay={toggleOverlay} setRejectedData={setRejectedData} devi={devi} key={devi?.id} />)))

            case 3:
                return (paid?.length > 0 && (paid)?.map(devi => (<DevisCard devi={devi} key={devi?.id} />)))
            default:
                return null;
        }
    };

    if ((s_loading))
        return <CustomLoader />


    return (
        <View style={styles.container}>
            {/* overlay vitepay */}
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={[styles.bottomSheet]} animationType="slide">
                <View style={styles.sheet_header}>
                    <Text style={[styles.sheet_title]}>Motif de rejet</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={toggleOverlay}><Fontisto name="close-a" size={18} style={styles.sheet_close} /></TouchableOpacity>
                </View>

                <View style={styles.screen_title_line} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.desc_container}>
                    <Text style={[styles.desc]}>
                        {rejectedData?.motif}
                    </Text>
                </ScrollView>
            </Overlay>

            <View style={{ flex: 1, borderTopLeftRadius: 60, borderTopRightRadius: 60, backgroundColor: colors.body }}>
                <View ><Tabs tabs={tabs} activeTab={activeTab} onPressTab={onPressTab} canChangeTab={true} /></View>

                <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.content}>
                        {renderContent()}
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.body
    },
    content: { paddingHorizontal: 10, marginTop: 20, gap: 15 },
    bottomSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingVertical: 10, width: "100%", position: "absolute", height: "70%", bottom: 0 },
    sheet_header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sheet_title: { color: colors.dark, fontWeight: "300", letterSpacing: 1.5, fontSize: 22 },
    sheet_close: { color: colors.danger },
    desc_container: { flexGrow: 1, paddingVertical: 15 },
    desc: { fontWeight: "300", textAlign: "justify", color: colors.dark },
    screen_title_line: { width: "60%", height: 4, backgroundColor: colors.main, borderRadius: 50, marginVertical: 15, marginBottom: 5 },
    separator: { height: 50 }
})
