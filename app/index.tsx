import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { fetchWordDetails } from './api/dictionary';
import { fetchRandomWords } from './api/randomWords';
import { WordDetails } from './types/dictionary';

import LoadingIndicator from '~/components/LoadingIndicator';
import SearchBar from '~/components/SearchBar';
import WordCard from '~/components/WordCard';

export default function Home() {
  const router = useRouter();
  const [randomWordDetails, setRandomWordDetails] = useState<WordDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRandomWordDetails = async () => {
      try {
        const randomWords = await fetchRandomWords(12);
        console.log('randomWords:', randomWords);
        const detailsPromises = randomWords.map((word) => fetchWordDetails(word));
        const details: (WordDetails | null)[] = await Promise.all(detailsPromises);

        const validDetails = details.filter((detail) => detail !== null) as WordDetails[];
        setRandomWordDetails(validDetails);
        setError(null);
      } catch (error) {
        console.error('Error fetching random words details:', error);
        setError('Failed to load words. Please try again later.');
      }
      setIsLoading(false);
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
        <SearchBar value="" onChange={() => {}} onPress={() => router.push('/search')} />
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <View className="mt-7 flex-1 items-center justify-center">
            <Text className="text-lg text-[#666]">{error}</Text>
          </View>
        ) : randomWordDetails.length > 0 ? (
          <ScrollView>
            <View>
              <Text className="my-7 text-2xl font-bold">Discover new words</Text>
              {randomWordDetails.map((wordDetails, idx) => (
                <WordCard key={idx} wordDetails={wordDetails} />
              ))}
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
}
