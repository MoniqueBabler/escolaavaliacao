const API = "http://localhost:3000";

let professorId = null;
let turmaSelecionada = null;


async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(`${API}/professores/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  if (!res.ok) {
    alert("Login inválido");
    return;
  }

  const data = await res.json();
  professorId = data.id;

  document.getElementById("login").style.display = "none";
  mudar("turmas");
}

function mudar(secao) {
  document.getElementById("turmas").style.display = "none";
  document.getElementById("atividades").style.display = "none";

  document.querySelectorAll(".aba").forEach(btn => {
    btn.classList.remove("ativo");
  });

  if (secao === "turmas") {
    document.getElementById("turmas").style.display = "block";
    document.getElementById("aba-turmas").classList.add("ativo");
    carregarTurmas();
  }

  if (secao === "atividades") {
    document.getElementById("atividades").style.display = "block";
    document.getElementById("aba-atividades").classList.add("ativo");
    carregarAtividades();
  }
}

async function carregarTurmas() {
  const res = await fetch(`${API}/turmas/listar/${professorId}`);
  const dados = await res.json();

  const tabela = document.getElementById("listaTurmas");
  tabela.innerHTML = "";

  dados.forEach(t => {
    tabela.innerHTML += `
      <tr>
        <td>${t.id}</td>
        <td>${t.nome}</td>
        <td>
          <button onclick="selecionarTurma(${t.id})">Ver</button>
          <button onclick="excluirTurma(${t.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

async function cadastrarTurma() {
  const nome = document.getElementById("nomeTurma").value;

  await fetch(`${API}/turmas/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, professorId })
  });

  carregarTurmas();
}

async function excluirTurma(id) {
  const res = await fetch(`${API}/turmas/excluir/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  carregarTurmas();
}


function selecionarTurma(id) {
  turmaSelecionada = id;
  mudar("atividades");
}

async function carregarAtividades() {
  const res = await fetch(`${API}/atividades/listar/${turmaSelecionada}`);
  const dados = await res.json();

  const tabela = document.getElementById("listaAtividades");
  tabela.innerHTML = "";

  dados.forEach(a => {
    tabela.innerHTML += `
      <tr>
        <td>${a.id}</td>
        <td>${a.descricao}</td>
        <td>${a.fim ? new Date(a.fim).toLocaleDateString() : '-'}</td>
        <td>
          <button onclick="excluirAtividade(${a.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

async function cadastrarAtividade() {
  const descricaoEl = document.getElementById("descAtividade");
  const fimEl = document.getElementById("fimAtividade");

  const descricao = descricaoEl.value;
  const fim = fimEl.value;

  if (!descricao) {
    alert("Digite a descrição!");
    return;
  }

  if (!turmaSelecionada) {
    alert("Selecione uma turma!");
    return;
  }

  const res = await fetch(`${API}/atividades/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      descricao,
      turmaId: Number(turmaSelecionada),
      fim: fim ? new Date(fim) : null
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  document.getElementById("descAtividade").value = "";
  document.getElementById("fimAtividade").value = "";

  carregarAtividades();
}

async function excluirAtividade(id) {
  if (!confirm("Deseja excluir esta atividade?")) return;

  const res = await fetch(`${API}/atividades/excluir/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  carregarAtividades();
}

async function cadastrarProfessor() {
  const nome = document.getElementById("nomeProfessor").value;
  const email = document.getElementById("emailProfessor").value;
  const senha = document.getElementById("senhaProfessor").value;

  const res = await fetch(`${API}/professores/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  alert("Professor cadastrado!");

  voltarLogin();
}

function mostrarCadastro() {
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastroProfessor").style.display = "block";
}

function voltarLogin() {
  document.getElementById("cadastroProfessor").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function logout() {
  location.reload();
}