/* ══════════════════════════════════════════════════════════
   DESCRIBE THE PERSON
   A random cartoon character is generated.
   Describe 10 features in Spanish.
   Easy   = multiple choice
   Medium = type the key word / adjective
   Hard   = type the full phrase
══════════════════════════════════════════════════════════ */

// ── Character feature pools ──────────────────────────────

const HAIR_COLOURS = [
  { key:'rubio',    hex:'#e8c97a', en:'blonde' },
  { key:'moreno',   hex:'#3a1f0a', en:'dark/brunette' },
  { key:'castaño',  hex:'#7b4a1e', en:'brown' },
  { key:'pelirrojo',hex:'#c0392b', en:'red/ginger' },
  { key:'negro',    hex:'#111111', en:'black' },
  { key:'gris',     hex:'#999999', en:'grey' },
];

const HAIR_LENGTHS = [
  { key:'largo',  en:'long',   ratio:0.38 },
  { key:'corto',  en:'short',  ratio:0.12 },
  { key:'mediano',en:'medium', ratio:0.22 },
];

const HAIR_STYLES = [
  { key:'liso',   en:'straight' },
  { key:'rizado', en:'curly' },
  { key:'ondulado',en:'wavy' },
];

const HEIGHTS = [
  { key:'alto',   en:'tall',   scale:1.12 },
  { key:'bajo',   en:'short',  scale:0.88 },
  { key:'mediano',en:'medium height', scale:1.0 },
];

const BUILDS = [
  { key:'delgado', en:'slim/thin' },
  { key:'robusto', en:'stocky/sturdy' },
  { key:'normal',  en:'average build' },
];

const EYE_COLOURS = [
  { key:'azules',    hex:'#5b8dd9', en:'blue' },
  { key:'marrones',  hex:'#7b4a1e', en:'brown' },
  { key:'verdes',    hex:'#3a8a3a', en:'green' },
  { key:'grises',    hex:'#888888', en:'grey' },
  { key:'negros',    hex:'#1a1a1a', en:'dark/black' },
];

const SKIN_TONES = [
  { key:'clara',    hex:'#f5c9a0', en:'fair' },
  { key:'media',    hex:'#d4956a', en:'medium' },
  { key:'morena',   hex:'#8d5524', en:'dark' },
];

const SHIRT_COLOURS = [
  { key:'roja',      hex:'#c0392b', en:'red' },
  { key:'azul',      hex:'#2980b9', en:'blue' },
  { key:'verde',     hex:'#27ae60', en:'green' },
  { key:'amarilla',  hex:'#f1c40f', en:'yellow' },
  { key:'blanca',    hex:'#f0f0f0', en:'white' },
  { key:'negra',     hex:'#2c2c2c', en:'black' },
  { key:'naranja',   hex:'#e67e22', en:'orange' },
  { key:'morada',    hex:'#8e44ad', en:'purple' },
  { key:'rosa',      hex:'#e91e8c', en:'pink' },
  { key:'gris',      hex:'#7f8c8d', en:'grey' },
];

const TROUSER_COLOURS = [
  { key:'azules',   hex:'#1a3a6e', en:'blue' },
  { key:'negros',   hex:'#1a1a1a', en:'black' },
  { key:'grises',   hex:'#666666', en:'grey' },
  { key:'marrones', hex:'#7b4a1e', en:'brown' },
  { key:'blancos',  hex:'#e8e8e8', en:'white' },
  { key:'beiges',   hex:'#c8a87a', en:'beige' },
];

const GENDERS = [
  { key:'hombre', en:'man', she:'él' },
  { key:'mujer',  en:'woman', she:'ella' },
];

const ACCESSORIES = [
  { key:'gafas',        en:'glasses',  draw:'glasses' },
  { key:'sombrero',     en:'hat',      draw:'hat' },
  { key:'barba',        en:'beard',    draw:'beard' },
  { key:'pendientes',   en:'earrings', draw:'earrings' },
  { key:'ninguno',      en:'none',     draw:'none' },
];

// ── State ───────────────────────────────────────────────
let describeState = {
  character: null,
  level: 'easy',
  answers: {},   // idx → user answer
  checked: {},   // idx → true/false
  locked: {},    // idx → true (correct and locked)
};

