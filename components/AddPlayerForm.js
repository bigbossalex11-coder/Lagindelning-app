import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { COLORS } from "../theme";

export default function AddPlayerForm(props) {
  const [name, setName] = useState("");

  function handleAdd() {
    props.onAdd(name);
    setName("");
  }
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Ny spelare"
        placeholderTextColor={COLORS.muted}
        value={name}
        onChangeText={setName}
      />
      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={{ color: COLORS.text }}>Lägg till</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, marginVertical: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    color: COLORS.text,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});
