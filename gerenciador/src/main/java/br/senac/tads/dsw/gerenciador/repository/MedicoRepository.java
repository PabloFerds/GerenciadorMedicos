package br.senac.tads.dsw.gerenciador.repository;

import br.senac.tads.dsw.gerenciador.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository <Medico, Long> {

}
