/* ══════════════════════════════════════════════════════════
   TOPICS — Vocabulary by theme
   Flashcard mode and quiz mode for each topic
══════════════════════════════════════════════════════════ */

let topicState = {
  topicId: null,
  mode: null,       // 'flashcard' | 'quiz'
  direction: 'enToEs', // 'enToEs' | 'esToEn'
  sectionIdx: 0,
  itemIdx: 0,
  allItems: [],
  shuffled: [],
  quizIdx: 0,
  quizScore: 0,
  quizTotal: 0,
  flipped: false,
  quizContext: 'topics', // 'topics' | 'vocabtests' — where the quiz was launched from
};

/* ══════════════════════════════════════════════════════════
   VOCABULARY TESTS — the quiz half of Topics, under the Tests menu.
   Reuses the same quiz engine (startQuiz / renderQuizQuestion).
══════════════════════════════════════════════════════════ */
function buildVocabTests() {
  const el = $('screen-vocabtests');
  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">Vocabulary tests</h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:560px;line-height:1.6;">
        Multiple-choice quizzes on each topic. Pick a topic to test what you've learned —
        study the word lists first under <strong>Topics</strong> in the Learn menu.
      </p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;">
      ${CONTENT.topics.map(t => `
        <button onclick="startVocabTest('${t.id}')"
          style="text-align:left;cursor:pointer;border:1px solid ${t.colour}44;background:${t.colour}12;
                 border-radius:14px;padding:1.2rem;transition:all 0.15s;font-family:inherit;"
          onmouseover="this.style.background='${t.colour}22';this.style.transform='translateY(-2px)'"
          onmouseout="this.style.background='${t.colour}12';this.style.transform='none'">
          <div style="font-size:1.6rem;margin-bottom:0.4rem;">${t.icon}</div>
          <div style="font-size:1rem;font-weight:600;color:${t.colour};margin-bottom:0.2rem;">${t.title}</div>
          <div style="font-size:0.72rem;color:var(--text3);">Quiz →</div>
        </button>`).join('')}
    </div>`;
}

function startVocabTest(topicId) {
  const topic = CONTENT.topics.find(t => t.id === topicId);
  if (!topic) return;
  const allItems = topic.sections.flatMap(s => s.items);
  topicState = { ...topicState, topicId, allItems, shuffled: shuffle([...allItems]), quizContext: 'vocabtests' };
  startQuiz(topicId);
}



/* ── Entry point ── */
function buildTopics() {
  const el = $('screen-topics');
  el.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">Topics</h2>
      <p style="color:var(--text2);font-size:0.9rem;max-width:520px;line-height:1.6;">
        Vocabulary organised by theme — flashcards to learn, quiz to practise.
      </p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
      ${CONTENT.topics.map(t => `
        <div onclick="openTopic('${t.id}')"
          style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);
                 padding:1.25rem;cursor:pointer;transition:all 0.2s;border-left:3px solid ${t.colour};"
          onmouseover="this.style.transform='translateY(-2px)';this.style.borderColor='${t.colour}'"
          onmouseout="this.style.transform='';this.style.borderColor='var(--border)';this.style.borderLeftColor='${t.colour}'">
          <div style="font-size:1.8rem;margin-bottom:0.5rem;">${t.icon}</div>
          <div style="font-family:'Fraunces',serif;font-size:1rem;font-weight:600;color:${t.colour};margin-bottom:0.3rem;">${t.title}</div>
          <div style="font-size:0.78rem;color:var(--text3);">${t.desc}</div>
          <div style="font-size:0.72rem;color:var(--text3);margin-top:6px;">
            ${t.sections.reduce((acc, s) => acc + s.items.length, 0)} words
          </div>
        </div>`).join('')}
    </div>`;
}

