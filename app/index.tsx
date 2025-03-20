import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className="mx-4 mt-4 flex-1 bg-[#F2F2F2]">
        <View className="flex-row items-center justify-end">
          <Ionicons name="scan" size={24} color="#999" />
        </View>

        {/* Campo de búsqueda */}
        <Pressable onPress={() => router.push('/search')}>
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

        <Link href={{ pathname: '/details', params: { word: 'Run' } }} asChild>
          <Pressable>
            {({ pressed }) => (
              <View
                className={`center mt-7 flex-row rounded-lg bg-[#FAF6F3] p-7 ${pressed ? 'opacity-50' : ''}`}>
                <View className="flex-col">
                  <View className="flex-row items-center gap-2">
                    <View className="h-7 w-2 bg-[#2563eb]" />
                    <Text className="text-4xl font-bold">Run</Text>
                    <Text className="text-[#999]">Verb</Text>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Text className="text-xl italic text-[#999]">/həˈləʊ/</Text>
                    <Ionicons name="volume-high" size={24} color="#999" />
                  </View>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitipsum dolor sit amet,
                    consectetur adipiscing elit
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </Link>
      </View>
    </>
  );
}
