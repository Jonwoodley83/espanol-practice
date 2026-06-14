/* ══════════════════════════════════════════════════════════
   TENSE PRACTICE ENGINE
   Fill-in-the-blank conjugation quizzes with instant feedback.
   Data lives in data/tensepractice.js (TENSE_PRACTICE).
══════════════════════════════════════════════════════════ */

let tpState = {
  tense: null,      // e.g. 'present'
  quizIdx: null,    // index into quizzes[]
  results: {},      // itemIndex -> 'correct' | 'wrong'
  locked: {},       // itemIndex -> true once answered correctly
};

/* ── Accent-lenient comparison ── */
function tpNormalise(s) {
  return (s || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/\s+/g, ' ');
}

/* ── Entry: tense picker ── */
function buildTensePractice() {
  const el = $('screen-tensepractice');
  const tenses = Object.entries(TENSE_PRACTICE);

  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">
        Tense Practice
      </h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:560px;line-height:1.6;">
        Fill in the correct verb form. Each sentence gives you the subject and the
        infinitive — type the verb conjugated in the right tense. You get instant feedback.
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;">
      ${tenses.map(([key, t]) => `
        <button onclick="openTenseQuizzes('${key}')"
          style="text-align:left;cursor:pointer;border:1px solid ${t.colour}44;background:${t.colour}12;
                 border-radius:14px;padding:1.2rem;transition:all 0.15s;font-family:inherit;"
          onmouseover="this.style.background='${t.colour}22';this.style.transform='translateY(-2px)'"
          onmouseout="this.style.background='${t.colour}12';this.style.transform='none'">
          <div style="font-size:1.15rem;font-weight:600;color:${t.colour};margin-bottom:0.3rem;">${t.name}</div>
          <div style="font-size:0.78rem;color:var(--text2);line-height:1.5;margin-bottom:0.6rem;">${t.blurb}</div>
          <div style="font-size:0.72rem;color:var(--text3);">${t.quizzes.length} quizzes →</div>
        </button>`).join('')}
    </div>`;
}

/* ── Quiz picker for a chosen tense ── */
function openTenseQuizzes(tenseKey) {
  const el = $('screen-tensepractice');
  const t  = TENSE_PRACTICE[tenseKey];

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;">
      <button onclick="buildTensePractice()" class="opt" style="padding:6px 14px;font-size:0.8rem;flex:none;width:auto;">← Tenses</button>
      <h2 style="font-family:'Fraunces',serif;font-size:1.4rem;font-weight:600;color:${t.colour};margin:0;">
        ${t.name}
      </h2>
    </div>
    <p style="color:var(--text2);font-size:0.85rem;margin-bottom:1.25rem;">${t.blurb}</p>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px;">
      ${t.quizzes.map((q, i) => `
        <button onclick="startTenseQuiz('${tenseKey}',${i})"
          style="cursor:pointer;border:1px solid ${t.colour}44;background:${t.colour}12;border-radius:12px;
                 padding:1rem;text-align:center;font-family:inherit;transition:all 0.15s;"
          onmouseover="this.style.background='${t.colour}22'"
          onmouseout="this.style.background='${t.colour}12'">
          <div style="font-size:1.4rem;margin-bottom:0.2rem;">📝</div>
          <div style="font-weight:600;color:${t.colour};font-size:0.92rem;">${q.title}</div>
          <div style="font-size:0.72rem;color:var(--text3);margin-top:0.2rem;">${q.items.length} questions</div>
        </button>`).join('')}
    </div>`;
}

/* ── Start a quiz ── */
function startTenseQuiz(tenseKey, quizIdx) {
  tpState = { tense: tenseKey, quizIdx, results: {}, locked: {} };
  renderTenseQuiz();
}

