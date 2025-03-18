import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className="mx-4 mt-4 flex-1 bg-[#F2F2F2]">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-semibold text-[#1F1F1F]">Search</Text>
          <Ionicons name="scan" size={24} color="#999" />
        </View>
        <View className="mt-4 w-full flex-row items-center rounded-lg bg-[#E7E7E7] px-4">
          <Ionicons name="search" size={24} color="#999" />
          <TextInput
            className="ml-2 h-14 flex-1 text-[#282C34]"
            placeholder="Find the meaning..."
            placeholderTextColor="#999"
          />
        </View>
        <Link href={{ pathname: '/details', params: { name: 'Run' } }} asChild>
          <Pressable>
            {({ pressed }) => (
              <View className={`mt-7 rounded-lg bg-[#FAF6F3] p-7 ${pressed ? 'opacity-50' : ''}`}>
                <View className="flex-row items-center gap-2">
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
            )}
          </Pressable>
        </Link>
      </View>

      {/* <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
      </Container> */}
    </>
  );
}
