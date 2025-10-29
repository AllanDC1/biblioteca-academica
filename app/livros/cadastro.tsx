import React, { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, View, Image, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import api from "../../services/api";
import { Livro } from "@/types/Livro";

export default function NovoLivro() {
  const [livro, setLivro] = useState<Livro | null>(null);
  const [imagem, setImagem] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


  async function handleAdicionarLivro() {
    try {
      if (!livro?.titulo || !livro?.autor) {
        return Alert.alert("Atenção", "Preencha pelo menos o título e o autor.");
      }

      let livroParaEnviar = { ...livro };

      if (imagem) {
        const url = await handleUploadImagem();
        livroParaEnviar.imagemUrl = url;
        console.log("URL da imagem enviada:", url);
      }

      console.log("Livro a ser enviado:", livroParaEnviar);
      const response = await api.post("/livros", livroParaEnviar);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Livro adicionado com sucesso!");
        router.back();
      }
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível adicionar o livro.");
    }
  }

  async function abrirCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("Permissão negada", "Acesso à câmera é necessário.");
    }
  
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.5,
    });
  
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      setModalVisible(false);
    }
  }
  
  async function abrirGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
    });
  
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      setModalVisible(false);
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

    return response.data;
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

      <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.uploadText}>
          {imagem ? "Trocar Imagem" : "Selecionar Imagem"}
        </Text>
      </TouchableOpacity>

      {imagem && (
        <Image source={{ uri: imagem }} style={styles.preview} resizeMode="contain" />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAdicionarLivro}
      >
        <Text style={styles.buttonText}>Salvar Livro</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolher Imagem</Text>

            <TouchableOpacity style={styles.modalButton} onPress={abrirCamera}>
              <Text style={styles.modalButtonText}>Tirar Foto com Câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={abrirGaleria}>
              <Text style={styles.modalButtonText}>Escolher da Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },  
});