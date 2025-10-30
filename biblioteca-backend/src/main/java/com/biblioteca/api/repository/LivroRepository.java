package com.biblioteca.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.biblioteca.api.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {}