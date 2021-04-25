import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, FlatList, Alert } from 'react-native';

import waterdrop from '../assets/waterdrop.png';
import Header from '../components/Header';
import Load from '../components/Load';
import PlantCardSecondary from '../components/PlantCardSecondary';
import { loadPlant, Plant, removePlant, StoragePlant } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


const MyPlants = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>('');

  function handleRemove(plant: Plant) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      }, {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(String(plant.id));

            setMyPlants(oldData => (oldData.filter((item) => item.id !== plant.id)))
          } catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      if (plantsStoraged.length >= 1) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt }
        );

        setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`);

        setMyPlants(plantsStoraged);
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList data={myPlants} keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 25 }}
          renderItem={({ item: plant }) => <PlantCardSecondary handleRemove={() => handleRemove(plant)} data={plant} />} showsVerticalScrollIndicator={false} />
      </View>
    </View>);


}

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'left'
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }

});