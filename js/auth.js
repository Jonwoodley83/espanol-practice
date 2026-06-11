/* ══════════════════════════════════════════════════════════
   ACCOUNTS & AUTH
   Teachers: email + password
   Students: class code + username + password (no email collected)
══════════════════════════════════════════════════════════ */

// Students get a synthetic email behind the scenes (never used for mail)
// so Supabase auth works without collecting a real one.
const STUDENT_EMAIL_DOMAIN = 'student.espanol-practice.app';

function studentEmail(username, classCode) {
  const u = username.toLowerCase().replace(/[^a-z0-9]/g, '');
  const c = classCode.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${u}.${c}@${STUDENT_EMAIL_DOMAIN}`;
}

/* ── Session bootstrap — runs on page load ── */
async function initAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    currentUser = session.user;
    await loadProfile();
  }
  updateAccountNav();
}

async function loadProfile() {
  if (!currentUser) { currentProfile = null; return; }
  const { data } = await sb.from('profiles').select('*').eq('id', currentUser.id).single();
  currentProfile = data || null;
}

function updateAccountNav() {
  const btn = document.getElementById('nav-account-btn');
  if (!btn) return;
  if (currentProfile) {
    btn.textContent = currentProfile.role === 'teacher' ? '👩‍🏫 ' + (currentProfile.username || 'Teacher') : '🎓 ' + (currentProfile.username || 'Student');
  } else {
    btn.textContent = '👤 Account';
  }
}

/* ── Main account screen ── */
function buildAccount() {
  const el = $('screen-account');
  if (currentProfile) {
    if (currentProfile.role === 'teacher') renderTeacherDashboard(el);
    else renderStudentDashboard(el);
  } else {
    renderAuthScreen(el);
  }
}

/* ── Logged-out: login / signup / join ── */
let authTab = 'login'; // 'login' | 'teacher-signup' | 'student-join'

function setAuthTab(tab) { authTab = tab; buildAccount(); }

function renderAuthScreen(el) {
  const tabs = [
    ['login', 'Log in'],
    ['teacher-signup', 'Teacher sign up'],
    ['student-join', 'Student: join a class'],
  ];

  el.innerHTML = `
    <div style="max-width:440px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:1.5rem;">
        <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:600;margin-bottom:0.4rem;">Account</h2>
        <p style="color:var(--text2);font-size:0.85rem;">Teachers create classes. Students join with a class code — no email needed.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:1.25rem;justify-content:center;flex-wrap:wrap;">
        ${tabs.map(([key,label]) => `
          <button onclick="setAuthTab('${key}')"
            style="padding:7px 16px;font-family:inherit;font-size:0.82rem;cursor:pointer;border-radius:20px;
                   border:1px solid ${authTab===key?'var(--accent)':'var(--border)'};
                   background:${authTab===key?'rgba(232,168,56,0.15)':'transparent'};
                   color:${authTab===key?'var(--accent)':'var(--text3)'};">${label}</button>`).join('')}
      </div>

      <div class="card">
        ${authTab === 'login' ? renderLoginForm() : authTab === 'teacher-signup' ? renderTeacherSignupForm() : renderStudentJoinForm()}
      </div>
      <div id="auth-feedback" style="margin-top:0.75rem;"></div>
    </div>`;
}

function authInput(id, label, type = 'text', placeholder = '') {
  return `
    <div style="margin-bottom:1rem;">
      <label style="display:block;font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:5px;">${label}</label>
      <input type="${type}" id="${id}" placeholder="${placeholder}"
        autocomplete="off"
        style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;
               padding:10px 12px;color:var(--text);font-family:inherit;font-size:0.9rem;outline:none;"
        onfocus="this.style.borderColor='var(--accent)'"
        onblur="this.style.borderColor='var(--border)'">
    </div>`;
}

function renderLoginForm() {
  return `
    <div style="font-size:0.78rem;color:var(--text3);margin-bottom:1rem;">
      Teachers log in with email. Students log in with class code + username.
    </div>
    <div style="display:flex;gap:6px;margin-bottom:1.25rem;">
      <button onclick="loginType='teacher';buildAccount()" id="lt-teacher"
        style="flex:1;padding:7px;border-radius:8px;font-family:inherit;font-size:0.82rem;cursor:pointer;
               border:1px solid ${loginType==='teacher'?'var(--accent)':'var(--border)'};
               background:${loginType==='teacher'?'rgba(232,168,56,0.12)':'transparent'};
               color:${loginType==='teacher'?'var(--accent)':'var(--text3)'};">👩‍🏫 Teacher</button>
      <button onclick="loginType='student';buildAccount()" id="lt-student"
        style="flex:1;padding:7px;border-radius:8px;font-family:inherit;font-size:0.82rem;cursor:pointer;
               border:1px solid ${loginType==='student'?'var(--accent)':'var(--border)'};
               background:${loginType==='student'?'rgba(232,168,56,0.12)':'transparent'};
               color:${loginType==='student'?'var(--accent)':'var(--text3)'};">🎓 Student</button>
    </div>
    ${loginType === 'teacher' ? `
      ${authInput('login-email','Email','email','you@school.com')}
      ${authInput('login-password','Password','password','••••••••')}
      <button class="primary" style="width:100%;" onclick="doTeacherLogin()">Log in</button>
    ` : `
      ${authInput('login-code','Class code','text','e.g. TIGRE-4827')}
      ${authInput('login-username','Username','text','your username')}
      ${authInput('login-password','Password','password','••••••••')}
      <button class="primary" style="width:100%;" onclick="doStudentLogin()">Log in</button>
    `}`;
}

let loginType = 'teacher';

function renderTeacherSignupForm() {
  return `
    <div style="font-size:0.78rem;color:var(--text3);margin-bottom:1rem;">
      Create a teacher account to set up classes and invite students.
    </div>
    ${authInput('signup-name','Your name','text','e.g. Ms García')}
    ${authInput('signup-email','Email','email','you@school.com')}
    ${authInput('signup-password','Password (8+ characters)','password','••••••••')}
    <button class="primary" style="width:100%;" onclick="doTeacherSignup()">Create teacher account</button>`;
}

function renderStudentJoinForm() {
  return `
    <div style="font-size:0.78rem;color:var(--text3);margin-bottom:1rem;">
      Ask your teacher for the class code. Pick a nickname — <strong style="color:var(--accent);">don't use your full real name</strong>.
    </div>
    ${authInput('join-code','Class code','text','e.g. TIGRE-4827')}
    ${authInput('join-username','Pick a username','text','e.g. GreenFox42')}
    ${authInput('join-password','Pick a password (8+ characters)','password','••••••••')}
    <button class="primary" style="width:100%;" onclick="doStudentJoin()">Join class</button>`;
}

function authFeedback(msg, ok = false) {
  const el = document.getElementById('auth-feedback');
  if (el) el.innerHTML = `<div class="feedback show ${ok?'ok':'bad'}" style="display:block;">${msg}</div>`;
}

/* ── Auth actions ── */
async function doTeacherSignup() {
  const name     = document.getElementById('signup-name')?.value.trim();
  const email    = document.getElementById('signup-email')?.value.trim();
  const password = document.getElementById('signup-password')?.value;

  if (!name || !email || !password) return authFeedback('Please fill in all fields.');
  if (password.length < 8) return authFeedback('Password needs to be at least 8 characters.');

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) return authFeedback(error.message);

  currentUser = data.user;
  const { error: pErr } = await sb.from('profiles').insert({ id: currentUser.id, role: 'teacher', username: name });
  if (pErr) return authFeedback('Account created but profile failed: ' + pErr.message);

  await loadProfile();
  updateAccountNav();
  buildAccount();
}

async function doTeacherLogin() {
  const email    = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value;
  if (!email || !password) return authFeedback('Please fill in both fields.');

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return authFeedback(error.message);

  currentUser = data.user;
  await loadProfile();
  updateAccountNav();
  buildAccount();
}

async function doStudentJoin() {
  const code     = document.getElementById('join-code')?.value.trim();
  const username = document.getElementById('join-username')?.value.trim();
  const password = document.getElementById('join-password')?.value;

  if (!code || !username || !password) return authFeedback('Please fill in all fields.');
  if (password.length < 8) return authFeedback('Password needs to be at least 8 characters.');
  if (username.replace(/[^a-zA-Z0-9]/g,'').length < 3) return authFeedback('Username needs at least 3 letters or numbers.');

  const email = studentEmail(username, code);

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) {
    if (error.message.includes('already registered')) return authFeedback('That username is taken in this class — try another.');
    return authFeedback(error.message);
  }

  currentUser = data.user;
  const { error: pErr } = await sb.from('profiles').insert({ id: currentUser.id, role: 'student', username });
  if (pErr) return authFeedback('Profile setup failed: ' + pErr.message);

  // Join the class via secure function
  const { data: joinRes, error: jErr } = await sb.rpc('join_class', { p_code: code });
  if (jErr) return authFeedback('Could not join class: ' + jErr.message);
  if (joinRes && joinRes.success === false) return authFeedback(joinRes.error || 'Class code not found.');

  await loadProfile();
  updateAccountNav();
  buildAccount();
}

async function doStudentLogin() {
  const code     = document.getElementById('login-code')?.value.trim();
  const username = document.getElementById('login-username')?.value.trim();
  const password = document.getElementById('login-password')?.value;
  if (!code || !username || !password) return authFeedback('Please fill in all fields.');

  const email = studentEmail(username, code);
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return authFeedback('Login failed — check your class code, username and password.');

  currentUser = data.user;
  await loadProfile();
  updateAccountNav();
  buildAccount();
}

async function doLogout() {
  await sb.auth.signOut();
  currentUser = null;
  currentProfile = null;
  updateAccountNav();
  buildAccount();
}

/* ── Teacher dashboard ── */
async function renderTeacherDashboard(el) {
  el.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text3);">Loading your classes...</div>`;

  const { data: classes, error } = await sb.from('classes')
    .select('*').eq('teacher_id', currentUser.id).order('created_at');

  let classCards = '';
  if (classes && classes.length) {
    for (const cls of classes) {
      const { data: members } = await sb.from('class_members')
        .select('student_id, joined_at, profiles(username)')
        .eq('class_id', cls.id);

      const studentList = (members || []).map(m => `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:0.85rem;">
          <span style="color:var(--text2);">🎓 ${m.profiles?.username || 'Unknown'}</span>
          <span style="margin-left:auto;font-size:0.72rem;color:var(--text3);">joined ${new Date(m.joined_at).toLocaleDateString()}</span>
          <button onclick="removeStudent('${cls.id}','${m.student_id}')"
            style="padding:2px 8px;background:transparent;border:1px solid rgba(255,107,107,0.3);
                   border-radius:6px;color:var(--accent2);font-size:0.7rem;cursor:pointer;font-family:inherit;">Remove</button>
        </div>`).join('');

      classCards += `
        <div class="card">
          <div class="card-header">
            <span style="font-size:1rem;font-weight:500;color:var(--text);">${cls.name}</span>
            <button onclick="deleteClass('${cls.id}')"
              style="padding:3px 10px;background:transparent;border:1px solid rgba(255,107,107,0.3);
                     border-radius:6px;color:var(--accent2);font-size:0.72rem;cursor:pointer;font-family:inherit;">Delete class</button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;flex-wrap:wrap;">
            <span style="font-size:0.75rem;color:var(--text3);">Class code:</span>
            <span style="font-family:monospace;font-size:1.1rem;font-weight:600;color:var(--accent);
                   background:rgba(232,168,56,0.1);padding:4px 14px;border-radius:8px;border:1px dashed rgba(232,168,56,0.4);">
              ${cls.class_code}</span>
            <button onclick="navigator.clipboard.writeText('${cls.class_code}');this.textContent='Copied!'"
              style="padding:4px 12px;background:transparent;border:1px solid var(--border);border-radius:6px;
                     color:var(--text3);font-size:0.75rem;cursor:pointer;font-family:inherit;">Copy</button>
          </div>
          <div style="font-size:0.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">
            Students (${members?.length || 0})
          </div>
          ${studentList || '<div style="font-size:0.82rem;color:var(--text3);font-style:italic;">No students yet — share the class code!</div>'}
        </div>`;
    }
  }

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:10px;">
      <div>
        <h2 style="font-family:'Fraunces',serif;font-size:1.5rem;font-weight:600;">👩‍🏫 ${currentProfile.username || 'Teacher'}</h2>
        <div style="font-size:0.8rem;color:var(--text3);">Teacher dashboard</div>
      </div>
      <button class="secondary" onclick="doLogout()" style="font-size:0.82rem;">Log out</button>
    </div>

    <div class="card" style="margin-bottom:1rem;">
      <div class="card-header"><span class="card-label">Create a new class</span></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <input type="text" id="new-class-name" placeholder="Class name, e.g. Year 9 Spanish"
          style="flex:1;min-width:200px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;
                 padding:10px 12px;color:var(--text);font-family:inherit;font-size:0.9rem;outline:none;"
          onfocus="this.style.borderColor='var(--accent)'">
        <button class="primary" onclick="createClass()">Create class</button>
      </div>
      <div id="class-feedback" style="margin-top:0.5rem;"></div>
    </div>

    ${classCards || '<div class="card" style="text-align:center;color:var(--text3);font-size:0.88rem;">No classes yet — create your first one above.</div>'}`;
}

function generateClassCode() {
  const words = ['TIGRE','LOBO','OSO','GATO','PERRO','LEON','AGUILA','ZORRO','PUMA','BUHO'];
  const word  = words[Math.floor(Math.random() * words.length)];
  const num   = Math.floor(1000 + Math.random() * 9000);
  return `${word}-${num}`;
}

async function createClass() {
  const name = document.getElementById('new-class-name')?.value.trim();
  const fb   = document.getElementById('class-feedback');
  if (!name) { if(fb) fb.innerHTML = '<div class="feedback show bad" style="display:block;">Give the class a name.</div>'; return; }

  const code = generateClassCode();
  const { error } = await sb.from('classes').insert({ teacher_id: currentUser.id, name, class_code: code });
  if (error) { if(fb) fb.innerHTML = `<div class="feedback show bad" style="display:block;">${error.message}</div>`; return; }
  buildAccount();
}

async function deleteClass(classId) {
  if (!confirm('Delete this class? Students will lose access. This cannot be undone.')) return;
  await sb.from('classes').delete().eq('id', classId);
  buildAccount();
}

async function removeStudent(classId, studentId) {
  if (!confirm('Remove this student from the class?')) return;
  await sb.from('class_members').delete().eq('class_id', classId).eq('student_id', studentId);
  buildAccount();
}

/* ── Student dashboard ── */
async function renderStudentDashboard(el) {
  const { data: memberships } = await sb.from('class_members')
    .select('class_id, classes(name)').eq('student_id', currentUser.id);

  const classList = (memberships || []).map(m => `
    <div style="padding:10px 14px;background:var(--bg3);border-radius:8px;margin-bottom:8px;
                border:1px solid var(--border);font-size:0.9rem;color:var(--text);">
      📚 ${m.classes?.name || 'Class'}
    </div>`).join('');

  el.innerHTML = `
    <div style="max-width:480px;margin:0 auto;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
        <div>
          <h2 style="font-family:'Fraunces',serif;font-size:1.5rem;font-weight:600;">🎓 ${currentProfile.username}</h2>
          <div style="font-size:0.8rem;color:var(--text3);">Student account</div>
        </div>
        <button class="secondary" onclick="doLogout()" style="font-size:0.82rem;">Log out</button>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-label">Your classes</span></div>
        ${classList || '<div style="color:var(--text3);font-size:0.85rem;">Not in any classes yet.</div>'}
      </div>
      <div class="card" style="margin-top:1rem;">
        <div class="card-header"><span class="card-label">Join another class</span></div>
        <div style="display:flex;gap:8px;">
          <input type="text" id="extra-code" placeholder="Class code"
            style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:8px;
                   padding:9px 12px;color:var(--text);font-family:inherit;font-size:0.88rem;outline:none;">
          <button class="primary" onclick="joinAnotherClass()">Join</button>
        </div>
        <div id="join-extra-fb" style="margin-top:0.5rem;"></div>
      </div>
    </div>`;
}

async function joinAnotherClass() {
  const code = document.getElementById('extra-code')?.value.trim();
  const fb   = document.getElementById('join-extra-fb');
  if (!code) return;
  const { data, error } = await sb.rpc('join_class', { p_code: code });
  if (error || (data && data.success === false)) {
    if (fb) fb.innerHTML = `<div class="feedback show bad" style="display:block;">${data?.error || error?.message || 'Could not join.'}</div>`;
    return;
  }
  buildAccount();
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', initAuth);
