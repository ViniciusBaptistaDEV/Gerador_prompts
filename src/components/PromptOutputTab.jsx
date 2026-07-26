import { Code, Copy, CheckCircle2, Cpu } from 'lucide-react';
import './PromptOutputTab.css';

export default function PromptOutputTab({
  isDark,
  generatedPrompt,
  handleCopy,
  copyStatus
}) {
  return (
    <div className={`prompt-output ${isDark ? 'prompt-output--dark' : 'prompt-output--light'}`}>
      <div className="prompt-output__header">
        <div className="prompt-output__header-info">
          <h2 className="prompt-output__title">
            <Code className="prompt-output__title-icon" /> Output de Inteligência
          </h2>
          <p className="prompt-output__subtitle">Copie o conteúdo abaixo e cole diretamente na sua IA (Claude, GPT, v0).</p>
        </div>
        <div className="prompt-output__actions">
          <button
            onClick={handleCopy}
            className={`prompt-output__btn ${copyStatus ? 'prompt-output__btn--copy-success' : 'prompt-output__btn--copy-default'}`}
          >
            {copyStatus ? <CheckCircle2 style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
            {copyStatus ? 'Copiado!' : 'Copiar Prompt'}
          </button>
        </div>
      </div>

      <div className="prompt-output__content">
        {generatedPrompt ? (
          <textarea
            readOnly
            value={generatedPrompt}
            className="prompt-output__textarea custom-scrollbar"
          />
        ) : (
          <div className="prompt-output__empty">
            <Cpu className="prompt-output__empty-icon" />
            <p className="prompt-output__empty-title">Nenhum núcleo de prompt sintetizado ainda.</p>
            <p className="prompt-output__empty-desc">Vá em "Configurador", insira os dados do cliente e clique em Sintetizar.</p>
          </div>
        )}
      </div>
    </div>
  );
}