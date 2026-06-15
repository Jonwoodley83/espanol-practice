/* ── State ── */
let score = 0, streak = 0, correct = 0, total = 0;
let difficulty = 'easy';
let conjLevel  = 'easy'; // conjugation drill level (separate from question style difficulty)
let currentMode = 'home';

/* ── Utilities ── */
const rand    = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const $       = id  => document.getElementById(id);

function updateStats() {
  $('s-pts').textContent = score;
  $('s-str').textContent = streak;
  $('s-cor').textContent = correct;
  $('s-tot').textContent = total;
  const sb = $('streak-badge');
  if (streak >= 3) { sb.textContent = `🔥 ${streak} streak!`; sb.classList.add('show'); }
  else sb.classList.remove('show');
}

function addScore(pts) {
  const bonus = streak > 2 ? streak * 2 : 0;
  score += pts + bonus; correct++; streak++;
  return pts + bonus;
}

function loseStreak() { streak = 0; }

/* ── Dropdown nav ── */
function openDD(id) {
  document.getElementById(id).classList.add('open');
}
function closeDD(id) {
  document.getElementById(id).classList.remove('open');
}
function keepDD(id) {
  document.getElementById(id).classList.add('open');
}

/* ── Navigation ── */
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-mode]').forEach(b => b.classList.remove('active'));
  const screen = $('screen-' + mode);
  if (screen) screen.classList.add('active');
  const btn = document.querySelector(`.nav-btn[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');

  if      (mode === 'conjugation') buildConjugation();
  else if (mode === 'tense')       buildTense();
  else if (mode === 'tensepractice') buildTensePractice();
  else if (mode === 'builder')     buildBuilder();
  else if (mode === 'story')       buildStory();
  else if (mode === 'homework')    buildHomework();
  else if (mode === 'reference')   buildReference();
  else if (mode === 'conjguide')   buildConjGuide();
  else if (mode === 'verbhunt')    buildVerbHunt();
  else if (mode === 'topics')      buildTopics();
  else if (mode === 'vocabtests')  buildVocabTests();
  else if (mode === 'describe')    buildDescribe();
  else if (mode === 'aihomework') buildAIHomework();
  else if (mode === 'account')     buildAccount();
  updateStats();
}

function setDiff(d) {
  difficulty = d;
  document.querySelectorAll('.diff-btn').forEach(b => {
    b.className = 'diff-btn';
    if (b.dataset.diff === d) b.classList.add('d-' + d);
  });
  if (currentMode !== 'home') {
    if (currentMode === 'conjugation') buildConjugation();
    else if (currentMode === 'tense')  buildTense();
    else if (currentMode === 'builder') buildBuilder();
    else if (currentMode === 'story')   buildStory();
  }
}

/* ── Shared render helpers ── */
function tenseBadge(tense) {
  const g = CONTENT.grammar[tense];
  if (!g) return '';
  return `<span class="badge" style="background:${g.colour}18;color:${g.colour};border:1px solid ${g.colour}44;">${g.name}</span>`;
}

function diffBadge() {
  const labels = { easy:'Easy', medium:'Medium', hard:'Hard' };
  return `<span class="badge badge-${difficulty}">${labels[difficulty]}</span>`;
}

// Conjugation level → which tenses are available
const CONJ_LEVELS = {
  easy:   { label:'🟢 Easy',   desc:'Present tense only',                          tenses:['present'] },
  medium: { label:'🟠 Medium', desc:'Present + Preterite',                          tenses:['present','preterite'] },
  hard:   { label:'🔴 Hard',   desc:'Present, Preterite, Future + Imperfect',       tenses:['present','preterite','future','imperfect'] },
  expert: { label:'⭐ Expert', desc:'All 8 tenses',                                 tenses:['present','preterite','future','imperfect','perfect','conditional','subjunctive','pluperfect'] },
};

function buildExplanation(tense, verbKey, subjectIdx) {
  const g    = CONTENT.grammar[tense];
  if (!g) return '';
  const verb = CONTENT.verbs[verbKey];
  const subj = CONTENT.subjects[subjectIdx];
  const ans  = verb[tense] ? verb[tense][subjectIdx] : '—';
  const isIrregular = CONTENT.irregulars.includes(verbKey);

  let endingNote = '';
  if (tense === 'present') {
    const type = verbKey.endsWith('ar') ? 'ar' : verbKey.endsWith('er') ? 'er' : 'ir';
    const e = g.endings[type]?.[subjectIdx] || '';
    endingNote = `<em>${verbKey}</em> is an <strong>–${type}</strong> verb. For <strong>${subj}</strong>, add <strong>${e}</strong> to the stem.`;
  } else if (tense === 'preterite') {
    if (isIrregular) {
      endingNote = `<strong>${verbKey}</strong> is <strong>irregular in the preterite</strong> — the stem changes completely. <strong>"${ans}"</strong> must be memorised.`;
    } else {
      const type = verbKey.endsWith('ar') ? 'ar' : 'er_ir';
      const e = g.endings[type]?.[subjectIdx] || '';
      endingNote = `<em>${verbKey}</em> is regular in the preterite. For <strong>${subj}</strong>, use ending <strong>${e}</strong>.`;
    }
  } else if (tense === 'future') {
    const e = g.endings.all?.[subjectIdx] || '';
    const stems = { hacer:'har', tener:'tendr', querer:'querr', poder:'podr', saber:'sabr', venir:'vendr', decir:'dir', poner:'pondr' };
    const stem = stems[verbKey];
    endingNote = stem
      ? `<strong>${verbKey}</strong> has an irregular future stem: <strong>${stem}–</strong>. Add <strong>${e}</strong> for ${subj} → <strong>${ans}</strong>.`
      : `Future = full infinitive + ending. <em>${verbKey}</em> + <strong>${e}</strong> → <strong>${ans}</strong>.`;
  } else if (tense === 'imperfect') {
    const type = verbKey.endsWith('ar') ? 'ar' : 'er_ir';
    const e = g.endings[type]?.[subjectIdx] || '';
    const irregulars3 = ['ser','ir','ver'];
    endingNote = irregulars3.includes(verbKey)
      ? `<strong>${verbKey}</strong> is one of only 3 irregular imperfect verbs. <strong>"${ans}"</strong> must be memorised.`
      : `<em>${verbKey}</em> is regular in the imperfect. For <strong>${subj}</strong>, add <strong>${e}</strong>.`;
  } else if (tense === 'perfect') {
    const haver = g.endings.haver?.[subjectIdx] || '';
    const partType = verbKey.endsWith('ar') ? g.endings.ar : g.endings.er_ir;
    endingNote = `Perfect = <strong>${haver}</strong> (haber) + past participle. <em>${verbKey}</em> → <strong>${ans}</strong>.`;
  } else if (tense === 'conditional') {
    const e = g.endings.all?.[subjectIdx] || '';
    const stems = { hacer:'har', tener:'tendr', querer:'querr', poder:'podr', saber:'sabr', venir:'vendr', decir:'dir', poner:'pondr', salir:'saldr' };
    const stem = stems[verbKey];
    endingNote = stem
      ? `<strong>${verbKey}</strong> has irregular conditional stem: <strong>${stem}–</strong> + <strong>${e}</strong> → <strong>${ans}</strong>.`
      : `Conditional = full infinitive + ending. <em>${verbKey}</em> + <strong>${e}</strong> → <strong>${ans}</strong>.`;
  } else if (tense === 'subjunctive') {
    const type = verbKey.endsWith('ar') ? 'ar' : 'er_ir';
    const e = g.endings[type]?.[subjectIdx] || '';
    endingNote = `Subjunctive: take yo present, drop –o, add "opposite" endings. For <strong>${subj}</strong>: <strong>${e}</strong> → <strong>${ans}</strong>.`;
  } else if (tense === 'pluperfect') {
    const haver = g.endings.haver?.[subjectIdx] || '';
    endingNote = `Pluperfect = <strong>${haver}</strong> (haber imperfect) + past participle. <em>${verbKey}</em> → <strong>${ans}</strong>.`;
  }

  const rows = CONTENT.subjects.map((s, i) =>
    `<tr><td>${s}</td><td${i === subjectIdx ? ' class="hl"' : ''}>${verb[tense]?.[i] || '—'}</td></tr>`
  ).join('');

  return `<div class="explanation">
    <strong style="color:${g.colour};">${g.name}</strong> — ${g.rule}<br>
    ${endingNote}<br>
    <span style="color:var(--text3);font-size:0.78rem;">Signal words: ${g.signals.slice(0,4).join(', ')}…</span>
    <table class="conj-table" style="margin-top:10px;">
      <tr><td colspan="2" style="color:var(--text2);font-weight:500;">${verbKey} — ${g.name}</td></tr>
      ${rows}
    </table>
  </div>`;
}

/* ══════════════════════════════════
   MODE 1 — CONJUGATION DRILL
   Levels control which tenses appear.
   Question style (pick form / pick subject / pick tense)
   is now always shown together based on level.
══════════════════════════════════ */
let conjLocked = false;

function setConjLevel(level) {
  conjLevel = level;
  buildConjugation();
}

function buildConjugation() {
  conjLocked = false;
  const levelCfg   = CONJ_LEVELS[conjLevel];
  const verbKeys   = Object.keys(CONTENT.verbs);
  const vk         = rand(verbKeys);
  const verb       = CONTENT.verbs[vk];

  // Only use tenses that this verb actually has data for
  const availableTenses = levelCfg.tenses.filter(t => verb[t]);
  const tense      = rand(availableTenses.length ? availableTenses : ['present','preterite','future']);
  const subjectIdx = Math.floor(Math.random() * 6);
  const subject    = CONTENT.subjects[subjectIdx];
  const answer     = verb[tense]?.[subjectIdx] || '';

  // Question style: easy/medium/hard question style (keep existing diff for question type)
  let qText, qSub, options, correctAnswer;

  if (difficulty === 'easy') {
    qText = `Conjugate <strong>${vk}</strong> <em>(${verb.en})</em> for <strong>${subject}</strong>`;
    qSub  = `${CONTENT.grammar[tense].name} tense — pick the correct form`;
    let wrongs = [];
    while (wrongs.length < 3) {
      const w = verb[tense]?.[Math.floor(Math.random() * 6)] || '';
      if (w !== answer && !wrongs.includes(w)) wrongs.push(w);
    }
    options       = shuffle([answer, ...wrongs]);
    correctAnswer = answer;

  } else if (difficulty === 'medium') {
    qText = `<strong>"${answer}"</strong> is a form of <em>${vk}</em> (${verb.en})`;
    qSub  = `${CONTENT.grammar[tense].name} — which subject does this belong to?`;
    const wrongSubjs = shuffle(CONTENT.subjects.filter((_, i) => i !== subjectIdx)).slice(0, 3);
    options       = shuffle([subject, ...wrongSubjs]);
    correctAnswer = subject;

  } else {
    qText = `<strong>"${answer}"</strong> — verb: <em>${vk}</em>, subject: <strong>${subject}</strong>`;
    qSub  = `Which tense is this form?`;
    // Only show tenses available at this level
    options       = shuffle(availableTenses).map(t => CONTENT.grammar[t].name);
    correctAnswer = CONTENT.grammar[tense].name;
  }

  const levelBar = Object.entries(CONJ_LEVELS).map(([key, cfg]) => `
    <button onclick="setConjLevel('${key}')"
      style="padding:5px 13px;font-family:inherit;font-size:0.78rem;cursor:pointer;border-radius:20px;
             border:1px solid ${conjLevel===key?'var(--accent)':'var(--border)'};
             background:${conjLevel===key?'rgba(232,168,56,0.15)':'transparent'};
             color:${conjLevel===key?'var(--accent)':'var(--text3)'};
             font-weight:${conjLevel===key?'500':'400'};white-space:nowrap;transition:all 0.15s;">
      ${cfg.label}
    </button>`).join('');

  const el = $('screen-conjugation');
  el.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:1.25rem;">
      <span style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Level</span>
      ${levelBar}
    </div>
    <div class="diff-bar">
      <span class="diff-label">Question style</span>
      <button class="diff-btn ${difficulty==='easy'?'d-easy':''}"    data-diff="easy"   onclick="setDiff('easy')">Pick the form</button>
      <button class="diff-btn ${difficulty==='medium'?'d-medium':''}" data-diff="medium" onclick="setDiff('medium')">Pick the subject</button>
      <button class="diff-btn ${difficulty==='hard'?'d-hard':''}"    data-diff="hard"   onclick="setDiff('hard')">Pick the tense</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label">Conjugation drill — ${levelCfg.label}</span>
        <div style="display:flex;gap:6px;">${tenseBadge(tense)}</div>
      </div>
      <div style="font-size:0.78rem;color:var(--text3);margin-bottom:1rem;">
        ${levelCfg.desc}
        ${conjLevel==='expert'?'<span style="color:var(--accent);margin-left:6px;">All tenses active</span>':''}
      </div>
      <div class="q-text">${qText}</div>
      <div class="q-sub">${qSub}</div>
      <div class="options${difficulty==='hard'&&options.length>2?' cols3':''}" id="conj-opts">
        ${options.map(o => {
          const safeO  = o.replace(/'/g,"\\'");
          const safeCA = correctAnswer.replace(/'/g,"\\'");
          return `<button class="opt" onclick="checkConj(this,'${safeO}','${safeCA}','${vk}','${tense}','${subjectIdx}')">${o}</button>`;
        }).join('')}
      </div>
      <div class="feedback" id="conj-fb"></div>
      <div class="btn-row" id="conj-btns" style="display:none;">
        <button class="primary" onclick="buildConjugation()">Next question →</button>
        <button class="secondary" onclick="switchMode('conjguide')">View guide</button>
      </div>
    </div>`;
}

