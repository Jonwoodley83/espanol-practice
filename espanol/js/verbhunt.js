/* ══════════════════════════════════════════════════════════
   VERB HUNT
   🟢 Easy      — Spanish infinitive tiles, English clue
   🟠 Medium    — English meaning tiles, Spanish clue
   🔴 Hard      — Conjugated form tiles, infinitive+subject+tense clue
   🟣 Challenge — English meaning tiles, full Spanish sentence clue
   ⚫ Odd one out — 4 highlighted tiles, find the one that doesn't belong
══════════════════════════════════════════════════════════ */

const VERB_POOL = [
  { es:'ser',         en:'to be (permanent)',     en2:'nationality, profession, character', group:'being',         subgroup:'state' },
  { es:'estar',       en:'to be (temporary)',      en2:'location, feelings, states',         group:'being',         subgroup:'state' },
  { es:'tener',       en:'to have',                en2:'possession',                          group:'core',          subgroup:'core' },
  { es:'hacer',       en:'to do / to make',        en2:'',                                    group:'core',          subgroup:'core' },
  { es:'ir',          en:'to go',                  en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'venir',       en:'to come',                en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'decir',       en:'to say / to tell',       en2:'',                                    group:'communication', subgroup:'speech' },
  { es:'hablar',      en:'to speak / to talk',     en2:'',                                    group:'communication', subgroup:'speech' },
  { es:'querer',      en:'to want / to love',      en2:'a person',                            group:'feelings',      subgroup:'feelings' },
  { es:'poder',       en:'to be able to / can',    en2:'',                                    group:'ability',       subgroup:'ability' },
  { es:'saber',       en:'to know (facts)',         en2:'or skills',                           group:'knowledge',     subgroup:'knowledge' },
  { es:'conocer',     en:'to know (people)',        en2:'or places',                           group:'knowledge',     subgroup:'knowledge' },
  { es:'ver',         en:'to see / to watch',      en2:'',                                    group:'senses',        subgroup:'senses' },
  { es:'oír',         en:'to hear',                en2:'',                                    group:'senses',        subgroup:'senses' },
  { es:'dar',         en:'to give',                en2:'',                                    group:'core',          subgroup:'core' },
  { es:'poner',       en:'to put / to place',      en2:'',                                    group:'core',          subgroup:'core' },
  { es:'salir',       en:'to go out / to leave',   en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'llegar',      en:'to arrive',              en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'volver',      en:'to return / come back',  en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'entrar',      en:'to enter / to go in',    en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'subir',       en:'to go up / to climb',    en2:'',                                    group:'movement',      subgroup:'movement' },
  { es:'bajar',       en:'to go down',             en2:'to descend',                          group:'movement',      subgroup:'movement' },
  { es:'comer',       en:'to eat',                 en2:'',                                    group:'daily',         subgroup:'eating' },
  { es:'beber',       en:'to drink',               en2:'',                                    group:'daily',         subgroup:'eating' },
  { es:'dormir',      en:'to sleep',               en2:'',                                    group:'daily',         subgroup:'routine' },
  { es:'levantarse',  en:'to get up',              en2:'reflexive',                           group:'daily',         subgroup:'reflexive' },
  { es:'despertarse', en:'to wake up',             en2:'reflexive',                           group:'daily',         subgroup:'reflexive' },
  { es:'sentarse',    en:'to sit down',            en2:'reflexive',                           group:'daily',         subgroup:'reflexive' },
  { es:'bañarse',     en:'to have a bath',         en2:'or a swim',                           group:'daily',         subgroup:'reflexive' },
  { es:'vestirse',    en:'to get dressed',         en2:'reflexive',                           group:'daily',         subgroup:'reflexive' },
  { es:'llamarse',    en:'to be called',           en2:'for your name',                       group:'daily',         subgroup:'reflexive' },
  { es:'vivir',       en:'to live',                en2:'',                                    group:'life',          subgroup:'life' },
  { es:'trabajar',    en:'to work',                en2:'',                                    group:'life',          subgroup:'life' },
  { es:'estudiar',    en:'to study',               en2:'',                                    group:'life',          subgroup:'life' },
  { es:'aprender',    en:'to learn',               en2:'',                                    group:'life',          subgroup:'life' },
  { es:'enseñar',     en:'to teach / to show',     en2:'',                                    group:'life',          subgroup:'life' },
  { es:'escribir',    en:'to write',               en2:'',                                    group:'communication', subgroup:'writing' },
  { es:'leer',        en:'to read',                en2:'',                                    group:'communication', subgroup:'writing' },
  { es:'escuchar',    en:'to listen',              en2:'',                                    group:'communication', subgroup:'speech' },
  { es:'buscar',      en:'to look for',            en2:'to search',                           group:'actions',       subgroup:'finding' },
  { es:'encontrar',   en:'to find',                en2:'',                                    group:'actions',       subgroup:'finding' },
  { es:'comprar',     en:'to buy',                 en2:'',                                    group:'actions',       subgroup:'actions' },
  { es:'llevar',      en:'to carry / to wear',     en2:'',                                    group:'actions',       subgroup:'actions' },
  { es:'traer',       en:'to bring',               en2:'',                                    group:'actions',       subgroup:'actions' },
  { es:'abrir',       en:'to open',                en2:'',                                    group:'actions',       subgroup:'openclose' },
  { es:'cerrar',      en:'to close',               en2:'',                                    group:'actions',       subgroup:'openclose' },
  { es:'pensar',      en:'to think / to ponder',   en2:'',                                    group:'mind',          subgroup:'mind' },
  { es:'creer',       en:'to believe / to think',  en2:'casually',                            group:'mind',          subgroup:'mind' },
  { es:'entender',    en:'to understand',          en2:'',                                    group:'mind',          subgroup:'mind' },
  { es:'recordar',    en:'to remember',            en2:'',                                    group:'mind',          subgroup:'mind' },
];

