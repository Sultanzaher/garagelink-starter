import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nProvider } from '../lib/i18n';
import { UnlockProvider } from '../lib/store';

export default function RootLayout() {
  return (
    <I18nProvider>
      <UnlockProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" options={{ title: 'GarageLink' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
          <Stack.Screen name="garage/[id]" options={{ title: 'Garage' }} />
          <Stack.Screen name="booking/[id]" options={{ title: 'Booking' }} />
          <Stack.Screen name="active/[id]" options={{ title: 'Active Job' }} />
          <Stack.Screen name="chat/[id]" options={{ title: 'Chat' }} />
        </Stack>
      </UnlockProvider>
    </I18nProvider>
  );
}
