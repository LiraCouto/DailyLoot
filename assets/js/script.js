const allowedUsers = [
  "Mateus Lira",
  "Lira",
  "Teteh",
  "Gui",
  "Duda",
  "Isa",
  "Thai",
];

const ADMIN_NAME = "Mateus Lira";
let userData = null;

// ================= ENTER LOGIN =================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleLogin();
    });
  }
});

// ================= LISTAS =================

const physicalBaseExercises = [
  "Flexões",
  "Agachamentos",
  "Abdominais",
  "Burpees",
  "Prancha",
  "Afundos",
  "Elevação de pernas",
  "Polichinelos",
  "Flexão diamante",
  "Agachamento sumô",
  "Prancha lateral",
  "Mountain climber",
  "Elevação de braço",
  "Saltos explosivos",
  "Agachamento isométrico",
  "Flexão inclinada",
  "Abdominal bicicleta",
  "Prancha com toque no ombro",
  "Agachamento unilateral",
  "Flexão explosiva",
  "Abdominal infra",
  "Prancha dinâmica",
  "Corrida estacionária",
  "Afundo lateral",
  "Flexão arqueiro",
  "Abdominal canivete",
  "Agachamento com salto",
  "Prancha Superman",
  "Burpee com salto alto",
  "Flexão fechada",
  "Abdominal oblíquo",
  "Agachamento pausado",
  "Prancha alternando braços",
  "Corrida no lugar com joelho alto",
  "Flexão lenta controlada",
  "Abdominal reverso",
  "Agachamento pulsado",
];

const spiritualExtras = [
  "Ler um trecho de Ellen G White",
  "Estudar Daniel 2",
  "Estudar Apocalipse 14",
  "Memorizar 1 versículo",
  "Cantar um hino adventista",
  "Fazer culto familiar",
  "Ler Patriarcas e Profetas",
  "Estudar o sábado bíblico",
  "Orar por 3 pessoas",
  "Escrever um pedido de oração",
  "Assistir sermão adventista",
  "Estudar as 28 crenças",
  "Refletir sobre o juízo investigativo",
  "Ler O Grande Conflito",
  "Estudar saúde segundo Ellen White",
  "Ler um Salmo completo",
  "Estudar o Espírito de Profecia",
  "Ler Atos dos Apóstolos",
  "Estudar temperança cristã",
  "Orar 10 minutos em silêncio",
  "Escrever testemunho pessoal",
  "Revisar lição da semana",
  "Ler Caminho a Cristo",
  "Estudar Daniel 7",
  "Orar ao acordar e antes de dormir",
  "Estudar parábolas de Jesus",
  "Escrever 3 bênçãos recebidas",
  "Estudar santificação",
  "Refletir sobre fé e obras",
  "Ler Evangelismo",
  "Estudar a volta de Cristo",
  "Meditar nos 10 mandamentos",
  "Estudar profecias",
  "Revisar texto bíblico favorito",
  "Ler Conselhos sobre Saúde",
  "Orar pela igreja local",
  "Estudar o ministério de Cristo",
];

const mentalExtras = [
  "Ler 10 páginas de um livro",
  "Escrever 3 metas futuras",
  "Ficar 1h sem redes sociais",
  "Organizar sua mesa",
  "Aprender uma palavra nova",
  "Escrever diário por 5 min",
  "Elogiar alguém sinceramente",
  "Planejar semana",
  "Estudar algo novo 15min",
  "Refletir sobre erros e aprendizados",
  "Fazer lista de gratidão",
  "Respiração profunda 5min",
  "Ouvir música instrumental",
  "Alongar corpo lentamente",
  "Beber 2L de água",
  "Dormir 30min mais cedo",
  "Evitar reclamações 24h",
  "Revisar objetivos de vida",
  "Organizar arquivos digitais",
  "Fazer algo criativo",
  "Aprender versículo novo",
  "Estudar finanças 10min",
  "Conversar com alguém importante",
  "Planejar economia mensal",
  "Limpar ambiente",
  "Ler artigo educativo",
  "Treinar memória 10min",
  "Evitar açúcar hoje",
  "Assistir aula educativa",
  "Escrever carta para si mesmo",
  "Fazer pausa consciente 5min",
  "Treinar foco 15min",
  "Resolver problema pendente",
  "Desconectar 1h da internet",
  "Refletir sobre propósito",
  "Estudar liderança",
  "Praticar silêncio 10min",
];

const surpriseList = [
  "Beba um copo d'água como se fosse uma poção mágica",
  "Faça 5 polichinelos sorrindo exageradamente",
  "Envie um emoji aleatório para um amigo",
  "Diga 'Hoje eu evoluí' olhando no espelho",
  "Arrume algo pequeno ao seu redor",
  "Fique 30s em postura de herói",
];

// ================= CARDIO =================

