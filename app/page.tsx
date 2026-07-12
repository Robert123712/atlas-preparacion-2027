"use client";

import { useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  name: string;
  area: string;
  owner: string;
  initials: string;
  color: string;
  progress: number;
  risk: "En tiempo" | "Atención" | "Crítico";
  docs: number;
  updated: string;
  insight: string;
};

const projects: Project[] = [
  { id: "P-024", name: "Rediseño de turnos", area: "Operaciones", owner: "Mariana Torres", initials: "MT", color: "#5865f2", progress: 72, risk: "En tiempo", docs: 18, updated: "Hace 12 min", insight: "La simulación actual reduce 8.4 horas extra por persona al mes." },
  { id: "P-019", name: "Automatización de nómina", area: "Finanzas", owner: "Carlos Vela", initials: "CV", color: "#f59e0b", progress: 46, risk: "Atención", docs: 11, updated: "Hace 1 h", insight: "Falta validar el tratamiento de pausas y jornadas discontinuas." },
  { id: "P-031", name: "Cobertura sucursales norte", area: "Expansión", owner: "Ana Beltrán", initials: "AB", color: "#ec4899", progress: 28, risk: "Crítico", docs: 7, updated: "Ayer", insight: "La plantilla proyectada no cubre el escenario de 40 horas semanales." },
  { id: "P-012", name: "Políticas de desconexión", area: "Personas", owner: "Diego Ramos", initials: "DR", color: "#14b8a6", progress: 88, risk: "En tiempo", docs: 24, updated: "Ayer", insight: "El borrador está alineado; quedan dos cláusulas por aprobar." },
  { id: "P-008", name: "Tablero de productividad", area: "Tecnología", owner: "Lucía Peña", initials: "LP", color: "#8b5cf6", progress: 63, risk: "Atención", docs: 15, updated: "2 jul", insight: "Tres indicadores todavía premian horas trabajadas sobre resultados." },
];

const documents = [
  { name: "Diagnóstico de jornadas Q2.pdf", project: "Rediseño de turnos", type: "PDF", date: "Hoy, 11:42", status: "Analizado" },
  { name: "Matriz de escenarios 40h.xlsx", project: "Cobertura sucursales norte", type: "XLSX", date: "Hoy, 09:16", status: "Analizando" },
  { name: "Borrador política v4.docx", project: "Políticas de desconexión", type: "DOCX", date: "Ayer, 16:30", status: "Analizado" },
];

