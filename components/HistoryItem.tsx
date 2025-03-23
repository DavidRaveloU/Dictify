import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface HistoryItemProps {
  word: string;
  onPress: () => void;
  onDelete: () => void;
}

export default function HistoryItem({ word, onPress, onDelete }: HistoryItemProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          className={`mb-3 flex-row items-center justify-between p-3 ${pressed ? 'bg-gray-200' : 'bg-white'}`}>
          <Text className="text-[#1F1F1F]">{word}</Text>
          <Pressable onPress={onDelete}>
            {({ pressed }) => (
              <Ionicons name="close" size={28} color={pressed ? '#2563eb' : '#999'} />
            )}
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}
