import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { RootState, api_fichiers, colors, images } from '../../libs';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ActualitySwiper = () => {
  const navigation = useNavigation<any>()
  // const { actualites } = useSelector((state: RootState) => state?.actu)
  const actualites = [
    { id: 1, title: "Energie du Mali-SA : Note d'actualite", image: images.n1, content: "EDM-SA a constaté que bon nombre d’abonnés utilisent une puissance supérieure à leur puissance contractuelle souscrite, et en conséquence bénéficient indûment de tarifs inférieurs au tarif correspondant à la puissance qu’ils utilisent réellement.Fort de ce constat, EDM-SA a lancé une campagne de moralisation afin de mettre en conformité les contrats avec le réglage du niveau de puissance réellement constaté chez l’abonné, et que les ventes se fassent au tarif applicable à la puissance utilisée." },
    { id: 2, title: "Energie du Mali-SA : Note d'actualite", image: images.n2, content: "EDM-SA a constaté que bon nombre d’abonnés utilisent une puissance supérieure à leur puissance contractuelle souscrite, et en conséquence bénéficient indûment de tarifs inférieurs au tarif correspondant à la puissance qu’ils utilisent réellement.Fort de ce constat, EDM-SA a lancé une campagne de moralisation afin de mettre en conformité les contrats avec le réglage du niveau de puissance réellement constaté chez l’abonné, et que les ventes se fassent au tarif applicable à la puissance utilisée." },
    { id: 3, title: "Energie du Mali-SA : Note d'actualite", image: images.n3, content: "EDM-SA a constaté que bon nombre d’abonnés utilisent une puissance supérieure à leur puissance contractuelle souscrite, et en conséquence bénéficient indûment de tarifs inférieurs au tarif correspondant à la puissance qu’ils utilisent réellement.Fort de ce constat, EDM-SA a lancé une campagne de moralisation afin de mettre en conformité les contrats avec le réglage du niveau de puissance réellement constaté chez l’abonné, et que les ventes se fassent au tarif applicable à la puissance utilisée." },
    { id: 4, title: "Energie du Mali-SA : Note d'actualite", image: images.n4, content: "EDM-SA a constaté que bon nombre d’abonnés utilisent une puissance supérieure à leur puissance contractuelle souscrite, et en conséquence bénéficient indûment de tarifs inférieurs au tarif correspondant à la puissance qu’ils utilisent réellement.Fort de ce constat, EDM-SA a lancé une campagne de moralisation afin de mettre en conformité les contrats avec le réglage du niveau de puissance réellement constaté chez l’abonné, et que les ventes se fassent au tarif applicable à la puissance utilisée." },
    { id: 5, title: "Energie du Mali-SA : Note d'actualite", image: images.n5, content: "EDM-SA a constaté que bon nombre d’abonnés utilisent une puissance supérieure à leur puissance contractuelle souscrite, et en conséquence bénéficient indûment de tarifs inférieurs au tarif correspondant à la puissance qu’ils utilisent réellement.Fort de ce constat, EDM-SA a lancé une campagne de moralisation afin de mettre en conformité les contrats avec le réglage du niveau de puissance réellement constaté chez l’abonné, et que les ventes se fassent au tarif applicable à la puissance utilisée." }]


  return (
    <View style={{ flex: 1, }}>
      {actualites?.length > 0 &&
        <Swiper autoplayTimeout={8} autoplay activeDotStyle={{ backgroundColor: colors.main }} >
          {actualites?.slice(0, 8)?.map((item, i) => (
            item?.image &&
            <TouchableOpacity onPress={() => navigation.navigate("actualite", { id: item?.id })} activeOpacity={0.8} key={item.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {/* <Image source={{ uri: `${api_fichiers}/${item.image}` }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} /> */}
              <Image source={item.image} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />

              <View style={{ padding: 10, height: 100, width: "100%", position: "absolute", left: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.5)" }}>
                <Text style={{ color: colors.black, fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>{item?.title?.slice(0, 25)}{item?.title?.length > 25 && "..."}</Text>
                <Text style={{ color: colors.black, fontSize: 12 }}>{item?.content?.slice(0, 84)}{item?.content?.length > 90 && "..."}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>}
    </View>
  );
};

export default ActualitySwiper;
