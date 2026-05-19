package br.senac.tads.dsw.gerenciador.controller;


import br.senac.tads.dsw.gerenciador.model.Medico;
import br.senac.tads.dsw.gerenciador.service.MedicoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

	private final MedicoService service;

	public MedicoController(MedicoService service) {
		this.service = service;
	}

	@GetMapping()
	public ResponseEntity<List<Medico>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Medico> findById(@PathVariable long id){
		return  ResponseEntity.ok(service.findById(id));

	}

	@PostMapping("/cadastrar")
	public ResponseEntity<Medico> cadastrar(@RequestBody @Valid Medico medico) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(medico));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Medico> alterar(@PathVariable long id, @RequestBody @Valid Medico medico) {
		return ResponseEntity.ok(service.alterar(id, medico));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}




}
