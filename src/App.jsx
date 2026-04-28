import { useState, useEffect } from "react";

// ── STYLE INJECTION ──────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323:wght@400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ✅ Correção crucial para centralização */
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    overflow-x: hidden;
  }

  #root {
    width: 100% !important;
    min-height: 100vh;
  }

  :root {
    --blue:        #0078D7;
    --blue-dark:   #005A9E;
    --blue-hover:  #1084E0;
    --red:         #E81123;
    --gray:        #A0A0A0;
    --light:       #F0F0F0;
    --white:       #FFFFFF;
    --teal:        #008080;
    --border-dark: #6b6b6b;
    --border-lt:   #dfdfdf;
    --font-mono:   'Share Tech Mono', monospace;
    --font-vt:     'VT323', monospace;
  }

  body {
    font-family: var(--font-mono);
    background: var(--teal);
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 14px; }
  ::-webkit-scrollbar-track { background: var(--light); border: 1px solid var(--border-dark); }
  ::-webkit-scrollbar-thumb { background: var(--gray); border: 1px solid var(--border-dark); }

  @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }

  /* ✅ Classes de layout */
  .portfolio-bg {
    min-height: 100vh;
    background: var(--teal);
    background-image:
      repeating-linear-gradient(0deg,transparent,transparent 31px,rgba(0,0,0,0.03) 31px,rgba(0,0,0,0.03) 32px),
      repeating-linear-gradient(90deg,transparent,transparent 31px,rgba(0,0,0,0.03) 31px,rgba(0,0,0,0.03) 32px);
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .portfolio-content {
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @media (max-width: 768px) {
    .portfolio-bg { padding: 12px; }
    .portfolio-content { gap: 12px; }
    .window-body { padding: 10px !important; }
    .profile-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
    .project-grid { grid-template-columns: 1fr !important; }
  }
`;

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function WinBtn({ label, variant, onClick }) {
  const bg = variant === "close" ? "var(--red)" : "var(--light)";
  const color = variant === "close" ? "#fff" : "#000";
  return (
    <button
      onClick={onClick}
      style={{
        width: 16, height: 14,
        background: bg, color,
        border: "1px solid",
        borderColor: "var(--white) var(--border-dark) var(--border-dark) var(--white)",
        fontSize: 9, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "monospace", lineHeight: 1,
      }}
    >
      {label}
    </button>
  );
}

function Window({ title, icon = "💾", children, style = {}, animDelay = 0, className = "" }) {
  return (
    <div className={className} style={{
      background: "var(--light)",
      border: "2px solid",
      borderColor: "var(--white) var(--border-dark) var(--border-dark) var(--white)",
      boxShadow: "2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.1)",
      animation: `fadeIn 0.4s ease both`,
      animationDelay: `${animDelay}ms`,
      width: "100%",
      ...style,
    }}>
      {/* Title bar */}
      <div style={{
        background: "var(--blue)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 6px 4px 8px",
        userSelect: "none",
      }}>
        <span style={{
          color: "#fff", fontSize: 13,
          fontFamily: "var(--font-mono)",
          display: "flex", alignItems: "center", gap: 6,
          fontWeight: "bold",
        }}>
          <span style={{
            width: 14, height: 14,
            background: "#fff", borderRadius: 2,
            display: "inline-flex", alignItems: "center",
            justifyContent: "center", fontSize: 9,
          }}>{icon}</span>
          {title}
        </span>
        <div style={{ display: "flex", gap: 2 }}>
          <WinBtn label="─" />
          <WinBtn label="□" />
          <WinBtn label="" variant="close" />
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "16px 18px" }} className="window-body">{children}</div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      background: "var(--blue)", color: "#fff",
      padding: "2px 10px",
      fontSize: 11, fontFamily: "var(--font-mono)",
      border: "1px solid var(--blue-dark)",
      display: "inline-block",
      letterSpacing: 0.5,
    }}>{children}</span>
  );
}

function SecLabel({ children }) {
  return (
    <div style={{
      fontFamily: "var(--font-vt)", fontSize: 26,
      color: "var(--blue)", letterSpacing: 2,
      borderBottom: "2px solid var(--blue)",
      marginBottom: 14, paddingBottom: 4,
      textTransform: "uppercase",
    }}>{children}</div>
  );
}

// ── SECTIONS ─────────────────────────────────────────────────────────────────

function ProfileSection() {
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <Window title="about.exe — Ana Canestraro" icon="👩‍💻" animDelay={0}>
      <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start" }}>
        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <div style={{
            width: 110, height: 110,
            background: "linear-gradient(135deg, #0078D7 60%, #008080 100%)",
            border: "3px solid var(--border-dark)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 48,
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
          }}>👩‍💻</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
            {[
              { icon: "🔗", label: "LinkedIn", href: "https://linkedin.com/in/anacanestraro" },
              { icon: "🐙", label: "GitHub", href: "https://github.com/anacanestraro" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                background: "var(--white)",
                border: "1px solid var(--border-dark)",
                padding: "4px 10px", fontSize: 11,
                display: "flex", gap: 4, alignItems: "center",
                textDecoration: "none", color: "#333",
                cursor: "pointer",
              }}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{
            fontFamily: "var(--font-vt)", fontSize: 38,
            color: "#000", letterSpacing: 2,
          }}>
            ANA CANESTRARO
            <span style={{ opacity: cursor ? 1 : 0, color: "var(--blue)" }}>_</span>
          </div>
          <div style={{ fontSize: 15, color: "var(--blue-dark)", marginBottom: 10 }}>
            ▶ Desenvolvedora Full-Stack
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333", maxWidth: 600 }}>
            Desenvolvedora Full-Stack com experiência prática em projetos web
            utilizando <strong>React, Node.js, Django</strong> e <strong>PostgreSQL</strong>.
            Busco uma oportunidade como dev júnior ou plena para contribuir com
            soluções de qualidade em ambientes ágeis e colaborativos.
          </div>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              <span>📍</span> <span style={{ color: "#333" }}>Paranaguá, PR</span>
            </div>
            <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              <span>📧</span> <span style={{ color: "#333" }}>ana.canestraro07@gmail.com</span>
            </div>
            <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              <span>📞</span> <span style={{ color: "#333" }}>(41) 98524-6427</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

function SkillsSection() {
  const skills = {
    "Front-end":   ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    "Back-end":    ["Node.js", "Django", "Python", "API REST"],
    "Banco":       ["MySQL", "PostgreSQL"],
    "Ferramentas": ["Git", "GitLab", "Docker", "Kanban", "MVVM"],
  };

  const langs = [
    { name: "Inglês", level: 85 },
    { name: "Português", level: 100 },
  ];

  return (
    <Window title="skills.sys" icon="⚙" animDelay={100}>
      <SecLabel>HABILIDADES TÉCNICAS</SecLabel>
      <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16 }}>
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} style={{
            background: "var(--white)",
            border: "1px solid var(--border-dark)",
            padding: "10px 12px",
          }}>
            <div style={{ fontSize: 14, color: "var(--blue)", marginBottom: 8, textTransform: "uppercase", fontFamily: "var(--font-vt)", letterSpacing: 1 }}>{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map(s => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}><SecLabel>IDIOMAS</SecLabel></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
        {langs.map(({ name, level }) => (
          <div key={name}>
            <div style={{ fontSize: 13, marginBottom: 4, color: "#333" }}>{name} — {level === 100 ? "Nativo" : "Avançado"}</div>
            <div style={{
              height: 14, background: "#ccc",
              border: "1px solid var(--border-dark)",
              borderRadius: 0,
            }}>
              <div style={{
                width: `${level}%`, height: "100%",
                background: "var(--blue)",
                transition: "width 1s ease",
              }} />
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ExperienceSection() {
  const jobs = [
    {
      role: "Estagiária — Desenvolvimento de Software",
      company: "UNESPAR · Paranaguá, PR",
      period: "2025 – 2026",
      items: [
        "Desenvolvimento e manutenção do sistema SUAP (Django + PostgreSQL)",
        "Versionamento com Git/GitLab em ambiente colaborativo",
        "Metodologias ágeis (Kanban) e padrão arquitetural MVVM",
      ],
    },
    {
      role: "Estagiária — Suporte Técnico (Lab. de Informática)",
      company: "UNESPAR · Paranaguá, PR",
      period: "2024 – 2025",
      items: [
        "Atendimento técnico a professores e alunos",
        "Criação e gerenciamento de usuários no domínio",
        "Manutenção preventiva/corretiva de rede",
      ],
    },
  ];

  return (
    <Window title="experience.log" icon="📋" animDelay={150}>
      <SecLabel>EXPERIÊNCIA PROFISSIONAL</SecLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {jobs.map((job, i) => (
          <div key={i} style={{
            background: "var(--white)",
            border: "1px solid var(--border-dark)",
            padding: 14,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontFamily: "var(--font-vt)", fontSize: 20, color: "var(--blue)" }}>{job.role}</div>
                <div style={{ fontSize: 13, color: "#555" }}>{job.company}</div>
              </div>
              <Tag>{job.period}</Tag>
            </div>
            <ul style={{ marginTop: 10, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: "#333" }}>
              {job.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ProjectsSection() {
  const projects = [
    {
      name: "PawAdoption",
      sub: "Sistema de Adoção de Animais",
      status: "Em desenvolvimento · TCC",
      url: "github.com/anacanestraro/pawadoption",
      stack: ["React", "TypeScript", "Node.js", "API REST", "MySQL"],
      desc: "Aplicação web completa para divulgação e gerenciamento de adoção de pets. Cadastro de animais, listagem, atualização de status e gestão de voluntários.",
      images: [
        "https://via.placeholder.com/300x200/0078D7/FFFFFF?text=Home+Screen",
        "https://via.placeholder.com/300x200/008080/FFFFFF?text=Dashboard",
        "https://via.placeholder.com/300x200/005A9E/FFFFFF?text=Mobile+View",
      ],
    },
  ];

  return (
    <Window title="projects.exe" icon="🚀" animDelay={200}>
      <SecLabel>PROJETOS</SecLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {projects.map((p, i) => (
          <div key={i} className="project-grid" style={{
            background: "var(--white)",
            border: "1px solid var(--border-dark)",
            padding: 16,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 14,
            alignItems: "start",
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-vt)", fontSize: 26, color: "var(--blue)" }}>{p.name}</div>
              <div style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>{p.sub}</div>
              <div style={{ fontSize: 12, color: "var(--gray)", marginBottom: 10 }}>🔗 {p.url}</div>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: "#333", marginBottom: 12 }}>{p.desc}</p>
              
              {p.images && p.images.length > 0 && (
                <div style={{ 
                  display: "flex", 
                  gap: 10, 
                  marginBottom: 12,
                  overflowX: "auto",
                  paddingBottom: 4,
                }}>
                  {p.images.map((img, idx) => (
                    <div 
                      key={idx}
                      style={{
                        minWidth: 200,
                        height: 140,
                        background: "var(--light)",
                        border: "2px solid var(--border-dark)",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        flexShrink: 0,
                      }}
                      onClick={() => window.open(img, "_blank")}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.03)";
                        e.currentTarget.style.boxShadow = "3px 3px 0 #000";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      title="Clique para ampliar"
                    >
                      <img 
                        src={img} 
                        alt={`${p.name} - preview ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.map(s => <Tag key={s}>{s}</Tag>)}
              </div>
            </div>
            <div style={{
              background: "var(--light)",
              border: "1px solid var(--border-dark)",
              padding: "6px 12px",
              fontSize: 12, color: "var(--blue-dark)",
              whiteSpace: "nowrap",
              alignSelf: "start",
            }}>
              ● {p.status}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}

