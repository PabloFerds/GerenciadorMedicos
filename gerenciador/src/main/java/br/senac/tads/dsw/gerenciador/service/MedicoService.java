package br.senac.tads.dsw.gerenciador.service;

import br.senac.tads.dsw.gerenciador.exceptions.CrmExistsException;
import br.senac.tads.dsw.gerenciador.exceptions.MedicoNotFoundException;
import br.senac.tads.dsw.gerenciador.model.Medico;
import br.senac.tads.dsw.gerenciador.repository.MedicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

//REGRA DE NÉGOCIO
@Service
public class MedicoService {

	private final MedicoRepository repository;

	public MedicoService(MedicoRepository repository) {
		this.repository = repository;
	}

	public Medico findById(long id) {
		return repository.findById(id).orElseThrow(() -> new MedicoNotFoundException(id));
	}

	public List<Medico> findAll() {
		return repository.findAll();
	}

	public Medico cadastrar(Medico novoMedico) {
		if (repository.existsByCrm(novoMedico.getCrm())) {
			throw new CrmExistsException("CRM já cadastrado. Erro!");
		}

		var medico = new Medico(
			novoMedico.getNome(),
			novoMedico.getCrm(),
			novoMedico.getEspecialidade(),
			novoMedico.getStatusEnum()
		);
		return repository.save(medico);
	}

	public Medico alterar(long id, Medico medico) {
		var novoMedico = findById(id);
		novoMedico.setNome(medico.getNome());
		novoMedico.setCrm(medico.getCrm());
		novoMedico.setEspecialidade(medico.getEspecialidade());
		novoMedico.setStatusEnum(medico.getStatusEnum());
		return repository.save(novoMedico);
	}

	public void delete(long id) {
		findById(id);
		repository.deleteById(id);
	}

	public List<Medico> filtrar(String especialidade) {
		return repository.findByEspecialidadeContainingIgnoreCase(especialidade);
	}
}
