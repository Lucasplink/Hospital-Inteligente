    /* AI TRIAGE CHAT SIMULATION */
    function handleUserSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;

      sendUserMessage(text);
      input.value = '';
    }

    function sendQuickMessage(text) {
      sendUserMessage(text);
    }

    function sendUserMessage(text) {
      const messagesContainer = document.getElementById('chat-messages');

      // User Message Bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'flex gap-3 justify-end';
      userBubble.innerHTML = `
        <div class="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[80%] leading-relaxed">
          ${text}
        </div>
      `;
      messagesContainer.appendChild(userBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Show Typing Indicator
      const typingBubble = document.createElement('div');
      typingBubble.id = 'typing-indicator';
      typingBubble.className = 'flex gap-3 max-w-[85%]';
      typingBubble.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-slate-400 flex items-center gap-1">
          <span class="animate-bounce">●</span>
          <span class="animate-bounce delay-100">●</span>
          <span class="animate-bounce delay-200">●</span>
          <span class="ml-1">Analisando sintomas...</span>
        </div>
      `;
      messagesContainer.appendChild(typingBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      lucide.createIcons();

      // Process AI response logic after 1.2s delay
      setTimeout(() => {
        document.getElementById('typing-indicator')?.remove();
        generateAiResponse(text.toLowerCase());
      }, 1200);
    }

    function generateAiResponse(input) {
      const messagesContainer = document.getElementById('chat-messages');
      let responseHTML = '';

      // TRIAGE RULES ENGINE
      if (input.includes('peito') || input.includes('falta de ar') || input.includes('desmaio') || input.includes('sangramento grave')) {
        // GRAVE -> EMERGENCY / UPA / HOSPITAL
        responseHTML = `
          <div class="space-y-3">
            <span class="inline-block bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 font-extrabold text-xs px-2.5 py-1 rounded-full">
              🚨 TRIAGEM: EMERGÊNCIA / ALTA GRAVIDADE
            </span>
            <p>Seus sintomas indicam que você necessita de <strong>atendimento imediato</strong>!</p>
            <p class="text-xs bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300">
              <strong>Recomendação:</strong> Dirija-se imediatamente à <strong>UPA 24h - São José</strong> ou ao <strong>Hospital Geral</strong>. Se houver risco imediato ou incapacidade de locomoção, acione o SOS.
            </p>
            <div class="flex flex-wrap gap-2 pt-1">
              <button onclick="openSosModal()" class="bg-red-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-red-700">
                🚨 Acionar SOS 192 (SAMU)
              </button>
              <button onclick="switchTab('hospitals')" class="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs px-3.5 py-2 rounded-xl">
                Ver Rota para UPA / Hospital
              </button>
            </div>
          </div>
        `;
      } else if (input.includes('corte') || input.includes('dedo') || input.includes('curativo') || input.includes('gripe') || input.includes('cabeca') || input.includes('cabeça') || input.includes('leve') || input.includes('arranh')) {
        // LEVE -> UBS
        responseHTML = `
          <div class="space-y-3">
            <span class="inline-block bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 font-extrabold text-xs px-2.5 py-1 rounded-full">
              🟢 TRIAGEM: CASO LEVE / UBS RECOMENDADA
            </span>
            <p>Pela sua descrição, trata-se de um ferimento ou sintoma de <strong>baixa gravidade</strong> que pode ser resolvido com rapidez em um posto de saúde.</p>
            <p class="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
              <strong>Onde ir:</strong> Vá até a <strong>UBS Central - Vila Saúde</strong> (a 0.8 km de você). Lá você terá atendimento para curativos, medicações e limpezas sem enfrentar as longas filas dos hospitais.
            </p>
            <button onclick="switchTab('hospitals')" class="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-700">
              📍 Ver Localização da UBS Central
            </button>
          </div>
        `;
      } else if (input.includes('fratura') || input.includes('tornozelo') || input.includes('osso') || input.includes('queda') || input.includes('inchado') || input.includes('dor forte')) {
        // MODERADA -> UPA 24H
        responseHTML = `
          <div class="space-y-3">
            <span class="inline-block bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-full">
              🟡 TRIAGEM: URGÊNCIA MODERADA (UPA)
            </span>
            <p>Casos de trauma, quedas com inchaço e dor aguda necessitam de avaliação diagnóstica com <strong>Raio-X</strong>.</p>
            <p class="text-xs bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
              <strong>Onde ir:</strong> Recomendamos ir à <strong>UPA 24h - São José</strong> (a 2.3 km de você).
            </p>
            <button onclick="switchTab('hospitals')" class="bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-amber-700">
              📍 Ver Rota para a UPA 24h
            </button>
          </div>
        `;
      } else {
        // DEFAULT GUIDANCE
        responseHTML = `
          <div class="space-y-2">
            <p>Entendi. Para fornecer uma recomendação exata sobre qual hospital ou posto procurar, me diga:</p>
            <ul class="list-disc list-inside text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <li>Há sangramento constante ou dor insuportável?</li>
              <li>Você consegue caminhar sozinho?</li>
              <li>É um ferimento superficial ou queimadura?</li>
            </ul>
            <p class="text-xs font-semibold text-emerald-600">Em caso de dúvida entre leve e grave, prefira consultar a UPA 24h mais próxima.</p>
          </div>
        `;
      }

      const botBubble = document.createElement('div');
      botBubble.className = 'flex gap-3 max-w-[85%]';
      botBubble.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-800 dark:text-slate-200">
          ${responseHTML}
        </div>
      `;

      messagesContainer.appendChild(botBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      lucide.createIcons();
    }

    function resetChat() {
      const messagesContainer = document.getElementById('chat-messages');
      messagesContainer.innerHTML = `
        <div class="flex gap-3 max-w-[85%]">
          <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
            <i data-lucide="bot" class="w-4 h-4"></i>
          </div>
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm space-y-2 text-slate-800 dark:text-slate-200">
            <p>Chat reiniciado! 🤖🏥</p>
            <p>Descreva novamente seu ferimento ou sintoma para fazermos uma nova triagem.</p>
          </div>
        </div>
      `;
      lucide.createIcons();
    }

    /* MODAL AND SIMULATION HELPERS */
    function openSosModal() {
      document.getElementById('sos-modal').classList.remove('hidden');
    }

    function closeSosModal() {
      document.getElementById('sos-modal').classList.add('hidden');
    }

    function simulateCall(service) {
      alert(`[SIMULAÇÃO]: Ligando para a Central de Emergência (${service})... Mantenha a calma e informe sua localização!`);
      closeSosModal();
    }

    function openRouteSimulation(unitName) {
      alert(`[GPS Hospital Inteligente]: Traçando rota em tempo real para "${unitName}".\n\nInstruções enviadas para o seu GPS!`);
    }