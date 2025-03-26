import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { fetchWordDetails } from './api/dictionary';
import { Meaning, WordDetails } from './types/dictionary';

import DefinitionItem from '~/components/DefinitionItem';
import LoadingIndicator from '~/components/LoadingIndicator';
import StackScreen from '~/components/StackScreen';

export default function Details() {
  const { word } = useLocalSearchParams<{ word: string }>();
  const [wordDetails, setWordDetails] = useState<WordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [groupedMeanings, setGroupedMeanings] = useState<{ [key: string]: Meaning[] }>({});
  const [selectedPhonetic, setSelectedPhonetic] = useState<{
    text?: string;
    audio?: string;
  } | null>(null);

  const [isPLaying, setIsPlaying] = useState(false);

  const playSound = async (audioUrl: string) => {
    if (isPLaying) return;

    try {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl }, { shouldPlay: true });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  useEffect(() => {
    const getWordDetails = async () => {
      if (word) {
        const details = await fetchWordDetails(word);
        if (details) {
          setWordDetails(details);
          const grouped = details.meanings.reduce(
            (acc, meaning) => {
              if (!acc[meaning.partOfSpeech]) {
                acc[meaning.partOfSpeech] = [];
              }
              acc[meaning.partOfSpeech].push(meaning);
              return acc;
            },
            {} as { [key: string]: Meaning[] }
          );
          setGroupedMeanings(grouped);
          const phonetics = details.phonetics || [];
          const firstWithAudio = phonetics.find((p) => p.audio);
          const firstWithText = phonetics.find((p) => p.text);

          if (firstWithAudio) {
            setSelectedPhonetic({
              text: firstWithAudio.text || firstWithText?.text || '',
              audio: firstWithAudio.audio,
            });
          } else if (firstWithText) {
            setSelectedPhonetic({
              text: firstWithText.text,
              audio: '',
            });
          } else {
            setSelectedPhonetic(null);
          }
        }
      }
      setLoading(false);
    };

    getWordDetails();
  }, [word]);

  return (
    <>
      <StackScreen />
      {loading ? (
        <LoadingIndicator />
      ) : !wordDetails ? (
        <View className="mt-7 flex-1 items-center justify-center">
          <Text>Word not found.</Text>
        </View>
      ) : (
        <View className="mt-5 flex-1 px-6">
          <Text className="text-5xl font-semibold text-[#1F1F1F]">
            {wordDetails.word.charAt(0).toUpperCase() + wordDetails.word.slice(1)}
          </Text>
          <View className="mb-3 flex-row items-center gap-2">
            {selectedPhonetic?.text ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-lg italic text-blue-600">{selectedPhonetic.text}</Text>
                {selectedPhonetic.audio && (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedPhonetic.audio) {
                        playSound(selectedPhonetic.audio);
                      }
                    }}>
                    <Ionicons name="volume-high" size={24} color="#2563eb" />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View className="mt-3" />
            )}
          </View>
          {Object.keys(groupedMeanings).length > 1 && (
            <View className="flex-row gap-3 pb-5">
              {Object.keys(groupedMeanings).map((partOfSpeech, idx) => (
                <TouchableOpacity
                  key={idx}
                  className={`flex-1  rounded-lg border-2 border-dashed border-blue-600/40 p-4 ${activeTab === idx ? 'border-transparent bg-blue-600' : 'bg-transparent'} `}
                  onPress={() => setActiveTab(idx)}>
                  <Text
                    className={`text-center ${activeTab === idx ? 'font-semibold text-white' : 'text-gray-500'}`}>
                    {partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <ScrollView className="p-3" contentContainerStyle={{ paddingBottom: 32 }}>
            <Text className="mb-2 text-lg font-semibold">Definitions</Text>
            {groupedMeanings[Object.keys(groupedMeanings)[activeTab]].map((meaning, idx) => (
              <View key={idx}>
                <Text className="mb-4 text-xs text-[#666]">{meaning.partOfSpeech}</Text>
                {meaning.definitions.map((definition, defIdx) => (
                  <DefinitionItem key={defIdx} definition={definition} defIdx={defIdx} />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}
