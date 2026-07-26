import { Settings, Sparkles, FolderOpen, Cpu, Sun, Moon } from 'lucide-react';

export default function Header({ isDark, activeTab, setActiveTab, toggleTheme, titleColor, mutedText, navWrapBg, navActive, navInactive }) {
  return (
    <header className={`relative z-10 backdrop-blur-xl border-b sticky top-0 transition-colors duration-500 ${isDark ? 'bg-slate-900/60 border-white/5' : 'bg-white/70 border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-indigo-600 p-2.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-transform duration-300 hover:scale-105 hover:rotate-6">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${titleColor}`}>
              Prompt<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Genius</span>
            </h1>
            <p className={`text-xs font-medium tracking-wider hidden sm:block ${mutedText}`}>AI LANDING PAGE ENGINE</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className={`hidden md:flex gap-2 p-1.5 rounded-xl border transition-colors duration-500 ${navWrapBg}`}>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${activeTab === 'form' ? navActive + ' border' : navInactive}`}
            >
              <Settings className="w-4 h-4"/> Configurador
            </button>
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${activeTab === 'prompt' ? navActive + ' border' : navInactive}`}
            >
              <Sparkles className="w-4 h-4"/> Output Gerado
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${activeTab === 'saved' ? navActive + ' border' : navInactive}`}
            >
              <FolderOpen className="w-4 h-4"/> Projetos
            </button>
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className={`relative w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${isDark ? 'border-white/10 bg-slate-800/60 text-amber-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-indigo-500 hover:bg-slate-100 shadow-sm'}`}
            title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
              <Moon className="w-5 h-5" />
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
              <Sun className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      <div className={`md:hidden flex gap-1 px-4 pb-3 border-t transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        {[
          { key: 'form', label: 'Config', icon: Settings },
          { key: 'prompt', label: 'Output', icon: Sparkles },
          { key: 'saved', label: 'Projetos', icon: FolderOpen },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 mt-2 py-2 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${activeTab === key ? navActive + ' border' : navInactive}`}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>
    </header>
  );
}