import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
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
      <Text style={styles.textTitle}>
        Bem-vindo{usuario ? `, ${usuario.nome}` : ""}!
      </Text>
      <Image source={require("../assets/images/home-logo.png")} style={{ width: 250, height: 250, marginBottom: 20}} />
      <TouchableOpacity style={styles.buttonNavigate} onPress={() => router.push("/livros")}>
        <Text style={styles.buttonText}>Consultar Livros</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNavigate} onPress={() => router.push("./emprestimos")}>
        <Text style={styles.buttonText}>Histórico de Empréstimos</Text>
      </TouchableOpacity>

      {usuario?.admin && (
        <TouchableOpacity style={styles.buttonNavigate} onPress={() => router.push("./atrasados")}>
          <Text style={styles.buttonText}>Empréstimos Atrasados</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1b122a"},
  textTitle: { fontSize: 32, marginBottom: 20, fontWeight: "bold", color: "#fff" },
  buttonLogout: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 8, width: 80, alignItems: "center", marginTop: 30 },
  buttonNavigate: { backgroundColor: "#007AFF", padding: 10, borderRadius: 8, marginBottom: 10, width: 250, height: 55, alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
