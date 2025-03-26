import { Text, View } from 'react-native';

import { Definition } from '~/app/types/dictionary';

interface DefinitionCardProps {
  definition: Definition;
  defIdx: number;
}

export default function DefinitionItem({ definition, defIdx }: DefinitionCardProps) {
  return (
    <View className="mb-4 ml-2 flex-row items-start">
      <Text className="text-[16px] text-[#111]">{defIdx + 1}.</Text>
      <View className="ml-5 flex-col">
        <Text className="text-[16px] text-[#111]">{definition.definition}</Text>
        {definition.example && (
          <Text className="mt-1 text-[14px] italic text-[#666]">Example: {definition.example}</Text>
        )}
        {definition.synonyms && definition.synonyms.length > 0 && (
          <Text className="mt-1 text-[14px] italic text-[#888]">
            Synonyms: {definition.synonyms.join(', ')}
          </Text>
        )}
        {definition.antonyms && definition.antonyms.length > 0 && (
          <Text className="mt-1 text-[14px] italic text-[#888]">
            Antonyms: {definition.antonyms.join(', ')}
          </Text>
        )}
      </View>
    </View>
  );
}
