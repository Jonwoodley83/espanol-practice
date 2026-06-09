/* ══════════════════════════════════════════════════════════
   AI HOMEWORK PARSER
   Paste teacher notes → Claude extracts exercises → 
   Preview the generated test → Play it
══════════════════════════════════════════════════════════ */

const SYSTEM_PROMPT = `You are a Spanish language homework parser. A teacher will paste their lesson notes or homework sheet. Your job is to extract exercises and return them as structured JSON.

Analyse the notes and identify:
1. VERB TABLES — rows where a verb needs to be conjugated across tenses (present, preterite perfecto/perfect, gerundio, future, imperfect, conditional, subjunctive etc)
2. ERROR CORRECTION — sentences with deliberate grammar/agreement errors to be corrected
3. FILL IN THE BLANK — sentences with gaps to fill with the correct verb form
4. VOCABULARY — word pairs (Spanish ↔ English) or translation exercises
5. TRANSLATION — full sentences to translate either direction

Return ONLY valid JSON in exactly this structure — no preamble, no markdown, no explanation:

{
  "title": "short descriptive title for this homework",
  "summary": "one sentence describing what this homework covers",
  "exercises": [
    {
      "type": "verbTable",
      "title": "Exercise title",
      "instructions": "brief instruction for the student",
      "columns": ["Presente", "Pretérito Perfecto", "Gerundio"],
      "rows": [
        {
          "infinitive": "hablar",
          "meaning": "to speak",
          "subject": "yo",
          "cells": ["hablo", "he hablado", "estoy hablando"],
          "given": 0
        }
      ]
    },
    {
      "type": "errorCorrection",
      "title": "Exercise title",
      "instructions": "brief instruction",
      "sentences": [
        {
          "wrong": "Este mesa está limpia.",
          "correct": "Esta mesa está limpia.",
          "why": "Mesa is feminine — use esta not este."
        }
      ]
    },
    {
      "type": "fillBlank",
      "title": "Exercise title", 
      "instructions": "brief instruction",
      "sentences": [
        {
          "es": "Ayer ___ al mercado.",
          "answer": "fui",
          "options": ["fui", "voy", "iré", "iba"],
          "why": "Ayer (yesterday) + completed action = preterite. Fui = ir, yo, preterite."
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "Exercise title",
      "instructions": "brief instruction",
      "pairs": [
        { "es": "el perro", "en": "the dog" }
      ]
    }
  ]
}

Rules:
- Only include exercise types you can actually find in the notes
- For verbTable, "given" is the index (0-based) of the column that is pre-filled as an example
- For verbTable cells, if a cell would be blank in the homework, use "" (empty string) — the student must fill it in
- If the notes show a complete row as an example, mark given as the index of the most complete/obvious column
- Keep "why" explanations concise but grammatically accurate
- If you cannot identify any clear exercises, return {"title":"Could not parse","summary":"No clear exercises found","exercises":[]}
- Return ONLY the JSON object, nothing else`;

let aiHomeworkState = {
  step: 'input',   // 'input' | 'loading' | 'preview' | 'playing'
  rawNotes: '',
  parsed: null,
  activeExercise: 0,
  answers: {},
  checked: {},
  locked: {},
};

/* ── Entry point ── */
function buildAIHomework() {
  aiHomeworkState = { step:'input', rawNotes:'', parsed:null, activeExercise:0, answers:{}, checked:{}, locked:{} };
  renderAIHomework();
}

function renderAIHomework() {
  const el = $('screen-aihomework');
  if (!el) return;

  if (aiHomeworkState.step === 'input') renderInputStep(el);
  else if (aiHomeworkState.step === 'loading') renderLoadingStep(el);
  else if (aiHomeworkState.step === 'preview') renderPreviewStep(el);
  else if (aiHomeworkState.step === 'playing') renderPlayStep(el);
}