function generateCardio(days) {
  if (days < 7) return "20 min Caminhada";
  if (days < 14) return "30 min Caminhada";
  if (days < 21) return "40 min Caminhada";
  if (days < 28) return "50 min Caminhada";
  if (days < 35) return "60 min Caminhada";

  let run = 5 + Math.floor((days - 35) / 15) * 5;
  if (run > 90) run = 90;

  if (run <= 40) return `20 min Caminhada + ${run} min Corrida`;
  return `${run} min Corrida`;
}

// ================= LOGIN =================

function handleLogin() {
  const name = document.getElementById("username").value.trim();
  if (!allowedUsers.includes(name)) return alert("Usuário não autorizado");

  userData = JSON.parse(localStorage.getItem(`loot_${name}`)) || {
    name,
    points: 0,
    level: 1,
    daysTrained: 0,
    weights: [],
    completedToday: {
      physical: false,
      spiritual: false,
      mental: false,
      date: null,
    },
  };

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app-container").style.display = "block";
  document.getElementById("display-user").innerText = `Usuário: ${name}`;

  resetDaily();
  generateAll();
  updateUI();
  renderWeightHistory();

  if (name === ADMIN_NAME) renderAdmin();
}

// ================= PESO FUNCIONANDO =================

function saveWeight() {
  const input = document.getElementById("weight-value");
  const weight = parseFloat(input.value);

  if (!weight || weight <= 0) return alert("Digite um peso válido");

  const today = new Date().toLocaleDateString();

  userData.weights.push({
    date: today,
    value: weight,
  });

  userData.points += 10;
  save();
  renderWeightHistory();
  updateUI();

  input.value = "";
  alert("✅ Peso registrado com sucesso!");
}

function renderWeightHistory() {
  const container = document.getElementById("weight-history");
  if (!container) return;

  container.innerHTML = "<h4>Histórico</h4>";

  if (!userData.weights.length) {
    container.innerHTML += "<p>Nenhum registro ainda</p>";
    return;
  }

  userData.weights
    .slice()
    .reverse()
    .forEach((w) => {
      container.innerHTML += `<p>${w.date} - ${w.value} kg</p>`;
    });
}

// ================= RESTO DO SISTEMA =================

function resetDaily() {
  const today = new Date().toDateString();
  if (userData.completedToday.date !== today) {
    userData.completedToday = {
      physical: false,
      spiritual: false,
      mental: false,
      date: today,
    };
  }
}

function generateAll() {
  generatePhysical();
  generateSpiritual();
  generateMental();
}

function generatePhysical() {
  const bonus = userData.daysTrained;
  const shuffled = [...physicalBaseExercises].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  let text = "";
  selected.forEach((ex) => {
    text += `${ex}: ${15 + bonus}\n`;
  });

  text += `Cardio: ${generateCardio(userData.daysTrained)}`;
  document.getElementById("desc-physical").innerText = text;
}

function generateSpiritual() {
  const extra = spiritualExtras[userData.level % spiritualExtras.length];
  document.getElementById("desc-spiritual").innerText =
    `Ler Lição Escola Sabatina
Ler 1 capítulo da Bíblia
${extra}`;
}

function generateMental() {
  const extra = mentalExtras[userData.level % mentalExtras.length];
  document.getElementById("desc-emotional").innerText = `Meditação 5 minutos
${extra}`;
}

function completeChallenge(type) {
  if (userData.completedToday[type]) return alert("Já concluiu hoje");

  userData.completedToday[type] = true;
  userData.points += 50;
  if (type === "physical") userData.daysTrained++;

  if (
    userData.completedToday.physical &&
    userData.completedToday.spiritual &&
    userData.completedToday.mental
  ) {
    userData.level++;
    alert("🔥 Dia completo! Você subiu de nível!");
  }

  save();
  updateUI();
  generateAll();
}

function surpriseChallenge() {
  const random = surpriseList[Math.floor(Math.random() * surpriseList.length)];
  alert("🎲 DESAFIO SURPRESA:\n\n" + random);
}

function updateUI() {
  document.getElementById("points-value").innerText = userData.points;
  document.getElementById("level-value").innerText = userData.level;
  document.getElementById("days-trained").innerText = userData.daysTrained;
  document.getElementById("main-progress").style.width =
    (userData.level % 30) * 3.3 + "%";
}

function save() {
  localStorage.setItem(`loot_${userData.name}`, JSON.stringify(userData));
}

function handleLogout() {
  location.reload();
}

function renderAdmin() {
  const panel = document.getElementById("admin-panel");
  panel.classList.add("card");
  panel.innerHTML = "<h3>Painel Administrativo</h3>";

  allowedUsers.forEach((user) => {
    const data = JSON.parse(localStorage.getItem(`loot_${user}`));
    if (!data) return;
    panel.innerHTML += `<p><strong>${user}</strong> | Nível ${data.level} | Pontos ${data.points} | Dias ${data.daysTrained}</p>`;
  });
}