// Conjugation data for hard mode (subset of key verbs)
const CONJ_DATA = {
  hablar:     { present:['hablo','hablas','habla','hablamos','habláis','hablan'],         preterite:['hablé','hablaste','habló','hablamos','hablasteis','hablaron'],       future:['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán'] },
  ser:        { present:['soy','eres','es','somos','sois','son'],                          preterite:['fui','fuiste','fue','fuimos','fuisteis','fueron'],                   future:['seré','serás','será','seremos','seréis','serán'] },
  estar:      { present:['estoy','estás','está','estamos','estáis','están'],               preterite:['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'], future:['estaré','estarás','estará','estaremos','estaréis','estarán'] },
  tener:      { present:['tengo','tienes','tiene','tenemos','tenéis','tienen'],            preterite:['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'],             future:['tendré','tendrás','tendrá','tendremos','tendréis','tendrán'] },
  ir:         { present:['voy','vas','va','vamos','vais','van'],                           preterite:['fui','fuiste','fue','fuimos','fuisteis','fueron'],                   future:['iré','irás','irá','iremos','iréis','irán'] },
  hacer:      { present:['hago','haces','hace','hacemos','hacéis','hacen'],                preterite:['hice','hiciste','hizo','hicimos','hicisteis','hicieron'],            future:['haré','harás','hará','haremos','haréis','harán'] },
  querer:     { present:['quiero','quieres','quiere','queremos','queréis','quieren'],      preterite:['quise','quisiste','quiso','quisimos','quisisteis','quisieron'],       future:['querré','querrás','querrá','querremos','querréis','querrán'] },
  comer:      { present:['como','comes','come','comemos','coméis','comen'],                preterite:['comí','comiste','comió','comimos','comisteis','comieron'],            future:['comeré','comerás','comerá','comeremos','comeréis','comerán'] },
  poder:      { present:['puedo','puedes','puede','podemos','podéis','pueden'],            preterite:['pude','pudiste','pudo','pudimos','pudisteis','pudieron'],             future:['podré','podrás','podrá','podremos','podréis','podrán'] },
  venir:      { present:['vengo','vienes','viene','venimos','venís','vienen'],             preterite:['vine','viniste','vino','vinimos','vinisteis','vinieron'],             future:['vendré','vendrás','vendrá','vendremos','vendréis','vendrán'] },
  decir:      { present:['digo','dices','dice','decimos','decís','dicen'],                 preterite:['dije','dijiste','dijo','dijimos','dijisteis','dijeron'],              future:['diré','dirás','dirá','diremos','diréis','dirán'] },
  dar:        { present:['doy','das','da','damos','dais','dan'],                           preterite:['di','diste','dio','dimos','disteis','dieron'],                        future:['daré','darás','dará','daremos','daréis','darán'] },
  vivir:      { present:['vivo','vives','vive','vivimos','vivís','viven'],                 preterite:['viví','viviste','vivió','vivimos','vivisteis','vivieron'],            future:['viviré','vivirás','vivirá','viviremos','viviréis','vivirán'] },
  saber:      { present:['sé','sabes','sabe','sabemos','sabéis','saben'],                  preterite:['supe','supiste','supo','supimos','supisteis','supieron'],             future:['sabré','sabrás','sabrá','sabremos','sabréis','sabrán'] },
  ver:        { present:['veo','ves','ve','vemos','veis','ven'],                           preterite:['vi','viste','vio','vimos','visteis','vieron'],                        future:['veré','verás','verá','veremos','veréis','verán'] },
};
const SUBJECTS = ['yo','tú','él/ella','nosotros','vosotros','ellos'];
const TENSE_LABELS = { present:'Present', preterite:'Preterite', future:'Future' };

// Challenge mode — sentences with a verb used in context
const CHALLENGE_SENTENCES = [
  { sentence:'Ayer fui al mercado con mi madre.',           verb:'ir',         hint:'ayer = yesterday' },
  { sentence:'Mañana haré los deberes en casa.',            verb:'hacer',      hint:'mañana = tomorrow' },
  { sentence:'¿Puedes hablar más despacio, por favor?',     verb:'poder',      hint:'ability/permission' },
  { sentence:'Me levanto a las siete cada mañana.',         verb:'levantarse', hint:'daily routine' },
  { sentence:'Ellos siempre comen juntos en familia.',      verb:'comer',      hint:'siempre = always' },
  { sentence:'El año que viene viviremos en Barcelona.',    verb:'vivir',      hint:'future plan' },
  { sentence:'¿Sabes dónde está la estación de tren?',      verb:'saber',      hint:'knowing a fact' },
  { sentence:'Mi hermana se despertó muy tarde ayer.',      verb:'despertarse',hint:'reflexive + past' },
  { sentence:'Tengo mucho trabajo esta semana.',            verb:'tener',      hint:'current state' },
  { sentence:'¿Adónde vas este verano?',                    verb:'ir',         hint:'future question' },
  { sentence:'Ella siempre se viste muy elegante.',         verb:'vestirse',   hint:'reflexive habit' },
  { sentence:'No entiendo esta pregunta.',                  verb:'entender',   hint:'current state of mind' },
  { sentence:'¿Quieres venir a la fiesta el sábado?',       verb:'querer',     hint:'invitation' },
  { sentence:'Hablamos español en clase todos los días.',   verb:'hablar',     hint:'todos los días = every day' },
  { sentence:'Me llamo Carlos y soy de Madrid.',            verb:'llamarse',   hint:'introducing yourself' },
  { sentence:'Busco mis llaves — ¿las has visto?',          verb:'buscar',     hint:'current action' },
  { sentence:'El año pasado aprendimos mucho.',             verb:'aprender',   hint:'completed past period' },
  { sentence:'¿A qué hora se sienta todo el mundo?',        verb:'sentarse',   hint:'reflexive question' },
  { sentence:'Creo que mañana lloverá.',                    verb:'creer',      hint:'expressing opinion' },
  { sentence:'Recordamos las vacaciones con mucho cariño.', verb:'recordar',   hint:'shared memory' },
];