/* ── Step 1: Paste notes ── */
function renderInputStep(el) {
  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">
        AI Homework Generator
      </h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:560px;line-height:1.6;">
        Paste your teacher's notes or homework sheet below. Claude will read them and
        automatically generate an interactive test — verb tables, error correction, fill-in-the-blank and more.
      </p>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-label">Paste your homework notes</span>
        <span style="font-size:0.75rem;color:var(--text3);">Handwritten notes typed up, or copied from a doc</span>
      </div>

      <textarea id="hw-notes-input"
        placeholder="Paste your teacher's notes here...

Example:
EJERCICIO — Corrige los errores:
Esta chicos están en clase.
Estos mesa está limpia.

VERBOS — completa la tabla:
Hablar (yo): hablo / he hablado / estoy hablando
Tener (tú): tienes / ...

Or just paste the raw text from your homework sheet and Claude will figure out the structure."
        style="width:100%;height:260px;background:var(--bg3);border:1px solid var(--border);
               border-radius:8px;padding:12px 14px;color:var(--text);font-family:inherit;
               font-size:0.88rem;line-height:1.6;outline:none;resize:vertical;"
        onfocus="this.style.borderColor='var(--accent)'"
        onblur="this.style.borderColor='var(--border)'"
        oninput="aiHomeworkState.rawNotes=this.value"
      ></textarea>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1rem;flex-wrap:wrap;gap:10px;">
        <div style="font-size:0.8rem;color:var(--text3);">
          Works best with verb exercises, error corrections, fill-in-the-blank, and vocabulary lists.
        </div>
        <button class="primary" onclick="parseHomeworkWithAI()" id="parse-btn"
          style="padding:10px 24px;">
          Generate test with AI →
        </button>
      </div>
    </div>

    <!-- Example to try -->
    <div class="card" style="margin-top:1rem;">
      <div class="card-header">
        <span class="card-label">Try an example</span>
      </div>
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:0.75rem;">
        Click to load a sample homework sheet and see what Claude generates:
      </p>
      <button class="secondary" onclick="loadExample()" style="font-size:0.82rem;">
        Load example homework →
      </button>
    </div>`;
}

function loadExample() {
  const example = `EJERCICIO 1 — Corrige los errores de concordancia:
1. Este mesa está sucia.
2. Estas libro es interesante.
3. ¿Dónde está estos zapatos?
4. Esta chicos están cansados.
5. Estos silla está rota.

EJERCICIO 2 — Completa la tabla de verbos:
         PRESENTE    PRETÉRITO PERFECTO    GERUNDIO
hablar (yo):  hablo    he hablado           estoy hablando
comer (tú):   comes    ___                  ___
vivir (él):   ___      ha vivido            ___
ir (nosotros): vamos   ___                  ___

EJERCICIO 3 — Elige la forma correcta del verbo:
1. Ayer yo ___ (fui / voy / iré) al supermercado.
2. Mañana ella ___ (llegó / llega / llegará) a las diez.
3. Cuando era pequeño, siempre ___ (como / comía / comeré) con mis abuelos.
4. Esta semana nosotros ___ (hemos trabajado / trabajamos / trabajaremos) mucho.`;

  const textarea = document.getElementById('hw-notes-input');
  if (textarea) {
    textarea.value = example;
    aiHomeworkState.rawNotes = example;
  }
}

/* ── Step 2: Call Claude API ── */
async function parseHomeworkWithAI() {
  const notes = aiHomeworkState.rawNotes.trim();
  if (!notes) {
    alert('Please paste some homework notes first!');
    return;
  }

  aiHomeworkState.step = 'loading';
  renderAIHomework();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `Here are the homework notes to parse:\n\n${notes}` }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API error');
    }

    const text = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    // Strip any markdown code fences just in case
    const clean = text.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
    const parsed = JSON.parse(clean);

    if (!parsed.exercises || !Array.isArray(parsed.exercises)) {
      throw new Error('Unexpected response format');
    }

    aiHomeworkState.parsed = parsed;
    aiHomeworkState.step   = 'preview';
    aiHomeworkState.answers = {};
    aiHomeworkState.checked = {};
    aiHomeworkState.locked  = {};
    renderAIHomework();

  } catch (err) {
    const el = $('screen-aihomework');
    el.innerHTML = `
      <div class="card" style="border-color:rgba(255,107,107,0.3);">
        <div style="color:var(--accent2);font-size:1rem;font-weight:500;margin-bottom:0.5rem;">
          Something went wrong
        </div>
        <div style="font-size:0.85rem;color:var(--text2);margin-bottom:1rem;">
          ${err.message || 'Could not parse the response. Try again or simplify the notes.'}
        </div>
        <button class="primary" onclick="aiHomeworkState.step='input';renderAIHomework()">← Try again</button>
      </div>`;
  }
}

/* ── Step 3: Preview what was generated ── */
function renderPreviewStep(el) {
  const p = aiHomeworkState.parsed;

  const exerciseSummaries = p.exercises.map((ex, i) => {
    const icons = { verbTable:'📋', errorCorrection:'✏️', fillBlank:'📝', vocabulary:'📚' };
    const counts = {
      verbTable: `${ex.rows?.length || 0} verbs`,
      errorCorrection: `${ex.sentences?.length || 0} sentences`,
      fillBlank: `${ex.sentences?.length || 0} questions`,
      vocabulary: `${ex.pairs?.length || 0} words`,
    };
    return `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:1.2rem;">${icons[ex.type] || '📄'}</span>
        <div style="flex:1;">
          <div style="font-size:0.88rem;font-weight:500;color:var(--text);">${ex.title || ex.type}</div>
          <div style="font-size:0.75rem;color:var(--text3);">${ex.type} · ${counts[ex.type] || ''}</div>
        </div>
        <span style="font-size:0.75rem;padding:2px 10px;background:rgba(61,214,172,0.1);
               border:1px solid rgba(61,214,172,0.3);border-radius:20px;color:var(--present);">
          Ready
        </span>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;"
        onclick="aiHomeworkState.step='input';renderAIHomework()">← Edit notes</button>
      <div>
        <div style="font-size:1rem;font-weight:500;color:var(--text);">${p.title}</div>
        <div style="font-size:0.8rem;color:var(--text3);">${p.summary}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="card-label">Claude found ${p.exercises.length} exercise${p.exercises.length!==1?'s':''}</span>
        <span style="font-size:0.75rem;color:var(--text3);">Review before starting</span>
      </div>
      ${exerciseSummaries}
      <div style="margin-top:1rem;padding:10px 14px;background:rgba(232,168,56,0.08);
                  border:1px solid rgba(232,168,56,0.2);border-radius:8px;font-size:0.82rem;color:var(--text2);">
        💡 Check the exercises look right before you start — Claude usually gets it but may occasionally
        misread formatting or spacing in complex tables.
      </div>
    </div>

    <div class="btn-row">
      <button class="primary" onclick="startAITest()">Start test →</button>
      <button class="secondary" onclick="aiHomeworkState.step='input';renderAIHomework()">Paste different notes</button>
    </div>`;
}

function startAITest() {
  aiHomeworkState.step          = 'playing';
  aiHomeworkState.activeExercise = 0;
  aiHomeworkState.answers        = {};
  aiHomeworkState.checked        = {};
  aiHomeworkState.locked         = {};
  renderAIHomework();
}

/* ── Step 4: Play the generated test ── */
function renderPlayStep(el) {
  const p   = aiHomeworkState.parsed;
  const idx = aiHomeworkState.activeExercise;
  const ex  = p.exercises[idx];

  const tabs = p.exercises.map((e, i) => {
    const icons = { verbTable:'📋', errorCorrection:'✏️', fillBlank:'📝', vocabulary:'📚' };
    return `<button onclick="aiHomeworkState.activeExercise=${i};renderAIHomework()"
      style="padding:6px 14px;font-size:0.78rem;cursor:pointer;border-radius:20px;font-family:inherit;
             border:1px solid ${i===idx?'var(--accent)':'var(--border)'};
             background:${i===idx?'rgba(232,168,56,0.15)':'transparent'};
             color:${i===idx?'var(--accent)':'var(--text3)'};white-space:nowrap;">
      ${icons[e.type]||'📄'} ${e.title||`Exercise ${i+1}`}
    </button>`;
  }).join('');

  let exerciseHTML = '';
  if      (ex.type === 'verbTable')       exerciseHTML = renderAIVerbTable(ex, idx);
  else if (ex.type === 'errorCorrection') exerciseHTML = renderAIErrorCorrection(ex, idx);
  else if (ex.type === 'fillBlank')       exerciseHTML = renderAIFillBlank(ex, idx);
  else if (ex.type === 'vocabulary')      exerciseHTML = renderAIVocabulary(ex, idx);
  else exerciseHTML = `<div class="card"><p style="color:var(--text2);">Exercise type "${ex.type}" — coming soon.</p></div>`;

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;"
        onclick="aiHomeworkState.step='preview';renderAIHomework()">← Back to overview</button>
      <div style="font-size:0.9rem;font-weight:500;color:var(--text);">${p.title}</div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.25rem;">${tabs}</div>
    ${exerciseHTML}`;
}

