package com.biblioteca.api.controller;

import com.biblioteca.api.model.Emprestimo;
import com.biblioteca.api.model.Livro;
import com.biblioteca.api.model.Usuario;
import com.biblioteca.api.service.EmprestimoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emprestimos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmprestimoController {

    private final EmprestimoService emprestimoService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Emprestimo>> listarEmprestimosDoUsuario(@PathVariable Long id) {
        List<Emprestimo> emprestimos = emprestimoService.listarDoUsuario(id);
        if (emprestimos == null) return ResponseEntity.ok(null);
        return ResponseEntity.ok(emprestimos);
    }

    @GetMapping("/atrasados")
    public ResponseEntity<List<Emprestimo>> listarAtrasados() {
        List<Emprestimo> emprestimos = emprestimoService.buscarAtrasados();
        return ResponseEntity.ok(emprestimos);
    }

    @PatchMapping("/devolver/{id}")
    public ResponseEntity<Emprestimo> devolverLivro(@PathVariable Long id) {
        Emprestimo temp = emprestimoService.finalizarEmprestimo(id);
        return ResponseEntity.ok(temp);
    }
}
