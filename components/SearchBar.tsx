import { Ionicons } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';

interface SearchProps {
  value: string;
  onChange: (text: string) => void;
  onPress: () => void;
}

export default function SearchBar({ value, onChange, onPress }: SearchProps) {
  return (
    <Pressable className="mb-4" onPress={onPress}>
      <View className="mt-4 w-full flex-row items-center rounded-lg bg-[#E7E7E7] px-4">
        <Ionicons name="search" size={24} color="#999" />
        <TextInput
          className="ml-2 h-14 flex-1 text-[#282C34]"
          placeholder="Find the meaning..."
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChange}
          editable={false}
        />
      </View>
    </Pressable>
  );
}
