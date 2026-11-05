    /* INITIALIZATION */
    window.onload = function() {
        // Check Dark Mode System Preference or Saved State
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
        updateThemeIcons();
  
        // Render Dynamic Views
        renderDashboardUnits();
        renderHospitalsList();
        renderMapPins();
  
        // Refresh Lucide Icons
        lucide.createIcons();
      };
  
      /* TAB NAVIGATION SYSTEM */
      function switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.getElementById('tab-' + tabId).classList.remove('hidden');
  
        // Update Nav Buttons Active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
          btn.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
          btn.classList.add('text-slate-600', 'dark:text-slate-300');
        });
  
        const activeBtn = document.getElementById('nav-' + tabId);
        if (activeBtn) {
          activeBtn.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
          activeBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
        }
  
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  
      function filterHospitalsTab(filterType) {
        setFilter(filterType);
        switchTab('hospitals');
      }
  
      /* DARK MODE TOGGLE */
      function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        updateThemeIcons();
      }
  
      function updateThemeIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        const moon = document.getElementById('theme-icon-moon');
        const sun = document.getElementById('theme-icon-sun');
  
        if (isDark) {
          moon.classList.remove('hidden');
          sun.classList.add('hidden');
        } else {
          moon.classList.add('hidden');
          sun.classList.remove('hidden');
        }
      }
  
      /* RENDER DASHBOARD WIDGET UNITS */
      function renderDashboardUnits() {
        const container = document.getElementById('dashboard-units-list');
        const top3 = HEALTH_UNITS.slice(0, 3);
  
        container.innerHTML = top3.map(unit => `
          <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700 flex items-center justify-between hover:border-emerald-500 transition">
            <div class="space-y-1">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${unit.typeBadgeBg}">
                ${unit.type}
              </span>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">${unit.name}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <i data-lucide="navigation" class="w-3 h-3 text-emerald-600"></i> ${unit.distance} • ${unit.time}
              </p>
            </div>
            <button onclick="switchTab('hospitals')" class="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 text-slate-600 dark:text-slate-300">
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>
        `).join('');
      }
  
      /* RENDER MAP PINS ON SIMULATION */
      function renderMapPins() {
        const container = document.getElementById('map-pins-container');
        container.innerHTML = HEALTH_UNITS.map(unit => `
          <div class="absolute ${unit.latPin} group cursor-pointer" onclick="switchTab('hospitals')">
            <div class="relative flex flex-col items-center">
              <div class="p-1.5 rounded-full bg-emerald-600 text-white shadow-md group-hover:scale-125 transition">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
              </div>
              <div class="hidden group-hover:flex absolute bottom-full mb-1 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-30">
                ${unit.name} (${unit.distance})
              </div>
            </div>
          </div>
        `).join('');
      }
  
      /* RENDER HOSPITALS FULL LIST */
      function setFilter(type) {
        currentFilter = type;
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('bg-emerald-600', 'text-white');
          btn.classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-600', 'dark:text-slate-300');
        });
  
        const activeBtn = document.getElementById('filter-' + type);
        if (activeBtn) {
          activeBtn.classList.add('bg-emerald-600', 'text-white');
          activeBtn.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-600', 'dark:text-slate-300');
        }
  
        renderHospitalsList();
      }
  
      function renderHospitalsList() {
        const grid = document.getElementById('hospitals-grid');
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
  
        const filtered = HEALTH_UNITS.filter(unit => {
          const matchesType = currentFilter === 'ALL' || unit.type === currentFilter;
          const matchesSearch = unit.name.toLowerCase().includes(searchQuery) || unit.address.toLowerCase().includes(searchQuery);
          return matchesType && matchesSearch;
        });
  
        if (filtered.length === 0) {
          grid.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
              <i data-lucide="search-x" class="w-12 h-12 text-slate-400 mx-auto mb-2"></i>
              <h3 class="font-bold text-slate-700 dark:text-slate-300">Nenhum posto ou hospital encontrado</h3>
              <p class="text-xs text-slate-400">Tente buscar por outro nome ou remover os filtros.</p>
            </div>
          `;
          lucide.createIcons();
          return;
        }
  
        grid.innerHTML = filtered.map(unit => `
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-emerald-100 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <span class="text-xs font-bold px-2.5 py-1 rounded-full ${unit.typeBadgeBg}">
                  ${unit.typeLabel}
                </span>
                <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <i data-lucide="clock" class="w-3 h-3"></i> Fila: ${unit.queueTime}
                </span>
              </div>
  
              <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-snug">${unit.name}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 flex-shrink-0 text-slate-400 mt-0.5"></i> ${unit.address}
              </p>
  
              <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2">
                <p class="text-xs font-semibold text-slate-700 dark:text-slate-300">Serviços e Tratamentos:</p>
                <div class="flex flex-wrap gap-1">
                  ${unit.services.map(s => `<span class="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">${s}</span>`).join('')}
                </div>
              </div>
            </div>
  
            <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">${unit.distance} de você</span>
                <span class="text-[10px] text-slate-400">${unit.time}</span>
              </div>
  
              <button onclick="openRouteSimulation('${unit.name}')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5">
                <i data-lucide="navigation" class="w-3.5 h-3.5"></i> Como Chegar
              </button>
            </div>
          </div>
        `).join('');
  
        lucide.createIcons();
      }