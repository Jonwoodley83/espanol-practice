/* ══════════════════════════════════════════════════════════
   HOMEWORK TEST ENGINE
   Handles two test types:
   1. verbTable  — fill in missing verb forms
   2. errorCorrection — identify & fix agreement errors
══════════════════════════════════════════════════════════ */

let hwState = {
  testId: null,
  answers: {},       // rowIndex/sentenceIndex → user answer
  revealed: {},      // which answers have been checked
  submitted: false,
};

/* ── Entry point ── */
function buildHomework() {
  const el = $('screen-homework');
  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <span class="card-label">Homework tests</span>
        <span style="font-size:0.78rem;color:var(--text3);">From your teacher's notes</span>
      </div>
      <div class="q-text" style="margin-bottom:1rem;">Choose a test</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${CONTENT.homeworkTests.map(t => `
          <button class="secondary" style="text-align:left;padding:1rem;" onclick="startHomeworkTest('${t.id}')">
            <div style="font-weight:500;color:var(--text);margin-bottom:4px;">${t.title}</div>
            <div style="font-size:0.8rem;color:var(--text3);">${t.subtitle}</div>
          </button>`).join('')}
      </div>
    </div>`;
}

function startHomeworkTest(id) {
  const test = CONTENT.homeworkTests.find(t => t.id === id);
  if (!test) return;
  hwState = { testId: id, answers: {}, revealed: {}, submitted: false };
  if (test.type === 'verbTable')       renderVerbTable(test);
  else if (test.type === 'errorCorrection') renderErrorCorrection(test);
}

/* ══════════════════════════════════
   VERB TABLE TEST
══════════════════════════════════ */
function renderVerbTable(test) {
  const el = $('screen-homework');

  const refBox = `
    <div class="explanation" style="margin-bottom:1.25rem;">
      <strong>Quick reference</strong><br>
      <strong>Pretérito perfecto:</strong> ${test.reference.pretPerfecto}<br>
      <strong>Gerundio:</strong> ${test.reference.gerundio}
    </div>`;

  const tableRows = test.rows.map((row, i) => {
    const cols = ['present', 'pretPerf', 'gerundio'].map(col => {
      if (col === row.given) {
        // Pre-filled cell (the given one)
        const displayVal = col === 'present' ? row.present : col === 'pretPerf' ? row.pretPerf : row.gerundio;
        return `<td style="color:var(--text2);font-size:0.88rem;padding:8px 10px;">${displayVal}</td>`;
      } else {
        // Input cell
        const answerId = `hw_${i}_${col}`;
        return `<td style="padding:4px 6px;">
          <input type="text" id="${answerId}"
            placeholder="..."
            autocomplete="off" autocorrect="off" spellcheck="false"
            style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:6px;
                   padding:6px 10px;color:var(--text);font-family:inherit;font-size:0.85rem;outline:none;"
            oninput="hwSaveAnswer('${answerId}')"
            onfocus="this.style.borderColor='var(--accent)'"
            onblur="this.style.borderColor='var(--border)'"
          >
          <div id="${answerId}_fb" style="font-size:0.72rem;margin-top:3px;display:none;"></div>
        </td>`;
      }
    });

    const noteHtml = row.note ? `<span style="font-size:0.7rem;color:var(--accent);"> ★ ${row.note}</span>` : '';
    return `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:8px 10px;font-size:0.8rem;color:var(--text3);white-space:nowrap;">${i+1}</td>
      <td style="padding:8px 10px;font-size:0.82rem;color:var(--text2);white-space:nowrap;">
        <strong style="color:var(--accent)">${row.infinitive}</strong><br>
        <span style="color:var(--text3);font-size:0.75rem;">${row.meaning} · ${row.subject}</span>
        ${noteHtml}
      </td>
      ${cols.join('')}
    </tr>`;
  }).join('');

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;" onclick="buildHomework()">← Back</button>
      <div>
        <div style="font-size:1rem;font-weight:500;color:var(--text);">${test.title}</div>
        <div style="font-size:0.8rem;color:var(--text3);">${test.subtitle}</div>
      </div>
    </div>
    ${refBox}
    <div class="card" style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:520px;">
        <thead>
          <tr style="border-bottom:1px solid var(--border);">
            <th style="padding:8px 10px;text-align:left;font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;width:28px;">#</th>
            <th style="padding:8px 10px;text-align:left;font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;">Verb</th>
            <th style="padding:8px 10px;text-align:left;font-size:0.72rem;color:var(--present);text-transform:uppercase;letter-spacing:0.05em;">Presente</th>
            <th style="padding:8px 10px;text-align:left;font-size:0.72rem;color:var(--preterite);text-transform:uppercase;letter-spacing:0.05em;">Pret. Perfecto</th>
            <th style="padding:8px 10px;text-align:left;font-size:0.72rem;color:var(--future);text-transform:uppercase;letter-spacing:0.05em;">Gerundio (–ing)</th>
          </tr>
        </thead>
        <tbody id="verb-table-body">
          ${tableRows}
        </tbody>
      </table>
    </div>
    <div class="btn-row">
      <button class="primary" onclick="checkVerbTable('${test.id}')">Check answers</button>
      <button class="secondary" onclick="revealAllVerb('${test.id}')">Show all answers</button>
    </div>
    <div id="hw-score-box" style="display:none;" class="card" style="text-align:center;"></div>`;
}

