import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

const RANK_COLORS = {
  grön: "#4caf50",
  gul: "#ffc107",
  röd: "#f44336",
};

export default function PlayerCard(props) {
  function confirmDelete() {
    Alert.alert("Ta bort spelare", `Vill du ta bort ${props.player.name}?`, [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Ta bort",
        style: "destructive",
        onPress: () => props.onDelete(props.player.id),
      },
    ]);
  }
    return (
      <View
        style={[
          styles.card,
          { backgroundColor: RANK_COLORS[props.player.rank] },
        ]}
      >
        <Text>{props.player.name}</Text>
        <View style={styles.dots}>
          <Pressable
            onPress={() => props.onChangeRank(props.player.id, "grön")}
            style={[styles.dot, { backgroundColor: RANK_COLORS.grön }]}
          />
          <Pressable
            onPress={() => props.onChangeRank(props.player.id, "gul")}
            style={[styles.dot, { backgroundColor: RANK_COLORS.gul }]}
          />
          <Pressable
            onPress={() => props.onChangeRank(props.player.id, "röd")}
            style={[styles.dot, { backgroundColor: RANK_COLORS.röd }]}
          />
          <Pressable onPress={confirmDelete}>
            <Text style={styles.delete}>Ta bort</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      margin: 10,
      padding: 10,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#ddd", 
      maxWidth: "42%",
    },
    dots: {
      flexDirection: "row",
      gap: 8,
      marginTop: 8,
    },
    dot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#fff",
    },
    delete: {
      marginTop: 8,
      fontSize: 12,
    },
  });
