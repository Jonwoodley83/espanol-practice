/* ══════════════════════════════════════════════════════════
   TENSE REFERENCE PAGE
   A visual cheat sheet for all 8 tenses
══════════════════════════════════════════════════════════ */

const SUBJECTS_REF = ['yo','tú','él/ella','nosotros','vosotros','ellos/ellas'];

function buildReference() {
  const el = $('screen-reference');
  const tenses = Object.entries(CONTENT.grammar);

  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">
        Spanish Tense Reference
      </h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:560px;line-height:1.6;">
        A quick guide to all the tenses — what they mean, when to use them, how to form them,
        and the key time words that signal each one. Click any card to expand it.
      </p>
    </div>

    <!-- Quick nav pills -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:2rem;">
      ${tenses.map(([key, g]) => `
        <a href="#ref-${key}"
           style="padding:5px 14px;border-radius:20px;font-size:0.78rem;font-weight:500;
                  text-decoration:none;border:1px solid ${g.colour}33;
                  background:${g.colour}15;color:${g.colour};transition:all 0.15s;"
           onmouseover="this.style.background='${g.colour}30'"
           onmouseout="this.style.background='${g.colour}15'">
          ${g.name}
        </a>`).join('')}
    </div>

    <!-- Tense cards -->
    ${tenses.map(([key, g]) => renderTenseCard(key, g)).join('')}

    <!-- Comparison table -->
    ${renderComparisonTable()}
  `;
}

function renderTenseCard(key, g) {
  const subjectRows = SUBJECTS_REF.map((s, i) =>
    `<tr>
      <td style="padding:5px 10px;color:var(--text2);font-weight:500;font-size:0.82rem;border-bottom:1px solid var(--border);white-space:nowrap;">${s}</td>
      <td style="padding:5px 10px;color:${g.colour};font-size:0.88rem;border-bottom:1px solid var(--border);">${g.example.forms[i]}</td>
    </tr>`
  ).join('');

  // Build endings display
  let endingsHtml = '';
  if (key === 'present') {
    endingsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:6px;">
        ${['ar','er','ir'].map(type => `
          <div style="background:var(--bg3);border-radius:8px;padding:10px;">
            <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–${type} verbs</div>
            ${g.endings[type].map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
          </div>`).join('')}
      </div>`;
  } else if (key === 'preterite') {
    endingsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;">
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–ar verbs</div>
          ${g.endings.ar.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–er/–ir verbs</div>
          ${g.endings.er_ir.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
      </div>`;
  } else if (key === 'imperfect') {
    endingsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;">
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–ar verbs</div>
          ${g.endings.ar.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–er/–ir verbs</div>
          ${g.endings.er_ir.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
      </div>`;
  } else if (key === 'perfect' || key === 'pluperfect') {
    const haverLabel = key === 'perfect' ? 'haber (present)' : 'haber (imperfect)';
    endingsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;">
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">${haverLabel}</div>
          ${g.endings.haver.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Past participle</div>
          <div style="font-size:0.88rem;margin-bottom:4px;"><span style="color:var(--text3);">–ar →</span> <span style="color:${g.colour};font-weight:500;">${g.endings.ar}</span></div>
          <div style="font-size:0.88rem;"><span style="color:var(--text3);">–er/–ir →</span> <span style="color:${g.colour};font-weight:500;">${g.endings.er_ir}</span></div>
          <div style="margin-top:8px;font-size:0.75rem;color:var(--text3);">Irregulars: hecho, dicho, visto, ido, sido, abierto, escrito, vuelto</div>
        </div>
      </div>`;
  } else if (key === 'future' || key === 'conditional') {
    endingsHtml = `
      <div style="background:var(--bg3);border-radius:8px;padding:10px;margin-top:6px;display:inline-block;min-width:180px;">
        <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">All verbs (add to infinitive)</div>
        ${g.endings.all.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
      </div>`;
  } else if (key === 'subjunctive') {
    endingsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;">
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–ar verbs</div>
          ${g.endings.ar.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
        <div style="background:var(--bg3);border-radius:8px;padding:10px;">
          <div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">–er/–ir verbs</div>
          ${g.endings.er_ir.map((e,i) => `<div style="font-size:0.8rem;"><span style="color:var(--text3);font-size:0.72rem;">${SUBJECTS_REF[i]}</span> <span style="color:${g.colour};font-weight:500;">${e}</span></div>`).join('')}
        </div>
      </div>`;
  }

  return `
    <div id="ref-${key}" class="card" style="margin-bottom:1rem;border-left:3px solid ${g.colour};">
      <!-- Header — always visible -->
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;gap:12px;"
           onclick="toggleRefCard('body-${key}','arrow-${key}')">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div>
            <div style="font-family:'Fraunces',serif;font-size:1.1rem;font-weight:600;color:${g.colour};">${g.name}</div>
            <div style="font-size:0.75rem;color:var(--text3);">${g.fullName}</div>
          </div>
          <div style="font-size:0.82rem;color:var(--text2);max-width:360px;">${g.rule}</div>
        </div>
        <div id="arrow-${key}" style="color:var(--text3);font-size:1rem;transition:transform 0.2s;flex-shrink:0;">▼</div>
      </div>

      <!-- Collapsible body -->
      <div id="body-${key}" style="display:none;margin-top:1.25rem;">

        <!-- Formation -->
        <div style="margin-bottom:1rem;">
          <div style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">How to form it</div>
          <div style="font-size:0.85rem;color:var(--text2);">${g.formation}</div>
          ${endingsHtml}
        </div>

        <!-- Example conjugation + time signals side by side -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1rem;">
          <div>
            <div style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Example — ${g.example.verb}</div>
            <table style="border-collapse:collapse;width:100%;">
              ${subjectRows}
            </table>
          </div>
          <div>
            <div style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Time signal words</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${g.signals.map(s => `<span style="padding:3px 10px;background:${g.colour}15;border:1px solid ${g.colour}33;border-radius:20px;font-size:0.75rem;color:${g.colour};">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Watch out -->
        <div style="padding:10px 14px;background:rgba(232,168,56,0.08);border:1px solid rgba(232,168,56,0.2);border-radius:8px;font-size:0.82rem;color:var(--text2);line-height:1.6;">
          <strong style="color:var(--accent);">⚠ Watch out:</strong> ${g.watchOut}
        </div>

        <!-- Practice button -->
        <div style="margin-top:1rem;">
          <button class="secondary" style="font-size:0.8rem;padding:6px 16px;"
            onclick="switchMode('tense');tenseFilter={present:false,preterite:false,future:false,imperfect:false,perfect:false,conditional:false,subjunctive:false,pluperfect:false};tenseFilter['${key}']=true;buildTense();">
            Practice ${g.name} in Tense Spotter →
          </button>
        </div>
      </div>
    </div>`;
}

function renderComparisonTable() {
  const pastTenses = ['preterite','imperfect','perfect','pluperfect'];
  const rows = [
    { q:'Something that happened once at a specific time', best:'preterite' },
    { q:'Something you used to do regularly', best:'imperfect' },
    { q:'A background description or scene-setting', best:'imperfect' },
    { q:'Something you have done recently (still relevant now)', best:'perfect' },
    { q:'Something that had already happened before another past event', best:'pluperfect' },
  ];

  return `
    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="card-label">Choosing between past tenses</span>
        <span style="font-size:0.75rem;color:var(--text3);">The tricky part!</span>
      </div>
      <p style="font-size:0.83rem;color:var(--text2);margin-bottom:1rem;line-height:1.6;">
        Spanish has four past tenses and knowing which to use is one of the hardest parts. Here's a quick decision guide:
      </p>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.82rem;min-width:420px;">
          <thead>
            <tr style="border-bottom:1px solid var(--border);">
              <th style="padding:8px 12px;text-align:left;color:var(--text3);font-weight:500;">Situation</th>
              <th style="padding:8px 12px;text-align:left;color:var(--text3);font-weight:500;">Use</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => {
              const g = CONTENT.grammar[r.best];
              return `<tr style="border-bottom:1px solid var(--border);">
                <td style="padding:8px 12px;color:var(--text2);">${r.q}</td>
                <td style="padding:8px 12px;"><span style="color:${g.colour};font-weight:500;">${g.name}</span><br><span style="font-size:0.72rem;color:var(--text3);">${g.fullName}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:1rem;padding:10px 14px;background:rgba(91,156,246,0.08);border:1px solid rgba(91,156,246,0.2);border-radius:8px;font-size:0.82rem;color:var(--text2);line-height:1.6;">
        <strong style="color:var(--blue);">💡 Key test:</strong> Ask yourself — <em>"Was this a single completed event?"</em> → Preterite. <em>"Was this ongoing, habitual, or descriptive?"</em> → Imperfect. <em>"Does this connect to now?"</em> → Perfect. <em>"Did this happen before something else in the past?"</em> → Pluperfect.
      </div>
    </div>`;
}

function toggleRefCard(bodyId, arrowId) {
  const body  = document.getElementById(bodyId);
  const arrow = document.getElementById(arrowId);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display  = isOpen ? 'none' : 'block';
  if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
}
