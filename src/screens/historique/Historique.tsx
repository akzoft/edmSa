import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, colors, comparaison, css, reverseArray } from '../../libs';
import { HistoryDevisCard, HistoryFactureCard, HistoryISAGOCard } from '../../components';
import { useIsFocused } from '@react-navigation/native';

export default function Historique() {
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(null);
    const [historiqueDatas, setHistoriqueDatas] = useState<any>([]);
    const { factures } = useSelector((state: RootState) => state?.facture)
    const { isagos } = useSelector((state: RootState) => state?.isago)
    const { devis } = useSelector((state: RootState) => state?.devis)
    const [loadedItems, setLoadedItems] = useState(5);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        var datas = []
        datas = [...reverseArray(factures), ...reverseArray(isagos), ...reverseArray(devis)].sort(comparaison)
        setHistoriqueDatas(datas)
    }, [factures, isagos, devis]);


    const handleEndReached = () => {
        if (loadedItems < historiqueDatas.length && loadedItems % 5 === 0) {
            setIsLoading(true);

            setTimeout(() => {
                setLoadedItems((prevLoadedItems) => prevLoadedItems + 5);
                setIsLoading(false);
            }, 1000);
        }
    };

    //fade in animation
    useEffect(() => {
        if (isFocused) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim, isFocused]);


    // if (loading)
    //     return (<View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
    //         <ActivityIndicator size="large" color="gray" />
    //     </View>)

    return (
        <Animated.View ref={viewRef} style={[{ opacity: fadeAnim, backgroundColor: colors.body, flex: 1 }]}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={reverseArray(historiqueDatas)?.slice(0, loadedItems)}
                    renderItem={({ item: facture }) => {


                        return <View>{
                            (facture?.typeCompteur) ?
                                <HistoryDevisCard key={facture?.id} facture={facture} /> :
                                (facture?.nbKw === undefined) ?
                                    <HistoryFactureCard key={facture?.id} facture={facture} /> :
                                    <HistoryISAGOCard key={facture?.id} facture={facture} />}

                        </View>
                    }
                    }
                    keyExtractor={(facture) => facture?.id.toString()}
                    contentContainerStyle={{ padding: 10, gap: 10 }}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.8} // Appeler onEndReached lorsque vous êtes à 50% de la fin de la liste
                />
                {isLoading && <ActivityIndicator size="small" color="gray" style={{ marginBottom: 20, backgroundColor: colors.body }} />}
            </View>
        </Animated.View>
    );

}
