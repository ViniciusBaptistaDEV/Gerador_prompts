import { useState } from 'react';
import {
  FolderOpen,
  Sparkles,
  ChevronRight,
  Trash2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Search,
  Layers,
  Calendar,
  Building2,
  Pencil,
  X,
  Save
} from 'lucide-react';
import './SavedProjectsTab.css';

export default function SavedProjectsTab({
  isDark,
  savedProjects,
  loadProject,
  deleteProject,
  updateProject
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Estado do Modal de Edição de Prompt
  const [editingProject, setEditingProject] = useState(null);
  const [editedPrompt, setEditedPrompt] = useState('');

  const filteredProjects = savedProjects.filter(project => {
    const term = searchTerm.toLowerCase();
    return (
      (project.name && project.name.toLowerCase().includes(term)) ||
      (project.sector && project.sector.toLowerCase().includes(term))
    );
  });

  const handleCopyPrompt = (e, project) => {
    e.stopPropagation();
    navigator.clipboard.writeText(project.prompt);
    setCopiedId(project.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setEditedPrompt(project.prompt || '');
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
    setEditedPrompt('');
  };

  const handleSaveEdit = () => {
    if (!editingProject) return;
    updateProject(editingProject.id, { prompt: editedPrompt });
    handleCloseEdit();
  };

  return (
    <div className={`saved-projects ${isDark ? 'saved-projects--dark' : 'saved-projects--light'}`}>
      <div className="saved-projects__header">
        <div className="saved-projects__header-info">
          <h2 className="saved-projects__title">
            <FolderOpen className="saved-projects__title-icon" />
            <span>Meus Projetos & Prompts Gerados</span>
          </h2>
          <p className="saved-projects__subtitle">
            Histórico de prompts gerados e armazenados localmente. Reveja os dados, copie o prompt ou carregue no editor.
          </p>
        </div>

        {savedProjects.length > 0 && (
          <div className="saved-projects__search-box">
            <Search className="saved-projects__search-icon" />
            <input
              type="text"
              placeholder="Buscar por empresa ou nicho..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="saved-projects__search-input"
            />
          </div>
        )}
      </div>

      {savedProjects.length === 0 ? (
        <div className="saved-projects__empty">
          <Sparkles className="saved-projects__empty-icon" />
          <p className="saved-projects__empty-title">Nenhum projeto salvo no histórico.</p>
          <p className="saved-projects__empty-desc">
            Todos os prompts que você gerar no Configurador serão salvos automaticamente no seu navegador.
          </p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="saved-projects__empty">
          <p className="saved-projects__empty-title">Nenhum projeto encontrado para "{searchTerm}".</p>
          <p className="saved-projects__empty-desc">Tente buscar por outro termo.</p>
        </div>
      ) : (
        <div className="saved-projects__grid">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            const isCopied = copiedId === project.id;
            const pageTypeLabel = project.pageType || (project.data?.pageType === 'completa' ? 'Formulário Webhook' : 'Lead Direto');

            return (
              <div key={project.id} className="saved-projects__card">
                {/* Header do Card */}
                <div className="saved-projects__card-header">
                  <div className="saved-projects__card-title-group">
                    <div className="saved-projects__card-icon-wrapper">
                      <Building2 style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-cyan-400)' }} />
                    </div>
                    <div>
                      <h3 className="saved-projects__card-title">{project.name}</h3>
                      <span className="saved-projects__sector-tag">{project.sector}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="saved-projects__btn--delete"
                    title="Excluir projeto do histórico"
                  >
                    <Trash2 style={{ width: '1.1rem', height: '1.1rem' }} />
                  </button>
                </div>

                {/* Metadados */}
                <div className="saved-projects__card-meta">
                  <span className="saved-projects__meta-item">
                    <Calendar style={{ width: '0.85rem', height: '0.85rem' }} />
                    {project.date}
                  </span>
                  <span className="saved-projects__meta-item">
                    <Layers style={{ width: '0.85rem', height: '0.85rem' }} />
                    {pageTypeLabel}
                  </span>
                </div>

                {/* Bloco de Preview/Prompt */}
                <div className="saved-projects__prompt-box">
                  <div className="saved-projects__prompt-box-header">
                    <span className="saved-projects__prompt-label">Prompt Mestre Gerado</span>
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="saved-projects__toggle-btn"
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff style={{ width: '0.85rem', height: '0.85rem' }} /> Ocultar Prompt
                        </>
                      ) : (
                        <>
                          <Eye style={{ width: '0.85rem', height: '0.85rem' }} /> Ver Prompt
                        </>
                      )}
                    </button>
                  </div>

                  <div className={`saved-projects__prompt-content ${isExpanded ? 'saved-projects__prompt-content--expanded' : 'saved-projects__prompt-content--collapsed'}`}>
                    <pre className="saved-projects__prompt-code">{project.prompt}</pre>
                  </div>
                </div>

                {/* Ações do Card */}
                <div className="saved-projects__card-actions">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="saved-projects__card-btn saved-projects__card-btn--edit"
                    title="Editar Prompt"
                  >
                    <Pencil style={{ width: '1rem', height: '1rem' }} />
                    Editar
                  </button>

                  <button
                    onClick={(e) => handleCopyPrompt(e, project)}
                    className={`saved-projects__card-btn ${isCopied ? 'saved-projects__card-btn--copied' : 'saved-projects__card-btn--copy'}`}
                  >
                    {isCopied ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
                    {isCopied ? 'Copiado!' : 'Copiar'}
                  </button>

                  <button
                    onClick={() => loadProject(project)}
                    className="saved-projects__card-btn saved-projects__card-btn--open"
                  >
                    Abrir <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE EDIÇÃO DE PROMPT */}
      {editingProject && (
        <div className="saved-projects__modal-overlay" onClick={handleCloseEdit}>
          <div
            className={`saved-projects__modal ${isDark ? 'saved-projects__modal--dark' : 'saved-projects__modal--light'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="saved-projects__modal-header">
              <div className="saved-projects__modal-title-box">
                <div className="saved-projects__modal-icon-wrapper">
                  <Pencil style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-cyan-400)' }} />
                </div>
                <div>
                  <h3 className="saved-projects__modal-title">Editar Prompt</h3>
                  <p className="saved-projects__modal-subtitle">Empresa: {editingProject.name}</p>
                </div>
              </div>
              <button
                onClick={handleCloseEdit}
                className="saved-projects__modal-close"
                title="Cancelar e fechar"
              >
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <div className="saved-projects__modal-body">
              <label className="saved-projects__modal-label">
                Conteúdo do Prompt
              </label>
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="saved-projects__modal-textarea custom-scrollbar"
                placeholder="Insira o texto do prompt aqui..."
              />
            </div>

            <div className="saved-projects__modal-footer">
              <button
                onClick={handleCloseEdit}
                className="saved-projects__modal-btn saved-projects__modal-btn--cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="saved-projects__modal-btn saved-projects__modal-btn--save"
              >
                <Save style={{ width: '1rem', height: '1rem' }} />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}