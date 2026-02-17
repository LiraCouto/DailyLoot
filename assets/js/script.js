const allowedUsers = [
  "Mateus Lira",
  "Lira",
  "Teteh",
  "Gui",
  "Duda",
  "Isa",
  "Thai",
  "Gueth",
];
const ADMIN_NAME = "Mateus Lira";
let userData = null;

const exercisesData = {
  bracos: [
    "Tríceps no Banco (Cadeira)",
    "Flexão Diamante",
    "Flexão Fechada",
    "Mergulho no Sofá",
    "Caminhada de Urso",
    "Flexão de Tríceps Solo",
    "Prancha sobe e desce",
    "Rosca Isométrica com Toalha",
    "Extensão de tríceps na parede",
    "Flexão Arqueiro (adaptada)",
    "Soco no ar (shadow boxing)",
    "Prancha toque no ombro",
    "Tríceps testa no chão",
    "Flexão Pike (foco ombro)",
    "Apoio de mãos isométrico",
  ],
  peito: [
    "Flexão de Braços Padrão",
    "Flexão Inclinada (mãos no sofá)",
    "Flexão Declinada (pés no sofá)",
    "Flexão com Pausa embaixo",
    "Flexão Aberta",
    "Flexão Explosiva",
    "Flexão com toque no peito",
    "Flexão em T",
    "Flexão com braços alternados",
    "Flexão com joelhos (foco volume)",
    "Flexão Spiderman",
    "Aperto de palmas isométrico",
    "Flexão deslizando",
    "Flexão negativa (descida lenta)",
    "Flexão militar",
  ],
  costas: [
    "Superman (extensão lombar)",
    "Puxada com Toalha no chão",
    "Remada invertida embaixo da mesa",
    "Ponte dorsal (Glute bridge)",
    "Anjo na neve invertido (chão)",
    "Elevação em Y no chão",
    "Elevação em W no chão",
    "Natação no chão",
    "Prancha invertida",
    "Puxada com toalha na porta",
    "Crucifixo inverso sem peso",
    "Remada unilateral com galão",
    "Hiperextensão braços abertos",
    "Postura do Gato-Vaca (mobilidade)",
    "Sustentação isométrica costas",
  ],
  abdomen: [
    "Abdominal Crunch",
    "Prancha Abdominal",
    "Abdominal Bicicleta",
    "Elevação de Pernas",
    "Escalador (Mountain Climber)",
    "Abdominal Tesoura",
    "Prancha Lateral (D/E)",
    "Abdominal Canivete",
    "Toque no calcanhar",
    "Abdominal Infra",
    "Prancha com rotação",
    "V-Sit Isométrico",
    "Abdominal Remador",
    "Prancha comando",
    "Abdominal Oblíquo",
  ],
  pernas: [
    "Agachamento Livre",
    "Afundo (Lunge)",
    "Agachamento Sumô",
    "Elevação Pélvica",
    "Agachamento Isométrico na parede",
    "Panturrilha no degrau",
    "Agachamento com Salto",
    "Afundo Lateral",
    "Subida no degrau/cadeira",
    "Agachamento Búlgaro",
    "Ponte unilateral",
    "Chute traseiro (mãos e joelhos)",
    "Caminhada lateral agachado",
    "Agachamento com pulso",
    "Salto em distância parado",
  ],
};

const spiritualExtras = [
  "Ler um capítulo do livro Patriarcas e Profetas",
  "Estudar um capítulo de Daniel e mandar o resumo no grupo do PG",
  "Estudar um capítulo de Apocalipse e mandar o resumo no grupo do PG",
  "Memorizar 1 versículo novo",
  "Cantar um hino adventista",
  "Cantar uma música cristã que você gosta",
  "Fazer culto familiar",
  "Orar por 3 pessoas específicas",
  "Ler um Salmo completo e mandar o resumo no grupo do PG ",
  "Estudar uma das 28 Crenças",
  "Escrever 3 agradecimentos a Deus",
  "Ouvir um sermão curto",
  "Refletir sobre o Sábado",
  "Refletir sobre como Deus é bom",
  "Ler um capítulo de Proverbios e mandar o resumo no grupo do PG",
  "Fazer uma oração de joelhos pedindo pelo Espírito Santo",
];

const mentalExtras = [
  "Ler 10 páginas de um livro",
  "2h total sem redes sociais",
  "Organizar sua mesa/quarto",
  "Escrever 3 metas para amanhã",
  "Beber 2L de água hoje",
  "Planejar o orçamento da semana",
  "Fazer 5 min de respiração profunda",
  "Aprender 3 palavras novas e usar durante o dia",
  "Elogiar alguém sinceramente",
  "Resolver um problema pendente",
  "Ouvir um podcast educativo",
  "Fazer um desenho ou escrita livre",
  "Praticar o silêncio (10 min)",
  "Evitar telas 30 min antes de dormir",
  "Revisar seus sonhos de vida",
];

const surpriseList = [
  "Beba 1 copo de água agora",
  "Faça 15 polichinelos",
  "Faça 15 burpees ",
  "Postura de herói por 30s",
  "Organize 1 gaveta agora",
  "Mande uma mensagem de incentivo para um amigo",
  "Lave o rosto com água gelada",
  "Faça 1 min de prancha agora",
  "5 minutos de alongamento",
  "Sorria para o espelho por 15s",
  "Arrume sua cama",
  "Feche os olhos e respire fundo 10 vezes",
  "Faça 5 burpees",
  "Deixe o celular em outro cômodo por 30 min",
  "Anote uma ideia criativa",
  "Diga uma afirmação positiva em voz alta",
];

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
    dailyContent: { physical: "", spiritual: "", mental: "" },
  };

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app-container").style.display = "block";
  document.getElementById("display-user").innerText = `Usuário: ${name}`;

  resetDaily();
  updateUI();
  renderWeightHistory();
  if (name === ADMIN_NAME) renderAdmin();
}