function checkConj(btn, chosen, answer, vk, tense, subjectIdx) {
  if (conjLocked) return;
  conjLocked = true;
  document.querySelectorAll('#conj-opts .opt').forEach(b => b.disabled = true);
  const fb  = $('conj-fb');
  const pts = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 22;
  total++;

  if (chosen === answer) {
    btn.classList.add('correct');
    const earned = addScore(pts);
    fb.innerHTML = `<strong>Correct!</strong> +${earned} points${streak > 3 ? ` (including ${(streak-1)*2} streak bonus)` : ''}`;
    fb.className = 'feedback show ok';
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('#conj-opts .opt').forEach(b => {
      if (b.textContent.trim() === answer) b.classList.add('correct');
    });
    loseStreak();
    fb.innerHTML = `<strong>Not quite</strong> — the answer is <strong>${answer}</strong>`;
    fb.className = 'feedback show bad';
  }

  fb.innerHTML += buildExplanation(tense, vk, parseInt(subjectIdx));
  $('conj-btns').style.display = 'flex';
  updateStats();
}

/* ══════════════════════════════════
   MODE 2 — TENSE SPOTTER
══════════════════════════════════ */
let tensePool = [], tenseIdx = 0, tenseLocked = false;
let tenseFilter = { present:true, preterite:true, imperfect:true, perfect:true, future:true, conditional:true, subjunctive:true, pluperfect:true };

