const API = "/api/medicos";

function mostrarAlerta(msg, tipo = "sucesso") {
  const el = document.getElementById("alert-box");
  el.textContent = msg;
  el.className = tipo;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 4000);
}

async function cadastrarMedico() {
  const medico = {
    nome: document.getElementById("inp-nome").value.trim(),
    crm: document.getElementById("inp-crm").value.trim(),
    especialidade: document.getElementById("inp-especialidade").value.trim(),
    statusEnum: document.getElementById("inp-desativado").checked ? "DESATIVADO" : "ATIVADO",
  };

  if (!medico.nome || !medico.crm || !medico.especialidade) {
    mostrarAlerta("Preencha todos os campos.", "erro");
    return;
  }

  const btn = document.getElementById("btn-salvar");
  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    const res = await fetch(`${API}/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medico),
    });

    if (!res.ok) {
      const msg = await res.text();
      mostrarAlerta(msg || "Erro ao cadastrar médico.", "erro");
      btn.disabled = false;
      btn.textContent = "Salvar";
      return;
    }

    mostrarAlerta("Médico cadastrado com sucesso!", "sucesso");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } catch {
    mostrarAlerta("Erro ao cadastrar médico. Tente novamente.", "erro");
    btn.disabled = false;
    btn.textContent = "Salvar";
  }
}
