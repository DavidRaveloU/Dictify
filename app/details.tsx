import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { fetchWordDetails } from './api/dictionary';
import { Meaning, WordDetails } from './types/dictionary';

export default function Details() {
  const { word } = useLocalSearchParams<{ word: string }>();
  const [wordDetails, setWordDetails] = useState<WordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [groupedMeanings, setGroupedMeanings] = useState<{ [key: string]: Meaning[] }>({});

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
        }
      }
      setLoading(false);
    };

    getWordDetails();
  }, [word]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!wordDetails) {
    return <Text>Word not found.</Text>;
  }

  const selectedPhonetic = (() => {
    const phonetics = wordDetails.phonetics || [];

    // Buscar el último phonetic con audio
    const lastWithAudio = phonetics.reverse().find((p) => p.audio);
    if (lastWithAudio) return lastWithAudio;

    // Buscar el primer phonetic con audio
    const firstWithAudio = phonetics.find((p) => p.audio);
    if (firstWithAudio) return firstWithAudio;

    // Buscar el primer phonetic con texto
    const firstWithText = phonetics.find((p) => p.text);
    if (firstWithText) return firstWithText;

    return null;
  })();

  const partOfSpeechTabs = Object.keys(groupedMeanings);

  return (
    <>
      <Stack.Screen
        options={{
          title: wordDetails.word,
          headerShown: true,
        }}
      />
      <View className="flex-1">
        <Text className="text-xl font-semibold text-[#1F1F1F]">{wordDetails.word}</Text>
        {selectedPhonetic?.text && (
          <Text className="text-lg italic text-[#999]">{selectedPhonetic.text}</Text>
        )}

        {/* Mostrar el botón de audio si hay un phonetic con audio */}
        {selectedPhonetic?.audio && (
          <TouchableOpacity
            onPress={() => {
              /* Lógica para reproducir audio */
            }}>
            <Text className="text-lg text-blue-500">Play Audio</Text>
          </TouchableOpacity>
        )}

        <View className="flex-row bg-white">
          {partOfSpeechTabs.map((partOfSpeech, idx) => (
            <TouchableOpacity
              key={idx}
              className={`flex-1 border-b-2 p-4 ${activeTab === idx ? 'border-blue-500' : 'border-transparent'}`}
              onPress={() => setActiveTab(idx)}>
              <Text
                className={`text-center ${activeTab === idx ? 'font-semibold text-blue-500' : 'text-gray-500'}`}>
                {partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView className="p-3" contentContainerStyle={{ paddingBottom: 32 }}>
          {groupedMeanings[partOfSpeechTabs[activeTab]].map((meaning, idx) => (
            <View key={idx} className="mt-4">
              <Text className="text-xs">
                {idx + 1}. {meaning.partOfSpeech}
              </Text>
              {meaning.definitions.map((definition, defIdx) => (
                <View key={defIdx} className="mb-4 ml-2">
                  <Text className="mt-1 text-xs italic text-[#666]">{definition.definition}</Text>
                  {definition.example && (
                    <Text className="mt-1 text-xs italic text-[#666]">
                      Example: {definition.example}
                    </Text>
                  )}

                  {definition.synonyms && definition.synonyms.length > 0 && (
                    <Text className="mt-1 text-[#888]">
                      Synonyms: {definition.synonyms.join(', ')}
                    </Text>
                  )}
                  {definition.antonyms && definition.antonyms.length > 0 && (
                    <Text className="mt-1 text-[#888]">
                      Synonyms: {definition.antonyms.join(', ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