function toggleTenseFilter(t) {
  // Don't allow deselecting all
  const active = Object.values(tenseFilter).filter(Boolean).length;
  if (active === 1 && tenseFilter[t]) return;
  tenseFilter[t] = !tenseFilter[t];
  // Reset pool so it respects new filter
  tensePool = [];
  buildTense();
}

function buildTense() {
  tenseLocked = false;
  const activeTenses = Object.keys(tenseFilter).filter(t => tenseFilter[t]);

  // Filter question pool to only include questions matching active tenses
  const filtered = CONTENT.tenseQuestions.filter(q => activeTenses.includes(q.answer));
  if (!tensePool.length || !tensePool.some(q => activeTenses.includes(q.answer))) {
    tensePool = shuffle(filtered);
    tenseIdx  = 0;
  }
  // Safety — if somehow pool is empty reset it
  if (!tensePool.length) tensePool = shuffle(filtered.length ? filtered : CONTENT.tenseQuestions);
  const q = tensePool[tenseIdx % tensePool.length]; tenseIdx++;

  const hideEnglish = difficulty === 'hard';
  const el = $('screen-tense');

  const tenseCheckboxes = Object.keys(CONTENT.grammar).map(t => {
    const active = tenseFilter[t];
    const g      = CONTENT.grammar[t];
    return `<label style="display:flex;align-items:center;gap:5px;cursor:pointer;user-select:none;
                           padding:4px 10px;border-radius:20px;font-size:0.78rem;
                           border:1px solid ${active?g.colour+'66':'var(--border)'};
                           background:${active?g.colour+'18':'transparent'};
                           color:${active?g.colour:'var(--text3)'};
                           transition:all 0.15s;"
              onclick="toggleTenseFilter('${t}')">
        <span style="width:12px;height:12px;border-radius:2px;border:1.5px solid ${active?g.colour:'var(--border)'};
                     background:${active?g.colour:'transparent'};display:inline-flex;
                     align-items:center;justify-content:center;font-size:8px;color:#0f0e17;flex-shrink:0;">
          ${active?'✓':''}
        </span>
        ${g.name}
      </label>`;
  }).join('');

  el.innerHTML = `
    <div class="diff-bar">
      <span class="diff-label">Difficulty</span>
      <button class="diff-btn ${difficulty==='easy'?'d-easy':''}"   data-diff="easy"   onclick="setDiff('easy')">Easy</button>
      <button class="diff-btn ${difficulty==='medium'?'d-medium':''}" data-diff="medium" onclick="setDiff('medium')">Medium</button>
      <button class="diff-btn ${difficulty==='hard'?'d-hard':''}"   data-diff="hard"   onclick="setDiff('hard')">Hard</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label">Tense spotter</span>
        ${diffBadge()}
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:1rem;">
        <span style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-right:4px;">Practice:</span>
        ${tenseCheckboxes}
      </div>
      ${hideEnglish ? '<div class="hard-notice">Hard mode — no English translation. Identify the tense from Spanish only.</div>' : ''}
      <div class="q-text" style="font-style:italic;">"${q.es}"</div>
      ${!hideEnglish ? `<div class="q-sub">${q.en}</div>` : '<div class="q-sub">What tense is the main verb?</div>'}
      <div class="options${activeTenses.length===1?'':' cols3'}" id="tense-opts">
        ${activeTenses.map(t =>
          `<button class="opt" onclick="checkTense(this,'${t}','${q.answer}',${JSON.stringify(q.why).replace(/"/g,'&quot;')})">${CONTENT.grammar[t].name}</button>`
        ).join('')}
      </div>
      <div class="feedback" id="tense-fb"></div>
      <div class="btn-row" id="tense-btns" style="display:none;">
        <button class="primary" onclick="buildTense()">Next sentence →</button>
      </div>
    </div>`;
}

function checkTense(btn, chosen, answer, why) {
  if (tenseLocked) return;
  tenseLocked = true;
  document.querySelectorAll('#tense-opts .opt').forEach(b => b.disabled = true);
  const fb  = $('tense-fb');
  const pts = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 14 : 20;
  total++;

  if (chosen === answer) {
    btn.classList.add('correct');
    const earned = addScore(pts);
    fb.innerHTML = `<strong>Correct!</strong> +${earned} points`;
    fb.className = 'feedback show ok';
  } else {
    document.querySelectorAll('#tense-opts .opt').forEach(b => {
      if (b.textContent === CONTENT.grammar[answer].name) b.classList.add('correct');
    });
    btn.classList.add('wrong');
    loseStreak();
    fb.innerHTML = `<strong>Not quite</strong> — it's the <strong>${CONTENT.grammar[answer].name}</strong>`;
    fb.className = 'feedback show bad';
  }
  fb.innerHTML += `<div class="explanation"><strong>Why?</strong> ${why}</div>`;
  $('tense-btns').style.display = 'flex';
  updateStats();
}

