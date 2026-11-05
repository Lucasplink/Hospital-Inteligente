const TELECONSULTA_DATA = {
  specialties: [
    {
      id: "clinica-geral",
      name: "Clínica Geral",
      icon: "stethoscope",
      description: "Orientação para sintomas comuns e dúvidas gerais de saúde."
    },
    {
      id: "pediatria",
      name: "Pediatria",
      icon: "baby",
      description: "Atendimento para crianças e adolescentes."
    },
    {
      id: "dermatologia",
      name: "Dermatologia",
      icon: "scan-face",
      description: "Avaliação inicial de queixas relacionadas à pele."
    },
    {
      id: "psicologia",
      name: "Psicologia",
      icon: "heart-handshake",
      description: "Atendimento e acolhimento psicológico."
    }
  ],

  professionals: [
    { name: "Dra. Ana Oliveira", specialty: "clinica-geral", time: "Hoje • 14:30" },
    { name: "Dr. Lucas Martins", specialty: "clinica-geral", time: "Hoje • 16:00" },
    { name: "Dra. Marina Costa", specialty: "pediatria", time: "Hoje • 15:30" },
    { name: "Dra. Beatriz Lima", specialty: "dermatologia", time: "Amanhã • 09:00" },
    { name: "Dra. Camila Rocha", specialty: "psicologia", time: "Amanhã • 10:30" }
  ]
};

let teleconsultaState = {
  specialty: "",
  professional: "",
  scheduled: false
};

/* ---------- INITIALIZAÇÃO ---------- */

function initTeleconsulta() {
  if (document.getElementById("teleconsulta-modal")) return;

  injectTeleconsultaNav();
  injectTeleconsultaDashboardCard();
  createTeleconsultaModal();
  lucide.createIcons();
}

/* ---------- NAVEGAÇÃO ---------- */

function injectTeleconsultaNav() {
  const nav = document.querySelector("header nav");
  if (!nav || document.getElementById("nav-teleconsulta")) return;

  const button = document.createElement("button");
  button.id = "nav-teleconsulta";
  button.className =
    "nav-btn px-5 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all";
  button.innerHTML =
    '<i data-lucide="video" class="w-4 h-4 inline mr-1.5"></i> Teleconsulta';
  button.onclick = openTeleconsultaModal;

  nav.appendChild(button);
}

/* ---------- CARD NO DASHBOARD ---------- */

function injectTeleconsultaDashboardCard() {
  const quickActions = document.querySelector("#tab-dashboard .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4");
  if (!quickActions || document.getElementById("teleconsulta-dashboard-card")) return;

  const card = document.createElement("div");
  card.id = "teleconsulta-dashboard-card";
  card.onclick = openTeleconsultaModal;
  card.className =
    "cursor-pointer bg-white dark:bg-slate-800 p-5 rounded-2xl border border-cyan-100 dark:border-slate-700 hover:border-cyan-500 shadow-sm hover:shadow-md transition group";

  card.innerHTML = `
    <div class="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
      <i data-lucide="video" class="w-6 h-6"></i>
    </div>
    <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition">
      Teleconsulta
    </h3>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
      Consulte um profissional para situações adequadas ao atendimento remoto.
    </p>
  `;

  quickActions.appendChild(card);
}

/* ---------- MODAL PRINCIPAL ---------- */

