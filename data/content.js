const CONTENT = {

  verbs: {
    hablar:  { en:'to speak',    present:['hablo','hablas','habla','hablamos','habláis','hablan'],        preterite:['hablé','hablaste','habló','hablamos','hablasteis','hablaron'],          future:['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán'] },
    ser:     { en:'to be (perm)',present:['soy','eres','es','somos','sois','son'],                         preterite:['fui','fuiste','fue','fuimos','fuisteis','fueron'],                      future:['seré','serás','será','seremos','seréis','serán'] },
    estar:   { en:'to be (temp)',present:['estoy','estás','está','estamos','estáis','están'],              preterite:['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'],   future:['estaré','estarás','estará','estaremos','estaréis','estarán'] },
    tener:   { en:'to have',     present:['tengo','tienes','tiene','tenemos','tenéis','tienen'],           preterite:['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'],              future:['tendré','tendrás','tendrá','tendremos','tendréis','tendrán'] },
    ir:      { en:'to go',       present:['voy','vas','va','vamos','vais','van'],                          preterite:['fui','fuiste','fue','fuimos','fuisteis','fueron'],                      future:['iré','irás','irá','iremos','iréis','irán'] },
    hacer:   { en:'to do/make',  present:['hago','haces','hace','hacemos','hacéis','hacen'],               preterite:['hice','hiciste','hizo','hicimos','hicisteis','hicieron'],              future:['haré','harás','hará','haremos','haréis','harán'] },
    querer:  { en:'to want',     present:['quiero','quieres','quiere','queremos','queréis','quieren'],     preterite:['quise','quisiste','quiso','quisimos','quisisteis','quisieron'],          future:['querré','querrás','querrá','querremos','querréis','querrán'] },
    comer:   { en:'to eat',      present:['como','comes','come','comemos','coméis','comen'],               preterite:['comí','comiste','comió','comimos','comisteis','comieron'],              future:['comeré','comerás','comerá','comeremos','comeréis','comerán'] },
    vivir:   { en:'to live',     present:['vivo','vives','vive','vivimos','vivís','viven'],                preterite:['viví','viviste','vivió','vivimos','vivisteis','vivieron'],              future:['viviré','vivirás','vivirá','viviremos','viviréis','vivirán'] },
    poder:   { en:'to be able',  present:['puedo','puedes','puede','podemos','podéis','pueden'],           preterite:['pude','pudiste','pudo','pudimos','pudisteis','pudieron'],              future:['podré','podrás','podrá','podremos','podréis','podrán'] },
    saber:   { en:'to know',     present:['sé','sabes','sabe','sabemos','sabéis','saben'],                 preterite:['supe','supiste','supo','supimos','supisteis','supieron'],              future:['sabré','sabrás','sabrá','sabremos','sabréis','sabrán'] },
    venir:   { en:'to come',     present:['vengo','vienes','viene','venimos','venís','vienen'],            preterite:['vine','viniste','vino','vinimos','vinisteis','vinieron'],              future:['vendré','vendrás','vendrá','vendremos','vendréis','vendrán'] },
    decir:   { en:'to say/tell', present:['digo','dices','dice','decimos','decís','dicen'],                preterite:['dije','dijiste','dijo','dijimos','dijisteis','dijeron'],               future:['diré','dirás','dirá','diremos','diréis','dirán'] },
    dar:     { en:'to give',     present:['doy','das','da','damos','dais','dan'],                          preterite:['di','diste','dio','dimos','disteis','dieron'],                         future:['daré','darás','dará','daremos','daréis','darán'] },
    poner:   { en:'to put/place',present:['pongo','pones','pone','ponemos','ponéis','ponen'],              preterite:['puse','pusiste','puso','pusimos','pusisteis','pusieron'],              future:['pondré','pondrás','pondrá','pondremos','pondréis','pondrán'] },
  },

  subjects: ['yo','tú','él/ella','nosotros','vosotros','ellos/ellas'],

  grammar: {
    present: {
      name: 'Present',
      fullName: 'Presente',
      colour: '#3dd6ac',
      rule: 'Actions happening now, habits, and general truths.',
      signals: ['ahora','hoy','siempre','normalmente','todos los días','cada semana'],
      formation: 'Remove –ar/–er/–ir, add personal ending.',
      endings: { ar:['–o','–as','–a','–amos','–áis','–an'], er:['–o','–es','–e','–emos','–éis','–en'], ir:['–o','–es','–e','–imos','–ís','–en'] },
      example: { verb:'hablar', forms:['hablo','hablas','habla','hablamos','habláis','hablan'] },
      watchOut: 'Many common verbs are irregular: tengo, soy, estoy, voy, hago, digo…'
    },
    preterite: {
      name: 'Preterite',
      fullName: 'Pretérito Indefinido',
      colour: '#e8a838',
      rule: 'Completed actions at a specific point in the past.',
      signals: ['ayer','anoche','el año pasado','la semana pasada','hace dos días','el lunes','en 2020'],
      formation: 'Remove –ar/–er/–ir, add preterite ending.',
      endings: { ar:['–é','–aste','–ó','–amos','–asteis','–aron'], er_ir:['–í','–iste','–ió','–imos','–isteis','–ieron'] },
      example: { verb:'hablar', forms:['hablé','hablaste','habló','hablamos','hablasteis','hablaron'] },
      watchOut: 'Many irregulars: fui/fue (ir/ser), tuve (tener), hice (hacer), vine (venir)…'
    },
    imperfect: {
      name: 'Imperfect',
      fullName: 'Pretérito Imperfecto',
      colour: '#ff9664',
      rule: 'Ongoing/habitual past actions, descriptions, background scenes, and "used to".',
      signals: ['cuando era niño','siempre','todos los días','antes','mientras','a menudo','cada verano'],
      formation: 'Remove –ar/–er/–ir, add imperfect ending.',
      endings: { ar:['–aba','–abas','–aba','–ábamos','–abais','–aban'], er_ir:['–ía','–ías','–ía','–íamos','–íais','–ían'] },
      example: { verb:'hablar', forms:['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'] },
      watchOut: 'Only 3 irregular verbs: ser (era), ir (iba), ver (veía). Very regular otherwise!'
    },
    perfect: {
      name: 'Present perfect',
      fullName: 'Pretérito Perfecto',
      colour: '#ffb432',
      rule: 'Recent past or actions with a connection to the present. Like English "have done".',
      signals: ['hoy','esta semana','este año','ya','todavía no','alguna vez','nunca','recientemente'],
      formation: 'haber (present) + past participle (–ado/–ido)',
      endings: { haver:['he','has','ha','hemos','habéis','han'], ar:'–ado', er_ir:'–ido' },
      example: { verb:'hablar', forms:['he hablado','has hablado','ha hablado','hemos hablado','habéis hablado','han hablado'] },
      watchOut: 'Irregular participles: hecho (hacer), dicho (decir), visto (ver), ido (ir), sido (ser), tenido→regular but note: abierto (abrir), escrito (escribir), vuelto (volver).'
    },
    future: {
      name: 'Future',
      fullName: 'Futuro Simple',
      colour: '#5b9cf6',
      rule: 'Actions that will happen. Also used to speculate about the present.',
      signals: ['mañana','el año que viene','esta tarde','el verano que viene','pronto','en el futuro','el próximo mes'],
      formation: 'Full infinitive + future ending (no stem change for regular verbs).',
      endings: { all:['–é','–ás','–á','–emos','–éis','–án'] },
      example: { verb:'hablar', forms:['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán'] },
      watchOut: 'Irregular stems: tendr– (tener), harr– (hacer), querr– (querer), podr– (poder), vendr– (venir), dir– (decir), saldr– (salir).'
    },
    conditional: {
      name: 'Conditional',
      fullName: 'Condicional Simple',
      colour: '#c864dc',
      rule: 'What would happen. Hypotheticals, polite requests, and reported speech.',
      signals: ['si tuviera...','me gustaría','¿podría...?','querría','en tu lugar'],
      formation: 'Full infinitive + conditional ending (same irregular stems as future).',
      endings: { all:['–ía','–ías','–ía','–íamos','–íais','–ían'] },
      example: { verb:'hablar', forms:['hablaría','hablarías','hablaría','hablaríamos','hablaríais','hablarían'] },
      watchOut: 'Same irregular stems as future: tendr–, har–, querr–, podr–, vendr–, dir–, saldr–. Endings are always regular.'
    },
    subjunctive: {
      name: 'Subjunctive',
      fullName: 'Presente de Subjuntivo',
      colour: '#b482ff',
      rule: 'Doubt, emotion, wishes, recommendations, and "that someone does something".',
      signals: ['quiero que...','espero que...','es importante que...','ojalá','tal vez','quizás','no creo que...'],
      formation: 'Take yo present form, drop –o, add "opposite" endings (–ar verbs take –e endings, –er/–ir take –a endings).',
      endings: { ar:['–e','–es','–e','–emos','–éis','–en'], er_ir:['–a','–as','–a','–amos','–áis','–an'] },
      example: { verb:'hablar', forms:['hable','hables','hable','hablemos','habléis','hablen'] },
      watchOut: 'Triggered by specific structures: querer que, esperar que, es necesario que… The "boot" irregulars carry over from the present tense.'
    },
    pluperfect: {
      name: 'Pluperfect',
      fullName: 'Pretérito Pluscuamperfecto',
      colour: '#96b4ff',
      rule: 'The "past of the past" — what had already happened before another past event.',
      signals: ['ya...cuando','antes de que','nunca antes','hacía años que','ya había...'],
      formation: 'haber (imperfect) + past participle (–ado/–ido)',
      endings: { haver:['había','habías','había','habíamos','habíais','habían'], ar:'–ado', er_ir:'–ido' },
      example: { verb:'hablar', forms:['había hablado','habías hablado','había hablado','habíamos hablado','habíais hablado','habían hablado'] },
      watchOut: 'Same irregular participles as perfect: hecho, dicho, visto, ido, sido, abierto, escrito, vuelto.'
    },
  },

  irregulars: ['ser','ir','tener','estar','hacer','querer','poder','saber','venir','decir','dar','poner'],

  tenseQuestions: [
    // PRESENT
    { es:'Ahora mismo estoy en casa.',                      en:'Right now I am at home.',                            answer:'present',     why:'<strong>Ahora mismo</strong> (right now) signals the present moment. <strong>Estoy</strong> is the present of <em>estar</em> for "yo" — used for temporary states and locations.' },
    { es:'Ella quiere hablar contigo.',                     en:'She wants to talk to you.',                          answer:'present',     why:'No time markers — a current desire. <strong>Quiere</strong> is present of <em>querer</em> for él/ella. Note the stem change: quer– → quier– (e→ie).' },
    { es:'Tenemos dos gatos en casa.',                      en:'We have two cats at home.',                          answer:'present',     why:'A general fact. <strong>Tenemos</strong> is present of <em>tener</em> for "nosotros". Note: "yo" form is <em>tengo</em> — irregular "go" ending.' },
    { es:'Siempre desayuno café con leche.',                en:'I always have café con leche for breakfast.',        answer:'present',     why:'<strong>Siempre</strong> (always) signals a habitual action — present tense. <strong>Desayuno</strong> is the present of <em>desayunar</em> for "yo".' },
    { es:'¿Hablas español en el trabajo?',                  en:'Do you speak Spanish at work?',                     answer:'present',     why:'A question about a current/general habit. <strong>Hablas</strong> is present of <em>hablar</em> for "tú". No time marker needed — habitual actions use the present.' },
    // PRETERITE
    { es:'Ayer fui al mercado con mi madre.',               en:'Yesterday I went to the market with my mother.',     answer:'preterite',   why:'<strong>Ayer</strong> (yesterday) signals a completed past action. <strong>Fui</strong> is the preterite of <em>ir</em> for "yo" — irregular.' },
    { es:'El año pasado tuvimos un perro.',                 en:'Last year we had a dog.',                            answer:'preterite',   why:'<strong>El año pasado</strong> (last year) marks a specific completed period. <strong>Tuvimos</strong> is the preterite of <em>tener</em> — irregular stem: tuv–.' },
    { es:'¿Qué hiciste el fin de semana?',                  en:'What did you do at the weekend?',                   answer:'preterite',   why:'<strong>El fin de semana</strong> = a specific completed time. <strong>Hiciste</strong> is the preterite of <em>hacer</em> for "tú" — irregular stem: hic–.' },
    { es:'Mi abuela habló con el médico.',                  en:'My grandmother spoke to the doctor.',                answer:'preterite',   why:'A completed past action. <strong>Habló</strong> is the preterite of <em>hablar</em> for él/ella — regular –ar verb: –ó ending.' },
    { es:'Llegaron tarde a la reunión.',                    en:'They arrived late to the meeting.',                  answer:'preterite',   why:'A completed event. <strong>Llegaron</strong> is the preterite of <em>llegar</em> for ellos — regular –ar ending: –aron.' },
    // IMPERFECT
    { es:'Cuando era niño, vivía en el campo.',             en:'When I was a child, I lived in the countryside.',    answer:'imperfect',   why:'<strong>Cuando era niño</strong> signals a habitual past state. <strong>Vivía</strong> is the imperfect of <em>vivir</em> — describes an ongoing situation, not a single event.' },
    { es:'El sol brillaba y los pájaros cantaban.',         en:'The sun was shining and the birds were singing.',    answer:'imperfect',   why:'A background scene being described. <strong>Brillaba</strong> and <strong>cantaban</strong> are imperfect — setting the scene for a story, not completed actions.' },
    { es:'De pequeña, siempre comía con mis abuelos.',      en:'As a child I always used to eat with my grandparents.', answer:'imperfect', why:'<strong>De pequeña</strong> + <strong>siempre</strong> = habitual past. <strong>Comía</strong> is the imperfect of <em>comer</em> — "used to eat" regularly.' },
    { es:'Mientras estudiaba, sonó el teléfono.',           en:'While I was studying, the phone rang.',              answer:'imperfect',   why:'<strong>Mientras</strong> (while) + background action = imperfect. <strong>Estudiaba</strong> was the ongoing activity when something else (sonó, preterite) interrupted it.' },
    // PRESENT PERFECT
    { es:'He comido demasiado hoy.',                        en:'I have eaten too much today.',                       answer:'perfect',     why:'<strong>Hoy</strong> (today) links the action to the present day. <strong>He comido</strong> = he (yo, present of haber) + comido (past participle of comer).' },
    { es:'¿Has visto esta película alguna vez?',            en:'Have you ever seen this film?',                      answer:'perfect',     why:'<strong>Alguna vez</strong> (ever) signals a life experience with present relevance. <strong>Has visto</strong> = has (tú) + visto (irregular participle of ver).' },
    { es:'Esta semana hemos trabajado mucho.',              en:'This week we have worked a lot.',                    answer:'perfect',     why:'<strong>Esta semana</strong> (this week — still ongoing) connects the action to now. <strong>Hemos trabajado</strong> = hemos + trabajado (regular –ar participle).' },
    { es:'Todavía no han llegado.',                         en:'They still haven\'t arrived.',                       answer:'perfect',     why:'<strong>Todavía no</strong> (still not) = relevance to present moment. <strong>Han llegado</strong> = han (ellos, haber) + llegado (past participle of llegar).' },
    // FUTURE
    { es:'Mañana comeré pizza con mis amigos.',             en:'Tomorrow I will eat pizza with my friends.',         answer:'future',      why:'<strong>Mañana</strong> (tomorrow) signals a future event. <strong>Comeré</strong> = comer + –é (yo future ending). Future = infinitive + ending.' },
    { es:'El verano que viene iremos a España.',            en:'Next summer we will go to Spain.',                   answer:'future',      why:'<strong>El verano que viene</strong> (next summer) signals a future plan. <strong>Iremos</strong> is the future of <em>ir</em> for "nosotros".' },
    { es:'Haré los deberes esta tarde.',                    en:'I will do the homework this afternoon.',             answer:'future',      why:'<strong>Esta tarde</strong> = still to come. <strong>Haré</strong> = irregular future of <em>hacer</em> — stem changes to <strong>har–</strong> + –é.' },
    { es:'¿Vendrás a la fiesta el sábado?',                 en:'Will you come to the party on Saturday?',           answer:'future',      why:'<strong>El sábado</strong> is a future event. <strong>Vendrás</strong> = irregular future of <em>venir</em> — stem: <strong>vendr–</strong> + –ás.' },
    // CONDITIONAL
    { es:'Me gustaría un café, por favor.',                 en:'I would like a coffee, please.',                    answer:'conditional', why:'<strong>Me gustaría</strong> = conditional of <em>gustar</em>. The conditional is used for polite requests — softer than the present tense.' },
    { es:'Si tuviera más tiempo, aprendería japonés.',      en:'If I had more time, I would learn Japanese.',        answer:'conditional', why:'<strong>Si tuviera…</strong> is a hypothetical. <strong>Aprendería</strong> = conditional of <em>aprender</em> for "yo" — infinitive + –ía.' },
    { es:'Dijo que vendría a las ocho.',                    en:'He said he would come at eight.',                   answer:'conditional', why:'Reported speech — what someone said they <em>would</em> do. <strong>Vendría</strong> = conditional of <em>venir</em> — irregular stem <strong>vendr–</strong> + –ía.' },
    // SUBJUNCTIVE
    { es:'Espero que tengas un buen día.',                  en:'I hope you have a good day.',                       answer:'subjunctive', why:'<strong>Espero que</strong> (I hope that) triggers the subjunctive. <strong>Tengas</strong> is subjunctive of <em>tener</em> for "tú" — take yo form (tengo), drop –o, add –as.' },
    { es:'Es importante que comáis bien.',                  en:'It\'s important that you eat well.',                answer:'subjunctive', why:'<strong>Es importante que</strong> triggers the subjunctive. <strong>Comáis</strong> is subjunctive of <em>comer</em> for "vosotros" — –er verb takes –a endings in the subjunctive.' },
    { es:'Quiero que vengas a la fiesta.',                  en:'I want you to come to the party.',                  answer:'subjunctive', why:'<strong>Quiero que</strong> (I want someone to…) always triggers the subjunctive. <strong>Vengas</strong> = subjunctive of <em>venir</em> for "tú".' },
    // PLUPERFECT
    { es:'Cuando llegué, ella ya había salido.',            en:'When I arrived, she had already left.',             answer:'pluperfect',  why:'<strong>Ya había salido</strong> = the "past of the past". She left <em>before</em> I arrived. <strong>Había</strong> (imperfect of haber) + <strong>salido</strong> (participle of salir).' },
    { es:'Nunca antes había viajado en avión.',             en:'I had never before travelled by plane.',            answer:'pluperfect',  why:'<strong>Nunca antes había</strong> = something that had (or hadn\'t) happened up to a point. <strong>Había viajado</strong> = pluperfect of <em>viajar</em>.' },
    { es:'Ya habíamos comido cuando llegaron.',             en:'We had already eaten when they arrived.',           answer:'pluperfect',  why:'<strong>Ya habíamos comido</strong> happened first, then <em>llegaron</em> (preterite). The pluperfect marks the earlier of two past events.' },
  ],

  builderSentences: [
    { parts:['Ayer','comí','una pizza deliciosa','con mi familia'],   answer:'Ayer comí una pizza deliciosa con mi familia',   translation:'Yesterday I ate a delicious pizza with my family',   tense:'preterite', why:'<strong>Ayer</strong> (yesterday) opens as the time reference. <strong>Comí</strong> = comer preterite for "yo". Order: Time → Verb → Object → Context.' },
    { parts:['Mañana','iremos','al cine','juntos'],                    answer:'Mañana iremos al cine juntos',                    translation:'Tomorrow we will go to the cinema together',         tense:'future',    why:'<strong>Mañana</strong> opens the sentence. <strong>Iremos</strong> = ir future for "nosotros". <em>Ir</em> uses its full infinitive as the future stem.' },
    { parts:['Ahora mismo','tengo','mucho trabajo','en casa'],         answer:'Ahora mismo tengo mucho trabajo en casa',         translation:'Right now I have a lot of work at home',             tense:'present',   why:'<strong>Ahora mismo</strong> anchors us in the present. <strong>Tengo</strong> = tener present "yo" — irregular "go" ending. Location phrase comes last.' },
    { parts:['El año pasado','fui','a Madrid','con mis amigos'],       answer:'El año pasado fui a Madrid con mis amigos',       translation:'Last year I went to Madrid with my friends',         tense:'preterite', why:'<strong>El año pasado</strong> = last year, a completed period. <strong>Fui</strong> is preterite of both <em>ir</em> and <em>ser</em> — context tells us it\'s <em>ir</em>.' },
    { parts:['Este verano','haré','un viaje','a Barcelona'],           answer:'Este verano haré un viaje a Barcelona',           translation:'This summer I will take a trip to Barcelona',        tense:'future',    why:'<strong>Este verano</strong> = this summer (future). <strong>Haré</strong> = hacer future for "yo" — irregular stem <strong>har–</strong> + –é.' },
    { parts:['La semana pasada','ella','habló con','su profesora'],    answer:'La semana pasada ella habló con su profesora',    translation:'Last week she spoke with her teacher',               tense:'preterite', why:'<strong>La semana pasada</strong> = last week. <strong>Habló</strong> = regular –ar preterite for él/ella. Subject pronoun <em>ella</em> comes after the time phrase.' },
    { parts:['El próximo año','nosotros','viviremos','en España'],     answer:'El próximo año nosotros viviremos en España',     translation:'Next year we will live in Spain',                    tense:'future',    why:'<strong>El próximo año</strong> = next year. <strong>Viviremos</strong> = vivir future for "nosotros" — regular, add –emos to the infinitive.' },
  ],

  stories: [
    {
      title: 'Un día en Barcelona',
      intro: 'Elena is spending a week in Barcelona. Read along and choose the correct verb forms.',
      focus: 'Mixed tenses — present, preterite, future',
      segments: [
        { es:'Elena se despertó temprano. El sol ya ___ en el cielo.',   en:'Elena woke up early. The sun was already ___ in the sky.',        opts:['estaba','estará','está','estuvo'],    answer:'estaba',  why:'<strong>Estaba</strong> = imperfect of <em>estar</em>. The imperfect describes a background state — the sun being in the sky is scene-setting, not a completed event.' },
        { es:'Ayer ella ___ al mercado de la Boqueria.',                  en:'Yesterday she ___ to the Boqueria market.',                        opts:['fue','va','irá','iba'],               answer:'fue',     why:'<strong>Fue</strong> = preterite of <em>ir</em>. <strong>Ayer</strong> (yesterday) signals a specific completed past action.' },
        { es:'Hoy por la tarde, Elena ___ al museo Picasso.',             en:'This afternoon, Elena ___ to the Picasso museum.',                 opts:['irá','fue','va','iba'],               answer:'irá',     why:'<strong>Irá</strong> = future of <em>ir</em> for él/ella. <strong>Hoy por la tarde</strong> refers to something still to come.' },
        { es:'Clara le dijo: "Mañana yo ___ a verte."',                  en:'Clara said: "Tomorrow I ___ to see you."',                         opts:['iré','fui','voy','iba'],              answer:'iré',     why:'<strong>Iré</strong> = future of <em>ir</em> for "yo". Even though <em>dijo</em> is past, Clara is making a future promise inside the quote.' },
        { es:'Esta mañana Elena ___ un café con leche y un croissant.',  en:'This morning Elena ___ a café con leche and a croissant.',         opts:['tomó','tomará','toma','tomaba'],      answer:'tomó',    why:'<strong>Tomó</strong> = preterite of <em>tomar</em>. <strong>Esta mañana</strong> = a completed time earlier today.' },
      ]
    },
    {
      title: 'El viaje de Marco',
      intro: 'Marco is planning a big trip. Help tell his story by choosing the right verb forms.',
      focus: 'Present, preterite and future mixed',
      segments: [
        { es:'Marco ___ en Madrid toda su vida.',                        en:'Marco ___ in Madrid his whole life.',                              opts:['ha vivido','vivió','vivirá','vive'],  answer:'vive',    why:'<strong>Vive</strong> = present of <em>vivir</em>. He still lives there now — an ongoing state uses the present tense.' },
        { es:'El año pasado, él ___ a visitar a su familia en México.',  en:'Last year, he ___ to visit his family in Mexico.',                 opts:['fue','va','irá','iba'],               answer:'fue',     why:'<strong>Fue</strong> = preterite of <em>ir</em>. <strong>El año pasado</strong> marks a specific completed trip.' },
        { es:'Ahora mismo, Marco ___ los vuelos para el verano.',        en:'Right now, Marco ___ the flights for the summer.',                 opts:['busca','buscó','buscará','buscaba'],  answer:'busca',   why:'<strong>Busca</strong> = present of <em>buscar</em>. <strong>Ahora mismo</strong> = present tense. He\'s actively searching at this moment.' },
        { es:'El próximo julio, Marco y su novia ___ a Argentina.',      en:'Next July, Marco and his girlfriend ___ to Argentina.',            opts:['viajarán','viajaron','viajan','viajaban'], answer:'viajarán', why:'<strong>Viajarán</strong> = future of <em>viajar</em> for ellos. <strong>El próximo julio</strong> = next July, a future time.' },
        { es:'Su novia le dijo: "¡Yo nunca ___ a Sudamérica antes!"',   en:'His girlfriend said: "I have never ___ to South America before!"', opts:['he ido','fui','voy','iré'],           answer:'fui',     why:'<strong>Fui</strong> = preterite of <em>ir</em> for "yo". A specific past experience (or lack of it).' },
      ]
    },
    {
      title: 'La tormenta',
      intro: 'A storm interrupts a quiet evening. This story focuses on the difference between imperfect (background) and preterite (events).',
      focus: 'Imperfect vs Preterite — the key distinction',
      segments: [
        { es:'Era una noche tranquila. La luna ___ sobre el mar.',       en:'It was a quiet night. The moon ___ over the sea.',                 opts:['brillaba','brilló','brillará','brilla'], answer:'brillaba', why:'<strong>Brillaba</strong> = imperfect of <em>brillar</em>. This is background description — the moon shining is the scene-setting, not a single event.' },
        { es:'De repente, ___ un rayo enorme.',                          en:'Suddenly, a huge lightning bolt ___.',                             opts:['cayó','caía','cae','caerá'],          answer:'cayó',    why:'<strong>Cayó</strong> = preterite of <em>caer</em>. <strong>De repente</strong> (suddenly) signals a single, completed event — the bolt struck once.' },
        { es:'Los niños ___ en el salón cuando empezó la tormenta.',    en:'The children ___ in the living room when the storm started.',     opts:['jugaban','jugaron','juegan','jugarán'], answer:'jugaban', why:'<strong>Jugaban</strong> = imperfect of <em>jugar</em>. This is the ongoing background activity — they <em>were playing</em> when something interrupted them.' },
        { es:'Su madre ___ a la ventana y la cerró rápidamente.',       en:'Their mother ___ to the window and closed it quickly.',           opts:['corrió','corría','corre','correrá'],  answer:'corrió',  why:'<strong>Corrió</strong> = preterite of <em>correr</em>. A single, completed action — she ran to the window once.' },
        { es:'Al final, todos ___ juntos y esperaron a que pasara.',    en:'In the end, everyone ___ together and waited for it to pass.',    opts:['se sentaron','se sentaban','se sientan','se sentarán'], answer:'se sentaron', why:'<strong>Se sentaron</strong> = preterite of <em>sentarse</em>. Another completed, specific action — they sat down as a single event.' },
      ]
    },
    {
      title: 'Ojalá pudiera...',
      intro: 'Ana is daydreaming about what she would do if things were different. This story practises the conditional and subjunctive.',
      focus: 'Conditional & Subjunctive',
      segments: [
        { es:'Si tuviera más dinero, ___ un viaje alrededor del mundo.', en:'If I had more money, I ___ a trip around the world.',             opts:['haría','hago','haré','hice'],         answer:'haría',   why:'<strong>Haría</strong> = conditional of <em>hacer</em>. After <strong>si tuviera</strong> (if I had — hypothetical), we use the conditional for the result.' },
        { es:'Ana ___ vivir en Italia si pudiera.',                      en:'Ana ___ live in Italy if she could.',                              opts:['querría','quiere','quiso','querrá'],  answer:'querría', why:'<strong>Querría</strong> = conditional of <em>querer</em> for él/ella. A hypothetical wish — what she <em>would</em> want.' },
        { es:'Su jefa le dijo: "Espero que ___ en el trabajo."',        en:'Her boss said to her: "I hope you ___ at work."',                 opts:['estés','estás','estarás','estuvieras'], answer:'estés',  why:'<strong>Estés</strong> = present subjunctive of <em>estar</em> for "tú". <strong>Espero que</strong> always triggers the subjunctive.' },
        { es:'Ana ___ trabajar menos horas cada semana.',               en:'Ana ___ work fewer hours each week.',                              opts:['preferiría','prefiere','prefirió','preferirá'], answer:'preferiría', why:'<strong>Preferiría</strong> = conditional of <em>preferir</em>. A hypothetical preference — what she <em>would</em> prefer.' },
        { es:'Es importante que todo el mundo ___ sus sueños.',         en:'It\'s important that everyone ___ their dreams.',                 opts:['persiga','persigue','persiguió','perseguirá'], answer:'persiga', why:'<strong>Persiga</strong> = present subjunctive of <em>perseguir</em>. <strong>Es importante que</strong> always triggers the subjunctive.' },
      ]
    },
    {
      title: 'Antes y después',
      intro: 'Roberto looks back on his life. This story mixes the present perfect (have done) and pluperfect (had done).',
      focus: 'Present perfect & Pluperfect',
      segments: [
        { es:'Roberto ___ mucho en su vida.',                            en:'Roberto ___ a lot in his life.',                                  opts:['ha viajado','viajó','viajaba','viajará'], answer:'ha viajado', why:'<strong>Ha viajado</strong> = present perfect of <em>viajar</em>. A life experience with ongoing relevance — he\'s still alive, still has that experience.' },
        { es:'Cuando llegó a París, nunca ___ el mar antes.',           en:'When he arrived in Paris, he had never ___ the sea before.',      opts:['había visto','ha visto','vio','veía'],  answer:'había visto', why:'<strong>Había visto</strong> = pluperfect of <em>ver</em>. He had (or hadn\'t) seen the sea <em>before</em> arriving in Paris — the earlier of two past events.' },
        { es:'Este año, Roberto ___ a aprender a cocinar.',             en:'This year, Roberto ___ to learn to cook.',                        opts:['ha empezado','empezó','empezaba','empezará'], answer:'ha empezado', why:'<strong>Ha empezado</strong> = present perfect. <strong>Este año</strong> (this year — still ongoing) links the action to the present.' },
        { es:'Ya ___ tres libros cuando su amigo llegó.',               en:'He had already ___ three books when his friend arrived.',         opts:['había leído','ha leído','leyó','leía'], answer:'había leído', why:'<strong>Había leído</strong> = pluperfect. <strong>Ya</strong> (already) + something that happened before another past event = pluperfect.' },
        { es:'Ahora dice: "Nunca ___ tan feliz como hoy."',            en:'He now says: "I have never ___ as happy as today."',              opts:['he sido','fui','era','seré'],           answer:'he sido',    why:'<strong>He sido</strong> = present perfect of <em>ser</em>. He\'s reflecting on his whole life up to now — the present perfect connects the past to the present moment.' },
      ]
    },
    {
      title: 'El primer día de trabajo',
      intro: 'Sara starts a new job. This story mixes ser and estar — one of the trickiest distinctions in Spanish.',
      focus: 'Ser vs Estar',
      segments: [
        { es:'Sara ___ muy nerviosa antes de entrar.',                  en:'Sara ___ very nervous before going in.',                          opts:['estaba','era','estuvo','fue'],        answer:'estaba',  why:'<strong>Estaba</strong> = imperfect of <em>estar</em>. Nervousness is a <em>temporary</em> emotional state — estar is always used for temporary feelings.' },
        { es:'La oficina ___ en el centro de la ciudad.',              en:'The office ___ in the city centre.',                               opts:['estaba','era','estuvo','fue'],        answer:'estaba',  why:'<strong>Estaba</strong> = imperfect of <em>estar</em>. Location (where something is/was) always uses <em>estar</em>, not <em>ser</em>.' },
        { es:'Su nuevo jefe ___ muy simpático.',                       en:'Her new boss ___ very friendly.',                                  opts:['era','estaba','fue','estuvo'],        answer:'era',     why:'<strong>Era</strong> = imperfect of <em>ser</em>. Personality traits are permanent characteristics — always use <em>ser</em> for character descriptions.' },
        { es:'La reunión ___ a las diez de la mañana.',                en:'The meeting ___ at ten in the morning.',                          opts:['era','estaba','fue','estuvo'],        answer:'era',     why:'<strong>Era</strong> = imperfect of <em>ser</em>. Scheduled times and events use <em>ser</em> — "the meeting is at ten" uses ser in Spanish.' },
        { es:'Al final del día, Sara ___ agotada pero contenta.',      en:'At the end of the day, Sara ___ exhausted but happy.',            opts:['estaba','era','estuvo','fue'],        answer:'estaba',  why:'<strong>Estaba</strong> = imperfect of <em>estar</em>. Both exhausted and happy are temporary states resulting from the day\'s events — usar estar.' },
      ]
    },
  ],

  // ── TOPICS VOCABULARY ──────────────────────────────────────────────────────

  topics: [
    {
      id: 'time',
      title: 'Time',
      icon: '🕐',
      desc: 'Telling the time, parts of the day',
      colour: '#3dd6ac',
      sections: [
        { title:'Numbers 1–30', items:[
          {es:'uno',en:'one'},{es:'dos',en:'two'},{es:'tres',en:'three'},{es:'cuatro',en:'four'},{es:'cinco',en:'five'},
          {es:'seis',en:'six'},{es:'siete',en:'seven'},{es:'ocho',en:'eight'},{es:'nueve',en:'nine'},{es:'diez',en:'ten'},
          {es:'once',en:'eleven'},{es:'doce',en:'twelve'},{es:'trece',en:'thirteen'},{es:'catorce',en:'fourteen'},{es:'quince',en:'fifteen'},
          {es:'dieciséis',en:'sixteen'},{es:'diecisiete',en:'seventeen'},{es:'dieciocho',en:'eighteen'},{es:'diecinueve',en:'nineteen'},{es:'veinte',en:'twenty'},
          {es:'veintiuno',en:'twenty-one'},{es:'veintidós',en:'twenty-two'},{es:'veintitrés',en:'twenty-three'},{es:'veinticuatro',en:'twenty-four'},{es:'veinticinco',en:'twenty-five'},
          {es:'veintiséis',en:'twenty-six'},{es:'veintisiete',en:'twenty-seven'},{es:'veintiocho',en:'twenty-eight'},{es:'veintinueve',en:'twenty-nine'},{es:'treinta',en:'thirty'},
        ]},
        { title:'Bigger numbers', items:[
          {es:'cuarenta',en:'forty'},{es:'cincuenta',en:'fifty'},{es:'sesenta',en:'sixty'},{es:'setenta',en:'seventy'},
          {es:'ochenta',en:'eighty'},{es:'noventa',en:'ninety'},{es:'cien',en:'one hundred'},{es:'doscientos',en:'two hundred'},
          {es:'mil',en:'one thousand'},{es:'un millón',en:'one million'},
        ]},
        { title:'Parts of the day', items:[
          {es:'la mañana',en:'the morning'},{es:'el mediodía',en:'midday / noon'},{es:'la tarde',en:'the afternoon / evening'},
          {es:'la noche',en:'the night'},{es:'la medianoche',en:'midnight'},{es:'el amanecer',en:'dawn / sunrise'},
          {es:'el atardecer',en:'sunset / dusk'},{es:'ahora',en:'now'},{es:'pronto',en:'soon'},{es:'tarde',en:'late'},
          {es:'temprano',en:'early'},
        ]},
        { title:'Telling the time', items:[
          {es:'¿Qué hora es?',en:'What time is it?'},{es:'Es la una',en:'It\'s one o\'clock'},{es:'Son las dos',en:'It\'s two o\'clock'},
          {es:'Son las tres y media',en:'It\'s half past three'},{es:'Son las cuatro y cuarto',en:'It\'s quarter past four'},
          {es:'Son las cinco menos cuarto',en:'It\'s quarter to five'},{es:'Son las seis en punto',en:'It\'s six o\'clock exactly'},
          {es:'de la mañana',en:'in the morning (a.m.)'},{es:'de la tarde',en:'in the afternoon / evening (p.m.)'},
          {es:'de la noche',en:'at night'},
        ]},
      ]
    },
    {
      id: 'dates',
      title: 'Days, Months & Seasons',
      icon: '📅',
      desc: 'Days of the week, months, seasons',
      colour: '#5b9cf6',
      sections: [
        { title:'Days of the week', items:[
          {es:'lunes',en:'Monday'},{es:'martes',en:'Tuesday'},{es:'miércoles',en:'Wednesday'},
          {es:'jueves',en:'Thursday'},{es:'viernes',en:'Friday'},{es:'sábado',en:'Saturday'},{es:'domingo',en:'Sunday'},
          {es:'el fin de semana',en:'the weekend'},{es:'entre semana',en:'on weekdays'},{es:'hoy',en:'today'},
          {es:'ayer',en:'yesterday'},{es:'mañana',en:'tomorrow'},{es:'anteayer',en:'the day before yesterday'},
          {es:'pasado mañana',en:'the day after tomorrow'},
        ]},
        { title:'Months', items:[
          {es:'enero',en:'January'},{es:'febrero',en:'February'},{es:'marzo',en:'March'},{es:'abril',en:'April'},
          {es:'mayo',en:'May'},{es:'junio',en:'June'},{es:'julio',en:'July'},{es:'agosto',en:'August'},
          {es:'septiembre',en:'September'},{es:'octubre',en:'October'},{es:'noviembre',en:'November'},{es:'diciembre',en:'December'},
        ]},
        { title:'Seasons', items:[
          {es:'la primavera',en:'spring'},{es:'el verano',en:'summer'},{es:'el otoño',en:'autumn'},{es:'el invierno',en:'winter'},
          {es:'en primavera',en:'in spring'},{es:'en verano',en:'in summer'},{es:'en otoño',en:'in autumn'},{es:'en invierno',en:'in winter'},
        ]},
        { title:'Useful date phrases', items:[
          {es:'¿Qué día es hoy?',en:'What day is it today?'},{es:'¿Cuándo es tu cumpleaños?',en:'When is your birthday?'},
          {es:'el primero de enero',en:'the first of January'},{es:'el año pasado',en:'last year'},
          {es:'el año que viene',en:'next year'},{es:'la semana pasada',en:'last week'},
          {es:'la semana que viene',en:'next week'},{es:'el mes pasado',en:'last month'},
        ]},
      ]
    },
    {
      id: 'food',
      title: 'Food & Drink',
      icon: '🍽️',
      desc: 'Meals, food, drinks, restaurant phrases',
      colour: '#ff9664',
      sections: [
        { title:'Meals', items:[
          {es:'el desayuno',en:'breakfast'},{es:'el almuerzo',en:'lunch'},{es:'la cena',en:'dinner / supper'},
          {es:'la merienda',en:'afternoon snack'},{es:'el aperitivo',en:'aperitif / starter'},
          {es:'desayunar',en:'to have breakfast'},{es:'almorzar',en:'to have lunch'},{es:'cenar',en:'to have dinner'},
        ]},
        { title:'Common foods', items:[
          {es:'el pan',en:'bread'},{es:'el arroz',en:'rice'},{es:'la pasta',en:'pasta'},{es:'la carne',en:'meat'},
          {es:'el pescado',en:'fish'},{es:'el pollo',en:'chicken'},{es:'el queso',en:'cheese'},{es:'el huevo',en:'egg'},
          {es:'la fruta',en:'fruit'},{es:'la verdura',en:'vegetables'},{es:'la ensalada',en:'salad'},{es:'la sopa',en:'soup'},
          {es:'el bocadillo',en:'sandwich (baguette)'},{es:'las patatas fritas',en:'chips / crisps'},
        ]},
        { title:'Drinks', items:[
          {es:'el agua',en:'water'},{es:'el café',en:'coffee'},{es:'el café con leche',en:'white coffee'},
          {es:'el té',en:'tea'},{es:'el zumo',en:'juice'},{es:'la cerveza',en:'beer'},
          {es:'el vino',en:'wine'},{es:'el vino tinto',en:'red wine'},{es:'el vino blanco',en:'white wine'},
          {es:'el refresco',en:'soft drink'},{es:'la leche',en:'milk'},
        ]},
        { title:'Restaurant phrases', items:[
          {es:'Una mesa para dos, por favor',en:'A table for two, please'},{es:'La carta, por favor',en:'The menu, please'},
          {es:'¿Qué recomienda?',en:'What do you recommend?'},{es:'Quiero pedir...',en:'I\'d like to order...'},
          {es:'La cuenta, por favor',en:'The bill, please'},{es:'Está delicioso',en:'It\'s delicious'},
          {es:'Soy vegetariano/a',en:'I\'m vegetarian'},{es:'Tengo alergia a...',en:'I\'m allergic to...'},
          {es:'sin gluten',en:'gluten-free'},{es:'¿Está incluido el servicio?',en:'Is service included?'},
        ]},
      ]
    },
    {
      id: 'family',
      title: 'Family',
      icon: '👨‍👩‍👧',
      desc: 'Family members and relationships',
      colour: '#c864dc',
      sections: [
        { title:'Immediate family', items:[
          {es:'la madre',en:'mother'},{es:'el padre',en:'father'},{es:'los padres',en:'parents'},
          {es:'la hermana',en:'sister'},{es:'el hermano',en:'brother'},{es:'los hermanos',en:'siblings'},
          {es:'la hija',en:'daughter'},{es:'el hijo',en:'son'},{es:'los hijos',en:'children'},
          {es:'la mujer / la esposa',en:'wife'},{es:'el marido / el esposo',en:'husband'},
          {es:'la pareja',en:'partner / couple'},
        ]},
        { title:'Extended family', items:[
          {es:'la abuela',en:'grandmother'},{es:'el abuelo',en:'grandfather'},{es:'los abuelos',en:'grandparents'},
          {es:'la nieta',en:'granddaughter'},{es:'el nieto',en:'grandson'},
          {es:'la tía',en:'aunt'},{es:'el tío',en:'uncle'},{es:'la prima',en:'female cousin'},
          {es:'el primo',en:'male cousin'},{es:'la sobrina',en:'niece'},{es:'el sobrino',en:'nephew'},
        ]},
        { title:'Useful phrases', items:[
          {es:'Tengo dos hermanos',en:'I have two brothers'},{es:'Soy hijo único',en:'I\'m an only child (male)'},
          {es:'Soy hija única',en:'I\'m an only child (female)'},{es:'Estoy casado/a',en:'I\'m married'},
          {es:'Estoy soltero/a',en:'I\'m single'},{es:'Estoy divorciado/a',en:'I\'m divorced'},
          {es:'Tengo novio/novia',en:'I have a boyfriend/girlfriend'},{es:'¿Tienes hermanos?',en:'Do you have siblings?'},
        ]},
      ]
    },
    {
      id: 'travel',
      title: 'Travel',
      icon: '✈️',
      desc: 'Transport, directions, accommodation',
      colour: '#e8a838',
      sections: [
        { title:'Transport', items:[
          {es:'el avión',en:'plane'},{es:'el tren',en:'train'},{es:'el autobús',en:'bus'},{es:'el metro',en:'underground / metro'},
          {es:'el taxi',en:'taxi'},{es:'el coche',en:'car'},{es:'la bicicleta',en:'bicycle'},{es:'el barco',en:'ship / boat'},
          {es:'el vuelo',en:'flight'},{es:'el billete',en:'ticket'},{es:'la maleta',en:'suitcase'},
          {es:'el pasaporte',en:'passport'},{es:'la aduana',en:'customs'},
        ]},
        { title:'Directions', items:[
          {es:'¿Dónde está...?',en:'Where is...?'},{es:'a la derecha',en:'on the right'},{es:'a la izquierda',en:'on the left'},
          {es:'todo recto',en:'straight ahead'},{es:'gire a la derecha',en:'turn right'},{es:'gire a la izquierda',en:'turn left'},
          {es:'cerca',en:'nearby / close'},{es:'lejos',en:'far away'},{es:'enfrente de',en:'opposite / facing'},
          {es:'al lado de',en:'next to'},{es:'detrás de',en:'behind'},{es:'delante de',en:'in front of'},
        ]},
        { title:'Accommodation', items:[
          {es:'el hotel',en:'hotel'},{es:'el alojamiento',en:'accommodation'},{es:'la habitación',en:'room'},
          {es:'la habitación doble',en:'double room'},{es:'la habitación individual',en:'single room'},
          {es:'el desayuno incluido',en:'breakfast included'},{es:'la reserva',en:'booking / reservation'},
          {es:'hacer una reserva',en:'to make a reservation'},{es:'el check-in',en:'check-in'},{es:'el check-out',en:'check-out'},
        ]},
      ]
    },
    {
      id: 'professions',
      title: 'Professions',
      icon: '👨‍💼',
      desc: 'Jobs and what people do',
      colour: '#64c864',
      sections: [
        { title:'Common professions', items:[
          {es:'el/la médico/a',en:'doctor'},{es:'el/la enfermero/a',en:'nurse'},{es:'el/la profesor/a',en:'teacher'},
          {es:'el/la abogado/a',en:'lawyer'},{es:'el/la ingeniero/a',en:'engineer'},{es:'el/la arquitecto/a',en:'architect'},
          {es:'el/la periodista',en:'journalist'},{es:'el/la cocinero/a',en:'chef / cook'},{es:'el/la camarero/a',en:'waiter / waitress'},
          {es:'el/la policía',en:'police officer'},{es:'el/la bombero/a',en:'firefighter'},{es:'el/la dentista',en:'dentist'},
          {es:'el/la electricista',en:'electrician'},{es:'el/la fontanero/a',en:'plumber'},{es:'el/la diseñador/a',en:'designer'},
        ]},
        { title:'Work phrases', items:[
          {es:'¿En qué trabajas?',en:'What do you do for work?'},{es:'Soy médico',en:'I\'m a doctor'},
          {es:'Trabajo en...',en:'I work in...'},{es:'Trabajo de...',en:'I work as...'},
          {es:'la empresa',en:'company / business'},{es:'la oficina',en:'office'},{es:'el sueldo',en:'salary'},
          {es:'el jefe / la jefa',en:'boss'},{es:'el/la colega',en:'colleague'},{es:'la reunión',en:'meeting'},
          {es:'estar en paro',en:'to be unemployed'},{es:'jubilarse',en:'to retire'},
        ]},
      ]
    },
    {
      id: 'home',
      title: 'Home & Places',
      icon: '🏠',
      desc: 'Rooms, furniture, places in town',
      colour: '#96b4ff',
      sections: [
        { title:'Rooms', items:[
          {es:'la cocina',en:'kitchen'},{es:'el salón',en:'living room'},{es:'el comedor',en:'dining room'},
          {es:'el dormitorio',en:'bedroom'},{es:'el baño',en:'bathroom'},{es:'el aseo',en:'toilet'},
          {es:'el pasillo',en:'hallway / corridor'},{es:'el jardín',en:'garden'},{es:'el garaje',en:'garage'},
          {es:'el sótano',en:'basement'},{es:'el desván',en:'attic'},
        ]},
        { title:'Furniture & home items', items:[
          {es:'la cama',en:'bed'},{es:'el sofá',en:'sofa'},{es:'la silla',en:'chair'},{es:'la mesa',en:'table'},
          {es:'el armario',en:'wardrobe / cupboard'},{es:'la nevera',en:'fridge'},{es:'el horno',en:'oven'},
          {es:'la lavadora',en:'washing machine'},{es:'la ventana',en:'window'},{es:'la puerta',en:'door'},
          {es:'la lámpara',en:'lamp'},{es:'la alfombra',en:'carpet / rug'},
        ]},
        { title:'Places in town', items:[
          {es:'el supermercado',en:'supermarket'},{es:'la farmacia',en:'pharmacy'},{es:'el banco',en:'bank'},
          {es:'el hospital',en:'hospital'},{es:'la estación',en:'station'},{es:'el aeropuerto',en:'airport'},
          {es:'el ayuntamiento',en:'town hall'},{es:'la biblioteca',en:'library'},{es:'el parque',en:'park'},
          {es:'la plaza',en:'square / plaza'},{es:'la calle',en:'street'},{es:'el mercado',en:'market'},
        ]},
      ]
    },
  ]

,

  // ── HOMEWORK TESTS ──────────────────────────────────────────────────────

  homeworkTests: [
    {
      id: 'hw_ejercicio2',
      title: 'Ejercicio 2 — Verb forms',
      subtitle: 'Complete the table: Present → Pretérito Perfecto → Gerundio (-ing)',
      instructions: 'Each row shows one or two filled cells. Fill in the missing forms. The full infinitive + meaning is shown to help you.',
      type: 'verbTable',
      reference: {
        pretPerfecto: 'he / has / ha / hemos / habéis / han + past participle (–ar → –ado, –er/–ir → –ido)',
        gerundio: '–ar → –ando, –er/–ir → –iendo (special: leer→leyendo, oír→oyendo, ir→yendo)',
      },
      rows: [
        { present:'escucha',              pretPerf:'ha escuchado',     gerundio:'está escuchando',    infinitive:'escuchar',   meaning:'to listen',          subject:'él/ella',   given:'pretPerf' },
        { present:'esperamos',            pretPerf:'hemos esperado',   gerundio:'estamos esperando',  infinitive:'esperar',    meaning:'to wait/hope',       subject:'nosotros',  given:'present' },
        { present:'estoy viendo',         pretPerf:'he visto',         gerundio:'estoy viendo',       infinitive:'ver',        meaning:'to see/watch',       subject:'yo',        given:'gerundio', note:'ver is irregular: visto' },
        { present:'está creando',         pretPerf:'ha creado',        gerundio:'está creando',       infinitive:'crear',      meaning:'to create',          subject:'él/ella',   given:'gerundio' },
        { present:'entienden',            pretPerf:'han entendido',    gerundio:'están entendiendo',  infinitive:'entender',   meaning:'to understand',      subject:'ellos',     given:'pretPerf', note:'entender is irregular: entendido' },
        { present:'salgo',                pretPerf:'he salido',        gerundio:'estoy saliendo',     infinitive:'salir',      meaning:'to go out/leave',    subject:'yo',        given:'gerundio' },
        { present:'buscáis',              pretPerf:'habéis buscado',   gerundio:'estáis buscando',    infinitive:'buscar',     meaning:'to search/look for', subject:'vosotros',  given:'present' },
        { present:'miras',                pretPerf:'has mirado',       gerundio:'estás mirando',      infinitive:'mirar',      meaning:'to look/watch',      subject:'tú',        given:'present' },
        { present:'cierra',               pretPerf:'ha cerrado',       gerundio:'está cerrando',      infinitive:'cerrar',     meaning:'to close',           subject:'él/ella',   given:'pretPerf' },
        { present:'traduzco',             pretPerf:'he traducido',     gerundio:'estoy traduciendo',  infinitive:'traducir',   meaning:'to translate',       subject:'yo',        given:'gerundio' },
        { present:'abrís',                pretPerf:'habéis abierto',   gerundio:'estáis abriendo',    infinitive:'abrir',      meaning:'to open',            subject:'vosotros',  given:'pretPerf', note:'abrir is irregular: abierto' },
        { present:'creemos',              pretPerf:'hemos creído',     gerundio:'estamos creyendo',   infinitive:'creer',      meaning:'to believe',         subject:'nosotros',  given:'present', note:'creer: leyendo-style spelling change' },
        { present:'quieres',              pretPerf:'has querido',      gerundio:'estás queriendo',    infinitive:'querer',     meaning:'to want/love',       subject:'tú',        given:'pretPerf', note:'querer is irregular: querido' },
        { present:'vamos',                pretPerf:'hemos ido',        gerundio:'estamos yendo',      infinitive:'ir',         meaning:'to go',              subject:'nosotros',  given:'present', note:'ir is irregular: ido; gerundio: yendo' },
        { present:'hacen',                pretPerf:'han hecho',        gerundio:'están haciendo',     infinitive:'hacer',      meaning:'to do/make',         subject:'ellos',     given:'gerundio', note:'hacer is irregular: hecho' },
        { present:'conozco',              pretPerf:'he conocido',      gerundio:'estoy conociendo',   infinitive:'conocer',    meaning:'to know (people)',   subject:'yo',        given:'pretPerf' },
        { present:'está encontrando',     pretPerf:'ha encontrado',    gerundio:'está encontrando',   infinitive:'encontrar',  meaning:'to find',            subject:'él/ella',   given:'gerundio' },
        { present:'lleváis',              pretPerf:'habéis llevado',   gerundio:'estáis llevando',    infinitive:'llevar',     meaning:'to carry/wear',      subject:'vosotros',  given:'present' },
        { present:'pide',                 pretPerf:'ha pedido',        gerundio:'está pidiendo',      infinitive:'pedir',      meaning:'to ask for/order',   subject:'él/ella',   given:'pretPerf', note:'pedir stem change: pidiendo' },
        { present:'estamos escribiendo',  pretPerf:'hemos escrito',    gerundio:'estamos escribiendo',infinitive:'escribir',   meaning:'to write',           subject:'nosotros',  given:'gerundio', note:'escribir is irregular: escrito' },
        { present:'volvemos',             pretPerf:'hemos vuelto',     gerundio:'estamos volviendo',  infinitive:'volver',     meaning:'to return/come back',subject:'nosotros',  given:'present', note:'volver is irregular: vuelto' },
      ]
    },
    {
      id: 'hw_errores',
      title: 'Corrige los errores',
      subtitle: 'Este / Esta / Estos / Estas — gender & number agreement',
      instructions: 'Each sentence contains a gender or number agreement error with este/esta/estos/estas and/or the noun. Write the corrected sentence.',
      type: 'errorCorrection',
      reference: {
        rule: 'Demonstratives must agree with the noun in gender (masculine/feminine) and number (singular/plural).',
        table: [
          { dem:'este',  gender:'masc', number:'singular', example:'este libro' },
          { dem:'esta',  gender:'fem',  number:'singular', example:'esta mesa' },
          { dem:'estos', gender:'masc', number:'plural',   example:'estos libros' },
          { dem:'estas', gender:'fem',  number:'plural',   example:'estas mesas' },
        ]
      },
      sentences: [
        { wrong:'Este mesa está limpia.',          correct:'Esta mesa está limpia.',          error:'<em>mesa</em> is feminine — use <strong>esta</strong>', why:'Mesa (table) is feminine, so the demonstrative must also be feminine: <strong>esta</strong>.' },
        { wrong:'Estas libro está interesante.',   correct:'Este libro está interesante.',    error:'<em>libro</em> is masculine singular — use <strong>este</strong>', why:'Libro (book) is masculine singular. Use <strong>este</strong>, not <em>estas</em>.' },
        { wrong:'¿Dónde esta estos zapatos?',      correct:'¿Dónde están estos zapatos?',    error:'<em>estos zapatos</em> is plural — verb must be <strong>están</strong>', why:'Zapatos is plural, so estar must agree: <strong>están</strong>. (Also: <em>esta</em> → <em>están</em>.)' },
        { wrong:'Esta chicos están en clase.',     correct:'Estos chicos están en clase.',   error:'<em>chicos</em> is masculine plural — use <strong>estos</strong>', why:'Chicos (boys) is masculine plural. Use <strong>estos</strong>, not <em>esta</em>.' },
        { wrong:'Este sillas están rotas.',        correct:'Estas sillas están rotas.',      error:'<em>sillas</em> is feminine plural — use <strong>estas</strong>', why:'Sillas (chairs) is feminine plural. Use <strong>estas</strong>.' },
        { wrong:'Estas casa está lejos.',          correct:'Esta casa está lejos.',           error:'<em>casa</em> is feminine singular — use <strong>esta</strong>', why:'Casa (house) is feminine singular. Use <strong>esta</strong>, not <em>estas</em>.' },
        { wrong:'¿Este tu hermano en casa?',       correct:'¿Está tu hermano en casa?',      error:'Missing verb <strong>está</strong> — <em>este</em> is a demonstrative, not a verb', why:'<em>Este</em> is a demonstrative adjective. To ask if someone "is" somewhere, use the verb <strong>está</strong>.' },
        { wrong:'Estos mochila está en el suelo.', correct:'Esta mochila está en el suelo.', error:'<em>mochila</em> is feminine singular — use <strong>esta</strong>', why:'Mochila (backpack) is feminine singular. Use <strong>esta</strong>, not <em>estos</em>.' },
        { wrong:'Esta restaurante está cerrado.',  correct:'Este restaurante está cerrado.',  error:'<em>restaurante</em> is masculine — use <strong>este</strong>', why:'Restaurante is masculine. Use <strong>este</strong>, not <em>esta</em>.' },
        { wrong:'¿Dónde está este llaves?',        correct:'¿Dónde están estas llaves?',     error:'<em>llaves</em> is feminine plural — use <strong>estas</strong> and <strong>están</strong>', why:'Llaves (keys) is feminine plural. Need <strong>estas</strong> (fem plural) and <strong>están</strong> (plural verb).' },
        { wrong:'Este niñas están en el parque.',  correct:'Estas niñas están en el parque.',error:'<em>niñas</em> is feminine plural — use <strong>estas</strong>', why:'Niñas (girls) is feminine plural. Use <strong>estas</strong>.' },
        { wrong:'Estas coche está muy viejo.',     correct:'Este coche está muy viejo.',      error:'<em>coche</em> is masculine singular — use <strong>este</strong>', why:'Coche (car) is masculine singular. Use <strong>este</strong>, not <em>estas</em>.' },
        { wrong:'Este calles están vacías.',       correct:'Estas calles están vacías.',      error:'<em>calles</em> is feminine plural — use <strong>estas</strong>', why:'Calles (streets) is feminine plural. Use <strong>estas</strong>.' },
        { wrong:'¿Estas tu amiga en casa?',        correct:'¿Está tu amiga en casa?',         error:'Should be <strong>está</strong> (verb) not <em>estas</em> (demonstrative)', why:'Like #7 — <em>estas</em> is a demonstrative, not a verb. Use <strong>está</strong> to ask if someone is somewhere.' },
        { wrong:'Estos puerta está abierta.',      correct:'Esta puerta está abierta.',       error:'<em>puerta</em> is feminine singular — use <strong>esta</strong>', why:'Puerta (door) is feminine singular. Use <strong>esta</strong>, not <em>estos</em>.' },
      ]
    }
  ]

};
