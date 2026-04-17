import { useState } from "react";
import { ChevronDown, ChevronRight, Layers } from "lucide-react";
import { fhirArchitecture, L0Layer, L1Module, L2Function, FhirResource } from "@/data/fhirArchitecture";
import { Card } from "@/components/ui/card";

export function ArchitectureExplorer() {
  const [expandedL0, setExpandedL0] = useState<string | null>("infrastructure");
  const [expandedL1, setExpandedL1] = useState<Record<string, boolean>>({});
  const [expandedL2, setExpandedL2] = useState<Record<string, boolean>>({});
  const [selectedResource, setSelectedResource] = useState<FhirResource | null>(null);

  const toggleL0 = (id: string) => {
    setExpandedL0(expandedL0 === id ? null : id);
  };

  const toggleL1 = (id: string) => {
    setExpandedL1((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleL2 = (id: string) => {
    setExpandedL2((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">FHIR Architecture Explorer</h1>
          </div>
          <p className="text-lg text-slate-600 ml-16">
            Explore a arquitetura FHIR HL7 em camadas funcionais (L0, L1, L2)
          </p>
        </div>

        {/* Architecture Layers */}
        <div className="space-y-6">
          {fhirArchitecture.map((layer) => (
            <div key={layer.id}>
              {/* L0 Layer */}
              <button
                onClick={() => toggleL0(layer.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  expandedL0 === layer.id
                    ? "bg-blue-50 border-blue-400 shadow-lg"
                    : "bg-white border-slate-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedL0 === layer.id ? (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-slate-900">{layer.name}</h2>
                      <p className="text-sm text-slate-500">{layer.description}</p>
                    </div>
                  </div>
                </div>
              </button>

              {/* L1 Modules */}
              {expandedL0 === layer.id && (
                <div className="mt-4 ml-6 space-y-4 border-l-4 border-blue-200 pl-6">
                  {layer.modules.map((module) => (
                    <div key={module.id}>
                      <button
                        onClick={() => toggleL1(module.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                          expandedL1[module.id]
                            ? `${module.color} shadow-md`
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {expandedL1[module.id] ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            <div className="text-left">
                              <h3 className="font-semibold text-slate-900">{module.name}</h3>
                              <p className="text-xs text-slate-600">{module.description}</p>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* L2 Functions */}
                      {expandedL1[module.id] && (
                        <div className="mt-3 ml-4 space-y-3 border-l-2 border-slate-300 pl-4">
                          {module.functions.map((func) => (
                            <div key={func.id}>
                              <button
                                onClick={() => toggleL2(func.id)}
                                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                                  expandedL2[func.id]
                                    ? `${func.color} shadow-md`
                                    : "bg-white border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {expandedL2[func.id] ? (
                                      <ChevronDown className="w-4 h-4" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4" />
                                    )}
                                    <div className="text-left">
                                      <h4 className="font-semibold text-slate-900">{func.name}</h4>
                                      <p className="text-xs text-slate-600">{func.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </button>

                              {/* FHIR Resources */}
                              {expandedL2[func.id] && (
                                <div className="mt-3 ml-4 space-y-2">
                                  {func.resources.map((resource, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => setSelectedResource(resource)}
                                      className="w-full p-3 rounded-lg bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 text-left group"
                                    >
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h5 className="font-semibold text-slate-900 group-hover:text-blue-600">
                                            {resource.name}
                                          </h5>
                                          <p className="text-sm text-slate-600">{resource.description}</p>
                                          <div className="mt-2 flex gap-2 flex-wrap">
                                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-mono">
                                              {resource.fhirVersion}
                                            </span>
                                            {resource.examples && resource.examples.length > 0 && (
                                              <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                                {resource.examples.length} exemplo(s)
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resource Details Panel */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50">
          <Card className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedResource.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">FHIR {selectedResource.fhirVersion}</p>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Descrição</h4>
                  <p className="text-slate-700">{selectedResource.description}</p>
                </div>

                {selectedResource.examples && selectedResource.examples.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Exemplos de Uso</h4>
                    <ul className="space-y-2">
                      {selectedResource.examples.map((example, idx) => (
                        <li key={idx} className="flex gap-2 text-slate-700">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    Para mais informações, consulte a documentação oficial do FHIR HL7 em{" "}
                    <a
                      href="https://build.fhir.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      build.fhir.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
