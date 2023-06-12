import React from 'react';
import { View, ScrollView } from 'react-native';
import { FactureCard } from '../../components';
import { useSelector } from 'react-redux';
import { RootState, reverseArray } from '../../libs';

export default function ListeFacture() {
    const { factures } = useSelector((state: RootState) => state?.facture)

    return (
        <View>
            <ScrollView>
                <View style={{ padding: 10, gap: 10 }}>
                    {reverseArray(factures)?.map((facture) => <FactureCard key={facture?.id} facture={facture} />)}
                </View>

                <View style={{ height: 25 }} />
            </ScrollView>
        </View>
    );
}