function openTopic(id) {
  const topic = CONTENT.topics.find(t => t.id === id);
  if (!topic) return;

  // Flatten all items
  const allItems = topic.sections.flatMap(s => s.items);
  topicState = { ...topicState, topicId: id, allItems, shuffled: shuffle([...allItems]), flipped: false, quizContext: 'topics' };

  const el = $('screen-topics');
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;flex-wrap:wrap;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;" onclick="buildTopics()">← All topics</button>
      <div>
        <div style="font-size:1rem;font-weight:500;color:${topic.colour};">${topic.icon} ${topic.title}</div>
        <div style="font-size:0.78rem;color:var(--text3);">${allItems.length} words &amp; phrases</div>
      </div>
    </div>

    <!-- Mode selector -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.5rem;">
      <div onclick="startFlashcards('${id}','esToEn')"
        style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);
               padding:1.25rem;cursor:pointer;text-align:center;transition:all 0.2s;"
        onmouseover="this.style.borderColor='${topic.colour}'"
        onmouseout="this.style.borderColor='var(--border)'">
        <div style="font-size:1.5rem;margin-bottom:6px;">🃏</div>
        <div style="font-weight:500;color:var(--text);font-size:0.9rem;margin-bottom:3px;">Flashcards</div>
        <div style="font-size:0.75rem;color:var(--text3);">Spanish → English</div>
      </div>
      <div onclick="startFlashcards('${id}','enToEs')"
        style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);
               padding:1.25rem;cursor:pointer;text-align:center;transition:all 0.2s;"
        onmouseover="this.style.borderColor='${topic.colour}'"
        onmouseout="this.style.borderColor='var(--border)'">
        <div style="font-size:1.5rem;margin-bottom:6px;">🔄</div>
        <div style="font-weight:500;color:var(--text);font-size:0.9rem;margin-bottom:3px;">Flashcards</div>
        <div style="font-size:0.75rem;color:var(--text3);">English → Spanish</div>
      </div>
    </div>

    <div style="font-size:0.78rem;color:var(--text3);margin-bottom:1.25rem;text-align:center;">
      Want to test yourself? Try <strong style="color:${topic.colour}">Vocabulary tests</strong> under the Tests menu.
    </div>

    <!-- Word list by section -->
    ${topic.sections.map(s => `
      <div class="card" style="margin-bottom:1rem;border-left:3px solid ${topic.colour};">
        <div class="card-header">
          <span class="card-label">${s.title}</span>
          <span style="font-size:0.75rem;color:var(--text3);">${s.items.length} items</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${s.items.map(item => `
            <div style="padding:6px 12px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;font-size:0.82rem;">
              <span style="color:${topic.colour};font-weight:500;">${item.es}</span>
              <span style="color:var(--text3);margin:0 4px;">·</span>
              <span style="color:var(--text2);">${item.en}</span>
            </div>`).join('')}
        </div>
      </div>`).join('')}`;
}

/* ── Flashcard mode ── */
function startFlashcards(topicId, direction) {
  topicState.mode      = 'flashcard';
  topicState.direction = direction;
  topicState.shuffled  = shuffle([...topicState.allItems]);
  topicState.quizIdx   = 0;
  topicState.flipped   = false;
  renderFlashcard(topicId);
}

function renderFlashcard(topicId) {
  const topic   = CONTENT.topics.find(t => t.id === topicId);
  const items   = topicState.shuffled;
  const idx     = topicState.quizIdx;
  if (idx >= items.length) { renderFlashcardComplete(topicId); return; }

  const item    = items[idx];
  const flipped = topicState.flipped;
  const front   = topicState.direction === 'esToEn' ? item.es : item.en;
  const back    = topicState.direction === 'esToEn' ? item.en : item.es;
  const el      = $('screen-topics');

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;" onclick="openTopic('${topicId}')">← Back</button>
      <div style="font-size:0.85rem;color:var(--text2);">${topic.icon} ${topic.title} — Flashcards (${topicState.direction==='esToEn'?'ES → EN':'EN → ES'})</div>
      <div style="margin-left:auto;font-size:0.82rem;color:var(--text3);">${idx+1} / ${items.length}</div>
    </div>

    <!-- Progress bar -->
    <div class="progress" style="margin-bottom:1.5rem;">
      <div class="progress-fill" style="width:${Math.round((idx/items.length)*100)}%;background:${topic.colour};"></div>
    </div>

    <!-- Card -->
    <div onclick="flipCard('${topicId}')"
      style="background:var(--bg2);border:2px solid ${flipped?topic.colour:'var(--border)'};
             border-radius:var(--radius);padding:3rem 2rem;text-align:center;cursor:pointer;
             min-height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;
             transition:all 0.2s;margin-bottom:1rem;"
      onmouseover="this.style.borderColor='${topic.colour}'"
      onmouseout="this.style.borderColor='${flipped?topic.colour:'var(--border)'}'">
      ${!flipped ? `
        <div style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:1rem;">
          ${topicState.direction==='esToEn'?'Spanish':'English'}
        </div>
        <div style="font-family:'Fraunces',serif;font-size:1.8rem;font-weight:600;color:${topic.colour};">${front}</div>
        <div style="font-size:0.8rem;color:var(--text3);margin-top:1rem;">Click to reveal →</div>
      ` : `
        <div style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.5rem;">
          ${topicState.direction==='esToEn'?'Spanish':'English'}
        </div>
        <div style="font-family:'Fraunces',serif;font-size:1.4rem;font-weight:300;color:var(--text2);margin-bottom:1rem;">${front}</div>
        <div style="width:40px;height:1px;background:var(--border);margin-bottom:1rem;"></div>
        <div style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.5rem;">
          ${topicState.direction==='esToEn'?'English':'Spanish'}
        </div>
        <div style="font-family:'Fraunces',serif;font-size:1.8rem;font-weight:600;color:${topic.colour};">${back}</div>
      `}
    </div>

    <div class="btn-row" style="justify-content:center;">
      ${flipped ? `
        <button class="secondary" onclick="markFlashcard('${topicId}',false)" style="border-color:var(--accent2);color:var(--accent2);">✗ Still learning</button>
        <button class="primary" onclick="markFlashcard('${topicId}',true)" style="background:${topic.colour};">✓ Got it</button>
      ` : `
        <button class="primary" onclick="flipCard('${topicId}')" style="background:${topic.colour};">Reveal</button>
      `}
    </div>`;
}

