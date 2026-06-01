const API = "/api/medicos";

let idEditando = null;
let idExcluindo = null;

function mostrarAlerta(msg, tipo = "sucesso") {
  const element = document.getElementById("alert-box");

  element.textContent = msg;
  element.className = tipo;
  element.style.display = "block";

  setTimeout(() => {
    element.style.display = "none";
  }, 4000);
}

function fecharModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("ativo");
  }
}

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function carregarMedicos() {
  const lista = document.getElementById("lista-medicos");

  lista.innerHTML =
    '<p style="text-align:center;font-size:13px;color:#555;padding:12px 0;">Carregando...</p>';

  try {
    const res = await fetch(API);

    if (!res.ok) throw new Error();

    const medicos = await res.json();

    renderizarLista(medicos);
  } catch {
    lista.innerHTML =
      '<p style="text-align:center;font-size:13px;color:#a94442;padding:12px 0;">Erro ao carregar médicos.</p>';
  }
}

function renderizarLista(medicos) {
  const lista = document.getElementById("lista-medicos");

  lista.innerHTML = "";

  if (!medicos.length) {
    lista.innerHTML =
      '<div class="estado-vazio">Nenhum médico cadastrado.</div>';
    return;
  }

  medicos.forEach((m) => {
    const card = document.createElement("article");

    card.className = "medico-card";

    card.innerHTML = `
      <div class="medico-info">
        <div class="medico-nome-linha">
          ${esc(m.nome)}
          ${
           m.statusEnum === "DESATIVADO"
              ? '<span class="badge-desativado">DESATIVADO</span>'
              : ""
          }
        </div>

        <div><strong>CRM:</strong> ${esc(m.crm)}</div>
        <div><strong>Especialidade:</strong> ${esc(m.especialidade)}</div>
      </div>

      <div class="medico-acoes">
        <button class="btn-alterar" onclick="abrirModalEditar(${m.id})">
          Alterar
        </button>

        <button class="btn-excluir"
          onclick="abrirConfirmar(${m.id}, '${esc(m.nome)}')">
          Excluir
        </button>
      </div>
    `;

    lista.appendChild(card);
  });
}

function abrirModalNovo() {
  idEditando = null;

  document.getElementById("modal-form-titulo").textContent =
    "Incluir médico";

  document.getElementById("inp-nome").value = "";
  document.getElementById("inp-crm").value = "";
  document.getElementById("inp-especialidade").value = "";
  document.getElementById("inp-desativado").checked = false;

  document.getElementById("modal-form").classList.add("ativo");

  document.getElementById("inp-nome").focus();
}

async function abrirModalEditar(id) {
  try {
    const res = await fetch(`${API}/${id}`);

    if (!res.ok) throw new Error();

    const m = await res.json();

    idEditando = id;

    document.getElementById("modal-form-titulo").textContent =
      "Alterar médico";

    document.getElementById("inp-nome").value = m.nome ?? "";
    document.getElementById("inp-crm").value = m.crm ?? "";
    document.getElementById("inp-especialidade").value =
      m.especialidade ?? "";

    document.getElementById("inp-desativado").checked =
      !!m.desativado;

    document.getElementById("modal-form").classList.add("ativo");

    document.getElementById("inp-nome").focus();
  } catch {
    mostrarAlerta("Erro ao carregar dados do médico.", "erro");
  }
}

async function salvarMedico() {
 const medico = {
   nome: document.getElementById("inp-nome").value.trim(),
   crm: document.getElementById("inp-crm").value.trim(),
   especialidade: document.getElementById("inp-especialidade").value.trim(),
   statusEnum: document.getElementById("inp-desativado").checked
     ? "DESATIVADO"
     : "ATIVADO"
 };

  if (!medico.nome || !medico.crm || !medico.especialidade) {
    mostrarAlerta("Preencha todos os campos.", "erro");
    return;
  }

  const btn = document.getElementById("btn-salvar");

  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    const url = idEditando
      ? `${API}/${idEditando}`
      : `${API}/cadastrar`;

    const method = idEditando
      ? "PUT"
      : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medico),
    });

    if (!res.ok) throw new Error();

    fecharModal("modal-form");

    mostrarAlerta(
      idEditando
        ? "Médico atualizado com sucesso!"
        : "Médico cadastrado com sucesso!",
      "sucesso"
    );

    carregarMedicos();
  } catch {
    mostrarAlerta("Erro ao salvar médico.", "erro");
  } finally {
    btn.disabled = false;
    btn.textContent = "Salvar";
  }
}

function abrirConfirmar(id, nome) {
  idExcluindo = id;

  document.getElementById("confirmar-nome").textContent = nome;

  document
    .getElementById("modal-confirmar")
    .classList.add("ativo");
}

async function confirmarExcluir() {
  const btn = document.getElementById("btn-confirmar-del");

  btn.disabled = true;
  btn.textContent = "Excluindo...";

  try {
    const res = await fetch(`${API}/${idExcluindo}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error();

    fecharModal("modal-confirmar");

    mostrarAlerta(
      "Médico excluído com sucesso!",
      "sucesso"
    );

    carregarMedicos();
  } catch {
    mostrarAlerta(
      "Erro ao excluir médico.",
      "erro"
    );
  } finally {
    btn.disabled = false;
    btn.textContent = "Excluir";
    idExcluindo = null;
  }
}

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("ativo");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal-overlay")
      .forEach((modal) => modal.classList.remove("ativo"));
  }
});

carregarMedicos();
