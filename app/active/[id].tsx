import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getBooking, startService, completeService, subscribeTracking, unsubscribeTracking } from '../../lib/api';

export default function ActiveJobScreen() {
  const { id } = useLocalSearchParams<{id: string}>();
  const { t } = useTranslation();
  const router = useRouter();
  const [status, setStatus] = useState<'confirmed'|'in_progress'|'completed'>('confirmed');
  const [coords, setCoords] = useState<{lat:number;lon:number}>({lat:24.2075, lon:55.7447});

  useEffect(() => {
    const booking = getBooking(id as string);
    if (booking) setStatus(booking.status as any);
    subscribeTracking(id as string, (c:any) => setCoords(c));
    return () => unsubscribeTracking(id as string);
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('active.title')}</Text>
      <Text>{t('active.status')}: {status}</Text>
      <Text>{t('active.coords')}: {coords.lat.toFixed(5)}, {coords.lon.toFixed(5)}</Text>

      {status === 'confirmed' && (
        <Pressable style={styles.cta} onPress={() => { startService(id as string); setStatus('in_progress'); }}>
          <Text style={styles.ctaText}>{t('active.start')}</Text>
        </Pressable>
      )}

      {status === 'in_progress' && (
        <Pressable style={styles.cta} onPress={() => { completeService(id as string); setStatus('completed'); setTimeout(()=>router.replace('/'), 1200); }}>
          <Text style={styles.ctaText}>{t('active.complete')}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, gap:12 },
  title: { fontSize:18, fontWeight:'700' },
  cta: { backgroundColor:'#246BFD', padding:12, borderRadius:8, alignItems:'center' },
  ctaText: { color:'#fff', fontWeight:'600' }
});
