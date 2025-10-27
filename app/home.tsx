import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Usuario } from "@/types/Usuario";

export default function HomeScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {    
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuario");
      if (dados) setUsuario(JSON.parse(dados));
    };
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuario");
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bem-vindo{usuario ? `, ${usuario.nome}` : ""} à Biblioteca!
      </Text>
      <TouchableOpacity style={styles.buttonNavigate} onPress={() => router.push("/livros")}>
        <Text style={styles.buttonText}>Consultar Livros</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNavigate} onPress={() => router.push("./emprestimos")}>
        <Text style={styles.buttonText}>Histórico de Empréstimos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, marginBottom: 20 },
  buttonLogout: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 8 },
  buttonNavigate: { backgroundColor: "#007AFF", padding: 10, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
