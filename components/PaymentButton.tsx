import React, { useState } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { useUnlock } from '../lib/store';
import { useTranslation } from 'react-i18next';

export default function PaymentButton({ amountAED, onSuccess }:{ amountAED:number, onSuccess:()=>void }) {
  const { t } = useTranslation();
  const { activatePass } = useUnlock();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    // MOCK: simulate 1s payment then success
    await new Promise(res => setTimeout(res, 1000));
    activatePass(24 * 60); // 24h in minutes
    setLoading(false);
    onSuccess();
  };

  return (
    <Pressable onPress={pay} disabled={loading} style={{ backgroundColor:'#16a34a', padding:12, borderRadius:8, alignItems:'center' }}>
      <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
        {loading ? <ActivityIndicator color="#fff" /> : null}
        <Text style={{ color:'#fff', fontWeight:'700' }}>{t('unlock.pay', { amount: amountAED })}</Text>
      </View>
    </Pressable>
  );
}
