package com.biblioteca.api.service;

import com.biblioteca.api.model.Emprestimo;
import com.biblioteca.api.model.Livro;
import com.biblioteca.api.model.Usuario;
import com.biblioteca.api.repository.EmprestimoRepository;
import com.biblioteca.api.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmprestimoService {

    private EmprestimoRepository emprestimoRepository;
    private LivroRepository livroRepository;

    @Autowired
    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    public ResponseEntity<Emprestimo> gerar(Usuario usuario, Long id) {
        Livro tempLivro = livroRepository.findById(id).orElse(null);
        if (tempLivro == null) return ResponseEntity.notFound().build();
        tempLivro.setReservado(true);
        Emprestimo emprestimo = emprestimoRepository.save(Emprestimo.builder().usuario(usuario).livro(tempLivro).build());
        return ResponseEntity.ok(emprestimo);
    }

    public List<Emprestimo> listarDoUsuario(Long idUsuario) {
        return emprestimoRepository.findAllByUsuarioId(idUsuario);
    }

    public Emprestimo buscarPorId(Long idEmprestimo) {
        return emprestimoRepository.findById(idEmprestimo).orElse(null);
    }

    public Emprestimo finalizarEmprestimo(Long idEmprestimo) {
        Emprestimo temp = this.buscarPorId(idEmprestimo);
        temp.setDevolvido(true);
        Livro tempLivro = temp.getLivro();
        tempLivro.setReservado(false);

        return emprestimoRepository.save(temp);
    }

    public List<Emprestimo> buscarAtrasados() {
        return emprestimoRepository.findAllAtrasados(LocalDate.now());
    }
}
