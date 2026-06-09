/* ══════════════════════════════════════════════════════════
   CONJUGATION GUIDE
   A visual reference for how conjugation works across
   all tenses — what the endings look like, how to form
   each tense, and the key irregular verbs to know.
══════════════════════════════════════════════════════════ */

const SUBJECTS_CG = ['yo','tú','él/ella','nosotros','vosotros','ellos/ellas'];

// Demo verbs for each tense — one regular, one irregular
const DEMO_VERBS = {
  present:     { regular:'hablar',  irregular:'tener' },
  preterite:   { regular:'hablar',  irregular:'ir' },
  imperfect:   { regular:'hablar',  irregular:'ser' },
  perfect:     { regular:'hablar',  irregular:'hacer' },
  future:      { regular:'hablar',  irregular:'tener' },
  conditional: { regular:'hablar',  irregular:'hacer' },
  subjunctive: { regular:'hablar',  irregular:'tener' },
  pluperfect:  { regular:'hablar',  irregular:'hacer' },
};

function buildConjGuide() {
  const el = $('screen-conjguide');

  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">
        Conjugation Guide
      </h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:580px;line-height:1.6;">
        How Spanish verbs change depending on <strong>who</strong> is doing the action and <strong>when</strong>.
        Each tense has its own set of endings — learn the pattern and you can conjugate almost any verb.
      </p>
    </div>

    ${renderConjIntro()}
    ${renderEndingsSummary()}
    ${Object.keys(CONTENT.grammar).map(tense => renderConjTenseSection(tense)).join('')}
    ${renderIrregularHighlights()}
  `;
}

/* ── Intro: what is conjugation ── */
function renderConjIntro() {
  return `
    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="card-label">What is conjugation?</span>
      </div>
      <p style="font-size:0.88rem;color:var(--text2);line-height:1.7;margin-bottom:1rem;">
        In Spanish, verbs change their ending depending on <strong style="color:var(--text);">who</strong> is doing the action (the subject)
        and <strong style="color:var(--text);">when</strong> it happens (the tense).
        The base form of the verb is called the <strong style="color:var(--accent);">infinitive</strong> — it always ends in
        <strong style="color:var(--accent);">–ar</strong>, <strong style="color:var(--accent);">–er</strong>, or <strong style="color:var(--accent);">–ir</strong>.
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:1rem;">
        ${[
          { type:'–ar', col:'#3dd6ac', example:'hablar (to speak), comer… wait, no — hablar, tomar, vivir… wait', ex:'hablar, tomar, llegar' },
          { type:'–er', col:'#5b9cf6', ex:'comer, beber, leer, volver' },
          { type:'–ir', col:'#c864dc', ex:'vivir, escribir, abrir, salir' },
        ].map(v => `
          <div style="background:${v.col}12;border:1px solid ${v.col}33;border-radius:10px;padding:12px;">
            <div style="font-size:1.2rem;font-weight:600;color:${v.col};margin-bottom:4px;">${v.type}</div>
            <div style="font-size:0.75rem;color:var(--text3);">${v.ex}</div>
          </div>`).join('')}
      </div>
      <div style="padding:10px 14px;background:rgba(232,168,56,0.08);border:1px solid rgba(232,168,56,0.2);border-radius:8px;font-size:0.83rem;color:var(--text2);line-height:1.6;">
        <strong style="color:var(--accent);">The rule:</strong>
        Remove the –ar/–er/–ir ending to get the <strong>stem</strong>, then add the correct ending for
        the subject and tense. For example: <em>hablar</em> → stem <strong>habl–</strong> → <strong>hablo</strong> (yo, present).
      </div>
    </div>`;
}

/* ── Quick endings summary table ── */
function renderEndingsSummary() {
  const presentAr   = ['–o','–as','–a','–amos','–áis','–an'];
  const presentEr   = ['–o','–es','–e','–emos','–éis','–en'];
  const pretAr      = ['–é','–aste','–ó','–amos','–asteis','–aron'];
  const pretErIr    = ['–í','–iste','–ió','–imos','–isteis','–ieron'];
  const impAr       = ['–aba','–abas','–aba','–ábamos','–abais','–aban'];
  const impErIr     = ['–ía','–ías','–ía','–íamos','–íais','–ían'];
  const futAll      = ['–é','–ás','–á','–emos','–éis','–án'];
  const condAll     = ['–ía','–ías','–ía','–íamos','–íais','–ían'];
  const subjAr      = ['–e','–es','–e','–emos','–éis','–en'];
  const subjErIr    = ['–a','–as','–a','–amos','–áis','–an'];

  const cols = [
    { label:'Subject',      values: SUBJECTS_CG,  bold:true },
    { label:'Present –ar',  values: presentAr,  col:'#3dd6ac' },
    { label:'Present –er',  values: presentEr,  col:'#3dd6ac' },
    { label:'Preterite –ar',values: pretAr,     col:'#e8a838' },
    { label:'Pret. –er/–ir',values: pretErIr,   col:'#e8a838' },
    { label:'Imperfect –ar',values: impAr,      col:'#ff9664' },
    { label:'Imperf. –er/–ir',values:impErIr,   col:'#ff9664' },
    { label:'Future (all)', values: futAll,     col:'#5b9cf6' },
    { label:'Conditional',  values: condAll,    col:'#c864dc' },
    { label:'Subjunctive –ar', values: subjAr,  col:'#b482ff' },
    { label:'Subj. –er/–ir',values: subjErIr,  col:'#b482ff' },
  ];

  return `
    <div class="card" style="margin-bottom:1rem;overflow-x:auto;">
      <div class="card-header">
        <span class="card-label">All endings at a glance</span>
        <span style="font-size:0.75rem;color:var(--text3);">Scroll right to see all tenses →</span>
      </div>
      <table style="border-collapse:collapse;font-size:0.78rem;min-width:700px;width:100%;">
        <thead>
          <tr>
            ${cols.map(c => `
              <th style="padding:6px 10px;text-align:left;font-size:0.7rem;font-weight:500;
                         color:${c.col||'var(--text3)'};border-bottom:1px solid var(--border);
                         white-space:nowrap;">${c.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${SUBJECTS_CG.map((s, i) => `
            <tr style="border-bottom:1px solid var(--border);">
              ${cols.map(c => `
                <td style="padding:6px 10px;color:${c.bold?'var(--text2)':c.col||'var(--text)'};
                           font-weight:${c.bold?'500':'400'};white-space:nowrap;">
                  ${c.values[i]}
                </td>`).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
      <p style="font-size:0.75rem;color:var(--text3);margin-top:8px;">
        * Perfect and pluperfect use haber + past participle (–ado/–ido). See sections below.
      </p>
    </div>`;
}

/* ── Per-tense section ── */
function renderConjTenseSection(tense) {
  const g       = CONTENT.grammar[tense];
  const demoVbs = DEMO_VERBS[tense];
  const regVerb = CONTENT.verbs[demoVbs.regular];
  const irrVerb = CONTENT.verbs[demoVbs.irregular];

  if (!regVerb?.[tense] || !irrVerb?.[tense]) return '';

  const regRows = SUBJECTS_CG.map((s, i) =>
    `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 10px;color:var(--text2);font-weight:500;font-size:0.8rem;">${s}</td>
      <td style="padding:5px 10px;color:${g.colour};font-size:0.85rem;">${regVerb[tense][i]}</td>
    </tr>`).join('');

  const irrRows = SUBJECTS_CG.map((s, i) =>
    `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 10px;color:var(--text2);font-weight:500;font-size:0.8rem;">${s}</td>
      <td style="padding:5px 10px;color:${g.colour};font-size:0.85rem;">${irrVerb[tense][i]}</td>
    </tr>`).join('');

  // Build a formation tip specific to this tense
  let formationDetail = '';
  if (tense === 'perfect' || tense === 'pluperfect') {
    const haverLabel = tense === 'perfect' ? 'Present of haber' : 'Imperfect of haber';
    const haverForms = tense === 'perfect'
      ? ['he','has','ha','hemos','habéis','han']
      : ['había','habías','había','habíamos','habíais','habían'];
    formationDetail = `
      <div style="margin-top:8px;">
        <div style="font-size:0.72rem;color:var(--text3);margin-bottom:4px;">${haverLabel} + past participle</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <div style="background:var(--bg3);border-radius:8px;padding:8px 12px;">
            ${haverForms.map((f,i)=>`<div style="font-size:0.78rem;"><span style="color:var(--text3)">${SUBJECTS_CG[i]}</span> <span style="color:${g.colour};font-weight:500;">${f}</span></div>`).join('')}
          </div>
          <div style="background:var(--bg3);border-radius:8px;padding:8px 12px;align-self:flex-start;">
            <div style="font-size:0.72rem;color:var(--text3);margin-bottom:4px;">Participle ending</div>
            <div style="font-size:0.85rem;"><span style="color:var(--text3);">–ar →</span> <span style="color:${g.colour};font-weight:500;">–ado</span></div>
            <div style="font-size:0.85rem;"><span style="color:var(--text3);">–er/–ir →</span> <span style="color:${g.colour};font-weight:500;">–ido</span></div>
          </div>
        </div>
      </div>`;
  }

  return `
    <div id="cg-${tense}" class="card" style="margin-bottom:1rem;border-left:3px solid ${g.colour};">
      <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;"
           onclick="toggleRefCard('cgbody-${tense}','cgarrow-${tense}')">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div>
            <div style="font-family:'Fraunces',serif;font-size:1.05rem;font-weight:600;color:${g.colour};">${g.name}</div>
            <div style="font-size:0.72rem;color:var(--text3);">${g.fullName}</div>
          </div>
          <div style="font-size:0.82rem;color:var(--text2);max-width:340px;">${g.rule}</div>
        </div>
        <div id="cgarrow-${tense}" style="color:var(--text3);font-size:1rem;flex-shrink:0;transition:transform 0.2s;">▼</div>
      </div>

      <div id="cgbody-${tense}" style="display:none;margin-top:1.25rem;">

        <!-- Formation -->
        <div style="padding:10px 14px;background:var(--bg3);border-radius:8px;font-size:0.83rem;color:var(--text2);line-height:1.6;margin-bottom:1rem;">
          <strong style="color:var(--text);">How to form it:</strong> ${g.formation}
          ${formationDetail}
        </div>

        <!-- Signal words -->
        <div style="margin-bottom:1rem;">
          <div style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Time signal words</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${g.signals.map(s => `<span style="padding:3px 10px;background:${g.colour}15;border:1px solid ${g.colour}33;border-radius:20px;font-size:0.75rem;color:${g.colour};">${s}</span>`).join('')}
          </div>
        </div>

        <!-- Example tables side by side -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1rem;">
          <div>
            <div style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">
              Regular — <em>${demoVbs.regular}</em> (${regVerb.en})
            </div>
            <table style="border-collapse:collapse;width:100%;">${regRows}</table>
          </div>
          <div>
            <div style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">
              Irregular — <em>${demoVbs.irregular}</em> (${irrVerb.en})
            </div>
            <table style="border-collapse:collapse;width:100%;">${irrRows}</table>
          </div>
        </div>

        <!-- Watch out -->
        <div style="padding:10px 14px;background:rgba(232,168,56,0.08);border:1px solid rgba(232,168,56,0.2);border-radius:8px;font-size:0.82rem;color:var(--text2);line-height:1.6;margin-bottom:1rem;">
          <strong style="color:var(--accent);">⚠ Watch out:</strong> ${g.watchOut}
        </div>

        <!-- Practice button -->
        <div class="btn-row">
          <button class="primary" style="font-size:0.8rem;padding:6px 16px;"
            onclick="conjLevel='${tense==='present'?'easy':tense==='preterite'?'medium':tense==='future'||tense==='imperfect'?'hard':'expert'}';switchMode('conjugation');">
            Drill ${g.name} →
          </button>
          <button class="secondary" style="font-size:0.8rem;padding:6px 16px;"
            onclick="switchMode('reference');setTimeout(()=>{const el=document.getElementById('ref-${tense}');if(el)el.scrollIntoView({behavior:'smooth'})},100)">
            See in Tense guide
          </button>
        </div>
      </div>
    </div>`;
}

/* ── Irregular highlights ── */
function renderIrregularHighlights() {
  const keyIrregulars = [
    { verb:'ser',   present:['soy','eres','es','somos','sois','son'],         preterite:['fui','fuiste','fue','fuimos','fuisteis','fueron'],     note:'Shares preterite forms with <em>ir</em>' },
    { verb:'estar', present:['estoy','estás','está','estamos','estáis','están'], preterite:['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'], note:'Stress on final syllable in present' },
    { verb:'ir',    present:['voy','vas','va','vamos','vais','van'],           preterite:['fui','fuiste','fue','fuimos','fuisteis','fueron'],     note:'Shares preterite with <em>ser</em> — context tells them apart' },
    { verb:'tener', present:['tengo','tienes','tiene','tenemos','tenéis','tienen'], preterite:['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'], note:'Irregular future stem: tendr–' },
    { verb:'hacer', present:['hago','haces','hace','hacemos','hacéis','hacen'],  preterite:['hice','hiciste','hizo','hicimos','hicisteis','hicieron'], note:'Irregular future stem: har–. Note hiz– in él/ella preterite' },
  ];

  return `
    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="card-label">Key irregular verbs</span>
        <span style="font-size:0.75rem;color:var(--text3);">The ones you'll use most</span>
      </div>
      <p style="font-size:0.83rem;color:var(--text2);line-height:1.6;margin-bottom:1rem;">
        These verbs don't follow the regular patterns — they need to be memorised. The good news is they're
        the most common verbs in the language, so you'll encounter them constantly and they'll stick quickly.
      </p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${keyIrregulars.map(v => `
          <div style="background:var(--bg3);border-radius:10px;padding:12px 14px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap;">
              <strong style="font-size:1rem;color:var(--accent);">${v.verb}</strong>
              <span style="font-size:0.78rem;color:var(--text3);">${CONTENT.verbs[v.verb]?.en || ''}</span>
              <span style="font-size:0.75rem;padding:2px 8px;background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.3);border-radius:20px;color:#ff8080;">irregular</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px;">
              <div>
                <div style="font-size:0.68rem;color:var(--text3);margin-bottom:4px;">PRESENT</div>
                <div style="font-size:0.78rem;color:var(--present);">${v.present.join(' · ')}</div>
              </div>
              <div>
                <div style="font-size:0.68rem;color:var(--text3);margin-bottom:4px;">PRETERITE</div>
                <div style="font-size:0.78rem;color:var(--preterite);">${v.preterite.join(' · ')}</div>
              </div>
            </div>
            <div style="font-size:0.75rem;color:var(--text3);font-style:italic;">${v.note}</div>
          </div>`).join('')}
      </div>
    </div>`;
}
