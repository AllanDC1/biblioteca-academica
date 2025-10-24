import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../services/api";

export default function CadastroLivro() {
  const { id } = useLocalSearchParams();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/livros/${id}`).then((res) => {
        setTitulo(res.data.titulo);
        setAutor(res.data.autor);
      });
    }
  }, [id]);

  const salvarLivro = async () => {
    try {
      if (id) {
        await api.put(`/livros/${id}`, { titulo, autor });
        Alert.alert("Sucesso", "Livro atualizado!");
      } else {
        await api.post("/livros", { titulo, autor });
        Alert.alert("Sucesso", "Livro cadastrado!");
      }
      router.push("./livros");
    } catch (error : any) {
      Alert.alert("Erro", error.response?.data || "Falha ao salvar livro");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id ? "Editar Livro" : "Cadastrar Livro"}</Text>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
      <Button title={id ? "Atualizar" : "Cadastrar"} onPress={salvarLivro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
});
