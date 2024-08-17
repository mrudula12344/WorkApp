import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or any icon library you prefer
import { workers, categories } from '../data';

const WorkerProfile = ({ worker }) => (
  <View style={styles.profileContainer}>
    <Image source={{ uri: worker.profileImage }} style={styles.profileImage} />
    <Text>{worker.name}</Text>
    <Text>{worker.country}</Text>
  </View>
);

const CategoriesScreen = () => {
  const [filteredWorkers, setFilteredWorkers] = useState(workers);

  const filterWorkers = (category) => {
    const result = workers.filter(worker => worker.role === category.Worker_Role);
    setFilteredWorkers(result);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Workers"
        onChangeText={(text) => {
          const result = workers.filter(worker => worker.name.toLowerCase().includes(text.toLowerCase()));
          setFilteredWorkers(result);
        }}
      />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Icon name={item.icon} size={30} onPress={() => filterWorkers(item)} />
        )}
        horizontal
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={filteredWorkers}
        renderItem={({ item }) => <WorkerProfile worker={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        style={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  carousel: {
    height: 50,
    marginBottom: 10,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  grid: {
    flex: 1,
  },
});

export default CategoriesScreen;
