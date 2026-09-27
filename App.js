import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'


const API_URL = "http://10.20.9.130:5293";

export default function App() {
  const [players, setPlayers]= useState ([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
  fetch(`${API_URL}/players`)
  
 .then(r => {
    if (!r.ok) throw new Error();
    return r.json();
  })
  .then(data => setPlayers(data))
  .catch(err => setError("kunde inte nå servern"));
}, []);

  return (
    <View style={styles.container}>
      <Text>Lagindelning</Text>
      {players.map(p => <Text key={p.id}>{p.name}</Text>)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
