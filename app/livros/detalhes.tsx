import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "../../services/api";

// Supondo que você tenha o usuário logado salvo em algum lugar, ex: AsyncStorage
const usuarioId = 1; // Substitua pelo ID real do usuário logado

export default function DetalhesLivro() {
  const { id } = useLocalSearchParams();
  const [livro, setLivro] = useState<any>(null);

  useEffect(() => {
    api.get(`/livros/${id}`).then((res) => setLivro(res.data));
  }, [id]);

  if (!livro) return <Text>Carregando...</Text>;

  const pegarLivro = async () => {
    try {
      await api.post(`/livros/reservar/${id}?usuarioId=${usuarioId}`);
      Alert.alert("Sucesso", "Empréstimo registrado e livro marcado como emprestado!");
      setLivro({ ...livro, emprestado: true }); // Atualiza status na tela
    } catch (e: any) {
      Alert.alert("Erro", e.response?.data || "Falha ao pegar livro");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{livro.titulo}</Text>
      <Text style={styles.author}>{livro.autor}</Text>
      <Text style={{ marginBottom: 10 }}>
        {livro.emprestado ? "Status: Emprestado" : "Status: Disponível"}
      </Text>

      {!livro.emprestado && (
        <Button title="Pegar Livro / Registrar Empréstimo" onPress={pegarLivro} />
      )}
      {livro.emprestado && <Text>Livro já está emprestado.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  author: { fontSize: 18, marginBottom: 10, color: "#555" },
});
