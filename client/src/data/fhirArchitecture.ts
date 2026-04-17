export interface RecursoFhir {
  nome: string;
  descricao: string;
  versaoFhir: string;
  exemplos?: string[];
}

export interface FuncaoL2 {
  id: string;
  nome: string;
  descricao: string;
  recursos: RecursoFhir[];
  cor: string;
  corFundo: string;
}

export interface ModuloL1 {
  id: string;
  nome: string;
  descricao: string;
  funcoes: FuncaoL2[];
  cor: string;
  corFundo: string;
  icone: string;
}

export interface CamadaL0 {
  id: string;
  nome: string;
  descricao: string;
  modulos: ModuloL1[];
}

export const arquiteturaFhir: CamadaL0[] = [
  {
    id: "infraestrutura",
    nome: "L0 - Infraestrutura & Foundation",
    descricao: "Framework básico e suporte transversal",
    modulos: [
      {
        id: "terminologias",
        nome: "Terminologias",
        descricao: "Padrões de codificação brasileiros",
        cor: "from-yellow-500 to-yellow-600",
        corFundo: "bg-yellow-50",
        icone: "📚",
        funcoes: [
          {
            id: "codesystems",
            nome: "Sistemas de Codificação (L2)",
            descricao: "Sistemas de codificação (CMED, TUSS, CID-10)",
            cor: "bg-yellow-100 border-yellow-300",
            corFundo: "bg-yellow-50",
            recursos: [
              {
                nome: "CodeSystem",
                descricao: "Sistema de códigos",
                versaoFhir: "R4/R5",
                exemplos: ["CID-10", "TISS", "TUSS"],
              },
            ],
          },
          {
            id: "valuesets",
            nome: "Conjuntos de Valores (L2)",
            descricao: "Conjuntos de valores permitidos",
            cor: "bg-yellow-100 border-yellow-300",
            corFundo: "bg-yellow-50",
            recursos: [
              {
                nome: "ValueSet",
                descricao: "Conjunto de valores",
                versaoFhir: "R4/R5",
                exemplos: ["Tipos de procedimento"],
              },
            ],
          },
          {
            id: "conceptmaps",
            nome: "Mapeamento de Conceitos (L2)",
            descricao: "Mapeamento entre sistemas",
            cor: "bg-yellow-100 border-yellow-300",
            corFundo: "bg-yellow-50",
            recursos: [
              {
                nome: "ConceptMap",
                descricao: "Mapa de conceitos",
                versaoFhir: "R4/R5",
                exemplos: ["CID-10 → SNOMED"],
              },
            ],
          },
        ],
      },
      {
        id: "seguranca-privacidade",
        nome: "Segurança & Privacidade",
        descricao: "Controle de acesso, consentimento e auditoria",
        cor: "from-gray-600 to-gray-700",
        corFundo: "bg-gray-50",
        icone: "🔐",
        funcoes: [
          {
            id: "consentimento-privacidade",
            nome: "Consentimento & Privacidade (L2)",
            descricao: "Consentimento e privacidade do paciente",
            cor: "bg-gray-100 border-gray-300",
            corFundo: "bg-gray-50",
            recursos: [
              {
                nome: "Consentimento",
                descricao: "Consentimento do paciente",
                versaoFhir: "R4/R5",
                exemplos: ["LGPD", "Privacidade"],
              },
            ],
          },
          {
            id: "auditoria-rastreabilidade",
            nome: "Auditoria & Rastreabilidade (L2)",
            descricao: "Rastreabilidade e auditoria",
            cor: "bg-gray-100 border-gray-300",
            corFundo: "bg-gray-50",
            recursos: [
              {
                nome: "EventoAuditoria",
                descricao: "Evento de auditoria",
                versaoFhir: "R4/R5",
                exemplos: ["Log de acesso"],
              },
              {
                nome: "Proveniência",
                descricao: "Rastreabilidade de dados",
                versaoFhir: "R4/R5",
                exemplos: ["Quem fez o quê"],
              },
            ],
          },
        ],
      },
      {
        id: "conformidade",
        nome: "Conformidade",
        descricao: "Perfis e conformidade de implementação",
        cor: "from-indigo-600 to-indigo-700",
        corFundo: "bg-indigo-50",
        icone: "✅",
        funcoes: [
          {
            id: "perfis-conformidade",
            nome: "Perfis & Conformidade (L2)",
            descricao: "Definição de perfis FHIR",
            cor: "bg-indigo-100 border-indigo-300",
            corFundo: "bg-indigo-50",
            recursos: [
              {
                nome: "DefinicaoEstrutura",
                descricao: "Definição de perfil FHIR",
                versaoFhir: "R4/R5",
                exemplos: ["Perfil customizado"],
              },
              {
                nome: "DeclaracaoCapacidade",
                descricao: "Capacidades do servidor",
                versaoFhir: "R4/R5",
                exemplos: ["API disponível"],
              },
              {
                nome: "GuiaImplementacao",
                descricao: "Guia de implementação",
                versaoFhir: "R4/R5",
                exemplos: ["Documentação"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "conteudo",
    nome: "L0 - Módulos de Conteúdo",
    descricao: "Conceitos clínicos e administrativos do mundo real",
    modulos: [
      {
        id: "medicamentos-modulo",
        nome: "Medicamentos",
        descricao: "Ciclo de vida de medicamentos",
        cor: "from-green-500 to-green-600",
        corFundo: "bg-green-50",
        icone: "💊",
        funcoes: [
          {
            id: "conhecimento-medicamentos",
            nome: "Conhecimento de Medicamentos (L1)",
            descricao: "Catálogo e definição de medicamentos",
            cor: "bg-green-100 border-green-300",
            corFundo: "bg-green-50",
            recursos: [
              {
                nome: "DefinicaoProdutoMedicinal",
                descricao: "Definição de medicamento (CMED)",
                versaoFhir: "R4/R5",
                exemplos: ["Dipirona 500mg", "Amoxicilina 500mg"],
              },
              {
                nome: "DefinicaoProdutoEmbalado",
                descricao: "Embalagem do medicamento",
                versaoFhir: "R4/R5",
                exemplos: ["Blister com 10 comprimidos"],
              },
              {
                nome: "Ingrediente",
                descricao: "Ingredientes do medicamento",
                versaoFhir: "R4/R5",
                exemplos: ["Dipirona monoidratada"],
              },
              {
                nome: "DefinicaoSubstancia",
                descricao: "Definição da substância ativa",
                versaoFhir: "R4/R5",
                exemplos: ["Paracetamol"],
              },
              {
                nome: "Medicamento",
                descricao: "Medicamento (versão simplificada)",
                versaoFhir: "R4/R5",
                exemplos: ["Medicamento genérico"],
              },
            ],
          },
          {
            id: "prescricao-dispensacao",
            nome: "Prescrição & Dispensação (L1)",
            descricao: "Fluxo de prescrição, dispensação e administração",
            cor: "bg-green-100 border-green-300",
            corFundo: "bg-green-50",
            recursos: [
              {
                nome: "SolicitacaoMedicamento",
                descricao: "Solicitação/prescrição de medicamento",
                versaoFhir: "R4/R5",
                exemplos: ["Prescrição médica"],
              },
              {
                nome: "DispensacaoMedicamento",
                descricao: "Dispensação de medicamento",
                versaoFhir: "R4/R5",
                exemplos: ["Entrega na farmácia"],
              },
              {
                nome: "AdministracaoMedicamento",
                descricao: "Administração do medicamento",
                versaoFhir: "R4/R5",
                exemplos: ["Aplicação em enfermaria"],
              },
              {
                nome: "DeclaracaoMedicamento",
                descricao: "Declaração de uso de medicamento",
                versaoFhir: "R4/R5",
                exemplos: ["Histórico de medicamentos"],
              },
            ],
          },
          {
            id: "vacinacao",
            nome: "Vacinação (L1)",
            descricao: "Gerenciamento de vacinações",
            cor: "bg-green-100 border-green-300",
            corFundo: "bg-green-50",
            recursos: [
              {
                nome: "Vacinacao",
                descricao: "Registro de vacinação",
                versaoFhir: "R4/R5",
                exemplos: ["Vacina COVID-19"],
              },
              {
                nome: "AvaliacaoVacinacao",
                descricao: "Avaliação de cobertura vacinal",
                versaoFhir: "R4/R5",
                exemplos: ["Verificação de imunidade"],
              },
              {
                nome: "RecomendacaoVacinacao",
                descricao: "Recomendação de vacinação",
                versaoFhir: "R4/R5",
                exemplos: ["Próxima dose recomendada"],
              },
            ],
          },
        ],
      },
      {
        id: "clinico-modulo",
        nome: "Clínico",
        descricao: "Dados clínicos e atendimento",
        cor: "from-blue-500 to-blue-600",
        corFundo: "bg-blue-50",
        icone: "🏥",
        funcoes: [
          {
            id: "paciente-dados-demograficos",
            nome: "Paciente & Dados Demográficos (L1)",
            descricao: "Dados demográficos e identificação",
            cor: "bg-blue-100 border-blue-300",
            corFundo: "bg-blue-50",
            recursos: [
              {
                nome: "Paciente",
                descricao: "Dados do paciente",
                versaoFhir: "R4/R5",
                exemplos: ["Nome, CPF, data de nascimento"],
              },
              {
                nome: "PessoaRelacionada",
                descricao: "Pessoa relacionada ao paciente",
                versaoFhir: "R4/R5",
                exemplos: ["Responsável, familiar"],
              },
              {
                nome: "Pessoa",
                descricao: "Pessoa genérica",
                versaoFhir: "R4/R5",
                exemplos: ["Registro de pessoa"],
              },
            ],
          },
          {
            id: "encontro-visitas",
            nome: "Encontro & Visitas (L1)",
            descricao: "Registro de encontros/visitas",
            cor: "bg-blue-100 border-blue-300",
            corFundo: "bg-blue-50",
            recursos: [
              {
                nome: "Encontro",
                descricao: "Encontro clínico (internação, consulta)",
                versaoFhir: "R4/R5",
                exemplos: ["Internação hospitalar"],
              },
              {
                nome: "EpisodioAtendimento",
                descricao: "Série de encontros relacionados",
                versaoFhir: "R4/R5",
                exemplos: ["Tratamento de diabetes"],
              },
              {
                nome: "Localizacao",
                descricao: "Local do atendimento",
                versaoFhir: "R4/R5",
                exemplos: ["Leito 101, Enfermaria A"],
              },
            ],
          },
          {
            id: "condicoes-diagnosticos",
            nome: "Condições & Diagnósticos (L1)",
            descricao: "Diagnósticos e condições clínicas",
            cor: "bg-blue-100 border-blue-300",
            corFundo: "bg-blue-50",
            recursos: [
              {
                nome: "Condicao",
                descricao: "Diagnóstico ou condição clínica",
                versaoFhir: "R4/R5",
                exemplos: ["Hipertensão, Diabetes"],
              },
              {
                nome: "Observacao",
                descricao: "Observação clínica",
                versaoFhir: "R4/R5",
                exemplos: ["Pressão arterial, Temperatura"],
              },
              {
                nome: "HistoricoFamiliar",
                descricao: "Histórico familiar",
                versaoFhir: "R4/R5",
                exemplos: ["Câncer na família"],
              },
            ],
          },
          {
            id: "procedimentos-servicos",
            nome: "Procedimentos & Serviços (L1)",
            descricao: "Procedimentos e serviços prestados",
            cor: "bg-blue-100 border-blue-300",
            corFundo: "bg-blue-50",
            recursos: [
              {
                nome: "Procedimento",
                descricao: "Procedimento realizado",
                versaoFhir: "R4/R5",
                exemplos: ["Cirurgia, Punção"],
              },
              {
                nome: "SolicitacaoServico",
                descricao: "Solicitação de serviço",
                versaoFhir: "R4/R5",
                exemplos: ["Solicitação de exame"],
              },
              {
                nome: "DefinicaoAtividade",
                descricao: "Definição de atividade/procedimento",
                versaoFhir: "R4/R5",
                exemplos: ["Protocolo de procedimento"],
              },
            ],
          },
          {
            id: "observacoes-resultados",
            nome: "Observações & Resultados (L1)",
            descricao: "Observações clínicas e resultados",
            cor: "bg-blue-100 border-blue-300",
            corFundo: "bg-blue-50",
            recursos: [
              {
                nome: "Observacao",
                descricao: "Observação clínica",
                versaoFhir: "R4/R5",
                exemplos: ["Resultado de exame"],
              },
              {
                nome: "RelatorioDiagnostico",
                descricao: "Relatório diagnóstico",
                versaoFhir: "R4/R5",
                exemplos: ["Resultado de laboratorio"],
              },
              {
                nome: "DefinicaoAmostra",
                descricao: "Definição de amostra",
                versaoFhir: "R4/R5",
                exemplos: ["Sangue, Urina"],
              },
            ],
          },
        ],
      },
      {
        id: "dispositivos-modulo",
        nome: "Dispositivos & Materiais",
        descricao: "OPME e dispositivos médicos",
        cor: "from-orange-500 to-orange-600",
        corFundo: "bg-orange-50",
        icone: "🏥",
        funcoes: [
          {
            id: "conhecimento-dispositivos",
            nome: "Conhecimento de Dispositivos (L1)",
            descricao: "Catálogo de dispositivos e materiais",
            cor: "bg-orange-100 border-orange-300",
            corFundo: "bg-orange-50",
            recursos: [
              {
                nome: "DefinicaoDispositivo",
                descricao: "Definição de dispositivo (TUSS 19)",
                versaoFhir: "R4/R5",
                exemplos: ["Cateter, Agulha"],
              },
              {
                nome: "DefinicaoItemFabricado",
                descricao: "Item manufaturado",
                versaoFhir: "R4/R5",
                exemplos: ["Produto final"],
              },
              {
                nome: "DefinicaoAmostra",
                descricao: "Definição de amostra",
                versaoFhir: "R4/R5",
                exemplos: ["Tipo de coleta"],
              },
            ],
          },
          {
            id: "uso-dispositivos",
            nome: "Uso de Dispositivos (L1)",
            descricao: "Utilização de dispositivos",
            cor: "bg-orange-100 border-orange-300",
            corFundo: "bg-orange-50",
            recursos: [
              {
                nome: "Dispositivo",
                descricao: "Instância de dispositivo",
                versaoFhir: "R4/R5",
                exemplos: ["Cateter específico"],
              },
              {
                nome: "UsoDispositivo",
                descricao: "Uso do dispositivo",
                versaoFhir: "R4/R5",
                exemplos: ["Aplicação em paciente"],
              },
              {
                nome: "MetricaDispositivo",
                descricao: "Métrica do dispositivo",
                versaoFhir: "R4/R5",
                exemplos: ["Medições"],
              },
            ],
          },
        ],
      },
      {
        id: "diagnosticos-modulo",
        nome: "Diagnósticos",
        descricao: "Exames, testes e resultados",
        cor: "from-purple-500 to-purple-600",
        corFundo: "bg-purple-50",
        icone: "🔬",
        funcoes: [
          {
            id: "conhecimento-diagnosticos",
            nome: "Conhecimento de Diagnósticos (L1)",
            descricao: "Catálogo de exames e testes",
            cor: "bg-purple-100 border-purple-300",
            corFundo: "bg-purple-50",
            recursos: [
              {
                nome: "DefinicaoAtividade",
                descricao: "Definição de exame (TUSS 22)",
                versaoFhir: "R4/R5",
                exemplos: ["Hemograma, Tomografia"],
              },
              {
                nome: "DefinicaoPlan",
                descricao: "Plano de diagnóstico",
                versaoFhir: "R4/R5",
                exemplos: ["Protocolo de exame"],
              },
              {
                nome: "DefinicaoAmostra",
                descricao: "Definição de amostra",
                versaoFhir: "R4/R5",
                exemplos: ["Sangue, Saliva"],
              },
            ],
          },
          {
            id: "execucao-diagnosticos",
            nome: "Execução de Diagnósticos (L1)",
            descricao: "Solicitação e execução de exames",
            cor: "bg-purple-100 border-purple-300",
            corFundo: "bg-purple-50",
            recursos: [
              {
                nome: "SolicitacaoServico",
                descricao: "Solicitação de exame",
                versaoFhir: "R4/R5",
                exemplos: ["Pedido de hemograma"],
              },
              {
                nome: "Amostra",
                descricao: "Amostra coletada",
                versaoFhir: "R4/R5",
                exemplos: ["Amostra de sangue"],
              },
              {
                nome: "RelatorioDiagnostico",
                descricao: "Resultado do exame",
                versaoFhir: "R4/R5",
                exemplos: ["Laudo"],
              },
              {
                nome: "Observacao",
                descricao: "Observação do resultado",
                versaoFhir: "R4/R5",
                exemplos: ["Valor medido"],
              },
            ],
          },
          {
            id: "imagens",
            nome: "Imagens (L1)",
            descricao: "Exames de imagem",
            cor: "bg-purple-100 border-purple-300",
            corFundo: "bg-purple-50",
            recursos: [
              {
                nome: "EstudoImagem",
                descricao: "Estudo de imagem",
                versaoFhir: "R4/R5",
                exemplos: ["Tomografia, Ressonância"],
              },
              {
                nome: "SelecaoImagem",
                descricao: "Seleção de imagens",
                versaoFhir: "R4/R5",
                exemplos: ["Imagens relevantes"],
              },
            ],
          },
        ],
      },
      {
        id: "faturamento-modulo",
        nome: "Faturamento",
        descricao: "Guias, contas e pagamentos",
        cor: "from-red-500 to-red-600",
        corFundo: "bg-red-50",
        icone: "💰",
        funcoes: [
          {
            id: "guias-faturamento",
            nome: "Guias & Faturamento (L1)",
            descricao: "Geração e processamento de guias",
            cor: "bg-red-100 border-red-300",
            corFundo: "bg-red-50",
            recursos: [
              {
                nome: "Guia",
                descricao: "Guia/fatura (TISS)",
                versaoFhir: "R4/R5",
                exemplos: ["Guia de internação"],
              },
              {
                nome: "RespostaGuia",
                descricao: "Resposta da operadora",
                versaoFhir: "R4/R5",
                exemplos: ["Aprovação/rejeição"],
              },
              {
                nome: "Fatura",
                descricao: "Fatura",
                versaoFhir: "R4/R5",
                exemplos: ["Nota fiscal"],
              },
              {
                nome: "ItemCobranca",
                descricao: "Item de cobrança",
                versaoFhir: "R4/R5",
                exemplos: ["Procedimento cobrado"],
              },
            ],
          },
          {
            id: "cobertura-elegibilidade",
            nome: "Cobertura & Elegibilidade (L1)",
            descricao: "Planos de saúde e cobertura",
            cor: "bg-red-100 border-red-300",
            corFundo: "bg-red-50",
            recursos: [
              {
                nome: "Cobertura",
                descricao: "Plano de saúde",
                versaoFhir: "R4/R5",
                exemplos: ["Plano de saúde"],
              },
              {
                nome: "SolicitacaoElegibilidadeCobertura",
                descricao: "Verificação de elegibilidade",
                versaoFhir: "R4/R5",
                exemplos: ["Verificação de cobertura"],
              },
              {
                nome: "RespostaElegibilidadeCobertura",
                descricao: "Resposta de elegibilidade",
                versaoFhir: "R4/R5",
                exemplos: ["Resultado da verificação"],
              },
            ],
          },
          {
            id: "contas-pagamentos",
            nome: "Contas & Pagamentos (L1)",
            descricao: "Gestão de contas e pagamentos",
            cor: "bg-red-100 border-red-300",
            corFundo: "bg-red-50",
            recursos: [
              {
                nome: "Conta",
                descricao: "Conta do paciente",
                versaoFhir: "R4/R5",
                exemplos: ["Saldo devedor"],
              },
              {
                nome: "AvisoPagamento",
                descricao: "Notificação de pagamento",
                versaoFhir: "R4/R5",
                exemplos: ["Aviso de pagamento"],
              },
              {
                nome: "ReconciliacaoPagamento",
                descricao: "Reconciliação de pagamento",
                versaoFhir: "R4/R5",
                exemplos: ["Confirmação de recebimento"],
              },
            ],
          },
        ],
      },
      {
        id: "administrativo-modulo",
        nome: "Administrativo",
        descricao: "Organização, agendamento e comunicação",
        cor: "from-cyan-500 to-cyan-600",
        corFundo: "bg-cyan-50",
        icone: "📋",
        funcoes: [
          {
            id: "organizacao-papeis",
            nome: "Organização & Papéis (L1)",
            descricao: "Estrutura organizacional",
            cor: "bg-cyan-100 border-cyan-300",
            corFundo: "bg-cyan-50",
            recursos: [
              {
                nome: "Organizacao",
                descricao: "Organização/hospital",
                versaoFhir: "R4/R5",
                exemplos: ["Hospital São Paulo"],
              },
              {
                nome: "AfiliacaoOrganizacional",
                descricao: "Afiliação organizacional",
                versaoFhir: "R4/R5",
                exemplos: ["Filial, Parceria"],
              },
              {
                nome: "Profissional",
                descricao: "Profissional de saúde",
                versaoFhir: "R4/R5",
                exemplos: ["Médico, Enfermeiro"],
              },
              {
                nome: "PapelProfissional",
                descricao: "Papel do profissional",
                versaoFhir: "R4/R5",
                exemplos: ["Cardiologista"],
              },
            ],
          },
          {
            id: "agendamento",
            nome: "Agendamento (L1)",
            descricao: "Agendamento de consultas",
            cor: "bg-cyan-100 border-cyan-300",
            corFundo: "bg-cyan-50",
            recursos: [
              {
                nome: "Agenda",
                descricao: "Agenda disponível",
                versaoFhir: "R4/R5",
                exemplos: ["Agenda de médico"],
              },
              {
                nome: "Slot",
                descricao: "Horário disponível",
                versaoFhir: "R4/R5",
                exemplos: ["Slot de 15 minutos"],
              },
              {
                nome: "Consulta",
                descricao: "Agendamento",
                versaoFhir: "R4/R5",
                exemplos: ["Consulta marcada"],
              },
              {
                nome: "RespostaConsulta",
                descricao: "Resposta do agendamento",
                versaoFhir: "R4/R5",
                exemplos: ["Confirmação"],
              },
            ],
          },
          {
            id: "comunicacao",
            nome: "Comunicação (L1)",
            descricao: "Comunicação e notificações",
            cor: "bg-cyan-100 border-cyan-300",
            corFundo: "bg-cyan-50",
            recursos: [
              {
                nome: "Comunicacao",
                descricao: "Comunicação",
                versaoFhir: "R4/R5",
                exemplos: ["Mensagem, Notificação"],
              },
              {
                nome: "SolicitacaoComunicacao",
                descricao: "Solicitação de comunicação",
                versaoFhir: "R4/R5",
                exemplos: ["Pedido de contato"],
              },
              {
                nome: "CabecalhoMensagem",
                descricao: "Cabeçalho de mensagem",
                versaoFhir: "R4/R5",
                exemplos: ["Metadados de mensagem"],
              },
            ],
          },
        ],
      },
    ],
  },
];
