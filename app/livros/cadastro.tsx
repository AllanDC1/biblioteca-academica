import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import api from "../../services/api";
import { Livro } from "@/types/Livro";

export default function NovoLivro() {
  const [livro, setLivro] = useState<Livro | null>(null);
  const [imagem, setImagem] = useState<string | null>(null);

  async function handleAdicionarLivro() {
    try {
      if (!livro?.titulo || !livro?.autor) {
        return Alert.alert("Atenção", "Preencha pelo menos o título e o autor.");
      }

      if (imagem) {
        const url = await handleUploadImagem();
        setLivro({ ...livro!, imagemUrl: url });
        console.log("URL da imagem enviada:", livro.imagemUrl);
      }

      console.log("Livro a ser enviado:", livro);
      const response = await api.post("/livros", livro);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Livro adicionado com sucesso!");
        router.back();
      }
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível adicionar o livro.");
    }
  }

  async function selecionarImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  async function handleUploadImagem() {
    if (!imagem) return null;

    const nomeArquivo = livro?.titulo
    ? livro.titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_") + ".jpg"
    : "livro.jpg";

    const formData = new FormData();
    formData.append("file", {
      uri: imagem,
      name: nomeArquivo,
      type: "image/jpeg",
    } as any);

    const response = await api.post("/livros/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url;
  }

  return (
    <View style={styles.container}>      

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

      <TouchableOpacity style={styles.uploadButton} onPress={selecionarImagem}>
        <Text style={styles.uploadText}>
          {imagem ? "Trocar Imagem" : "Selecionar Imagem"}
        </Text>
      </TouchableOpacity>

      {imagem && (
        <Image source={{ uri: imagem }} style={styles.preview} />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAdicionarLivro}
      >
        <Text style={styles.buttonText}>Salvar Livro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
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
  uploadButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  uploadText: {
    color: "white",
    fontSize: 16,
  },
  preview: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginTop: 10,
  },
});