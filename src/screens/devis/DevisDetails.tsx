import { ScrollView, StatusBar, Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { IDevisReq, RootState, colors, css } from '../../libs'
import { Tabs } from '../../components'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import GeneralDisplay from './sub_detail_display/GeneralDisplay'
import InfosDisplay from './sub_detail_display/InfosDisplay'
import FinalisationDisplay from './sub_detail_display/FinalisationDisplay'

type TFiles = { proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete: any, autBranchement: any, locCopieIdentiteProprietaire: any, locCopieIdentiteLocataire: any, locCopieVisa: any }


const DevisDetails: FC<any> = ({ navigation, route }) => {
    const routes = route?.params;
    const [activeTab, setActiveTab] = useState<number>(0);
    const [val, setVal] = useState<number>(0);
    const scrollViewRef = useRef<any>(null)

    //inputs
    const init = { typeCompteur: "", typeDemande: "", usage: "", climatiseur: 0, ventilateur: 0, machineLaver: 0, ampoule: 0, chauffeEau: 0, ordinateur: 0, telephone: 0, congelateur: 0, refrigerateur: 0, televiseur: 0, bouilloireElectrique: 0, ferRepasser: 0, autre: 0, civilite: "", nom: "", prenom: "", nomJeuneFille: "", profession: "", typeIdentification: "", numeroIdentification: "", telephoneMobile: "", telephoneFixe: "", email: "", villeId: "", commune: "", quartier: "", rue: "", porte: 0, lot: "", procheDe: "", customerId: "", proTitrePropriete: null, quittusEdm: null, proCopieIdentite: null, proCopieVisa: null, locTitrePropriete: null, autBranchement: null, locCopieIdentiteProprietaire: null, locCopieIdentiteLocataire: null, locCopieVisa: null, }


    const [error, setError] = useState<string>("");
    const [inputs, setinputs] = useState<IDevisReq>(init);
    const [files, setFiles] = useState<TFiles>({ proTitrePropriete: null, quittusEdm: null, proCopieIdentite: null, proCopieVisa: null, locTitrePropriete: null, autBranchement: null, locCopieIdentiteProprietaire: null, locCopieIdentiteLocataire: null, locCopieVisa: null });

    const tabs = [
        { title: 'Général', icon: <Text>Tab 1</Text>, },
        { title: 'Infos client', icon: <Text>Tab 2</Text>, },
        { title: 'Finalisation', icon: <Text>Tab 3</Text>, },
    ];

    useEffect(() => {
        setinputs(routes?.devis)
    }, [routes]);




    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <GeneralDisplay scrollViewRef={scrollViewRef} val={val} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} inputs={inputs} />;
            case 1:
                return <InfosDisplay scrollViewRef={scrollViewRef} setError={setError} files={files} setFiles={setFiles} setVal={setVal} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} inputs={inputs} setInputs={setinputs} />;
            case 2:
                return <FinalisationDisplay scrollViewRef={scrollViewRef} activeTab={activeTab} setActiveTab={setActiveTab} inputs={inputs} />;
            default:
                return null;
        }
    };

    const onPressTab = (index: number) => { setActiveTab(index); };

    return (
        <>
            <View style={css.auth.toast}><Toast /></View>
            <View style={css.home.container}>
                <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
                <View style={{ flex: 1, borderTopLeftRadius: 60, borderTopRightRadius: 60, backgroundColor: colors.body }}>

                    <View style={{ paddingHorizontal: 20 }}>
                        <Tabs tabs={tabs} activeTab={activeTab} onPressTab={onPressTab} canChangeTab={true} />
                    </View>

                    <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ paddingHorizontal: 20, }}>
                            {renderContent()}
                        </View>
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default DevisDetails







