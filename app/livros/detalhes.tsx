import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, Modal, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Livro } from "@/types/Livro";
import { Usuario } from "@/types/Usuario";

export default function DetalhesLivro() {
  const { id } = useLocalSearchParams();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [livroEditado, setLivroEditado] = useState<Livro | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get(`/livros/${id}`).then((res) => setLivro(res.data));
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuario");
      if (dados) setUsuario(JSON.parse(dados));
    };
    carregarUsuario();
  }, [id]);  

  async function handleReservar() {
    try {
      const usuario = await AsyncStorage.getItem("usuario");
      if (!usuario) {
        Alert.alert("Erro", "Usuário não encontrado");
        return;
      }
      if (livro?.reservado) {
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

  async function handleDeletar() {
    try {
      await api.delete(`/livros/${id}`);
      Alert.alert("Sucesso", "Livro excluído com sucesso!");      
      router.back();
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível excluir o livro.");
    }
  }

  async function handleSalvarEdicao() {
    try {
      const response = await api.patch("/livros", livroEditado);
      if (response.status === 200) {
        Alert.alert("Sucesso", "Livro atualizado com sucesso!");
        setModalVisible(false);
        router.back();
    }
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível editar o livro.");
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

      {usuario?.admin && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => {
              setLivroEditado(livro);
              setModalVisible(true);
            }
          }>
            <Text style={styles.buttonText}>Editar Livro</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={handleDeletar}>
            <Text style={styles.buttonText}>Excluir Livro</Text>
          </TouchableOpacity>
        </>
        )
      }

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Livro</Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={livroEditado?.titulo}
              onChangeText={(texto) => setLivroEditado({ ...livroEditado!, titulo: texto })}
            />

            <TextInput
              style={styles.input}
              placeholder="Autor"
              value={livroEditado?.autor}
              onChangeText={(texto) => setLivroEditado({ ...livroEditado!, autor: texto })}
            />

            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Descrição"
              multiline
              value={livroEditado?.descricao}
              onChangeText={(texto) => setLivroEditado({ ...livroEditado!, descricao: texto })}
            />

            <View style={styles.modalButtons}>
              <Button title="Salvar" onPress={handleSalvarEdicao} />
              <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
