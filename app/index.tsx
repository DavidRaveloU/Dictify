import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { fetchWordDetails } from './api/dictionary';
import { fetchRandomWords } from './api/randomWords';
import { WordDetails } from './types/dictionary';

export default function Home() {
  const router = useRouter();
  const [randomWordDetails, setRandomWordDetails] = useState<WordDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRandomWordDetails = async () => {
      try {
        const randomWords = await fetchRandomWords(7);
        const detailsPromises = randomWords.map((word) => fetchWordDetails(word));
        const details: (WordDetails | null)[] = await Promise.all(detailsPromises);

        const validDetails = details.filter((detail) => detail !== null) as WordDetails[];
        setRandomWordDetails(validDetails);
        setError(null);
      } catch (error) {
        console.error('Error fetching random words details:', error);
        setError('Failed to load words. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getRandomWordDetails();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className="mx-4 mt-4 flex-1 bg-[#F2F2F2]">
        <View className="flex-row items-center justify-end">
          <Ionicons name="scan" size={24} color="#999" />
        </View>

        <Pressable className="mb-4" onPress={() => router.push('/search')}>
          <View className="mt-4 w-full flex-row items-center rounded-lg bg-[#E7E7E7] px-4">
            <Ionicons name="search" size={24} color="#999" />
            <TextInput
              className="ml-2 h-14 flex-1 text-[#282C34]"
              placeholder="Find the meaning..."
              placeholderTextColor="#999"
              editable={false}
            />
          </View>
        </Pressable>

        {isLoading ? (
          <View className="mt-7 flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : error ? (
          <View className="mt-7 flex-1 items-center justify-center">
            <Text className="text-lg text-[#666]">{error}</Text>
          </View>
        ) : randomWordDetails.length > 0 ? (
          <ScrollView>
            <View>
              <Text className="my-7 text-2xl font-bold">Discover new words</Text>
              {randomWordDetails.map((wordDetails, idx) => (
                <Link
                  key={idx}
                  href={{ pathname: '/details', params: { word: wordDetails.word } }}
                  asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <View
                        className={`center mb-7 flex-row rounded-lg bg-[#FAF6F3] p-7 ${pressed ? 'opacity-50' : ''}`}>
                        <View className="flex-col">
                          <View className="flex-row items-center gap-2">
                            <View className="h-7 w-2 bg-[#2563eb]" />
                            <Text className="text-4xl font-bold">
                              {wordDetails.word.charAt(0).toUpperCase() + wordDetails.word.slice(1)}
                            </Text>
                            <Text className="text-[#999]">
                              {wordDetails.meanings[0]?.partOfSpeech || 'Unknown'}
                            </Text>
                          </View>
                          {wordDetails.phonetics?.[0]?.audio && wordDetails.phonetics?.[0].text && (
                            <Text className="py-1 text-[1.2rem] italic text-[#999]">
                              {wordDetails.phonetics?.[0]?.text || '/.../'}
                            </Text>
                          )}
                          <Text>
                            {wordDetails.meanings[0]?.definitions[0]?.definition ||
                              'No definition available.'}
                          </Text>
                          {wordDetails.meanings?.[0]?.definitions?.[0]?.example && (
                            <Text className="mt-2 italic text-[#666]">
                              Example:{' '}
                              {wordDetails.meanings?.[0]?.definitions?.[0]?.example
                                .charAt(0)
                                .toUpperCase() +
                                wordDetails.meanings?.[0]?.definitions?.[0]?.example.slice(1)}
                            </Text>
                          )}
                        </View>
                      </View>
                    )}
                  </Pressable>
                </Link>
              ))}
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
}
