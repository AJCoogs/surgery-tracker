import { useState, useEffect } from "react";

const STAGES = [
  { id:1, label:"Check-In", subtitle:"Your loved one has been tagged and bagged (in a gown).", icon:"📋", detail:"Wristband applied. Dignity removed. Hospital socks issued.", time:"6:02 AM" },
  { id:2, label:"Pre-Op Prep", subtitle:"Currently being asked the same 14 questions for the 7th time.", icon:"💉", detail:"\"Can you confirm your date of birth?\" — everyone, repeatedly.", time:"6:47 AM" },
  { id:3, label:"Anesthesia", subtitle:"They're counting backwards from 10. They made it to 7.", icon:"😴", detail:"The good stuff is flowing. They're having a nice time now.", time:"7:15 AM" },
  { id:4, label:"Surgery", subtitle:"The surgeon is doing surgeon things. It's going great probably.", icon:"🔪", detail:"Please enjoy the world's most uncomfortable waiting room chair.", time:"7:32 AM" },
  { id:5, label:"Closing Up", subtitle:"Almost done! Just counting sponges to make sure they're all out.", icon:"🧵", detail:"Your loved one is being reassembled. Some assembly required.", time:"9:18 AM" },
  { id:6, label:"Recovery", subtitle:"They're awake and saying unhinged things to nurses.", icon:"🛏️", detail:"Current status: Loopy. Asking for Whataburger. Denied.", time:"9:55 AM" },
  { id:7, label:"Visitors!", subtitle:"You may now see your person. They look rough but they're fine.", icon:"🎉", detail:"Please act normal. Do NOT show them what they said on video.", time:"10:30 AM" },
];

const TIPS = [
  "The cafeteria coffee is $4.50 and tastes like regret.",
  "That vending machine in Hall B has been \"out of order\" since 2019.",
  "The WiFi password is on the whiteboard. It doesn't work.",
  "The gift shop teddy bear costs more than your copay.",
  "Parking validation is at the front desk. Your car is in Lot G. Good luck.",
  "The TV in the waiting room has been on HGTV for 11 years straight.",
  "Your surgeon is board-certified. The valet is not.",
  "If you hear a code, don't Google it. Just don't.",
  "The chapel is on the 2nd floor if you need to have a moment.",
  "That magazine you're reading is from 2017. Enjoy.",
];

const NURSE_UPDATES = [
  "Nurse Jackie says: \"Everything's going smoothly!\" 👍",
  "Update from OR: Surgeon requested their favorite playlist. Good sign.",
  "Nurse update: Vitals are stable. Vibes are immaculate.",
  "OR update: Halfway there! Livin' on a prayer. (Vitals are great.)",
  "Nurse Jackie says: \"Your person is doing wonderful, sweetie.\"",
];

function HMlogo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", lineHeight:1 }}>
      <span style={{ fontSize:11, fontFamily:"'Georgia', serif", color:"#1a5091", letterSpacing:"0.22em", fontWeight:400, marginBottom:1 }}>
        HOUSTON
      </span>
      <span style={{ fontSize:28, fontFamily:"'Georgia', serif", color:"#1a5091", fontWeight:400, fontStyle:"italic", letterSpacing:"-0.02em", lineHeight:1 }}>
        Methodist
      </span>
      <span style={{ fontSize:8, fontFamily:"'Georgia', serif", color:"#1a5091", letterSpacing:"0.32em", fontWeight:400, marginTop:3, textTransform:"uppercase" }}>
        Leading Medicine
      </span>
    </div>
  );
}

