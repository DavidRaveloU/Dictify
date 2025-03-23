import { ActivityIndicator, View } from 'react-native';

export default function LoadingIndicator() {
  return (
    <View className="mt-7 flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}
