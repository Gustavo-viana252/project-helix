import "./App.css"
import logo from "./assets/logo.png"
import { useEffect, useMemo, useState } from "react"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { db } from "./firebase"

const chapters = [
  {
    title: "01",
    subtitle: "Estrutura das Proteínas",
    sector: "SECTOR ALPHA",
    icon: "🧬",
    boss: "HELIX PRIME",
    bossIcon: "🦠",
    lore: "Instabilidade detectada na arquitetura molecular das proteínas.",
    questions: [
      {
        question: "Durante uma aula prática, os alunos observaram que a hemoglobina possui uma forma específica que permite o transporte de oxigênio no sangue. Qual fator é responsável pela estrutura tridimensional das proteínas?",
        answers: ["Quantidade de glicose", "Sequência de aminoácidos", "Presença de vitaminas", "Quantidade de água"],
        correct: 1,
        feedback: "A sequência de aminoácidos influencia o dobramento e a forma tridimensional da proteína.",
      },
      {
        question: "Uma atleta apresentou fadiga intensa após alterações na produção de proteínas musculares. O médico explicou que a mudança ocorreu por erro na sequência de aminoácidos. Essa alteração afeta principalmente qual nível estrutural da proteína?",
        answers: ["Estrutura primária", "Estrutura secundária", "Estrutura terciária", "Estrutura quaternária"],
        correct: 0,
        feedback: "A estrutura primária corresponde à sequência de aminoácidos.",
      },
      {
        question: "Em um laboratório, pesquisadores estudavam proteínas fibrosas presentes no cabelo e nas unhas. Qual proteína está relacionada a essas estruturas?",
        answers: ["Insulina", "Albumina", "Queratina", "Hemoglobina"],
        correct: 2,
        feedback: "A queratina é uma proteína fibrosa presente em cabelos, unhas e pele.",
      },
      {
        question: "Durante um estudo sobre enzimas digestivas, foi observado que pequenas mudanças na estrutura proteica alteravam completamente sua função. Isso demonstra que:",
        answers: ["Toda proteína possui a mesma função", "A função depende da estrutura da proteína", "As proteínas não sofrem alterações", "O formato não interfere na atividade"],
        correct: 1,
        feedback: "A função de uma proteína depende diretamente de sua estrutura.",
      },
      {
        question: "Uma estudante comparou colágeno e hemoglobina durante um seminário. O colágeno é classificado como:",
        answers: ["Proteína globular", "Proteína hormonal", "Proteína fibrosa", "Proteína lipídica"],
        correct: 2,
        feedback: "O colágeno é uma proteína fibrosa, importante na sustentação dos tecidos.",
      },
      {
        question: "Durante uma mutação genética, ocorreu troca de apenas um aminoácido na cadeia proteica. Mesmo sendo pequena, essa alteração pode:",
        answers: ["Não causar nenhuma mudança", "Melhorar apenas a digestão", "Alterar a função da proteína", "Transformar proteína em carboidrato"],
        correct: 2,
        feedback: "A troca de um aminoácido pode modificar a estrutura e a função da proteína.",
      },
      {
        question: "No hospital, um paciente apresentou anemia falciforme causada por alteração estrutural da hemoglobina. Esse caso mostra a importância de:",
        answers: ["Vitaminas na respiração", "Estrutura correta das proteínas", "Excesso de lipídios", "Produção de glicose"],
        correct: 1,
        feedback: "A anemia falciforme mostra como alterações estruturais podem comprometer a função proteica.",
      },
      {
        question: "Durante uma atividade, os alunos observaram que algumas proteínas possuem mais de uma cadeia polipeptídica associada. Essa característica corresponde à:",
        answers: ["Estrutura primária", "Estrutura secundária", "Estrutura terciária", "Estrutura quaternária"],
        correct: 3,
        feedback: "A estrutura quaternária ocorre quando há associação de duas ou mais cadeias polipeptídicas.",
      },
      {
        question: "Uma nutricionista explicou que proteínas são fundamentais para crescimento e reparo dos tecidos. As proteínas são formadas por unidades chamadas:",
        answers: ["Ácidos graxos", "Monossacarídeos", "Aminoácidos", "Nucleotídeos"],
        correct: 2,
        feedback: "As proteínas são formadas por aminoácidos.",
      },
      {
        question: "Em um experimento, os pesquisadores analisaram as interações que mantêm o formato das proteínas. Qual interação ajuda na estabilização estrutural?",
        answers: ["Ligações de hidrogênio", "Ligações metálicas", "Corrente elétrica", "Fotossíntese"],
        correct: 0,
        feedback: "Ligações de hidrogênio ajudam a estabilizar estruturas proteicas.",
      },
    ],
  },
  {
    title: "02",
    subtitle: "Ligações Peptídicas",
    sector: "SECTOR BETA",
    icon: "⚡",
    boss: "PEPTIDE BREAKER",
    bossIcon: "☣",
    lore: "As cadeias proteicas começaram a se romper. Restaure as ligações.",
    questions: [
      {
        question: "Durante a digestão, proteínas são quebradas em aminoácidos. Qual ligação une os aminoácidos em uma proteína?",
        answers: ["Ligação iônica", "Ligação peptídica", "Ligação metálica", "Ligação fosfodiéster"],
        correct: 1,
        feedback: "A ligação peptídica une aminoácidos para formar proteínas.",
      },
      {
        question: "Uma pesquisadora sintetizou proteínas em laboratório unindo aminoácidos artificialmente. A ligação formada ocorre entre:",
        answers: ["Dois grupos carboxila", "Dois grupos amino", "Grupo amino e grupo carboxila", "Açúcar e lipídio"],
        correct: 2,
        feedback: "A ligação peptídica ocorre entre o grupo amino de um aminoácido e o grupo carboxila de outro.",
      },
      {
        question: "Durante a aula, o professor explicou que a formação da ligação peptídica libera uma molécula de:",
        answers: ["Oxigênio", "Água", "Glicose", "ATP"],
        correct: 1,
        feedback: "A formação da ligação peptídica libera água, em uma reação de condensação.",
      },
      {
        question: "No processo de digestão proteica, enzimas quebram as ligações peptídicas. Esse processo recebe o nome de:",
        answers: ["Hidrólise", "Fermentação", "Respiração", "Osmose"],
        correct: 0,
        feedback: "A hidrólise quebra ligações químicas com participação da água.",
      },
      {
        question: "Em um hospital, um paciente apresentou dificuldade na digestão de proteínas devido à deficiência enzimática. Qual estrutura seria mais afetada?",
        answers: ["Lipídios", "Ligações peptídicas", "Vitaminas", "Minerais"],
        correct: 1,
        feedback: "A digestão proteica envolve a quebra das ligações peptídicas.",
      },
      {
        question: "Durante um estudo sobre bioquímica, os alunos aprenderam que dipeptídeos são formados por:",
        answers: ["Dois aminoácidos unidos", "Dois lipídios unidos", "Dois carboidratos unidos", "Dois minerais unidos"],
        correct: 0,
        feedback: "Dipeptídeos são formados por dois aminoácidos unidos por ligação peptídica.",
      },
      {
        question: "Uma proteína grande é formada por centenas de aminoácidos conectados. Essa sequência é chamada de:",
        answers: ["Cadeia polipeptídica", "Cadeia lipídica", "Cadeia glicêmica", "Cadeia nucleica"],
        correct: 0,
        feedback: "A cadeia polipeptídica é formada pela união de vários aminoácidos.",
      },
      {
        question: "Ao cozinhar alimentos ricos em proteína, as ligações peptídicas permanecem intactas inicialmente. Isso ocorre porque elas são:",
        answers: ["Muito frágeis", "Extremamente instáveis", "Relativamente resistentes", "Formadas apenas no frio"],
        correct: 2,
        feedback: "As ligações peptídicas são relativamente resistentes e não se rompem facilmente apenas com aquecimento inicial.",
      },
      {
        question: "Em uma prática laboratorial, os alunos observaram a quebra de proteínas pela ação da pepsina. A pepsina atua principalmente sobre:",
        answers: ["Carboidratos", "Ligações peptídicas", "Vitaminas", "Ácidos nucleicos"],
        correct: 1,
        feedback: "A pepsina atua na digestão de proteínas, quebrando ligações peptídicas.",
      },
      {
        question: "Uma estudante afirmou que sem ligações peptídicas não existiriam proteínas funcionais. Essa afirmação está:",
        answers: ["Correta", "Parcialmente correta", "Incorreta", "Sem relação com bioquímica"],
        correct: 0,
        feedback: "Sem ligações peptídicas, os aminoácidos não formariam cadeias proteicas.",
      },
    ],
  },
  {
    title: "03",
    subtitle: "Dobramento Proteico",
    sector: "SECTOR GAMMA",
    icon: "🔥",
    boss: "FOLDING ERROR",
    bossIcon: "🧬",
    lore: "O dobramento molecular foi corrompido. Estabilize a estrutura proteica.",
    questions: [
      {
        question: "Pesquisadores observaram que proteínas mal dobradas podem causar doenças neurodegenerativas. Isso ocorre porque:",
        answers: ["O dobramento interfere na função da proteína", "Toda proteína funciona deformada", "Proteínas não possuem formato específico", "Apenas lipídios sofrem alterações"],
        correct: 0,
        feedback: "O dobramento correto é essencial para a função da proteína.",
      },
      {
        question: "Durante um estudo sobre Alzheimer, cientistas relacionaram a doença ao acúmulo de proteínas mal dobradas. Esse processo compromete:",
        answers: ["Apenas a digestão", "O funcionamento celular", "A circulação sanguínea apenas", "A produção de glicose"],
        correct: 1,
        feedback: "Proteínas mal dobradas podem se acumular e prejudicar o funcionamento celular.",
      },
      {
        question: "No laboratório, uma proteína recém-produzida precisou adquirir sua forma funcional. Esse processo é chamado de:",
        answers: ["Replicação", "Dobramento proteico", "Fermentação", "Transcrição"],
        correct: 1,
        feedback: "O dobramento proteico permite que a proteína adquira sua forma funcional.",
      },
      {
        question: "Algumas proteínas auxiliam outras no dobramento correto. Essas proteínas especiais são chamadas de:",
        answers: ["Enzimas digestivas", "Chaperonas moleculares", "Hormônios", "Lipoproteínas"],
        correct: 1,
        feedback: "Chaperonas moleculares auxiliam no dobramento adequado de proteínas.",
      },
      {
        question: "Uma alteração genética causou erro no dobramento de proteínas pulmonares. Qual consequência pode ocorrer?",
        answers: ["Perda de função da proteína", "Formação de vitaminas", "Produção excessiva de água", "Transformação em carboidrato"],
        correct: 0,
        feedback: "Erro no dobramento pode levar à perda de função proteica.",
      },
      {
        question: "Durante um experimento, os cientistas mudaram o pH do meio e observaram alteração no formato das proteínas. Isso demonstra que o dobramento depende:",
        answers: ["Apenas da luz", "Das condições do ambiente", "Apenas da glicose", "Exclusivamente da temperatura corporal"],
        correct: 1,
        feedback: "O dobramento pode ser influenciado por pH, temperatura e outras condições ambientais.",
      },
      {
        question: "Um estudante comparou proteínas normais e proteínas mal dobradas. As proteínas corretamente dobradas apresentam:",
        answers: ["Maior funcionalidade", "Menor estabilidade sempre", "Ausência de aminoácidos", "Estrutura desorganizada"],
        correct: 0,
        feedback: "Proteínas corretamente dobradas tendem a exercer melhor sua função.",
      },
      {
        question: "Em uma pesquisa médica, proteínas defeituosas acumularam-se dentro das células. Esse acúmulo pode levar:",
        answers: ["Ao funcionamento ideal da célula", "À morte celular", "Ao aumento de vitaminas", "À produção de oxigênio"],
        correct: 1,
        feedback: "O acúmulo de proteínas defeituosas pode causar toxicidade celular.",
      },
      {
        question: "Durante a síntese proteica, o dobramento ocorre após:",
        answers: ["A formação da cadeia polipeptídica", "A digestão completa", "A eliminação da proteína", "A fotossíntese"],
        correct: 0,
        feedback: "Após a formação da cadeia polipeptídica, a proteína precisa se dobrar corretamente.",
      },
      {
        question: "No desenvolvimento de medicamentos, cientistas estudam o dobramento proteico para evitar doenças. Isso é importante porque:",
        answers: ["A estrutura define a função da proteína", "Proteínas não participam de doenças", "Apenas carboidratos sofrem alterações", "Toda proteína funciona da mesma maneira"],
        correct: 0,
        feedback: "A estrutura proteica está diretamente relacionada à sua função.",
      },
    ],
  },
  {
    title: "04",
    subtitle: "Desnaturação Proteica",
    sector: "SECTOR DELTA",
    icon: "☢",
    boss: "PROTEIN COLLAPSE",
    bossIcon: "💀",
    lore: "O calor molecular aumentou. Proteínas estão perdendo forma e função.",
    questions: [
      {
        question: "Ao cozinhar um ovo, a clara muda de transparente para branca devido à:",
        answers: ["Digestão proteica", "Desnaturação das proteínas", "Formação de lipídios", "Produção de glicose"],
        correct: 1,
        feedback: "O calor desnatura as proteínas da clara, alterando sua estrutura.",
      },
      {
        question: "Durante uma febre muito alta, proteínas do organismo podem perder sua estrutura funcional. Esse processo é chamado de:",
        answers: ["Replicação", "Hidratação", "Desnaturação", "Osmose"],
        correct: 2,
        feedback: "A desnaturação é a perda da estrutura funcional da proteína.",
      },
      {
        question: "Uma estudante adicionou álcool em uma proteína durante um experimento e observou alteração estrutural. O álcool atuou como:",
        answers: ["Agente desnaturante", "Vitamina", "Catalisador energético", "Aminoácido"],
        correct: 0,
        feedback: "O álcool pode desnaturar proteínas, alterando sua estrutura.",
      },
      {
        question: "Quando uma proteína sofre desnaturação, geralmente ocorre:",
        answers: ["Alteração da sua função", "Aumento da glicose", "Formação de DNA", "Produção de minerais"],
        correct: 0,
        feedback: "Ao perder sua estrutura, a proteína pode perder ou alterar sua função.",
      },
      {
        question: "No hospital, o álcool 70% é usado para destruir proteínas de microrganismos. Isso ocorre porque ele provoca:",
        answers: ["Fermentação", "Desnaturação proteica", "Fotossíntese", "Respiração celular"],
        correct: 1,
        feedback: "O álcool 70% desnatura proteínas de microrganismos, ajudando na antissepsia.",
      },
      {
        question: "Durante uma prática culinária, o calor alterou a estrutura da albumina presente no ovo. O calor afetou principalmente:",
        answers: ["A forma da proteína", "O número de aminoácidos", "A composição mineral", "A quantidade de vitaminas"],
        correct: 0,
        feedback: "O calor altera a forma da proteína, causando desnaturação.",
      },
      {
        question: "Uma proteína desnaturada pode perder sua atividade porque:",
        answers: ["Seu formato foi alterado", "Ela ganhou aminoácidos", "Produziu mais energia", "Transformou-se em carboidrato"],
        correct: 0,
        feedback: "A atividade depende da conformação correta da proteína.",
      },
      {
        question: "Mudanças extremas de pH podem causar desnaturação porque:",
        answers: ["Alteram as interações químicas da proteína", "Criam novos aminoácidos", "Produzem oxigênio", "Aumentam a glicose"],
        correct: 0,
        feedback: "O pH extremo altera interações químicas que estabilizam a proteína.",
      },
      {
        question: "Em laboratório, pesquisadores utilizaram altas temperaturas para estudar estabilidade proteica. A temperatura elevada pode:",
        answers: ["Preservar totalmente a proteína", "Desnaturar proteínas", "Criar proteínas novas instantaneamente", "Formar vitaminas"],
        correct: 1,
        feedback: "Altas temperaturas podem romper interações que mantêm a estrutura proteica.",
      },
      {
        question: "Durante uma infecção grave, alterações celulares podem afetar proteínas essenciais do organismo. A desnaturação proteica compromete principalmente:",
        answers: ["A estrutura e a função", "Apenas a cor da célula", "Apenas os lipídios", "O tamanho do núcleo celular"],
        correct: 0,
        feedback: "A desnaturação compromete tanto a estrutura quanto a função da proteína.",
      },
    ],
  },
  {
    title: "FINAL",
    subtitle: "O Despertar da Hélice",
    sector: "CORE ROOM",
    icon: "👑",
    boss: "HELIX MONARCH",
    bossIcon: "👑",
    lore: "O núcleo Helix despertou. Enfrente a entidade final e restaure o equilíbrio celular.",
    questions: [
      {
        question: "Um cientista criou uma proteína artificial, mas ela não conseguia desempenhar sua função. Após análise, descobriu-se erro no dobramento proteico. Qual a principal consequência desse erro?",
        answers: ["Aumento de vitaminas", "Perda da função biológica", "Formação de glicose", "Produção excessiva de lipídios"],
        correct: 1,
        feedback: "Erro no dobramento pode causar perda da função biológica da proteína.",
      },
      {
        question: "Durante uma epidemia, pesquisadores estudaram proteínas virais para desenvolver vacinas. Por que entender a estrutura proteica é importante?",
        answers: ["Porque define a função das proteínas", "Porque proteínas não sofrem alterações", "Porque apenas o DNA importa", "Porque proteínas não participam de doenças"],
        correct: 0,
        feedback: "A estrutura proteica influencia função, reconhecimento imunológico e desenvolvimento de vacinas.",
      },
      {
        question: "Em uma aula prática, alunos aqueceram proteínas e observaram alteração estrutural. Esse fenômeno representa:",
        answers: ["Replicação celular", "Desnaturação proteica", "Respiração celular", "Produção de ATP"],
        correct: 1,
        feedback: "O aquecimento pode causar desnaturação proteica.",
      },
      {
        question: "Uma mutação alterou a sequência de aminoácidos de uma proteína humana. Qual estrutura foi afetada primeiro?",
        answers: ["Estrutura primária", "Estrutura terciária", "Estrutura quaternária", "Estrutura secundária"],
        correct: 0,
        feedback: "A sequência de aminoácidos corresponde à estrutura primária.",
      },
      {
        question: "Em um hospital, enzimas digestivas foram utilizadas para quebrar proteínas em aminoácidos. Essas enzimas atuam principalmente sobre:",
        answers: ["Lipídios", "Ligações peptídicas", "Vitaminas", "Ácidos nucleicos"],
        correct: 1,
        feedback: "Enzimas digestivas quebram ligações peptídicas nas proteínas.",
      },
      {
        question: "Pesquisadores descobriram proteínas acumuladas no cérebro de pacientes com Alzheimer. Essas proteínas estavam:",
        answers: ["Bem dobradas", "Mal dobradas", "Sem aminoácidos", "Transformadas em lipídios"],
        correct: 1,
        feedback: "O acúmulo de proteínas mal dobradas está associado a doenças neurodegenerativas.",
      },
      {
        question: "Durante uma investigação científica, observou-se que mudanças de pH alteravam a estabilidade proteica. Isso acontece porque o pH interfere:",
        answers: ["Nas interações químicas da proteína", "Na produção de glicose apenas", "No número de aminoácidos", "Apenas na cor da proteína"],
        correct: 0,
        feedback: "O pH pode alterar interações que mantêm a estabilidade proteica.",
      },
      {
        question: "Uma proteína composta por várias cadeias polipeptídicas apresenta qual nível estrutural?",
        answers: ["Primário", "Secundário", "Terciário", "Quaternário"],
        correct: 3,
        feedback: "A estrutura quaternária envolve a associação de várias cadeias polipeptídicas.",
      },
      {
        question: "Ao analisar uma enzima, os cientistas perceberam que sua atividade dependia do formato específico do sítio ativo. Isso comprova que:",
        answers: ["Estrutura e função estão relacionadas", "Proteínas funcionam de qualquer forma", "O formato não interfere na atividade", "Apenas vitaminas possuem função específica"],
        correct: 0,
        feedback: "A atividade enzimática depende da relação entre estrutura e função.",
      },
      {
        question: "Uma equipe de enfermagem estudava o efeito da febre extrema sobre proteínas do organismo. A temperatura elevada pode causar:",
        answers: ["Desnaturação proteica", "Formação de DNA", "Produção de glicose", "Criação de aminoácidos novos"],
        correct: 0,
        feedback: "Temperaturas elevadas podem causar desnaturação proteica.",
      },
    ],
  },
]

