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
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const isDark = theme === 'dark';

  // Set mounted after first render
  setTimeout(() => {
    if (!mounted) setMounted(true);
  }, 50);

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
      alert("Preencha os campos obrigatórios (Área, Nome, Endereço e Horário) para gerar um prompt de alta qualidade.");
      return;
    }

    if (formData.sector === 'outro' && !formData.customSector.trim()) {
      alert("Por favor, digite qual é o segmento/área de atuação do cliente.");
      return;
    }

    const isCustom = formData.sector === 'outro';
    const niche = NICHE_DATA[formData.sector] || NICHE_DATA.outro;
    const specificNicheName = isCustom ? formData.customSector.trim() : niche.name;

    const finalColors = formData.customColors.trim() !== '' ? formData.customColors : (isCustom ? 'A IA deve escolher uma paleta premium, moderna e condizente com a área de atuação informada (fornecer os códigos HEX)' : niche.colors);
    const finalDiffs = formData.differentiators.trim() !== '' ? formData.differentiators : (isCustom ? 'A IA deve listar 4 diferenciais ou serviços reais e atrativos baseados na área de atuação informada' : niche.services);

    const finalWhatsapp = formData.whatsapp.trim() !== '' ? formData.whatsapp : '(14) 99999-8888';
    const cleanWaNumber = finalWhatsapp.replace(/\D/g, '');

    let promptText = `Atue como um Desenvolvedor Front-end Senior e Especialista em CRO (Otimização de Conversão) e Web Design Premium.
Seu objetivo é gerar o código COMPLETO, DEFINITIVO e FUNCIONAL de uma Landing Page focada em alta conversão.

O código deve ser escrito em React, para um projeto iniciado com os comandos abaixo:
- npm create vite@latest nome-projeto -- --template react
- cd nome-projeto
- npm install
- npm install lucide-react framer-motion

Você tem total liberdade para instalar e utilizar via npm quaisquer bibliotecas adicionais que julgar necessárias para entregar o melhor resultado possível (por exemplo react-router-dom, axios, bibliotecas de máscara de input, animação, formulários, etc). Execute os comandos de instalação necessários normalmente, sem se restringir a uma lista fixa de pacotes.

REGRAS DE ORGANIZAÇÃO DE CÓDIGO:
1. Estruture o projeto em múltiplos componentes e arquivos sempre que isso deixar o código mais organizado e profissional (ex: src/components/Hero.jsx, src/components/Diferenciais.jsx, src/components/Servicos.jsx, src/components/Depoimentos.jsx, src/components/Contato.jsx, src/components/Footer.jsx, importados no App.jsx). Não é obrigatório concentrar tudo em um único arquivo.
2. Use fetch nativo ou uma biblioteca HTTP de sua preferência para requisições.
3. Para ícones, utilize \`lucide-react\` como base, podendo complementar com outras bibliotecas se necessário.
4. Para animações, micro-interações, efeitos glassmorphism e scroll reveal, utilize \`framer-motion\`. O design deve ser altamente futurista, fluido e premium.

REGRAS DE QUALIDADE DE COPY E CONTEÚDO (MUITO IMPORTANTE):
1. PROIBIDO usar placeholders textuais como "[Insira seu texto]", "[Cor]", "Lorem Ipsum" ou enviar instruções de como eu devo montar a página.
2. PROIBIDO usar títulos em negrito (usando asteriscos duplos) nas suas explicações.
3. Entregue o código completo e funcional do projeto, podendo estruturar em múltiplos componentes/arquivos como descrito acima. Não perca tempo com explicações longas em texto.
4. Escreva todos os textos da página de forma DEFINITIVA, persuasiva, focada em conversão e alinhada ao tom de voz da área de atuação.

--- DADOS DA EMPRESA E IDENTIDADE VISUAL ---
Nicho / Área de Atuação: ${specificNicheName}
Nome da Empresa: ${formData.companyName}
Cores Exatas a serem aplicadas (use os hex codes): ${finalColors}
Tom de Voz do Copywriting: ${isCustom ? 'A IA deve adotar o tom de voz perfeito, profissional e persuasivo para este nicho específico.' : niche.tone} Mantenha todos os textos do site neste tom exato.
Telefone/WhatsApp: ${finalWhatsapp}
Endereço Completo: ${formData.address}
Horário de Atendimento: ${formData.hours}

--- ESTRUTURA OBRIGATÓRIA DA PÁGINA (MOBILE-FIRST) ---
A página deverá ter as seguintes seções:

Seção 1: Hero Section (Dobra principal de impacto)
- Headline: ${isCustom ? 'Crie uma headline de alto impacto baseada no nicho informado.' : niche.headline}
- Subheadline: ${isCustom ? 'Crie uma subheadline persuasiva e focada em resultados baseada no nicho.' : niche.subheadline}
- Call to Action (CTA): Botão grande e pulsante (${isCustom ? 'Crie o texto do CTA' : `com o texto "${niche.cta}"`}). Este botão deve levar para o link: https://wa.me/55${cleanWaNumber}
- Visual: Fundo elegante, possivelmente com texturas sutis ou gradientes premium usando framer-motion para animações de fade-up ao carregar.

Seção 2: Sobre / Diferenciais
- Apresente 3 a 4 cards de diferenciais baseados nos seguintes pontos fortes: ${finalDiffs}. Escreva os textos finais.
- Cada card DEVE ter um ícone representativo do \`lucide-react\`.
- Efeito de hover: transições suaves e sombras profundas.

Seção 3: Serviços Principais
- Detalhe de forma comercial e atrativa os serviços. Crie layouts em grid ilustrados com ícones.

Seção 4: Prova Social / Depoimentos
- Escreva 3 depoimentos fictícios, porém extremamente realistas, profissionais e definitivos de clientes elogiando a ${formData.companyName}.
- Inclua nomes de clientes e adicione ícones de estrelas.

Seção 5: Contato e Localização
- Exiba o Endereço (${formData.address}) e o Horário (${formData.hours}).
- Integre um iframe real do Google Maps utilizando este endereço. Coloque o width 100% e height 300 ou 400.
`;

    if (formData.pageType === 'completa') {
      promptText += `
ALERTA MÁXIMO: IMPLEMENTAÇÃO DE FORMULÁRIO COM WEBHOOK ESTRITO
- Nesta seção de Contato, crie um Formulário de Contato completo com visual futurista e glassmorphism.
- O formulário DEVE ter EXATAMENTE os seguintes campos:
  1. Nome Completo (input text, required)
  2. E-mail (input email, required)
  3. WhatsApp (input text, required)
  4. Um campo SELECT OBRIGATÓRIO (dropdown) onde o 'name' e o 'id' devem ser "momento". A label deve ser: "Que tipo de solução faz mais sentido para o seu negócio hoje?". Os options HTML DEVEM ser RIGOROSAMENTE estes (use os exatos values abaixo):
     <option value="" disabled>Selecione uma opção...</option>
     <option value="presenca-digital">Quero fortalecer minha presença online</option>
     <option value="captacao-leads">Quero gerar mais leads e contatos</option>
     <option value="leads-plus">Quero automatizar processos e receber leads com mais velocidade</option>
     <option value="leads-plus-premium">Quero uma solução completa com IA e automação</option>
     <option value="outros">Outro objetivo</option>
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
- Implemente estado de 'loading' no botão de submit.
- Após sucesso (resposta ok da requisição), exiba uma mensagem de sucesso na tela e limpe todos os campos. Trate erros exibindo mensagem de falha.
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
- O design deve ser totalmente responsivo (mobile-first).
- Injete diretamente no corpo do componente a seguinte tag <script type="application/ld+json"> para SEO LocalBusiness, exatamente com os dados abaixo:
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${formData.companyName}",
  "telephone": "${finalWhatsapp}",
  "address": { "@type": "PostalAddress", "streetAddress": "${formData.address}", "addressCountry": "BR" },
  "openingHours": "${formData.hours}"
}

Lembre-se: Entregue o código completo e funcional do projeto (podendo organizar em múltiplos componentes e arquivos), sem explicações longas em texto e NENHUM texto fictício de placeholder. Escreva a copy inteira, real e definitiva em todos os arquivos!
`;

    setGeneratedPrompt(promptText);
    setActiveTab('prompt');
  }, [formData]);

  const handleCopy = useCallback(async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch {
      alert('Falha ao copiar. Selecione o texto e copie manualmente.');
    }
  }, [generatedPrompt]);

  const handleSaveProject = useCallback(() => {
    if (!formData.companyName || !generatedPrompt) {
      alert("Gere um prompt primeiro para poder salvar o projeto.");
      return;
    }

    const nicheName = formData.sector === 'outro' ? (formData.customSector || 'Personalizado') : (NICHE_DATA[formData.sector]?.name || 'Outro');

    const newProject = {
      id: Date.now().toString(),
      name: formData.companyName,
      sector: nicheName,
      date: new Date().toLocaleDateString('pt-BR'),
      prompt: generatedPrompt,
      data: formData
    };
    const updated = [newProject, ...savedProjects];
    setSavedProjects(updated);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
    alert('Projeto salvo com sucesso!');
  }, [formData, generatedPrompt, savedProjects]);

  const loadProject = useCallback((project) => {
    setFormData(project.data);
    setGeneratedPrompt(project.prompt);
    setActiveTab('prompt');
  }, []);

  const deleteProject = useCallback((id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto salvo?')) {
      const updated = savedProjects.filter(p => p.id !== id);
      setSavedProjects(updated);
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
    }
  }, [savedProjects]);

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
    // Actions
    setActiveTab,
    toggleTheme,
    handleInputChange,
    handleGenerate,
    handleCopy,
    handleSaveProject,
    loadProject,
    deleteProject,
  };
}