import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetalhesLivro() {
  const { id } = useLocalSearchParams();
  const [livro, setLivro] = useState<any>(null);

  useEffect(() => {
    api.get(`/livros/${id}`).then((res) => setLivro(res.data));
  }, [id]);  

  async function handleReservar() {
    try {
      const usuario = await AsyncStorage.getItem("usuario");
      if (!usuario) {
        Alert.alert("Erro", "Usuário não encontrado");
        return;
      }
      if (livro.reservado) {
        Alert.alert("Erro", "Livro já está reservado");
        return;
      }
      const { id: idUsuario } = JSON.parse(usuario);

      await api.post(`/livros/reservar/${id}`, idUsuario, {headers: { "Content-Type": "application/json" },});
      Alert.alert("Sucesso", "Livro reservado com sucesso!");
      router.back();
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível reservar o livro");
    }
  }
  
  if (!livro) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{livro.titulo}</Text>
      <Text style={styles.author}>Autor: {livro.autor}</Text>
      <Text style={styles.text}>{livro.descricao}</Text>
      <Text style={{ marginBottom: 10 }}>
        Status: {livro.reservado ? "Reservado" : "Disponível"}
      </Text>

      {!livro.reservado && (
        <TouchableOpacity style={styles.button} onPress={handleReservar}>
          <Text style={styles.buttonText}>Reservar Livro</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  author: { fontSize: 18, marginBottom: 10, color: "#555" },
  text: { fontSize: 16, marginBottom: 8 },
  button: { backgroundColor: "#2ecc71", padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});
