package com.biblioteca.api.repository;

import com.biblioteca.api.model.Livro;
import com.biblioteca.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.api.model.Emprestimo;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findAllByUsuarioId(Long idUsuario);
    List<Emprestimo> findAllByLivro(Livro livro);
    @Query("SELECT e FROM Emprestimo e WHERE e.devolvido = false AND e.dataDevolucao < :dataAtual")
    List<Emprestimo> findAllAtrasados(LocalDate dataAtual);
}
