import { Settings, Sparkles, FolderOpen, Cpu, Sun, Moon } from 'lucide-react';
import './Header.css';

export default function Header({ isDark, activeTab, setActiveTab, toggleTheme }) {
  return (
    <header className={`header ${isDark ? 'header--dark' : 'header--light'}`}>
      <div className="header__container">
        <div className="header__brand">
          <div className="header__icon-box">
            <Cpu className="header__icon" />
          </div>
          <div className="header__title-group">
            <h1 className="header__title">
              Prompt<span className="header__title-gradient">Genius</span>
            </h1>
            <p className="header__subtitle">AI LANDING PAGE ENGINE</p>
          </div>
        </div>

        <div className="header__actions">
          <nav className="header__nav-desktop">
            <button
              onClick={() => setActiveTab('form')}
              className={`header__nav-btn ${activeTab === 'form' ? 'header__nav-btn--active' : ''}`}
            >
              <Settings style={{ width: '1rem', height: '1rem' }} /> Configurador
            </button>
            <button
              onClick={() => setActiveTab('prompt')}
              className={`header__nav-btn ${activeTab === 'prompt' ? 'header__nav-btn--active' : ''}`}
            >
              <Sparkles style={{ width: '1rem', height: '1rem' }} /> Output Gerado
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`header__nav-btn ${activeTab === 'saved' ? 'header__nav-btn--active' : ''}`}
            >
              <FolderOpen style={{ width: '1rem', height: '1rem' }} /> Projetos
            </button>
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="header__theme-toggle"
            title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            <span className={`header__icon-wrapper ${isDark ? 'header__icon-wrapper--visible-moon' : 'header__icon-wrapper--hidden-moon'}`}>
              <Moon style={{ width: '1.25rem', height: '1.25rem' }} />
            </span>
            <span className={`header__icon-wrapper ${!isDark ? 'header__icon-wrapper--visible-sun' : 'header__icon-wrapper--hidden-sun'}`}>
              <Sun style={{ width: '1.25rem', height: '1.25rem' }} />
            </span>
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      <div className="header__nav-mobile">
        {[
          { key: 'form', label: 'Config', icon: Settings },
          { key: 'prompt', label: 'Output', icon: Sparkles },
          { key: 'saved', label: 'Projetos', icon: FolderOpen },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`header__nav-mobile-btn ${activeTab === key ? 'header__nav-mobile-btn--active' : ''}`}
          >
            <Icon style={{ width: '0.875rem', height: '0.875rem' }} /> {label}
          </button>
        ))}
      </div>
    </header>
  );
}