function DominoTracker({ currentStage, stages }) {
  const pct = stages.length > 1 ? (currentStage / (stages.length - 1)) * 100 : 0;
  return (
    <div style={{ margin:"24px 16px 0", position:"relative" }}>
      <div style={{ position:"relative", padding:"0 24px" }}>
        <div style={{ position:"absolute", top:24, left:24, right:24, height:6, background:"#252540", borderRadius:3, zIndex:0 }} />
        <div style={{
          position:"absolute", top:24, left:24, height:6, borderRadius:3, zIndex:1,
          width: `${pct}%`, maxWidth:"calc(100% - 48px)",
          background:"linear-gradient(90deg, #00bf6f, #00d97e)",
          transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)",
          boxShadow:"0 0 12px rgba(0,191,111,0.4)",
        }} />
        <div style={{
          position:"absolute", top:24, left:24, height:6, borderRadius:3, zIndex:2,
          width: `${pct}%`, maxWidth:"calc(100% - 48px)",
          transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)",
          background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          backgroundSize:"200% 100%", animation:"shimmer 2s linear infinite", pointerEvents:"none",
        }} />
        <div style={{ display:"flex", justifyContent:"space-between", position:"relative", zIndex:3 }}>
          {stages.map((stage, i) => {
            const done = i < currentStage;
            const active = i === currentStage;
            const future = i > currentStage;
            return (
              <div key={stage.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", width:0, flexGrow:1 }}>
                <div style={{
                  width: active ? 52 : 44, height: active ? 52 : 44, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: active ? 22 : 17,
                  background: done ? "linear-gradient(135deg,#00bf6f,#00a85d)" : active ? "linear-gradient(135deg,#0067c5,#003f80)" : "#1e1e32",
                  border: active ? "3px solid #4da3ff" : done ? "3px solid #00bf6f" : "3px solid #333350",
                  boxShadow: active ? "0 0 24px rgba(0,103,197,0.5)" : done ? "0 0 10px rgba(0,191,111,0.3)" : "none",
                  transition:"all 0.5s cubic-bezier(0.4,0,0.2,1)",
                  animation: active ? "activeBounce 2s ease-in-out infinite" : "none",
                  color: future ? "#555570" : "#fff", position:"relative",
                }}>
                  {done ? <span style={{ fontSize:18, fontWeight:900 }}>✓</span> : stage.icon}
                  {active && <div style={{
                    position:"absolute", inset:-6, borderRadius:"50%",
                    border:"2px solid rgba(77,163,255,0.3)", animation:"pingRing 2s ease-out infinite",
                  }} />}
                </div>
                <div style={{
                  marginTop:8, fontSize:8, fontFamily:"'IBM Plex Mono', monospace",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#fff" : done ? "#80d0a0" : "#555570",
                  textAlign:"center", letterSpacing:"0.04em", textTransform:"uppercase",
                  lineHeight:1.2, transition:"color 0.5s ease", maxWidth:56, wordBreak:"break-word",
                }}>
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActiveStageCard({ stage, index }) {
  return (
    <div style={{
      margin:"20px 24px 0", padding:"18px 20px",
      background:"linear-gradient(135deg, rgba(0,103,197,0.12), rgba(0,60,120,0.08))",
      border:"1px solid rgba(77,163,255,0.15)", borderRadius:14, position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,103,197,0.15),transparent 70%)", pointerEvents:"none" }} />
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
        <span style={{ fontSize:28 }}>{stage.icon}</span>
        <div>
          <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:18, fontWeight:700, color:"#fff" }}>{stage.label}</div>
          <div style={{ fontSize:10, fontFamily:"'IBM Plex Mono', monospace", color:"#6a8aaa", marginTop:1 }}>
            STEP {index + 1} OF 7 · {stage.time}
          </div>
        </div>
        <div style={{
          marginLeft:"auto", display:"flex", alignItems:"center", gap:6,
          padding:"4px 12px", background:"rgba(0,191,111,0.12)",
          border:"1px solid rgba(0,191,111,0.25)", borderRadius:20,
        }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#00bf6f", display:"inline-block", animation:"pulse 1.4s ease-in-out infinite" }} />
          <span style={{ fontSize:10, fontFamily:"'IBM Plex Mono', monospace", fontWeight:600, color:"#00d97e", textTransform:"uppercase", letterSpacing:"0.08em" }}>Live</span>
        </div>
      </div>
      <div style={{ fontSize:14, color:"#c0d8f0", fontFamily:"'Lato', sans-serif", lineHeight:1.5 }}>{stage.subtitle}</div>
      <div style={{ fontSize:12, color:"#7a9ab8", marginTop:6, fontStyle:"italic", fontFamily:"'IBM Plex Mono', monospace" }}>{stage.detail}</div>
    </div>
  );
}

export default function App() {
  const [currentStage, setCurrentStage] = useState(3);
  const [tipIndex, setTipIndex] = useState(0);
  const [nurseUpdate, setNurseUpdate] = useState(0);
  const [showNurse, setShowNurse] = useState(false);
  const [elapsed, setElapsed] = useState(87);
  const [panic, setPanic] = useState(0);
  const panicMsgs = [
    "Deep breaths. Everything is fine.",
    "Still fine. Maybe get some coffee?",
    "We promise. It's going well.",
    "Please stop pressing this button.",
    "Okay we're disabling this for your own good.",
    "...",
    "Seriously go watch HGTV.",
  ];

  useEffect(() => { const t = setInterval(() => setTipIndex(i => (i+1) % TIPS.length), 8000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setElapsed(m => m+1), 60000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const t = setInterval(() => {
      setNurseUpdate(n => (n+1) % NURSE_UPDATES.length);
      setShowNurse(true);
      setTimeout(() => setShowNurse(false), 5000);
    }, 20000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(170deg, #0d0d1a 0%, #141428 40%, #1a1a30 100%)",
      color:"#e0e0f0", fontFamily:"'Lato', 'Segoe UI', sans-serif",
      position:"relative", overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@300;400;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes slideIn{from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes activeBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes pingRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.6);opacity:0}}
      `}</style>

      <div style={{ position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,103,197,.08) 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ position:"absolute",bottom:-150,left:-80,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,191,111,.06) 0%,transparent 70%)",pointerEvents:"none" }} />

      {/* HEADER */}
      <div style={{ padding:"24px 24px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
          <HMlogo />
          <div style={{
            padding:"6px 14px", background:"rgba(0,103,197,0.1)",
            border:"1px solid rgba(0,103,197,0.2)", borderRadius:8,
            fontSize:13, fontFamily:"'Playfair Display', serif", fontWeight:700,
            color:"#a0c8ff", letterSpacing:"0.03em",
          }}>
            Surgery Tracker™
          </div>
        </div>

        <div style={{
          marginTop:18, padding:"14px 18px", background:"rgba(255,255,255,0.04)",
          borderRadius:12, border:"1px solid rgba(255,255,255,0.06)",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12,
        }}>
          <div>
            <div style={{ fontSize:10,color:"#6a6a80",fontFamily:"'IBM Plex Mono',monospace",textTransform:"uppercase",letterSpacing:"0.1em" }}>Patient</div>
            <div style={{ fontSize:17,fontWeight:700,fontFamily:"'Playfair Display',serif",color:"#fff" }}>Jefferson, Rick</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:10,color:"#6a6a80",fontFamily:"'IBM Plex Mono',monospace",textTransform:"uppercase",letterSpacing:"0.1em" }}>Procedure</div>
            <div style={{ fontSize:15,fontWeight:700,color:"#c8d8f0" }}>Hernia Repair</div>
          </div>
        </div>

        <div style={{ marginTop:14, display:"flex", gap:20, fontSize:12, color:"#7a7a90", flexWrap:"wrap" }}>
          <span>⏱️ Elapsed: <strong style={{color:"#b0b0d0"}}>{Math.floor(elapsed/60)}h {elapsed%60}m</strong></span>
          <span>🩺 Surgeon: <strong style={{color:"#b0b0d0"}}>Dr. Tapia</strong></span>
          <span>🏠 OR: <strong style={{color:"#b0b0d0"}}>#7</strong></span>
        </div>
      </div>

      {/* DOMINO'S TRACKER */}
      <DominoTracker currentStage={currentStage} stages={STAGES} />

      {/* ACTIVE CARD */}
      <ActiveStageCard stage={STAGES[currentStage]} index={currentStage} />

      {/* NURSE POPUP */}
      {showNurse && (
        <div style={{
          margin:"14px 24px 0", padding:"12px 16px",
          background:"linear-gradient(135deg, rgba(0,103,197,0.15), rgba(0,191,111,0.1))",
          border:"1px solid rgba(0,191,111,0.2)", borderRadius:12, fontSize:13,
          color:"#c0f0d8", animation:"slideIn 0.4s ease-out", fontFamily:"'Lato',sans-serif",
        }}>
          {NURSE_UPDATES[nurseUpdate]}
        </div>
      )}

      {/* COMPLETED LOG */}
      {currentStage > 0 && (
        <div style={{ margin:"18px 24px 0" }}>
          <div style={{ fontSize:10, fontFamily:"'IBM Plex Mono',monospace", color:"#4a4a60", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:8 }}>
            Completed Steps
          </div>
          {STAGES.slice(0, currentStage).map(s => (
            <div key={s.id} style={{
              display:"flex", alignItems:"center", gap:10, padding:"6px 0",
              borderBottom:"1px solid rgba(255,255,255,0.03)", fontSize:12,
              color:"#6a8a70", fontFamily:"'IBM Plex Mono',monospace",
            }}>
              <span style={{ color:"#00bf6f", fontWeight:700 }}>✓</span>
              <span style={{ flex:1 }}>{s.label}</span>
              <span style={{ color:"#4a4a60" }}>{s.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* TIPS */}
      <div key={tipIndex} style={{
        margin:"18px 24px 0", padding:"14px 16px",
        background:"rgba(255,200,50,0.06)", border:"1px solid rgba(255,200,50,0.12)",
        borderRadius:12, fontSize:13, color:"#d4c080", fontFamily:"'IBM Plex Mono',monospace", minHeight:40,
      }}>
        💡 {TIPS[tipIndex]}
      </div>

      {/* PANIC BUTTON */}
      <div style={{ padding:"22px 24px", textAlign:"center" }}>
        <button
          onClick={() => setPanic(c => Math.min(c+1, panicMsgs.length-1))}
          style={{
            padding:"14px 36px",
            background: panic >= panicMsgs.length-1 ? "#2a2a3a" : "linear-gradient(135deg,#c0392b,#e74c3c)",
            color: panic >= panicMsgs.length-1 ? "#5a5a70" : "#fff",
            border:"none", borderRadius:12, fontSize:14, fontWeight:700,
            fontFamily:"'Lato',sans-serif",
            cursor: panic >= panicMsgs.length-1 ? "not-allowed" : "pointer",
            letterSpacing:"0.05em", textTransform:"uppercase", transition:"all 0.3s ease",
            boxShadow: panic >= panicMsgs.length-1 ? "none" : "0 4px 20px rgba(231,76,60,0.3)",
          }}
        >
          🚨 Panic Button
        </button>
        <div key={panic} style={{ marginTop:10, fontSize:13, color:"#8a8aa0", fontStyle:"italic", minHeight:20 }}>
          {panic > 0 && panicMsgs[panic]}
        </div>
      </div>

      {/* DEMO CONTROLS */}
      <div style={{ padding:"16px 24px 28px", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize:10, color:"#4a4a60", fontFamily:"'IBM Plex Mono',monospace", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:10 }}>
          Demo Controls
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
          <button
            onClick={() => setCurrentStage(s => Math.max(s-1,0))}
            disabled={currentStage === 0}
            style={{
              padding:"8px 20px", background: currentStage===0?"#1e1e30":"#2a2a4a",
              color: currentStage===0?"#3a3a50":"#b0b0d0",
              border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, fontSize:12,
              cursor: currentStage===0?"not-allowed":"pointer", fontFamily:"'IBM Plex Mono',monospace",
            }}
          >
            ◀ Previous
          </button>
          <button
            onClick={() => setCurrentStage(s => Math.min(s+1,STAGES.length-1))}
            disabled={currentStage >= STAGES.length-1}
            style={{
              padding:"8px 20px",
              background: currentStage >= STAGES.length-1?"#1e1e30":"#0067c5",
              color: currentStage >= STAGES.length-1?"#3a3a50":"#fff",
              border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, fontSize:12,
              cursor: currentStage >= STAGES.length-1?"not-allowed":"pointer",
              fontFamily:"'IBM Plex Mono',monospace",
            }}
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign:"center", padding:"8px 24px 24px", fontSize:10, color:"#3a3a50", fontFamily:"'IBM Plex Mono',monospace" }}>
        © 2026 Houston Methodist Hospital · Not a real tracker · Please don't sue us
        <br />
        "Leading Medicine" · Also leading in waiting room discomfort
      </div>
    </div>
  );
}