function flipCard(topicId) {
  topicState.flipped = !topicState.flipped;
  renderFlashcard(topicId);
}

function markFlashcard(topicId, correct) {
  if (correct) {
    score += 5;
    streak++;
    this.correct = (this.correct || 0) + 1;
  } else {
    streak = 0;
    // Move to end of deck to see again
    const item = topicState.shuffled.splice(topicState.quizIdx, 1)[0];
    topicState.shuffled.push(item);
    topicState.flipped = false;
    updateStats();
    renderFlashcard(topicId);
    return;
  }
  topicState.quizIdx++;
  topicState.flipped = false;
  updateStats();
  renderFlashcard(topicId);
}

function renderFlashcardComplete(topicId) {
  const topic = CONTENT.topics.find(t => t.id === topicId);
  const el    = $('screen-topics');
  el.innerHTML = `
    <div class="card" style="text-align:center;padding:2.5rem 1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">🎉</div>
      <span style="font-family:'Fraunces',serif;font-size:2rem;font-weight:600;color:${topic.colour};display:block;margin-bottom:0.5rem;">
        Deck complete!
      </span>
      <p style="color:var(--text2);margin-bottom:1.5rem;">You've been through all ${topicState.allItems.length} cards.</p>
      <div class="btn-row" style="justify-content:center;">
        <button class="primary" style="background:${topic.colour};" onclick="startFlashcards('${topicId}','${topicState.direction}')">Go again</button>
        <button class="secondary" onclick="openTopic('${topicId}')">Back</button>
      </div>
    </div>`;
}

/* ── Quiz mode ── */
function quizScreenId() {
  return topicState.quizContext === 'vocabtests' ? 'screen-vocabtests' : 'screen-topics';
}
function quizReturn() {
  if (topicState.quizContext === 'vocabtests') buildVocabTests();
  else openTopic(topicState.topicId);
}

function startQuiz(topicId) {
  topicState.mode      = 'quiz';
  topicState.shuffled  = shuffle([...topicState.allItems]);
  topicState.quizIdx   = 0;
  topicState.quizScore = 0;
  topicState.quizTotal = 0;
  renderQuizQuestion(topicId);
}