/* ══════════════════════════════════
   MODE 3 — SENTENCE BUILDER
══════════════════════════════════ */
let builderQ = null, placedTiles = [], remainingTiles = [], builderChecked = false;

function buildBuilder() {
  builderChecked = false;
  builderQ       = rand(CONTENT.builderSentences);
  placedTiles    = [];
  remainingTiles = shuffle(builderQ.parts);
  renderBuilder();
}

function renderBuilder() {
  const el = $('screen-builder');
  const tenseKey = builderQ.tense === 'preterite' ? 'past' : builderQ.tense;
  const hideHint = difficulty === 'hard';

  el.innerHTML = `
    <div class="diff-bar">
      <span class="diff-label">Difficulty</span>
      <button class="diff-btn ${difficulty==='easy'?'d-easy':''}"   data-diff="easy"   onclick="setDiff('easy')">Easy</button>
      <button class="diff-btn ${difficulty==='medium'?'d-medium':''}" data-diff="medium" onclick="setDiff('medium')">Medium</button>
      <button class="diff-btn ${difficulty==='hard'?'d-hard':''}"   data-diff="hard"   onclick="setDiff('hard')">Hard</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label">Sentence builder</span>
        <div style="display:flex;gap:6px;">${tenseBadge(builderQ.tense)}${diffBadge()}</div>
      </div>
      ${hideHint ? '<div class="hard-notice">Hard mode — no English translation. Build from the tiles alone.</div>' : ''}
      ${!hideHint ? `<div class="q-sub" style="margin-bottom:1rem;">Build: <em>"${builderQ.translation}"</em></div>` : '<div class="q-sub" style="margin-bottom:1rem;">Arrange the tiles into the correct Spanish sentence</div>'}
      <div style="font-size:0.75rem;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Your sentence</div>
      <div class="tile-zone" id="placed-zone">
        ${placedTiles.map((t,i) => `<div class="tile placed" onclick="removeTile(${i})">${t}</div>`).join('')}
        ${placedTiles.length === 0 ? '<span class="empty-hint">Click tiles below to build…</span>' : ''}
      </div>
      <div style="font-size:0.75rem;color:var(--text3);margin-bottom:6px;margin-top:0.5rem;text-transform:uppercase;letter-spacing:0.05em;">Tiles</div>
      <div class="tile-zone" id="remaining-zone">
        ${remainingTiles.map((t,i) => `<div class="tile" onclick="placeTile(${i})">${t}</div>`).join('')}
      </div>
      <div class="feedback" id="builder-fb"></div>
      <div class="btn-row">
        <button class="primary" onclick="checkBuilder()">Check answer</button>
        <button class="secondary" onclick="buildBuilder()">New sentence</button>
      </div>
    </div>`;
}

