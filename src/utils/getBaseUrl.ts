import AsyncStorage from '@react-native-community/async-storage';
import { API_URL, API_LOCAL_URL } from 'react-native-dotenv';

export default async function getBaseUrl(): Promise<string> {
  let ip = await AsyncStorage.getItem('@MeSalva:ip');
  if (ip === null) {
    console.log('Getting ip...');
    ip = await fetch('https://api.ipify.org').then(res => res.text());
  }

  if (ip === '186.193.142.154') {
    return API_LOCAL_URL;
  }
  return API_URL;
}
