package com.biblioteca.api.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import com.biblioteca.api.service.EmprestimoService;
import com.biblioteca.api.service.LivroService;
import com.biblioteca.api.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.biblioteca.api.model.Emprestimo;
import com.biblioteca.api.model.Livro;
import com.biblioteca.api.model.Usuario;
import com.biblioteca.api.repository.EmprestimoRepository;
import com.biblioteca.api.repository.LivroRepository;
import com.biblioteca.api.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/livros")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LivroController {

    private final LivroService livroService;
    private final EmprestimoService emprestimoService;
    private final UsuarioService usuarioService;

    @GetMapping
    public List<Livro> listar() {
        return livroService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        return livroService.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Livro> criar(@RequestBody Livro livro) {
        return livroService.salvar(livro);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        livroService.deletar(id);
    }

    @PatchMapping
    public ResponseEntity<Livro> editar(@RequestBody Livro livro) {
        return livroService.salvar(livro);
    }

    @PostMapping("/reservar/{id}")
    public ResponseEntity<Emprestimo> reservar(@PathVariable Long id, @RequestBody Long idUsuario) {
        Usuario temp = usuarioService.buscarPorId(idUsuario);
        return emprestimoService.gerar(temp, id);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") MultipartFile file) {
        return livroService.uploadImagem(file);
    }
}
