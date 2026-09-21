const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const barraProgresso = document.querySelector(".barra-progresso-preenchimento");

const perguntas = [
    {
        enunciado: "Em seu primeiro dia na Escola Técnica de Jujutsu de Tóquio, você dá de cara com Satoru Gojo usando seus óculos escuros e comendo doces. Ele te dá um tchauzinho animado. Qual é o seu primeiro pensamento?",
        alternativas: [
            {
                texto: "Ele parece ser muito arrogante e irresponsável para ser o mais forte.", 
                afirmacao: "No começo, você viu Gojo com desconfiança por causa do seu jeito brincalhão."
            },
            {
                texto: "Ele é incrível! Transmite uma confiança absurda.",
                afirmacao: "Desde o primeiro momento, você se impressionou com a presença marcante de Gojo."
            }
        ]
    },
    {
        enunciado: "Durante um treinamento prático, Gojo decide demonstrar o 'Feitiço Ilimitado' e a técnica 'Azul' destruindo parte do cenário sem esforço nenhum. Que atitude você toma em relação ao poder dele?",
        alternativas: [
            {
                texto: "Tenta estudar a teoria por trás do Infinito para entender perfeitamente como ele manipula o espaço.",
                afirmacao: "Ao presenciar as habilidades dele, você buscou entender a fundo a lógica por trás do Infinito."
            },
            {
                texto: "Fica apenas chocado com a força bruta e aceita que ele está em outro patamar impossível de alcançar.",
                afirmacao: "Diante do poder dele, você reconheceu que ele habitava um nível inalcançável."
            }
        ]
    },
    {
        enunciado: "Gojo costuma dizer que quer criar uma nova geração de feiticeiros fortes para não precisar carregar o mundo Jujutsu sozinho. Em um debate com seus colegas, como você se posiciona sobre as intenções dele?",
        alternativas: [
            {
                texto: "Acredita que ele realmente se importa com o futuro dos alunos e quer protegê-los de um sistema corrompido.", 
                afirmacao: "Você sempre defendeu que o objetivo dele era proteger os jovens de um sistema ultrapassado."
            },
            {
                texto: "Acha que ele faz isso porque está entediado no topo e quer aliados que consigam acompanhá-lo.",
                afirmacao: "Para você, o desejo dele de formar fortes aliados vinha da própria solidão de estar no topo."
            }
        ]
    },
    {
        enunciado: "Chega o momento crítico do Incidente de Shibuya. Gojo é selado na Prisão Confinadora (Gokumonkyo). Qual o seu plano de ação imediato?",
        alternativas: [
            {
                texto: "Montar uma força-tarefa urgente com os estudantes e outros feiticeiros para resgatá-lo a todo custo.",
                afirmacao: "Quando ele foi selado em Shibuya, sua reação imediata foi mobilizar todos para um resgate."
            },
            {
                texto: "Focar em conter os danos e proteger os civis primeiro, pois o próprio Gojo daria um jeito de sobreviver lá dentro.",
                afirmacao: "Durante a crise de Shibuya, você preferiu priorizar os civis enquanto confiava na resistência dele."
            }
        ]
    },
    {
        enunciado: "Após a grande batalha contra Sukuna, surge a discussão inevitável sobre o legado de Satoru Gojo para o mundo. Qual é a sua conclusão sobre a trajetória dele?",
        alternativas: [
            {
                texto: "Ele provou que, mesmo sendo uma divindade entre os homens, sua maior força era sua humanidade e carinho pelos alunos.",
                afirmacao: "Por fim, você guardará a lembrança de Gojo celebrando sua humanidade acima de seu poder divino."
            },
            {
                texto: "Ele foi uma arma perfeita que viveu e morreu pela causa Jujutsu, cumprindo seu papel como o mais forte até o fim.",
                afirmacao: "Por fim, você enxergou a jornada dele como a do guerreiro definitivo que cumpriu seu dever até o fim."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function atualizaBarraProgresso() {
    if (barraProgresso) {
        const porcentagem = (atual / perguntas.length) * 100;
        barraProgresso.style.width = `${porcentagem}%`;
    }
}

function mostraPergunta() {
    atualizaBarraProgresso();

    if (atual >= perguntas.length) {
        exibeResultado();
        return;
    }

    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";

    // Animação de entrada
    caixaPerguntas.classList.remove("animar-entrada");
    caixaAlternativas.classList.remove("animar-entrada");
    void caixaPerguntas.offsetWidth; // Recarrega o fluxo de renderização para reiniciar a animação
    caixaPerguntas.classList.add("animar-entrada");
    caixaAlternativas.classList.add("animar-entrada");

    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.addEventListener("click", function () {
            historiaFinal += alternativa.afirmacao + " ";
            atual++;
            mostraPergunta();
        });
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function exibeResultado() {
    if (barraProgresso) {
        barraProgresso.style.width = "100%";
    }

    caixaPerguntas.textContent = "Resumo da sua Jornada";
    caixaAlternativas.textContent = "";
    textoResultado.textContent = historiaFinal;

    caixaPerguntas.classList.remove("animar-entrada");
    textoResultado.classList.remove("animar-entrada");
    void caixaPerguntas.offsetWidth;
    
    caixaPerguntas.classList.add("animar-entrada");
    textoResultado.classList.add("animar-entrada");

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Jogar Novamente";
    botaoReiniciar.addEventListener("click", reiniciarQuiz);
    caixaAlternativas.appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
    atual = 0;
    historiaFinal = "";
    textoResultado.textContent = "";
    mostraPergunta();
}

// Inicializa o quiz
mostraPergunta();