// ── Entry point ─────────────────────────────────────────
function buildDescribe() {
  const el = $('screen-describe');
  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">Describe the person</h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:520px;line-height:1.6;">
        A random character appears. Describe 10 things about them in Spanish.
      </p>
    </div>

    <!-- Level selector -->
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;">
      <span style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;">Difficulty:</span>
      ${[['easy','🟢 Easy','Multiple choice'],['medium','🟠 Medium','Type the key word'],['hard','🔴 Hard','Type the full phrase']].map(([key,label,subtitle])=>`
        <button onclick="setDescribeLevel('${key}')"
          id="desc-lvl-${key}"
          style="padding:6px 16px;font-family:inherit;font-size:0.82rem;cursor:pointer;border-radius:20px;
                 border:1px solid ${describeState.level===key?'var(--accent)':'var(--border)'};
                 background:${describeState.level===key?'rgba(232,168,56,0.15)':'transparent'};
                 color:${describeState.level===key?'var(--accent)':'var(--text3)'};transition:all 0.15s;">
          ${label}<br><span style="font-size:0.7rem;opacity:0.7;">${subtitle}</span>
        </button>`).join('')}
    </div>

    <button class="primary" onclick="startDescribeGame()" style="margin-bottom:1.5rem;">
      Generate character →
    </button>

    <div id="describe-game"></div>`;
}

function setDescribeLevel(level) {
  describeState.level = level;
  document.querySelectorAll('[id^="desc-lvl-"]').forEach(b => {
    const k = b.id.replace('desc-lvl-','');
    b.style.borderColor  = k===level ? 'var(--accent)' : 'var(--border)';
    b.style.background   = k===level ? 'rgba(232,168,56,0.15)' : 'transparent';
    b.style.color        = k===level ? 'var(--accent)' : 'var(--text3)';
  });
}

// ── Generate a random character ──────────────────────────
function generateCharacter() {
  const gender    = rand(GENDERS);
  const hairCol   = rand(HAIR_COLOURS);
  const hairLen   = rand(HAIR_LENGTHS);
  const hairStyle = rand(HAIR_STYLES);
  const height    = rand(HEIGHTS);
  const build     = rand(BUILDS);
  const eyes      = rand(EYE_COLOURS);
  const skin      = rand(SKIN_TONES);
  const shirt     = rand(SHIRT_COLOURS);
  const trousers  = rand(TROUSER_COLOURS);

  // Accessories: beard only for men, earrings more common for women
  let accPool = ACCESSORIES.filter(a => {
    if (a.key === 'barba' && gender.key === 'mujer') return false;
    return true;
  });
  const accessory = rand(accPool);

  return { gender, hairCol, hairLen, hairStyle, height, build, eyes, skin, shirt, trousers, accessory };
}

// ── Build the 10 descriptions for this character ─────────
function buildDescriptions(ch) {
  const pro = ch.gender.key === 'hombre' ? 'Él' : 'Ella';
  const adj = (word, gender, number='s') => word; // helper placeholder

  return [
    {
      label:   'Hair colour',
      phrase:  `Tiene el pelo ${ch.hairCol.key}`,
      keyword: ch.hairCol.key,
      hint:    `Hair colour — ${ch.hairCol.en}`,
      options: shuffle([ch.hairCol.key, ...shuffle(HAIR_COLOURS.filter(h=>h.key!==ch.hairCol.key)).slice(0,3).map(h=>h.key)]),
      optionPhrases: null, // filled below
    },
    {
      label:   'Hair length',
      phrase:  `Tiene el pelo ${ch.hairLen.key}`,
      keyword: ch.hairLen.key,
      hint:    `Hair length — ${ch.hairLen.en}`,
      options: shuffle([ch.hairLen.key, ...HAIR_LENGTHS.filter(h=>h.key!==ch.hairLen.key).map(h=>h.key)]),
    },
    {
      label:   'Hair style',
      phrase:  `Tiene el pelo ${ch.hairStyle.key}`,
      keyword: ch.hairStyle.key,
      hint:    `Hair style — ${ch.hairStyle.en}`,
      options: shuffle([ch.hairStyle.key, ...HAIR_STYLES.filter(h=>h.key!==ch.hairStyle.key).map(h=>h.key)]),
    },
    {
      label:   'Height',
      phrase:  `${pro} es ${ch.height.key}`,
      keyword: ch.height.key,
      hint:    `Height — ${ch.height.en}`,
      options: shuffle([ch.height.key, ...HEIGHTS.filter(h=>h.key!==ch.height.key).map(h=>h.key)]),
    },
    {
      label:   'Build',
      phrase:  `${pro} es ${ch.build.key}`,
      keyword: ch.build.key,
      hint:    `Build — ${ch.build.en}`,
      options: shuffle([ch.build.key, ...BUILDS.filter(b=>b.key!==ch.build.key).map(b=>b.key)]),
    },
    {
      label:   'Eye colour',
      phrase:  `Tiene los ojos ${ch.eyes.key}`,
      keyword: ch.eyes.key,
      hint:    `Eye colour — ${ch.eyes.en}`,
      options: shuffle([ch.eyes.key, ...shuffle(EYE_COLOURS.filter(e=>e.key!==ch.eyes.key)).slice(0,3).map(e=>e.key)]),
    },
    {
      label:   'Skin tone',
      phrase:  `Tiene la piel ${ch.skin.key}`,
      keyword: ch.skin.key,
      hint:    `Skin tone — ${ch.skin.en}`,
      options: shuffle([ch.skin.key, ...SKIN_TONES.filter(s=>s.key!==ch.skin.key).map(s=>s.key)]),
    },
    {
      label:   'Shirt colour',
      phrase:  `Lleva una camisa ${ch.shirt.key}`,
      keyword: ch.shirt.key,
      hint:    `Shirt colour — ${ch.shirt.en}`,
      options: shuffle([ch.shirt.key, ...shuffle(SHIRT_COLOURS.filter(s=>s.key!==ch.shirt.key)).slice(0,3).map(s=>s.key)]),
    },
    {
      label:   'Trousers colour',
      phrase:  `Lleva unos pantalones ${ch.trousers.key}`,
      keyword: ch.trousers.key,
      hint:    `Trousers — ${ch.trousers.en}`,
      options: shuffle([ch.trousers.key, ...shuffle(TROUSER_COLOURS.filter(t=>t.key!==ch.trousers.key)).slice(0,3).map(t=>t.key)]),
    },
    {
      label:   'Accessory',
      phrase:  ch.accessory.key === 'ninguno' ? 'No lleva accesorios' : `Lleva ${ch.accessory.key}`,
      keyword: ch.accessory.key === 'ninguno' ? 'no lleva accesorios' : ch.accessory.key,
      hint:    `Accessory — ${ch.accessory.en}`,
      options: shuffle([ch.accessory.key, ...shuffle(ACCESSORIES.filter(a=>a.key!==ch.accessory.key)).slice(0,3).map(a=>a.key)]),
    },
  ];
}

// ── Start game ───────────────────────────────────────────
function startDescribeGame() {
  const ch   = generateCharacter();
  const desc = buildDescriptions(ch);
  describeState = { ...describeState, character:ch, descriptions:desc, answers:{}, checked:{}, locked:{} };
  renderDescribeGame();
}

function renderDescribeGame() {
  const ch    = describeState.character;
  const desc  = describeState.descriptions;
  const level = describeState.level;
  const el    = $('describe-game');

  const totalDone  = Object.values(describeState.locked).filter(Boolean).length;
  const allDone    = totalDone === desc.length;

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:1.5rem;align-items:start;">

      <!-- Character SVG -->
      <div style="position:sticky;top:80px;">
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;text-align:center;">
          ${drawCharacterSVG(ch)}
          <div style="margin-top:0.75rem;font-size:0.82rem;color:var(--text2);">
            ${totalDone} / ${desc.length} described
          </div>
          <div class="progress" style="margin-top:6px;">
            <div class="progress-fill" style="width:${Math.round((totalDone/desc.length)*100)}%;"></div>
          </div>
          ${allDone ? `
            <div style="margin-top:1rem;padding:10px;background:rgba(61,214,172,0.1);border:1px solid rgba(61,214,172,0.3);border-radius:8px;color:var(--present);font-size:0.85rem;">
              ¡Perfecto! All 10 described! 🎉
            </div>
            <button class="primary" onclick="startDescribeGame()" style="margin-top:0.75rem;width:100%;">New character →</button>
          ` : ''}
        </div>
      </div>

      <!-- Descriptions -->
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${desc.map((d,i) => renderDescriptionRow(d, i, level)).join('')}
      </div>

    </div>`;
}

