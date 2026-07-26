import { useState, useCallback } from 'react';
import NICHE_DATA from '../data/nicheData';

const STORAGE_PROJECTS_KEY = 'prompt_genius_projects';
const STORAGE_THEME_KEY = 'prompt_genius_theme';

const initialFormData = {
  sector: '',
  customSector: '',
  companyName: '',
  whatsapp: '',
  address: '',
  hours: '',
  differentiators: '',
  pageType: 'simples',
  webhookUrl: '',
  customColors: ''
};

function loadSavedProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Erro ao carregar projetos salvos", e);
  }
  return [];
}

function loadSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_THEME_KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

export default function useAppState() {
  const [theme, setTheme] = useState(loadSavedTheme);
  const [activeTab, setActiveTab] = useState('form');
  const [copyStatus, setCopyStatus] = useState(false);
  const [savedProjects, setSavedProjects] = useState(loadSavedProjects);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [mounted] = useState(true);
  const [formData, setFormData] = useState(initialFormData);

  // Estado para Modal de Alerta Futurista
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showCancel: false,
    confirmText: 'Entendido',
    cancelText: 'Cancelar',
    onConfirm: null,
  });

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const showAlert = useCallback((message, type = 'info', title = '', confirmText = 'Entendido') => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      showCancel: false,
      confirmText,
      cancelText: 'Cancelar',
      onConfirm: null,
    });
  }, []);

  const showConfirm = useCallback((message, onConfirm, title = 'Confirmação', confirmText = 'Confirmar Exclusão', cancelText = 'Cancelar') => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      showCancel: true,
      confirmText,
      cancelText,
      onConfirm,
    });
  }, []);

  const isDark = theme === 'dark';

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(STORAGE_THEME_KEY, next);
  }, [isDark]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleGenerate = useCallback(() => {
    if (!formData.sector || !formData.companyName || !formData.address || !formData.hours) {
      showAlert(
        "Preencha os campos obrigatórios (Área, Nome, Endereço e Horário) para gerar um prompt de alta qualidade.",
        "warning",
        "Campos Obrigatórios"
      );
      return;
    }

    if (formData.sector === 'outro' && !formData.customSector.trim()) {
      showAlert(
        "Por favor, digite qual é o segmento/área de atuação do cliente.",
        "warning",
        "Segmento Ausente"
      );
      return;
    }

    const isCustom = formData.sector === 'outro';
    const niche = NICHE_DATA[formData.sector] || NICHE_DATA.outro;
    const specificNicheName = isCustom ? formData.customSector.trim() : niche.name;

    const finalColors = formData.customColors.trim() !== '' ? formData.customColors : (isCustom ? 'A IA deve escolher uma paleta premium, moderníssima, futurista e condizente com a área de atuação informada (fornecer os códigos HEX em variáveis CSS)' : niche.colors);
    const finalDiffs = formData.differentiators.trim() !== '' ? formData.differentiators : (isCustom ? 'A IA deve listar 4 diferenciais ou serviços reais e atrativos baseados na área de atuação informada' : niche.services);

    const finalWhatsapp = formData.whatsapp.trim() !== '' ? formData.whatsapp : '(14) 99999-8888';
    const cleanWaNumber = finalWhatsapp.replace(/\D/g, '');

    // Construção dinâmica das orientações do campo 'momento' (Select do Formulário)
    let momentoInstructions = '';
    if (!isCustom && niche.momentoOptions) {
      const optionsFormatted = niche.momentoOptions
        .map(opt => `     <option value="${opt.value}">${opt.label}</option>`)
        .join('\n');
      momentoInstructions = `Label da Pergunta: "${niche.momentoLabel}"
     Options HTML e Values exatos a serem utilizados (relacionados a ${specificNicheName}):
     <option value="" disabled>Selecione uma opção...</option>
${optionsFormatted}`;
    } else {
      momentoInstructions = `Label da Pergunta: A IA deve criar uma pergunta profissional altamente relevante para o segmento do cliente "${specificNicheName}" (ex: "Qual a sua principal necessidade no momento?").
     Options HTML e Values exatos: A IA deve gerar de 4 a 5 opções de resposta 100% alinhadas ao segmento "${specificNicheName}", onde o atributo 'value' de cada option DEVE ser um slug legível em minúsculas separado por hífen (ex: value="consulta-urgente", value="orcamento-projeto", etc.) e o texto do option deve ser claro e profissional.`;
    }

    let promptText = `Atue como um Desenvolvedor Front-end Senior e Especialista em CRO (Otimização de Conversão) e Web Design Ultra Premium, Futurista e Tecnológico.
Seu objetivo é gerar o código COMPLETO, DEFINITIVO e FUNCIONAL de uma Landing Page focada em alta conversão e estética visual impressionante.

O código deve ser escrito em React, para um projeto iniciado com os comandos abaixo:
- npm create vite@latest nome-projeto -- --template react
- cd nome-projeto
- npm install
- npm install lucide-react framer-motion

Você tem total liberdade para instalar e utilizar via npm quaisquer bibliotecas adicionais que julgar necessárias para entregar o melhor resultado possível (por exemplo react-router-dom, axios, bibliotecas de máscara de input, animação, formulários, etc). Execute os comandos de instalação necessários normalmente, sem se restringir a uma lista fixa de pacotes.

REGRAS DE ESTILIZAÇÃO E DESIGN (MUITO IMPORTANTE - SEM TAILWIND):
1. É RIGOROSAMENTE PROIBIDO O USO DO TAILWIND CSS. Não utilize Tailwind sob hipótese alguma.
2. Escreva todo o estilo utilizando Vanilla CSS puro (arquivos .css modulares por componente ou integrados), estruturado com Variáveis CSS (:root), Flexbox, Grid, e animações com keyframes ou \`framer-motion\`.
3. ESTÉTICA PREMIUM, FUTURISTA E TECNOLÓGICA: O site DEVE ter o visual de um produto web de altíssimo nível. Utilize paleta de cores moderna, efeitos de glassmorphism (vidro fosco com backdrop-filter), bordas elegantes com brilho sutil (glow), gradientes fluidos, micro-interações ao passar o mouse (hover) e animações de scroll reveal com \`framer-motion\`.

REGRAS DE ORGANIZAÇÃO DE CÓDIGO:
1. Estruture o projeto em múltiplos componentes e arquivos sempre que isso deixar o código mais organizado e profissional (ex: src/components/Hero.jsx, src/components/Diferenciais.jsx, src/components/Servicos.jsx, src/components/Autoridade.jsx, src/components/Contato.jsx, src/components/Footer.jsx, importados no App.jsx). Não é obrigatório concentrar tudo em um único arquivo.
2. Use fetch nativo ou uma biblioteca HTTP de sua preferência para requisições.
3. Para ícones, utilize \`lucide-react\` como base, podendo complementar com outras bibliotecas se necessário.
4. Para animações, micro-interações, transições de entrada e efeitos visuais, utilize obrigatoriamente \`framer-motion\`.

REGRAS DE QUALIDADE DE COPY E CONTEÚDO (MUITO IMPORTANTE):
1. PROIBIDO usar placeholders textuais como "[Insira seu texto]", "[Cor]", "Lorem Ipsum" ou enviar instruções de como eu devo montar a página. Os placeholders precisam combinar com a página e com o ramo de atuação do cliente, sendo extremamente profissional.
2. PROIBIDO usar títulos em negrito (usando asteriscos duplos) nas suas explicações.
3. PROIBIDO CRIAR DEPOIMENTOS FALSOS OU CLIENTES FICTÍCIOS. Todos os dados, métricas e textos de autoridade e prova social devem ser reais e 100% relacionados à empresa ${formData.companyName} e ao seu segmento.
4. Entregue o código completo e funcional do projeto, podendo estruturar em múltiplos componentes/arquivos como descrito acima. Não perca tempo com explicações longas em texto.
5. Escreva todos os textos da página de forma DEFINITIVA, persuasiva, focada em conversão e alinhada ao tom de voz da área de atuação.

--- DADOS DA EMPRESA E IDENTIDADE VISUAL ---
Nicho / Área de Atuação: ${specificNicheName}
Nome da Empresa: ${formData.companyName}
Cores Exatas a serem aplicadas (use os hex codes em variáveis CSS): ${finalColors}
Tom de Voz do Copywriting: ${isCustom ? 'A IA deve adotar o tom de voz perfeito, profissional e persuasivo para este nicho específico.' : niche.tone} Mantenha todos os textos do site neste tom exato.
Telefone/WhatsApp: ${finalWhatsapp}
Endereço Completo: ${formData.address}
Horário de Atendimento: ${formData.hours}

--- ESTRUTURA OBRIGATÓRIA DA PÁGINA (MOBILE-FIRST, FUTURISTA & ULTRA PREMIUM) ---
A página deverá ter as seguintes seções com animações framer-motion:

Seção 1: Hero Section (Dobra principal futurista de alto impacto)
- Headline: ${isCustom ? 'Crie uma headline de alto impacto baseada no nicho informado.' : niche.headline}
- Subheadline: ${isCustom ? 'Crie uma subheadline persuasiva e focada em resultados baseada no nicho.' : niche.subheadline}
- Call to Action (CTA): Botão grande, pulsante e tecnológico (${isCustom ? 'Crie o texto do CTA' : `com o texto "${niche.cta}"`}). Este botão deve levar para o link: https://wa.me/55${cleanWaNumber}
- Visual: Fundo futurista escuro/elegante, gradientes fluidos, glassmorphism e animações suaves de entrada com framer-motion.

Seção 2: Sobre / Diferenciais
- Apresente 3 a 4 cards de diferenciais baseados nos seguintes pontos fortes: ${finalDiffs}. Escreva os textos finais.
- Cada card DEVE ter um ícone representativo do \`lucide-react\`.
- Efeito de hover: transições suaves com brilho (glow), elevação dos cards e sombras profundas.

Seção 3: Serviços Principais
- Detalhe de forma comercial, tecnológica e atrativa os serviços prestados pela ${formData.companyName}. Crie layouts em grid com cards estilizados e ícones do lucide-react.

Seção 4: Prova Social & Autoridade Real (SEM DEPOIMENTOS FALSOS)
- ATENÇÃO: É PROIBIDO CRIAR DEPOIMENTOS FALSOS OU CLIENTES FICTÍCIOS.
- Crie uma seção focada em Autoridade, Números de Impacto e Pilares de Confiança da ${formData.companyName}.
- Exiba estatísticas/métricas reais do segmento (ex: anos de experiência, precisão no atendimento, rigor técnico, garantias ou selos de excelência).
- Apresente motivos concretos pelos quais o cliente deve escolher a ${formData.companyName} em relação aos concorrentes.

Seção 5: Contato e Localização
- Exiba o Endereço (${formData.address}) e o Horário (${formData.hours}).
- Integre um iframe real do Google Maps utilizando este endereço. Coloque width 100% e height 350px ou 400px com bordas arredondadas e estética condizente.
`;

    if (formData.pageType === 'completa') {
      promptText += `
ALERTA MÁXIMO: IMPLEMENTAÇÃO DE FORMULÁRIO COM WEBHOOK ESTRITO E RELEVANTE AO CLIENTE
- Nesta seção de Contato, crie um Formulário de Contato completo com visual futurista e glassmorphism.
- O formulário DEVE ter EXATAMENTE os seguintes campos:
  1. Nome Completo (input text, required)
  2. E-mail (input email, required)
  3. WhatsApp (input text, required)
  4. Um campo SELECT OBRIGATÓRIO (dropdown) onde o 'name' e o 'id' devem ser "momento".
     As especificações deste campo 'momento' DEVEM SER RIGOROSAMENTE PERSONALIZADAS PARA O NICHO DO CLIENTE (${specificNicheName}):
     ${momentoInstructions}

  5. Mensagem (textarea, required)

- No evento onSubmit (handleSubmit), previna o comportamento padrão e envie os dados (via fetch nativo ou biblioteca HTTP de sua escolha, método POST) para a EXATA URL: ${formData.webhookUrl || 'COLOQUE_URL_DO_WEBHOOK_AQUI'}
- O objeto JSON enviado no 'body' da requisição (usando JSON.stringify) DEVE possuir rigorosamente a exata nomenclatura de chaves abaixo:
{
  "nome": valor_do_estado_nome,
  "email": valor_do_estado_email,
  "whatsapp": valor_do_estado_whatsapp,
  "momento": valor_do_estado_momento,
  "mensagem": valor_do_estado_mensagem,
  "origem": window.location.hostname,
  "data_envio": new Date().toLocaleString('pt-BR'),
  "data_iso": new Date().toISOString()
}
- O valor enviado na chave "momento" será o slug do option selecionado no dropdown, garantindo que o webhook receba a opção específica relevante para o cliente (${specificNicheName}).
- Implemente estado de 'loading' com spinner/animação no botão de submit.
- Após sucesso (resposta ok da requisição), exiba uma mensagem de sucesso elegante na tela e limpe todos os campos. Trate erros exibindo mensagem de falha.
`;
    } else {
      promptText += `
- Nesta seção de Contato, NÃO adicione formulário complexo. Adicione apenas botões de ação rápida, dando destaque extremo ao botão de WhatsApp apontando para https://wa.me/55${cleanWaNumber}.
`;
    }

    promptText += `
Seção 6: Footer Premium
- Desenvolva um rodapé escuro elegante contendo o nome da empresa (${formData.companyName}), ano atual e ícones de redes sociais.

--- REQUISITOS TÉCNICOS GERAIS DE SEO E ESTRUTURA ---
- Garanta hierarquia correta de headings (Apenas um H1 no topo, H2 nas seções, H3 nos cards).
- Use tags semânticas (<main>, <section>, <article>, <nav>, <footer>).
- O design deve ser totalmente responsivo (mobile-first), futurista, interativo e SEM TAILWIND CSS.
- Injete diretamente no corpo do componente a seguinte tag <script type="application/ld+json"> para SEO LocalBusiness, exatamente com os dados abaixo:
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${formData.companyName}",
  "telephone": "${finalWhatsapp}",
  "address": { "@type": "PostalAddress", "streetAddress": "${formData.address}", "addressCountry": "BR" },
  "openingHours": "${formData.hours}"
}

Lembre-se: Entregue o código completo e funcional do projeto em React + Vanilla CSS (SEM TAILWIND), sem explicações longas em texto, sem depoimentos falsos e NENHUM texto fictício de placeholder. Escreva a copy inteira, real, futurista e definitiva em todos os arquivos!
`;

    setGeneratedPrompt(promptText);

    // Salvar automaticamente o projeto gerado no localStorage
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const pageTypeLabel = formData.pageType === 'completa' ? 'Formulário Webhook' : 'Lead Direto (WhatsApp)';

    const newProject = {
      id: Date.now().toString(),
      name: formData.companyName,
      sector: specificNicheName,
      pageType: pageTypeLabel,
      date: dateFormatted,
      prompt: promptText,
      data: { ...formData }
    };

    setSavedProjects(prev => {
      const filtered = prev.filter(p => p.name.toLowerCase() !== formData.companyName.toLowerCase());
      const updated = [newProject, ...filtered];
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Zerar os campos do formulário para preencher um novo prompt
    setFormData(initialFormData);

    setActiveTab('prompt');
  }, [formData, showAlert]);

  const handleCopy = useCallback(async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch {
      showAlert('Falha ao copiar. Selecione o texto e copie manualmente.', 'error', 'Erro ao Copiar');
    }
  }, [generatedPrompt, showAlert]);

  const handleSaveProject = useCallback(() => {
    if (!formData.companyName || !generatedPrompt) {
      showAlert("Gere um prompt primeiro para poder salvar o projeto.", "warning", "Prompt Não Gerado");
      return;
    }
    showAlert('Projeto já armazenado com sucesso no seu histórico de projetos!', 'success', 'Projeto Armazenado');
  }, [formData.companyName, generatedPrompt, showAlert]);

  const loadProject = useCallback((project) => {
    setFormData(project.data);
    setGeneratedPrompt(project.prompt);
    setActiveTab('prompt');
  }, []);

  const deleteProject = useCallback((id) => {
    showConfirm(
      'Tem certeza que deseja excluir este projeto do seu histórico de projetos salvas?',
      () => {
        setSavedProjects(prev => {
          const updated = prev.filter(p => p.id !== id);
          localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
          return updated;
        });
      },
      'Excluir Projeto',
      'Confirmar Exclusão'
    );
  }, [showConfirm]);

  const updateProject = useCallback((id, updatedFields) => {
    setSavedProjects(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    // State
    theme,
    isDark,
    activeTab,
    copyStatus,
    savedProjects,
    generatedPrompt,
    mounted,
    formData,
    alertState,
    // Actions
    setActiveTab,
    toggleTheme,
    handleInputChange,
    handleGenerate,
    handleCopy,
    handleSaveProject,
    loadProject,
    deleteProject,
    updateProject,
    showAlert,
    showConfirm,
    hideAlert
  };
}