import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import EnviromentButton from '../components/EnviromentButton';

import Header from '../components/Header';
import Load from '../components/Load';
import PlantCardPrimary from '../components/PlantCardPrimary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Enviroment {
  key: string;
  title: string;
}

interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string;
  frequency: {
    times: number;
    repeat_every: string;
  }
}

const PlantSelect = () => {
  const [enviroments, setEnviroments] = useState<Enviroment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setfilteredPlants] = useState<Plant[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);


  function handleEnvironmentSelected(enviroment: string) {
    setEnvironmentSelected(enviroment);
    if (enviroment === 'all') {
      setfilteredPlants(plants);
    }

    const filtered = plants.filter(plant => plant.environments.includes(enviroment));

    setfilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order_asc&_page=${page}&_limit=6`);

    if (!data) {
      return setLoadedAll(true);
    }
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setfilteredPlants(oldValue => [...oldValue, ...data])

    } else {
      setPlants(data);
      setfilteredPlants(data);
    }
    setLoadingMore(false);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments?_sort=title&_order_asc');
      setEnviroments([{
        key: 'all',
        title: 'Todos',
      }, ...data]);
    }
    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }
    if (plants.length >= 10) {
      setLoadingMore(false);
    } else {
      setLoadingMore(true);
      setPage(oldValue => oldValue + 1);
      fetchPlants();
    }
  }

  if (loading) {
    return <Load />
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList data={enviroments} keyExtractor={item => item.key} renderItem={({ item }) => (<EnviromentButton title={item.title} active={item.key === environmentSelected} onPress={() => { handleEnvironmentSelected(item.key) }} />)} contentContainerStyle={styles.enviromentList} horizontal showsHorizontalScrollIndicator={false} />
      </View>
      <View style={styles.plants}>
        <FlatList data={filteredPlants} keyExtractor={item => String(item.id)} renderItem={({ item: plant }) => (<PlantCardPrimary data={plant} />)} numColumns={2} showsVerticalScrollIndicator={false} onEndReachedThreshold={0.1} onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)} ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>} />
      </View>

    </View>);
}

export default PlantSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
    paddingRight: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  }
});