// Odd one out — groups of 4 where 3 share something and 1 doesn't
const ODD_ONE_OUT = [
  { tiles:['levantarse','despertarse','vestirse','hacer'],    oddOne:'hacer',      reason:'The others are all reflexive verbs (-se). <strong>hacer</strong> (to do/make) is not reflexive.' },
  { tiles:['ir','venir','llegar','pensar'],                   oddOne:'pensar',     reason:'The others are all movement verbs. <strong>pensar</strong> (to think) is a mental verb.' },
  { tiles:['comer','beber','dormir','escribir'],              oddOne:'escribir',   reason:'The others relate to basic physical needs. <strong>escribir</strong> (to write) is a communication verb.' },
  { tiles:['ser','estar','tener','ir'],                       oddOne:'ir',         reason:'<strong>ser</strong>, <strong>estar</strong>, and <strong>tener</strong> are all used to describe states or possession. <strong>ir</strong> (to go) is a movement verb.' },
  { tiles:['hablar','decir','escuchar','subir'],              oddOne:'subir',      reason:'The others are all communication verbs. <strong>subir</strong> (to go up) is a movement verb.' },
  { tiles:['saber','conocer','entender','recordar'],          oddOne:'recordar',   reason:'<strong>saber</strong>, <strong>conocer</strong>, and <strong>entender</strong> are about knowing/understanding. <strong>recordar</strong> (to remember) is about memory recall.' },
  { tiles:['abrir','cerrar','poner','salir'],                 oddOne:'salir',      reason:'<strong>abrir</strong>, <strong>cerrar</strong>, and <strong>poner</strong> are actions done to objects. <strong>salir</strong> (to go out) describes movement of the subject.' },
  { tiles:['vivir','trabajar','estudiar','bañarse'],          oddOne:'bañarse',    reason:'The others describe life activities or roles. <strong>bañarse</strong> (to bathe) is a daily reflexive routine verb.' },
  { tiles:['buscar','encontrar','comprar','ver'],             oddOne:'ver',        reason:'<strong>buscar</strong>, <strong>encontrar</strong>, and <strong>comprar</strong> all involve deliberate actions. <strong>ver</strong> (to see) is a passive sense verb.' },
  { tiles:['querer','poder','saber','llevar'],                oddOne:'llevar',     reason:'<strong>querer</strong>, <strong>poder</strong>, and <strong>saber</strong> are all modal-type verbs (want/can/know how). <strong>llevar</strong> (to carry/wear) is a physical action verb.' },
  { tiles:['pensar','creer','entender','traer'],              oddOne:'traer',      reason:'The others are all mental/cognitive verbs. <strong>traer</strong> (to bring) is a physical action.' },
  { tiles:['ir','salir','volver','aprender'],                 oddOne:'aprender',   reason:'<strong>ir</strong>, <strong>salir</strong>, and <strong>volver</strong> all describe movement. <strong>aprender</strong> (to learn) is a cognitive verb.' },
];

const GROUP_COLOURS = {
  being:         { bg:'rgba(232,168,56,0.12)',  border:'rgba(232,168,56,0.35)',  text:'#e8a838' },
  core:          { bg:'rgba(255,107,107,0.10)', border:'rgba(255,107,107,0.3)',  text:'#ff8080' },
  movement:      { bg:'rgba(91,156,246,0.10)',  border:'rgba(91,156,246,0.3)',   text:'#5b9cf6' },
  communication: { bg:'rgba(61,214,172,0.10)',  border:'rgba(61,214,172,0.3)',   text:'#3dd6ac' },
  feelings:      { bg:'rgba(200,100,220,0.10)', border:'rgba(200,100,220,0.3)',  text:'#c864dc' },
  ability:       { bg:'rgba(255,180,50,0.10)',  border:'rgba(255,180,50,0.3)',   text:'#ffb432' },
  knowledge:     { bg:'rgba(100,200,100,0.10)', border:'rgba(100,200,100,0.3)', text:'#64c864' },
  senses:        { bg:'rgba(150,180,255,0.10)', border:'rgba(150,180,255,0.3)', text:'#96b4ff' },
  daily:         { bg:'rgba(255,150,100,0.10)', border:'rgba(255,150,100,0.3)', text:'#ff9664' },
  life:          { bg:'rgba(80,210,180,0.10)',  border:'rgba(80,210,180,0.3)',  text:'#50d2b4' },
  actions:       { bg:'rgba(220,180,80,0.10)',  border:'rgba(220,180,80,0.3)',  text:'#dcb450' },
  mind:          { bg:'rgba(180,130,255,0.10)', border:'rgba(180,130,255,0.3)', text:'#b482ff' },
};

const MODE_CONFIG = {
  easy:      { label:'🟢 Easy',       desc:'Tiles show Spanish infinitives. Clue is English meaning.',            tileSize:'minmax(108px,1fr)', tileHeight:'80px' },
  medium:    { label:'🟠 Medium',     desc:'Tiles show English meanings. Clue is the Spanish verb.',             tileSize:'minmax(155px,1fr)', tileHeight:'80px' },
  hard:      { label:'🔴 Hard',       desc:'Tiles show conjugated forms. Find the right one for the clue.',     tileSize:'minmax(118px,1fr)', tileHeight:'80px' },
  challenge: { label:'🟣 Challenge',  desc:'Tiles show English meanings. Clue is a full Spanish sentence.',     tileSize:'minmax(155px,1fr)', tileHeight:'80px' },
  odd:       { label:'⚫ Odd one out', desc:'4 tiles are highlighted. Which one doesn\'t belong with the others?', tileSize:'minmax(108px,1fr)', tileHeight:'80px' },
};

let vhMode     = 'easy';
let vhHintUsed = false;
let vhHintTiles = [];

let vhState = {
  questionIdx:    0,
  questionOrder:  [],
  found:          [],
  penalties:      0,
  hintPenalty:    0,
  totalCorrect:   0,
  totalQuestions: 0,
  active:         false,
  // hard mode specifics
  hardVerb: null, hardSubjectIdx: null, hardTense: null, hardForm: null,
  // odd one out
  oddTiles: [], oddAnswer: null, oddReason: null,
};