function placeTile(i)  { placedTiles.push(remainingTiles[i]); remainingTiles.splice(i,1); renderBuilder(); }
function removeTile(i) { remainingTiles.push(placedTiles[i]); placedTiles.splice(i,1);   renderBuilder(); }

function checkBuilder() {
  if (builderChecked) return;
  builderChecked = true;
  const attempt = placedTiles.join(' ');
  const fb  = $('builder-fb');
  const pts = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 18 : 25;
  total++;

  if (attempt === builderQ.answer) {
    const earned = addScore(pts);
    fb.innerHTML = `<strong>Perfect sentence!</strong> +${earned} points`;
    fb.className = 'feedback show ok';
  } else {
    loseStreak();
    fb.innerHTML = `<strong>Not quite.</strong> Correct order: <em>"${builderQ.answer}"</em>`;
    fb.className = 'feedback show bad';
  }
  fb.innerHTML += `<div class="explanation"><strong>Breakdown:</strong> ${builderQ.why}</div>`;
  updateStats();
}

/* ══════════════════════════════════
   MODE 4 — MINI STORY
══════════════════════════════════ */
let storyState = { storyIdx: 0, segIdx: 0, correct: 0, locked: false };

function buildStory() {
  storyState = { storyIdx: 0, segIdx: 0, correct: 0, locked: false };
  renderStoryPicker();
}

