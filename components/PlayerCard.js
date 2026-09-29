import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { RANK } from "../theme";

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
          { backgroundColor: RANK[props.player.rank].bg},
        ]}
      >
        <View style={styles.head}>
  <Text style={[styles.name, { color: RANK[props.player.rank].text }]}>{props.player.name}</Text>
  <Pressable onPress={confirmDelete}>
    <Text style={{ color: RANK[props.player.rank].text }}>✕</Text>
  </Pressable>
</View>
        <View style={styles.dots}>
          <Pressable
            onPress={() => props.onChangeRank(props.player.id, "grön")}
            style={[styles.dot, { backgroundColor: RANK.grön.dot}]}
          />
          <Pressable
            onPress={() => props.onChangeRank(props.player.id, "gul")}
            style={[styles.dot, { backgroundColor: RANK.gul.dot}]}
          />
          <Pressable
            onPress={() => props.onChangeRank(props.player.id, "röd")}
            style={[styles.dot, { backgroundColor: RANK.röd.dot}]}
          />
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
      head: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
      name: { fontWeight: "600", fontSize: 15 },
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
  });
