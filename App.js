import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
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

  function changeRank(id, newRank) {
    const current = players.find(p => p.id === id)
    fetch(`${API_URL}/players/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id, name: current.name, rank: newRank }) })
    .catch(err => setError("kunde inte ändra spelaren"));
    const nyLista = players.map(player => {
    if (player.id === id) {
    return { ...player, rank: newRank };
}
    return player;
});
    setPlayers(nyLista);
  }
   return (
  
  <View style={styles.container}>
      <Text>Lagindelning</Text>
        {error && <Text>{error}</Text> }
        <FlatList
        data={players}
        keyExtractor={p => String(p.id)}
        numColumns={2}
        renderItem={({ item }) => (
      <View style={[styles.card, { backgroundColor: RANK_COLORS[item.rank] }]}>
        <Text>{item.name}</Text>
        <View style={styles.dots}>
        <Pressable onPress={() => changeRank(item.id, "grön")} style={[styles.dot, { backgroundColor: RANK_COLORS.grön }]} />
        <Pressable onPress={() => changeRank(item.id, "gul")} style={[styles.dot, { backgroundColor: RANK_COLORS.gul }]} />
        <Pressable onPress={() => changeRank(item.id, "röd")} style={[styles.dot, { backgroundColor: RANK_COLORS.röd }]} />
  </View>
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
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  
});


