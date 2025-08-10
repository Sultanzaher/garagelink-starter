import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getGarageDetails } from '../../lib/api';
import { useUnlock } from '../../lib/store';

export default function GarageDetailsScreen() {
  const { id } = useLocalSearchParams<{id: string}>();
  const { t } = useTranslation();
  const router = useRouter();
  const { hasActivePass } = useUnlock();
  const details = getGarageDetails(id as string, hasActivePass);

  if (!details) return <View style={styles.container}><Text>{t('common.not_found')}</Text></View>;

  if (!hasActivePass) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('garage.locked_title')}</Text>
        <Text style={styles.paragraph}>{t('garage.locked_text')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{details.name}</Text>
      <Text>{details.address}</Text>
      <Text>{t('home.rating')}: {details.avg_rating.toFixed(1)} ⭐ ({details.rating_count})</Text>
      <Text>{t('home.price_band')}: {details.price_band}</Text>
      <Text>{t('home.pickup')}: {details.offers_pickup ? t('common.yes') : t('common.no')}</Text>

      <View style={{ height: 16 }} />

      <Pressable style={styles.cta} onPress={() => router.push(`/booking/${details.id}`)}>
        <Text style={styles.ctaText}>{t('garage.book_now')}</Text>
      </Pressable>

      <Pressable style={styles.secondary} onPress={() => Alert.alert(t('garage.chat_title'), t('garage.chat_hint'))}>
        <Text style={styles.secondaryText}>{t('garage.message_garage')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, gap:8 },
  title: { fontSize: 20, fontWeight: '700' },
  paragraph: { color: '#333' },
  cta: { backgroundColor: '#246BFD', padding: 12, borderRadius: 8, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '600' },
  secondary: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryText: { color: '#246BFD', fontWeight: '600' }
});
