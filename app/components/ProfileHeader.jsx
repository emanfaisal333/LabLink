import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const ProfileHeader = () => {
  const [name, setName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchName = async () => {
      try {
        // const storedUsername = await AsyncStorage.getItem('username');
        const storedName = await AsyncStorage.getItem('name');
        if (storedName && storedName.trim() !== '') {
          setName(storedName);
        }  else {
          setName('Unknown User');
        }
      } catch (error) {
        console.error('Failed to load username: ', error);
      }
    };
    if (isFocused) {
      fetchName();
    }
  },[isFocused]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