export default function Home() {
  const [active, setActive] = useState("Resumen");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => projects.filter((p) => `${p.name} ${p.area} ${p.owner}`.toLowerCase().includes(search.toLowerCase())), [search]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">A</span><div><strong>Atlas</strong><small>Centro de inteligencia</small></div></div>
        <nav aria-label="Navegación principal">
          <p className="nav-label">ESPACIO DE TRABAJO</p>
          {["Resumen", "Proyectos", "Documentos", "Hallazgos"].map((item, i) => <button key={item} className={active === item ? "nav-item active" : "nav-item"} onClick={() => setActive(item)}><span className="nav-icon">{["⌂","▦","□","✦"][i]}</span>{item}{item === "Hallazgos" && <em>6</em>}</button>)}
          <p className="nav-label second">PREPARACIÓN 2027</p>
          {["Plan de transición", "Escenarios", "Cumplimiento"].map((item, i) => <button key={item} className={active === item ? "nav-item active" : "nav-item"} onClick={() => setActive(item)}><span className="nav-icon">{["◴","⌁","✓"][i]}</span>{item}</button>)}
        </nav>
        <div className="sidebar-footer">
          <button className="help">? <span>Ayuda y recursos</span></button>
          <div className="profile"><div className="avatar">EN</div><div><strong>Eduardo Núñez</strong><small>Administrador</small></div><button>•••</button></div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search-wrap"><span>⌕</span><input aria-label="Buscar" placeholder="Buscar proyectos, documentos o personas..." value={search} onChange={(e) => setSearch(e.target.value)} /><kbd>⌘ K</kbd></div>
          <button className="icon-button" aria-label="Notificaciones">♢<i /></button>
          <button className="primary" onClick={() => setUploadOpen(true)}>＋ Agregar documento</button>
        </header>

        <div className="content">
          <div className="heading-row"><div><p className="eyebrow">DOMINGO, 12 DE JULIO</p><h1>{active === "Resumen" ? "Buenos días, Eduardo" : active}</h1><p>Esto es lo que requiere tu atención hoy.</p></div><button className="jarvis-button" onClick={() => setAssistantOpen(true)}><span>✦</span> Pregúntale a Atlas</button></div>

          <section className="readiness-card">
            <div className="readiness-copy"><div className="tag">JORNADA LABORAL 2027</div><h2>Tu organización está <span>68% preparada</span></h2><p>Atlas analizó 75 documentos en 12 proyectos y encontró 6 temas que conviene atender antes del siguiente trimestre.</p><button onClick={() => { setActive("Plan de transición"); notify("Abriendo el plan de transición"); }}>Ver plan de transición <b>→</b></button></div>
            <div className="ring" style={{"--percent": "68%"} as React.CSSProperties}><div><strong>68%</strong><small>Preparación</small></div></div>
            <div className="milestone"><span>PRÓXIMO HITO</span><strong>Diagnóstico de impacto</strong><small>Vence en 18 días · 3 tareas pendientes</small><div><i style={{width: "74%"}} /></div></div>
          </section>

          <section className="metrics">
            <article><span className="metric-icon blue">▦</span><div><small>PROYECTOS ACTIVOS</small><strong>12</strong><p><b>↑ 2</b> este mes</p></div></article>
            <article><span className="metric-icon violet">□</span><div><small>DOCUMENTOS ANALIZADOS</small><strong>75</strong><p><b>+14</b> esta semana</p></div></article>
            <article><span className="metric-icon amber">!</span><div><small>HALLAZGOS ABIERTOS</small><strong>6</strong><p><b>3</b> de prioridad alta</p></div></article>
            <article><span className="metric-icon green">✓</span><div><small>TAREAS COMPLETADAS</small><strong>84%</strong><p><b>↑ 6%</b> vs. mes anterior</p></div></article>
          </section>

          <div className="grid-main">
            <section className="panel projects-panel">
              <div className="panel-head"><div><h2>Proyectos que requieren atención</h2><p>Priorizados por riesgo, avance y fecha límite.</p></div><button onClick={() => setActive("Proyectos")}>Ver todos →</button></div>
              <div className="table-head"><span>PROYECTO</span><span>RESPONSABLE</span><span>AVANCE</span><span>ESTADO</span><span /></div>
              {filtered.slice(0,4).map((project) => <button className="project-row" key={project.id} onClick={() => setSelected(project)}><span className="project-title"><i style={{background: project.color}}>{project.name.charAt(0)}</i><span><strong>{project.name}</strong><small>{project.id} · {project.area}</small></span></span><span className="owner"><i>{project.initials}</i><span>{project.owner}</span></span><span className="progress"><b>{project.progress}%</b><i><em style={{width: `${project.progress}%`}} /></i></span><span className={`status ${project.risk.toLowerCase().replace("í","i").replace(" ", "-")}`}>{project.risk}</span><span className="chevron">›</span></button>)}
              {filtered.length === 0 && <div className="empty">No encontramos proyectos con “{search}”.</div>}
            </section>

            <aside className="panel insight-panel">
              <div className="spark">✦</div><span className="ai-label">HALLAZGO DE ATLAS</span><h2>Hay un patrón que deberías revisar</h2><p>3 proyectos dependen de esquemas de horas extra que podrían volverse insostenibles con la reducción de jornada.</p>
              <div className="mini-projects"><span><i className="dot pink" />Cobertura sucursales norte <b>24%</b></span><span><i className="dot amber-dot" />Automatización de nómina <b>18%</b></span><span><i className="dot purple-dot" />Tablero de productividad <b>12%</b></span></div>
              <button onClick={() => setAssistantOpen(true)}>Explorar con Atlas <b>→</b></button><small>Basado en 23 documentos · Actualizado hoy</small>
            </aside>
          </div>

          <section className="panel documents-panel">
            <div className="panel-head"><div><h2>Documentos recientes</h2><p>Atlas los organiza y conecta automáticamente con cada proyecto.</p></div><button onClick={() => setActive("Documentos")}>Abrir biblioteca →</button></div>
            <div className="document-list">{documents.map((doc) => <div className="document" key={doc.name}><span className={`file-icon ${doc.type.toLowerCase()}`}>{doc.type.slice(0,1)}</span><span><strong>{doc.name}</strong><small>{doc.project}</small></span><em>{doc.date}</em><b className={doc.status === "Analizando" ? "processing" : "done"}>{doc.status === "Analizando" ? "◌" : "✓"} {doc.status}</b><button aria-label={`Opciones para ${doc.name}`}>•••</button></div>)}</div>
          </section>
        </div>
      </section>

      {selected && <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><aside className="drawer"><button className="close" onClick={() => setSelected(null)}>×</button><span className={`status ${selected.risk.toLowerCase().replace("í","i")}`}>{selected.risk}</span><h2>{selected.name}</h2><p className="muted">{selected.id} · {selected.area}</p><div className="drawer-score"><strong>{selected.progress}%</strong><span>Avance general</span><i><em style={{width: `${selected.progress}%`}} /></i></div><h3>Lectura de Atlas</h3><div className="assistant-note"><span>✦</span><p>{selected.insight}</p></div><h3>Contexto del proyecto</h3><dl><div><dt>Responsable</dt><dd>{selected.owner}</dd></div><div><dt>Documentos</dt><dd>{selected.docs}</dd></div><div><dt>Última actividad</dt><dd>{selected.updated}</dd></div></dl><button className="primary wide" onClick={() => setAssistantOpen(true)}>Conversar sobre este proyecto</button></aside></div>}

      {assistantOpen && <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && setAssistantOpen(false)}><aside className="drawer assistant-drawer"><button className="close" onClick={() => setAssistantOpen(false)}>×</button><div className="assistant-brand"><span>✦</span><div><h2>Atlas</h2><p>Tu inteligencia de proyectos</p></div></div><div className="chat"><div className="message ai">Hola, Eduardo. Puedo cruzar información entre todos tus proyectos y documentos. ¿Qué necesitas entender?</div><p>SUGERENCIAS</p>{["¿Qué proyectos están en mayor riesgo?", "Resume el impacto de la jornada de 40 horas", "¿Qué decisiones siguen pendientes?"].map(q => <button key={q} onClick={() => notify("Atlas está preparando la respuesta...")}>{q}<span>→</span></button>)}</div><div className="composer"><textarea aria-label="Pregunta para Atlas" placeholder="Pregunta sobre tus proyectos..." /><button onClick={() => notify("Atlas está analizando 75 documentos...")}>↑</button></div><small className="disclaimer">Atlas puede cometer errores. Verifica decisiones importantes.</small></aside></div>}

      {uploadOpen && <div className="scrim modal-scrim" onMouseDown={(e) => e.target === e.currentTarget && setUploadOpen(false)}><section className="upload-modal"><button className="close" onClick={() => setUploadOpen(false)}>×</button><span className="modal-icon">□</span><h2>Agregar documentos</h2><p>Atlas leerá el contenido, lo conectará con tus proyectos y extraerá riesgos, decisiones y próximos pasos.</p><button className="dropzone" onClick={() => fileRef.current?.click()}><span>↑</span><strong>Selecciona archivos o arrástralos aquí</strong><small>PDF, DOCX, XLSX, PPTX o TXT · Máx. 25 MB</small></button><input ref={fileRef} type="file" multiple hidden onChange={(e) => { if (e.target.files?.length) { setUploadOpen(false); notify(`${e.target.files.length} documento(s) enviados a análisis`); } }} /><label>Asignar al proyecto<select><option>Atlas decidirá automáticamente</option>{projects.map(p => <option key={p.id}>{p.name}</option>)}</select></label><div className="modal-actions"><button onClick={() => setUploadOpen(false)}>Cancelar</button><button className="primary" onClick={() => fileRef.current?.click()}>Elegir archivos</button></div></section></div>}
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </main>
  );
}
