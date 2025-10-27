import { Emprestimo } from "@/types/Emprestimo";
import { Usuario } from "@/types/Usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../services/api";

export default function EmprestimosScreen() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const carregarEmprestimos = async (idUsuario : number) => {
    try {        
      const response = await api.get(`/emprestimos/${idUsuario}`);
      if (response.data) setEmprestimos(response.data);
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível carregar os empréstimos.");
    }
  };
  
  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuario");
      if (dados) {
        const usuarioLogado = JSON.parse(dados);
        setUsuario(usuarioLogado);
        await carregarEmprestimos(usuarioLogado.id);
      }
    };
    carregarUsuario();
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      if (usuario?.id) carregarEmprestimos(usuario.id);
    }, [usuario?.id])
  );

  async function handleDevolver(id: number) {
    try {
      const response = await api.patch(`/emprestimos/devolver/${id}`);
      if (response.status === 200) {
        Alert.alert("Sucesso", "Livro devolvido com sucesso!");        
      }
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível devolver o livro.");
    }
  }

  if (!emprestimos) return <Text>Carregando...</Text>;

  const renderItem = ({ item }: { item: Emprestimo }) => {

    const hoje = new Date();
    const dataDevolucao = new Date(item.dataDevolucao);

    let status = "";
    let corStatus = "";

    if (item.devolvido) {
      status = "Devolvido";
      corStatus = "green";
    } else if (dataDevolucao && dataDevolucao < hoje) {
      status = "Atrasado";
      corStatus = "red";
    } else {
      status = "Em aberto";
      corStatus = "orange";
    }

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.livro ? item.livro.titulo : "Livro Excluído da Biblioteca"}</Text>
        <Text style={styles.text}>Autor: {item.livro ? item.livro.autor : "-"}</Text>
        <Text style={styles.text}>Data do Empréstimo: {formatarData(item.dataEmprestimo)}</Text>
        <Text style={styles.text}>Data Máxima de Devolução: {formatarData(item.dataDevolucao)}</Text>
        <Text style={[styles.text, { color: corStatus }]}>{status}</Text>

        {item.livro && !item.devolvido && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDevolver(item.id)}
          >
            <Text style={styles.buttonText}>Devolver Livro</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {emprestimos.length === 0 ? (
        <Text style={styles.empty}>Nenhum empréstimo encontrado.</Text>
      ) : (
        <FlatList
          data={emprestimos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

function formatarData(data: string) {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
});
