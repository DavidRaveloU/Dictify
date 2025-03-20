import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const searchHistory = ['Run', 'Walk', 'Jump', 'Play', 'Sing'];

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/details?word=${searchQuery}`);
      Keyboard.dismiss();
    } else {
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Search',
          headerShown: true,
          headerTintColor: '#2563eb',
          headerStyle: { backgroundColor: '#f9f9f9' },
        }}
      />
      <View className="mx-4 mt-4">
        <View className="w-full flex-row items-center rounded-lg bg-[#E7E7E7] px-4">
          <Ionicons name="search" size={24} color="#999" />
          <TextInput
            className="ml-2 h-14 flex-1 text-[#282C34]"
            placeholder="Find the meaning..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </View>
        {searchQuery.trim() === '' ? (
          <View className="mt-4">
            <Text>Reciente Searches</Text>
            <ScrollView className="mt-2">
              {searchHistory.map((word, index) => (
                <Pressable key={index} onPress={() => router.push(`/details?word=${word}`)}>
                  {({ pressed }) => (
                    <View className={`p-4 ${pressed ? 'bg-gray-200' : 'bg-white'}`}>
                      <Text className="text-[#1F1F1F]">{word}</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : (
          <TouchableOpacity
            className="mt-4 items-center rounded-[8px] bg-[#2563eb] p-4 shadow-md"
            onPress={handleSearch}>
            <Text className="text-white">Search</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