function resetDaily() {
  const today = new Date().toDateString();
  if (
    userData.completedToday.date !== today ||
    !userData.dailyContent.physical
  ) {
    userData.completedToday = {
      physical: false,
      spiritual: false,
      mental: false,
      date: today,
    };
    generateDailyContent();
  } else {
    displaySavedContent();
  }
}

function generateDailyContent() {
  const bonus = userData.daysTrained;
  const getRand = (arr, num) =>
    [...arr].sort(() => 0.5 - Math.random()).slice(0, num);

  const pList = [
    ...getRand(exercisesData.bracos, 1),
    ...getRand(exercisesData.peito, 2),
    ...getRand(exercisesData.costas, 1),
    ...getRand(exercisesData.abdomen, 1),
    ...getRand(exercisesData.pernas, 3),
  ];

  let physicalText = pList.map((ex) => `• ${ex}: ${12 + bonus} rep`).join("\n");
  physicalText += `\n• Cardio: ${generateCardio(userData.daysTrained)}`;

  const sExtra =
    spiritualExtras[Math.floor(Math.random() * spiritualExtras.length)];
  const spiritualText = `• Estudar Lição da Escola Sabatina\n• Ler 1 capítulo da Bíblia\n• ${sExtra}`;

  const mExtra = mentalExtras[Math.floor(Math.random() * mentalExtras.length)];
  const mentalText = `• Meditação/Silêncio (5 min)\n• ${mExtra}`;

  userData.dailyContent = {
    physical: physicalText,
    spiritual: spiritualText,
    mental: mentalText,
  };
  save();
  displaySavedContent();
}

function displaySavedContent() {
  if (document.getElementById("desc-physical")) {
    document.getElementById("desc-physical").innerText =
      userData.dailyContent.physical;
    document.getElementById("desc-spiritual").innerText =
      userData.dailyContent.spiritual;
    document.getElementById("desc-emotional").innerText =
      userData.dailyContent.mental;
  }
}

function completeChallenge(type) {
  if (userData.completedToday[type]) return;

  userData.completedToday[type] = true;
  userData.points += 50;
  if (type === "physical") userData.daysTrained++;

  if (
    userData.completedToday.physical &&
    userData.completedToday.spiritual &&
    userData.completedToday.mental
  ) {
    userData.level++;
    alert("🔥 DIA COMPLETO! Você evoluiu!");
  }

  save();
  updateUI();
}

function updateUI() {
  document.getElementById("points-value").innerText = userData.points;
  document.getElementById("level-value").innerText = userData.level;
  document.getElementById("days-trained").innerText = userData.daysTrained;

  let progress = 0;
  if (userData.completedToday.physical) progress += 33.3;
  if (userData.completedToday.spiritual) progress += 33.3;
  if (userData.completedToday.mental) progress += 33.4;
  document.getElementById("main-progress").style.width = progress + "%";

  const btnMap = {
    physical: "btn-physical",
    spiritual: "btn-spiritual",
    mental: "btn-mental",
  };
  for (let key in btnMap) {
    const btn = document.getElementById(btnMap[key]);
    if (btn) {
      btn.disabled = userData.completedToday[key];
      btn.innerText = userData.completedToday[key]
        ? "Concluído ✅"
        : "Concluir";
    }
  }
}

function generateCardio(days) {
  if (days < 7) return "20 min Caminhada";
  if (days < 14) return "30 min Caminhada rápida";
  if (days < 28) return "40 min Caminhada/Corrida leve";
  let run = 10 + Math.floor((days - 30) / 10) * 5;
  if (run > 60) run = 60;
  return `${run} min Corrida constante`;
}

function saveWeight() {
  const input = document.getElementById("weight-value");
  const weight = parseFloat(input.value);
  if (!weight || weight <= 0) return alert("Digite um peso válido");
  userData.weights.push({
    date: new Date().toLocaleDateString(),
    value: weight,
  });
  userData.points += 10;
  save();
  renderWeightHistory();
  updateUI();
  input.value = "";
}

function renderWeightHistory() {
  const container = document.getElementById("weight-history");
  if (!container) return;
  container.innerHTML =
    "<h4>Histórico</h4>" +
    (userData.weights.length
      ? userData.weights
          .slice()
          .reverse()
          .map((w) => `<p>${w.date} - ${w.value} kg</p>`)
          .join("")
      : "<p>Nenhum registro</p>");
}

function save() {
  localStorage.setItem(`loot_${userData.name}`, JSON.stringify(userData));
}
function handleLogout() {
  location.reload();
}
function surpriseChallenge() {
  alert(
    "🎲 DESAFIO:\n" +
      surpriseList[Math.floor(Math.random() * surpriseList.length)],
  );
}

function renderAdmin() {
  const panel = document.getElementById("admin-panel");
  if (!panel) return;
  panel.classList.add("card");
  panel.innerHTML = "<h3>Painel Administrativo</h3>";
  allowedUsers.forEach((u) => {
    const d = JSON.parse(localStorage.getItem(`loot_${u}`));
    if (d)
      panel.innerHTML += `<p><strong>${u}</strong>: Nível ${d.level} | Pontos ${d.points}</p>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username");
  if (input)
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleLogin();
    });
});


