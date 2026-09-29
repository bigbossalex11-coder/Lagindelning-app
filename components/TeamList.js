import { ScrollView, View, Text, StyleSheet } from "react-native";
import { RANK, COLORS } from "../theme";

export default function TeamList(props) {
  return (
    <ScrollView>
      {props.teams.map((team, index) => (
        <View key={index} style={styles.team}>
          <Text style={styles.title}>Lag {index + 1}</Text>
          {team.map((player) => (
            <View
              key={player.id}
              style={[styles.pill, { backgroundColor: RANK[player.rank].bg }]}
            >
              <Text style={{ color: RANK[player.rank].text }}>
                {player.name}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  team: {
    backgroundColor: COLORS.panel,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
    color: COLORS.text,
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 2,
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  pill: {
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 6,
  },
});