function hwSaveAnswer(id) {
  const input = document.getElementById(id);
  if (input) hwState.answers[id] = input.value.trim();
}

function normalise(str) {
  // Lowercase, trim, collapse spaces, strip accents for lenient comparison
  return str.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u')
    .replace(/ü/g,'u').replace(/ñ/g,'n').replace(/\s+/g,' ');
}

function checkVerbTable(testId) {
  const test = CONTENT.homeworkTests.find(t => t.id === testId);
  let correct = 0, total = 0;

  test.rows.forEach((row, i) => {
    ['present', 'pretPerf', 'gerundio'].forEach(col => {
      if (col === row.given) return; // skip pre-filled
      total++;
      const id    = `hw_${i}_${col}`;
      const input = document.getElementById(id);
      const fb    = document.getElementById(`${id}_fb`);
      if (!input || !fb) return;

      const userAns    = input.value.trim();
      const correctAns = col === 'present' ? row.present : col === 'pretPerf' ? row.pretPerf : row.gerundio;

      // Accept answer if normalised match (allows missing accents)
      const isCorrect = normalise(userAns) === normalise(correctAns);

      if (isCorrect) {
        correct++;
        input.style.borderColor = 'var(--present)';
        input.style.color = 'var(--present)';
        fb.style.display = 'block';
        fb.style.color = 'var(--present)';
        fb.textContent = '✓ Correct' + (userAns !== correctAns ? ` (exact: ${correctAns})` : '');
      } else if (userAns === '') {
        input.style.borderColor = 'var(--accent2)';
        fb.style.display = 'block';
        fb.style.color = 'var(--accent2)';
        fb.textContent = `✗ Answer: ${correctAns}`;
      } else {
        input.style.borderColor = 'var(--accent2)';
        input.style.color = 'var(--accent2)';
        fb.style.display = 'block';
        fb.style.color = 'var(--accent2)';
        fb.textContent = `✗ Correct: ${correctAns}`;
      }

      if (row.note && !isCorrect) {
        fb.textContent += ` — ${row.note}`;
      }
    });
  });

  showHWScore(correct, total);
  updateStats();
  score += correct * 8;
  this.correct = (this.correct || 0) + correct;
  this.total   = (this.total || 0) + total;
  updateStats();
}

function revealAllVerb(testId) {
  const test = CONTENT.homeworkTests.find(t => t.id === testId);
  test.rows.forEach((row, i) => {
    ['present', 'pretPerf', 'gerundio'].forEach(col => {
      if (col === row.given) return;
      const input = document.getElementById(`hw_${i}_${col}`);
      const fb    = document.getElementById(`hw_${i}_${col}_fb`);
      const correctAns = col === 'present' ? row.present : col === 'pretPerf' ? row.pretPerf : row.gerundio;
      if (input) {
        input.value = correctAns;
        input.style.borderColor = 'var(--text3)';
        input.style.color = 'var(--accent)';
        input.disabled = true;
      }
      if (fb && row.note) {
        fb.style.display = 'block';
        fb.style.color = 'var(--text3)';
        fb.textContent = `★ ${row.note}`;
      }
    });
  });
}

