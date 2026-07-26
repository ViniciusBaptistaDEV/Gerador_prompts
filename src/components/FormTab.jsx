import { Globe, Sparkles, Cpu, Rocket } from 'lucide-react';

export default function FormTab({
  isDark,
  mounted,
  formData,
  handleInputChange,
  handleGenerate,
  titleColor,
  mutedText,
  labelColor,
  inputBase,
  cardBorder,
  panelBg
}) {
  return (
    <div className={`rounded-2xl shadow-2xl border backdrop-blur-2xl overflow-hidden transition-all duration-500 ${panelBg} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className={`flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="min-w-0">
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3 ${titleColor}`}>
              <Globe className="text-cyan-400 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
              <span className="truncate">Parâmetros do Cliente</span>
            </h2>
            <p className={`mt-1 sm:mt-2 text-xs sm:text-sm ${mutedText}`}>Preencha os dados abaixo para sintetizar a inteligência da Landing Page.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

          {/* Coluna 1 */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                Setor / Área de Atuação <span className="text-cyan-400">*</span>
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all appearance-none ${inputBase}`}
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
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Digite o Nome do Segmento Personalizado <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="customSector"
                  value={formData.customSector}
                  onChange={handleInputChange}
                  placeholder="Ex: Contabilidade, Tecnologia, Corretor de Imóveis..."
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${isDark ? 'border-cyan-500/50 bg-cyan-950/20 text-white focus:ring-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-indigo-300 bg-indigo-50 text-slate-800 focus:ring-indigo-400'}`}
                />
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                Nome da Empresa / Profissional <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Ex: Clínica Sorriso Perfeito"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${inputBase}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                WhatsApp para Contato <span className={`font-normal ${mutedText}`}>(Opcional - Padrão 14999998888)</span>
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="(14) 99999-8888"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${inputBase}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                Endereço Completo <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rua, Número, Bairro, Cidade - Estado"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${inputBase}`}
              />
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                Horário de Atendimento <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                placeholder="Ex: Seg a Sex das 08h às 18h"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${inputBase}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                Diferenciais ou Serviços <span className={`font-normal ${mutedText}`}>(Opcional)</span>
              </label>
              <textarea
                name="differentiators"
                value={formData.differentiators}
                onChange={handleInputChange}
                placeholder="Se vazio, a IA usará textos persuasivos e definitivos baseados no nicho escolhido."
                rows="4"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${inputBase}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                Cores Desejadas <span className={`font-normal ${mutedText}`}>(Opcional)</span>
              </label>
              <input
                type="text"
                name="customColors"
                value={formData.customColors}
                onChange={handleInputChange}
                placeholder="Ex: #FF0000 e Branco. (Deixe vazio para IA decidir)"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${inputBase}`}
              />
            </div>
          </div>
        </div>

        {/* Seção de Tipo de Página */}
        <div className={`mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 border-t transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <label className={`block text-base sm:text-lg font-bold mb-3 sm:mb-4 ${titleColor}`}>
            Arquitetura do Projeto
          </label>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6">

            <label className="flex-1 relative group cursor-pointer">
              <input
                type="radio"
                name="pageType"
                value="simples"
                checked={formData.pageType === 'simples'}
                onChange={handleInputChange}
                className="peer sr-only"
              />
              <div className={`h-full border rounded-xl p-4 sm:p-5 transition-all peer-checked:border-cyan-500 peer-checked:bg-cyan-500/10 peer-checked:shadow-[0_0_20px_rgba(6,182,212,0.15)] ${cardBorder}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-500 peer-checked:border-cyan-500 flex items-center justify-center flex-shrink-0">
                    {formData.pageType === 'simples' && <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>}
                  </div>
                  <span className={`font-bold text-base sm:text-lg ${titleColor}`}>Lead Direto (Simples)</span>
                </div>
                <p className={`text-xs sm:text-sm ml-8 ${mutedText}`}>Foco total no CTA de WhatsApp. Sem formulários complexos. Ideal para serviços rápidos.</p>
              </div>
            </label>

            <label className="flex-1 relative group cursor-pointer">
              <input
                type="radio"
                name="pageType"
                value="completa"
                checked={formData.pageType === 'completa'}
                onChange={handleInputChange}
                className="peer sr-only"
              />
              <div className={`h-full border rounded-xl p-4 sm:p-5 transition-all peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 peer-checked:shadow-[0_0_20px_rgba(99,102,241,0.15)] ${cardBorder}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-500 peer-checked:border-indigo-500 flex items-center justify-center flex-shrink-0">
                    {formData.pageType === 'completa' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                  </div>
                  <span className={`font-bold text-base sm:text-lg flex items-center gap-2 ${titleColor}`}>
                    Formulário de Automação
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 flex-shrink-0" />
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ml-8 ${mutedText}`}>Inclui formulário avançado integrado a um webhook (n8n/Make) para captura de leads detalhada.</p>
              </div>
            </label>

          </div>

          {formData.pageType === 'completa' && (
            <div className={`rounded-xl p-4 sm:p-5 lg:p-6 border space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-top-2 transition-colors duration-500 ${isDark ? 'bg-slate-950/80 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'}`}>
              <div>
                <label className={`block text-sm font-medium mb-2 ${labelColor}`}>
                  URL do Webhook (n8n, Make, Zapier) <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="url"
                  name="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={handleInputChange}
                  placeholder="https://seu-n8n.com/webhook/..."
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-800'}`}
                />
              </div>

              <div className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border transition-colors duration-500 ${isDark ? 'bg-indigo-950/30 border-indigo-500/20' : 'bg-white border-indigo-200'}`}>
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-indigo-400 mb-2">Payload Rigoroso Ativado</p>
                  <p className={`text-sm leading-relaxed ${mutedText}`}>
                    A IA será instruída a criar os inputs adequados, incluindo o Select de "Momento" com os options exatos informados. O formulário enviará um POST para a URL acima com a seguinte estrutura JSON:
                  </p>
                  <pre className={`mt-3 p-3 rounded-lg border text-xs font-mono overflow-x-auto ${isDark ? 'bg-black/60 border-slate-800 text-indigo-200' : 'bg-slate-900 border-slate-700 text-indigo-200'}`}>
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

        <div className="mt-6 sm:mt-8 lg:mt-10">
          <button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] text-sm sm:text-base"
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            Sintetizar Prompt Mestre
          </button>
        </div>

      </div>
    </div>
  );
}