package com.biblioteca.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.biblioteca.api.model.Usuario;
import com.biblioteca.api.service.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
        Usuario salvo = usuarioService.salvar(usuario);
        return ResponseEntity.status(201).body(salvo);
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
        Usuario auth = usuarioService.autenticar(usuario);
        if (auth != null) return ResponseEntity.status(201).body(auth);
        return ResponseEntity.status(401).body(null);
    }
}