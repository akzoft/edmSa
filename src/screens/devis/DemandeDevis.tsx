import { ActivityIndicator, ScrollView, StatusBar, Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { IDevisReq, RootState, colors, create_devis, css, devis_validation4, } from '../../libs'
import { Tabs } from '../../components'
import General from './sub/General'
import Infos from './sub/Infos'
import Finalisation from './sub/Finalisation'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'


type TFiles = { proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete: any, autBranchement: any, locCopieIdentiteProprietaire: any, locCopieIdentiteLocataire: any, locCopieVisa: any }


const DemandeDevis: FC<any> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [val, setVal] = useState<number>(0);
    const dispatch = useDispatch<any>()
    const scrollViewRef = useRef<any>(null)

    //inputs
    const init = { typeCompteur: "", typeDemande: "", usage: "", climatiseur: 0, ventilateur: 0, machineLaver: 0, ampoule: 0, chauffeEau: 0, ordinateur: 0, telephone: 0, congelateur: 0, refrigerateur: 0, televiseur: 0, bouilloireElectrique: 0, ferRepasser: 0, autre: 0, civilite: "", nom: "", prenom: "", nomJeuneFille: "", profession: "", typeIdentification: "", numeroIdentification: "", telephoneMobile: "", telephoneFixe: "", email: "", villeId: "", commune: "", quartier: "", rue: "", porte: 0, lot: "", procheDe: "", customerId: "", proTitrePropriete: null, quittusEdm: null, proCopieIdentite: null, proCopieVisa: null, locTitrePropriete: null, autBranchement: null, locCopieIdentiteProprietaire: null, locCopieIdentiteLocataire: null, locCopieVisa: null, localisation: "" }
    const [click, setClick] = useState(false);
    const [typeCpt, setTypeCpt] = useState<string>("");
    const [typeDemande, setTypeDemande] = useState<string>("");
    const [typeUsage, setTypeUsage] = useState<string>("");
    const [typeCivilite, setTypeCivilite] = useState<string>();
    const [typeTID, setTypeTID] = useState<string>();
    const [typeVille, setTypeVille] = useState<string>();
    const [typeCommune, setTypeCommune] = useState<string>();
    const [typeQuartier, setTypeQuartier] = useState<string>();
    const [error, setError] = useState<string>("");
    const [inputs, setinputs] = useState<IDevisReq>(init);
    const [files, setFiles] = useState<TFiles>({ proTitrePropriete: null, quittusEdm: null, proCopieIdentite: null, proCopieVisa: null, locTitrePropriete: null, autBranchement: null, locCopieIdentiteProprietaire: null, locCopieIdentiteLocataire: null, locCopieVisa: null });
    const { auth } = useSelector((state: RootState) => state?.user)
    const { errors, tmp, s_loading } = useSelector((state: RootState) => state?.devis)

    const tabs = [
        { title: 'Général', icon: <Text>Tab 1</Text>, },
        { title: 'Infos client', icon: <Text>Tab 2</Text>, },
        { title: 'Finalisation', icon: <Text>Tab 3</Text>, },
    ];

    //display errors if exist
    useEffect(() => {
        if (((errors && errors !== null) || (error && error != ""))) { Toast.show({ type: 'error', text1: 'Erreurs', text2: errors ? errors : error && error, }); setError(""); setError("") }
    }, [error, errors])

    useEffect(() => {
        if (tmp) {
            navigation.navigate("devis_list");
            AsyncStorage.removeItem("quit").then(res => console.log("")).catch(err => console.log(err))
            dispatch({ type: "reset_tmp" })
            setClick(false)
        }
    }, [tmp]);




    const handleSendDevis = async () => {

        if (inputs) {

            inputs.villeId = typeVille
            inputs.customerId = auth?.id

            if (devis_validation4(inputs) !== "") {
                setError(devis_validation4(inputs))
                return;
            }

            const blob: FormData = new FormData()
            blob.append("typeCompteur", inputs.typeCompteur)
            blob.append("typeDemande", inputs.typeDemande)
            blob.append("usage", inputs.usage)
            blob.append("climatiseur", inputs.climatiseur)
            blob.append("ventilateur", inputs.ventilateur)
            blob.append("machineLaver", inputs.machineLaver)
            blob.append("ampoule", inputs.ampoule)
            blob.append("chauffeEau", inputs.chauffeEau)
            blob.append("ordinateur", inputs.ordinateur)
            blob.append("telephone", inputs.telephone)
            blob.append("congelateur", inputs.congelateur)
            blob.append("refrigerateur", inputs.refrigerateur)
            blob.append("televiseur", inputs.televiseur)
            blob.append("bouilloireElectrique", inputs.bouilloireElectrique)
            blob.append("ferRepasser", inputs.ferRepasser)
            blob.append("autre", inputs.autre)
            blob.append("civilite", inputs.civilite)
            blob.append("nom", inputs.nom)
            blob.append("prenom", inputs.prenom)
            blob.append("nomJeuneFille", inputs.nomJeuneFille)
            blob.append("profession", inputs.profession)
            blob.append("typeIdentification", inputs.typeIdentification)
            blob.append("numeroIdentification", inputs.numeroIdentification)
            blob.append("telephoneMobile", inputs.telephoneMobile)
            blob.append("localisation", inputs?.localisation)

            blob.append("telephoneFixe", inputs.telephoneFixe)
            blob.append("email", inputs.email)
            blob.append("villeId", inputs.villeId)
            blob.append("commune", inputs.commune)
            blob.append("quartier", inputs.quartier)
            blob.append("rue", inputs.rue)
            blob.append("porte", inputs.porte)
            blob.append("lot", inputs.lot)
            blob.append("procheDe", inputs.procheDe)
            blob.append("customerId", inputs.customerId)

            blob.append("proTitrePropriete", inputs.proTitrePropriete)
            blob.append("quittusEdm", inputs.quittusEdm)
            blob.append("proCopieIdentite", inputs.proCopieIdentite)
            blob.append("proCopieVisa", inputs.proCopieVisa)
            blob.append("locTitrePropriete", inputs.locTitrePropriete)
            blob.append("autBranchement", inputs.autBranchement)
            blob.append("locCopieIdentiteProprietaire", inputs.locCopieIdentiteProprietaire)
            blob.append("locCopieIdentiteLocataire", inputs.locCopieIdentiteLocataire)
            blob.append("locCopieVisa", inputs.locCopieVisa)

            setClick(true)
            if (auth)
                dispatch(create_devis(blob, auth?.accessToken))
        }
    }


    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <General files={files} setFiles={setFiles} typeVille={typeVille} setTypeVille={setTypeVille} scrollViewRef={scrollViewRef} setError={setError} val={val} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} typeCpt={typeCpt} setTypeCpt={setTypeCpt} typeDemande={typeDemande} setTypeDemande={setTypeDemande} typeUsage={typeUsage} setTypeUsage={setTypeUsage} typeCivilite={typeCivilite} setTypeCivilite={setTypeCivilite} typeTID={typeTID} setTypeTID={setTypeTID} inputs={inputs} setInputs={setinputs} />;
            case 1:
                return <Infos scrollViewRef={scrollViewRef} setError={setError} files={files} setFiles={setFiles} setVal={setVal} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} inputs={inputs} setInputs={setinputs} />;
            case 2:
                return <Finalisation scrollViewRef={scrollViewRef} setError={setError} handleSendDevis={handleSendDevis} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} typeVille={typeVille} setTypeVille={setTypeVille} typeCommune={typeCommune} setTypeCommune={setTypeCommune} typeQuartier={typeQuartier} setTypeQuartier={setTypeQuartier} inputs={inputs} setInputs={setinputs} />;
            default:
                return null;
        }
    };

    const onPressTab = (index: number) => { setActiveTab(index); };


    if (s_loading)
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.body }}>
            <ActivityIndicator size={40} color={colors.main} pointerEvents="none" />
            {click && <>
                <Text style={{ fontSize: 10, color: colors.main }}>Patientez!</Text>
                <Text style={{ fontSize: 10, color: colors.main }}>creation du devis en cours..</Text>
            </>}
        </View >

    return (
        <>
            <View style={css.auth.toast}><Toast /></View>
            <View style={css.home.container}>
                <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
                {/* <View style={css.home.content}> */}
                <View style={{ flex: 1, borderTopLeftRadius: 60, borderTopRightRadius: 60, backgroundColor: colors.body }}>

                    <View style={{ paddingHorizontal: 20 }}>
                        <Tabs tabs={tabs} activeTab={activeTab} onPressTab={onPressTab} canChangeTab={false} />
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

export default DemandeDevis