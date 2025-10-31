package com.biblioteca.api.service;

import org.springframework.stereotype.Service;
import com.biblioteca.api.model.Usuario;
import com.biblioteca.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario autenticar(Usuario usuario) {
        Usuario temp = usuarioRepository.findByEmail(usuario.getEmail()).orElse(null);

        if (temp != null && temp.getSenha().equals(usuario.getSenha())) return temp;

        return null;
    }
}