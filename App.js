import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import PlayerCard from "./components/PlayerCard";
import TeamList from "./components/TeamList";

const API_URL = "http://10.20.8.56:5293";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamCount, setTeamCount] = useState(3);

  useEffect(() => {
    fetch(`${API_URL}/players`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setPlayers(data))
      .catch((err) => setError("kunde inte nå servern"));
  }, []);

  function changeRank(id, newRank) {
    const current = players.find((p) => p.id === id);
    fetch(`${API_URL}/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, name: current.name, rank: newRank }),
    }).catch((err) => setError("kunde inte ändra spelaren"));
    const nyLista = players.map((player) => {
      if (player.id === id) {
        return { ...player, rank: newRank };
      }
      return player;
    });
    setPlayers(nyLista);
  }
  function deletePlayer(id) {
    fetch(`${API_URL}/players/${id}`, { method: "DELETE" })
      .then((r) => {
        if (!r.ok) throw new Error();
        setPlayers(players.filter((p) => p.id !== id));
      })
      .catch((err) => setError("kunde inte ta bort spelaren"));
  }
  function makeTeams(teamCount, mode) {
    fetch(`${API_URL}/teams?teamCount=${teamCount}&mode=${mode}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setTeams(data))
      .catch((err) => {
        setError("kunde inte dela in lagen");
      });
  }
  return (
    <View style={styles.container}>
      <Text>Lagindelning</Text>
      {error && <Text>{error}</Text>}
      <View style={styles.controls}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={String(teamCount)}
          onChangeText={(t) => setTeamCount(Number(t))}
        />
        <Pressable
          style={styles.button}
          onPress={() => makeTeams(teamCount, "random")}
        >
          <Text>Slumpa</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => makeTeams(teamCount, "level")}
        >
          <Text>Nivå</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setTeams([])}>
          <Text>Rensa</Text>
        </Pressable>
      </View>
      {teams.length > 0 ? (
        <TeamList teams={teams} />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(p) => String(p.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <PlayerCard
              player={item}
              onChangeRank={changeRank}
              onDelete={deletePlayer}
            />
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 12,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: 50,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