function EducationSection() {
  const edu = [
    {
      course: "Tecnologia em ADS",
      school: "IFPR — Instituto Federal do Paraná",
      place: "Paranaguá, PR",
      period: "2023 – 2026",
    },
    {
      course: "Ensino Médio",
      school: "Colégio Diocesano Leão XIII",
      place: "Paranaguá, PR",
      period: "2008 – 2021",
    },
  ];

  return (
    <Window title="education.dat" icon="🎓" animDelay={250}>
      <SecLabel>FORMAÇÃO ACADÊMICA</SecLabel>
      <div style={{ position: "relative", paddingLeft: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{
          position: "absolute", left: 8, top: 0, bottom: 0,
          width: 3, background: "var(--blue)",
        }} />
        {edu.map((e, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: -30, top: 4,
              width: 14, height: 14,
              background: "var(--blue)",
              border: "3px solid var(--white)",
              borderRadius: 0,
              boxShadow: "0 0 0 1px var(--blue-dark)",
            }} />
            <div style={{ fontFamily: "var(--font-vt)", fontSize: 22, color: "var(--blue)" }}>{e.course}</div>
            <div style={{ fontSize: 14, color: "#333", marginBottom: 4 }}>{e.school} · {e.place}</div>
            <Tag>{e.period}</Tag>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Mensagem enviada:", form);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  const contacts = [
    { icon: "📧", label: "Email", value: "ana.canestraro07@gmail.com", href: "mailto:ana.canestraro07@gmail.com" },
    { icon: "📱", label: "WhatsApp", value: "(41) 98524-6427", href: "https://wa.me/5541985246427" },
    { icon: "🔗", label: "LinkedIn", value: "/in/anacanestraro", href: "https://linkedin.com/in/anacanestraro" },
    { icon: "🐙", label: "GitHub", value: "@anacanestraro", href: "https://github.com/anacanestraro" },
  ];

  return (
    <Window title="contact.dll — Fale Comigo" icon="" animDelay={300}>
      <SecLabel>ENTRE EM CONTATO</SecLabel>
      
      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 10, marginBottom: 24 }}>
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--white)",
              border: "1px solid var(--border-dark)",
              padding: "10px 14px",
              fontSize: 13,
              color: "#333",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.2s, transform 0.1s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--blue)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "var(--white)";
              e.currentTarget.style.color = "#333";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: 18 }}>{c.icon}</span>
            <div>
              <div style={{ fontWeight: "bold", color: "var(--blue-dark)" }}>{c.label}</div>
              <div style={{ fontSize: 12, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</div>
            </div>
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input
            type="text"
            placeholder="Seu nome *"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              padding: "8px 12px",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--border-dark)",
              background: "var(--white)",
              outline: "none",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--blue)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-dark)"}
          />
          <input
            type="email"
            placeholder="Seu email *"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              padding: "8px 12px",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--border-dark)",
              background: "var(--white)",
              outline: "none",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--blue)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-dark)"}
          />
        </div>
        <textarea
          placeholder="Sua mensagem *"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{
            padding: "8px 12px",
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            border: "1px solid var(--border-dark)",
            background: "var(--white)",
            resize: "vertical",
            outline: "none",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--blue)"}
          onBlur={(e) => e.target.style.borderColor = "var(--border-dark)"}
        />
        <button
          type="submit"
          disabled={sent}
          style={{
            background: sent ? "var(--gray)" : "var(--blue)",
            color: "#fff",
            border: "1px solid var(--blue-dark)",
            padding: "10px 20px",
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            cursor: sent ? "not-allowed" : "pointer",
            alignSelf: "flex-start",
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseOver={(e) => !sent && (e.currentTarget.style.background = "var(--blue-hover)")}
          onMouseOut={(e) => !sent && (e.currentTarget.style.background = "var(--blue)")}
        >
          {sent ? "✓ Enviado com sucesso!" : "📤 Enviar Mensagem"}
        </button>
      </form>
    </Window>
  );
}