/* ── Build questions per mode ─── */
function buildQuestionOrder() {
  if (vhMode === 'odd') {
    return shuffle([...Array(ODD_ONE_OUT.length).keys()]);
  } else if (vhMode === 'challenge') {
    return shuffle([...Array(CHALLENGE_SENTENCES.length).keys()]);
  } else if (vhMode === 'hard') {
    // Generate question list from CONJ_DATA
    const qs = [];
    Object.keys(CONJ_DATA).forEach(verb => {
      ['present','preterite','future'].forEach(tense => {
        SUBJECTS.forEach((subj, idx) => {
          qs.push({ verb, tense, subjectIdx: idx });
        });
      });
    });
    return shuffle([...Array(qs.length).keys()]).slice(0, 30); // 30 questions for hard
  } else {
    return shuffle([...Array(VERB_POOL.length).keys()]);
  }
}

/* ── Entry / mode switching ─── */
function buildVerbHunt() {
  vhMode = 'easy';
  resetVhState();
  renderVerbHuntIntro();
}

function setVhMode(mode) {
  vhMode = mode;
  resetVhState();
  renderVerbHuntIntro();
}

function resetVhState() {
  vhState = {
    questionIdx:0, questionOrder: buildQuestionOrder(),
    found:[], penalties:0, hintPenalty:0,
    totalCorrect:0, totalQuestions:0, active:false,
    hardVerb:null, hardSubjectIdx:null, hardTense:null, hardForm:null,
    oddTiles:[], oddAnswer:null, oddReason:null,
  };
  vhHintUsed  = false;
  vhHintTiles = [];
}

function renderVerbHuntIntro() {
  const el = $('screen-verbhunt');
  el.innerHTML = `
    <div class="card" style="text-align:center;padding:2rem 1.5rem;">
      <div style="font-size:2.5rem;margin-bottom:0.75rem;">🎯</div>
      <div class="q-text" style="margin-bottom:1rem;">Verb Hunt</div>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:1.5rem;">
        ${Object.entries(MODE_CONFIG).map(([key,cfg]) => `
          <button onclick="setVhMode('${key}')"
            style="padding:8px 16px;font-family:inherit;font-size:0.82rem;cursor:pointer;border-radius:8px;
                   border:1px solid ${vhMode===key?'var(--accent)':'var(--border)'};
                   background:${vhMode===key?'rgba(232,168,56,0.15)':'transparent'};
                   color:${vhMode===key?'var(--accent)':'var(--text3)'};
                   font-weight:${vhMode===key?'500':'400'};transition:all 0.15s;">
            ${cfg.label}
          </button>`).join('')}
      </div>
      <div style="max-width:460px;margin:0 auto 1.5rem;padding:1rem 1.25rem;
                  background:var(--bg3);border:1px solid var(--border);border-radius:10px;
                  font-size:0.88rem;color:var(--text2);text-align:left;line-height:1.8;">
        <strong style="color:var(--text);">${MODE_CONFIG[vhMode].label}</strong><br>
        ${MODE_CONFIG[vhMode].desc}
        <br><span style="color:var(--text3);font-size:0.78rem;">✓ Correct +10 pts &nbsp;·&nbsp; ✗ Wrong −3 pts &nbsp;·&nbsp; 💡 Hint −5 pts</span>
      </div>
      <button class="primary" style="font-size:1rem;padding:12px 36px;" onclick="startVerbHunt()">Start hunting!</button>
    </div>
    <div id="vh-tile-grid" style="margin-top:1rem;"></div>`;
  renderTileGrid(null);
}

function startVerbHunt() {
  vhState.active = true;
  nextVerbHuntQuestion();
}

function nextVerbHuntQuestion() {
  if (vhState.questionIdx >= vhState.questionOrder.length) { renderVerbHuntComplete(); return; }
  vhState.found       = [];
  vhState.penalties   = 0;
  vhState.hintPenalty = 0;
  vhHintUsed          = false;
  vhHintTiles         = [];
  prepareQuestion();
  renderVerbHuntQuestion();
}

/* ── Prepare per-mode question data ─── */
function prepareQuestion() {
  const qi = vhState.questionOrder[vhState.questionIdx];

  if (vhMode === 'hard') {
    const hardQs = buildHardQuestions();
    const q = hardQs[qi % hardQs.length];
    vhState.hardVerb       = q.verb;
    vhState.hardTense      = q.tense;
    vhState.hardSubjectIdx = q.subjectIdx;
    vhState.hardForm       = CONJ_DATA[q.verb][q.tense][q.subjectIdx];

  } else if (vhMode === 'odd') {
    const ooo = ODD_ONE_OUT[qi % ODD_ONE_OUT.length];
    vhState.oddTiles  = ooo.tiles;
    vhState.oddAnswer = ooo.oddOne;
    vhState.oddReason = ooo.reason;

  } else if (vhMode === 'challenge') {
    // nothing extra needed — qi maps directly
  }
}

let _hardQsCache = null;
function buildHardQuestions() {
  if (_hardQsCache) return _hardQsCache;
  const qs = [];
  Object.keys(CONJ_DATA).forEach(verb => {
    ['present','preterite','future'].forEach(tense => {
      SUBJECTS.forEach((subj, idx) => {
        qs.push({ verb, tense, subjectIdx: idx });
      });
    });
  });
  _hardQsCache = shuffle(qs);
  return _hardQsCache;
}

