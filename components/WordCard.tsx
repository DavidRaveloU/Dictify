import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { WordDetails } from '~/app/types/dictionary';

interface WordCardProps {
  wordDetails: WordDetails;
}

export default function WordCard({ wordDetails }: WordCardProps) {
  return (
    <Link href={{ pathname: '/details', params: { word: wordDetails.word } }} asChild>
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
                  {wordDetails.meanings[0]?.partOfSpeech || 'No part of speech available.'}
                </Text>
              </View>
              {wordDetails.phonetics?.[0]?.text && (
                <Text className="py-1 text-[1.2rem] italic text-[#999]">
                  {wordDetails.phonetics?.[0]?.text}
                </Text>
              )}
              <Text>
                {wordDetails.meanings[0]?.definitions[0]?.definition || 'No definition available.'}
              </Text>
              {wordDetails.meanings?.[0]?.definitions?.[0]?.example && (
                <Text className="mt-2 italic text-[#666]">
                  Example:{' '}
                  {wordDetails.meanings?.[0]?.definitions?.[0]?.example.charAt(0).toUpperCase() +
                    wordDetails.meanings?.[0]?.definitions?.[0]?.example.slice(1)}
                </Text>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
}
