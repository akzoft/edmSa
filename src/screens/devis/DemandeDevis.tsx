import { ScrollView, StatusBar, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import { colors, css, images } from '../../libs'
import { Tabs } from '../../components'
import { Image } from 'react-native'
import { Button } from 'react-native'
import General from './sub/General'
import Infos from './sub/Infos'
import Finalisation from './sub/Finalisation'



const DemandeDevis = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [val, setVal] = useState<number>(0);


    const tabs = [
        { title: 'Général', icon: <Text>Tab 1</Text>, },
        { title: 'Infos client', icon: <Text>Tab 2</Text>, },
        { title: 'Finalisation', icon: <Text>Tab 3</Text>, },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <General val={val} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
            case 1:
                return <Infos setVal={setVal} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
            case 2:
                return <Finalisation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
            default:
                return null;
        }
    };



    const onPressTab = (index: number) => { setActiveTab(index); };

    return (
        <View style={css.home.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.main} />
            {/* <View style={css.home.content}> */}
            <View style={{ flex: 1, borderTopLeftRadius: 60, borderTopRightRadius: 60, backgroundColor: colors.body, marginTop: 60 }}>

                <View style={{ paddingHorizontal: 20 }}>
                    <Tabs tabs={tabs} activeTab={activeTab} onPressTab={onPressTab} canChangeTab={false} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ paddingHorizontal: 20, }}>
                        {renderContent()}
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </View>
    )
}

export default DemandeDevis