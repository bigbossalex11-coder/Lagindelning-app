import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function TeamList(props) {
  return (
    <ScrollView>
      {props.teams.map((team, index) => (
        <View key={index} style={styles.team}>
          <Text style={styles.title}>Lag {index + 1}</Text>
          {team.map(player => (
            <Text key={player.id}>{player.name}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  team:  { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 12 },
  title: { fontWeight: 'bold', marginBottom: 6 },
});