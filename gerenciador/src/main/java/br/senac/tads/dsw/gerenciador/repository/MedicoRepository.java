package br.senac.tads.dsw.gerenciador.repository;

import br.senac.tads.dsw.gerenciador.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

	List<Medico> findByEspecialidadeContainingIgnoreCase(String especialidade);

	boolean existsByCrm(String crm);
}
