package com.biblioteca.api.service;

import com.biblioteca.api.model.Emprestimo;
import com.biblioteca.api.model.Livro;
import com.biblioteca.api.repository.EmprestimoRepository;
import com.biblioteca.api.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;
    private final EmprestimoRepository emprestimoRepository;
    private static final String UPLOAD_DIR = "/app/uploads/";

    public List<Livro> buscarTodos() {
        return livroRepository.findAll();
    }

    public ResponseEntity<Livro> salvar(Livro livro) {
        livroRepository.save(livro);
        return ResponseEntity.status(201).body(livro);
    }

    public void deletar(Long id) {
        Livro livro = livroRepository.findById(id).orElse(null);

         if (livro != null) {
             List<Emprestimo> emprestimos = emprestimoRepository.findAllByLivro(livro);
             for (Emprestimo e : emprestimos) {
                 e.setLivro(null);
             }
             emprestimoRepository.saveAll(emprestimos);
         }

        livroRepository.deleteById(id);
    }

    public ResponseEntity<Livro> buscarPorId(Long id) {
        return livroRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<String> uploadImagem(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Arquivo vazio!");
            }

            File diretorio = new File(UPLOAD_DIR);
            if (!diretorio.exists()) {
                diretorio.mkdirs();
            }

            String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path caminho = Paths.get(UPLOAD_DIR + nomeArquivo);

            Files.copy(file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

            String caminhoRelativo = "/uploads/" + nomeArquivo;
            return ResponseEntity.ok(caminhoRelativo);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao fazer upload: " + e.getMessage());
        }
    }
}
