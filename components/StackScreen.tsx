import { Stack } from 'expo-router';

interface StackScreenProps {
  title?: string;
  titleColor?: string;
}

export default function StackScreen({ title = 'Back', titleColor = '#2563eb' }: StackScreenProps) {
  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerShown: true,
          headerTintColor: titleColor,
          headerStyle: { backgroundColor: '#f9f9f9' },
        }}
      />
    </>
  );
}
