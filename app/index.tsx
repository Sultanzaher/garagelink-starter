import { Link, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getSearchResults } from '../lib/api';
import { useUnlock } from '../lib/store';
import UnlockBadge from '../components/UnlockBadge';
import PaymentButton from '../components/PaymentButton';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const [service, setService] = useState('tire-change');
  const results = useMemo(() => getSearchResults({ city: 'Al Ain', category: service }), [service]);
  const { hasActivePass } = useUnlock();

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Link href="/settings"><Text style={styles.link}>{t('settings.title')}</Text></Link>
      </View>

      <LanguageSwitcher />

      <View style={styles.row}>
        {['tire-change','oil-change','battery','brake-service'].map(cat => (
          <Pressable key={cat} onPress={() => setService(cat)} style={[styles.chip, service===cat && styles.chipActive]}>
            <Text style={styles.chipText}>{t(`categories.${cat}`)}</Text>
          </Pressable>
        ))}
      </View>

      <UnlockBadge />

      {!hasActivePass && (
        <View style={styles.unlockBox}>
          <Text style={styles.paragraph}>{t('home.unlock_hint')}</Text>
          <PaymentButton amountAED={5} onSuccess={() => {}} />
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => router.push(`/garage/${item.id}`)}>
            <Text style={styles.cardTitle}>{t('home.anonymous_garage')}</Text>
            <Text>{t('home.rating')}: {item.avg_rating.toFixed(1)} ⭐ ({item.rating_count})</Text>
            <Text>{t('home.price_band')}: {item.price_band}</Text>
            <Text>{t('home.pickup')}: {item.offers_pickup ? t('common.yes') : t('common.no')}</Text>
            <Text>{t('home.distance')}: {item.distance_km.toFixed(1)} km</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  title: { fontSize: 22, fontWeight: '600' },
  link: { color: '#246BFD' },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: '#ddd' },
  chipActive: { backgroundColor: '#eef4ff', borderColor: '#246BFD' },
  chipText: { fontSize: 14 },
  paragraph: { color: '#333' },
  unlockBox: { backgroundColor: '#fafafa', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 }
});
