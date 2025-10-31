import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router, useFocusEffect } from "expo-router";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "@/types/Usuario";
import { Livro } from "@/types/Livro";

export default function ListaLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [busca, setBusca] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

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
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuario");
      if (dados) setUsuario(JSON.parse(dados));
    };
    carregarUsuario();
  }, []); 

  useFocusEffect(
    useCallback(() => {
      listarLivros();
    }, [])
  );

  const livrosFiltrados = livros.filter(
    (l) =>
      l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      l.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por título ou autor"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <FlatList
        data={livrosFiltrados}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`./livros/detalhes?id=${item.id}`)}
          >
            <Text style={styles.itemTitle}>{item.titulo}</Text>
            <Text>{item.autor}</Text>
          </TouchableOpacity>
        )}
      />

      {usuario?.admin && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("./livros/cadastro")}
        >
          <Text style={styles.buttonText}>Adicionar Livro</Text>
        </TouchableOpacity>
      )}
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  item: {
    padding: 15,
    backgroundColor: "#f1f2f6",
    borderRadius: 8,
    marginVertical: 6,
  },
  itemTitle: { fontWeight: "bold", fontSize: 16 },
  button: { backgroundColor: "#2ecc71", padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});