const avatars = ["🧑🏻‍🚀", "🧑🏽‍🔬", "🥷", "🤖", "🧬"]

function BottomNav({ active, setScreen }) {
  return (
    <div className="bottom-nav">
      <button className={active === "home" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("home")}>
        ⌂
        <span>INÍCIO</span>
      </button>

      <button className={active === "chapters" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("chapters")}>
        🧬
        <span>MISSÕES</span>
      </button>

      <button className={active === "ranking" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("ranking")}>
        🏆
        <span>RANKING</span>
      </button>

      <button className={active === "team" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("team")}>
        👥
        <span>EQUIPE</span>
      </button>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState("boot")
  const [teamName, setTeamName] = useState("")
  const [teamAvatar, setTeamAvatar] = useState("🧑🏻‍🚀")
  const [xp, setXp] = useState(0)
  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [bossHp, setBossHp] = useState(100)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [chapterIntro, setChapterIntro] = useState(false)
  const [answeredTotal, setAnsweredTotal] = useState(0)
  const [pendingAfterPortal, setPendingAfterPortal] = useState({ screen: "question" })
  const [feedbackData, setFeedbackData] = useState(null)
  const [gateTarget, setGateTarget] = useState({
    screen: "team",
    label: "ACCESSING HELIX CORE",
    sublabel: "Sincronizando núcleo biológico...",
  })

  const [liveRanking, setLiveRanking] = useState([])

  const chapter = chapters[currentChapter]
  const question = chapter.questions[currentQuestion]
  const teamDisplayName = teamName.trim() || "CELLULAR AGENTS"
  const bossCritical = bossHp <= 30 && bossHp > 0

  const totalQuestions = useMemo(
    () => chapters.reduce((sum, item) => sum + item.questions.length, 0),
    []
  )

  const progressPercent = Math.round((answeredTotal / totalQuestions) * 100)

  useEffect(() => {
    const rankingQuery = query(collection(db, "ranking"), orderBy("xp", "desc"))

    const unsubscribe = onSnapshot(rankingQuery, (snapshot) => {
      const onlineRanking = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }))

      setLiveRanking(onlineRanking)
    })

    return () => unsubscribe()
  }, [])

  const getTeamId = (name) => {
    return (
      name
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "CELLULAR-AGENTS"
    )
  }

  const getRank = () => {
    if (xp >= 3000) return "👑 CELLULAR MONARCH"
    if (xp >= 2200) return "☢ HELIX MASTER"
    if (xp >= 1400) return "🔥 PROTEIN HUNTER"
    if (xp >= 700) return "⚡ BIO AGENT"
    return "🧬 ROOKIE CELL"
  }

  const registerTeam = async () => {
    const teamId = getTeamId(teamDisplayName)

    await setDoc(
      doc(db, "ranking", teamId),
      {
        team: teamDisplayName,
        avatar: teamAvatar,
        xp,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }

  const updateLiveRanking = async (newXp) => {
    const teamId = getTeamId(teamDisplayName)

    await setDoc(
      doc(db, "ranking", teamId),
      {
        team: teamDisplayName,
        avatar: teamAvatar,
        xp: newXp,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }

  const resetBattle = () => {
    setSelected(null)
    setTimeLeft(30)
    setGameOver(false)
    setCurrentQuestion(0)
    setCombo(0)
    setBossHp(100)
    setChapterIntro(false)
    setFeedbackData(null)
  }

  const resetGameOnly = () => {
    setScreen("home")
    setTeamName("")
    setTeamAvatar("🧑🏻‍🚀")
    setXp(0)
    setCurrentChapter(0)
    setMaxCombo(0)
    setCorrectCount(0)
    setAnsweredTotal(0)
    setPendingAfterPortal({ screen: "question" })
    resetBattle()
  }

  const openGate = (target) => {
    setGateTarget(target)
    setScreen("transitionGate")
  }

  const clearRanking = async () => {
    const snapshot = await getDocs(collection(db, "ranking"))

    await Promise.all(
      snapshot.docs.map((rankingDocument) => deleteDoc(rankingDocument.ref))
    )
  }

  const startChapter = (index) => {
    setCurrentChapter(index)
    resetBattle()
    openGate({
      screen: "bossIntro",
      label: `LOADING ${chapters[index].sector}`,
      sublabel: `Preparando combate contra ${chapters[index].boss}...`,
    })
  }

  const startCombat = () => {
    setChapterIntro(true)
    setScreen("question")

    setTimeout(() => {
      setChapterIntro(false)
    }, 2200)
  }

  const finishChapter = () => {
    if (currentChapter === chapters.length - 1) {
      setScreen("epilogue")
    } else {
      setScreen("chapters")
    }
  }

  const openPortal = (nextAction) => {
    setPendingAfterPortal(nextAction)
    setSelected(null)
    setTimeLeft(30)
    setGameOver(false)
    setFeedbackData(null)
    setScreen("portal")
  }

  const continueAfterPortal = () => {
    setScreen(pendingAfterPortal.screen)
  }

  const continueAfterFeedback = () => {
    const total = feedbackData?.answeredTotal || answeredTotal
    const shouldOpenPortal = total > 0 && total % 5 === 0

    setFeedbackData(null)

    if (currentQuestion < chapter.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelected(null)
      setTimeLeft(30)
      setGameOver(false)

      if (shouldOpenPortal) {
        openPortal({ screen: "question" })
        return
      }

      setScreen("question")
      return
    }

    if (shouldOpenPortal) {
      openPortal({
        screen: currentChapter === chapters.length - 1 ? "epilogue" : "chapters",
      })
      return
    }

    finishChapter()
  }

  const handleAnswer = (index) => {
    if (selected !== null || gameOver || chapterIntro) return

    setSelected(index)

    const newAnsweredTotal = answeredTotal + 1
    setAnsweredTotal(newAnsweredTotal)

    const isCorrect = index === question.correct
    let xpEarned = 0

    if (isCorrect) {
      const newCombo = combo + 1
      xpEarned = 100 + combo * 20
      const newXp = xp + xpEarned

      setXp(newXp)
      setCombo(newCombo)
      setMaxCombo((prev) => Math.max(prev, newCombo))
      setCorrectCount((prev) => prev + 1)
      setBossHp((prev) => Math.max(prev - 18, 0))
      updateLiveRanking(newXp)
    } else {
      setCombo(0)
      setBossHp((prev) => Math.max(prev - 5, 0))
    }

    setTimeout(() => {
      setFeedbackData({
        isCorrect,
        xpEarned,
        answeredTotal: newAnsweredTotal,
        selectedAnswer: question.answers[index],
        correctAnswer: question.answers[question.correct],
        explanation: question.feedback,
      })

      setScreen("feedback")
    }, 700)
  }

  useEffect(() => {
    if (screen !== "question") return

    if (timeLeft > 0 && selected === null && !gameOver && !chapterIntro) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }

    if (timeLeft === 0 && !gameOver) {
      const failTimer = setTimeout(() => {
        const newAnsweredTotal = answeredTotal + 1

        setAnsweredTotal(newAnsweredTotal)
        setGameOver(true)
        setCombo(0)
        setBossHp((prev) => Math.max(prev - 5, 0))

        setFeedbackData({
          isCorrect: false,
          xpEarned: 0,
          answeredTotal: newAnsweredTotal,
          selectedAnswer: "Tempo esgotado",
          correctAnswer: question.answers[question.correct],
          explanation: question.feedback,
        })

        setScreen("feedback")
      }, 0)

      return () => clearTimeout(failTimer)
    }
  }, [timeLeft, selected, gameOver, screen, chapterIntro, answeredTotal, question])

  if (screen === "boot") {
    return (
      <div className="boot-screen">
        <div className="boot-background-grid"></div>
        <div className="boot-core-glow"></div>

        <div className="boot-panel">
          <div className="boot-logo-ring">
            <div className="boot-logo-center">🧬</div>
          </div>

          <span className="boot-system-label">PROJECT HELIX</span>

          <h1>INITIALIZING CORE...</h1>

          <p>
            Sincronizando sistema biológico.
            Preparando acesso ao núcleo Helix.
          </p>

          <div className="boot-loading">
            <div className="boot-loading-fill"></div>
          </div>

          <div className="boot-loading-text">
            SYSTEM SYNC COMPLETE
          </div>

          <button
            className="primary-button"
            onClick={() => setScreen("home")}
          >
            ▶ ENTER SYSTEM
          </button>
        </div>
      </div>
    )
  }

  if (screen === "transitionGate") {
    return (
      <div className="transition-gate-screen">
        <div className="phone-shell transition-gate-shell">
          <div className="gate-darkness"></div>

          <div className="gate-particles">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="gate-orbit">
            <div className="gate-ring gate-ring-one"></div>
            <div className="gate-ring gate-ring-two"></div>
            <div className="gate-ring gate-ring-three"></div>
            <div className="gate-center">🧬</div>
          </div>

          <div className="gate-text">
            <span>PROJECT HELIX</span>
            <h1>{gateTarget.label}</h1>
            <p>{gateTarget.sublabel}</p>
          </div>

          <button
            className="primary-button gate-button"
            onClick={() => setScreen(gateTarget.screen)}
          >
            ▶ ENTRAR NO SISTEMA
          </button>
        </div>
      </div>
    )
  }

  if (screen === "feedback" && feedbackData) {
    return (
      <div className={feedbackData.isCorrect ? "feedback-screen feedback-success" : "feedback-screen feedback-error"}>
        <div className="phone-shell feedback-shell">
          <div className="scanline"></div>

          <div className="feedback-portal">
            <div className="feedback-core">{feedbackData.isCorrect ? "✓" : "!"}</div>
          </div>

          <span className="system-label">SYSTEM ANALYSIS</span>

          <h1>{feedbackData.isCorrect ? "SYNTHESIS STABLE" : "METABOLIC FAILURE"}</h1>

          <div className="feedback-result">
            <strong>{feedbackData.isCorrect ? `+${feedbackData.xpEarned} XP` : "+0 XP"}</strong>
            <p>Resposta correta: {feedbackData.correctAnswer}</p>
          </div>

          <div className="feedback-explanation">
            {feedbackData.explanation}
          </div>

          <button className="primary-button" onClick={continueAfterFeedback}>
            ▶ CONTINUAR MISSÃO
          </button>
        </div>
      </div>
    )
  }

  if (screen === "portal") {
    return (
      <div className="portal-screen">
        <div className="phone-shell portal-shell upgraded-portal-shell">
          <div className="portal-background-grid"></div>
          <div className="portal-darkness"></div>

          <div className="portal-particles">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="portal-warning">
            ⚠ WARNING • HELIX CORE BREACH
          </div>

          <div className="portal-ring upgraded-portal-ring">
            <div className="portal-ring-layer portal-ring-layer-one"></div>
            <div className="portal-ring-layer portal-ring-layer-two"></div>
            <div className="portal-ring-layer portal-ring-layer-three"></div>
            <div className="portal-core upgraded-portal-core">🌀</div>
          </div>

          <div className="portal-story">
            <span>CLASSROOM PROTOCOL ACTIVATED</span>

            <h1>
              THE DIMENSION
              <br />
              HAS AWAKENED
            </h1>

            <p>
              Uma anomalia biológica atravessou o Sistema Helix.
            </p>

            <p>
              As equipes deverão responder corretamente às missões em sala para
              estabilizar o núcleo e impedir o colapso da dimensão.
            </p>
          </div>

          <button className="primary-button portal-action-button" onClick={continueAfterPortal}>
            ▶ CONTINUAR MISSÃO
          </button>
        </div>
      </div>
    )
  }

  if (screen === "bossIntro") {
    return (
      <div className="boss-intro-screen">
        <div className="phone-shell boss-intro-shell">
          <button className="back-button" onClick={() => setScreen("chapters")}>←</button>

          <div className="warning-label">⚠ BOSS DETECTED</div>

          <div className="boss-art-frame">
            <div className="boss-art-glow"></div>
            <div className="boss-art">{chapter.bossIcon}</div>
          </div>

          <span className="sector-label">{chapter.sector}</span>

          <h1>{chapter.boss}</h1>
          <h2>{chapter.subtitle}</h2>
          <p>{chapter.lore}</p>

          <div className="boss-preview-bar">
            <span>THREAT LEVEL</span>
            <div><i></i></div>
            <strong>100%</strong>
          </div>

          <button className="primary-button" onClick={startCombat}>
            ▶ INICIAR COMBATE
          </button>
        </div>
      </div>
    )
  }

  if (screen === "epilogue") {
    return (
      <div className="epilogue-screen">
        <div className="phone-shell epilogue-shell">
          <div className="epilogue-orb">🧬</div>

          <span className="system-label">HELIX CORE RESTORED</span>

          <h1>A HELIX EVOLUIU</h1>

          <h2>
            O conhecimento foi sintetizado. A missão não terminou — ela despertou.
          </h2>

          <p>
            Cada resposta estabilizou um fragmento do sistema. Agora, o núcleo biológico
            foi restaurado pela inteligência coletiva dos jogadores.
          </p>

          <button onClick={() => setScreen("ending")}>
            VER RESULTADO FINAL
          </button>
        </div>
      </div>
    )
  }

  if (screen === "ending") {
    return (
      <div className="ending-screen">
        <div className="phone-shell ending-shell">
          <div className="ending-core">🧬</div>

          <span className="system-label">FINAL REPORT</span>

          <h1>MISSÃO CONCLUÍDA</h1>
          <h2>A HELIX FOI SALVA</h2>

          <div className="ending-xp">{xp}</div>

          <div className="ending-grid">
            <div>
              <span>ACERTOS</span>
              <strong>{correctCount}</strong>
            </div>

            <div>
              <span>COMBO MÁX.</span>
              <strong>x{maxCombo}</strong>
            </div>

            <div>
              <span>RANK</span>
              <strong>{getRank()}</strong>
            </div>
          </div>

          <p>{teamAvatar} {teamDisplayName}</p>

          <div className="final-credits">
            PROJECT HELIX<br />
            DEVELOPED BY GUSTAVO VIANA
          </div>

          <button onClick={() => setScreen("ranking")}>VER RANKING</button>
          <button onClick={resetGameOnly}>NOVA EQUIPE</button>
        </div>
      </div>
    )
  }

  if (screen === "ranking") {
    return (
      <div className="ranking-screen">
        <div className="phone-shell ranking-shell">
          <button className="back-button" onClick={() => setScreen("home")}>←</button>

          <h1 className="screen-title">RANKING</h1>
          <p className="screen-subtitle">CAMPEONATO HELIX AO VIVO</p>

          <div className="ranking-podium">
            <span>🏆</span>
            <strong>{liveRanking[0]?.team || "AGUARDANDO EQUIPE"}</strong>
            <em>{liveRanking[0]?.xp || 0} XP</em>
          </div>

          <div className="ranking-list">
            {liveRanking.length === 0 && (
              <div className="empty-ranking">Nenhuma equipe jogou ainda.</div>
            )}

            {liveRanking.slice(0, 5).map((item, index) => (
              <div
                className={
                  index === 0
                    ? "ranking-card champion-card"
                    : item.team === teamDisplayName
                    ? "ranking-card your-position"
                    : "ranking-card"
                }
                key={index}
              >
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{item.avatar} {item.team}</span>
                <em>XP {item.xp}</em>
              </div>
            ))}
          </div>

          <button className="clear-ranking" onClick={clearRanking}>
            ZERAR RANKING
          </button>

          <BottomNav active="ranking" setScreen={setScreen} />
        </div>
      </div>
    )
  }

  if (screen === "question") {
    return (
      <div className={bossCritical ? "question-screen critical-mode" : "question-screen"}>
        <div className="phone-shell battle-shell">
          {chapterIntro && (
            <div className="chapter-intro">
              <h1>{chapter.title}</h1>
              <h2>{chapter.subtitle}</h2>
              <p>{chapter.lore}</p>
              <strong>{chapter.boss}</strong>
            </div>
          )}

          {bossCritical && <div className="critical-warning">⚠ CRITICAL THREAT ⚠</div>}

          <button className="back-button" onClick={() => setScreen("chapters")}>←</button>

          <div className={timeLeft <= 10 ? "battle-top danger-time" : "battle-top"}>
            <span>{teamAvatar} {teamDisplayName}</span>
            <strong>00:{String(timeLeft).padStart(2, "0")}</strong>
          </div>

          <div className="xp-line">
            <span>XP {xp}</span>
            <div>
              <i style={{ width: `${Math.min(xp / 40, 100)}%` }}></i>
            </div>
          </div>

          <div className="boss-panel">
            <div className={bossCritical ? "boss-avatar critical-boss" : "boss-avatar"}>
              {chapter.bossIcon}
            </div>

            <h3>{chapter.boss}</h3>

            <div className="boss-bar">
              <i style={{ width: `${bossHp}%` }}></i>
            </div>

            <small>{bossHp}%</small>
          </div>

          <div className="question-card">
            <p>PERGUNTA {currentQuestion + 1} / {chapter.questions.length}</p>

            <h2>{question.question}</h2>

            <div className="answers">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  className={selected === index ? (index === question.correct ? "correct" : "wrong") : ""}
                  onClick={() => handleAnswer(index)}
                >
                  {String.fromCharCode(65 + index)}) {answer}
                </button>
              ))}
            </div>
          </div>

          <div className="battle-footer">
            <span>COMBO x{combo}</span>
            <strong>{getRank()}</strong>
          </div>
        </div>
      </div>
    )
  }

  if (screen === "chapters") {
    return (
      <div className="chapters-screen">
        <div className="phone-shell">
          <button className="back-button" onClick={() => setScreen("team")}>←</button>

          <h1 className="screen-title">MISSÕES</h1>
          <p className="screen-subtitle">SETORES DO SISTEMA HELIX</p>

          <div className="mission-progress">
            <span>PROGRESSO GLOBAL</span>
            <div>
              <i style={{ width: `${progressPercent}%` }}></i>
            </div>
            <strong>{progressPercent}%</strong>
          </div>

          <div className="chapter-list">
            {chapters.map((item, index) => (
              <div className="chapter-card unlocked" key={index} onClick={() => startChapter(index)}>
                <div className="chapter-icon">{item.icon}</div>

                <div>
                  <span>{item.sector}</span>
                  <h2>{item.subtitle}</h2>
                  <p>{item.boss}</p>
                </div>

                <b>→</b>
              </div>
            ))}
          </div>

          <BottomNav active="chapters" setScreen={setScreen} />
        </div>
      </div>
    )
  }

  if (screen === "team") {
    return (
      <div className="team-screen">
        <div className="phone-shell team-shell">
          <button className="back-button" onClick={() => setScreen("home")}>←</button>

          <h1 className="screen-title">ESQUADRÃO</h1>
          <p className="screen-subtitle">ATIVE SUA EQUIPE PARA A MISSÃO</p>

          <div className="squad-core">
            <div className="squad-avatar-big">{teamAvatar}</div>
            <span>{teamDisplayName}</span>
            <small>OPERATORS ONLINE</small>
          </div>

          <label>NOME DA EQUIPE</label>

          <input
            value={teamName}
            maxLength={22}
            onChange={(event) => setTeamName(event.target.value.toUpperCase())}
            placeholder="EX: GUARDIÕES DA HELIX"
          />

          <h3>ESCOLHA SEU AVATAR</h3>

          <div className="avatars">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                className={teamAvatar === avatar ? "avatar-selected" : ""}
                onClick={() => setTeamAvatar(avatar)}
              >
                {avatar}
              </button>
            ))}
          </div>

          <button
            className="primary-button"
            onClick={async () => {
              await registerTeam()
              openGate({
                screen: "chapters",
                label: "SYNCING SQUAD",
                sublabel: "Equipe registrada. Abrindo mapa de setores...",
              })
            }}
          >
            INICIAR JORNADA
          </button>

          <BottomNav active="team" setScreen={setScreen} />
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="phone-shell home-shell cinematic-home">
        <button className="gear">⚙</button>

        <div className="home-background-grid"></div>
        <div className="home-background-glow"></div>

        <div className="home-cover-wrap">
          <img src={logo} alt="Project Helix" className="home-cover" />
          <div className="home-cover-glow"></div>
        </div>

        <div className="home-system-status">
          <span></span>
          HELIX CORE ONLINE
        </div>

        <button
          className="primary-button home-start"
          onClick={() =>
            openGate({
              screen: "team",
              label: "ACCESSING HELIX CORE",
              sublabel: "Acordando o sistema de bioengenharia...",
            })
          }
        >
          ▶ START MISSION
        </button>

        <button className="ghost-button">SYSTEM ACCESS</button>

        <div className="home-stats">
          <div>
            <span>{chapters.length}</span>
            <p>SETORES</p>
          </div>

          <div>
            <span>{totalQuestions}</span>
            <p>QUESTÕES</p>
          </div>

          <div>
            <span>LIVE</span>
            <p>RANKING</p>
          </div>
        </div>

        <p className="credits">A PROJECT BY GUSTAVO VIANA</p>

        <BottomNav active="home" setScreen={setScreen} />
      </div>
    </div>
  )
}
