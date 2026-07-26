import { Globe, Sparkles, Cpu, Rocket } from 'lucide-react';
import './FormTab.css';

export default function FormTab({
  isDark,
  mounted,
  formData,
  handleInputChange,
  handleGenerate
}) {
  return (
    <div className={`form-tab ${isDark ? 'form-tab--dark' : 'form-tab--light'} ${mounted ? 'form-tab--mounted' : ''}`}>
      <div className="form-tab__container">
        <div className="form-tab__header">
          <div className="form-tab__header-info">
            <h2 className="form-tab__title">
              <Globe className="form-tab__title-icon" />
              <span>Parâmetros do Cliente</span>
            </h2>
            <p className="form-tab__subtitle">Preencha os dados abaixo para sintetizar a inteligência da Landing Page.</p>
          </div>
        </div>

        <div className="form-tab__grid">

          {/* Coluna 1 */}
          <div className="form-tab__column">
            <div className="form-tab__group">
              <label className="form-tab__label">
                Setor / Área de Atuação <span className="form-tab__required">*</span>
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="form-tab__select"
              >
                <option value="">Selecione o nicho de mercado...</option>
                <option value="advogados">Advocacia / Escritório Jurídico</option>
                <option value="arquitetura">Arquitetura / Design de Interiores</option>
                <option value="engenharia">Engenharia / Construtora</option>
                <option value="industria">Indústria / Fábrica</option>
                <option value="clinica_veterinaria">Clínica Veterinária / Hospital Pet</option>
                <option value="clinica_medica">Clínica Médica / Consultório</option>
                <option value="clinica_exames">Laboratório / Clínica de Exames</option>
                <option value="clinica_odontologica">Clínica Odontológica</option>
                <option value="barbearia">Barbearia Premium</option>
                <option value="salao_beleza">Salão de Beleza / Estética</option>
                <option value="mecanica">Oficina Mecânica / Auto Center</option>
                <option value="outro">Outro Segmento (Personalizado) ⚡</option>
              </select>
            </div>

            {formData.sector === 'outro' && (
              <div className="animate-in form-tab__group">
                <label className="form-tab__label form-tab__required">
                  Digite o Nome do Segmento Personalizado <span className="form-tab__required">*</span>
                </label>
                <input
                  type="text"
                  name="customSector"
                  value={formData.customSector}
                  onChange={handleInputChange}
                  placeholder="Ex: Contabilidade, Tecnologia, Corretor de Imóveis..."
                  className={`form-tab__input ${isDark ? 'form-tab__input--custom-dark' : 'form-tab__input--custom-light'}`}
                />
              </div>
            )}

            <div className="form-tab__group">
              <label className="form-tab__label">
                Nome da Empresa / Profissional <span className="form-tab__required">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Ex: Clínica Sorriso Perfeito"
                className="form-tab__input"
              />
            </div>

            <div className="form-tab__group">
              <label className="form-tab__label">
                WhatsApp para Contato <span className="form-tab__optional">(Opcional - Padrão 14999998888)</span>
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="(14) 99999-8888"
                className="form-tab__input"
              />
            </div>

            <div className="form-tab__group">
              <label className="form-tab__label">
                Endereço Completo <span className="form-tab__required">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rua, Número, Bairro, Cidade - Estado"
                className="form-tab__input"
              />
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="form-tab__column">
            <div className="form-tab__group">
              <label className="form-tab__label">
                Horário de Atendimento <span className="form-tab__required">*</span>
              </label>
              <input
                type="text"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                placeholder="Ex: Seg a Sex das 08h às 18h"
                className="form-tab__input"
              />
            </div>

            <div className="form-tab__group">
              <label className="form-tab__label">
                Diferenciais ou Serviços <span className="form-tab__optional">(Opcional)</span>
              </label>
              <textarea
                name="differentiators"
                value={formData.differentiators}
                onChange={handleInputChange}
                placeholder="Se vazio, a IA usará textos persuasivos e definitivos baseados no nicho escolhido."
                rows="4"
                className="form-tab__textarea"
              />
            </div>

            <div className="form-tab__group">
              <label className="form-tab__label">
                Cores Desejadas <span className="form-tab__optional">(Opcional)</span>
              </label>
              <input
                type="text"
                name="customColors"
                value={formData.customColors}
                onChange={handleInputChange}
                placeholder="Ex: #FF0000 e Branco. (Deixe vazio para IA decidir)"
                className="form-tab__input"
              />
            </div>
          </div>
        </div>

        {/* Seção de Tipo de Página */}
        <div className="form-tab__arch-section">
          <label className="form-tab__arch-title">
            Arquitetura do Projeto
          </label>
          <div className="form-tab__radio-group">

            <label className="form-tab__radio-label">
              <input
                type="radio"
                name="pageType"
                value="simples"
                checked={formData.pageType === 'simples'}
                onChange={handleInputChange}
                className="form-tab__radio-input"
              />
              <div className={`form-tab__radio-card ${formData.pageType === 'simples' ? 'form-tab__radio-card--simples-active' : ''}`}>
                <div className="form-tab__radio-header">
                  <div className={`form-tab__radio-circle ${formData.pageType === 'simples' ? 'form-tab__radio-circle--simples-active' : ''}`}>
                    {formData.pageType === 'simples' && <div className="form-tab__radio-dot form-tab__radio-dot--simples"></div>}
                  </div>
                  <span className="form-tab__radio-name">Lead Direto (Simples)</span>
                </div>
                <p className="form-tab__radio-desc">Foco total no CTA de WhatsApp. Sem formulários complexos. Ideal para serviços rápidos.</p>
              </div>
            </label>

            <label className="form-tab__radio-label">
              <input
                type="radio"
                name="pageType"
                value="completa"
                checked={formData.pageType === 'completa'}
                onChange={handleInputChange}
                className="form-tab__radio-input"
              />
              <div className={`form-tab__radio-card ${formData.pageType === 'completa' ? 'form-tab__radio-card--completa-active' : ''}`}>
                <div className="form-tab__radio-header">
                  <div className={`form-tab__radio-circle ${formData.pageType === 'completa' ? 'form-tab__radio-circle--completa-active' : ''}`}>
                    {formData.pageType === 'completa' && <div className="form-tab__radio-dot form-tab__radio-dot--completa"></div>}
                  </div>
                  <span className="form-tab__radio-name">
                    Formulário de Automação
                    <Sparkles style={{ width: '1rem', height: '1rem', color: 'var(--color-indigo-400)', flexShrink: 0 }} />
                  </span>
                </div>
                <p className="form-tab__radio-desc">Inclui formulário avançado integrado a um webhook (n8n/Make) para captura de leads detalhada.</p>
              </div>
            </label>

          </div>

          {formData.pageType === 'completa' && (
            <div className="form-tab__webhook-box animate-in">
              <div className="form-tab__group">
                <label className="form-tab__label">
                  URL do Webhook (n8n, Make, Zapier) <span className="form-tab__required" style={{ color: 'var(--color-indigo-400)' }}>*</span>
                </label>
                <input
                  type="url"
                  name="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={handleInputChange}
                  placeholder="https://seu-n8n.com/webhook/..."
                  className={`form-tab__input ${isDark ? 'form-tab__webhook-input-dark' : 'form-tab__webhook-input-light'}`}
                />
              </div>

              <div className="form-tab__webhook-info">
                <Cpu style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-indigo-400)', flexShrink: 0, marginTop: '0.125rem' }} />
                <div>
                  <p className="form-tab__webhook-info-title">Payload Rigoroso Ativado</p>
                  <p className="form-tab__webhook-info-text">
                    A IA será instruída a criar os inputs adequados, incluindo o Select de "Momento" com os options exatos informados. O formulário enviará um POST para a URL acima com a seguinte estrutura JSON:
                  </p>
                  <pre className="form-tab__code-preview">
{`{
  "nome": "string",
  "email": "string",
  "whatsapp": "string",
  "momento": "presenca-digital | captacao-leads | ...",
  "mensagem": "string",
  "origem": "hostname",
  "data_envio": "DD/MM/YYYY, HH:MM:SS",
  "data_iso": "YYYY-MM-DDTHH:MM:SS.000Z"
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-tab__action">
          <button
            onClick={handleGenerate}
            className="form-tab__submit-btn"
          >
            <Rocket style={{ width: '1.5rem', height: '1.5rem', flexShrink: 0 }} />
            Sintetizar Prompt Mestre
          </button>
        </div>

      </div>
    </div>
  );
}