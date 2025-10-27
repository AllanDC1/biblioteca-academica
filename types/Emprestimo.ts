import { Livro } from "./Livro";

export interface Emprestimo {
  id: number;
  livro: Livro;
  dataEmprestimo: string;
  dataDevolucao: string;
  devolvido: boolean;
}