// ── BOOT SCREEN ───────────────────────────────────────────────────────────────

function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);
  const lines = [
    "Iniciando ANA.OS v2026...",
    "Carregando módulos de React...",
    "Verificando habilidades...",
    "Montando portfólio...",
    "Pronto!",
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(onDone, 400); return 100; }
        return p + 4;
      });
      setLine(l => Math.min(l + 0.3, lines.length - 1));
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 9999,
      fontFamily: "var(--font-mono)",
    }}>
      <div style={{ color: "var(--blue)", fontFamily: "var(--font-vt)", fontSize: 48, marginBottom: 24 }}>
        ANA.OS
      </div>
      {lines.slice(0, Math.ceil(line) + 1).map((l, i) => (
        <div key={i} style={{ color: "#0f0", fontSize: 14, marginBottom: 6 }}>
          {">"} {l}
        </div>
      ))}
      <div style={{
        marginTop: 24, width: 350, height: 20,
        border: "1px solid var(--gray)",
        background: "#111",
      }}>
        <div style={{
          width: `${progress}%`, height: "100%",
          background: "var(--blue)",
          transition: "width .08s linear",
        }} />
      </div>
      <div style={{ color: "var(--gray)", fontSize: 13, marginTop: 8 }}>{progress}%</div>
    </div>
  );
}

// ─ MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [booting, setBooting] = useState(true);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {booting && <BootScreen onDone={() => setBooting(false)} />}

      {!booting && (
        <div className="portfolio-bg">
          <div className="portfolio-content">
            <ProfileSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
            
            <div style={{ 
              textAlign: "center", 
              fontSize: 11, 
              color: "var(--gray)", 
              padding: "14px",
              fontFamily: "var(--font-vt)",
              letterSpacing: 1,
            }}>
              © 2026 ANA CANESTRARO · Feito com 💙 e React · ANA.OS v2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}