/* ── Render question ─── */
function renderVerbHuntQuestion() {
  const qi   = vhState.questionOrder[vhState.questionIdx];
  const el   = $('screen-verbhunt');
  const cfg  = MODE_CONFIG[vhMode];

  let clueLabel = '', clueText = '', subText = '';

  if (vhMode === 'easy') {
    const v   = VERB_POOL[qi];
    clueLabel = 'Find the Spanish verb for:';
    clueText  = buildClueEn(v);

  } else if (vhMode === 'medium') {
    const v   = VERB_POOL[qi];
    clueLabel = 'Find the English meaning of:';
    clueText  = `<span style="font-size:1.6rem;">${v.es}</span>`;

  } else if (vhMode === 'hard') {
    clueLabel = 'Find the conjugated form:';
    clueText  = `<strong>${vhState.hardVerb}</strong> — <em>${SUBJECTS[vhState.hardSubjectIdx]}</em> — ${TENSE_LABELS[vhState.hardTense]}`;
    subText   = `Which tile shows the correct conjugation?`;

  } else if (vhMode === 'challenge') {
    const s   = CHALLENGE_SENTENCES[qi % CHALLENGE_SENTENCES.length];
    clueLabel = 'Which verb is being used in this sentence?';
    clueText  = `<em style="font-size:1.05rem;">"${s.sentence}"</em>`;
    subText   = `Hint: ${s.hint}`;

  } else if (vhMode === 'odd') {
    clueLabel = 'Odd one out:';
    clueText  = 'Three of the highlighted tiles share something in common. Which one doesn\'t belong?';
  }

  el.innerHTML = `
    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header">
        <span class="card-label">${cfg.label}</span>
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
          ${Object.entries(MODE_CONFIG).map(([key,c]) => `
            <button onclick="setVhMode('${key}')"
              style="padding:3px 10px;font-family:inherit;font-size:0.72rem;cursor:pointer;border-radius:20px;
                     border:1px solid ${vhMode===key?'var(--accent)':'var(--border)'};
                     background:${vhMode===key?'rgba(232,168,56,0.15)':'transparent'};
                     color:${vhMode===key?'var(--accent)':'var(--text3)'};">${c.label.split(' ')[0]}</button>`).join('')}
          <span style="font-size:0.75rem;color:var(--text3);margin-left:4px;">Q${vhState.questionIdx+1}/${vhState.questionOrder.length}</span>
        </div>
      </div>
      <div style="font-size:0.75rem;color:var(--text3);margin-bottom:4px;">${clueLabel}</div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div style="flex:1;">
          <div class="q-text" style="font-size:1.05rem;">${clueText}</div>
          ${subText ? `<div class="q-sub" style="margin-top:4px;">${subText}</div>` : ''}
        </div>
        ${vhMode !== 'odd' ? `
        <button id="vh-hint-btn" onclick="useHint()"
          style="flex-shrink:0;padding:7px 14px;background:rgba(232,168,56,0.1);
                 border:1px solid rgba(232,168,56,0.3);border-radius:8px;
                 color:var(--accent);font-family:inherit;font-size:0.8rem;cursor:pointer;white-space:nowrap;">
          💡 Help me (−5 pts)
        </button>` : ''}
      </div>
      <div id="vh-penalty" style="font-size:0.78rem;color:var(--accent2);margin-top:6px;min-height:18px;"></div>
    </div>
    <div id="vh-tile-grid"></div>
    <div id="vh-feedback" style="min-height:40px;margin-top:0.75rem;padding:0 2px;"></div>`;

  renderTileGrid(qi);
}

/* ── Tile grid ─── */
function renderTileGrid(qi) {
  const el = $('vh-tile-grid');
  if (!el) return;
  const cfg = MODE_CONFIG[vhMode];

  // For odd-one-out, only show 4 tiles
  if (vhMode === 'odd' && vhState.active) {
    renderOddTiles(); return;
  }

  // For hard mode, build a special pool of conjugated forms
  if (vhMode === 'hard' && vhState.active) {
    renderHardTiles(); return;
  }

  // Easy / medium / challenge — show full 50-tile grid
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,${cfg.tileSize});gap:10px;padding:4px 0 1.5rem;">
      ${VERB_POOL.map((v, i) => {
        const col     = GROUP_COLOURS[v.group] || GROUP_COLOURS.core;
        const isFound = vhState.found.includes(v.es);
        const isHinted = vhHintTiles.includes(i);
        let bg, border, textCol, cursor, extraStyle = '';

        if (isFound) {
          bg='rgba(61,214,172,0.18)'; border='var(--present)'; textCol='var(--present)'; cursor='default';
        } else if (isHinted) {
          bg='rgba(232,168,56,0.18)'; border='var(--accent)'; textCol=col.text; cursor='pointer';
          extraStyle='box-shadow:0 0 0 2px var(--accent),0 0 14px rgba(232,168,56,0.4);';
        } else {
          bg=col.bg; border=col.border; textCol=col.text; cursor=vhState.active?'pointer':'default';
        }

        const tileMain = vhMode==='easy' ? v.es : v.en;
        const tileSub  = vhMode==='medium' && v.en2 ? v.en2 : '';

        return `<div id="vhtile_${i}" class="vh-tile${isFound?' vh-tile-found':''}" data-verb="${v.es}"
          onclick="clickVerbTile('${v.es}',${i})"
          style="background:${bg};border:1px solid ${border};border-radius:12px;
                 height:${cfg.tileHeight};display:flex;flex-direction:column;
                 align-items:center;justify-content:center;
                 padding:8px 10px;text-align:center;cursor:${cursor};
                 transition:all 0.15s;user-select:none;position:relative;${extraStyle}">
          <div style="font-size:${vhMode==='easy'?'1rem':'0.8rem'};font-weight:500;color:${textCol};line-height:1.3;">${tileMain}</div>
          ${tileSub&&!isFound?`<div style="font-size:0.62rem;color:${textCol};opacity:0.65;margin-top:2px;line-height:1.2;">${tileSub}</div>`:''}
          ${isFound?'<div style="font-size:0.65rem;color:var(--present);margin-top:2px;">✓</div>':''}
          ${isHinted&&!isFound?'<div style="position:absolute;top:-5px;right:-5px;width:14px;height:14px;background:var(--accent);border-radius:50%;font-size:8px;display:flex;align-items:center;justify-content:center;color:#0f0e17;font-weight:700;">?</div>':''}
        </div>`;
      }).join('')}
    </div>`;

  addTileHovers();
}

