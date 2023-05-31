import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../../libs';

type props = { tabs: { title: string; icon: React.JSX.Element; }[], activeTab: number, onPressTab: any, canChangeTab: boolean }

const Tabs: FC<props> = ({ tabs, activeTab, onPressTab, canChangeTab }) => {
    const handlePressTab = (index: number) => {
        if (canChangeTab) {
            onPressTab(index);
        }
    };

    return (
        <View style={styles.tabBar}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.tabItem,
                        activeTab === index && styles.activeTabItem,
                    ]}
                    onPress={() => handlePressTab(index)}
                >
                    <Text style={[activeTab === index && styles.activeTabText]}>{tab.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: 60,
        borderRadius: 10
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabItem: {
        borderBottomWidth: 1, borderBottomColor: colors.red,
    },
    activeTabText: {
        color: colors.red
    }
});

export default Tabs;