/* ══════════════════════════════════
   ERROR CORRECTION TEST
══════════════════════════════════ */
function renderErrorCorrection(test) {
  const el = $('screen-homework');

  // Reference table
  const refRows = test.reference.table.map(r =>
    `<tr><td style="color:var(--accent);font-weight:500;padding:4px 10px;">${r.dem}</td>
         <td style="color:var(--text2);padding:4px 10px;">${r.gender}</td>
         <td style="color:var(--text2);padding:4px 10px;">${r.number}</td>
         <td style="color:var(--text3);padding:4px 10px;font-style:italic;">${r.example}</td></tr>`
  ).join('');

  const refBox = `
    <div class="explanation" style="margin-bottom:1.25rem;">
      <strong>Rule:</strong> ${test.reference.rule}
      <table style="margin-top:8px;border-collapse:collapse;width:100%;">
        <tr style="border-bottom:1px solid var(--border);">
          <th style="text-align:left;padding:4px 10px;font-size:0.72rem;color:var(--text3);">Demonstrative</th>
          <th style="text-align:left;padding:4px 10px;font-size:0.72rem;color:var(--text3);">Gender</th>
          <th style="text-align:left;padding:4px 10px;font-size:0.72rem;color:var(--text3);">Number</th>
          <th style="text-align:left;padding:4px 10px;font-size:0.72rem;color:var(--text3);">Example</th>
        </tr>
        ${refRows}
      </table>
    </div>`;

  const sentences = test.sentences.map((s, i) => `
    <div id="ec_row_${i}" style="margin-bottom:1.25rem;">
      <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
        <span style="font-size:0.75rem;color:var(--text3);min-width:20px;">${i+1}.</span>
        <span style="color:var(--accent2);font-size:0.92rem;font-style:italic;">${s.wrong}</span>
        <span style="font-size:0.75rem;color:var(--text3);">[Error: ${s.error}]</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:0.8rem;color:var(--text3);white-space:nowrap;">Correction →</span>
        <input type="text" id="ec_${i}"
          placeholder="Write the corrected sentence..."
          autocomplete="off" autocorrect="off" spellcheck="false"
          style="flex:1;min-width:220px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;
                 padding:8px 12px;color:var(--text);font-family:inherit;font-size:0.88rem;outline:none;"
          onfocus="this.style.borderColor='var(--accent)'"
          onblur="this.style.borderColor='var(--border)'"
        >
      </div>
      <div id="ec_${i}_fb" style="display:none;font-size:0.8rem;margin-top:6px;padding:8px 12px;border-radius:6px;line-height:1.6;"></div>
    </div>`).join('');

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;" onclick="buildHomework()">← Back</button>
      <div>
        <div style="font-size:1rem;font-weight:500;color:var(--text);">${test.title}</div>
        <div style="font-size:0.8rem;color:var(--text3);">${test.subtitle}</div>
      </div>
    </div>
    ${refBox}
    <div class="card">
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:1.25rem;">${test.instructions}</p>
      ${sentences}
    </div>
    <div class="btn-row">
      <button class="primary" onclick="checkErrorCorrection('${test.id}')">Check answers</button>
      <button class="secondary" onclick="revealAllEC('${test.id}')">Show all answers</button>
    </div>
    <div id="hw-score-box" style="display:none;" class="card"></div>`;
}

function checkErrorCorrection(testId) {
  const test = CONTENT.homeworkTests.find(t => t.id === testId);
  let correct = 0;

  test.sentences.forEach((s, i) => {
    const input = document.getElementById(`ec_${i}`);
    const fb    = document.getElementById(`ec_${i}_fb`);
    if (!input || !fb) return;

    const userAns = input.value.trim();
    const isCorrect = normalise(userAns) === normalise(s.correct);

    fb.style.display = 'block';

    if (isCorrect) {
      correct++;
      input.style.borderColor = 'var(--present)';
      input.style.color = 'var(--present)';
      fb.style.background = 'rgba(61,214,172,0.08)';
      fb.style.border = '1px solid rgba(61,214,172,0.25)';
      fb.style.color = 'var(--present)';
      fb.innerHTML = `✓ Correct!${userAns !== s.correct ? ` <span style="color:var(--text3)">(exact: <em>${s.correct}</em>)</span>` : ''}`;
    } else if (userAns === '') {
      input.style.borderColor = 'var(--accent2)';
      fb.style.background = 'rgba(255,107,107,0.06)';
      fb.style.border = '1px solid rgba(255,107,107,0.2)';
      fb.style.color = 'var(--accent2)';
      fb.innerHTML = `✗ Answer: <em>${s.correct}</em><br><span style="color:var(--text3);">${s.why}</span>`;
    } else {
      input.style.borderColor = 'var(--accent2)';
      input.style.color = 'var(--accent2)';
      fb.style.background = 'rgba(255,107,107,0.06)';
      fb.style.border = '1px solid rgba(255,107,107,0.2)';
      fb.style.color = 'var(--accent2)';
      fb.innerHTML = `✗ Correct: <em>${s.correct}</em><br><span style="color:var(--text3);">${s.why}</span>`;
    }
  });

  showHWScore(correct, test.sentences.length);
  score += correct * 6;
  updateStats();
}

function revealAllEC(testId) {
  const test = CONTENT.homeworkTests.find(t => t.id === testId);
  test.sentences.forEach((s, i) => {
    const input = document.getElementById(`ec_${i}`);
    const fb    = document.getElementById(`ec_${i}_fb`);
    if (input) {
      input.value = s.correct;
      input.style.color = 'var(--accent)';
      input.style.borderColor = 'var(--text3)';
      input.disabled = true;
    }
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(255,255,255,0.03)';
      fb.style.border = '1px solid var(--border)';
      fb.style.color = 'var(--text3)';
      fb.innerHTML = s.why;
    }
  });
}

/* ── Shared score box ── */
function showHWScore(correct, total) {
  const box = $('hw-score-box');
  if (!box) return;
  const pct = Math.round((correct / total) * 100);
  const colour = pct >= 80 ? 'var(--present)' : pct >= 50 ? 'var(--preterite)' : 'var(--accent2)';
  const msg    = pct >= 80 ? '¡Muy bien! 🎉' : pct >= 50 ? '¡Bien hecho! Keep practising.' : '¡Sigue practicando! Review the answers below.';
  box.style.display = 'block';
  box.innerHTML = `
    <div style="text-align:center;padding:0.5rem;">
      <span style="font-family:'Fraunces',serif;font-size:3rem;font-weight:600;color:${colour};display:block;line-height:1;">${pct}%</span>
      <p style="color:var(--text2);margin:0.4rem 0;">${correct} of ${total} correct — ${msg}</p>
    </div>`;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