function renderHardTiles() {
  const el  = $('vh-tile-grid');
  const cfg = MODE_CONFIG[vhMode];
  // Build tiles: correct form + 49 other conjugated forms
  const correctForm = vhState.hardForm;
  const correctVerb = vhState.hardVerb;

  // Generate a pool of wrong forms from other verbs/subjects/tenses
  let wrongForms = [];
  const allVerbs = Object.keys(CONJ_DATA);
  while (wrongForms.length < 49) {
    const rv = rand(allVerbs);
    const rt = rand(['present','preterite','future']);
    const ri = Math.floor(Math.random()*6);
    const form = CONJ_DATA[rv][rt][ri];
    if (form !== correctForm && !wrongForms.find(f=>f.form===form)) {
      wrongForms.push({ form, verb:rv, tense:rt, subjectIdx:ri });
    }
  }

  const allTiles = shuffle([{ form:correctForm, isCorrect:true }, ...wrongForms.map(f=>({form:f.form,isCorrect:false}))]);

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,${cfg.tileSize});gap:10px;padding:4px 0 1.5rem;">
      ${allTiles.map((t, i) => {
        const isFound   = vhState.found.includes(t.form) && t.isCorrect;
        const isHinted  = vhHintTiles.includes(i);
        let bg, border, textCol, cursor, extraStyle = '';
        if (isFound) {
          bg='rgba(61,214,172,0.18)'; border='var(--present)'; textCol='var(--present)'; cursor='default';
        } else if (isHinted) {
          bg='rgba(232,168,56,0.18)'; border='var(--accent)'; textCol='var(--text)'; cursor='pointer';
          extraStyle='box-shadow:0 0 0 2px var(--accent),0 0 14px rgba(232,168,56,0.4);';
        } else {
          bg='var(--bg3)'; border='var(--border)'; textCol='var(--text2)'; cursor='pointer';
        }
        return `<div id="vhtile_${i}" class="vh-tile${isFound?' vh-tile-found':''}"
          data-form="${t.form}" data-correct="${t.isCorrect}"
          onclick="clickHardTile('${t.form}',${t.isCorrect},${i})"
          style="background:${bg};border:1px solid ${border};border-radius:12px;
                 height:${cfg.tileHeight};display:flex;flex-direction:column;
                 align-items:center;justify-content:center;
                 padding:8px 10px;text-align:center;cursor:${cursor};
                 transition:all 0.15s;user-select:none;position:relative;${extraStyle}">
          <div style="font-size:1rem;font-weight:500;color:${textCol};">${t.form}</div>
          ${isFound?'<div style="font-size:0.65rem;color:var(--present);margin-top:2px;">✓</div>':''}
          ${isHinted&&!isFound?'<div style="position:absolute;top:-5px;right:-5px;width:14px;height:14px;background:var(--accent);border-radius:50%;font-size:8px;display:flex;align-items:center;justify-content:center;color:#0f0e17;font-weight:700;">?</div>':''}
        </div>`;
      }).join('')}
    </div>`;
  addTileHovers();
}

function renderOddTiles() {
  const el = $('vh-tile-grid');
  el.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:16px;padding:1rem 0 1.5rem;justify-content:center;">
      ${vhState.oddTiles.map((verb, i) => {
        const v   = VERB_POOL.find(x=>x.es===verb);
        const col = GROUP_COLOURS[v?.group||'core'];
        return `<div id="odd_${i}" onclick="clickOddTile('${verb}',${i})"
          style="background:${col.bg};border:2px solid ${col.border};border-radius:14px;
                 width:160px;height:90px;display:flex;flex-direction:column;
                 align-items:center;justify-content:center;text-align:center;
                 cursor:pointer;transition:all 0.15s;user-select:none;padding:12px;
                 box-shadow:0 0 0 2px ${col.border},0 0 16px rgba(232,168,56,0.15);">
          <div style="font-size:1.1rem;font-weight:500;color:${col.text};">${verb}</div>
          <div style="font-size:0.72rem;color:${col.text};opacity:0.7;margin-top:4px;">${v?.en||''}</div>
        </div>`;
      }).join('')}
    </div>`;
}

/* ── Click handlers ─── */
function clickVerbTile(verb, idx) {
  if (!vhState.active) return;
  const qi  = vhState.questionOrder[vhState.questionIdx];
  const fb  = $('vh-feedback');
  const v   = VERB_POOL.find(x=>x.es===verb);
  let correctVerb;

  if (vhMode === 'easy')      correctVerb = VERB_POOL[qi].es;
  else if (vhMode === 'medium') correctVerb = VERB_POOL[qi].es;
  else if (vhMode === 'challenge') correctVerb = CHALLENGE_SENTENCES[qi%CHALLENGE_SENTENCES.length].verb;

  if (vhState.found.includes(verb)) return;

  if (verb === correctVerb) {
    vhState.found.push(verb);
    score+=10; correct++; total++; streak++;
    updateStats();
    const tile = document.getElementById(`vhtile_${idx}`);
    if (tile) {
      tile.classList.add('vh-tile-found');
      tile.style.background='rgba(61,214,172,0.2)'; tile.style.borderColor='var(--present)';
      tile.style.transform='scale(1.06)'; tile.style.boxShadow='0 0 20px rgba(61,214,172,0.45)';
      setTimeout(()=>{tile.style.transform='';tile.style.boxShadow='';},350);
      tile.innerHTML=`<div style="font-size:${vhMode==='easy'?'1rem':'0.8rem'};font-weight:500;color:var(--present);">${vhMode==='easy'?v.es:v.en}</div><div style="font-size:0.65rem;color:var(--present);margin-top:2px;">✓</div>`;
    }
    if (fb) fb.innerHTML=`<div style="color:var(--present);font-size:0.9rem;padding:6px 0;">✓ <strong>${v.es}</strong> = ${v.en}${v.en2?' ('+v.en2+')':''}${streak>2?` <span style="color:var(--accent);margin-left:8px;">🔥 ${streak} streak!</span>`:''}</div>`;
    setTimeout(()=>{ if(fb) fb.innerHTML=`<div style="display:flex;align-items:center;gap:12px;padding:4px 0;"><span style="color:var(--present);">🎉 Got it!</span><button class="primary" onclick="advanceVerbHunt()">Next →</button></div>`; }, 450);

  } else {
    vhState.penalties++; streak=0; score=Math.max(0,score-3); total++;
    updateStats();
    shakeTile(`vhtile_${idx}`, idx);
    if (fb) fb.innerHTML=`<div style="color:var(--accent2);font-size:0.85rem;padding:6px 0;">✗ <strong>${vhMode==='easy'?v.es:v.en}</strong> — ${vhMode==='easy'?`means "${v.en}"`:`is "${v.es}"`} — not the one. −3 pts.</div>`;
    const pen=$('vh-penalty'); if(pen) pen.textContent=`−${vhState.penalties*3} pts`;
  }
}

