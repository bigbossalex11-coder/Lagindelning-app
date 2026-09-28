import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react'


const API_URL = "http://10.20.8.56:5293";
const RANK_COLORS = {
  grön: '#4caf50',
  gul:  '#ffc107',
  röd:  '#f44336',
};

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
        {error && <Text>{error}</Text> }
        <FlatList
        data={players}
        keyExtractor={p => String(p.id)}
        numColumns={2}
        renderItem={({ item }) => (
      <View style={styles.card}>
      <Text>{item.name}</Text>
      <Text style={[styles.pill, { backgroundColor: RANK_COLORS[item.rank] }]}>{item.rank}</Text>
    </View>
)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 12,  
  },

    card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ddd',
    maxWidth: '42%',
},
  
});


