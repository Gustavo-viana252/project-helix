import "./App.css"
import { useEffect, useState } from "react"

const chapters = [
  {
    title: "01",
    subtitle: "A Estrutura das Proteínas",
    icon: "🧬",
    boss: "HELIX PRIME",
    bossIcon: "🦠",
    lore: "O Sistema Helix detectou instabilidade na base molecular das proteínas.",
    questions: [
      {
        question: "Qual é a unidade básica que forma as proteínas?",
        answers: ["Glicose", "Aminoácido", "Ácido graxo", "Nucleotídeo"],
        correct: 1,
      },
      {
        question: "As proteínas são formadas principalmente por:",
        answers: ["Monossacarídeos", "Aminoácidos", "Ácidos graxos", "Vitaminas"],
        correct: 1,
      },
      {
        question: "Qual elemento está presente em todos os aminoácidos?",
        answers: ["Nitrogênio", "Cloro", "Cálcio", "Ferro"],
        correct: 0,
      },
      {
        question: "Os aminoácidos possuem em comum:",
        answers: ["Grupo amino e grupo carboxila", "Somente glicose", "Somente lipídios", "Somente fosfato"],
        correct: 0,
      },
    ],
  },
  {
    title: "02",
    subtitle: "Ligações Peptídicas",
    icon: "⚡",
    boss: "PEPTIDE BREAKER",
    bossIcon: "☣",
    lore: "As cadeias proteicas começaram a se romper. Restaure as ligações.",
    questions: [
      {
        question: "Qual ligação une os aminoácidos em uma proteína?",
        answers: ["Ligação iônica", "Ligação peptídica", "Ligação metálica", "Ligação fosfodiéster"],
        correct: 1,
      },
      {
        question: "A ligação peptídica ocorre entre:",
        answers: ["Grupo amino e carboxila", "Dois lipídios", "ATP e glicose", "DNA e RNA"],
        correct: 0,
      },
      {
        question: "A formação da ligação peptídica libera:",
        answers: ["Oxigênio", "ATP", "Água", "Glicose"],
        correct: 2,
      },
      {
        question: "Várias ligações peptídicas formam:",
        answers: ["Cadeia polipeptídica", "Molécula de gordura", "Parede celular", "Hemácia"],
        correct: 0,
      },
    ],
  },
  {
    title: "03",
    subtitle: "Dobramento Proteico",
    icon: "🔥",
    boss: "FOLDING ERROR",
    bossIcon: "🧬",
    lore: "O dobramento molecular foi corrompido. Estabilize a estrutura proteica.",
    questions: [
      {
        question: "A estrutura primária da proteína representa:",
        answers: ["A sequência de aminoácidos", "A forma tridimensional", "A união de várias cadeias", "A hélice alfa"],
        correct: 0,
      },
      {
        question: "A estrutura secundária pode formar:",
        answers: ["Hélice alfa e folha beta", "DNA e RNA", "Glicose e frutose", "ATP e ADP"],
        correct: 0,
      },
      {
        question: "A estrutura quaternária ocorre quando:",
        answers: ["Há mais de uma cadeia polipeptídica", "A proteína perde água", "O aminoácido vira glicose", "A enzima é destruída"],
        correct: 0,
      },
      {
        question: "A forma tridimensional da proteína influencia diretamente:",
        answers: ["Sua função", "Sua cor apenas", "Seu cheiro", "Sua quantidade de água"],
        correct: 0,
      },
    ],
  },
  {
    title: "04",
    subtitle: "Desnaturação Proteica",
    icon: "☢",
    boss: "PROTEIN COLLAPSE",
    bossIcon: "💀",
    lore: "O calor molecular aumentou. Proteínas estão perdendo forma e função.",
    questions: [
      {
        question: "A desnaturação proteica causa:",
        answers: ["Perda da estrutura da proteína", "Formação de DNA", "Aumento de glicose", "Produção de lipídios"],
        correct: 0,
      },
      {
        question: "Qual fator pode causar desnaturação?",
        answers: ["Temperatura elevada", "Sono", "Oxigênio normal", "Repouso"],
        correct: 0,
      },
      {
        question: "Quando uma proteína desnatura, ela pode perder:",
        answers: ["Sua função biológica", "Seu núcleo celular", "Seu DNA", "Sua membrana"],
        correct: 0,
      },
      {
        question: "Alteração extrema de pH pode:",
        answers: ["Desnaturar proteínas", "Criar aminoácidos do nada", "Transformar proteína em glicose", "Aumentar DNA"],
        correct: 0,
      },
    ],
  },
  {
    title: "CHEFÃO",
    subtitle: "O Despertar da Helix",
    icon: "👑",
    boss: "HELIX MONARCH",
    bossIcon: "👑",
    lore: "O núcleo Helix despertou. Enfrente a entidade final e restaure o equilíbrio celular.",
    questions: [
      {
        question: "As proteínas são importantes porque:",
        answers: ["Atuam em estrutura, transporte, defesa e enzimas", "Só armazenam gordura", "Formam apenas glicose", "Não têm função no organismo"],
        correct: 0,
      },
      {
        question: "As enzimas são proteínas que:",
        answers: ["Aceleram reações químicas", "Formam ossos apenas", "Destroem ATP sempre", "São carboidratos"],
        correct: 0,
      },
      {
        question: "Uma proteína funcional depende principalmente de:",
        answers: ["Sua forma e sequência correta", "Sua cor", "Seu cheiro", "Seu peso isolado"],
        correct: 0,
      },
      {
        question: "Se a proteína perde sua conformação, ela pode:",
        answers: ["Perder sua função", "Virar DNA", "Virar glicose", "Criar uma membrana"],
        correct: 0,
      },
    ],
  },
]

