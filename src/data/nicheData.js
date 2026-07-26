// Base de conhecimento especializada por nicho
const NICHE_DATA = {
  advogados: {
    name: 'Advocacia / Jurídico',
    colors: '#0B1B3D (Azul Marinho Escuro principal), #D4AF37 (Dourado Premium detalhes), #FFFFFF (Branco fundo)',
    headline: 'Defesa especializada e estratégica para proteger seus direitos com segurança.',
    subheadline: 'Atendimento jurídico resolutivo, pautado na ética e na excelência para entregar os melhores resultados em suas demandas complexas.',
    cta: 'Falar com um Advogado Especialista',
    services: 'Consultoria jurídica preventiva corporativa, Representação em litígios de alta complexidade, Elaboração e revisão de contratos, Defesa em processos administrativos e judiciais.',
    tone: 'Altamente formal, culto, transmitindo altíssima credibilidade, segurança, sigilo e autoridade técnica imponente.',
    momentoLabel: 'Qual a sua necessidade ou assunto jurídico principal no momento?',
    momentoOptions: [
      { label: 'Preciso de auxílio ou defesa em um processo ativo', value: 'defesa-processo' },
      { label: 'Quero consultoria jurídica preventiva ou elaboração de contratos', value: 'consultoria-contratos' },
      { label: 'Preciso tirar dúvidas e entender meus direitos', value: 'duvidas-direitos' },
      { label: 'Outro assunto jurídico', value: 'outros' }
    ]
  },
  arquitetura: {
    name: 'Arquitetura e Interiores',
    colors: '#1C1C1C (Cinza Escuro/Quase Preto), #E0E0E0 (Cinza Claro), #8C7A6B (Fendi/Bege Acinzentado)',
    headline: 'Projetos exclusivos que transformam espaços comuns em experiências memoráveis.',
    subheadline: 'Unimos design atemporal, funcionalidade inteligente e sofisticação para criar ambientes que refletem perfeitamente a sua identidade e estilo de vida.',
    cta: 'Solicitar Orçamento de Projeto',
    services: 'Projetos arquitetônicos residenciais e comerciais de alto padrão, Design de interiores de luxo, Acompanhamento e gerenciamento rigoroso de obras, Consultoria de decoração.',
    tone: 'Sofisticado, inspirador, minimalista, focado em estética sublime, exclusividade e funcionalidade moderna.',
    momentoLabel: 'Qual o tipo de projeto você precisa no momento?',
    momentoOptions: [
      { label: 'Projeto Arquitetônico do Zero (Residencial / Comercial)', value: 'projeto-arquitetonico' },
      { label: 'Design de Interiores e Reforma de Alto Padrão', value: 'design-interiores' },
      { label: 'Gerenciamento e Acompanhamento Completo de Obra', value: 'gerenciamento-obra' },
      { label: 'Outro tipo de projeto', value: 'outros' }
    ]
  },
  engenharia: {
    name: 'Engenharia / Construtora',
    colors: '#003366 (Azul Aço), #FF6600 (Laranja de Destaque para CTAs), #F4F4F4 (Cinza Fundo)',
    headline: 'Soluções sólidas em engenharia com precisão, máxima segurança e inovação técnica.',
    subheadline: 'Executamos projetos complexos com rigor técnico absoluto e cumprimento inflexível de prazos, garantindo a solidez que o seu empreendimento exige.',
    cta: 'Falar com um Engenheiro Responsável',
    services: 'Cálculo estrutural avançado, Execução de obras civis e industriais, Projetos elétricos e hidrossanitários, Laudos e perícias técnicas especializadas.',
    tone: 'Técnico, direto, focado fortemente em segurança estrutural, eficiência de custos, durabilidade e cumprimento de cronogramas.',
    momentoLabel: 'Qual a necessidade da sua obra ou empresa no momento?',
    momentoOptions: [
      { label: 'Cálculo Estrutural ou Projetos de Engenharia', value: 'calculo-estrutural' },
      { label: 'Execução de Obra Civil ou Industrial', value: 'execucao-obra' },
      { label: 'Laudo Técnico, Perícia ou Regularização', value: 'laudo-tecnico' },
      { label: 'Outro serviço de engenharia', value: 'outros' }
    ]
  },
  industria: {
    name: 'Indústria / Manufatura',
    colors: '#2C3E50 (Azul Metálico), #E74C3C (Vermelho Alerta CTAs), #ECF0F1 (Prata Fundo)',
    headline: 'Alta performance, robustez e tecnologia para impulsionar a sua linha de produção.',
    subheadline: 'Equipamentos e soluções industriais projetados para entregar o máximo de eficiência, durabilidade extrema e suporte técnico especializado imediato.',
    cta: 'Solicitar Cotação Industrial',
    services: 'Fabricação de peças usinadas sob medida, Manutenção preventiva e corretiva de maquinário pesado, Automação de linhas de produção, Fornecimento de insumos industriais.',
    tone: 'Corporativo B2B, sério, focado em alta produtividade, escalabilidade, mitigação de riscos e robustez operacional.',
    momentoLabel: 'Qual a necessidade da sua operação industrial no momento?',
    momentoOptions: [
      { label: 'Fabricação de Peças / Insumos sob Medida', value: 'fabricacao-pecas' },
      { label: 'Manutenção de Maquinário ou Equipamentos', value: 'manutencao-maquinario' },
      { label: 'Automação ou Modernização de Linha de Produção', value: 'automacao-producao' },
      { label: 'Outra demanda corporativa B2B', value: 'outros' }
    ]
  },
  clinica_veterinaria: {
    name: 'Clínica Veterinária',
    colors: '#27AE60 (Verde Acolhedor), #F1C40F (Amarelo Alegre detalhes), #FFFFFF (Branco Limpo)',
    headline: 'Amor, cuidado excepcional e tecnologia avançada para a saúde do seu melhor amigo.',
    subheadline: 'Atendimento veterinário de excelência com uma equipe verdadeiramente apaixonada por animais, garantindo bem-estar e tratamento humanizado e gentil.',
    cta: 'Agendar Consulta Veterinária',
    services: 'Consultas clínicas completas, Vacinação e vermifugação protocolar, Cirurgias complexas e internação monitorada 24 horas, Exames laboratoriais e de imagem modernos para pets.',
    tone: 'Acolhedor, altamente empático, carinhoso, transmitindo absoluta confiança e tranquilidade aos tutores.',
    momentoLabel: 'Como podemos ajudar o seu pet no momento?',
    momentoOptions: [
      { label: 'Consulta de Rotina / Vacinação', value: 'consulta-rotina' },
      { label: 'Atendimento de Urgência / Pronto Socorro', value: 'atendimento-urgencia' },
      { label: 'Cirurgia, Internação ou Exames', value: 'cirurgia-exames' },
      { label: 'Outro cuidado com o pet', value: 'outros' }
    ]
  },
  clinica_medica: {
    name: 'Clínica Médica',
    colors: '#005B96 (Azul Médico Clássico principal), #6497B1 (Azul Claro Suave), #F8FAFC (Branco Neve)',
    headline: 'Cuidado integrado e tecnologia de ponta para a sua saúde e bem-estar plenos.',
    subheadline: 'Corpo clínico altamente especializado e estrutura moderna planejada para um diagnóstico preciso, rápido e atendimento profundamente humanizado.',
    cta: 'Agendar minha Consulta',
    services: 'Consultas atenciosas com médicos especialistas, Check-up preventivo completo, Acompanhamento contínuo de doenças crônicas, Pequenos procedimentos ambulatoriais com conforto.',
    tone: 'Estritamente confiável, ético, humanizado, calmo e extremamente profissional e reconfortante.',
    momentoLabel: 'Qual o tipo de atendimento médico você busca no momento?',
    momentoOptions: [
      { label: 'Agendar Consulta com Especialista', value: 'agendamento-consulta' },
      { label: 'Check-up Geral Preventivo', value: 'checkup-preventivo' },
      { label: 'Acompanhamento de Saúde Contínuo', value: 'acompanhamento-continuo' },
      { label: 'Outra necessidade de saúde', value: 'outros' }
    ]
  },
  clinica_exames: {
    name: 'Laboratório / Clínica de Exames',
    colors: '#16A085 (Verde Esmeralda Saúde), #BDC3C7 (Cinza Prata), #FFFFFF (Branco)',
    headline: 'Máxima precisão em diagnósticos e agilidade garantida na entrega dos seus resultados.',
    subheadline: 'Equipamentos de última geração e atendimento otimizado para que você tenha total segurança, rapidez e conforto na realização dos seus exames de rotina.',
    cta: 'Agendar Exame Agora',
    services: 'Exames laboratoriais de rotina e urgência, Diagnóstico por imagem de alta definição (Raio-X, Ultrassom, Tomografia), Eletrocardiograma, Coleta domiciliar com hora marcada.',
    tone: 'Direto, ágil, asséptico, focado em precisão tecnológica absoluta e facilidade para o paciente.',
    momentoLabel: 'Qual exame ou serviço você precisa agendar no momento?',
    momentoOptions: [
      { label: 'Exames Laboratoriais (Sangue, Urina, etc.)', value: 'exames-laboratoriais' },
      { label: 'Exames de Imagem (Ultrassom, Raio-X, Tomografia)', value: 'exames-imagem' },
      { label: 'Coleta Domiciliar com Hora Marcada', value: 'coleta-domiciliar' },
      { label: 'Outro exame ou orçamento', value: 'outros' }
    ]
  },
  clinica_odontologica: {
    name: 'Clínica Odontológica',
    colors: '#00A8CC (Azul Ciano Odonto), #F0F8FF (Azul Alice Fundo), #FFFFFF (Branco)',
    headline: 'Transforme seu sorriso com especialistas em estética avançada e saúde bucal.',
    subheadline: 'Tratamentos odontológicos modernos, completamente indolores e personalizados para devolver a sua autoestima com total segurança e excelência estética.',
    cta: 'Agendar Avaliação Odontológica',
    services: 'Lentes de contato dental em porcelana pura, Implantes dentários de carga imediata, Ortodontia invisível avançada, Clareamento a laser e profilaxia completa.',
    tone: 'Otimista, focado na estética e auto-estima, impecavelmente higiênico, indolor e extremamente acolhedor.',
    momentoLabel: 'Qual o seu objetivo com o seu sorriso no momento?',
    momentoOptions: [
      { label: 'Avaliação Geral / Profilaxia e Limpeza', value: 'avaliacao-limpeza' },
      { label: 'Estética Dental (Lentes de Contato / Clareamento)', value: 'estetica-dental' },
      { label: 'Implantes Dentários ou Alinhadores Invisíveis', value: 'implantes-ortodontia' },
      { label: 'Outro tratamento bucal', value: 'outros' }
    ]
  },
  barbearia: {
    name: 'Barbearia',
    colors: '#1A1A1A (Preto Absoluto), #8B5A2B (Marrom Madeira), #F5F5DC (Bege Vintage)',
    headline: 'Muito mais que um simples corte, uma verdadeira experiência de estilo e cuidado.',
    subheadline: 'Ambiente climatizado premium, cerveja gelada e os melhores e mais técnicos barbeiros da cidade prontos para alinhar o seu visual de forma impecável.',
    cta: 'Reservar meu Horário VIP',
    services: 'Corte degradê perfeito e tesoura clássico, Barboterapia relaxante com toalha quente e ozônio, Pigmentação natural de barba e cabelo, Hidratação capilar masculina premium.',
    tone: 'Descontraído, fortemente masculino, moderno, imponente e altamente convidativo.',
    momentoLabel: 'Qual serviço você deseja agendar no momento?',
    momentoOptions: [
      { label: 'Corte de Cabelo (Degradê / Clássico)', value: 'corte-cabelo' },
      { label: 'Barboterapia e Alinhamento de Barba', value: 'barboterapia-barba' },
      { label: 'Combo VIP Cabelo + Barba', value: 'combo-vip' },
      { label: 'Outro serviço de barbearia', value: 'outros' }
    ]
  },
  salao_beleza: {
    name: 'Salão de Beleza / Estética',
    colors: '#FFB6C1 (Rosa Claro Blush), #333333 (Grafite Elegante), #FAFAFA (Off-White)',
    headline: 'Realce a sua beleza natural e empodere-se com nossos profissionais visagistas.',
    subheadline: 'Um espaço luxuoso pensado exclusivamente para o seu relaxamento e transformação. Utilizamos apenas produtos premium e técnicas globais atualizadas.',
    cta: 'Agendar meu Momento de Beleza',
    services: 'Mechas, luzes e colorimetria avançada sem danos, Cortes baseados em visagismo, Penteados e maquiagem profissional de longa duração, Terapias capilares e cronograma intenso.',
    tone: 'Elegante, empoderador, focado na elevação da autoestima, luxo acessível e tendências de moda.',
    momentoLabel: 'Qual o seu objetivo de beleza no momento?',
    momentoOptions: [
      { label: 'Transformação de Cabelo (Corte / Mechas / Colorimetria)', value: 'transformacao-cabelo' },
      { label: 'Tratamentos e Terapias Capilares Intensivas', value: 'tratamento-capilar' },
      { label: 'Maquiagem e Penteado Profissional para Evento', value: 'make-penteado' },
      { label: 'Outro serviço de estética', value: 'outros' }
    ]
  },
  mecanica: {
    name: 'Oficina Mecânica / Auto Center',
    colors: '#E63946 (Vermelho Ação), #1D3557 (Azul Marinho Escuro), #F1FAEE (Branco Gelo)',
    headline: 'Transparência, rapidez e peças originais para o seu veículo rodar com total segurança.',
    subheadline: 'Diagnóstico computadorizado de última geração e mecânicos experientes. Consertamos o problema real, sem enrolação e com garantia absoluta do serviço.',
    cta: 'Solicitar Orçamento no WhatsApp',
    services: 'Revisão preventiva completa por quilometragem, Troca de óleo de alta performance e filtros, Manutenção avançada de freios e suspensão, Diagnóstico eletrônico de injeção complexo.',
    tone: 'Extremamente prático, honesto, direto ao ponto, focado na resolução rápida de problemas mecânicos e segurança familiar.',
    momentoLabel: 'Qual a necessidade do seu veículo no momento?',
    momentoOptions: [
      { label: 'Revisão Preventiva por Quilometragem / Troca de Óleo', value: 'revisao-preventiva' },
      { label: 'Manutenção de Freios, Suspensão ou Motor', value: 'manutencao-mecanica' },
      { label: 'Diagnóstico Eletrônico de Injeção e Barulhos', value: 'diagnostico-eletronico' },
      { label: 'Outro serviço automotivo', value: 'outros' }
    ]
  },
  outro: {
    name: 'Outro Segmento (Personalizado)',
    colors: 'IA DEVE DEFINIR CORES PREMIUM BASEADAS NO NICHO',
    headline: 'IA DEVE DEFINIR HEADLINE PERSUASIVA BASEADA NO NICHO',
    subheadline: 'IA DEVE DEFINIR SUBHEADLINE DETALHADA E CONVERSIVA BASEADA NO NICHO',
    cta: 'IA DEVE DEFINIR CTA FORTE',
    services: 'IA DEVE CRIAR 4 SERVIÇOS/DIFERENCIAIS REAIS BASEADOS NO NICHO',
    tone: 'IA DEVE ADOTAR O TOM DE VOZ PERFEITO PARA ESTE NICHO ESPECÍFICO.'
  }
};

export default NICHE_DATA;