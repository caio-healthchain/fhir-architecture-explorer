import { useState } from "react";
import { ArrowLeft, Code2, Database, Zap, Eye, GitBranch } from "lucide-react";
import { arquiteturaFhir, ModuloL1, FuncaoL2, RecursoFhir, Microsservico } from "@/data/fhirArchitecture";

export function ArchitectureExplorer() {
  const [selectedFunction, setSelectedFunction] = useState<FuncaoL2 | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Microsservico | null>(null);

  if (selectedComponent) {
    return (
      <ComponentDetailView
        component={selectedComponent}
        onBack={() => setSelectedComponent(null)}
      />
    );
  }

  if (selectedFunction) {
    return (
      <FunctionDetailView
        function={selectedFunction}
        onBack={() => setSelectedFunction(null)}
        onSelectComponent={(component) => setSelectedComponent(component)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Mapa de Arquitetura Lazarus</h1>
          <p className="text-sm text-slate-600">
            Estrutura FHIR HL7 em camadas funcionais (L0, L1, L2)
          </p>
        </div>

        {/* Todos os L0 Modules */}
        <div className="space-y-4">
          {arquiteturaFhir.map((layer) => (
            <div key={layer.id} className="bg-white rounded-lg border-2 border-slate-300 overflow-hidden shadow-sm">
              {/* L0 Header */}
              <div className="bg-slate-400 text-white p-3 text-center">
                <h2 className="text-lg font-semibold">{layer.nome}</h2>
                <p className="text-xs opacity-90">{layer.descricao}</p>
              </div>

              {/* L1 Modules Grid */}
              <div className="p-4 space-y-3">
                {layer.modulos.map((module: ModuloL1) => (
                  <div key={module.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    {/* L1 Header */}
                    <div
                      className={`bg-gradient-to-r ${module.cor} text-white p-3 flex items-center gap-2`}
                      style={{
                        background: getModuleColor(module.id),
                      }}
                    >
                      <span className="text-2xl">{module.icone}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold leading-tight">{module.nome}</h3>
                        <p className="text-xs opacity-90 truncate">{module.descricao}</p>
                      </div>
                    </div>

                    {/* L2 Functions Grid */}
                    <div className="p-3 bg-slate-50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {module.funcoes.map((func: FuncaoL2) => (
                          <button
                            key={func.id}
                            onClick={() => setSelectedFunction(func)}
                            className="p-3 rounded-lg border border-slate-200 transition-all duration-200 text-left group hover:shadow-md hover:border-slate-300 bg-white hover:bg-slate-50"
                            style={{
                              backgroundColor: getPastelColor(module.id),
                            }}
                          >
                            <h4 className="font-semibold text-slate-800 text-sm mb-1 leading-tight">
                              {func.nome}
                            </h4>
                            <p className="text-xs text-slate-700 mb-2 line-clamp-2">{func.descricao}</p>
                            <div className="flex gap-1">
                              <span className="inline-block px-2 py-0.5 bg-white text-slate-700 text-xs rounded font-semibold border border-slate-200">
                                {func.recursos.length} FHIR
                              </span>
                              {func.microsservico && (
                                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-semibold border border-blue-200">
                                  MS
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FunctionDetailViewProps {
  function: FuncaoL2;
  onBack: () => void;
  onSelectComponent: (component: Microsservico) => void;
}

function FunctionDetailView({ function: func, onBack, onSelectComponent }: FunctionDetailViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header com Botão Voltar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-slate-300 hover:border-slate-400 hover:shadow-md transition-all text-slate-700 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Mapa
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{func.nome}</h1>
            <p className="text-sm text-slate-600 mt-1">{func.descricao}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          {/* Recursos FHIR */}
          <div className="bg-white rounded-lg border-2 border-blue-200 overflow-hidden shadow-sm">
            <div className="bg-blue-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <span>📋</span> Recursos FHIR
              </h3>
            </div>
            <div className="p-4 bg-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {func.recursos.map((resource: RecursoFhir, idx: number) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">{resource.nome}</h4>
                    <p className="text-xs text-slate-700 mb-2">{resource.descricao}</p>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <span className="inline-block px-2 py-0.5 bg-blue-200 text-blue-800 text-xs rounded font-mono font-semibold">
                        {resource.versaoFhir}
                      </span>
                    </div>
                    {resource.exemplos && resource.exemplos.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-blue-200">
                        <p className="text-xs font-semibold text-slate-700 mb-1">Exemplos:</p>
                        <ul className="space-y-0.5">
                          {resource.exemplos.map((example: string, i: number) => (
                            <li key={i} className="text-xs text-slate-600 flex gap-1">
                              <span className="text-blue-600">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Componentes */}
          {func.microsservico && (
            <div className="bg-white rounded-lg border-2 border-green-200 overflow-hidden shadow-sm">
              <div className="bg-green-300 text-white p-3">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <span>⚙️</span> Componentes
                </h3>
              </div>
              <div className="p-4 bg-green-50">
                <button
                  onClick={() => onSelectComponent(func.microsservico!)}
                  className="w-full p-4 bg-white rounded-lg border-2 border-green-300 hover:border-green-400 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-1">{func.microsservico.nome}</h4>
                      <p className="text-xs text-slate-600">{func.microsservico.descricao}</p>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {func.microsservico.componentes.map((comp) => (
                          <span
                            key={comp.id}
                            className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-semibold"
                          >
                            {comp.tipo}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-green-600">→</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Swagger/API */}
          <div className="bg-white rounded-lg border-2 border-amber-200 overflow-hidden shadow-sm">
            <div className="bg-amber-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <span>🔌</span> Swagger/API
              </h3>
            </div>
            <div className="p-4 bg-amber-50">
              <div className="bg-white rounded-lg p-4 border border-slate-300 font-mono text-xs overflow-x-auto">
                <pre className="text-slate-700">
{`GET /fhir/${func.id}
  Descrição: ${func.descricao}
  
POST /fhir/${func.id}
  Descrição: Criar novo recurso
  
PUT /fhir/${func.id}/{{id}}
  Descrição: Atualizar recurso
  
DELETE /fhir/${func.id}/{{id}}
  Descrição: Deletar recurso`}
                </pre>
              </div>
            </div>
          </div>

          {/* Referências */}
          <div className="text-center py-4 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              📚 Para mais informações, consulte{" "}
              <a
                href="https://build.fhir.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                build.fhir.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ComponentDetailViewProps {
  component: Microsservico;
  onBack: () => void;
}

function ComponentDetailView({ component, onBack }: ComponentDetailViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-slate-300 hover:border-slate-400 hover:shadow-md transition-all text-slate-700 font-semibold text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">{component.nome}</h1>
          <p className="text-sm text-slate-600 mb-3">{component.descricao}</p>
          <div className="flex gap-4 text-xs">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
              Namespace: {component.namespace}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
              Schema: {component.schema}
            </span>
          </div>
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Componentes */}
          <div className="bg-white rounded-lg border-2 border-green-200 overflow-hidden shadow-sm">
            <div className="bg-green-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" /> Componentes
              </h3>
            </div>
            <div className="p-4 bg-green-50 space-y-2">
              {component.componentes.map((comp) => (
                <div key={comp.id} className="p-3 bg-white rounded-lg border-l-4 border-green-400">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-sm mb-1">{comp.nome}</p>
                      <p className="text-xs text-slate-600 mb-1">{comp.descricao}</p>
                      {comp.tecnologia && (
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-mono">
                          {comp.tecnologia}
                        </span>
                      )}
                    </div>
                    <span className="text-2xl ml-2">
                      {comp.tipo === 'api' && '🔌'}
                      {comp.tipo === 'database' && '🗄️'}
                      {comp.tipo === 'agente' && '⚙️'}
                      {comp.tipo === 'conector' && '🔗'}
                      {comp.tipo === 'miniapp' && '📱'}
                      {comp.tipo === 'eventbroker' && '📨'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagrama C3 */}
          <div className="bg-white rounded-lg border-2 border-purple-200 overflow-hidden shadow-sm">
            <div className="bg-purple-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Diagrama C3
              </h3>
            </div>
            <div className="p-6 bg-purple-50">
              <div className="bg-white rounded-lg p-8 border-2 border-dashed border-slate-300 text-center">
                <p className="text-slate-400 text-sm">Espaço para diagrama C3 (componentes internos)</p>
              </div>
            </div>
          </div>

          {/* Swagger/API */}
          <div className="bg-white rounded-lg border-2 border-amber-200 overflow-hidden shadow-sm lg:col-span-2">
            <div className="bg-amber-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Swagger/OpenAPI
              </h3>
            </div>
            <div className="p-4 bg-amber-50">
              <div className="bg-white rounded-lg p-4 border border-slate-300 font-mono text-xs overflow-x-auto">
                <pre className="text-slate-700">
{component.swagger.map(endpoint => 
`${endpoint.metodo} ${endpoint.caminho}
  Descrição: ${endpoint.descricao}
${endpoint.parametros ? `  Parâmetros: ${endpoint.parametros.join(', ')}\n` : ''}${endpoint.resposta ? `  Resposta: ${endpoint.resposta}\n` : ''}`
).join('\n')}
                </pre>
              </div>
            </div>
          </div>

          {/* Observabilidade */}
          <div className="bg-white rounded-lg border-2 border-indigo-200 overflow-hidden shadow-sm">
            <div className="bg-indigo-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" /> Observabilidade
              </h3>
            </div>
            <div className="p-4 bg-indigo-50 space-y-2">
              <div className="p-3 bg-white rounded-lg border border-indigo-200">
                <p className="font-semibold text-slate-800 text-xs mb-1">📊 Logs</p>
                <p className="text-xs text-slate-600 font-mono">{component.observabilidade.logs}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-indigo-200">
                <p className="font-semibold text-slate-800 text-xs mb-1">📈 Métricas</p>
                <p className="text-xs text-slate-600 font-mono">{component.observabilidade.metricas}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-indigo-200">
                <p className="font-semibold text-slate-800 text-xs mb-1">🔍 Traces</p>
                <p className="text-xs text-slate-600 font-mono">{component.observabilidade.traces}</p>
              </div>
            </div>
          </div>

          {/* Data Lineage */}
          <div className="bg-white rounded-lg border-2 border-rose-200 overflow-hidden shadow-sm">
            <div className="bg-rose-300 text-white p-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <GitBranch className="w-4 h-4" /> Data Lineage
              </h3>
            </div>
            <div className="p-4 bg-rose-50 space-y-2">
              {component.dataLineage.map((lineage, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-rose-200">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-700 truncate">{lineage.origem}</span>
                    <span className="text-rose-600">→</span>
                    <span className="font-mono text-slate-700 truncate">{lineage.destino}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Tipo: {lineage.tipo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions para cores pastosas
function getModuleColor(moduleId: string): string {
  const colors: Record<string, string> = {
    "medicamentos-modulo": "#a8d5ba",
    "dispositivos-modulo": "#f4c9a8",
    "diagnosticos-modulo": "#d4a5d4",
    "faturamento-modulo": "#f4a8a8",
    "administrativo-modulo": "#a8c9f4",
    "clinico-modulo": "#a8d5d4",
    "terminologias": "#c9a8f4",
    "seguranca-privacidade": "#f4c9a8",
    "conformidade": "#f4e8a8",
    "infraestrutura": "#d4d4d4",
  };
  return colors[moduleId] || "#c9a8f4";
}

function getPastelColor(moduleId: string): string {
  const colors: Record<string, string> = {
    "medicamentos-modulo": "#e8f5e9",
    "dispositivos-modulo": "#fff3e0",
    "diagnosticos-modulo": "#f3e5f5",
    "faturamento-modulo": "#ffe0e0",
    "administrativo-modulo": "#e3f2fd",
    "clinico-modulo": "#e0f2f1",
    "terminologias": "#f3e5f5",
    "seguranca-privacidade": "#fff3e0",
    "conformidade": "#fffde7",
    "infraestrutura": "#f5f5f5",
  };
  return colors[moduleId] || "#f3e5f5";
}
