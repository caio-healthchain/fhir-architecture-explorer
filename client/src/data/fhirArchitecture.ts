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
}

export interface L1Module {
  id: string;
  name: string;
  description: string;
  functions: L2Function[];
  color: string;
}

export interface L0Layer {
  id: string;
  name: string;
  description: string;
  modules: L1Module[];
}

export const fhirArchitecture: L0Layer[] = [
  {
    id: "infrastructure",
    name: "Infrastructure (L0)",
    description: "Framework básico e suporte à implementação",
    modules: [
      {
        id: "foundation-module",
        name: "Foundation Module",
        description: "Módulo base com terminologias e padrões de troca de dados",
        color: "bg-blue-100 border-blue-300",
        functions: [
          {
            id: "terminologies",
            name: "Terminologies",
            description: "Definição de CodeSystems e ValueSets para padrões brasileiros",
            color: "bg-blue-50",
            resources: [
              {
                name: "CodeSystem",
                description: "Define um conjunto de códigos (ex: CMED, TUSS, CID-10)",
                fhirVersion: "R4/R5",
                examples: ["CMED - Câmara de Regulação de Medicamentos", "TUSS - Terminologia Unificada da Saúde Suplementar", "CID-10 - Classificação Internacional de Doenças"],
              },
              {
                name: "ValueSet",
                description: "Subconjunto de códigos utilizáveis em um contexto específico",
                fhirVersion: "R4/R5",
                examples: ["Medicamentos Disponíveis no SUS", "Procedimentos Cobertos por Operadora"],
              },
              {
                name: "ConceptMap",
                description: "Mapeamento entre diferentes terminologias",
                fhirVersion: "R4/R5",
                examples: ["TUSS ↔ CBHPM", "CID-10 ↔ SNOMED CT"],
              },
            ],
          },
          {
            id: "security-privacy",
            name: "Security & Privacy",
            description: "Recursos para proteção, consentimento e auditoria",
            color: "bg-blue-50",
            resources: [
              {
                name: "Consent",
                description: "Registro de consentimento do paciente",
                fhirVersion: "R4/R5",
              },
              {
                name: "Provenance",
                description: "Rastreamento de quem fez o quê e quando",
                fhirVersion: "R4/R5",
              },
              {
                name: "AuditEvent",
                description: "Registro de eventos de auditoria",
                fhirVersion: "R4/R5",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "content",
    name: "Content (L1)",
    description: "Conceitos clínicos e administrativos do mundo real",
    modules: [
      {
        id: "medications-module",
        name: "Medications Module",
        description: "Medicamentos, prescrição, dispensação e administração",
        color: "bg-emerald-100 border-emerald-300",
        functions: [
          {
            id: "drug-knowledge",
            name: "Drug Knowledge Domain (L2)",
            description: "Catálogo e definição de medicamentos",
            color: "bg-emerald-50",
            resources: [
              {
                name: "MedicinalProductDefinition",
                description: "Definição detalhada de um produto medicinal (conceito)",
                fhirVersion: "R5+",
                examples: ["Dipirona 500mg", "Amoxicilina 250mg/5mL suspensão"],
              },
              {
                name: "PackagedProductDefinition",
                description: "Descrição de embalagem e apresentação",
                fhirVersion: "R5+",
                examples: ["Caixa com 20 comprimidos", "Frasco com 100mL de suspensão"],
              },
              {
                name: "AdministrableProductDefinition",
                description: "Forma final pronta para administração",
                fhirVersion: "R5+",
              },
              {
                name: "Ingredient",
                description: "Ingredientes de um produto",
                fhirVersion: "R5+",
                examples: ["Dipirona monoidratada", "Amoxicilina trihidratada"],
              },
              {
                name: "SubstanceDefinition",
                description: "Descrição detalhada de uma substância",
                fhirVersion: "R5+",
              },
              {
                name: "Medication",
                description: "Medicamento específico (instância)",
                fhirVersion: "R4/R5",
              },
            ],
          },
          {
            id: "prescription-dispensing",
            name: "Prescription/Dispensing Domain (L2)",
            description: "Fluxo de medicamento: prescrição → dispensação → administração",
            color: "bg-emerald-50",
            resources: [
              {
                name: "MedicationRequest",
                description: "Instrução para administração (prescrição/ordem)",
                fhirVersion: "R4/R5",
                examples: ["Dipirona 500mg a cada 6 horas"],
              },
              {
                name: "MedicationDispense",
                description: "Fornecimento em resposta a uma prescrição",
                fhirVersion: "R4/R5",
              },
              {
                name: "MedicationAdministration",
                description: "Registro de consumo real do medicamento",
                fhirVersion: "R4/R5",
              },
              {
                name: "MedicationStatement",
                description: "Relato de medicação atual/passada/futura",
                fhirVersion: "R4/R5",
              },
            ],
          },
        ],
      },
      {
        id: "materials-devices-module",
        name: "Materials & Devices Module",
        description: "Materiais, OPME e dispositivos médicos",
        color: "bg-amber-100 border-amber-300",
        functions: [
          {
            id: "device-knowledge",
            name: "Device Knowledge Domain (L2)",
            description: "Catálogo de materiais e dispositivos",
            color: "bg-amber-50",
            resources: [
              {
                name: "DeviceDefinition",
                description: "Definição de um tipo de dispositivo/material",
                fhirVersion: "R4/R5",
                examples: ["Cateter Venoso Central 14G", "Fio de Sutura Absorvível"],
              },
              {
                name: "Device",
                description: "Instância física de um dispositivo",
                fhirVersion: "R4/R5",
                examples: ["Cateter com número de série XYZ implantado"],
              },
              {
                name: "ManufacturedItemDefinition",
                description: "Descrição de item fabricado",
                fhirVersion: "R5+",
              },
            ],
          },
        ],
      },
      {
        id: "procedures-module",
        name: "Procedures & Services Module",
        description: "Procedimentos, exames e serviços",
        color: "bg-purple-100 border-purple-300",
        functions: [
          {
            id: "procedure-knowledge",
            name: "Procedure Knowledge Domain (L2)",
            description: "Catálogo de procedimentos e exames",
            color: "bg-purple-50",
            resources: [
              {
                name: "ActivityDefinition",
                description: "Definição genérica de um procedimento/exame",
                fhirVersion: "R4/R5",
                examples: ["Apendicectomia", "Ressonância Magnética", "Hemograma"],
              },
              {
                name: "PlanDefinition",
                description: "Plano pré-definido com ações condicionais",
                fhirVersion: "R4/R5",
              },
            ],
          },
          {
            id: "procedure-execution",
            name: "Procedure Execution Domain (L2)",
            description: "Solicitação e execução de procedimentos",
            color: "bg-purple-50",
            resources: [
              {
                name: "ServiceRequest",
                description: "Solicitação de um serviço/procedimento",
                fhirVersion: "R4/R5",
                examples: ["Solicitação de Hemograma", "Pedido de Ultrassom"],
              },
              {
                name: "Procedure",
                description: "Registro de um procedimento realizado",
                fhirVersion: "R4/R5",
              },
              {
                name: "DiagnosticReport",
                description: "Resultado de um exame/diagnóstico",
                fhirVersion: "R4/R5",
              },
            ],
          },
        ],
      },
      {
        id: "diagnostics-module",
        name: "Diagnostics Module",
        description: "Diagnósticos, observações e condições",
        color: "bg-rose-100 border-rose-300",
        functions: [
          {
            id: "diagnosis-knowledge",
            name: "Diagnosis Knowledge Domain (L2)",
            description: "Catálogo de diagnósticos (CID-10/11)",
            color: "bg-rose-50",
            resources: [
              {
                name: "CodeSystem (CID-10/11)",
                description: "Classificação Internacional de Doenças",
                fhirVersion: "R4/R5",
                examples: ["A00 - Cólera", "E10 - Diabetes Mellitus Tipo 1"],
              },
            ],
          },
          {
            id: "diagnosis-recording",
            name: "Diagnosis Recording Domain (L2)",
            description: "Registro de diagnósticos do paciente",
            color: "bg-rose-50",
            resources: [
              {
                name: "Condition",
                description: "Condição/diagnóstico do paciente",
                fhirVersion: "R4/R5",
                examples: ["Hipertensão Arterial", "Diabetes Mellitus"],
              },
              {
                name: "Observation",
                description: "Observação clínica ou resultado de exame",
                fhirVersion: "R4/R5",
                examples: ["Pressão Arterial: 140/90", "Glicemia: 120 mg/dL"],
              },
            ],
          },
        ],
      },
      {
        id: "financial-module",
        name: "Financial Module",
        description: "Faturamento, guias e cobertura",
        color: "bg-cyan-100 border-cyan-300",
        functions: [
          {
            id: "claim-billing",
            name: "Claim & Billing Domain (L2)",
            description: "Geração e processamento de guias/contas",
            color: "bg-cyan-50",
            resources: [
              {
                name: "Claim",
                description: "Solicitação de pagamento (guia TISS)",
                fhirVersion: "R4/R5",
              },
              {
                name: "ClaimResponse",
                description: "Resposta da operadora à guia",
                fhirVersion: "R4/R5",
              },
              {
                name: "Invoice",
                description: "Fatura para faturamento",
                fhirVersion: "R4/R5",
              },
            ],
          },
          {
            id: "coverage-eligibility",
            name: "Coverage & Eligibility Domain (L2)",
            description: "Cobertura e elegibilidade",
            color: "bg-cyan-50",
            resources: [
              {
                name: "Coverage",
                description: "Plano de saúde/cobertura do paciente",
                fhirVersion: "R4/R5",
              },
              {
                name: "CoverageEligibilityRequest",
                description: "Verificação de elegibilidade",
                fhirVersion: "R4/R5",
              },
            ],
          },
        ],
      },
    ],
  },
];
