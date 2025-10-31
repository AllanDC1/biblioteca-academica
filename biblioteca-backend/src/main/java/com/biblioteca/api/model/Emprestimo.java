package com.biblioteca.api.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne(cascade = CascadeType.MERGE)
    private Livro livro;

    @Builder.Default
    private LocalDate dataEmprestimo = LocalDate.now();
    @Builder.Default
    private LocalDate dataDevolucao = LocalDate.now().plusWeeks(2);
    @Builder.Default
    private boolean devolvido = false;
}
