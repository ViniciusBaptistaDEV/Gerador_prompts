import { FolderOpen, Sparkles, ChevronRight, Trash2 } from 'lucide-react';
import './SavedProjectsTab.css';

export default function SavedProjectsTab({
  isDark,
  savedProjects,
  loadProject,
  deleteProject
}) {
  return (
    <div className={`saved-projects ${isDark ? 'saved-projects--dark' : 'saved-projects--light'}`}>
      <h2 className="saved-projects__title">
        <FolderOpen className="saved-projects__title-icon" />
        Projetos Armazenados
      </h2>

      {savedProjects.length === 0 ? (
        <div className="saved-projects__empty">
          <Sparkles className="saved-projects__empty-icon" />
          <p className="saved-projects__empty-title">Banco de dados vazio.</p>
          <p className="saved-projects__empty-desc">Os prompts que você salvar aparecerão aqui (armazenados no seu navegador).</p>
        </div>
      ) : (
        <div className="saved-projects__list">
          {savedProjects.map((project) => (
            <div key={project.id} className="saved-projects__item">
              <div className="saved-projects__item-info">
                <h3 className="saved-projects__item-title">{project.name}</h3>
                <div className="saved-projects__item-meta">
                  <span className="saved-projects__sector-tag">{project.sector}</span>
                  <span>Sintetizado em {project.date}</span>
                </div>
              </div>
              <div className="saved-projects__item-actions">
                <button
                  onClick={() => loadProject(project)}
                  className="saved-projects__btn--restore"
                >
                  Restaurar <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="saved-projects__btn--delete"
                  title="Excluir projeto"
                >
                  <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}