function clickHardTile(form, isCorrect, idx) {
  if (!vhState.active || vhState.found.includes('done')) return;
  const fb   = $('vh-feedback');
  const tile = document.getElementById(`vhtile_${idx}`);

  if (isCorrect) {
    vhState.found.push('done');
    score+=10; correct++; total++; streak++;
    updateStats();
    if (tile) {
      tile.style.background='rgba(61,214,172,0.2)'; tile.style.borderColor='var(--present)';
      tile.style.transform='scale(1.06)'; tile.style.boxShadow='0 0 20px rgba(61,214,172,0.45)';
      setTimeout(()=>{tile.style.transform='';tile.style.boxShadow='';},350);
      tile.innerHTML=`<div style="font-size:1rem;font-weight:500;color:var(--present);">${form}</div><div style="font-size:0.65rem;color:var(--present);margin-top:2px;">✓</div>`;
    }
    if (fb) fb.innerHTML=`<div style="color:var(--present);font-size:0.9rem;padding:6px 0;">✓ <strong>${form}</strong> — ${vhState.hardVerb} (${SUBJECTS[vhState.hardSubjectIdx]}, ${TENSE_LABELS[vhState.hardTense]})${streak>2?` <span style="color:var(--accent);margin-left:8px;">🔥 ${streak} streak!</span>`:''}</div>`;
    setTimeout(()=>{ if(fb) fb.innerHTML=`<div style="display:flex;align-items:center;gap:12px;padding:4px 0;"><span style="color:var(--present);">🎉 Correct form!</span><button class="primary" onclick="advanceVerbHunt()">Next →</button></div>`; },450);
  } else {
    vhState.penalties++; streak=0; score=Math.max(0,score-3); total++;
    updateStats();
    shakeTile(`vhtile_${idx}`, idx);
    if (fb) fb.innerHTML=`<div style="color:var(--accent2);font-size:0.85rem;padding:6px 0;">✗ <strong>${form}</strong> — not the right form for ${SUBJECTS[vhState.hardSubjectIdx]}. −3 pts.</div>`;
    const pen=$('vh-penalty'); if(pen) pen.textContent=`−${vhState.penalties*3} pts`;
  }
}

function clickOddTile(verb, idx) {
  if (!vhState.active) return;
  const fb   = $('vh-feedback');
  const tile = document.getElementById(`odd_${idx}`);
  const v    = VERB_POOL.find(x=>x.es===verb);

  if (verb === vhState.oddAnswer) {
    score+=10; correct++; total++; streak++;
    updateStats();
    if (tile) {
      tile.style.background='rgba(61,214,172,0.2)'; tile.style.borderColor='var(--present)';
      tile.style.boxShadow='0 0 20px rgba(61,214,172,0.45)';
    }
    if (fb) fb.innerHTML=`
      <div style="color:var(--present);font-size:0.9rem;padding:4px 0 6px;">✓ Correct! <strong>${verb}</strong> is the odd one out.</div>
      <div class="explanation"><strong>Why?</strong> ${vhState.oddReason}</div>
      <div style="margin-top:10px;"><button class="primary" onclick="advanceVerbHunt()">Next →</button></div>`;
  } else {
    streak=0; score=Math.max(0,score-3); total++;
    updateStats();
    if (tile) {
      tile.style.animation='vh-shake 0.35s ease';
      tile.style.borderColor='var(--accent2)';
      setTimeout(()=>{tile.style.animation='';tile.style.borderColor='';},420);
    }
    if (fb) fb.innerHTML=`<div style="color:var(--accent2);font-size:0.85rem;padding:6px 0;">✗ <strong>${verb}</strong> (${v?.en}) does belong in this group. Keep looking. −3 pts.</div>`;
  }
}

/* ── Hint ─── */
function getHintTiles(answerVerb) {
  const target     = VERB_POOL.find(v=>v.es===answerVerb);
  const answerIdx  = VERB_POOL.findIndex(v=>v.es===answerVerb);
  let pool         = VERB_POOL.map((v,i)=>({...v,idx:i})).filter(v=>v.idx!==answerIdx&&!vhState.found.includes(v.es));
  let sameSubgroup = shuffle(pool.filter(v=>v.subgroup===target.subgroup));
  let sameGroup    = shuffle(pool.filter(v=>v.group===target.group&&v.subgroup!==target.subgroup));
  let others       = shuffle(pool.filter(v=>v.group!==target.group));
  let distractors  = [];
  const pick=(arr)=>{ if(arr.length&&distractors.length<3){ distractors.push(arr.shift().idx); } };
  while(distractors.length<3&&sameSubgroup.length) pick(sameSubgroup);
  while(distractors.length<3&&sameGroup.length)    pick(sameGroup);
  while(distractors.length<3&&others.length)       pick(others);
  return shuffle([answerIdx,...distractors]);
}

