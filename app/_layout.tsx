import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar animated style="dark" translucent />
      <Stack />
    </>
  );
}