function renderStoryPicker() {
  const el = $('screen-story');
  el.innerHTML = `
    <div class="diff-bar">
      <span class="diff-label">Difficulty</span>
      <button class="diff-btn ${difficulty==='easy'?'d-easy':''}"   data-diff="easy"   onclick="setDiff('easy')">Easy</button>
      <button class="diff-btn ${difficulty==='medium'?'d-medium':''}" data-diff="medium" onclick="setDiff('medium')">Medium</button>
      <button class="diff-btn ${difficulty==='hard'?'d-hard':''}"   data-diff="hard"   onclick="setDiff('hard')">Hard</button>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-label">Mini story</span>${diffBadge()}</div>
      <div class="q-text" style="margin-bottom:1rem;">Choose a story</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${CONTENT.stories.map((s, i) => `
          <button class="secondary" style="text-align:left;padding:1rem;" onclick="startStory(${i})">
            <div style="font-weight:500;color:var(--text);margin-bottom:4px;">${s.title}</div>
            <div style="font-size:0.8rem;color:var(--text3);">${s.intro} · ${s.segments.length} questions</div>
          </button>`).join('')}
      </div>
    </div>`;
}

function startStory(idx) {
  storyState = { storyIdx: idx, segIdx: 0, correct: 0, locked: false };
  renderStory();
}

