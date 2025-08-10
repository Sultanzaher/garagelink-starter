import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUnlock } from '../lib/store';
import { useTranslation } from 'react-i18next';

export default function UnlockBadge() {
  const { t } = useTranslation();
  const { hasActivePass, remainingMinutes } = useUnlock();
  if (!hasActivePass) return <View />;
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{t('unlock.active')} · {remainingMinutes}m</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf:'flex-start', backgroundColor:'#DCFCE7', borderColor:'#22C55E', borderWidth:1, paddingHorizontal:10, paddingVertical:6, borderRadius:999 },
  text: { color:'#166534', fontWeight:'600' }
});