const initialRanking = []

const avatars = ["🧑🏻‍🚀", "🧑🏽‍🔬", "🥷", "🤖"]

function BottomNav({ active, setScreen }) {
  return (
    <div className="bottom-nav">
      <div className={active === "home" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("home")}>
        <div>⌂</div>
        <span>INÍCIO</span>
      </div>

      <div className={active === "chapters" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("chapters")}>
        <div>🧬</div>
        <span>MISSÕES</span>
      </div>

      <div className={active === "ranking" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("ranking")}>
        <div>🏆</div>
        <span>RANKING</span>
      </div>

      <div className={active === "team" ? "nav-item active-nav" : "nav-item"} onClick={() => setScreen("team")}>
        <div>👥</div>
        <span>EQUIPE</span>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState("home")
  const [teamName, setTeamName] = useState("")
  const [teamAvatar, setTeamAvatar] = useState("🧑🏻‍🚀")
  const [xp, setXp] = useState(0)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [comboMessage, setComboMessage] = useState("")
  const [bossHp, setBossHp] = useState(100)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [chapterIntro, setChapterIntro] = useState(false)
  const [successAnimation, setSuccessAnimation] = useState(false)
  const [unlockedChapters, setUnlockedChapters] = useState([0])
  const [liveRanking, setLiveRanking] = useState(initialRanking)

  const chapter = chapters[currentChapter]
  const question = chapter.questions[currentQuestion]
  const bossDefeated = bossHp <= 0
  const bossCritical = bossHp <= 30 && bossHp > 0

  const teamDisplayName = teamName.trim() || "CELLULAR AGENTS"

  const getRank = () => {
    if (xp >= 1800) return "👑 CELLULAR MONARCH"
    if (xp >= 1200) return "☢ HELIX MASTER"
    if (xp >= 800) return "🔥 PROTEIN HUNTER"
    if (xp >= 400) return "⚡ BIO AGENT"
    return "🧬 ROOKIE CELL"
  }

  const getComboMessage = (value) => {
    if (value >= 5) return "👑 CELLULAR DOMINATION"
    if (value >= 3) return "🔥 BIOLOGICAL OVERDRIVE"
    if (value >= 2) return "⚡ SYNTHESIS FLOW"
    return ""
  }

  const updateLiveRanking = (newXp) => {
    setLiveRanking((prev) => {
      const updated = [...prev]
      const existingTeam = updated.find((item) => item.team === teamDisplayName)

      if (existingTeam) {
        existingTeam.xp = newXp
        existingTeam.avatar = teamAvatar
      } else {
        updated.push({
          team: teamDisplayName,
          xp: newXp,
          avatar: teamAvatar,
        })
      }

      return updated.sort((a, b) => b.xp - a.xp)
    })
  }

  const resetBattle = () => {
    setSelected(null)
    setFeedback("")
    setTimeLeft(30)
    setGameOver(false)
    setCurrentQuestion(0)
    setCombo(0)
    setComboMessage("")
    setBossHp(100)
    setTransitioning(false)
    setSuccessAnimation(false)
  }

  const resetGame = () => {
    setScreen("home")
    setTeamName("")
    setTeamAvatar("🧑🏻‍🚀")
    setXp(0)
    setCurrentChapter(0)
    setMaxCombo(0)
    setCorrectCount(0)
    setUnlockedChapters([0])
    setLiveRanking(initialRanking)
    resetBattle()
  }

  const startChapter = (index) => {
    if (!unlockedChapters.includes(index)) return

    setCurrentChapter(index)
    resetBattle()
    setScreen("bossIntro")
  }

  const startCombat = () => {
    setChapterIntro(true)
    setScreen("question")

    setTimeout(() => {
      setChapterIntro(false)
    }, 2400)
  }

  const unlockNextChapter = () => {
    const nextChapter = currentChapter + 1

    if (nextChapter < chapters.length && !unlockedChapters.includes(nextChapter)) {
      setUnlockedChapters((prev) => [...prev, nextChapter])
    }
  }

  const handleAnswer = (index) => {
    if (selected !== null || gameOver || bossDefeated || transitioning || chapterIntro) return

    setSelected(index)

    if (index === question.correct) {
      const newCombo = combo + 1
      const earnedXp = 100 + combo * 20
      const newXp = xp + earnedXp
      const newHp = Math.max(bossHp - 25, 0)
      const message = getComboMessage(newCombo)

      setXp(newXp)
      setCombo(newCombo)
      setMaxCombo((prev) => Math.max(prev, newCombo))
      setCorrectCount((prev) => prev + 1)
      setComboMessage(message)
      setBossHp(newHp)
      setFeedback("PERFECT RESPONSE")
      setSuccessAnimation(true)
      updateLiveRanking(newXp)

      if (message) {
        setTimeout(() => {
          setComboMessage("")
        }, 1400)
      }

      if (newHp === 0) {
        unlockNextChapter()

        if (currentChapter === chapters.length - 1) {
          setTimeout(() => {
            setScreen("epilogue")
          }, 1800)
        } else {
          setTimeout(() => {
            setScreen("chapters")
          }, 2200)
        }
      }
    } else {
      setCombo(0)
      setComboMessage("")
      setFeedback("METABOLIC FAILURE")
      setSuccessAnimation(false)
    }
  }

  useEffect(() => {
    if (screen !== "question" || bossDefeated) return

    if (timeLeft > 0 && selected === null && !gameOver && !chapterIntro) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }

    if (timeLeft === 0 && !gameOver) {
      const failTimer = setTimeout(() => {
        setGameOver(true)
        setCombo(0)
        setComboMessage("")
        setFeedback("SYSTEM FAILURE")
      }, 0)

      return () => clearTimeout(failTimer)
    }
  }, [timeLeft, selected, gameOver, screen, bossDefeated, chapterIntro])

  useEffect(() => {
    if (screen !== "question" || bossDefeated) return

    if (selected !== null || gameOver) {
      const transitionTimer = setTimeout(() => {
        setTransitioning(true)
        setSuccessAnimation(false)
      }, 1500)

      const nextTimer = setTimeout(() => {
        if (currentQuestion < chapter.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelected(null)
          setFeedback("")
          setTimeLeft(30)
          setGameOver(false)
          setTransitioning(false)
          setSuccessAnimation(false)
        } else {
          setFeedback("CHAPTER COMPLETED")
          setTransitioning(false)
          setSuccessAnimation(false)
        }
      }, 2450)

      return () => {
        clearTimeout(transitionTimer)
        clearTimeout(nextTimer)
      }
    }
  }, [selected, gameOver, currentQuestion, screen, chapter.questions.length, bossDefeated])

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
          <h1>EPÍLOGO</h1>
          <h2>VOCÊS DESPERTARAM O CONHECIMENTO!</h2>
          <p>A bioquímica é a chave para entender a vida.</p>
          <p>Continuem explorando. Continuem evoluindo.</p>

          <div className="epilogue-tower">🧬</div>

          <button onClick={() => setScreen("ending")}>VER RESULTADO</button>
        </div>
      </div>
    )
  }

  if (screen === "ending") {
    return (
      <div className="ending-screen">
        <div className="phone-shell ending-shell">
          <div className="ending-core">🧬</div>

          <h1>MISSÃO CONCLUÍDA</h1>
          <h2>A HELIX FOI SALVA!</h2>

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

          <button onClick={resetGame}>VOLTAR AO INÍCIO</button>
        </div>
      </div>
    )
  }

  if (screen === "ranking") {
    return (
      <div className="ranking-screen">
        <div className="phone-shell">
          <button className="back-button" onClick={() => setScreen("home")}>←</button>

          <h1 className="screen-title">RANKING</h1>

          <div className="ranking-tabs">
            <span>GLOBAL</span>
            <span>AO VIVO</span>
          </div>

          <div className="ranking-list">
  {liveRanking.length === 0 && (
    <div className="empty-ranking">
      Nenhuma equipe jogou ainda.
    </div>
  )}

  {liveRanking.map((item, index) => (
              <div
                className={item.team === teamDisplayName ? "ranking-card your-position" : "ranking-card"}
                key={index}
              >
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{item.avatar} {item.team}</span>
                <em>XP {item.xp}</em>
              </div>
            ))}
          </div>

          <BottomNav active="ranking" setScreen={setScreen} />
        </div>
      </div>
    )
  }

  if (screen === "question") {
    return (
      <div
        className={
          feedback === "METABOLIC FAILURE"
            ? "question-screen screen-shake"
            : bossCritical
            ? "question-screen critical-mode"
            : "question-screen"
        }
      >
        <div className="phone-shell battle-shell">
          {comboMessage && (
            <div className="combo-overlay">
              <div>{comboMessage}</div>
              <span>COMBO x{combo}</span>
            </div>
          )}

          {bossCritical && <div className="critical-warning">⚠ CRITICAL THREAT ⚠</div>}

          {chapterIntro && (
            <div className="chapter-intro">
              <h1>{chapter.title}</h1>
              <h2>{chapter.subtitle}</h2>
              <p>{chapter.lore}</p>
              <strong>{chapter.boss}</strong>
            </div>
          )}

          {successAnimation && (
            <div className="success-overlay mega-success">
              <div>🧬</div>
              <h2>PROTEIN SYNTHESIS STABLE</h2>
              <span>+100 XP</span>
            </div>
          )}

          {transitioning && (
            <div className="transition-screen">
              <div>⚡ ANALYZING NEXT CELL...</div>
            </div>
          )}

          {(feedback === "METABOLIC FAILURE" || feedback === "SYSTEM FAILURE") && (
            <div className="cell-rain">
              <span>🦠</span>
              <span>🧫</span>
              <span>💀</span>
              <span>🧬</span>
              <span>🦠</span>
            </div>
          )}

          <button className="back-button" onClick={() => setScreen("chapters")}>←</button>

          <div className={timeLeft <= 10 ? "battle-top danger-time" : "battle-top"}>
            <span>{teamAvatar} {teamDisplayName}</span>
            <strong>00:{String(timeLeft).padStart(2, "0")}</strong>
          </div>

          <div className="xp-line">
            <span>XP {xp}</span>
            <div>
              <i style={{ width: `${Math.min(xp / 20, 100)}%` }}></i>
            </div>
          </div>

          <div className="boss-panel">
            <div className={bossCritical ? "boss-avatar critical-boss" : "boss-avatar"}>{chapter.bossIcon}</div>
            <h3>{chapter.boss}</h3>

            <div className="boss-bar">
              <i style={{ width: `${bossHp}%` }}></i>
            </div>

            <small>{bossHp}%</small>
          </div>

          <div className="question-card">
            {bossDefeated && <div className="boss-defeated">👑 BOSS ELIMINATED 👑</div>}

            {feedback && !bossDefeated && (
              <div className={feedback === "PERFECT RESPONSE" ? "success-feedback" : "error-feedback"}>
                {feedback}
              </div>
            )}

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

          <h1 className="screen-title">CAPÍTULOS</h1>
          <p className="screen-subtitle">ESCOLHA SEU CAMINHO</p>

          <div className="chapter-list">
            {chapters.map((item, index) => {
              const unlocked = unlockedChapters.includes(index)

              return (
                <div
                  className={unlocked ? "chapter-card unlocked" : "chapter-card locked"}
                  key={index}
                  onClick={() => startChapter(index)}
                >
                  <div className="chapter-icon">{unlocked ? item.icon : "🔒"}</div>

                  <div>
                    <span>{item.title}</span>
                    <h2>{item.subtitle}</h2>
                  </div>

                  <b>{unlocked ? "→" : "🔒"}</b>
                </div>
              )
            })}
          </div>

          <BottomNav active="chapters" setScreen={setScreen} />
        </div>
      </div>
    )
  }

  if (screen === "team") {
    return (
      <div className="team-screen">
        <div className="phone-shell">
          <button className="back-button" onClick={() => setScreen("home")}>←</button>

          <h1 className="screen-title">SUA EQUIPE</h1>
          <p className="screen-subtitle">MONTE SUA EQUIPE PARA A MISSÃO</p>

          <div className="team-slots">
            <span>{teamAvatar}</span>
            <span>＋</span>
            <span>＋</span>
            <span>＋</span>
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
              <div
                key={avatar}
                className={teamAvatar === avatar ? "avatar-selected" : ""}
                onClick={() => setTeamAvatar(avatar)}
              >
                {avatar}
              </div>
            ))}
          </div>

          <button className="primary-button" onClick={() => setScreen("chapters")}>
            INICIAR JORNADA
          </button>

          <BottomNav active="team" setScreen={setScreen} />
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="phone-shell home-shell">
        <button className="gear">⚙</button>

        <div className="hero-dna">🧬</div>

        <span className="brand-small">PROJECT</span>
        <h1>HELIX</h1>
        <h2>THE PROTEIN AWAKENING</h2>

        <button className="primary-button" onClick={() => setScreen("team")}>
          INICIAR MISSÃO
        </button>

        <button className="ghost-button">COMO JOGAR</button>

        <p className="credits">A PROJECT BY GUSTAVO VIANA</p>

        <BottomNav active="home" setScreen={setScreen} />
      </div>
    </div>
  )
}