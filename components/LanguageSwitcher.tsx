import React from 'react';
import { View, Pressable, Text, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const setLang = async (lng: 'en'|'ar'|'ur') => {
    await i18n.changeLanguage(lng);
    if (lng === 'ar') {
      if (!I18nManager.isRTL) {
        I18nManager.allowRTL(true); I18nManager.forceRTL(true);
      }
    } else {
      if (I18nManager.isRTL) {
        I18nManager.allowRTL(false); I18nManager.forceRTL(false);
      }
    }
  };
  return (
    <View style={{ flexDirection:'row', gap:8, marginVertical:8 }}>
      {(['en','ar','ur'] as const).map(l => (
        <Pressable key={l} onPress={() => setLang(l)} style={{ paddingHorizontal:10, paddingVertical:6, borderRadius:8, borderWidth:1, borderColor:'#ddd' }}>
          <Text style={{ textTransform:'uppercase' }}>{l}</Text>
        </Pressable>
      ))}
    </View>
  );
}
