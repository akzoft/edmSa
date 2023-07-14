import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { CustomLoader, DevisCard, Tabs } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { IDevisReq, RootState, colors, getAllDevi, reverseArray } from '../../libs';

export default function PayerUnDevis() {
    const [activeTab, setActiveTab] = useState<number>(0);
    const scrollViewRef = useRef<any>(null)
    const { devis, s_loading } = useSelector((state: RootState) => state?.devis)
    const [valides, setValides] = useState<IDevisReq[]>([]);
    const [attentes, setAttentes] = useState<IDevisReq[]>([]);
    const [rejetes, setRejetes] = useState<IDevisReq[]>([]);
    const [paid, setPaid] = useState<IDevisReq[]>([]);

    const tabs = [
        { title: 'Devis Validés', icon: <Text>Tab 1</Text>, },
        { title: 'Devis Payés', icon: <Text>Tab 3</Text>, },
    ];


    useEffect(() => {
        setValides(devis?.filter(devi => devi?.status === "VALIDATED" && devi?.paymentStatus !== "PAID"));
        setPaid(devis?.filter(devi => devi?.paymentStatus === "PAID"));
    }, [devis]);


    const onPressTab = (index: number) => { setActiveTab(index); };


    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return (valides?.length > 0 && (valides)?.map(devi => (<DevisCard devi={devi} key={devi?.id} />)))
            case 1:
                return (rejetes?.length > 0 && (paid)?.map(devi => (<DevisCard devi={devi} key={devi?.id} />)))
            default:
                return null;
        }
    };

    if ((s_loading))
        return <CustomLoader />

    return (
        <View style={styles.container}>
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
    content: { paddingHorizontal: 10, marginTop: 20, gap: 15 }
})
