import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getThread, sendMessage } from '../../lib/api';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{id: string}>();
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const thread = getThread(id as string);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chat.title')}</Text>
      <FlatList
        style={{ flex: 1 }}
        data={thread.messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={[styles.msg, item.sender==='me' ? styles.me : styles.them]}>
            <Text>{item.body}</Text>
          </View>
        )}
      />
      <View style={styles.row}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder={t('chat.placeholder')!} />
        <Pressable style={styles.send} onPress={() => { if(text.trim()){ sendMessage(id as string, text.trim()); setText(''); }}}>
          <Text style={{ color:'#fff' }}>{t('chat.send')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:18, fontWeight:'700', marginBottom:8 },
  row: { flexDirection:'row', gap:8, alignItems:'center' },
  input: { flex:1, borderWidth:1, borderColor:'#ddd', borderRadius:8, paddingHorizontal:12, paddingVertical:8 },
  send: { backgroundColor:'#246BFD', paddingHorizontal:16, paddingVertical:10, borderRadius:8 },
  msg: { padding:10, borderRadius:8, marginVertical:4, maxWidth:'80%' },
  me: { backgroundColor:'#e7f0ff', alignSelf:'flex-end' },
  them: { backgroundColor:'#f0f0f0', alignSelf:'flex-start' }
});
