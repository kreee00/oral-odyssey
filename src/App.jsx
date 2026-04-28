import { useState, useMemo } from "react";
import { T, SETS, RANK_EMOJIS, SET_KEYS } from "./constants";
import "./App.css";

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Pill({ color, bg, children }) {
  return <span style={{ background: bg, borderRadius: 20, padding: "5px 13px", fontSize: 12.5, fontWeight: 800, color }}>{children}</span>;
}

function StatBox({ label, value, color, bg }) {
  return (
    <div style={{ background: bg, borderRadius: 13, padding: "13px 15px", textAlign: "center" }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}

function ToothAvatar({ health, healthLabel }) {
  const state = health >= 70 ? "excellent" : health >= 40 ? "fair" : "poor";
  const colors = {
    excellent: { tooth: "#ffffff", outline: "#e2e8f0", glow: "#86efac", face: "#16a34a" },
    fair: { tooth: "#fef3c7", outline: "#fcd34d", glow: "#fbbf24", face: "#d97706" },
    poor: { tooth: "#d4a574", outline: "#92400e", glow: "transparent", face: "#dc2626" },
  };
  const c = colors[state];
  return (
    <div style={{ position: "absolute", top: -52, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
      <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {state === "excellent" && (<>
          <div style={{ position: "absolute", top: 5, right: 8, fontSize: 16, animation: "sparkle 1.5s ease-in-out infinite" }}>✨</div>
          <div style={{ position: "absolute", bottom: 8, left: 5, fontSize: 14, animation: "sparkle 1.8s ease-in-out infinite 0.3s" }}>✨</div>
        </>)}
        <svg width="70" height="70" viewBox="0 0 100 100">
          <path d="M50 10 C30 10, 20 20, 20 35 C20 50, 25 70, 30 85 C35 95, 45 98, 50 98 C55 98, 65 95, 70 85 C75 70, 80 50, 80 35 C80 20, 70 10, 50 10 Z"
            fill={c.tooth} stroke={c.outline} strokeWidth="3"
            style={{ filter: state === "excellent" ? `drop-shadow(0 0 8px ${c.glow})` : "none" }} />
          {state === "poor" && (<>
            <path d="M45 25 L48 45" stroke="#78350f" strokeWidth="2" opacity="0.6" />
            <path d="M60 30 L57 50" stroke="#78350f" strokeWidth="1.5" opacity="0.5" />
            <path d="M35 40 L40 60" stroke="#78350f" strokeWidth="1.5" opacity="0.5" />
          </>)}
          {state === "excellent" && (<>
            <circle cx="40" cy="45" r="3" fill={c.face} />
            <circle cx="60" cy="45" r="3" fill={c.face} />
            <path d="M35 58 Q50 68, 65 58" stroke={c.face} strokeWidth="3" fill="none" strokeLinecap="round" />
          </>)}
          {state === "fair" && (<>
            <circle cx="40" cy="45" r="2.5" fill={c.face} />
            <circle cx="60" cy="45" r="2.5" fill={c.face} />
            <line x1="38" y1="62" x2="62" y2="62" stroke={c.face} strokeWidth="2.5" strokeLinecap="round" />
          </>)}
          {state === "poor" && (<>
            <circle cx="40" cy="45" r="2.5" fill={c.face} />
            <circle cx="60" cy="45" r="2.5" fill={c.face} />
            <path d="M35 68 Q50 58, 65 68" stroke={c.face} strokeWidth="3" fill="none" strokeLinecap="round" />
          </>)}
        </svg>
      </div>
      <div style={{ textAlign: "center", fontSize: 10, fontWeight: 800, color: c.face, marginTop: 2 }}>{healthLabel}</div>
    </div>
  );
}

function HUD({ score, health, healthColor, rank, rankEmoji, levelId, total, t }) {
  return (
    <div style={{ marginTop: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#009688", background: "#e0f7fa", borderRadius: 20, padding: "4px 12px" }}>{rankEmoji} {rank}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#0d3b38" }}>⭐ {score} {t.pts}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748b", whiteSpace: "nowrap" }}>{t.communityHealth}</span>
        <div style={{ flex: 1, background: "#e2e8f0", borderRadius: 10, height: 9, overflow: "hidden" }}>
          <div style={{ width: `${health}%`, height: "100%", background: `linear-gradient(90deg,${healthColor},${healthColor}bb)`, borderRadius: 10, transition: "width 0.6s ease" }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: healthColor, whiteSpace: "nowrap" }}>{health}%</span>
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 7 }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i < levelId ? "#009688" : "#e2e8f0", transition: "background .3s" }} />
        ))}
      </div>
      <div style={{ textAlign: "right", fontSize: 10.5, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>{t.levelLabel} {levelId} / {total}</div>
    </div>
  );
}

function Dashboard({ answerHistory, score, health, badges, rank, onBack, t, lang }) {
  const categoryStats = useMemo(() => {
    const stats = {};
    answerHistory.forEach(a => {
      if (!stats[a.category]) stats[a.category] = { correct: 0, total: 0 };
      stats[a.category].total++;
      if (a.result === "best") stats[a.category].correct++;
    });
    return stats;
  }, [answerHistory]);

  const { strengths, improvements } = useMemo(() => {
    const s = [], i = [];
    Object.entries(categoryStats).forEach(([cat, stats]) => {
      const pct = Math.round((stats.correct / stats.total) * 100);
      if (pct >= 75) s.push(t.categories[cat] || cat);
      else if (pct < 50) i.push(t.categories[cat] || cat);
    });
    return { strengths: s, improvements: i };
  }, [categoryStats, t.categories]);

  return (
    <div className="card" style={{ maxWidth: 700, maxHeight: "90vh", overflowY: "auto" }}>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1.5 }}>{t.teacherDashboard}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#0d3b38", marginTop: 2 }}>{t.studentPerformance}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => window.print()} className="btn"
            style={{ background: "#f1f5f9", color: "#0d3b38", border: "2px solid #cbd5e1", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 800 }}>{t.printReport}</button>
          <button onClick={onBack} className="btn"
            style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 800 }}>{t.backToResults}</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
        <StatBox label={t.finalScore} value={`${score}/900`} color="#1d4ed8" bg="#eff6ff" />
        <StatBox label={t.performance} value={`${Math.round((score/900)*100)}%`} color="#15803d" bg="#f0fdf4" />
        <StatBox label={t.communityHealthStat} value={`${health}%`} color={health >= 70 ? "#16a34a" : "#d97706"} bg="#fefce8" />
        <StatBox label={t.badgesEarned} value={badges.length} color="#92400e" bg="#fffbeb" />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{t.categoryBreakdown}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(categoryStats).map(([cat, stats]) => {
            const pct = Math.round((stats.correct / stats.total) * 100);
            const color = pct >= 75 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
            return (
              <div key={cat} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0d3b38" }}>{t.categories[cat] || cat}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color }}>{pct}%</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 6, transition: "width 0.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{t.detailedResults}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {answerHistory.map((a, i) => (
            <div key={i} style={{ background: a.result === "best" ? "#f0fdf4" : a.result === "okay" ? "#fefce8" : "#fef2f2", border: `1.5px solid ${a.result === "best" ? "#86efac" : a.result === "okay" ? "#fde68a" : "#fca5a5"}`, borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#0d3b38" }}>Q{a.levelId}: {a.levelTitle}</span>
                <span style={{ fontSize: 11, fontWeight: 900, color: a.result === "best" ? "#15803d" : a.result === "okay" ? "#b45309" : "#b91c1c" }}>
                  {a.result === "best" ? "✓" : a.result === "okay" ? "~" : "✗"}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>
                <strong>{lang === "en" ? "Selected" : "Dipilih"}:</strong> {a.selectedOption} — {a.selectedText}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 14, padding: "14px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.recommendations}</div>
        <div style={{ fontSize: 13, color: "#2c5364", lineHeight: 1.6, fontWeight: 600 }}>
          {strengths.length > 0 && <div><strong>{lang === "en" ? "Strengths" : "Kekuatan"}:</strong> {strengths.join(", ")}</div>}
          {improvements.length > 0 && <div style={{ marginTop: 6 }}><strong>{lang === "en" ? "Areas for improvement" : "Bidang penambahbaikan"}:</strong> {improvements.join(", ")}</div>}
          <div style={{ marginTop: 8 }}>
            {lang === "en" ? "Continue practicing good oral health habits and share your knowledge!" : "Teruskan amalkan tabiat kesihatan oral dan kongsi ilmu!"}
          </div>
        </div>
      </div>
    </div>
  );
}

function EndScreen({ score, health, healthColor, healthLabel, badges, rank, rankEmoji, onRestart, onViewDashboard, t, lang, setsExplored, setTheme }) {
  const max = 900, pct = Math.round((score / max) * 100);
  const grade = pct >= 80 ? { label: t.grades.champion, color: "#15803d", emoji: "🏆" }
    : pct >= 50 ? { label: t.grades.good, color: "#b45309", emoji: "👍" }
    : { label: t.grades.keep, color: "#b91c1c", emoji: "📚" };

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 52, animation: "float 2.5s ease-in-out infinite" }}>{grade.emoji}</div>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 8 }}>{t.odysseyComplete}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#0d3b38", marginTop: 4 }}>{grade.label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#80cbc4" }}>{rankEmoji} {rank}</div>
        <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: "#64748b" }}>{setTheme.icon} {setTheme.name}</div>
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px", marginBottom: 16, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#475569" }}>
        {t.setsPlayed}: {setsExplored.length}/3
        {setsExplored.length === 3 && <div style={{ marginTop: 4, color: "#15803d", fontWeight: 800 }}>{t.allSetsComplete}</div>}
        {setsExplored.length < 3 && <div style={{ marginTop: 2, fontSize: 11, color: "#94a3b8" }}>{lang === "en" ? "Play again to discover new questions!" : "Main lagi untuk temui soalan baru!"}</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        <StatBox label={t.finalScore} value={`${score}/900`} color="#1d4ed8" bg="#eff6ff" />
        <StatBox label={t.performance} value={`${pct}%`} color={grade.color} bg="#f7fee7" />
        <StatBox label={t.communityHealthStat} value={healthLabel} color={healthColor} bg="#f0fdf4" />
        <StatBox label={t.badgesEarned} value={`${badges.length} 🏅`} color="#92400e" bg="#fffbeb" />
      </div>
      {badges.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.collection}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {badges.map((b, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,#fffbeb,#fef9c3)", border: "1.5px solid #fcd34d", borderRadius: 10, padding: "8px 13px", fontSize: 13, fontWeight: 700, color: "#92400e" }}>{b}</div>
            ))}
          </div>
        </div>
      )}
      <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 13, padding: "13px 16px", fontSize: 13, color: "#2c5364", lineHeight: 1.65, fontWeight: 600, marginBottom: 12 }}>
        <strong>{t.tipTitle}</strong> {t.tipText}
      </div>
      <button className="btn" onClick={onViewDashboard}
        style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "white", border: "none", borderRadius: 13, padding: "13px 28px", fontSize: 14, fontWeight: 800, width: "100%", marginBottom: 10 }}>
        {t.viewReport}
      </button>
      <button className="startbtn" onClick={onRestart} style={{ padding: "14px 32px", fontSize: 15 }}>
        {t.playAgain}
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function OralOdyssey() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("intro");
  const [currentSet, setCurrentSet] = useState("set1");
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(50);
  const [badges, setBadges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rankIndex, setRankIndex] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [setsExplored, setSetsExplored] = useState([]);
  const [isNewSet, setIsNewSet] = useState(false);

  const t = T[lang];
  const levels = SETS[currentSet][lang];
  const level = levels[levelIndex];
  const rank = t.ranks[rankIndex];
  const setTheme = t.setThemes[currentSet];

  const healthColor = health >= 70 ? "#16a34a" : health >= 40 ? "#d97706" : "#dc2626";
  const healthLabel = health >= 70 ? t.healthLabels.good : health >= 40 ? t.healthLabels.fair : t.healthLabels.poor;

  function pickRandomSet() {
    const unexplored = SET_KEYS.filter(k => !setsExplored.includes(k));
    const pool = unexplored.length > 0 ? unexplored : SET_KEYS;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setIsNewSet(!setsExplored.includes(picked));
    return picked;
  }

  const toggleLang = () => setLang(l => l === "en" ? "my" : "en");

  const startGame = () => {
    const picked = pickRandomSet();
    setCurrentSet(picked);
    setScreen("game");
  };

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    setHealth(h => Math.min(100, Math.max(0, h + opt.health)));
    setScore(s => s + opt.points);
    if (opt.unlock) setBadges(b => [...b, opt.unlock]);
    setAnswerHistory(h => [...h, {
      levelId: level.id, levelTitle: level.title, category: level.category,
      scenario: level.scenario, selectedOption: opt.label,
      selectedText: opt.text, result: opt.result, points: opt.points, health: opt.health,
    }]);
    setScreen("feedback");
  };

  const handleNext = () => {
    if (level.promotion) {
      setRankIndex(level.promotion.toKey);
      setScreen("promotion");
    } else { advance(); }
  };

  const advance = () => {
    setSelected(null);
    if (levelIndex + 1 >= levels.length) {
      const newExplored = setsExplored.includes(currentSet) ? setsExplored : [...setsExplored, currentSet];
      setSetsExplored(newExplored);
      setScreen("end");
    } else {
      setLevelIndex(i => i + 1);
      setScreen("game");
    }
  };

  const restart = () => {
    setScreen("intro"); setLevelIndex(0); setScore(0);
    setHealth(50); setBadges([]); setSelected(null); setRankIndex(0);
    setAnswerHistory([]); setShowDashboard(false);
    setIsNewSet(false);
  };

  const resetProgress = () => {
    setSetsExplored([]);
    restart();
  };

  return (
    <div className="app-wrap">
      {/* LANG TOGGLE */}
      <div style={{ position: "fixed", top: 14, right: 14, zIndex: 100 }} className="no-print">
        <button className="btn" onClick={toggleLang}
          style={{ background: "white", border: "2.5px solid #009688", borderRadius: 30, padding: "7px 18px", fontWeight: 900, fontSize: 13, color: "#009688", boxShadow: "0 2px 10px rgba(0,150,136,.2)", display: "flex", alignItems: "center", gap: 6 }}>
          🌐 {lang === "en" ? "BM" : "EN"}
        </button>
      </div>

      {screen === "intro" && (
        <div className="card" style={{ textAlign: "center", marginTop: 0 }} key={lang}>
          <div style={{ fontSize: 60, animation: "float 2.5s ease-in-out infinite" }}>🦷</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 2, marginTop: 10 }}>
            {lang === "en" ? "An Oral Health Game" : "Permainan Kesihatan Oral"}
          </div>
          <div style={{ fontSize: 34, fontWeight: 900, color: "#0d3b38", lineHeight: 1.1, marginTop: 4 }}>Oral Odyssey</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#80cbc4", marginBottom: 14, letterSpacing: 1 }}>{t.tagline}</div>

          {setsExplored.length > 0 && (
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 12, fontWeight: 700, color: "#475569" }}>
              {t.setsPlayed}: {setsExplored.length}/3 {SET_KEYS.map(k => (
                <span key={k} style={{ marginLeft: 4, opacity: setsExplored.includes(k) ? 1 : 0.3 }}>{t.setThemes[k].icon}</span>
              ))}
              {setsExplored.length === 3 && <div style={{ marginTop: 4, color: "#15803d", fontWeight: 800 }}>{t.allSetsComplete}</div>}
            </div>
          )}

          <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 16, padding: "15px 18px", fontSize: 14, color: "#2c5364", lineHeight: 1.7, fontWeight: 600, marginBottom: 18, textAlign: "left" }}>
            <div style={{ fontWeight: 900, color: "#009688", marginBottom: 5 }}>{t.missionTitle}</div>
            {t.missionText}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            {t.tags.map(tag => <span key={tag} style={{ background: "#e0f7fa", borderRadius: 20, padding: "5px 13px", fontSize: 12, fontWeight: 800, color: "#00796b" }}>{tag}</span>)}
          </div>
          <button className="startbtn" onClick={startGame}>
            {t.startBtn}
          </button>
          {setsExplored.length > 0 && (
            <button onClick={resetProgress} className="btn"
              style={{ marginTop: 10, background: "transparent", border: "none", color: "#94a3b8", fontSize: 11, fontWeight: 600, textDecoration: "underline" }}>
              {lang === "en" ? "Reset progress" : "Set semula kemajuan"}
            </button>
          )}
        </div>
      )}

      {screen === "game" && (
        <div className="card" key={`${currentSet}-${levelIndex}-${lang}`}>
          <div className={isNewSet && levelIndex === 0 ? "new-set" : ""}
            style={{ background: isNewSet && levelIndex === 0 ? "" : "linear-gradient(90deg,#e0f7fa,#b2ebf2)", borderRadius: 12, padding: "8px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", color: isNewSet && levelIndex === 0 ? "white" : "#00695c" }}>
            <span style={{ fontSize: 12, fontWeight: 900, display: "flex", alignItems: "center", gap: 6 }}>
              {setTheme.icon} {t.setName} {SET_KEYS.indexOf(currentSet) + 1}: {setTheme.name}
            </span>
            {isNewSet && levelIndex === 0 && <span style={{ fontSize: 11, fontWeight: 800 }}>{t.newSetDiscovered}</span>}
          </div>

          <ToothAvatar health={health} healthLabel={healthLabel} />
          <HUD score={score} health={health} healthColor={healthColor} rank={rank} rankEmoji={RANK_EMOJIS[rankIndex]} levelId={level.id} total={levels.length} t={t} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 10px" }}>
            <span style={{ fontSize: 30, animation: "float 2.5s ease-in-out infinite" }}>{level.emoji}</span>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1 }}>{t.levelLabel} {level.id}</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: "#0d3b38" }}>{level.title}</div>
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 14, padding: "14px 16px", marginBottom: 16, fontSize: 14, color: "#2c5364", lineHeight: 1.65, fontWeight: 600, boxShadow: "inset 0 2px 6px rgba(0,150,136,.07)" }}>
            📋 {level.scenario}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {level.options.map(opt => (
              <button key={opt.label} className="opt" disabled={!!selected} onClick={() => handleSelect(opt)}>
                <span style={{ background: "#009688", color: "white", borderRadius: 8, width: 27, height: 27, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{opt.label}</span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "feedback" && selected && (
        <div className="card" style={{ textAlign: "center" }} key={`fb-${levelIndex}`}>
          <ToothAvatar health={health} healthLabel={healthLabel} />
          <HUD score={score} health={health} healthColor={healthColor} rank={rank} rankEmoji={RANK_EMOJIS[rankIndex]} levelId={level.id} total={levels.length} t={t} />
          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: 50, animation: "pop 0.45s ease" }}>{selected.result === "best" ? "🌟" : selected.result === "okay" ? "👍" : "💡"}</div>
            <div style={{ fontSize: 19, fontWeight: 900, marginTop: 8, color: selected.result === "best" ? "#15803d" : selected.result === "okay" ? "#b45309" : "#b91c1c" }}>
              {t.results[selected.result]}
            </div>
            <div style={{ background: selected.result === "best" ? "#f0fdf4" : selected.result === "okay" ? "#fefce8" : "#fef2f2", border: `1.5px solid ${selected.result === "best" ? "#86efac" : selected.result === "okay" ? "#fde68a" : "#fca5a5"}`, borderRadius: 14, padding: "13px 16px", fontSize: 13.5, fontWeight: 600, color: "#1e293b", lineHeight: 1.6, margin: "12px 0", textAlign: "left" }}>
              {selected.feedback}
            </div>
            {selected.unlock && (
              <div style={{ background: "linear-gradient(135deg,#fffbeb,#fef9c3)", border: "2px solid #fcd34d", borderRadius: 12, padding: "11px 16px", marginBottom: 14, fontSize: 13.5, fontWeight: 800, color: "#92400e", animation: "pop 0.4s ease" }}>
                {t.unlocked} {selected.unlock}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
              <Pill color="#1d4ed8" bg="#eff6ff">+{selected.points} {t.pts}</Pill>
              <Pill color={selected.health >= 0 ? "#15803d" : "#b91c1c"} bg={selected.health >= 0 ? "#f0fdf4" : "#fef2f2"}>
                {selected.health >= 0 ? `+${selected.health}` : selected.health} {t.health}
              </Pill>
            </div>

            <button className="startbtn" onClick={handleNext} style={{ padding: "13px 32px", fontSize: "14.5px" }}>
              {levelIndex + 1 >= levels.length ? t.finalResults : level.promotion ? t.getPromoted : t.nextLevel}
            </button>
          </div>
        </div>
      )}

      {screen === "promotion" && (
        <div className="card" style={{ textAlign: "center" }} key={`promo-${rankIndex}`}>
          <div style={{ fontSize: 62, animation: "float 1s ease-in-out infinite" }}>{level.promotion.emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 10 }}>{t.promotionTitle}</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#0d3b38", marginTop: 4 }}>{t.congratulations}</div>
          <div style={{ fontSize: 14, color: "#64748b", margin: "10px 0 18px", fontWeight: 600 }}>
            {t.promotedFrom}<br />
            <span style={{ fontWeight: 800, color: "#94a3b8" }}>{T[lang].ranks[level.promotion.fromKey]}</span>
            <span style={{ margin: "0 8px", fontSize: 20 }}>→</span>
            <span style={{ fontWeight: 900, color: "#009688" }}>{T[lang].ranks[level.promotion.toKey]}</span>
          </div>
          <div style={{ background: "linear-gradient(135deg,#e0f7fa,#b2ebf2)", borderRadius: 16, padding: "18px", marginBottom: 22, fontSize: 40 }}>
            {RANK_EMOJIS[level.promotion.toKey]}
          </div>
          <button className="startbtn" onClick={advance} style={{ padding: "14px 32px", fontSize: 15 }}>
            {t.continueJourney}
          </button>
        </div>
      )}

      {screen === "end" && !showDashboard && (
        <EndScreen score={score} health={health} healthColor={healthColor} healthLabel={healthLabel} badges={badges} rank={rank} rankEmoji={RANK_EMOJIS[rankIndex]} onRestart={restart} onViewDashboard={() => setShowDashboard(true)} t={t} lang={lang} setsExplored={setsExplored} setTheme={setTheme} />
      )}

      {screen === "end" && showDashboard && (
        <Dashboard answerHistory={answerHistory} score={score} health={health} badges={badges} rank={rank} onBack={() => setShowDashboard(false)} t={t} lang={lang} />
      )}

    </div>
  );
}
