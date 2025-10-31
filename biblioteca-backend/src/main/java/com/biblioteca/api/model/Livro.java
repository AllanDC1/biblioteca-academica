package com.biblioteca.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String autor;
    @Column(columnDefinition = "TEXT")
    private String descricao;
    @Builder.Default
    private boolean reservado = false;
    private String imagemUrl;
}