function createTeleconsultaModal() {
  const modal = document.createElement("div");
  modal.id = "teleconsulta-modal";
  modal.className =
    "hidden fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm p-4 flex items-center justify-center";

  modal.innerHTML = `
    <div class="w-full max-w-3xl max-h-[92vh] overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700">

      <div class="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <i data-lucide="video" class="w-5 h-5"></i>
          </div>
          <div>
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">Teleconsulta</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Atendimento remoto • Protótipo</p>
          </div>
        </div>

        <button onclick="closeTeleconsultaModal()"
          class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div id="teleconsulta-content" class="p-5"></div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeTeleconsultaModal();
  });

  renderTeleconsultaHome();
}

/* ---------- TELA INICIAL ---------- */

function renderTeleconsultaHome() {
  const container = document.getElementById("teleconsulta-content");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-5">

      <div class="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-4">
        <div class="flex gap-3">
          <i data-lucide="info" class="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5"></i>
          <div class="text-sm text-cyan-900 dark:text-cyan-200">
            <p class="font-bold mb-1">Quando usar a teleconsulta?</p>
            <p>
              Ela pode ser usada para dúvidas, orientações e situações que não exigem
              avaliação física imediata. Em uma emergência, procure atendimento presencial
              ou acione o serviço de emergência.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-slate-900 dark:text-white mb-3">Escolha uma especialidade</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${TELECONSULTA_DATA.specialties.map(specialty => `
            <button onclick="selectTeleconsultaSpecialty('${specialty.id}')"
              class="text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-700
                     hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition">
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-cyan-600 flex items-center justify-center">
                  <i data-lucide="${specialty.icon}" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="font-bold text-sm text-slate-900 dark:text-white">${specialty.name}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${specialty.description}</p>
                </div>
              </div>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
        <p class="text-xs text-amber-900 dark:text-amber-200">
          <strong>Importante:</strong> este protótipo não realiza diagnóstico e não substitui
          avaliação de um profissional de saúde.
        </p>
      </div>
    </div>
  `;

  lucide.createIcons();
}

/* ---------- SELEÇÃO DE ESPECIALIDADE ---------- */

function selectTeleconsultaSpecialty(specialtyId) {
  teleconsultaState.specialty = specialtyId;
  renderTeleconsultaProfessionals();
}

function renderTeleconsultaProfessionals() {
  const container = document.getElementById("teleconsulta-content");
  const specialty = TELECONSULTA_DATA.specialties.find(s => s.id === teleconsultaState.specialty);

  const professionals = TELECONSULTA_DATA.professionals.filter(
    professional => professional.specialty === teleconsultaState.specialty
  );

  container.innerHTML = `
    <div class="space-y-5">

      <button onclick="renderTeleconsultaHome()"
        class="text-xs font-semibold text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        Voltar para especialidades
      </button>

      <div>
        <p class="text-xs text-slate-500 dark:text-slate-400">Especialidade selecionada</p>
        <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">${specialty.name}</h3>
      </div>

      <div class="space-y-3">
        <h4 class="font-bold text-slate-900 dark:text-white">Profissionais disponíveis</h4>

        ${professionals.map((professional, index) => `
          <button onclick="selectTeleconsultaProfessional(${index})"
            class="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-700
                   hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 flex items-center justify-center">
                  <i data-lucide="user-round" class="w-5 h-5"></i>
                </div>
                <div>
                  <p class="font-bold text-sm text-slate-900 dark:text-white">${professional.name}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">${specialty.name}</p>
                </div>
              </div>

              <span class="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg">
                ${professional.time}
              </span>
            </div>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  // Guarda a lista filtrada para a seleção pelo índice.
  window.__teleconsultaProfessionals = professionals;

  lucide.createIcons();
}

/* ---------- PROFISSIONAL + AGENDAMENTO ---------- */

function selectTeleconsultaProfessional(index) {
  const professional = window.__teleconsultaProfessionals?.[index];
  if (!professional) return;

  teleconsultaState.professional = professional.name;
  renderTeleconsultaConfirmation(professional);
}

function renderTeleconsultaConfirmation(professional) {
  const specialty = TELECONSULTA_DATA.specialties.find(s => s.id === teleconsultaState.specialty);
  const container = document.getElementById("teleconsulta-content");

  container.innerHTML = `
    <div class="space-y-5">

      <button onclick="renderTeleconsultaProfessionals()"
        class="text-xs font-semibold text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        Voltar
      </button>

      <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">Resumo</p>
        <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">${specialty.name}</h3>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
            <p class="text-[10px] uppercase font-bold text-slate-400">Profissional</p>
            <p class="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">${professional.name}</p>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
            <p class="text-[10px] uppercase font-bold text-slate-400">Horário disponível</p>
            <p class="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">${professional.time}</p>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
          Qual é o motivo da consulta?
        </label>
        <textarea id="teleconsulta-reason"
          rows="4"
          placeholder="Descreva brevemente sua dúvida ou sintoma..."
          class="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800
                 text-sm text-slate-900 dark:text-white p-4 outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button onclick="confirmTeleconsulta()"
          class="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
          <i data-lucide="calendar-check" class="w-4 h-4"></i>
          Confirmar agendamento
        </button>

        <button onclick="closeTeleconsultaModal()"
          class="sm:w-32 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl">
          Cancelar
        </button>
      </div>
    </div>
  `;

  lucide.createIcons();
}

function confirmTeleconsulta() {
  const reason = document.getElementById("teleconsulta-reason")?.value.trim();

  if (!reason) {
    alert("Descreva brevemente o motivo da consulta antes de continuar.");
    return;
  }

  teleconsultaState.scheduled = true;
  renderTeleconsultaScheduled();
}

/* ---------- CONSULTA AGENDADA ---------- */

function renderTeleconsultaScheduled() {
  const professional = TELECONSULTA_DATA.professionals.find(
    p => p.name === teleconsultaState.professional
  );

  const specialty = TELECONSULTA_DATA.specialties.find(
    s => s.id === teleconsultaState.specialty
  );

  const container = document.getElementById("teleconsulta-content");

  container.innerHTML = `
    <div class="space-y-5">

      <div class="text-center py-4">
        <div class="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center">
          <i data-lucide="circle-check" class="w-8 h-8"></i>
        </div>

        <h3 class="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
          Consulta agendada!
        </h3>

        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Este é um agendamento de demonstração do protótipo.
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
        <div class="flex justify-between gap-3">
          <span class="text-xs text-slate-500">Especialidade</span>
          <strong class="text-sm text-slate-800 dark:text-slate-200">${specialty.name}</strong>
        </div>

        <div class="flex justify-between gap-3">
          <span class="text-xs text-slate-500">Profissional</span>
          <strong class="text-sm text-slate-800 dark:text-slate-200">${professional.name}</strong>
        </div>

        <div class="flex justify-between gap-3">
          <span class="text-xs text-slate-500">Horário</span>
          <strong class="text-sm text-cyan-700 dark:text-cyan-400">${professional.time}</strong>
        </div>
      </div>

      <div class="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-4">
        <p class="text-sm font-bold text-cyan-900 dark:text-cyan-200">Como funcionaria a sala de consulta?</p>
        <p class="text-xs text-cyan-800 dark:text-cyan-300 mt-1">
          Na versão real, este botão poderia abrir uma sala segura de vídeo,
          conectada ao profissional. Nesta versão, ele abre apenas uma simulação.
        </p>
      </div>

      <button onclick="openTeleconsultaRoom()"
        class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
        <i data-lucide="video" class="w-4 h-4"></i>
        Entrar na sala de demonstração
      </button>
    </div>
  `;

  lucide.createIcons();
}

/* ---------- SALA SIMULADA ---------- */

function openTeleconsultaRoom() {
  const container = document.getElementById("teleconsulta-content");

  container.innerHTML = `
    <div class="space-y-4">

      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-emerald-600 font-bold">● CONSULTA EM ANDAMENTO — DEMONSTRAÇÃO</p>
          <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mt-1">Sala de Teleconsulta</h3>
        </div>

        <button onclick="closeTeleconsultaModal()"
          class="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-2 rounded-xl text-xs font-bold">
          Encerrar
        </button>
      </div>

      <div class="aspect-video rounded-3xl bg-slate-950 flex items-center justify-center relative overflow-hidden">
        <div class="text-center text-white">
          <div class="mx-auto w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center">
            <i data-lucide="user-round" class="w-8 h-8"></i>
          </div>
          <p class="font-bold mt-3">${teleconsultaState.professional}</p>
          <p class="text-xs text-slate-400 mt-1">Vídeo simulado</p>
        </div>

        <div class="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
          <button class="w-11 h-11 rounded-full bg-white/10 text-white border border-white/10">
            <i data-lucide="mic" class="w-5 h-5 mx-auto"></i>
          </button>
          <button class="w-11 h-11 rounded-full bg-white/10 text-white border border-white/10">
            <i data-lucide="video" class="w-5 h-5 mx-auto"></i>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
        <p class="text-sm font-bold text-slate-900 dark:text-white">Chat da consulta</p>

        <div id="teleconsulta-chat"
          class="mt-3 h-32 overflow-y-auto custom-scrollbar space-y-2 text-xs">
          <div class="bg-slate-100 dark:bg-slate-700 rounded-xl p-2.5 max-w-[85%]">
            Olá! Esta é uma simulação da sala de teleconsulta.
          </div>
        </div>

        <div class="mt-3 flex gap-2">
          <input id="teleconsulta-chat-input"
            class="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm"
            placeholder="Digite uma mensagem..."
            onkeydown="if(event.key === 'Enter') sendTeleconsultaMessage()">

          <button onclick="sendTeleconsultaMessage()"
            class="bg-cyan-600 text-white px-4 rounded-xl">
            <i data-lucide="send" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <p class="text-[11px] text-slate-400 text-center">
        Demonstração acadêmica. Não é uma consulta médica real.
      </p>
    </div>
  `;

  lucide.createIcons();
}

function sendTeleconsultaMessage() {
  const input = document.getElementById("teleconsulta-chat-input");
  const chat = document.getElementById("teleconsulta-chat");

  if (!input || !chat || !input.value.trim()) return;

  const message = document.createElement("div");
  message.className =
    "bg-cyan-600 text-white rounded-xl p-2.5 max-w-[85%] ml-auto";
  message.textContent = input.value.trim();

  chat.appendChild(message);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

/* ---------- ABRIR / FECHAR ---------- */

function openTeleconsultaModal() {
  const modal = document.getElementById("teleconsulta-modal");
  if (!modal) {
    initTeleconsulta();
    return openTeleconsultaModal();
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  renderTeleconsultaHome();
  lucide.createIcons();
}

function closeTeleconsultaModal() {
  const modal = document.getElementById("teleconsulta-modal");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/* ---------- INICIALIZAÇÃO AUTOMÁTICA ---------- */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTeleconsulta);
} else {
  initTeleconsulta();
}
