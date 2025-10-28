import { Livro } from "./Livro";
import { Usuario } from "./Usuario";

export interface Emprestimo {
  id: number;
  livro: Livro;
  usuario: Usuario;
  dataEmprestimo: string;
  dataDevolucao: string;
  devolvido: boolean;
}