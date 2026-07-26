import useAppState from './hooks/useAppState';
import Header from './components/Header';
import FormTab from './components/FormTab';
import PromptOutputTab from './components/PromptOutputTab';
import SavedProjectsTab from './components/SavedProjectsTab';
import AlertModal from './components/AlertModal';
import './App.css';

function App() {
  const {
    isDark,
    activeTab,
    copyStatus,
    savedProjects,
    generatedPrompt,
    mounted,
    formData,
    alertState,
    hideAlert,
    setActiveTab,
    toggleTheme,
    handleInputChange,
    handleGenerate,
    handleCopy,
    loadProject,
    deleteProject,
    updateProject,
  } = useAppState();

  return (
    <div className={`app ${isDark ? 'app--dark' : 'app--light'}`}>

      {/* Modal de Alerta Futurista com Laser Scan */}
      <AlertModal
        isDark={isDark}
        alertState={alertState}
        onClose={hideAlert}
      />

      {/* Elementos de Fundo Futuristas */}
      <div className="app__bg-effects">
        <div className="app__orb app__orb--1 app__orb--animate-slow"></div>
        <div className="app__orb app__orb--2 app__orb--animate-slow-reverse"></div>
        <div className="app__orb app__orb--3 app__orb--animate-slow"></div>
      </div>

      <Header
        isDark={isDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="app__main">

        {/* TAB: FORMULÁRIO */}
        {activeTab === 'form' && (
          <FormTab
            isDark={isDark}
            mounted={mounted}
            formData={formData}
            handleInputChange={handleInputChange}
            handleGenerate={handleGenerate}
          />
        )}

        {/* TAB: PROMPT GERADO */}
        {activeTab === 'prompt' && (
          <PromptOutputTab
            isDark={isDark}
            generatedPrompt={generatedPrompt}
            handleCopy={handleCopy}
            copyStatus={copyStatus}
          />
        )}

        {/* TAB: PROJETOS SALVOS */}
        {activeTab === 'saved' && (
          <SavedProjectsTab
            isDark={isDark}
            savedProjects={savedProjects}
            loadProject={loadProject}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        )}
      </main>
    </div>
  );
}

export default App;