import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createBooking } from '../../lib/api';

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{id: string}>();
  const { t } = useTranslation();
  const router = useRouter();
  const [when, setWhen] = useState<'ASAP'|'SCHEDULED'>('ASAP');

  const onConfirm = () => {
    const bookingId = createBooking(id as string, when);
    router.replace(`/active/${bookingId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('booking.title')}</Text>
      <View style={styles.row}>
        <Pressable onPress={() => setWhen('ASAP')} style={[styles.chip, when==='ASAP' && styles.chipActive]}>
          <Text>ASAP</Text>
        </Pressable>
        <Pressable onPress={() => setWhen('SCHEDULED')} style={[styles.chip, when==='SCHEDULED' && styles.chipActive]}>
          <Text>{t('booking.scheduled')}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.cta} onPress={onConfirm}>
        <Text style={styles.ctaText}>{t('booking.confirm')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, gap:12 },
  title: { fontSize:18, fontWeight:'700' },
  row: { flexDirection:'row', gap:8 },
  chip: { paddingHorizontal:12, paddingVertical:8, borderRadius:16, borderWidth:1, borderColor:'#ddd' },
  chipActive: { backgroundColor:'#eef4ff', borderColor:'#246BFD' },
  cta: { backgroundColor:'#246BFD', padding:12, borderRadius:8, alignItems:'center' },
  ctaText: { color:'#fff', fontWeight:'600' }
});
