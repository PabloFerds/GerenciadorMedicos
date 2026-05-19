package br.senac.tads.dsw.gerenciador.exceptions;

public class MedicoNotFoundException extends RuntimeException {
	public MedicoNotFoundException(String message) {
		super("Médico não encontrado");
	}
	public MedicoNotFoundException(long message) {
		super("Médico não encontrado");
	}


}
