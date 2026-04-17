import { Suspense, lazy, useState } from 'react';
import type { LikeC4ViewId } from 'likec4:react';

// Lazy load LikeC4View para evitar problemas de bundling
const LikeC4View = lazy(() => import('likec4:react').then(m => ({ default: m.LikeC4View })));

interface LikeC4MedicationsDiagramProps {
  viewId?: LikeC4ViewId;
}

export function LikeC4MedicationsDiagram({ viewId = 'view_u90819' as LikeC4ViewId }: LikeC4MedicationsDiagramProps) {
  const [selectedView, setSelectedView] = useState<LikeC4ViewId>(viewId);

  const views: Array<{ id: LikeC4ViewId; label: string; icon: string }> = [
    { id: 'view_u90819' as LikeC4ViewId, label: 'Arquitetura (C3)', icon: '📐' },
    { id: 'cmed_import_flow' as LikeC4ViewId, label: 'Fluxo CMED', icon: '📥' },
    { id: 'medication_query_flow' as LikeC4ViewId, label: 'Fluxo Consulta', icon: '🔍' },
    { id: 'mcp_integration_flow' as LikeC4ViewId, label: 'Fluxo MCP', icon: '🤖' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg border border-slate-200">
      {/* Seletor de Views */}
      <div className="flex gap-2 p-3 border-b border-slate-200 bg-slate-50 flex-wrap">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setSelectedView(view.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedView === view.id
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <span className="mr-1">{view.icon}</span>
            {view.label}
          </button>
        ))}
      </div>

      {/* Diagrama LikeC4 */}
      <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-purple-50 to-white">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
                <p className="text-sm text-slate-600">Carregando diagrama...</p>
              </div>
            </div>
          }
        >
          <LikeC4View viewId={selectedView} />
        </Suspense>
      </div>

      {/* Legenda */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
        <p className="font-semibold mb-1">💡 Dica: Clique nos elementos para ver propriedades</p>
        <p>Use os botões acima para alternar entre diferentes visualizações do sistema</p>
      </div>
    </div>
  );
}
