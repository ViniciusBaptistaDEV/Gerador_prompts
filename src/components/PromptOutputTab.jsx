import { Code, Copy, CheckCircle2, Save, Cpu } from 'lucide-react';

export default function PromptOutputTab({
  isDark,
  generatedPrompt,
  handleCopy,
  handleSaveProject,
  copyStatus,
  titleColor,
  mutedText,
  panelBg
}) {
  return (
    <div className={`rounded-2xl shadow-2xl border backdrop-blur-2xl overflow-hidden flex flex-col min-h-[400px] sm:min-h-[500px] transition-all duration-500 ${panelBg}`} style={{ height: 'calc(100vh - 220px)', maxHeight: '80vh' }}>
      <div className={`p-4 sm:p-5 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors duration-500 ${isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200 bg-slate-100/60'}`}>
        <div className="min-w-0 w-full sm:w-auto">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${titleColor}`}>
            <Code className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" /> Output de Inteligência
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 truncate ${mutedText}`}>Copie o conteúdo abaixo e cole diretamente na sua IA (Claude, GPT, v0).</p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleSaveProject}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 border px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'}`}
          >
            <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Salvar
          </button>
          <button
            onClick={handleCopy}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 ${copyStatus ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}
          >
            {copyStatus ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            {copyStatus ? 'Copiado!' : 'Copiar Prompt'}
          </button>
        </div>
      </div>

      <div className={`flex-1 p-0 relative transition-colors duration-500 ${isDark ? 'bg-black/80' : 'bg-slate-100'}`}>
        {generatedPrompt ? (
          <textarea
            readOnly
            value={generatedPrompt}
            className={`absolute inset-0 w-full h-full resize-none bg-transparent p-4 sm:p-5 lg:p-6 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none custom-scrollbar ${isDark ? 'text-cyan-50' : 'text-slate-800'}`}
          />
        ) : (
          <div className={`absolute inset-0 flex flex-col items-center justify-center font-medium p-4 sm:p-6 text-center ${mutedText}`}>
            <Cpu className={`w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 ${isDark ? 'text-slate-700' : 'text-slate-300'}`} />
            <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Nenhum núcleo de prompt sintetizado ainda.</p>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Vá em "Configurador", insira os dados do cliente e clique em Sintetizar.</p>
          </div>
        )}
      </div>
    </div>
  );
}