function useHint() {
  if (vhHintUsed) return;
  vhHintUsed = true;
  const btn = $('vh-hint-btn');
  if (btn) { btn.disabled=true; btn.style.opacity='0.4'; btn.textContent='💡 Hint used'; }
  const HINT_COST = 5;
  vhState.hintPenalty += HINT_COST;
  score = Math.max(0, score-HINT_COST);
  updateStats();

  if (vhMode === 'hard') {
    // Highlight 4 random tiles including the correct one
    const allTiles = document.querySelectorAll('.vh-tile');
    const correctTile = [...allTiles].find(t=>t.dataset.correct==='true');
    const wrongTiles  = shuffle([...allTiles].filter(t=>t.dataset.correct!=='true')).slice(0,3);
    const hintSet     = shuffle([correctTile,...wrongTiles]);
    hintSet.forEach((t,i)=>{
      if(!t) return;
      t.style.boxShadow='0 0 0 2px var(--accent),0 0 14px rgba(232,168,56,0.4)';
      const dot=document.createElement('div');
      dot.style.cssText='position:absolute;top:-5px;right:-5px;width:14px;height:14px;background:var(--accent);border-radius:50%;font-size:8px;display:flex;align-items:center;justify-content:center;color:#0f0e17;font-weight:700;';
      dot.textContent='?'; t.appendChild(dot);
    });
  } else {
    const qi = vhState.questionOrder[vhState.questionIdx];
    let answerVerb;
    if (vhMode==='easy')      answerVerb = VERB_POOL[qi].es;
    else if (vhMode==='medium') answerVerb = VERB_POOL[qi].es;
    else if (vhMode==='challenge') answerVerb = CHALLENGE_SENTENCES[qi%CHALLENGE_SENTENCES.length].verb;
    if (!answerVerb) return;
    vhHintTiles = getHintTiles(answerVerb);
    renderTileGrid(qi);
  }

  const fb=$('vh-feedback');
  if(fb) fb.innerHTML=`<div style="color:var(--accent);font-size:0.85rem;padding:4px 0;">💡 Hint: the answer is among the 4 highlighted tiles. −${HINT_COST} pts.</div>`;
  const pen=$('vh-penalty'); if(pen) pen.textContent=`−${(vhState.penalties*3)+HINT_COST} pts`;
}

/* ── Advance / complete ─── */
function advanceVerbHunt() {
  vhState.questionIdx++;
  vhState.totalQuestions++;
  vhState.totalCorrect++;
  nextVerbHuntQuestion();
}

function renderVerbHuntComplete() {
  const el  = $('screen-verbhunt');
  const pct = vhState.totalQuestions>0 ? Math.round((vhState.totalCorrect/vhState.totalQuestions)*100) : 100;
  const msg = pct>=90?'¡Excelente! 🌟':pct>=70?'¡Muy bien! 🎉':pct>=50?'¡Bien hecho! Keep going.':'¡Sigue practicando!';
  el.innerHTML=`
    <div class="card" style="text-align:center;padding:2.5rem 1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">🏆</div>
      <span style="font-family:'Fraunces',serif;font-size:3.5rem;font-weight:600;color:var(--accent);display:block;line-height:1;">${pct}%</span>
      <p style="color:var(--text2);margin:0.75rem 0 0.25rem;">${vhState.totalCorrect} of ${vhState.totalQuestions} correct in ${MODE_CONFIG[vhMode].label} mode</p>
      <p style="color:var(--text3);font-size:0.85rem;margin-bottom:1.75rem;">${msg}</p>
      <div class="btn-row" style="justify-content:center;">
        <button class="primary" onclick="buildVerbHunt()">Play again</button>
      </div>
    </div>`;
}

/* ── Helpers ─── */
function shakeTile(id, idx) {
  const tile = document.getElementById(id);
  if (!tile) return;
  const isHinted = vhHintTiles.includes(idx);
  tile.style.animation='vh-shake 0.35s ease';
  tile.style.borderColor='var(--accent2)';
  tile.style.background='rgba(255,107,107,0.14)';
  setTimeout(()=>{
    tile.style.animation='';
    tile.style.borderColor=isHinted?'var(--accent)':'';
    tile.style.background=isHinted?'rgba(232,168,56,0.18)':'';
  },420);
}

function addTileHovers() {
  document.querySelectorAll('.vh-tile:not(.vh-tile-found)').forEach(tile => {
    tile.addEventListener('mouseenter', ()=>{
      if (!vhState.active) return;
      const idx = parseInt(tile.id.replace('vhtile_',''));
      if (!vhHintTiles.includes(idx)) { tile.style.transform='translateY(-3px)'; tile.style.boxShadow='0 6px 20px rgba(0,0,0,0.3)'; }
    });
    tile.addEventListener('mouseleave', ()=>{
      const idx = parseInt(tile.id.replace('vhtile_',''));
      if (!vhHintTiles.includes(idx)) { tile.style.transform=''; tile.style.boxShadow=''; }
    });
  });
}

function buildClueEn(v) {
  const extras = {
    ser:'To be (permanent — nationality, profession, character)',
    estar:'To be (temporary — location, feelings, states)',
    querer:'To want — also used to mean "to love" a person',
    poder:'To be able to — used like "can"',
    saber:'To know a fact or a skill',
    conocer:'To know a person or a place',
    ver:'To see — also used for "to watch"',
    salir:'To go out — or to leave',
    volver:'To return — to come back',
    entrar:'To enter — to go in',
    subir:'To go up — to climb',
    bajar:'To go down — to descend',
    levantarse:'To get up (reflexive verb)',
    despertarse:'To wake up (reflexive verb)',
    sentarse:'To sit down (reflexive verb)',
    bañarse:'To have a bath — or to have a swim (reflexive)',
    vestirse:'To get dressed (reflexive verb)',
    llamarse:'To be called — used to give your name (reflexive)',
    enseñar:'To teach — also used for "to show"',
    buscar:'To look for — to search for',
    llevar:'To carry — also used for "to wear"',
    pensar:'To think — to ponder or consider',
    creer:'To believe — also used casually for "to think"',
    decir:'To say or to tell',
    hablar:'To speak or to talk',
  };
  return extras[v.es] || (v.en.charAt(0).toUpperCase()+v.en.slice(1));
}

// Inject shake keyframe once
(function(){
  if(document.getElementById('vh-shake-style')) return;
  const s=document.createElement('style'); s.id='vh-shake-style';
  s.textContent=`@keyframes vh-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px) rotate(-1deg)}40%{transform:translateX(6px) rotate(1deg)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`;
  document.head.appendChild(s);
})();
