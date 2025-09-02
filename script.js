const albuns = [];

function criarCardAlbum(album, index) {
  const card = document.createElement("div");
  card.classList.add("album-card");
  card.innerHTML = `
    <h3>${album.nome}</h3>
    <p><b>Gmail:</b> ${album.gmail}</p>
    <p><b>Número:</b> ${album.numero}</p>
    <p><b>Diagramador:</b> ${album.diagramador}</p>
    <p><b>Turma:</b> ${album.turma}</p>
    <p><b>Pacote:</b> ${album.pacote}</p>
    <p><b>Status:</b> ${album.status}</p>
    <p><b>Data Drive:</b> ${album.dataDrive}</p>
    <p><b>Obs Otoniel:</b> ${album.obsOtoniel}</p>
    <p><b>Obs Emanuel:</b> ${album.obsEmanuel}</p>
    <p><b>Data envio para diagramador:</b> ${album.dataEnvioDiagramador}</p>
    <p><b>Data enviado para gráfica:</b> ${album.dataEnviadoGrafica}</p>
    <p><b>Financeiro:</b> ${album.financeiro ? "Pago" : "Pendente"}</p>
    <button onclick="excluirAlbum(${index})">Excluir</button>
  `;
  return card;
}

function atualizarLista() {
  const container = document.getElementById("lista-albuns");
  container.innerHTML = "";
  albuns.forEach((album, index) => {
    const card = criarCardAlbum(album, index);
    container.appendChild(card);
  });
}

function excluirAlbum(index) {
  albuns.splice(index, 1);
  atualizarLista();
}

document.getElementById("btnAdicionar").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const gmail = document.getElementById("gmail").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const diagramador = document.getElementById("diagramador").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const pacote = document.getElementById("pacote").value;
  const status = document.getElementById("status").value;
  const dataDrive = document.getElementById("dataDrive").value;
  const obsOtoniel = document.getElementById("obsOtoniel").value.trim();
  const obsEmanuel = document.getElementById("obsEmanuel").value.trim();
  const dataEnvioDiagramador = document.getElementById(
    "dataEnvioDiagramador"
  ).value;
  const dataEnviadoGrafica =
    document.getElementById("dataEnviadoGrafica").value;
  const financeiro = document.getElementById("financeiro").checked;

  if (!nome || !gmail) {
    alert("Por favor, preencha pelo menos Nome e Gmail.");
    return;
  }

  albuns.push({
    nome,
    gmail,
    numero,
    diagramador,
    turma,
    pacote,
    status,
    dataDrive,
    obsOtoniel,
    obsEmanuel,
    dataEnvioDiagramador,
    dataEnviadoGrafica,
    financeiro,
  });

  atualizarLista();

  // Limpar campos
  document.querySelectorAll("input, select, textarea").forEach((el) => {
    if (el.type === "checkbox") {
      el.checked = false;
    } else {
      el.value = "";
    }
  });
});

document
  .getElementById("inputCsv")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const csvText = e.target.result;
      importarCSV(csvText);
    };
    reader.readAsText(file);
  });

function importarCSV(csvText) {
  const linhas = csvText.trim().split("\n");
  if (linhas.length < 2) {
    alert("CSV vazio ou sem dados.");
    return;
  }

  const cabecalho = linhas[0].split(",").map((h) => h.trim().toLowerCase());
  const esperado = [
    "nome",
    "gmail",
    "número",
    "diagramador",
    "turma",
    "pacote",
    "status",
    "datadrive",
    "obs otoniel",
    "obs emanuel",
    "data envio para o diagramador",
    "data enviado para a gráfica",
    "financeiro",
  ];

  for (const col of esperado) {
    if (!cabecalho.includes(col)) {
      alert(`Coluna "${col}" não encontrada no CSV.`);
      return;
    }
  }

  let importados = 0;
  for (let i = 1; i < linhas.length; i++) {
    const linha = linhas[i].split(",");
    if (linha.length < cabecalho.length) continue;

    const dados = {};
    cabecalho.forEach((col, idx) => {
      dados[col] = linha[idx] ? linha[idx].trim() : "";
    });

    albuns.push({
      nome: dados["nome"] || "",
      gmail: dados["gmail"] || "",
      numero: dados["número"] || "",
      diagramador: dados["diagramador"] || "",
      turma: dados["turma"] || "",
      pacote: dados["pacote"] || "",
      status: dados["status"] || "",
      dataDrive: dados["datadrive"] || "",
      obsOtoniel: dados["obs otoniel"] || "",
      obsEmanuel: dados["obs emanuel"] || "",
      dataEnvioDiagramador: dados["data envio para o diagramador"] || "",
      dataEnviadoGrafica: dados["data enviado para a gráfica"] || "",
      financeiro: ["true", "1", "sim", "paid"].includes(
        dados["financeiro"].toLowerCase()
      ),
    });
    importados++;
  }

  atualizarLista();
  alert(`${importados} álbuns importados com sucesso!`);
}