function renderStory() {
  const story = CONTENT.stories[storyState.storyIdx];
  const seg   = story.segments[storyState.segIdx];
  const pct   = Math.round((storyState.segIdx / story.segments.length) * 100);
  const hideEn = difficulty === 'hard';

  const prevSegments = story.segments.slice(0, storyState.segIdx).map(s =>
    s.es.replace('___', `<span class="filled">${s.answer}</span>`)
  ).join(' ');

  const el = $('screen-story');
  el.innerHTML = `
    <div class="diff-bar">
      <span class="diff-label">Difficulty</span>
      <button class="diff-btn ${difficulty==='easy'?'d-easy':''}"   data-diff="easy"   onclick="setDiff('easy')">Easy</button>
      <button class="diff-btn ${difficulty==='medium'?'d-medium':''}" data-diff="medium" onclick="setDiff('medium')">Medium</button>
      <button class="diff-btn ${difficulty==='hard'?'d-hard':''}"   data-diff="hard"   onclick="setDiff('hard')">Hard</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-label">${story.title}</span>
        <div style="display:flex;gap:6px;"><span style="font-size:0.78rem;color:var(--text3);">${storyState.segIdx+1} / ${story.segments.length}</span>${diffBadge()}</div>
      </div>
      <div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
      ${hideEn ? '<div class="hard-notice">Hard mode — no English translation shown.</div>' : ''}
      ${prevSegments ? `<div class="story-prev">${prevSegments}</div>` : ''}
      <div class="story-text">${seg.es.replace('___', '<span class="story-blank" id="story-blank">___</span>')}</div>
      ${!hideEn ? `<div class="q-sub" style="font-style:italic;margin-bottom:1rem;">${seg.en}</div>` : ''}
      <div class="story-choices" id="story-opts">
        ${seg.opts.map(o =>
          `<button class="opt" onclick="checkStory(this,'${o}','${seg.answer}',${JSON.stringify(seg.why).replace(/"/g,'&quot;')})">${o}</button>`
        ).join('')}
      </div>
      <div class="feedback" id="story-fb"></div>
    </div>`;
}

function checkStory(btn, chosen, answer, why) {
  if (storyState.locked) return;
  storyState.locked = true;
  document.querySelectorAll('#story-opts .opt').forEach(b => b.disabled = true);

  const fb    = $('story-fb');
  const blank = $('story-blank');
  const pts   = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 16 : 22;
  total++;

  if (chosen === answer) {
    btn.classList.add('correct');
    const earned = addScore(pts);
    blank.textContent = answer;
    blank.style.color = 'var(--present)';
    fb.innerHTML = `<strong>Correct!</strong> +${earned} points`;
    fb.className = 'feedback show ok';
    storyState.correct++;
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('#story-opts .opt').forEach(b => {
      if (b.textContent === answer) b.classList.add('correct');
    });
    loseStreak();
    blank.textContent = answer;
    blank.style.color = 'var(--accent2)';
    fb.innerHTML = `<strong>Not quite</strong> — <strong>${answer}</strong> is correct`;
    fb.className = 'feedback show bad';
  }

  fb.innerHTML += `<div class="explanation"><strong>Why ${answer}?</strong> ${why}</div>`;

  // Add continue button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'primary';
  nextBtn.style.marginTop = '10px';
  storyState.segIdx++;

  if (storyState.segIdx < CONTENT.stories[storyState.storyIdx].segments.length) {
    nextBtn.textContent = 'Continue →';
    nextBtn.onclick     = () => { storyState.locked = false; renderStory(); };
  } else {
    nextBtn.textContent = 'See results';
    nextBtn.onclick     = showStoryResult;
  }
  fb.appendChild(nextBtn);
  updateStats();
}

function showStoryResult() {
  const story = CONTENT.stories[storyState.storyIdx];
  const pct   = Math.round((storyState.correct / story.segments.length) * 100);
  const el    = $('screen-story');
  el.innerHTML = `
    <div class="card result-card">
      <span class="big-num">${pct}%</span>
      <p>${storyState.correct} of ${story.segments.length} correct in <em>${story.title}</em></p>
      <div class="btn-row" style="justify-content:center;">
        <button class="primary" onclick="startStory(${storyState.storyIdx})">Try again</button>
        <button class="secondary" onclick="renderStoryPicker()">Choose another story</button>
      </div>
    </div>`;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  updateStats();
  // diff buttons initial state
  document.querySelector(`.diff-btn[data-diff="easy"]`) && setDiff('easy');
});
