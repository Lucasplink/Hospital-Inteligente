    /* DATABASES & DATA STRUCTURES */
    const HEALTH_UNITS = [
        {
          id: 1,
          name: "UBS Central - Vila Saúde",
          type: "UBS",
          typeLabel: "Posto de Saúde (UBS)",
          typeBadgeBg: "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300",
          distance: "0.8 km",
          time: "10 min a pé",
          queueTime: "Ligeira (~15 min)",
          address: "Rua das Flores, 120 - Centro",
          services: ["Ferimentos leves", "Vacinação", "Consultas básicas", "Troca de curativos"],
          status: "Aberto agora (07h às 18h)",
          latPin: "top-1/3 left-1/3"
        },
        {
          id: 2,
          name: "UPA 24h - São José",
          type: "UPA",
          typeLabel: "Unidade de Pronto Atendimento (UPA)",
          typeBadgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300",
          distance: "2.3 km",
          time: "6 min de carro",
          queueTime: "Moderada (~35 min)",
          address: "Av. Principal, 2050 - Bairro Alto",
          services: ["Pressão alta", "Febre alta constante", "Suturas/Pontos", "Raio-X urgente"],
          status: "Aberto 24 Horas",
          latPin: "top-1/4 right-1/4"
        },
        {
          id: 3,
          name: "Hospital Geral de Urgências",
          type: "Hospital",
          typeLabel: "Hospital Geral",
          typeBadgeBg: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300",
          distance: "4.1 km",
          time: "12 min de carro",
          queueTime: "Intensa (~50 min)",
          address: "Rodovia da Paz, S/N - Km 4",
          services: ["Cirurgias", "Fraturas graves", "Internação", "UTI", "Traumas complexos"],
          status: "Aberto 24 Horas",
          latPin: "bottom-1/4 right-1/3"
        },
        {
          id: 4,
          name: "UBS Jardim das Oliveiras",
          type: "UBS",
          typeLabel: "Posto de Saúde (UBS)",
          typeBadgeBg: "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300",
          distance: "1.5 km",
          time: "18 min a pé",
          queueTime: "Tranquilo (~10 min)",
          address: "Rua dos Pinheiros, 45 - Jd. Oliveiras",
          services: ["Curativos", "Retirada de pontos", "Injeções", "Glicemia"],
          status: "Aberto agora (07h às 17h)",
          latPin: "bottom-1/3 left-1/4"
        },
        {
          id: 5,
          name: "Hospital Infantil e Maternidade",
          type: "Hospital",
          typeLabel: "Hospital Especializado",
          typeBadgeBg: "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300",
          distance: "5.0 km",
          time: "15 min de carro",
          queueTime: "Moderada (~25 min)",
          address: "Av. Brasil, 800 - Vista Alegre",
          services: ["Pediatria urgente", "Maternidade", "Urgências infantis"],
          status: "Aberto 24 Horas",
          latPin: "top-1/2 right-1/2"
        }
      ];
  
      let currentFilter = 'ALL';