function renderQuizQuestion(topicId) {
  const topic = CONTENT.topics.find(t => t.id === topicId);
  const items = topicState.shuffled;
  const idx   = topicState.quizIdx;

  if (idx >= Math.min(items.length, 20)) { renderQuizComplete(topicId); return; }

  const item       = items[idx];
  const showEs     = Math.random() > 0.5; // randomly show Spanish or English as prompt
  const prompt     = showEs ? item.es : item.en;
  const answer     = showEs ? item.en : item.es;
  const promptLang = showEs ? 'Spanish' : 'English';
  const answerLang = showEs ? 'English' : 'Spanish';

  // Build 3 wrong options from same topic
  let wrongPool = items.filter(i => i !== item);
  let wrongs    = shuffle(wrongPool).slice(0, 3).map(i => showEs ? i.en : i.es);
  const options = shuffle([answer, ...wrongs]);
  const el      = $(quizScreenId());

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;flex-wrap:wrap;">
      <button class="secondary" style="padding:6px 14px;font-size:0.8rem;" onclick="quizReturn()">← Back</button>
      <div style="font-size:0.85rem;color:var(--text2);">${topic.icon} ${topic.title} — Quiz</div>
      <div style="margin-left:auto;font-size:0.82rem;color:var(--text3);">${idx+1} / ${Math.min(items.length,20)}</div>
    </div>
    <div class="progress" style="margin-bottom:1.25rem;">
      <div class="progress-fill" style="width:${Math.round((idx/Math.min(items.length,20))*100)}%;background:${topic.colour};"></div>
    </div>
    <div class="card">
      <div style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.5rem;">${promptLang}</div>
      <div style="font-family:'Fraunces',serif;font-size:1.5rem;font-weight:600;color:${topic.colour};margin-bottom:0.4rem;">${prompt}</div>
      <div style="font-size:0.82rem;color:var(--text2);margin-bottom:1.25rem;">What is the ${answerLang.toLowerCase()} translation?</div>
      <div class="options" id="quiz-opts">
        ${options.map(o => `
          <button class="opt" onclick="checkTopicQuiz(this,${JSON.stringify(o)},${JSON.stringify(answer)},'${topicId}')">
            ${o}
          </button>`).join('')}
      </div>
      <div class="feedback" id="quiz-fb"></div>
      <div class="btn-row" id="quiz-btns" style="display:none;">
        <button class="primary" style="background:${topic.colour};" onclick="nextQuizQuestion('${topicId}')">Next →</button>
      </div>
    </div>`;
}

function checkTopicQuiz(btn, chosen, answer, topicId) {
  const topic = CONTENT.topics.find(t => t.id === topicId);
  document.querySelectorAll('#quiz-opts .opt').forEach(b => b.disabled = true);
  const fb = $('quiz-fb');
  topicState.quizTotal++;
  total++;

  if (chosen === answer) {
    btn.classList.add('correct');
    topicState.quizScore++;
    score += 8; streak++; correct++;
    fb.innerHTML = `<strong>Correct!</strong> +8 points`;
    fb.className = 'feedback show ok';
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('#quiz-opts .opt').forEach(b => { if (b.textContent.trim() === answer) b.classList.add('correct'); });
    streak = 0;
    fb.innerHTML = `<strong>Not quite</strong> — the answer is <strong>${answer}</strong>`;
    fb.className = 'feedback show bad';
  }
  $('quiz-btns').style.display = 'flex';
  updateStats();
}

function nextQuizQuestion(topicId) {
  topicState.quizIdx++;
  renderQuizQuestion(topicId);
}

function renderQuizComplete(topicId) {
  const topic = CONTENT.topics.find(t => t.id === topicId);
  const pct   = Math.round((topicState.quizScore / topicState.quizTotal) * 100);
  const msg   = pct >= 90 ? '¡Excelente! 🌟' : pct >= 70 ? '¡Muy bien! 🎉' : pct >= 50 ? '¡Bien hecho!' : '¡Sigue practicando!';
  const el    = $(quizScreenId());
  el.innerHTML = `
    <div class="card" style="text-align:center;padding:2.5rem 1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">🏆</div>
      <span style="font-family:'Fraunces',serif;font-size:3rem;font-weight:600;color:${topic.colour};display:block;line-height:1;">${pct}%</span>
      <p style="color:var(--text2);margin:0.75rem 0 0.25rem;">${topicState.quizScore} of ${topicState.quizTotal} correct</p>
      <p style="color:var(--text3);font-size:0.85rem;margin-bottom:1.5rem;">${msg}</p>
      <div class="btn-row" style="justify-content:center;">
        <button class="primary" style="background:${topic.colour};" onclick="startQuiz('${topicId}')">Try again</button>
        <button class="secondary" onclick="quizReturn()">Back</button>
      </div>
    </div>`;
}
