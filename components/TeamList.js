import { ScrollView, View, Text, StyleSheet } from "react-native";

const RANK_COLORS = {
  grön: "#4caf50",
  gul: "#ffc107",
  röd: "#f44336",
};

export default function TeamList(props) {
  return (
    <ScrollView>
      {props.teams.map((team, index) => (
        <View key={index} style={styles.team}>
          <Text style={styles.title}>Lag {index + 1}</Text>
          {team.map((player) => (
            <View key={player.id} style={styles.row}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: RANK_COLORS[player.rank] },
                ]}
              />
              <Text>{player.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  team: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  title: { fontWeight: "bold", marginBottom: 6 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 2,
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
});
