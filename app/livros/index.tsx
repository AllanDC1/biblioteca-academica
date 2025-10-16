import { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import api from "../../services/api";

export default function ListaLivros() {
  const [livros, setLivros] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  const listarLivros = async () => {
    try {
      const res = await api.get("/livros");
      setLivros(res.data);
    } catch (e) {
      console.log("Erro ao buscar livros:", e);
    }
  };

  useEffect(() => {
    listarLivros();
  }, []);

  const livrosFiltrados = livros.filter(
    (l) =>
      l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      l.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Biblioteca</Text>

      <TextInput
        placeholder="Buscar por título ou autor"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.autor}>{item.autor}</Text>
            <Button title="Detalhes" onPress={() => router.push(`./livros/detalhes?id=${item.id}`)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  card: { padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, marginBottom: 10 },
  titulo: { fontSize: 18, fontWeight: "bold" },
  autor: { color: "#555" },
});
