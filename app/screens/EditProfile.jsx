import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FormTitle from '../components/FormTitle';
import IconInput from '../components/IconInput';
import PrimaryButton from '../components/PrimaryButton';
import ProfileHeader from '../components/ProfileHeader';

const ProfileView = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setProfileLoading(true);
        const storedUsername = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedEmail) {
          setEmail(storedEmail);
        }
        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await fetch(`${BASE_URL}/users/${storedUserId}/name.json`);
          const fetchName = await response.json();
          if (fetchName) {
            setName(fetchName);
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to load profile info',
        });
      } finally {
        setProfileLoading(false);
      }
    };
    loadData();
  },[]);

  const handleSave = async () => {
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'All fields must be filled!',
      });
      return;
    }

    try {
      setLoading(true);
      await fetch(`${BASE_URL}/users/${userId}/name.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
      }); 

      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully!',
      });

      // setTimeout(() => {
        navigation.navigate('Profile');
      // }, 1300);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: "Failed to save changes"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {profileLoading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size={'large'} color={'#3b7cff'} />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={90}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            <ProfileHeader />
            <FormTitle title="Edit Profile" />

            <IconInput
              icon="person-circle-outline"
              placeholder={"Enter your full name"}
              value={name}
              onChangeText={setName}
            />

            <IconInput
              icon="person-outline"
              placeholder={"Username"}
              value={username}
              editable={false} 
            />

            <IconInput
              icon="mail-outline"
              placeholder={"Email"}
              value={email}
              editable={false}
              keyboardType="email-address"
            />

            <View style={styles.buttonWrapper}>
              {loading ? (
                <ActivityIndicator size={'large'} color={'#3b7cff'}/>
              ) : (
              <PrimaryButton title="Save Changes" onPress={handleSave} style={styles.bigButton} />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  bigButton: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
