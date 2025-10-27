import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import api from "../../services/api";
import { Livro } from "@/types/Livro";

export default function NovoLivro() {
  const [livro, setLivro] = useState<Livro | null>(null);

  async function handleAdicionarLivro() {
    try {
      if (!livro?.titulo || !livro?.autor) {
        return Alert.alert("Atenção", "Preencha pelo menos o título e o autor.");
      }

      const response = await api.post("/livros", livro);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Livro adicionado com sucesso!");
        router.back();
      }
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível adicionar o livro.");
    }
  }

  return (
    <ScrollView style={styles.container}>      

      <TextInput
        placeholder="Título"
        value={livro?.titulo}
        onChangeText={(texto) => setLivro({ ...livro!, titulo: texto })}
        style={styles.input}
      />

      <TextInput
        placeholder="Autor"
        value={livro?.autor}
        onChangeText={(texto) => setLivro({ ...livro!, autor: texto })}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        value={livro?.descricao}
        multiline
        onChangeText={(texto) => setLivro({ ...livro!, descricao: texto })}
        style={styles.textArea}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAdicionarLivro}
      >
        <Text style={styles.buttonText}>Salvar Livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    height: 100,
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});