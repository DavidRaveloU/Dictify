import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <>
      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <View className="flex-row justify-around py-3">
          <Link href="/" asChild>
            <Pressable onPress={() => setActiveTab('home')}>
              <View
                className={`items-center ${activeTab === 'home' ? 'text-[#4ECDC4]' : 'text-[#999]'}`}>
                <Ionicons name="home" size={24} color={activeTab === 'home' ? '#4ECDC4' : '#999'} />
                <Text
                  className={`text-xs ${activeTab === 'home' ? 'text-[#4ECDC4]' : 'text-[#999]'}`}>
                  Home
                </Text>
              </View>
            </Pressable>
          </Link>
          <Link href="/" asChild>
            <Pressable onPress={() => setActiveTab('history')}>
              <View
                className={`items-center ${activeTab === 'history' ? 'text-[#4ECDC4]' : 'text-[#999]'}`}>
                <Ionicons
                  name="time"
                  size={24}
                  color={activeTab === 'history' ? '#4ECDC4' : '#999'}
                />
                <Text
                  className={`text-xs ${activeTab === 'history' ? 'text-[#4ECDC4]' : 'text-[#999]'}`}>
                  History
                </Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/" asChild>
            <Pressable onPress={() => setActiveTab('profile')}>
              <View
                className={`items-center ${activeTab === 'profile' ? 'text-[#4ECDC4]' : 'text-[#999]'}`}>
                <Ionicons
                  name="person"
                  size={24}
                  color={activeTab === 'profile' ? '#4ECDC4' : '#999'}
                />
                <Text
                  className={`text-xs ${activeTab === 'profile' ? 'text-[#4ECDC4]' : 'text-[#999]'}`}>
                  Profile
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </>
  );
}
