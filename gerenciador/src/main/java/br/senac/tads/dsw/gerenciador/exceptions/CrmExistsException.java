package br.senac.tads.dsw.gerenciador.exceptions;

public class CrmExistsException extends RuntimeException {
	public CrmExistsException(String message) {
		super("CRM já cadastrado. Erro!");
	}
}
