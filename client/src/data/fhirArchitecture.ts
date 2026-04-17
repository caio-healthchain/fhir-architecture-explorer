// ============================================
// TIPOS E INTERFACES
// ============================================

export interface RecursoFhir {
  nome: string;
  descricao: string;
  versaoFhir: string;
  exemplos?: string[];
}

export interface Componente {
  id: string;
  tipo: 'api' | 'agente' | 'miniapp' | 'database' | 'eventbroker' | 'conector';
  nome: string;
  descricao: string;
  tecnologia?: string;
}

export interface SwaggerEndpoint {
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  caminho: string;
  descricao: string;
  parametros?: string[];
  resposta?: string;
}

export interface Observabilidade {
  logs: string;
  metricas: string;
  traces: string;
}

export interface DataLineage {
  origem: string;
  destino: string;
  tipo: string;
}

export interface Microsservico {
  id: string;
  nome: string;
  descricao: string;
  namespace: string;
  schema: string;
  componentes: Componente[];
  swagger: SwaggerEndpoint[];
  observabilidade: Observabilidade;
  dataLineage: DataLineage[];
}

export interface FuncaoL2 {
  id: string;
  nome: string;
  descricao: string;
  recursos: RecursoFhir[];
  cor: string;
  corFundo: string;
  microsservico?: Microsservico;
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

// ============================================
// MICROSSERVIÇOS
// ============================================

export const msCoreTerminologies: Microsservico = {
  id: 'ms-core-terminologies',
  nome: 'ms-core-terminologies',
  descricao: 'Gerenciamento de sistemas de codificação, conjuntos de valores e mapeamento de conceitos',
  namespace: 'ns-core-terminologies',
  schema: 'core_terminologies',
  componentes: [
    {
      id: 'api-terminologies',
      tipo: 'api',
      nome: 'API FHIR Terminologies',
      descricao: 'Endpoints RESTful para CodeSystem, ValueSet, ConceptMap',
      tecnologia: 'Spring Boot 3.0'
    },
    {
      id: 'db-terminologies',
      tipo: 'database',
      nome: 'PostgreSQL - Terminologies',
      descricao: 'Schema core_terminologies com tabelas de codificação',
      tecnologia: 'PostgreSQL 15'
    },
    {
      id: 'cache-terminologies',
      tipo: 'agente',
      nome: 'Redis Cache',
      descricao: 'Cache distribuído para CodeSystems frequentes',
      tecnologia: 'Redis 7'
    }
  ],
  swagger: [
    {
      metodo: 'GET',
      caminho: '/fhir/CodeSystem',
      descricao: 'Listar todos os sistemas de codificação',
      resposta: 'Bundle de CodeSystem'
    },
    {
      metodo: 'GET',
      caminho: '/fhir/CodeSystem/{id}',
      descricao: 'Obter um sistema de codificação específico',
      parametros: ['id'],
      resposta: 'CodeSystem'
    }
  ],
  observabilidade: {
    logs: 'Stackdriver Logging - /logs/ms-core-terminologies',
    metricas: 'Prometheus - Port 9090',
    traces: 'Jaeger - Port 16686'
  },
  dataLineage: [
    { origem: 'ANVISA', destino: 'core_terminologies.codesystems', tipo: 'import' },
    { origem: 'core_terminologies', destino: 'ms-core-medications-catalog', tipo: 'reference' }
  ]
};

export const msCoreMedicationsCatalog: Microsservico = {
  id: 'ms-core-medications-catalog',
  nome: 'ms-core-medications-catalog',
  descricao: 'Catálogo de medicamentos CMED com definições, preços e conformidade FHIR',
  namespace: 'ns-core-medications',
  schema: 'core_medications',
  componentes: [
    {
      id: 'api-medications',
      tipo: 'api',
      nome: 'API FHIR Medications',
      descricao: 'Endpoints RESTful para MedicinalProductDefinition, Medication',
      tecnologia: 'Spring Boot 3.0'
    },
    {
      id: 'db-medications',
      tipo: 'database',
      nome: 'PostgreSQL - Medications',
      descricao: 'Schema core_medications com tabela CMED',
      tecnologia: 'PostgreSQL 15'
    },
    {
      id: 'worker-cmed-import',
      tipo: 'agente',
      nome: 'Worker CMED Import',
      descricao: 'Importa tabela CMED mensalmente da ANVISA',
      tecnologia: 'Node.js + Bull Queue'
    },
    {
      id: 'conector-anvisa',
      tipo: 'conector',
      nome: 'Conector ANVISA',
      descricao: 'Integração com API/Portal da ANVISA para download CMED',
      tecnologia: 'REST Client'
    }
  ],
  swagger: [
    {
      metodo: 'GET',
      caminho: '/fhir/MedicinalProductDefinition',
      descricao: 'Listar medicamentos do catálogo CMED',
      parametros: ['name', 'laboratory', 'ean'],
      resposta: 'Bundle de MedicinalProductDefinition'
    },
    {
      metodo: 'GET',
      caminho: '/fhir/MedicinalProductDefinition/{id}',
      descricao: 'Obter medicamento específico',
      parametros: ['id'],
      resposta: 'MedicinalProductDefinition com preços e composição'
    }
  ],
  observabilidade: {
    logs: 'Stackdriver Logging - /logs/ms-core-medications-catalog',
    metricas: 'Prometheus - Port 9091 (medicamentos importados, tempo de resposta)',
    traces: 'Jaeger - Port 16686 (rastreamento de requisições)'
  },
  dataLineage: [
    { origem: 'ANVISA CMED', destino: 'core_medications.medicamentos', tipo: 'import' },
    { origem: 'core_medications', destino: 'ms-clinical-prescriptions', tipo: 'reference' },
    { origem: 'core_medications', destino: 'ms-financial-claims', tipo: 'reference' }
  ]
};

export const msCoreDevicesCatalog: Microsservico = {
  id: 'ms-core-devices-catalog',
  nome: 'ms-core-devices-catalog',
  descricao: 'Catálogo de materiais e dispositivos OPME com conformidade FHIR',
  namespace: 'ns-core-devices',
  schema: 'core_devices',
  componentes: [
    {
      id: 'api-devices',
      tipo: 'api',
      nome: 'API FHIR Devices',
      descricao: 'Endpoints RESTful para DeviceDefinition, ManufacturedItemDefinition',
      tecnologia: 'Spring Boot 3.0'
    },
    {
      id: 'db-devices',
      tipo: 'database',
      nome: 'PostgreSQL - Devices',
      descricao: 'Schema core_devices com tabela TUSS 19',
      tecnologia: 'PostgreSQL 15'
    }
  ],
  swagger: [
    {
      metodo: 'GET',
      caminho: '/fhir/DeviceDefinition',
      descricao: 'Listar dispositivos e materiais do catálogo TUSS',
      parametros: ['manufacturer', 'type'],
      resposta: 'Bundle de DeviceDefinition'
    }
  ],
  observabilidade: {
    logs: 'Stackdriver Logging - /logs/ms-core-devices-catalog',
    metricas: 'Prometheus - Port 9092',
    traces: 'Jaeger - Port 16686'
  },
  dataLineage: [
    { origem: 'ANS TUSS 19', destino: 'core_devices.materiais', tipo: 'import' },
    { origem: 'core_devices', destino: 'ms-clinical-procedures', tipo: 'reference' }
  ]
};

export const msCoreProceduresCatalog: Microsservico = {
  id: 'ms-core-procedures-catalog',
  nome: 'ms-core-procedures-catalog',
  descricao: 'Catálogo de procedimentos e exames com conformidade FHIR',
  namespace: 'ns-core-procedures',
  schema: 'core_procedures',
  componentes: [
    {
      id: 'api-procedures',
      tipo: 'api',
      nome: 'API FHIR Procedures',
      descricao: 'Endpoints RESTful para ActivityDefinition, ServiceRequest',
      tecnologia: 'Spring Boot 3.0'
    },
    {
      id: 'db-procedures',
      tipo: 'database',
      nome: 'PostgreSQL - Procedures',
      descricao: 'Schema core_procedures com tabela TUSS 22',
      tecnologia: 'PostgreSQL 15'
    }
  ],
  swagger: [
    {
      metodo: 'GET',
      caminho: '/fhir/ActivityDefinition',
      descricao: 'Listar procedimentos do catálogo TUSS',
      parametros: ['category', 'code'],
      resposta: 'Bundle de ActivityDefinition'
    }
  ],
  observabilidade: {
    logs: 'Stackdriver Logging - /logs/ms-core-procedures-catalog',
    metricas: 'Prometheus - Port 9093',
    traces: 'Jaeger - Port 16686'
  },
  dataLineage: [
    { origem: 'ANS TUSS 22', destino: 'core_procedures.procedimentos', tipo: 'import' },
    { origem: 'core_procedures', destino: 'ms-clinical-procedures', tipo: 'reference' }
  ]
};

export const msCoreDiagnosticsCatalog: Microsservico = {
  id: 'ms-core-diagnostics-catalog',
  nome: 'ms-core-diagnostics-catalog',
  descricao: 'Catálogo de diagnósticos com CID-10/11 e conformidade FHIR',
  namespace: 'ns-core-diagnostics',
  schema: 'core_diagnostics',
  componentes: [
    {
      id: 'api-diagnostics',
      tipo: 'api',
      nome: 'API FHIR Diagnostics',
      descricao: 'Endpoints RESTful para CodeSystem de diagnósticos',
      tecnologia: 'Spring Boot 3.0'
    },
    {
      id: 'db-diagnostics',
      tipo: 'database',
      nome: 'PostgreSQL - Diagnostics',
      descricao: 'Schema core_diagnostics com tabela CID-10/11',
      tecnologia: 'PostgreSQL 15'
    }
  ],
  swagger: [
    {
      metodo: 'GET',
      caminho: '/fhir/CodeSystem/icd10',
      descricao: 'Listar diagnósticos CID-10',
      parametros: ['code', 'description'],
      resposta: 'Bundle de Condition'
    }
  ],
  observabilidade: {
    logs: 'Stackdriver Logging - /logs/ms-core-diagnostics-catalog',
    metricas: 'Prometheus - Port 9094',
    traces: 'Jaeger - Port 16686'
  },
  dataLineage: [
    { origem: 'DATASUS CID-10', destino: 'core_diagnostics.diagnosticos', tipo: 'import' },
    { origem: 'core_diagnostics', destino: 'ms-clinical-conditions', tipo: 'reference' }
  ]
};

// ============================================
// ARQUITETURA FHIR
// ============================================

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
            microsservico: msCoreTerminologies
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
            microsservico: msCoreTerminologies
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
            microsservico: msCoreTerminologies
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
                nome: "Medicamento",
                descricao: "Medicamento (versão simplificada)",
                versaoFhir: "R4/R5",
                exemplos: ["Medicamento genérico"],
              },
            ],
            microsservico: msCoreMedicationsCatalog
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
            ],
            microsservico: msCoreMedicationsCatalog
          },
        ],
      },
      {
        id: "dispositivos-modulo",
        nome: "Dispositivos & Materiais",
        descricao: "Gestão de materiais e dispositivos médicos",
        cor: "from-orange-500 to-orange-600",
        corFundo: "bg-orange-50",
        icone: "🏥",
        funcoes: [
          {
            id: "conhecimento-dispositivos",
            nome: "Conhecimento de Dispositivos (L1)",
            descricao: "Catálogo de materiais e dispositivos OPME",
            cor: "bg-orange-100 border-orange-300",
            corFundo: "bg-orange-50",
            recursos: [
              {
                nome: "DefinicaoDispositivo",
                descricao: "Definição de dispositivo/material (TUSS 19)",
                versaoFhir: "R4/R5",
                exemplos: ["Cateter venoso", "Agulha hipodérmica"],
              },
            ],
            microsservico: msCoreDevicesCatalog
          },
        ],
      },
      {
        id: "procedimentos-modulo",
        nome: "Procedimentos & Exames",
        descricao: "Gestão de procedimentos e exames clínicos",
        cor: "from-purple-500 to-purple-600",
        corFundo: "bg-purple-50",
        icone: "🔬",
        funcoes: [
          {
            id: "conhecimento-procedimentos",
            nome: "Conhecimento de Procedimentos (L1)",
            descricao: "Catálogo de procedimentos e exames TUSS",
            cor: "bg-purple-100 border-purple-300",
            corFundo: "bg-purple-50",
            recursos: [
              {
                nome: "DefinicaoAtividade",
                descricao: "Definição de procedimento/exame (TUSS 22)",
                versaoFhir: "R4/R5",
                exemplos: ["Ressonância magnética", "Eletrocardiograma"],
              },
            ],
            microsservico: msCoreProceduresCatalog
          },
        ],
      },
      {
        id: "diagnosticos-modulo",
        nome: "Diagnósticos",
        descricao: "Gestão de diagnósticos e condições clínicas",
        cor: "from-pink-500 to-pink-600",
        corFundo: "bg-pink-50",
        icone: "📋",
        funcoes: [
          {
            id: "conhecimento-diagnosticos",
            nome: "Conhecimento de Diagnósticos (L1)",
            descricao: "Catálogo de diagnósticos CID-10/11",
            cor: "bg-pink-100 border-pink-300",
            corFundo: "bg-pink-50",
            recursos: [
              {
                nome: "SistemaCodeDiagnostico",
                descricao: "Sistema de códigos de diagnóstico (CID-10/11)",
                versaoFhir: "R4/R5",
                exemplos: ["A00.0 - Cólera", "J45.9 - Asma não especificada"],
              },
            ],
            microsservico: msCoreDiagnosticsCatalog
          },
        ],
      },
      {
        id: "faturamento-modulo",
        nome: "Faturamento",
        descricao: "Gestão de faturamento e cobrança",
        cor: "from-blue-500 to-blue-600",
        corFundo: "bg-blue-50",
        icone: "💰",
        funcoes: [
          {
            id: "conhecimento-faturamento",
            nome: "Conhecimento de Faturamento (L1)",
            descricao: "Estrutura de faturamento e cobrança",
            cor: "bg-blue-100 border-blue-300",
            corFundo: "bg-blue-50",
            recursos: [
              {
                nome: "Reclamacao",
                descricao: "Reclamação/fatura de serviço",
                versaoFhir: "R4/R5",
                exemplos: ["Fatura de internação"],
              },
            ],
            microsservico: undefined
          },
        ],
      },
      {
        id: "administrativo-modulo",
        nome: "Administrativo",
        descricao: "Gestão administrativa e organizacional",
        cor: "from-indigo-500 to-indigo-600",
        corFundo: "bg-indigo-50",
        icone: "🏢",
        funcoes: [
          {
            id: "conhecimento-administrativo",
            nome: "Conhecimento Administrativo (L1)",
            descricao: "Estrutura organizacional e administrativa",
            cor: "bg-indigo-100 border-indigo-300",
            corFundo: "bg-indigo-50",
            recursos: [
              {
                nome: "Organizacao",
                descricao: "Organização/Hospital",
                versaoFhir: "R4/R5",
                exemplos: ["Hospital São Paulo"],
              },
            ],
            microsservico: undefined
          },
        ],
      },
    ],
  },
];
