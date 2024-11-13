let participantesExcel = []; // Variável global para armazenar os participantes carregados do Excel
let jaExecutado = false; // Controle para evitar sorteio duplicado


let testt = "hirion"
const test = document.querySelector("#teste")

test.innerHTML =`${testt}`

// Função para iniciar o sorteio
function startDraw(participants) {
  const numero = parseInt(document.getElementById("num-premios").value); // Obtém o número de prêmios
  let ganhador_primeiro_luga = document.querySelector(
    "#ganhador_primeiro_luga"
  );
  let ganhador_segundo_luga = document.querySelector("#ganhador_segundo_luga");
  let ganhador_terceiro_luga = document.querySelector(
    "#ganhador_terceiro_luga"
  );

  // Limpar resultados anteriores
  ganhador_primeiro_luga.innerHTML = "";
  ganhador_segundo_luga.innerHTML = "";
  ganhador_terceiro_luga.innerHTML = "";

  // Limpar outros ganhadores
  const outrosGanhadoresContainer = document.getElementById("outros");
  outrosGanhadoresContainer.innerHTML = ""; // Limpa a lista de outros ganhadores

  const ganhadores = [];
  const nomesSorteados = [];

  // Função para sortear um participante
  while (ganhadores.length < numero) {
    const index = Math.floor(Math.random() * participants.length);
    const nome = participants[index];
    if (!nomesSorteados.includes(nome)) {
      nomesSorteados.push(nome);
      ganhadores.push(nome);
    }
  }

  // Exibindo os resultados dos 3 primeiros lugares
  ganhador_primeiro_luga.innerHTML = ganhadores[0];
  ganhador_segundo_luga.innerHTML = ganhadores[1];
  ganhador_terceiro_luga.innerHTML = ganhadores[2];

  // Exibindo os outros ganhadores, se necessário
  if (numero > 3) {
    const listaGanhadores = document.createElement("ul"); // Criar uma lista para os ganhadores adicionais

    for (let i = 3; i < ganhadores.length; i++) {
      const item = document.createElement("li");
      item.innerHTML = `${i + 1}° Lugar: <strong>${ganhadores[i]}</strong>`;
      listaGanhadores.appendChild(item);
    }

    // Adicionar a lista de outros ganhadores ao container "outros"
    outrosGanhadoresContainer.appendChild(listaGanhadores);
  }

  jaExecutado = true; // Marca que o sorteio foi realizado
}

// Função para ler o arquivo Excel e extrair os participantes
function handleFile(event) {
  const file = event.target.files[0]; // Obtém o arquivo selecionado
  if (!file) return; // Verifica se o arquivo foi selecionado

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target.result;

    // Usando a biblioteca xlsx para ler o conteúdo do Excel
    const workbook = XLSX.read(data, { type: "binary" });

    // Pegando o nome da primeira planilha
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convertendo os dados da planilha em um formato JSON
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Extrair apenas os nomes dos participantes (assumindo que estão na primeira coluna)
    const participants = json.map((row) => row[0]).filter((name) => name); // Remove valores vazios

    // Armazenar a lista de participantes na variável global
    participantesExcel = participants;
  };
  reader.readAsBinaryString(file);
}

// Adiciona o evento para ler o arquivo Excel
document.getElementById("arquivo-excel").addEventListener("change", handleFile);

// Adiciona um evento de clique ao botão de sorteio
document.getElementById("botao-sorteio").addEventListener("click", function () {
  if (jaExecutado) {
    // Limpa a exibição dos outros ganhadores, caso o sorteio já tenha sido executado
    const elementos = document.querySelectorAll("#outros ul");
    elementos.forEach((el) => el.remove());
  }

  // Verifica se o arquivo Excel foi carregado
  const participantes =
    participantesExcel.length > 0
      ? participantesExcel
      : [
          "João",
          "Maria",
          "Pedro",
          "Ana",
          "Carlos",
          "Luana",
          "Felipe",
          "Roberta",
          "Gustavo",
          "Carla",
        ];

  startDraw(participantes); // Realiza o sorteio com a lista de participantes
});