function renderTenseQuiz() {
  const el   = $('screen-tensepractice');
  const t    = TENSE_PRACTICE[tpState.tense];
  const quiz = t.quizzes[tpState.quizIdx];
  const done = Object.keys(tpState.locked).length;
  const totalItems = quiz.items.length;
  const pct  = Math.round((done / totalItems) * 100);

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;flex-wrap:wrap;">
      <button onclick="openTenseQuizzes('${tpState.tense}')" class="opt" style="padding:6px 14px;font-size:0.8rem;flex:none;width:auto;">← Quizzes</button>
      <h2 style="font-family:'Fraunces',serif;font-size:1.3rem;font-weight:600;color:${t.colour};margin:0;">
        ${t.name} — ${quiz.title}
      </h2>
    </div>

    <div style="font-size:0.8rem;color:var(--text2);margin-bottom:0.5rem;">
      Type the verb in brackets, conjugated in the <strong style="color:${t.colour}">${t.name.toLowerCase()}</strong> tense for the subject shown. Accents are checked but I'll let you know if you miss one.
    </div>

    <!-- progress -->
    <div style="height:8px;background:var(--bg3);border-radius:99px;overflow:hidden;margin-bottom:1.25rem;">
      <div id="tp-progress" style="height:100%;width:${pct}%;background:${t.colour};transition:width 0.3s;"></div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;">
      ${quiz.items.map((it, i) => renderTPItem(it, i, t.colour)).join('')}
    </div>

    <div id="tp-summary" style="margin-top:1.5rem;"></div>`;

  updateTPProgress();
}

function renderTPItem(it, i, colour) {
  const locked = tpState.locked[i];
  const result = tpState.results[i];
  const borderColour = locked ? colour : (result === 'wrong' ? 'var(--bad)' : 'var(--border)');

  return `
    <div id="tp-row-${i}" style="background:var(--bg2);border:1px solid ${borderColour};border-radius:12px;padding:0.9rem 1rem;transition:border-color 0.2s;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.95rem;line-height:1.7;">
        <span style="color:var(--text3);font-size:0.8rem;min-width:1.4rem;">${i + 1}.</span>
        <span style="color:var(--text);">${it.pre}</span>
        <span style="color:var(--text3);font-size:0.82rem;">(${it.subj})</span>
        ${locked
          ? `<span style="color:${colour};font-weight:600;padding:0 0.3rem;">${it.answer}</span>`
          : `<input id="tp-in-${i}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
                placeholder="${it.inf}"
                onkeydown="if(event.key==='Enter')checkTPItem(${i})"
                style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.35rem 0.6rem;
                       color:var(--text);font-family:inherit;font-size:0.95rem;width:9rem;outline:none;"
                onfocus="this.style.borderColor='${colour}'"
                onblur="this.style.borderColor='var(--border)'">`}
        <span style="color:var(--text);">${it.post}</span>
        ${locked ? `<span style="color:${colour};margin-left:auto;font-size:1.1rem;">✓</span>` : ''}
      </div>
      <div id="tp-fb-${i}" style="margin-top:0.5rem;"></div>
    </div>`;
}

/* ── Check a single blank ── */
function checkTPItem(i) {
  if (tpState.locked[i]) return;
  const t    = TENSE_PRACTICE[tpState.tense];
  const quiz = t.quizzes[tpState.quizIdx];
  const it   = quiz.items[i];
  const input = document.getElementById(`tp-in-${i}`);
  if (!input) return;

  const raw     = input.value;
  const guess   = tpNormalise(raw);
  const answer  = tpNormalise(it.answer);
  const fb      = document.getElementById(`tp-fb-${i}`);
  const row     = document.getElementById(`tp-row-${i}`);

  if (!guess) { return; }

  if (guess === answer) {
    // Correct (accent-lenient). Check for exact match incl. accents.
    const exact = raw.trim().toLowerCase() === it.answer.toLowerCase();
    tpState.locked[i]  = true;
    tpState.results[i] = 'correct';

    if (!exact) {
      // Right but missing/wrong accent — show gentle note, still correct
      fb.innerHTML = `<span style="color:${t.colour};font-size:0.8rem;">✓ Correct! Watch the accent: <strong>${it.answer}</strong></span>`;
    } else {
      fb.innerHTML = `<span style="color:${t.colour};font-size:0.8rem;">✓ ¡Correcto!</span>`;
    }
    // Re-render the row to its locked state but keep feedback
    const savedFb = fb.innerHTML;
    row.outerHTML = renderTPItem(it, i, t.colour);
    const newFb = document.getElementById(`tp-fb-${i}`);
    if (newFb) newFb.innerHTML = savedFb;

    addScore(10);
    updateStats();
  } else {
    tpState.results[i] = 'wrong';
    row.style.borderColor = 'var(--bad)';
    input.style.borderColor = 'var(--bad)';
    fb.innerHTML = `<span style="color:var(--bad);font-size:0.8rem;">✗ Not quite — try again.</span>`;
  }
  updateTPProgress();
}

/* ── Progress + completion ── */
function updateTPProgress() {
  const t     = TENSE_PRACTICE[tpState.tense];
  const quiz  = t.quizzes[tpState.quizIdx];
  const total = quiz.items.length;
  const done  = Object.keys(tpState.locked).length;
  const bar   = document.getElementById('tp-progress');
  if (bar) bar.style.width = Math.round((done / total) * 100) + '%';

  if (done === total) {
    const wrongCount = Object.values(tpState.results).filter(r => r === 'wrong').length;
    const summary = document.getElementById('tp-summary');
    if (summary) {
      summary.innerHTML = `
        <div style="background:${t.colour}18;border:1px solid ${t.colour}55;border-radius:14px;padding:1.25rem;text-align:center;">
          <div style="font-size:1.8rem;margin-bottom:0.3rem;">🎉</div>
          <div style="font-family:'Fraunces',serif;font-size:1.2rem;font-weight:600;color:${t.colour};margin-bottom:0.3rem;">
            ¡Quiz completado!
          </div>
          <div style="font-size:0.85rem;color:var(--text2);margin-bottom:1rem;">
            All ${total} sentences correct.${wrongCount ? ` You had ${wrongCount} wrong attempt${wrongCount>1?'s':''} along the way — keep practising!` : ' First try on every one — perfect!'}
          </div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            ${nextQuizButton(t)}
            <button onclick="openTenseQuizzes('${tpState.tense}')" class="opt" style="width:auto;padding:0.6rem 1.2rem;">Choose another quiz</button>
          </div>
        </div>`;
      summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function nextQuizButton(t) {
  const nextIdx = tpState.quizIdx + 1;
  if (nextIdx < t.quizzes.length) {
    return `<button onclick="startTenseQuiz('${tpState.tense}',${nextIdx})" class="primary" style="width:auto;padding:0.6rem 1.2rem;">Next quiz →</button>`;
  }
  return '';
}
