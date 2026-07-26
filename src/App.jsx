import useAppState from './hooks/useAppState';
import Header from './components/Header';
import FormTab from './components/FormTab';
import PromptOutputTab from './components/PromptOutputTab';
import SavedProjectsTab from './components/SavedProjectsTab';

function App() {
  const {
    isDark,
    activeTab,
    copyStatus,
    savedProjects,
    generatedPrompt,
    mounted,
    formData,
    setActiveTab,
    toggleTheme,
    handleInputChange,
    handleGenerate,
    handleCopy,
    handleSaveProject,
    loadProject,
    deleteProject,
  } = useAppState();

  // Classes dependentes de tema
  const pageBg = isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800';
  const panelBg = isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white/80 border-slate-200';
  const navWrapBg = isDark ? 'bg-slate-950/50 border-white/5' : 'bg-slate-100/70 border-slate-200';
  const navActive = isDark ? 'bg-slate-800 text-cyan-400 border-white/5' : 'bg-white text-indigo-600 border-slate-200 shadow-sm';
  const navInactive = isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60';
  const inputBase = isDark
    ? 'border-slate-700 bg-slate-950/50 text-white focus:ring-cyan-500 focus:border-cyan-500'
    : 'border-slate-300 bg-white text-slate-800 focus:ring-indigo-400 focus:border-indigo-400';
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBorder = isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50';
  const titleColor = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden relative transition-colors duration-500 ${pageBg}`}>

      {/* Elementos de Fundo Futuristas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-float-slow ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-400/20'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-float-slow-reverse ${isDark ? 'bg-cyan-600/10' : 'bg-cyan-400/20'}`}></div>
        <div className={`absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full blur-[100px] animate-float-slow ${isDark ? 'bg-purple-600/10' : 'bg-purple-400/15'}`}></div>
      </div>

      <Header
        isDark={isDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleTheme={toggleTheme}
        titleColor={titleColor}
        mutedText={mutedText}
        navWrapBg={navWrapBg}
        navActive={navActive}
        navInactive={navInactive}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* TAB: FORMULÁRIO */}
        {activeTab === 'form' && (
          <FormTab
            isDark={isDark}
            mounted={mounted}
            formData={formData}
            handleInputChange={handleInputChange}
            handleGenerate={handleGenerate}
            titleColor={titleColor}
            mutedText={mutedText}
            labelColor={labelColor}
            inputBase={inputBase}
            cardBorder={cardBorder}
            panelBg={panelBg}
          />
        )}

        {/* TAB: PROMPT GERADO */}
        {activeTab === 'prompt' && (
          <PromptOutputTab
            isDark={isDark}
            generatedPrompt={generatedPrompt}
            handleCopy={handleCopy}
            handleSaveProject={handleSaveProject}
            copyStatus={copyStatus}
            titleColor={titleColor}
            mutedText={mutedText}
            panelBg={panelBg}
          />
        )}

        {/* TAB: PROJETOS SALVOS */}
        {activeTab === 'saved' && (
          <SavedProjectsTab
            isDark={isDark}
            savedProjects={savedProjects}
            loadProject={loadProject}
            deleteProject={deleteProject}
            titleColor={titleColor}
            mutedText={mutedText}
            panelBg={panelBg}
          />
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.15);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.35);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.6);
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.05); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 14s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow, .animate-float-slow-reverse {
            animation: none;
          }
        }
      `}} />
    </div>
  );
}

export default App;