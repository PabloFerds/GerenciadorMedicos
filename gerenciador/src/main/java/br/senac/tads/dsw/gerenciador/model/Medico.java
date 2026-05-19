package br.senac.tads.dsw.gerenciador.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "medicos")
public class Medico {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@NotBlank
	@Column(name = "nome")
	private String nome;

	@NotBlank
	@Column(name = "crm")
	private String crm;

	@NotBlank
	@Column(name = "especialidade")
	private String especialidade;


	public Medico() {
	}

	public Medico(String nome, String crm, String especialidade) {
		this.nome = nome;
		this.crm = crm;
		this.especialidade = especialidade;
	}

	public long getId() {
		return id;
	}

	public @NotBlank String getNome() {
		return nome;
	}

	public void setNome(@NotBlank String nome) {
		this.nome = nome;
	}

	public @NotBlank String getCrm() {
		return crm;
	}

	public void setCrm(@NotBlank String crm) {
		this.crm = crm;
	}

	public @NotBlank String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(@NotBlank String especialidade) {
		this.especialidade = especialidade;
	}
}
