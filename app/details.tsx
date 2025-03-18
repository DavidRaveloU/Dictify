import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
//import { WordDetails } from './types/dictionary';

export default function Details() {
  const { name } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: name as string }} />
      <View />
    </>
  );
}
