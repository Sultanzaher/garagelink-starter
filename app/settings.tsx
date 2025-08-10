import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LanguageSwitcher from '../components/LanguageSwitcher';
import UnlockBadge from '../components/UnlockBadge';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>
      <LanguageSwitcher />
      <UnlockBadge />
      <Text style={{ color:'#666', marginTop:16 }}>{t('settings.info')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, gap:12 },
  title: { fontSize:20, fontWeight:'700' }
});
