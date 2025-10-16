import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Biblioteca App</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Fazer Login"
          onPress={() => router.push("./login")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Cadastrar Usuário"
          onPress={() => router.push("./cadastro")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#222",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 8,
  },
});
