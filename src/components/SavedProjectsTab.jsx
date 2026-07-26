import { FolderOpen, Sparkles, ChevronRight, Trash2 } from 'lucide-react';

export default function SavedProjectsTab({
  isDark,
  savedProjects,
  loadProject,
  deleteProject,
  titleColor,
  mutedText,
  panelBg
}) {
  return (
    <div className={`rounded-2xl shadow-2xl border backdrop-blur-2xl p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] transition-all duration-500 ${panelBg}`}>
      <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 border-b pb-4 sm:pb-6 flex items-center gap-2 sm:gap-3 transition-colors duration-500 ${titleColor} ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <FolderOpen className="text-cyan-400 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
        Projetos Armazenados
      </h2>

      {savedProjects.length === 0 ? (
        <div className={`text-center py-12 sm:py-16 lg:py-20 rounded-2xl border border-dashed transition-colors duration-500 ${isDark ? 'text-slate-400 bg-slate-950/50 border-slate-700' : 'text-slate-500 bg-slate-50 border-slate-300'}`}>
          <Sparkles className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
          <p className={`font-semibold text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Banco de dados vazio.</p>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2 px-4">Os prompts que você salvar aparecerão aqui (armazenados no seu navegador).</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {savedProjects.map((project) => (
            <div key={project.id} className={`flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-xl border transition-all group hover:-translate-y-0.5 ${isDark ? 'border-slate-700/50 bg-slate-950/30 hover:border-cyan-500/50 hover:bg-cyan-900/10' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'}`}>
              <div className="w-full sm:w-auto mb-3 sm:mb-0 min-w-0">
                <h3 className={`font-bold text-base sm:text-lg truncate ${titleColor}`}>{project.name}</h3>
                <div className={`flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm mt-1.5 sm:mt-2 ${mutedText}`}>
                  <span className={`border px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold ${isDark ? 'bg-slate-800/80 border-slate-700 text-cyan-300' : 'bg-indigo-50 border-indigo-200 text-indigo-600'}`}>{project.sector}</span>
                  <span>Sintetizado em {project.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => loadProject(project)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 border px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-cyan-500/50' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-indigo-300'}`}
                >
                  Restaurar <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className={`flex items-center justify-center p-2 sm:p-2.5 rounded-lg transition-all ${isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-rose-400/10' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
                  title="Excluir projeto"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}