/* ── Verb table exercise ── */
function renderAIVerbTable(ex, exIdx) {
  const colCount = ex.columns.length;
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-label">${ex.title}</span>
      </div>
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:1rem;">${ex.instructions}</p>

      <!-- Reference -->
      <div class="explanation" style="margin-bottom:1rem;">
        <strong>Columns:</strong> ${ex.columns.join(' → ')}
      </div>

      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:420px;">
          <thead>
            <tr style="border-bottom:1px solid var(--border);">
              <th style="padding:7px 10px;text-align:left;font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em;">Verb</th>
              ${ex.columns.map((c,ci) => `
                <th style="padding:7px 10px;text-align:left;font-size:0.72rem;
                     color:${ci===ex.rows[0]?.given?'var(--accent)':'var(--text3)'};
                     text-transform:uppercase;letter-spacing:0.04em;">${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${ex.rows.map((row, ri) => {
              const key = `${exIdx}-${ri}`;
              return `<tr style="border-bottom:1px solid var(--border);">
                <td style="padding:8px 10px;font-size:0.82rem;">
                  <strong style="color:var(--accent);">${row.infinitive}</strong>
                  <span style="color:var(--text3);font-size:0.72rem;display:block;">${row.meaning} · ${row.subject}</span>
                </td>
                ${row.cells.map((cell, ci) => {
                  if (ci === row.given) {
                    return `<td style="padding:8px 10px;font-size:0.88rem;color:var(--text2);">${cell}</td>`;
                  }
                  const cellKey = `${key}-${ci}`;
                  const locked  = aiHomeworkState.locked[cellKey];
                  const wrong   = aiHomeworkState.checked[cellKey] && !locked;
                  if (locked) {
                    return `<td style="padding:6px 8px;">
                      <span style="color:var(--present);font-size:0.88rem;">✓ ${cell}</span>
                    </td>`;
                  }
                  return `<td style="padding:6px 8px;">
                    <input type="text" id="ai-${cellKey}"
                      placeholder="..."
                      autocomplete="off" autocorrect="off" spellcheck="false"
                      style="width:100%;min-width:80px;background:var(--bg3);
                             border:1px solid ${wrong?'var(--accent2)':'var(--border)'};
                             border-radius:6px;padding:5px 8px;color:var(--text);
                             font-family:inherit;font-size:0.85rem;outline:none;"
                      onfocus="this.style.borderColor='var(--accent)'"
                      onblur="this.style.borderColor='${wrong?'var(--accent2)':'var(--border)'}'"
                      onkeydown="if(event.key==='Enter')checkAIVerbCell('${cellKey}','${cell.replace(/'/g,"\\'")}',this.value)">
                    ${wrong ? `<div style="font-size:0.7rem;color:var(--accent2);margin-top:2px;">Answer: ${cell}</div>` : ''}
                  </td>`;
                }).join('')}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="btn-row" style="margin-top:1rem;">
        <button class="primary" onclick="checkAllAIVerbCells('${exIdx}')">Check all answers</button>
        <button class="secondary" onclick="revealAllAIVerbCells('${exIdx}')">Show answers</button>
      </div>
      <div id="ai-vt-score-${exIdx}"></div>
    </div>`;
}

function checkAIVerbCell(cellKey, answer, value) {
  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n');
  const correct = norm(value||'') === norm(answer);
  aiHomeworkState.checked[cellKey] = true;
  if (correct) {
    aiHomeworkState.locked[cellKey] = true;
    score += 8; correct_count++; streak++;
  } else { streak = 0; }
  renderAIHomework();
}

// Fix naming conflict with global correct
let correct_count = 0;

function checkAllAIVerbCells(exIdx) {
  const ex   = aiHomeworkState.parsed.exercises[exIdx];
  let   hits = 0, total_cells = 0;
  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n');

  ex.rows.forEach((row, ri) => {
    const key = `${exIdx}-${ri}`;
    row.cells.forEach((cell, ci) => {
      if (ci === row.given) return;
      const cellKey = `${key}-${ci}`;
      const input   = document.getElementById(`ai-${cellKey}`);
      const value   = input ? input.value.trim() : '';
      total_cells++;
      aiHomeworkState.checked[cellKey] = true;
      if (norm(value) === norm(cell)) {
        aiHomeworkState.locked[cellKey] = true;
        hits++;
      }
    });
  });

  score += hits * 8;
  updateStats();
  renderAIHomework();

  setTimeout(() => {
    const scoreEl = document.getElementById(`ai-vt-score-${exIdx}`);
    if (scoreEl) {
      const pct = Math.round((hits/total_cells)*100);
      scoreEl.innerHTML = `
        <div style="margin-top:1rem;padding:10px 14px;
             background:${pct>=80?'rgba(61,214,172,0.08)':'rgba(255,107,107,0.06)'};
             border:1px solid ${pct>=80?'rgba(61,214,172,0.3)':'rgba(255,107,107,0.2)'};
             border-radius:8px;font-size:0.85rem;color:${pct>=80?'var(--present)':'var(--accent2)'};">
          ${hits} of ${total_cells} correct (${pct}%)
          ${pct>=80?' — ¡Muy bien!':' — Keep practising!'}
        </div>`;
    }
  }, 100);
}

function revealAllAIVerbCells(exIdx) {
  const ex = aiHomeworkState.parsed.exercises[exIdx];
  ex.rows.forEach((row, ri) => {
    const key = `${exIdx}-${ri}`;
    row.cells.forEach((cell, ci) => {
      if (ci === row.given) return;
      const cellKey = `${key}-${ci}`;
      aiHomeworkState.locked[cellKey]  = true;
      aiHomeworkState.checked[cellKey] = true;
    });
  });
  renderAIHomework();
}

/* ── Error correction exercise ── */
function renderAIErrorCorrection(ex, exIdx) {
  return `
    <div class="card">
      <div class="card-header"><span class="card-label">${ex.title}</span></div>
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:1.25rem;">${ex.instructions}</p>
      ${ex.sentences.map((s, si) => {
        const key    = `${exIdx}-ec-${si}`;
        const locked = aiHomeworkState.locked[key];
        const wrong  = aiHomeworkState.checked[key] && !locked;
        const norm   = t => t.toLowerCase().trim()
          .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n');
        return `
          <div style="margin-bottom:1.25rem;">
            <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
              <span style="font-size:0.75rem;color:var(--text3);">${si+1}.</span>
              <span style="color:var(--accent2);font-size:0.92rem;font-style:italic;">${s.wrong}</span>
            </div>
            ${locked ? `
              <div style="color:var(--present);font-size:0.9rem;margin-bottom:4px;">✓ ${s.correct}</div>
              <div style="font-size:0.78rem;color:var(--text3);">${s.why}</div>
            ` : `
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="text" id="ai-${key}" placeholder="Write the corrected sentence..."
                  autocomplete="off" autocorrect="off" spellcheck="false"
                  style="flex:1;min-width:200px;background:var(--bg3);
                         border:1px solid ${wrong?'var(--accent2)':'var(--border)'};
                         border-radius:8px;padding:8px 12px;color:var(--text);
                         font-family:inherit;font-size:0.88rem;outline:none;"
                  onfocus="this.style.borderColor='var(--accent)'"
                  onblur="this.style.borderColor='${wrong?'var(--accent2)':'var(--border)'}'"
                  onkeydown="if(event.key==='Enter'){const v=this.value;checkAIEC('${key}','${s.correct.replace(/'/g,"\\'")}','${s.why.replace(/'/g,"\\'").replace(/"/g,'&quot;')}',v)}">
                <button onclick="checkAIEC('${key}','${s.correct.replace(/'/g,"\\'")}','${s.why.replace(/'/g,"\\'").replace(/"/g,'&quot;')}',document.getElementById('ai-${key}').value)"
                  style="padding:7px 16px;background:var(--accent);border:none;border-radius:8px;
                         color:#0f0e17;font-family:inherit;font-size:0.82rem;font-weight:500;cursor:pointer;">
                  Check
                </button>
              </div>
              ${wrong ? `<div style="font-size:0.75rem;color:var(--accent2);margin-top:4px;">
                Correct: <em>${s.correct}</em> — ${s.why}</div>` : ''}
            `}
          </div>`;
      }).join('')}
    </div>`;
}

function checkAIEC(key, answer, why, value) {
  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n');
  aiHomeworkState.checked[key] = true;
  if (norm(value||'') === norm(answer)) {
    aiHomeworkState.locked[key] = true;
    score += 8; streak++;
    updateStats();
  } else { streak = 0; updateStats(); }
  renderAIHomework();
}

/* ── Fill in the blank ── */
function renderAIFillBlank(ex, exIdx) {
  return `
    <div class="card">
      <div class="card-header"><span class="card-label">${ex.title}</span></div>
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:1.25rem;">${ex.instructions}</p>
      ${ex.sentences.map((s, si) => {
        const key    = `${exIdx}-fb-${si}`;
        const locked = aiHomeworkState.locked[key];
        const wrong  = aiHomeworkState.checked[key] && !locked;
        const display = locked
          ? s.es.replace('___', `<strong style="color:var(--present)">${s.answer}</strong>`)
          : s.es.replace('___', `<span style="border-bottom:2px solid var(--accent);padding:0 20px;color:var(--accent);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`);

        return `
          <div style="margin-bottom:1.25rem;padding:12px 14px;background:var(--bg3);border-radius:10px;
               border:1px solid ${locked?'rgba(61,214,172,0.25)':wrong?'rgba(255,107,107,0.25)':'var(--border)'};">
            <div style="font-size:1rem;font-family:'Fraunces',serif;font-weight:300;color:var(--text);margin-bottom:8px;">${display}</div>
            ${locked ? `<div style="font-size:0.75rem;color:var(--present);">✓ ${s.why}</div>` : `
              ${s.options ? `
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">
                  ${s.options.map(opt => `
                    <button onclick="checkAIFB('${key}','${s.answer.replace(/'/g,"\\'")}','${s.why.replace(/'/g,"\\'").replace(/"/g,'&quot;')}','${opt.replace(/'/g,"\\'")}')${''}"
                      style="padding:5px 14px;background:var(--bg2);border:1px solid var(--border);
                             border-radius:8px;font-size:0.85rem;color:var(--text2);cursor:pointer;font-family:inherit;">
                      ${opt}
                    </button>`).join('')}
                </div>` : `
                <div style="display:flex;gap:8px;align-items:center;">
                  <input type="text" id="ai-${key}" placeholder="Fill in the gap..."
                    autocomplete="off" autocorrect="off" spellcheck="false"
                    style="flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:8px;
                           padding:7px 12px;color:var(--text);font-family:inherit;font-size:0.88rem;outline:none;"
                    onfocus="this.style.borderColor='var(--accent)'"
                    onkeydown="if(event.key==='Enter')checkAIFB('${key}','${s.answer.replace(/'/g,"\\'")}','${s.why.replace(/'/g,"\\'").replace(/"/g,'&quot;')}',this.value)">
                  <button onclick="checkAIFB('${key}','${s.answer.replace(/'/g,"\\'")}','${s.why.replace(/'/g,"\\'").replace(/"/g,'&quot;')}',document.getElementById('ai-${key}').value)"
                    style="padding:7px 14px;background:var(--accent);border:none;border-radius:8px;
                           color:#0f0e17;font-family:inherit;font-size:0.82rem;font-weight:500;cursor:pointer;">
                    Check
                  </button>
                </div>`}
              ${wrong ? `<div style="font-size:0.75rem;color:var(--accent2);margin-top:6px;">
                Not quite — answer: <strong>${s.answer}</strong>. ${s.why}</div>` : ''}`}
          </div>`;
      }).join('')}
    </div>`;
}

function checkAIFB(key, answer, why, value) {
  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n');
  aiHomeworkState.checked[key] = true;
  if (norm(value||'') === norm(answer)) {
    aiHomeworkState.locked[key] = true;
    score += 8; streak++;
    updateStats();
  } else { streak = 0; updateStats(); }
  renderAIHomework();
}

/* ── Vocabulary exercise ── */
function renderAIVocabulary(ex, exIdx) {
  const showEs = Math.random() > 0.5; // random direction
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-label">${ex.title}</span>
        <span style="font-size:0.75rem;color:var(--text3);">${showEs?'Spanish → English':'English → Spanish'}</span>
      </div>
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:1.25rem;">${ex.instructions}</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${ex.pairs.map((pair, pi) => {
          const key    = `${exIdx}-vocab-${pi}`;
          const locked = aiHomeworkState.locked[key];
          const wrong  = aiHomeworkState.checked[key] && !locked;
          const prompt = showEs ? pair.es : pair.en;
          const answer = showEs ? pair.en : pair.es;
          return `
            <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;
                 background:var(--bg3);border-radius:8px;
                 border:1px solid ${locked?'rgba(61,214,172,0.25)':wrong?'rgba(255,107,107,0.2)':'var(--border)'};">
              <span style="font-size:0.9rem;color:var(--accent);font-weight:500;min-width:120px;">${prompt}</span>
              <span style="color:var(--text3);">→</span>
              ${locked ? `<span style="color:var(--present);font-size:0.88rem;">✓ ${answer}</span>` : `
                <input type="text" id="ai-${key}" placeholder="Translation..."
                  autocomplete="off" autocorrect="off" spellcheck="false"
                  style="flex:1;background:var(--bg2);border:1px solid ${wrong?'var(--accent2)':'var(--border)'};
                         border-radius:6px;padding:5px 10px;color:var(--text);font-family:inherit;font-size:0.85rem;outline:none;"
                  onfocus="this.style.borderColor='var(--accent)'"
                  onkeydown="if(event.key==='Enter')checkAIVocab('${key}','${answer.replace(/'/g,"\\'")}',this.value)">
                ${wrong?`<span style="font-size:0.75rem;color:var(--accent2);">${answer}</span>`:''}
              `}
            </div>`;
        }).join('')}
      </div>
      <button class="primary" onclick="checkAllAIVocab('${exIdx}')" style="margin-top:1rem;">Check all</button>
    </div>`;
}

function checkAIVocab(key, answer, value) {
  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n');
  aiHomeworkState.checked[key] = true;
  if (norm(value||'') === norm(answer)) {
    aiHomeworkState.locked[key] = true;
    score += 6; streak++;
    updateStats();
  } else { streak = 0; updateStats(); }
  renderAIHomework();
}

function checkAllAIVocab(exIdx) {
  const ex = aiHomeworkState.parsed.exercises[exIdx];
  ex.pairs.forEach((pair, pi) => {
    const key   = `${exIdx}-vocab-${pi}`;
    const input = document.getElementById(`ai-${key}`);
    if (input) checkAIVocab(key, pair.en, input.value); // simplified — always checks EN
  });
}

/* ── Loading screen ── */
function renderLoadingStep(el) {
  el.innerHTML = `
    <div style="text-align:center;padding:4rem 2rem;">
      <div style="font-size:2.5rem;margin-bottom:1rem;animation:spin 1.5s linear infinite;display:inline-block;">⚙️</div>
      <div style="font-family:'Fraunces',serif;font-size:1.3rem;font-weight:600;margin-bottom:0.5rem;">
        Claude is reading your notes...
      </div>
      <div style="color:var(--text3);font-size:0.88rem;">Identifying exercises, parsing verb tables, building your test...</div>
    </div>
    <style>@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}</style>`;
}
