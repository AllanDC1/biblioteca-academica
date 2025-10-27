import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="livros/index" options={{ title: "Livros da Biblioteca" }} />
      <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
      <Stack.Screen name="livros/cadastro" options={{ title: "Adicionar Novo Livro" }} />
      <Stack.Screen name="home" options={{ title: "Biblioteca" }} />      
    </Stack>
  );
}