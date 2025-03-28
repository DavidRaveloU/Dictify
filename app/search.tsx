import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import HistoryItem from '~/components/HistoryItem';
import StackScreen from '~/components/StackScreen';

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    };
    loadSearchHistory();
  }, []);

  const saveSearchHistory = async (word: string) => {
    try {
      const updateHistory = [
        word,
        ...searchHistory.filter((item) => item.toLowerCase() !== word.toLowerCase()),
      ];
      const limitedHistory = updateHistory.slice(0, 10);
      setSearchHistory(limitedHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      saveSearchHistory(searchQuery.trim());
      router.push(`/details?word=${searchQuery}`);
      Keyboard.dismiss();
    } else {
    }
  };

  const handleDelete = async (word: string) => {
    const updateHistory = searchHistory.filter((item) => item !== word);
    setSearchHistory(updateHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(updateHistory));
  };

  const handleClearAll = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  return (
    <>
      <StackScreen title="Search" />
      <View className="mx-4 mt-4">
        <View className="w-full flex-row items-center rounded-lg bg-[#E7E7E7] px-4">
          <Ionicons name="search" size={24} color="#999" />
          <TextInput
            className="ml-2 h-14 flex-1 text-[#282C34]"
            placeholder="Find the meaning..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoFocus
          />
        </View>
        {searchQuery.trim() === '' ? (
          <View className="mt-4">
            <View className="flex-row items-center justify-between">
              <Text>Recent Searches</Text>
              <TouchableOpacity className="mt-2" onPress={handleClearAll}>
                <Text className="text-[#2563eb]">Clear all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="mt-2">
              {searchHistory.length > 0 ? (
                searchHistory.map((word, index) => (
                  <HistoryItem
                    key={index}
                    word={word}
                    onPress={() => {
                      saveSearchHistory(word);
                      router.push(`/details?word=${word}`);
                    }}
                    onDelete={() => handleDelete(word)}
                  />
                ))
              ) : (
                <Text className="text-[#999]">No recent searches</Text>
              )}
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
