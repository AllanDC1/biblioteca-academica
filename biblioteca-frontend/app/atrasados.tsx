import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import api from "../services/api";
import { Emprestimo } from "@/types/Emprestimo";

export default function EmprestimosAtrasados() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

  async function carregarAtrasados() {
    try {
      const response = await api.get("/emprestimos/atrasados");
      if (response.data) setEmprestimos(response.data);
    } catch (e) {
      Alert.alert("Erro: " + e, "Não foi possível carregar os empréstimos atrasados.");
    }
  }

  useEffect(() => {
    carregarAtrasados();
  }, []);

  const renderItem = ({ item }: { item: Emprestimo }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.livro ? item.livro.titulo : "Livro Excluído da Biblioteca"}</Text>
      <Text style={styles.text}>Autor: {item.livro ? item.livro.autor : "-"}</Text>
      <Text style={styles.text}>Usuário: {item.usuario ? item.usuario.nome : "-"}</Text>
      <Text style={styles.text}>Data do Empréstimo: {formatarData(item.dataEmprestimo)}</Text>
      <Text style={styles.text}>Suposta Data de Devolução: {formatarData(item.dataDevolucao)}</Text>
      <Text style={[styles.text, { color: "red", fontWeight: "bold" }]}>Atrasado</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {emprestimos.length === 0 ? (
        <Text style={styles.empty}>Nenhum empréstimo atrasado encontrado.</Text>
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

const formatarData = (data: string) => {
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 20 },
  card: { backgroundColor: "white", borderRadius: 8, padding: 15, marginBottom: 15 },
  title: { fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 15, marginTop: 5 },
  list: { paddingBottom: 20 },
  empty: { textAlign: "center", marginTop: 40, fontSize: 16 },
});