function renderDescriptionRow(d, i, level) {
  const locked  = describeState.locked[i];
  const checked = describeState.checked[i];
  const wrong   = checked && !locked;

  let inputHtml = '';

  if (locked) {
    inputHtml = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="color:var(--present);font-size:1.1rem;">✓</span>
        <span style="color:var(--present);font-size:0.9rem;font-weight:500;">${d.phrase}</span>
      </div>`;
  } else if (level === 'easy') {
    inputHtml = `
      <div style="display:flex;flex-wrap:wrap;gap:6px;" id="opts-${i}">
        ${d.options.map(opt => `
          <button onclick="checkDescribeAnswer(${i},'${opt.replace(/'/g,"\\'")}')"
            style="padding:5px 14px;background:var(--bg3);border:1px solid var(--border);
                   border-radius:8px;font-size:0.85rem;color:var(--text2);cursor:pointer;
                   transition:all 0.15s;font-family:inherit;"
            onmouseover="this.style.background='rgba(255,255,255,0.08)'"
            onmouseout="this.style.background='var(--bg3)'">
            ${opt}
          </button>`).join('')}
      </div>
      ${wrong ? `<div style="font-size:0.75rem;color:var(--accent2);margin-top:4px;">Not quite — try again</div>` : ''}`;
  } else {
    const placeholder = level === 'medium' ? `Type the ${d.label.toLowerCase()} in Spanish…` : `Type the full phrase in Spanish…`;
    const val = describeState.answers[i] || '';
    inputHtml = `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <input type="text" id="desc-input-${i}" value="${val}"
          placeholder="${placeholder}"
          autocomplete="off" autocorrect="off" spellcheck="false"
          style="flex:1;min-width:180px;background:var(--bg3);border:1px solid ${wrong?'var(--accent2)':'var(--border)'};
                 border-radius:8px;padding:8px 12px;color:var(--text);font-family:inherit;font-size:0.88rem;outline:none;"
          onfocus="this.style.borderColor='var(--accent)'"
          onblur="this.style.borderColor='${wrong?'var(--accent2)':'var(--border)'}'"
          oninput="describeState.answers[${i}]=this.value"
          onkeydown="if(event.key==='Enter')checkDescribeAnswer(${i},null)">
        <button onclick="checkDescribeAnswer(${i},null)"
          style="padding:7px 16px;background:var(--accent);border:none;border-radius:8px;
                 color:#0f0e17;font-family:inherit;font-size:0.82rem;font-weight:500;cursor:pointer;">
          Check
        </button>
      </div>
      ${wrong ? renderWrongHint(i, level) : ''}`;
  }

  return `
    <div style="background:var(--bg2);border:1px solid ${locked?'rgba(61,214,172,0.3)':wrong?'rgba(255,107,107,0.3)':'var(--border)'};
                border-radius:var(--radius);padding:1rem;transition:all 0.2s;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:${locked?'0':'8px'};">
        <span style="font-size:0.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;flex:1;">${d.label}</span>
        ${locked ? '<span style="color:var(--present);font-size:0.85rem;">✓ correct</span>' : ''}
      </div>
      ${locked ? '' : `<div style="font-size:0.8rem;color:var(--text3);margin-bottom:8px;font-style:italic;">${d.hint}</div>`}
      ${inputHtml}
    </div>`;
}

function renderWrongHint(i, level) {
  const d      = describeState.descriptions[i];
  const answer = describeState.answers[i] || '';
  const target = level === 'medium' ? d.keyword : d.phrase;

  // Check what's different — missing accents?
  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n').replace(/ü/g,'u');

  const accentMatch = norm(answer) === norm(target);
  if (accentMatch) {
    return `<div style="font-size:0.75rem;color:var(--accent);margin-top:4px;">
      Almost! Watch your accents: <strong>${target}</strong>
    </div>`;
  }
  return `<div style="font-size:0.75rem;color:var(--accent2);margin-top:4px;">
    Not quite. Hint: <strong>${d.hint}</strong>
  </div>`;
}

// ── Check answer ─────────────────────────────────────────
function checkDescribeAnswer(i, chosenOption) {
  const d     = describeState.descriptions[i];
  const level = describeState.level;

  let userAnswer;
  if (chosenOption !== null) {
    userAnswer = chosenOption;
  } else {
    const input = document.getElementById(`desc-input-${i}`);
    userAnswer  = (input ? input.value : describeState.answers[i] || '').trim();
  }

  describeState.answers[i] = userAnswer;

  const target = level === 'medium' ? d.keyword : level === 'easy' ? d.keyword : d.phrase;

  const norm = s => s.toLowerCase().trim()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n').replace(/ü/g,'u');

  const isCorrect = norm(userAnswer) === norm(target);

  describeState.checked[i] = true;

  if (isCorrect) {
    describeState.locked[i] = true;
    score += level === 'easy' ? 5 : level === 'medium' ? 10 : 15;
    correct++; total++; streak++;
    updateStats();
  } else {
    total++;
    streak = 0;
    updateStats();
  }

  renderDescribeGame();
}

// ── Draw character SVG — illustrated style ───────────────
function drawCharacterSVG(ch) {
  const W = 240, H = 400;
  const cx = W / 2;

  const skin   = ch.skin.hex;
  const hair   = ch.hairCol.hex;
  // Slightly darker shade for shadow/depth on skin
  const skinShadow = ch.skin.key === 'clara' ? '#d4956a' : ch.skin.key === 'media' ? '#a06040' : '#5a3010';
  const shirtC = ch.shirt.hex;
  const trouC  = ch.trousers.hex;
  const eyeC   = ch.eyes.hex;
  const isWoman = ch.gender.key === 'mujer';

  // Body width based on build
  const bW = ch.build.key === 'robusto' ? 68 : ch.build.key === 'delgado' ? 48 : 58;
  const heightScale = ch.height.scale;

  // ── Key coordinates ──
  const headCY = 88;
  const headRX = 36, headRY = 42;
  const neckTop = headCY + headRY - 10;
  const neckBot = neckTop + 18;
  const shoulderY = neckBot;
  const torsoBot = shoulderY + 95;
  const hipY = torsoBot;
  const kneeY = hipY + 80;
  const ankleY = kneeY + 75;
  const footY = ankleY + 16;

  // Arm hang
  const armTopY = shoulderY + 8;
  const elbowY  = armTopY + 55;
  const handY   = elbowY + 52;
  const armW    = 14;

  // Leg width
  const legW = bW * 0.36;
  const legGap = 7;

  // ── Shoe colour — slightly randomised based on shirt ──
  const shoeC = '#2c2c2c';

  // ── Shadow under feet ──
  const shadow = `<ellipse cx="${cx}" cy="${footY+6}" rx="${bW*0.55}" ry="8" fill="rgba(0,0,0,0.12)"/>`;

  // ── Shoes ──
  const shoeW = legW + 10;
  const shoeH = 16;
  const shoeRound = 8;
  // Left shoe (slightly angled)
  const shoeL = `
    <path d="M${cx - legGap/2 - legW - 6},${ankleY + 8}
             Q${cx - legGap/2 - legW - 8},${footY + shoeH} ${cx - legGap/2 - legW + shoeW - 4},${footY + shoeH}
             Q${cx - legGap/2 - legW + shoeW + 2},${footY + shoeH - 4} ${cx - legGap/2 - legW + shoeW},${footY + 4}
             L${cx - legGap/2 - 2},${ankleY + 4} Z" fill="${shoeC}"/>
    <path d="M${cx - legGap/2 - legW - 2},${ankleY + 8} L${cx - legGap/2 - 2},${ankleY + 4}
             Q${cx - legGap/2},${ankleY} ${cx - legGap/2 - 4},${footY + 2}
             Q${cx - legGap/2 - legW - 1},${footY + 2} ${cx - legGap/2 - legW - 2},${ankleY + 8} Z"
          fill="rgba(255,255,255,0.1)"/>`;
  // Right shoe
  const shoeR = `
    <path d="M${cx + legGap/2 + 2},${ankleY + 4}
             Q${cx + legGap/2 + legW + 6},${footY} ${cx + legGap/2 + shoeW + 2},${footY + shoeH - 4}
             Q${cx + legGap/2 + shoeW + 4},${footY + shoeH} ${cx + legGap/2 + 4},${footY + shoeH}
             Q${cx + legGap/2 - 2},${footY + shoeH} ${cx + legGap/2 - 6},${ankleY + 8} Z" fill="${shoeC}"/>`;

  // ── Legs — tapered, with subtle knee ──
  const legTopW = legW;
  const legBotW = legW * 0.82;
  const legsHTML = `
    <!-- Left leg -->
    <path d="M${cx - legGap/2 - legTopW},${hipY}
             C${cx - legGap/2 - legTopW - 3},${kneeY - 10} ${cx - legGap/2 - legBotW - 2},${kneeY + 10} ${cx - legGap/2 - legBotW},${ankleY}
             L${cx - legGap/2},${ankleY} C${cx - legGap/2 + 2},${kneeY + 10} ${cx - legGap/2 + 2},${kneeY - 10} ${cx - legGap/2},${hipY} Z"
          fill="${trouC}"/>
    <!-- Knee highlight left -->
    <ellipse cx="${cx - legGap/2 - legTopW*0.5}" cy="${kneeY}" rx="${legTopW*0.35}" ry="5" fill="rgba(255,255,255,0.07)"/>
    <!-- Right leg -->
    <path d="M${cx + legGap/2},${hipY}
             C${cx + legGap/2 - 2},${kneeY - 10} ${cx + legGap/2 - 2},${kneeY + 10} ${cx + legGap/2},${ankleY}
             L${cx + legGap/2 + legBotW},${ankleY} C${cx + legGap/2 + legBotW + 2},${kneeY + 10} ${cx + legGap/2 + legTopW + 3},${kneeY - 10} ${cx + legGap/2 + legTopW},${hipY} Z"
          fill="${trouC}"/>
    <!-- Knee highlight right -->
    <ellipse cx="${cx + legGap/2 + legTopW*0.5}" cy="${kneeY}" rx="${legTopW*0.35}" ry="5" fill="rgba(255,255,255,0.07)"/>
    <!-- Belt -->
    <rect x="${cx - bW/2}" y="${hipY - 4}" width="${bW}" height="10" rx="3" fill="rgba(0,0,0,0.25)"/>
    <rect x="${cx - 5}" y="${hipY - 5}" width="10" height="12" rx="2" fill="rgba(180,140,40,0.7)"/>`;

  // ── Torso — shaped with curves ──
  const torsoHTML = isWoman ? `
    <!-- Women's top — fitted -->
    <path d="M${cx - bW/2},${shoulderY}
             C${cx - bW/2 - 4},${shoulderY + 30} ${cx - bW/2 + 6},${torsoBot - 20} ${cx - bW*0.48},${torsoBot}
             L${cx + bW*0.48},${torsoBot}
             C${cx + bW/2 - 6},${torsoBot - 20} ${cx + bW/2 + 4},${shoulderY + 30} ${cx + bW/2},${shoulderY} Z"
          fill="${shirtC}"/>
    <!-- Neckline -->
    <path d="M${cx - 14},${shoulderY + 4} Q${cx},${shoulderY + 22} ${cx + 14},${shoulderY + 4}" fill="${shirtC}" stroke="${shirtC}"/>
    <!-- Fabric fold -->
    <path d="M${cx - bW*0.3},${shoulderY + 20} Q${cx},${shoulderY + 40} ${cx + bW*0.3},${shoulderY + 20}" stroke="rgba(0,0,0,0.08)" stroke-width="1.5" fill="none"/>
  ` : `
    <!-- Men's shirt -->
    <path d="M${cx - bW/2},${shoulderY}
             C${cx - bW/2 - 2},${shoulderY + 40} ${cx - bW/2},${torsoBot - 10} ${cx - bW/2},${torsoBot}
             L${cx + bW/2},${torsoBot}
             C${cx + bW/2},${torsoBot - 10} ${cx + bW/2 + 2},${shoulderY + 40} ${cx + bW/2},${shoulderY} Z"
          fill="${shirtC}"/>
    <!-- Collar -->
    <path d="M${cx - 10},${shoulderY + 2} L${cx - 5},${shoulderY + 18} L${cx},${shoulderY + 8} L${cx + 5},${shoulderY + 18} L${cx + 10},${shoulderY + 2}" fill="${shirtC}" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
    <!-- Button line -->
    ${[0,1,2,3].map(n => `<circle cx="${cx}" cy="${shoulderY + 28 + n * 16}" r="2" fill="rgba(0,0,0,0.2)"/>`).join('')}
  `;

  // ── Arms — curved, natural hang ──
  const armShadow = `rgba(0,0,0,0.12)`;
  const armsHTML = `
    <!-- Left arm -->
    <path d="M${cx - bW/2},${armTopY}
             C${cx - bW/2 - 16},${armTopY + 20} ${cx - bW/2 - 22},${elbowY} ${cx - bW/2 - 18},${elbowY}
             C${cx - bW/2 - 22},${elbowY + 30} ${cx - bW/2 - 16},${handY - 10} ${cx - bW/2 - 12},${handY}
             L${cx - bW/2 - 12 + armW},${handY}
             C${cx - bW/2 - 8 + armW},${handY - 10} ${cx - bW/2 - 4 + armW},${elbowY + 30} ${cx - bW/2 - 4},${elbowY}
             C${cx - bW/2},${elbowY} ${cx - bW/2 + 2},${armTopY + 20} ${cx - bW/2},${armTopY} Z"
          fill="${shirtC}"/>
    <!-- Left hand -->
    <ellipse cx="${cx - bW/2 - 10}" cy="${handY + 8}" rx="9" ry="11" fill="${skin}"/>
    <path d="M${cx - bW/2 - 18},${handY + 2} Q${cx - bW/2 - 12},${handY + 20} ${cx - bW/2 - 4},${handY + 2}" fill="${skin}"/>
    <!-- Right arm -->
    <path d="M${cx + bW/2},${armTopY}
             C${cx + bW/2 + 16},${armTopY + 20} ${cx + bW/2 + 22},${elbowY} ${cx + bW/2 + 18},${elbowY}
             C${cx + bW/2 + 22},${elbowY + 30} ${cx + bW/2 + 16},${handY - 10} ${cx + bW/2 + 12},${handY}
             L${cx + bW/2 + 12 - armW},${handY}
             C${cx + bW/2 + 8 - armW},${handY - 10} ${cx + bW/2 + 4 - armW},${elbowY + 30} ${cx + bW/2 + 4},${elbowY}
             C${cx + bW/2},${elbowY} ${cx + bW/2 - 2},${armTopY + 20} ${cx + bW/2},${armTopY} Z"
          fill="${shirtC}"/>
    <!-- Right hand -->
    <ellipse cx="${cx + bW/2 + 10}" cy="${handY + 8}" rx="9" ry="11" fill="${skin}"/>
    <path d="M${cx + bW/2 + 4},${handY + 2} Q${cx + bW/2 + 12},${handY + 20} ${cx + bW/2 + 18},${handY + 2}" fill="${skin}"/>`;

  // ── Neck ──
  const neckHTML = `
    <path d="M${cx - 9},${neckTop} C${cx - 9},${neckBot} ${cx + 9},${neckBot} ${cx + 9},${neckTop}
             L${cx + 10},${neckBot} Q${cx},${neckBot + 6} ${cx - 10},${neckBot} Z" fill="${skin}"/>
    <!-- Neck shadow -->
    <path d="M${cx - 9},${neckBot - 4} Q${cx},${neckBot + 2} ${cx + 9},${neckBot - 4}" fill="rgba(0,0,0,0.08)"/>`;

  // ── Head — proper face shape with jaw ──
  const headHTML = `
    <!-- Head shape -->
    <path d="M${cx - headRX + 4},${headCY - headRY + 18}
             C${cx - headRX - 2},${headCY - headRY * 0.4} ${cx - headRX - 2},${headCY + headRY * 0.2}
             Q${cx - headRX + 2},${headCY + headRY + 8} ${cx},${headCY + headRY + 14}
             Q${cx + headRX - 2},${headCY + headRY + 8} ${cx + headRX + 2},${headCY + headRY * 0.2}
             C${cx + headRX + 2},${headCY - headRY * 0.4} ${cx + headRX - 4},${headCY - headRY + 18}
             Q${cx},${headCY - headRY - 2} ${cx - headRX + 4},${headCY - headRY + 18} Z"
          fill="${skin}"/>
    <!-- Jaw shadow -->
    <path d="M${cx - headRX + 6},${headCY + headRY * 0.5}
             Q${cx},${headCY + headRY + 18} ${cx + headRX - 6},${headCY + headRY * 0.5}"
          fill="none" stroke="${skinShadow}" stroke-width="1.5" opacity="0.3"/>
    <!-- Ear left -->
    <ellipse cx="${cx - headRX + 1}" cy="${headCY + 6}" rx="7" ry="10" fill="${skin}"/>
    <ellipse cx="${cx - headRX + 3}" cy="${headCY + 6}" rx="4" ry="6" fill="${skinShadow}" opacity="0.2"/>
    <!-- Ear right -->
    <ellipse cx="${cx + headRX - 1}" cy="${headCY + 6}" rx="7" ry="10" fill="${skin}"/>
    <ellipse cx="${cx + headRX - 3}" cy="${headCY + 6}" rx="4" ry="6" fill="${skinShadow}" opacity="0.2"/>`;

  // ── Eyes — detailed with eyelids ──
  const eyeY  = headCY + 6;
  const eyeX1 = cx - 14;
  const eyeX2 = cx + 14;
  const eyesHTML = `
    <!-- Eye whites -->
    <ellipse cx="${eyeX1}" cy="${eyeY}" rx="9" ry="8" fill="white"/>
    <ellipse cx="${eyeX2}" cy="${eyeY}" rx="9" ry="8" fill="white"/>
    <!-- Irises -->
    <circle cx="${eyeX1}" cy="${eyeY + 1}" r="5.5" fill="${eyeC}"/>
    <circle cx="${eyeX2}" cy="${eyeY + 1}" r="5.5" fill="${eyeC}"/>
    <!-- Pupils -->
    <circle cx="${eyeX1}" cy="${eyeY + 1}" r="2.8" fill="#111"/>
    <circle cx="${eyeX2}" cy="${eyeY + 1}" r="2.8" fill="#111"/>
    <!-- Eye shine -->
    <circle cx="${eyeX1 - 2}" cy="${eyeY - 1}" r="1.5" fill="white" opacity="0.85"/>
    <circle cx="${eyeX2 - 2}" cy="${eyeY - 1}" r="1.5" fill="white" opacity="0.85"/>
    <!-- Upper eyelids -->
    <path d="M${eyeX1 - 9},${eyeY - 1} Q${eyeX1},${eyeY - 10} ${eyeX1 + 9},${eyeY - 1}" fill="none" stroke="${skinShadow}" stroke-width="2" opacity="0.5"/>
    <path d="M${eyeX2 - 9},${eyeY - 1} Q${eyeX2},${eyeY - 10} ${eyeX2 + 9},${eyeY - 1}" fill="none" stroke="${skinShadow}" stroke-width="2" opacity="0.5"/>
    <!-- Lashes (top) -->
    ${[-6,-2,2,6].map(o=>`<line x1="${eyeX1+o}" y1="${eyeY-8}" x2="${eyeX1+o*1.2}" y2="${eyeY-11}" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>`).join('')}
    ${[-6,-2,2,6].map(o=>`<line x1="${eyeX2+o}" y1="${eyeY-8}" x2="${eyeX2+o*1.2}" y2="${eyeY-11}" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>`).join('')}`;

  // ── Eyebrows ──
  const browY  = eyeY - 13;
  const browThick = isWoman ? '2' : '3';
  const browsHTML = `
    <path d="M${eyeX1 - 9},${browY + 2} Q${eyeX1 - 1},${browY - 4} ${eyeX1 + 9},${browY + 1}"
          stroke="${hair}" stroke-width="${browThick}" fill="none" stroke-linecap="round" opacity="0.9"/>
    <path d="M${eyeX2 - 9},${browY + 1} Q${eyeX2 + 1},${browY - 4} ${eyeX2 + 9},${browY + 2}"
          stroke="${hair}" stroke-width="${browThick}" fill="none" stroke-linecap="round" opacity="0.9"/>`;

  // ── Nose — subtle, realistic ──
  const noseY  = headCY + 16;
  const noseHTML = `
    <path d="M${cx - 3},${noseY - 4} C${cx - 5},${noseY + 4} ${cx - 9},${noseY + 8} ${cx - 7},${noseY + 10}
             Q${cx},${noseY + 12} ${cx + 7},${noseY + 10} C${cx + 9},${noseY + 8} ${cx + 5},${noseY + 4} ${cx + 3},${noseY - 4}"
          fill="none" stroke="${skinShadow}" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
    <!-- Nostrils -->
    <ellipse cx="${cx - 6}" cy="${noseY + 10}" rx="3" ry="2" fill="${skinShadow}" opacity="0.3"/>
    <ellipse cx="${cx + 6}" cy="${noseY + 10}" rx="3" ry="2" fill="${skinShadow}" opacity="0.3"/>`;

  // ── Mouth — with lips ──
  const mouthY = headCY + 30;
  const lipC   = isWoman ? '#c0506a' : '#a05050';
  const mouthHTML = `
    <!-- Upper lip -->
    <path d="M${cx - 12},${mouthY} Q${cx - 6},${mouthY - 4} ${cx},${mouthY - 2} Q${cx + 6},${mouthY - 4} ${cx + 12},${mouthY}"
          fill="${lipC}" opacity="0.85"/>
    <!-- Lower lip -->
    <path d="M${cx - 12},${mouthY} Q${cx},${mouthY + 10} ${cx + 12},${mouthY}" fill="${lipC}" opacity="0.7"/>
    <!-- Mouth line -->
    <path d="M${cx - 12},${mouthY} Q${cx},${mouthY + 2} ${cx + 12},${mouthY}" fill="none" stroke="${lipC}" stroke-width="1.2" opacity="0.5"/>
    <!-- Lip shine -->
    <ellipse cx="${cx}" cy="${mouthY + 4}" rx="5" ry="2" fill="white" opacity="0.15"/>`;

  // ── Cheeks ──
  const cheeksHTML = `
    <ellipse cx="${cx - 22}" cy="${eyeY + 14}" rx="10" ry="7" fill="#e07070" opacity="0.18"/>
    <ellipse cx="${cx + 22}" cy="${eyeY + 14}" rx="10" ry="7" fill="#e07070" opacity="0.18"/>`;

  // ── Hair ──
  let hairHTML = '';
  const hairDark = hair; // could darken for shadow
  const hairHighlight = 'rgba(255,255,255,0.18)';

  if (ch.hairLen.key === 'corto') {
    if (ch.hairStyle.key === 'rizado') {
      // Short curly
      hairHTML = `
        <path d="M${cx - headRX + 2},${headCY - headRY + 20}
                 Q${cx - headRX - 4},${headCY - headRY - 2} ${cx - headRX + 4},${headCY - headRY - 14}
                 Q${cx - 10},${headCY - headRY - 22} ${cx},${headCY - headRY - 20}
                 Q${cx + 10},${headCY - headRY - 22} ${cx + headRX - 4},${headCY - headRY - 14}
                 Q${cx + headRX + 4},${headCY - headRY - 2} ${cx + headRX - 2},${headCY - headRY + 20} Z"
              fill="${hair}"/>
        ${[-20,-10,0,10,20].map(o=>`<circle cx="${cx+o}" cy="${headCY - headRY - 10}" r="8" fill="${hair}"/>`).join('')}
        ${[-15,-5,5,15].map(o=>`<circle cx="${cx+o}" cy="${headCY - headRY - 18}" r="6" fill="${hair}"/>`).join('')}`;
    } else {
      // Short straight/wavy
      hairHTML = `
        <path d="M${cx - headRX + 2},${headCY - headRY + 22}
                 Q${cx - headRX - 6},${headCY - headRY + 4} ${cx - headRX},${headCY - headRY - 10}
                 Q${cx - 8},${headCY - headRY - 22} ${cx},${headCY - headRY - 22}
                 Q${cx + 8},${headCY - headRY - 22} ${cx + headRX},${headCY - headRY - 10}
                 Q${cx + headRX + 6},${headCY - headRY + 4} ${cx + headRX - 2},${headCY - headRY + 22} Z"
              fill="${hair}"/>
        <path d="M${cx - headRX + 2},${headCY - headRY + 10} Q${cx},${headCY - headRY - 4} ${cx + headRX - 2},${headCY - headRY + 10}"
              fill="none" stroke="${hairHighlight}" stroke-width="3" opacity="0.4"/>`;
    }
  } else if (ch.hairLen.key === 'mediano') {
    if (ch.hairStyle.key === 'rizado') {
      hairHTML = `
        <path d="M${cx - headRX + 2},${headCY - headRY + 22}
                 Q${cx - headRX - 8},${headCY - headRY + 4} ${cx - headRX - 2},${headCY - headRY - 10}
                 Q${cx - 8},${headCY - headRY - 24} ${cx},${headCY - headRY - 24}
                 Q${cx + 8},${headCY - headRY - 24} ${cx + headRX + 2},${headCY - headRY - 10}
                 Q${cx + headRX + 8},${headCY - headRY + 4} ${cx + headRX - 2},${headCY - headRY + 22}
                 Q${cx + headRX + 6},${headCY + 20} ${cx + headRX - 4},${headCY + 48}
                 Q${cx + 4},${headCY + 56} ${cx - 4},${headCY + 56}
                 Q${cx - headRX + 4},${headCY + 48} ${cx - headRX - 6},${headCY + 20} Z"
              fill="${hair}"/>
        ${[-18,-6,6,18].map(o=>`<circle cx="${cx+o}" cy="${headCY - headRY - 12}" r="9" fill="${hair}"/>`).join('')}`;
    } else {
      hairHTML = `
        <path d="M${cx - headRX + 2},${headCY - headRY + 22}
                 Q${cx - headRX - 8},${headCY - headRY + 4} ${cx - headRX - 2},${headCY - headRY - 10}
                 Q${cx - 8},${headCY - headRY - 24} ${cx},${headCY - headRY - 24}
                 Q${cx + 8},${headCY - headRY - 24} ${cx + headRX + 2},${headCY - headRY - 10}
                 Q${cx + headRX + 8},${headCY - headRY + 4} ${cx + headRX - 2},${headCY - headRY + 22}
                 Q${cx + headRX + 8},${headCY + 18} ${cx + headRX + 2},${headCY + 52}
                 Q${cx},${headCY + 60} ${cx - headRX - 2},${headCY + 52}
                 Q${cx - headRX - 8},${headCY + 18} Z"
              fill="${hair}"/>
        <path d="M${cx - headRX},${headCY - 10} Q${cx - 4},${headCY + 30} ${cx - headRX - 2},${headCY + 50}"
              fill="none" stroke="${hairHighlight}" stroke-width="3" opacity="0.35"/>
        <path d="M${cx + headRX},${headCY - 10} Q${cx + 4},${headCY + 30} ${cx + headRX + 2},${headCY + 50}"
              fill="none" stroke="${hairHighlight}" stroke-width="3" opacity="0.35"/>`;
    }
  } else {
    // Long hair
    const curl = ch.hairStyle.key === 'ondulado' || ch.hairStyle.key === 'rizado';
    const waveL = curl ? `Q${cx - headRX - 20},${headCY + 60} ${cx - headRX - 8},${headCY + 100}
                          Q${cx - headRX - 22},${headCY + 140} ${cx - headRX - 6},${neckBot + 120}`
                       : `L${cx - headRX - 8},${neckBot + 130}`;
    const waveR = curl ? `Q${cx + headRX + 20},${headCY + 60} ${cx + headRX + 8},${headCY + 100}
                          Q${cx + headRX + 22},${headCY + 140} ${cx + headRX + 6},${neckBot + 120}`
                       : `L${cx + headRX + 8},${neckBot + 130}`;
    hairHTML = `
      <path d="M${cx - headRX + 2},${headCY - headRY + 22}
               Q${cx - headRX - 8},${headCY - headRY + 4} ${cx - headRX - 2},${headCY - headRY - 10}
               Q${cx - 8},${headCY - headRY - 26} ${cx},${headCY - headRY - 26}
               Q${cx + 8},${headCY - headRY - 26} ${cx + headRX + 2},${headCY - headRY - 10}
               Q${cx + headRX + 8},${headCY - headRY + 4} ${cx + headRX - 2},${headCY - headRY + 22}
               ${waveR}
               Q${cx},${neckBot + 160} ${cx - headRX - 6},${neckBot + 130}
               ${waveL} Z"
            fill="${hair}"/>
      <!-- Hair highlight strands -->
      <path d="M${cx - 8},${headCY - headRY - 20} Q${cx - headRX},${headCY + 40} ${cx - headRX - 6},${headCY + 110}"
            fill="none" stroke="${hairHighlight}" stroke-width="3" opacity="0.35"/>
      <path d="M${cx + 2},${headCY - headRY - 22} Q${cx + 4},${headCY + 40} ${cx + headRX + 4},${headCY + 110}"
            fill="none" stroke="${hairHighlight}" stroke-width="2.5" opacity="0.3"/>`;
  }

  // ── Accessories ──
  let accessoryHTML = '';
  if (ch.accessory.draw === 'glasses') {
    accessoryHTML = `
      <!-- Glasses frames -->
      <rect x="${eyeX1 - 11}" y="${eyeY - 9}" width="22" height="18" rx="6" fill="none" stroke="#444" stroke-width="2.2"/>
      <rect x="${eyeX2 - 11}" y="${eyeY - 9}" width="22" height="18" rx="6" fill="none" stroke="#444" stroke-width="2.2"/>
      <!-- Bridge -->
      <path d="M${eyeX1 + 11},${eyeY} L${eyeX2 - 11},${eyeY}" stroke="#444" stroke-width="2"/>
      <!-- Temple arms -->
      <line x1="${eyeX1 - 11}" y1="${eyeY}" x2="${eyeX1 - 26}" y2="${eyeY + 4}" stroke="#444" stroke-width="2"/>
      <line x1="${eyeX2 + 11}" y1="${eyeY}" x2="${eyeX2 + 26}" y2="${eyeY + 4}" stroke="#444" stroke-width="2"/>
      <!-- Lens tint -->
      <rect x="${eyeX1 - 11}" y="${eyeY - 9}" width="22" height="18" rx="6" fill="rgba(150,200,255,0.12)"/>
      <rect x="${eyeX2 - 11}" y="${eyeY - 9}" width="22" height="18" rx="6" fill="rgba(150,200,255,0.12)"/>`;
  } else if (ch.accessory.draw === 'hat') {
    accessoryHTML = `
      <!-- Hat brim -->
      <ellipse cx="${cx}" cy="${headCY - headRY + 14}" rx="${headRX + 18}" ry="9" fill="#2c2c2c"/>
      <ellipse cx="${cx}" cy="${headCY - headRY + 11}" rx="${headRX + 18}" ry="9" fill="#333"/>
      <!-- Hat crown -->
      <path d="M${cx - headRX + 2},${headCY - headRY + 12}
               Q${cx - headRX + 2},${headCY - headRY - 30} ${cx},${headCY - headRY - 34}
               Q${cx + headRX - 2},${headCY - headRY - 30} ${cx + headRX - 2},${headCY - headRY + 12} Z"
            fill="#2c2c2c"/>
      <!-- Hat band -->
      <rect x="${cx - headRX + 2}" y="${headCY - headRY - 6}" width="${(headRX - 2)*2}" height="8" fill="#1a1a1a" rx="2"/>`;
  } else if (ch.accessory.draw === 'beard') {
    accessoryHTML = `
      <path d="M${cx - 20},${headCY + headRY - 8}
               C${cx - 24},${headCY + headRY + 10} ${cx - 20},${headCY + headRY + 24} ${cx},${headCY + headRY + 28}
               C${cx + 20},${headCY + headRY + 24} ${cx + 24},${headCY + headRY + 10} ${cx + 20},${headCY + headRY - 8}
               Q${cx},${headCY + headRY} Z"
            fill="${hair}" opacity="0.92"/>
      <!-- Moustache -->
      <path d="M${cx - 14},${mouthY - 2} Q${cx - 6},${mouthY - 8} ${cx},${mouthY - 4} Q${cx + 6},${mouthY - 8} ${cx + 14},${mouthY - 2}"
            fill="${hair}" opacity="0.85"/>`;
  } else if (ch.accessory.draw === 'earrings') {
    accessoryHTML = `
      <!-- Gold drop earrings -->
      <circle cx="${cx - headRX + 2}" cy="${headCY + 14}" r="4" fill="#f0c040"/>
      <line x1="${cx - headRX + 2}" y1="${headCY + 18}" x2="${cx - headRX + 2}" y2="${headCY + 28}" stroke="#f0c040" stroke-width="1.5"/>
      <ellipse cx="${cx - headRX + 2}" cy="${headCY + 32}" rx="4" ry="5" fill="#f0c040"/>
      <circle cx="${cx + headRX - 2}" cy="${headCY + 14}" r="4" fill="#f0c040"/>
      <line x1="${cx + headRX - 2}" y1="${headCY + 18}" x2="${cx + headRX - 2}" y2="${headCY + 28}" stroke="#f0c040" stroke-width="1.5"/>
      <ellipse cx="${cx + headRX - 2}" cy="${headCY + 32}" rx="4" ry="5" fill="#f0c040"/>`;
  }

  // Height scale — applied to whole figure, anchored at feet
  const totalH = footY + 8;
  const scaleY = totalH * (1 - heightScale);

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
    style="max-width:220px;height:auto;display:block;margin:0 auto;">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)"/>
      </radialGradient>
    </defs>
    <!-- Background -->
    <rect width="${W}" height="${H}" rx="16" fill="url(#bgGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <g transform="translate(0,${scaleY}) scale(1,${heightScale}) translate(0,${-scaleY})">
      ${shadow}
      ${shoeL}${shoeR}
      ${legsHTML}
      ${torsoHTML}
      ${armsHTML}
      ${neckHTML}
      <!-- Hair back layer -->
      ${hairHTML}
      ${headHTML}
      ${eyesHTML}
      ${browsHTML}
      ${noseHTML}
      ${mouthHTML}
      ${cheeksHTML}
      ${accessoryHTML}
    </g>
  </svg>`;
}
