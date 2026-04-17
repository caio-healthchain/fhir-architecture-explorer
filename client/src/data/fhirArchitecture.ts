export interface FhirResource {
  name: string;
  description: string;
  fhirVersion: string;
  examples?: string[];
}

export interface L2Function {
  id: string;
  name: string;
  description: string;
  resources: FhirResource[];
  color: string;
  bgColor: string;
}

export interface L1Module {
  id: string;
  name: string;
  description: string;
  functions: L2Function[];
  color: string;
  bgColor: string;
  icon: string;
}

export interface L0Layer {
  id: string;
  name: string;
  description: string;
  modules: L1Module[];
}

export const fhirArchitecture: L0Layer[] = [
  {
    id: "medications-module",
    name: "💊 Medicamentos",
    description: "Gerencia todo o ciclo de vida de medicamentos",
    modules: [
      {
        id: "medications-module",
        name: "Medicamentos",
        description: "Prescrição, dispensação e administração",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        icon: "💊",
        functions: [
          {
            id: "drug-knowledge",
            name: "Drug Knowledge (L1)",
            description: "Catálogo e definição de medicamentos",
            color: "bg-green-100 border-green-300",
            bgColor: "bg-green-50",
            resources: [
              {
                name: "MedicinalProductDefinition",
                description: "Definição de medicamento (CMED)",
                fhirVersion: "R4/R5",
                examples: ["Dipirona 500mg", "Amoxicilina 500mg"],
              },
              {
                name: "PackagedProductDefinition",
                description: "Embalagem do medicamento",
                fhirVersion: "R4/R5",
                examples: ["Blister com 10 comprimidos"],
              },
              {
                name: "Ingredient",
                description: "Ingredientes do medicamento",
                fhirVersion: "R4/R5",
                examples: ["Dipirona monoidratada"],
              },
              {
                name: "SubstanceDefinition",
                description: "Definição da substância ativa",
                fhirVersion: "R4/R5",
                examples: ["Paracetamol"],
              },
              {
                name: "Medication",
                description: "Medicamento (versão simplificada)",
                fhirVersion: "R4/R5",
                examples: ["Medicamento genérico"],
              },
            ],
          },
          {
            id: "prescription-dispensing",
            name: "Prescription & Dispensing (L1)",
            description: "Fluxo de prescrição, dispensação e administração",
            color: "bg-green-100 border-green-300",
            bgColor: "bg-green-50",
            resources: [
              {
                name: "MedicationRequest",
                description: "Solicitação/prescrição de medicamento",
                fhirVersion: "R4/R5",
                examples: ["Prescrição médica"],
              },
              {
                name: "MedicationDispense",
                description: "Dispensação de medicamento",
                fhirVersion: "R4/R5",
                examples: ["Entrega na farmácia"],
              },
              {
                name: "MedicationAdministration",
                description: "Administração do medicamento",
                fhirVersion: "R4/R5",
                examples: ["Aplicação em enfermaria"],
              },
              {
                name: "MedicationStatement",
                description: "Declaração de uso de medicamento",
                fhirVersion: "R4/R5",
                examples: ["Histórico de medicamentos"],
              },
            ],
          },
          {
            id: "immunization",
            name: "Immunization (L1)",
            description: "Gerenciamento de vacinações",
            color: "bg-green-100 border-green-300",
            bgColor: "bg-green-50",
            resources: [
              {
                name: "Immunization",
                description: "Registro de vacinação",
                fhirVersion: "R4/R5",
                examples: ["Vacina COVID-19"],
              },
              {
                name: "ImmunizationEvaluation",
                description: "Avaliação de cobertura vacinal",
                fhirVersion: "R4/R5",
                examples: ["Verificação de imunidade"],
              },
              {
                name: "ImmunizationRecommendation",
                description: "Recomendação de vacinação",
                fhirVersion: "R4/R5",
                examples: ["Próxima dose recomendada"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "clinical-module",
    name: "🏥 Clínico",
    description: "Informações clínicas do paciente",
    modules: [
      {
        id: "clinical-module",
        name: "Clínico",
        description: "Dados clínicos e atendimento",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        icon: "🏥",
        functions: [
          {
            id: "patient-demographics",
            name: "Patient & Demographics (L1)",
            description: "Dados demográficos e identificação",
            color: "bg-blue-100 border-blue-300",
            bgColor: "bg-blue-50",
            resources: [
              {
                name: "Patient",
                description: "Dados do paciente",
                fhirVersion: "R4/R5",
                examples: ["Nome, CPF, data de nascimento"],
              },
              {
                name: "RelatedPerson",
                description: "Pessoa relacionada ao paciente",
                fhirVersion: "R4/R5",
                examples: ["Responsável, familiar"],
              },
              {
                name: "Person",
                description: "Pessoa genérica",
                fhirVersion: "R4/R5",
                examples: ["Registro de pessoa"],
              },
            ],
          },
          {
            id: "encounter-visits",
            name: "Encounter & Visits (L1)",
            description: "Registro de encontros/visitas",
            color: "bg-blue-100 border-blue-300",
            bgColor: "bg-blue-50",
            resources: [
              {
                name: "Encounter",
                description: "Encontro clínico (internação, consulta)",
                fhirVersion: "R4/R5",
                examples: ["Internação hospitalar"],
              },
              {
                name: "EpisodeOfCare",
                description: "Série de encontros relacionados",
                fhirVersion: "R4/R5",
                examples: ["Tratamento de diabetes"],
              },
              {
                name: "Location",
                description: "Local do atendimento",
                fhirVersion: "R4/R5",
                examples: ["Leito 101, Enfermaria A"],
              },
            ],
          },
          {
            id: "conditions-diagnoses",
            name: "Conditions & Diagnoses (L1)",
            description: "Diagnósticos e condições clínicas",
            color: "bg-blue-100 border-blue-300",
            bgColor: "bg-blue-50",
            resources: [
              {
                name: "Condition",
                description: "Diagnóstico ou condição clínica",
                fhirVersion: "R4/R5",
                examples: ["Hipertensão, Diabetes"],
              },
              {
                name: "Observation",
                description: "Observação clínica",
                fhirVersion: "R4/R5",
                examples: ["Pressão arterial, Temperatura"],
              },
              {
                name: "FamilyMemberHistory",
                description: "Histórico familiar",
                fhirVersion: "R4/R5",
                examples: ["Câncer na família"],
              },
            ],
          },
          {
            id: "procedures-services",
            name: "Procedures & Services (L1)",
            description: "Procedimentos e serviços prestados",
            color: "bg-blue-100 border-blue-300",
            bgColor: "bg-blue-50",
            resources: [
              {
                name: "Procedure",
                description: "Procedimento realizado",
                fhirVersion: "R4/R5",
                examples: ["Cirurgia, Punção"],
              },
              {
                name: "ServiceRequest",
                description: "Solicitação de serviço",
                fhirVersion: "R4/R5",
                examples: ["Solicitação de exame"],
              },
              {
                name: "ActivityDefinition",
                description: "Definição de atividade/procedimento",
                fhirVersion: "R4/R5",
                examples: ["Protocolo de procedimento"],
              },
            ],
          },
          {
            id: "observations-results",
            name: "Observations & Results (L1)",
            description: "Observações clínicas e resultados",
            color: "bg-blue-100 border-blue-300",
            bgColor: "bg-blue-50",
            resources: [
              {
                name: "Observation",
                description: "Observação clínica",
                fhirVersion: "R4/R5",
                examples: ["Resultado de exame"],
              },
              {
                name: "DiagnosticReport",
                description: "Relatório diagnóstico",
                fhirVersion: "R4/R5",
                examples: ["Resultado de laboratorio"],
              },
              {
                name: "SpecimenDefinition",
                description: "Definição de amostra",
                fhirVersion: "R4/R5",
                examples: ["Sangue, Urina"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "devices-module",
    name: "🏥 Dispositivos & Materiais",
    description: "Gerencia dispositivos médicos e OPME",
    modules: [
      {
        id: "devices-module",
        name: "Dispositivos & Materiais",
        description: "OPME e dispositivos médicos",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        icon: "🏥",
        functions: [
          {
            id: "device-knowledge",
            name: "Device Knowledge (L1)",
            description: "Catálogo de dispositivos e materiais",
            color: "bg-orange-100 border-orange-300",
            bgColor: "bg-orange-50",
            resources: [
              {
                name: "DeviceDefinition",
                description: "Definição de dispositivo (TUSS 19)",
                fhirVersion: "R4/R5",
                examples: ["Cateter, Agulha"],
              },
              {
                name: "ManufacturedItemDefinition",
                description: "Item manufaturado",
                fhirVersion: "R4/R5",
                examples: ["Produto final"],
              },
              {
                name: "SpecimenDefinition",
                description: "Definição de amostra",
                fhirVersion: "R4/R5",
                examples: ["Tipo de coleta"],
              },
            ],
          },
          {
            id: "device-usage",
            name: "Device Usage (L1)",
            description: "Utilização de dispositivos",
            color: "bg-orange-100 border-orange-300",
            bgColor: "bg-orange-50",
            resources: [
              {
                name: "Device",
                description: "Instância de dispositivo",
                fhirVersion: "R4/R5",
                examples: ["Cateter específico"],
              },
              {
                name: "DeviceUsage",
                description: "Uso do dispositivo",
                fhirVersion: "R4/R5",
                examples: ["Aplicação em paciente"],
              },
              {
                name: "DeviceMetric",
                description: "Métrica do dispositivo",
                fhirVersion: "R4/R5",
                examples: ["Medições"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "diagnostics-module",
    name: "🔬 Diagnósticos",
    description: "Gerencia exames e resultados",
    modules: [
      {
        id: "diagnostics-module",
        name: "Diagnósticos",
        description: "Exames, testes e resultados",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        icon: "🔬",
        functions: [
          {
            id: "diagnostic-knowledge",
            name: "Diagnostic Knowledge (L1)",
            description: "Catálogo de exames e testes",
            color: "bg-purple-100 border-purple-300",
            bgColor: "bg-purple-50",
            resources: [
              {
                name: "ActivityDefinition",
                description: "Definição de exame (TUSS 22)",
                fhirVersion: "R4/R5",
                examples: ["Hemograma, Tomografia"],
              },
              {
                name: "PlanDefinition",
                description: "Plano de diagnóstico",
                fhirVersion: "R4/R5",
                examples: ["Protocolo de exame"],
              },
              {
                name: "SpecimenDefinition",
                description: "Definição de amostra",
                fhirVersion: "R4/R5",
                examples: ["Sangue, Saliva"],
              },
            ],
          },
          {
            id: "diagnostic-execution",
            name: "Diagnostic Execution (L1)",
            description: "Solicitação e execução de exames",
            color: "bg-purple-100 border-purple-300",
            bgColor: "bg-purple-50",
            resources: [
              {
                name: "ServiceRequest",
                description: "Solicitação de exame",
                fhirVersion: "R4/R5",
                examples: ["Pedido de hemograma"],
              },
              {
                name: "Specimen",
                description: "Amostra coletada",
                fhirVersion: "R4/R5",
                examples: ["Amostra de sangue"],
              },
              {
                name: "DiagnosticReport",
                description: "Resultado do exame",
                fhirVersion: "R4/R5",
                examples: ["Laudo"],
              },
              {
                name: "Observation",
                description: "Observação do resultado",
                fhirVersion: "R4/R5",
                examples: ["Valor medido"],
              },
            ],
          },
          {
            id: "imaging",
            name: "Imaging (L1)",
            description: "Exames de imagem",
            color: "bg-purple-100 border-purple-300",
            bgColor: "bg-purple-50",
            resources: [
              {
                name: "ImagingStudy",
                description: "Estudo de imagem",
                fhirVersion: "R4/R5",
                examples: ["Tomografia, Ressonância"],
              },
              {
                name: "ImagingSelection",
                description: "Seleção de imagens",
                fhirVersion: "R4/R5",
                examples: ["Imagens relevantes"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "financial-module",
    name: "💰 Faturamento",
    description: "Gerencia faturamento e cobertura",
    modules: [
      {
        id: "financial-module",
        name: "Faturamento",
        description: "Guias, contas e pagamentos",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50",
        icon: "💰",
        functions: [
          {
            id: "claims-billing",
            name: "Claims & Billing (L1)",
            description: "Geração e processamento de guias",
            color: "bg-red-100 border-red-300",
            bgColor: "bg-red-50",
            resources: [
              {
                name: "Claim",
                description: "Guia/fatura (TISS)",
                fhirVersion: "R4/R5",
                examples: ["Guia de internação"],
              },
              {
                name: "ClaimResponse",
                description: "Resposta da operadora",
                fhirVersion: "R4/R5",
                examples: ["Aprovação/rejeição"],
              },
              {
                name: "Invoice",
                description: "Fatura",
                fhirVersion: "R4/R5",
                examples: ["Nota fiscal"],
              },
              {
                name: "ChargeItem",
                description: "Item de cobrança",
                fhirVersion: "R4/R5",
                examples: ["Procedimento cobrado"],
              },
            ],
          },
          {
            id: "coverage-eligibility",
            name: "Coverage & Eligibility (L1)",
            description: "Planos de saúde e cobertura",
            color: "bg-red-100 border-red-300",
            bgColor: "bg-red-50",
            resources: [
              {
                name: "Coverage",
                description: "Plano de saúde",
                fhirVersion: "R4/R5",
                examples: ["Plano de saúde"],
              },
              {
                name: "CoverageEligibilityRequest",
                description: "Verificação de elegibilidade",
                fhirVersion: "R4/R5",
                examples: ["Verificação de cobertura"],
              },
              {
                name: "CoverageEligibilityResponse",
                description: "Resposta de elegibilidade",
                fhirVersion: "R4/R5",
                examples: ["Resultado da verificação"],
              },
            ],
          },
          {
            id: "accounts-payments",
            name: "Accounts & Payments (L1)",
            description: "Gestão de contas e pagamentos",
            color: "bg-red-100 border-red-300",
            bgColor: "bg-red-50",
            resources: [
              {
                name: "Account",
                description: "Conta do paciente",
                fhirVersion: "R4/R5",
                examples: ["Saldo devedor"],
              },
              {
                name: "PaymentNotice",
                description: "Notificação de pagamento",
                fhirVersion: "R4/R5",
                examples: ["Aviso de pagamento"],
              },
              {
                name: "PaymentReconciliation",
                description: "Reconciliação de pagamento",
                fhirVersion: "R4/R5",
                examples: ["Confirmação de recebimento"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "administrative-module",
    name: "📋 Administrativo",
    description: "Gerencia informações administrativas",
    modules: [
      {
        id: "administrative-module",
        name: "Administrativo",
        description: "Organização, agendamento e comunicação",
        color: "from-cyan-500 to-cyan-600",
        bgColor: "bg-cyan-50",
        icon: "📋",
        functions: [
          {
            id: "organization-roles",
            name: "Organization & Roles (L1)",
            description: "Estrutura organizacional",
            color: "bg-cyan-100 border-cyan-300",
            bgColor: "bg-cyan-50",
            resources: [
              {
                name: "Organization",
                description: "Organização/hospital",
                fhirVersion: "R4/R5",
                examples: ["Hospital São Paulo"],
              },
              {
                name: "OrganizationAffiliation",
                description: "Afiliação organizacional",
                fhirVersion: "R4/R5",
                examples: ["Filial, Parceria"],
              },
              {
                name: "Practitioner",
                description: "Profissional de saúde",
                fhirVersion: "R4/R5",
                examples: ["Médico, Enfermeiro"],
              },
              {
                name: "PractitionerRole",
                description: "Papel do profissional",
                fhirVersion: "R4/R5",
                examples: ["Cardiologista"],
              },
            ],
          },
          {
            id: "scheduling",
            name: "Scheduling (L1)",
            description: "Agendamento de consultas",
            color: "bg-cyan-100 border-cyan-300",
            bgColor: "bg-cyan-50",
            resources: [
              {
                name: "Schedule",
                description: "Agenda disponível",
                fhirVersion: "R4/R5",
                examples: ["Agenda de médico"],
              },
              {
                name: "Slot",
                description: "Horário disponível",
                fhirVersion: "R4/R5",
                examples: ["Slot de 15 minutos"],
              },
              {
                name: "Appointment",
                description: "Agendamento",
                fhirVersion: "R4/R5",
                examples: ["Consulta marcada"],
              },
              {
                name: "AppointmentResponse",
                description: "Resposta do agendamento",
                fhirVersion: "R4/R5",
                examples: ["Confirmação"],
              },
            ],
          },
          {
            id: "communication",
            name: "Communication (L1)",
            description: "Comunicação e notificações",
            color: "bg-cyan-100 border-cyan-300",
            bgColor: "bg-cyan-50",
            resources: [
              {
                name: "Communication",
                description: "Comunicação",
                fhirVersion: "R4/R5",
                examples: ["Mensagem, Notificação"],
              },
              {
                name: "CommunicationRequest",
                description: "Solicitação de comunicação",
                fhirVersion: "R4/R5",
                examples: ["Pedido de contato"],
              },
              {
                name: "MessageHeader",
                description: "Cabeçalho de mensagem",
                fhirVersion: "R4/R5",
                examples: ["Metadados de mensagem"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "terminology-layer",
    name: "📚 Terminologia",
    description: "Padrões de codificação brasileiros",
    modules: [
      {
        id: "terminology-module",
        name: "Terminologia",
        description: "CodeSystems, ValueSets e ConceptMaps",
        color: "from-yellow-500 to-yellow-600",
        bgColor: "bg-yellow-50",
        icon: "📚",
        functions: [
          {
            id: "codesystems",
            name: "CodeSystems (L1)",
            description: "Sistemas de codificação",
            color: "bg-yellow-100 border-yellow-300",
            bgColor: "bg-yellow-50",
            resources: [
              {
                name: "CodeSystem",
                description: "Sistema de códigos",
                fhirVersion: "R4/R5",
                examples: ["CID-10, TISS, TUSS"],
              },
            ],
          },
          {
            id: "valuesets",
            name: "ValueSets (L1)",
            description: "Conjuntos de valores permitidos",
            color: "bg-yellow-100 border-yellow-300",
            bgColor: "bg-yellow-50",
            resources: [
              {
                name: "ValueSet",
                description: "Conjunto de valores",
                fhirVersion: "R4/R5",
                examples: ["Tipos de procedimento"],
              },
            ],
          },
          {
            id: "conceptmaps",
            name: "ConceptMaps (L1)",
            description: "Mapeamento entre sistemas",
            color: "bg-yellow-100 border-yellow-300",
            bgColor: "bg-yellow-50",
            resources: [
              {
                name: "ConceptMap",
                description: "Mapa de conceitos",
                fhirVersion: "R4/R5",
                examples: ["CID-10 → SNOMED"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "infrastructure-layer",
    name: "🔐 Infraestrutura & Segurança",
    description: "Segurança, conformidade e auditoria",
    modules: [
      {
        id: "infrastructure-module",
        name: "Infraestrutura & Segurança",
        description: "Segurança, conformidade e auditoria",
        color: "from-gray-500 to-gray-600",
        bgColor: "bg-gray-50",
        icon: "🔐",
        functions: [
          {
            id: "security-privacy",
            name: "Security & Privacy (L1)",
            description: "Controle de acesso e privacidade",
            color: "bg-gray-100 border-gray-300",
            bgColor: "bg-gray-50",
            resources: [
              {
                name: "Consent",
                description: "Consentimento do paciente",
                fhirVersion: "R4/R5",
                examples: ["LGPD, Privacidade"],
              },
              {
                name: "Provenance",
                description: "Rastreabilidade de dados",
                fhirVersion: "R4/R5",
                examples: ["Quem fez o quê"],
              },
              {
                name: "AuditEvent",
                description: "Evento de auditoria",
                fhirVersion: "R4/R5",
                examples: ["Log de acesso"],
              },
            ],
          },
          {
            id: "conformance",
            name: "Conformance (L1)",
            description: "Perfis e conformidade",
            color: "bg-gray-100 border-gray-300",
            bgColor: "bg-gray-50",
            resources: [
              {
                name: "StructureDefinition",
                description: "Definição de perfil FHIR",
                fhirVersion: "R4/R5",
                examples: ["Perfil customizado"],
              },
              {
                name: "CapabilityStatement",
                description: "Capacidades do servidor",
                fhirVersion: "R4/R5",
                examples: ["API disponível"],
              },
              {
                name: "ImplementationGuide",
                description: "Guia de implementação",
                fhirVersion: "R4/R5",
                examples: ["Documentação"],
              },
            ],
          },
        ],
      },
    ],
  },
];
