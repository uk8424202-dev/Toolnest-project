const CONTACT_EMAIL = 'hello@toolnest.example'; // Replace this placeholder with your preferred contact address.
const app = document.querySelector('#app');

const icons = {
  count: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 5h14M5 10h9M5 15h14M5 20h8"/><path d="M18 9v3m-1.5-1.5h3"/></svg>',
  age: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7 3v4m10-4v4M3.5 10h17m-12 4h3m-3 3h6"/></svg>',
  case: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M12 6v13m-5 0h10M7 6c0 5-1 8-4 10m14-10c0 5 1 8 4 10"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h2m4 0h2"/></svg>',
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6m-3 0v3m5.5 2L19 5"/></svg>',
  password: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/></svg>',
  qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zm4 0h3m-7 4v3m4-3h3v3"/></svg>',
  reverse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h11M4 17h16m-7-8 3 3-3 3"/></svg>',
  spaces: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h6m4 0h6M4 12h16M4 17h6m4 0h6"/><circle cx="12" cy="7" r="1"/></svg>',
  percent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m19 5-14 14"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/></svg>',
  search: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>',
  mark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v6H4zM13 14h3v3h-3zm4 0h3m-7 4v2m4-3h3v3h-3z"/></svg>',
};

const tools = [
  { id: 'counter', name: 'Word & character counter', desc: 'Count words, characters, sentences, and paragraphs.', icon: 'count', category: 'Writing' },
  { id: 'age', name: 'Age calculator', desc: 'Find your exact age in years, months, and days.', icon: 'age', category: 'Everyday' },
  { id: 'case', name: 'Text case converter', desc: 'Switch text to upper, lower, title, or sentence case.', icon: 'case', category: 'Writing' },
  { id: 'calculator', name: 'Basic calculator', desc: 'Work through everyday arithmetic, right in your browser.', icon: 'calc', category: 'Everyday' },
  { id: 'timer', name: 'Countdown timer', desc: 'Set a duration and start, pause, resume, or reset.', icon: 'timer', category: 'Everyday' },
  { id: 'password', name: 'Password generator', desc: 'Create a strong random password with your own settings.', icon: 'password', category: 'Privacy' },
  { id: 'qr', name: 'QR code generator', desc: 'Turn a text snippet or URL into a scannable QR code.', icon: 'qr', category: 'Everyday' },
  { id: 'reverse', name: 'Text reverser', desc: 'Reverse the order of characters in any text.', icon: 'reverse', category: 'Writing' },
  { id: 'spaces', name: 'Extra-space remover', desc: 'Tidy repeated spaces and blank lines in a text block.', icon: 'spaces', category: 'Writing' },
  { id: 'percentage', name: 'Percentage calculator', desc: 'Find a percentage, a part, or the change between values.', icon: 'percent', category: 'Everyday' },
];

let currentView = 'home';
let toastTimer;
let timerInterval = null;
let timerRemaining = 0;
let timerInitial = 0;
let timerRunning = false;

function toolCard(tool, index) {
  return `<button class="tool-card" data-tool="${tool.id}" aria-label="Open ${tool.name}" style="animation-delay:${Math.min(index * 35, 280)}ms">
    <span class="tool-icon" aria-hidden="true">${icons[tool.icon]}</span>
    <span class="tool-copy"><span class="tool-title" role="heading" aria-level="3">${tool.name}</span><span class="tool-description">${tool.desc}</span></span>
  </button>`;
}

function header() {
  return `<header class="site-header"><div class="nav-wrap">
    <a class="brand" href="#home" data-page="home" aria-label="ToolNest home"><span class="brand-mark">${icons.mark}</span>ToolNest</a>
    <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false" data-menu>${menuIcon()}</button>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="#home" data-page="home">Home</a><a href="#tools" data-page="tools">All tools</a><a href="#about" data-page="about">About</a><a href="#contact" data-page="contact">Contact</a>
      <button class="nav-cta" data-page="tools">Explore tools <span aria-hidden="true">→</span></button>
    </nav>
  </div></header>`;
}
function menuIcon() { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'; }

function footer() {
  return `<footer class="site-footer"><div class="footer-inner">
    <div><div class="footer-brand"><span class="brand-mark">${icons.mark}</span>ToolNest</div><div class="footer-copy">Useful little tools. Nothing to install.</div></div>
    <nav class="footer-links" aria-label="Footer navigation"><a href="#tools" data-page="tools">All tools</a><a href="#about" data-page="about">About</a><a href="#contact" data-page="contact">Contact</a><a href="#privacy" data-page="privacy">Privacy policy</a></nav>
    <div class="footer-copy">© <span id="year"></span> ToolNest</div>
  </div></footer><div class="toast" role="status" aria-live="polite"></div>`;
}

function homePage() {
  return `<main>
    <section class="hero">
      <span class="eyebrow"><span class="eyebrow-dot"></span> YOUR FRIENDLY EVERYDAY TOOLBOX</span>
      <h1>Your Daily Tools,<br><span>All in One Place</span></h1>
      <p class="hero-copy">Free, simple, and useful online tools for your everyday needs.</p>
      <div class="search-box" role="search">${icons.search}<input type="search" id="tool-search" placeholder="Find a tool" autocomplete="off" aria-label="Search tools by name or description"><button class="button-primary" data-page="tools">Explore Tools <span aria-hidden="true">→</span></button></div>
      <div class="hero-meta"><strong>10 handy tools</strong> <span aria-hidden="true">·</span> No account needed <span aria-hidden="true">·</span> Works in your browser</div>
    </section>
    <section class="section" id="tools"><div class="container">
      <div class="section-heading"><div><span class="section-kicker">The toolbox</span><h2>Small tasks, sorted.</h2><p>Pick a tool and get straight to it. No sign-up, no fuss.</p></div><button class="text-link" data-page="tools">Browse all tools <span aria-hidden="true">→</span></button></div>
      <div class="tool-grid" id="tool-grid">${tools.map(toolCard).join('')}</div>
      <div class="trust-strip"><div class="trust-copy"><strong>Private by default, useful by design.</strong><span>Your inputs stay on this device. ToolNest doesn’t need an account or a server.</span></div><div class="trust-points"><span><b class="check">✓</b> Free to use</span><span><b class="check">✓</b> Browser-based</span><span><b class="check">✓</b> No account required</span></div></div>
    </div></section>
    <section class="about-band"><div class="about-inner">
      <div class="about-art" aria-hidden="true"><span class="art-tile one">${icons.count}</span><span class="art-tile two">${icons.calc}</span><span class="art-tile three">${icons.password}</span></div>
      <div class="about-copy"><span class="section-kicker">A little more breathing room</span><h2>Tools should feel easy.</h2><p>ToolNest is a thoughtfully small collection of everyday utilities. Each one opens quickly, explains itself, and does its work right here in your browser—so you can get on with your day.</p><button class="text-link" data-page="about">A note about ToolNest <span aria-hidden="true">→</span></button></div>
    </div></section>
  </main>`;
}

function allToolsPage() {
  return `<main class="section soft"><div class="container">
    <div class="section-heading"><div><span class="section-kicker">All tools</span><h2>Your toolbox, in full.</h2><p>Ten useful utilities, ready when you are.</p></div><button class="text-link" data-page="home">← Back home</button></div>
    <div class="search-box" role="search" style="margin:0 0 24px">${icons.search}<input type="search" id="all-tool-search" placeholder="Filter by tool name or description" aria-label="Filter tools"></div>
    <div class="tool-grid" id="all-tool-grid">${tools.map(toolCard).join('')}</div>
  </div></main>`;
}

function infoPage(which) {
  if (which === 'about') return `<main class="content-page"><div class="container">
    <span class="section-kicker">About ToolNest</span><h1>Useful, without the extra steps.</h1><p class="lead">ToolNest is a small collection of everyday browser tools made to be clear, quick, and comfortable to use on any screen.</p>
    <div class="prose-block"><h2>Simple tools, thoughtfully made</h2><p>Sometimes you just need to count a few words, calculate a percentage, or make a quick password. ToolNest keeps those little jobs close at hand, without accounts, downloads, or a long list of things to figure out.</p></div>
    <div class="prose-block"><h2>Designed for your browser</h2><p>Most tools process your input right on your device. There is no ToolNest backend receiving your text, dates, or passwords. QR code generation uses a small library loaded from a public CDN; the QR content is still processed locally by that library.</p></div>
    <div class="prose-block"><h2>Free to use</h2><p>Every tool here is available without an account or a fee. We aim to keep the experience straightforward, accessible, and useful on phones, tablets, and desktop computers.</p></div>
  </div></main>`;
  if (which === 'contact') return `<main class="content-page"><div class="container">
    <span class="section-kicker">Get in touch</span><h1>We’d like to hear from you.</h1><p class="lead">Found a rough edge or have an idea for a handy tool? Send a note. Your email app will open with your message ready to send.</p>
    <form class="contact-card" id="contact-form"><label for="contact-name">Your name</label><input id="contact-name" name="name" autocomplete="name" placeholder="How should we address you?"><label for="contact-email">Your email</label><input id="contact-email" name="email" type="email" autocomplete="email" placeholder="you@example.com"><label for="contact-message">Message</label><textarea id="contact-message" name="message" required placeholder="Tell us what’s on your mind"></textarea><div class="action-row"><button class="button-primary" type="submit">Open email draft <span aria-hidden="true">→</span></button></div><p class="form-note">Contact address: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. Replace the placeholder address in <code>src/main.js</code> before publishing.</p></form>
  </div></main>`;
  return `<main class="content-page"><div class="container">
    <span class="section-kicker">Privacy policy</span><h1>Your input stays yours.</h1><p class="lead">ToolNest is built to work without accounts or a backend. This page explains what happens when you use the tools.</p>
    <div class="prose-block"><h2>Local processing</h2><p>Text, passwords, dates, calculations, and timer settings you enter are processed in your browser on your device. ToolNest does not send this information to a ToolNest server, and the site does not save it to an account or browser storage.</p></div>
     <div class="prose-block"><h2>QR code generator and its CDN library</h2><p>The QR code tool loads the pinned QRCode.js 1.0.0 browser library from cdnjs (Cloudflare’s public CDN) when you open that tool. Loading the library requires a network connection; cdnjs receives the usual request metadata needed to deliver the file, such as your IP address. The QR text or URL you enter is passed to the library in your browser to make the QR code; it is not sent to cdnjs or to a ToolNest backend. If the library cannot load, the tool will tell you and will not claim a code was created.</p></div>
    <div class="prose-block"><h2>External links and email</h2><p>ToolNest does not include analytics, advertising, or account tracking. If you choose to contact us, the contact form opens your own email application with a draft; nothing is sent until you choose to send it. The email provider you use may handle that message under its own privacy policy.</p></div>
    <div class="prose-block"><h2>Questions</h2><p>For privacy questions, contact <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p></div>
  </div></main>`;
}

function toolWorkspace(id) {
  const tool = tools.find(item => item.id === id);
  if (!tool) return `<main class="tool-page"><div class="tool-shell"><button class="back-button" data-page="tools">← Back to all tools</button><div class="workspace">That tool could not be found. <button class="text-link" data-page="tools">Return to tools</button></div></div></main>`;
  let content = '';
  if (id === 'counter') content = `<div class="field"><label for="counter-text">Your text</label><textarea id="counter-text" placeholder="Paste or type your text here…" aria-describedby="counter-hint"></textarea><p class="helper" id="counter-hint">Counts update as you type. Your text stays in this browser.</p></div><div class="stats-grid" id="counter-stats"><div class="stat"><strong>0</strong><span>Words</span></div><div class="stat"><strong>0</strong><span>Characters</span></div><div class="stat"><strong>0</strong><span>Sentences</span></div><div class="stat"><strong>0</strong><span>Paragraphs</span></div></div>`;
  if (id === 'age') content = `<div class="field"><label for="birth-date">Date of birth</label><input type="date" id="birth-date" max="${localDateInputValue()}"></div><div class="action-row"><button class="button-primary" data-action="calculate-age">Calculate age</button></div><div class="result-box hidden" id="age-result"><div class="result-label">Your age</div><div class="result-value large"></div></div><p class="message" id="age-message" aria-live="polite"></p>`;
  if (id === 'case') content = `<div class="field"><label for="case-input">Text to convert</label><textarea id="case-input" placeholder="Write something to convert…"></textarea></div><div class="action-row"><button class="button-secondary" data-case="upper">UPPERCASE</button><button class="button-secondary" data-case="lower">lowercase</button><button class="button-secondary" data-case="title">Title Case</button><button class="button-secondary" data-case="sentence">Sentence case</button></div><div class="field"><label for="case-output">Converted text</label><textarea id="case-output" readonly placeholder="Your converted text will appear here"></textarea></div><div class="action-row"><button class="button-secondary" data-copy="case-output">Copy result</button></div><p class="message" id="case-message" aria-live="polite"></p>`;
  if (id === 'calculator') content = `<div class="field"><label for="calc-expression">Expression</label><input id="calc-expression" inputmode="decimal" placeholder="For example: (18 + 6) / 3" aria-describedby="calc-help"><p class="helper" id="calc-help">Use +, −, ×, ÷, parentheses, and decimals.</p></div><div class="action-row"><button class="button-primary" data-action="calculate">Calculate</button><button class="button-secondary" data-action="clear-calc">Clear</button></div><div class="result-box hidden" id="calc-result"><div class="result-label">Answer</div><div class="result-value large"></div></div><p class="message" id="calc-message" aria-live="polite"></p>`;
  if (id === 'timer') content = `<div class="timer-inputs"><div class="workspace-grid"><div class="field"><label for="timer-minutes">Minutes</label><input id="timer-minutes" type="number" min="0" max="999" value="5" inputmode="numeric"></div><div class="field"><label for="timer-seconds">Seconds</label><input id="timer-seconds" type="number" min="0" max="59" value="0" inputmode="numeric"></div></div></div><div class="timer-display" id="timer-display" aria-live="polite">05:00</div><div class="action-row" style="justify-content:center"><button class="button-primary" data-action="timer-start">Start timer</button><button class="button-secondary" data-action="timer-pause">Pause</button><button class="button-secondary" data-action="timer-reset">Reset</button></div><p class="message" id="timer-message" aria-live="polite"></p>`;
  if (id === 'password') content = `<div class="workspace-grid"><div class="field"><label for="password-length">Password length <span id="length-value">18</span></label><input id="password-length" type="range" min="8" max="64" value="18"></div><div class="field"><label for="password-count">How many</label><select id="password-count"><option value="1">1 password</option><option value="3">3 passwords</option><option value="5">5 passwords</option></select></div></div><div class="workspace-grid" style="margin-top:20px"><label><input type="checkbox" id="include-upper" checked> Uppercase (A–Z)</label><label><input type="checkbox" id="include-lower" checked> Lowercase (a–z)</label><label><input type="checkbox" id="include-numbers" checked> Numbers (0–9)</label><label><input type="checkbox" id="include-symbols"> Symbols (!@#…)</label></div><p class="helper">Generated using your browser’s secure random number generator. Passwords are not stored or sent anywhere.</p><div class="action-row"><button class="button-primary" data-action="generate-password">Generate password</button></div><div id="password-results"></div><p class="message" id="password-message" aria-live="polite"></p>`;
  if (id === 'qr') content = `<div class="field"><label for="qr-content">Text or URL</label><textarea id="qr-content" maxlength="1600" placeholder="https://example.com or any short message"></textarea><p class="helper">QR codes work best with concise text. This content is processed locally in your browser.</p></div><div class="action-row"><button class="button-primary" data-action="make-qr">Generate QR code</button><button class="button-secondary" data-action="clear-qr">Clear</button></div><p class="message" id="qr-message" aria-live="polite"></p><div class="qr-result hidden" id="qr-result" aria-label="Generated QR code"></div><div class="action-row hidden" id="qr-download-row"><button class="button-secondary" data-action="download-qr">Download PNG</button></div>`;
  if (id === 'reverse') content = `<div class="field"><label for="reverse-input">Text to reverse</label><textarea id="reverse-input" placeholder="Type or paste text…"></textarea></div><div class="action-row"><button class="button-primary" data-action="reverse-text">Reverse text</button><button class="button-secondary" data-action="clear-reverse">Clear</button></div><div class="field"><label for="reverse-output">Reversed text</label><textarea id="reverse-output" readonly placeholder="Your reversed text will appear here"></textarea></div><div class="action-row"><button class="button-secondary" data-copy="reverse-output">Copy result</button></div><p class="message" id="reverse-message" aria-live="polite"></p>`;
  if (id === 'spaces') content = `<div class="field"><label for="spaces-input">Text to tidy</label><textarea id="spaces-input" placeholder="Paste text with extra spaces or blank lines…"></textarea></div><div class="action-row"><button class="button-primary" data-action="clean-spaces">Remove extra spaces</button><button class="button-secondary" data-action="clear-spaces">Clear</button></div><div class="field"><label for="spaces-output">Tidied text</label><textarea id="spaces-output" readonly placeholder="Your tidied text will appear here"></textarea></div><div class="action-row"><button class="button-secondary" data-copy="spaces-output">Copy result</button></div><p class="message" id="spaces-message" aria-live="polite"></p>`;
  if (id === 'percentage') content = `<div class="field"><label for="percent-mode">What would you like to find?</label><select id="percent-mode"><option value="of">What is X% of Y?</option><option value="is">X is what percent of Y?</option><option value="change">Percentage change from X to Y</option></select></div><div class="workspace-grid" style="margin-top:16px"><div class="field"><label for="percent-a" id="percent-label-a">Percentage (X)</label><input id="percent-a" type="number" step="any" placeholder="e.g. 15"></div><div class="field"><label for="percent-b" id="percent-label-b">Value (Y)</label><input id="percent-b" type="number" step="any" placeholder="e.g. 240"></div></div><div class="action-row"><button class="button-primary" data-action="calculate-percent">Calculate</button></div><div class="result-box hidden" id="percent-result"><div class="result-label">Result</div><div class="result-value large"></div></div><p class="message" id="percent-message" aria-live="polite"></p>`;
  return `<main class="tool-page"><div class="tool-shell"><button class="back-button" data-page="tools"><span aria-hidden="true">←</span> Back to all tools</button><div class="tool-head"><span class="tool-icon">${icons[tool.icon]}</span><div><h1>${tool.name}</h1><p>${tool.desc}</p></div></div><section class="workspace" aria-label="${tool.name}">${content}</section></div></main>`;
}

function render(view = currentView, argument = '') {
  currentView = view;
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  const page = view === 'home' ? homePage() : view === 'tools' ? allToolsPage() : ['about', 'contact', 'privacy'].includes(view) ? infoPage(view) : toolWorkspace(argument || view);
  app.innerHTML = `${header()}${page}${footer()}`;
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll(`[data-page="${view}"]`).forEach(link => link.classList.add('active'));
  if (view === 'tool') {
    const activeTool = tools.find(tool => tool.id === argument);
    if (activeTool) currentView = `tool:${argument}`;
  }
  if (view.startsWith('tool:')) currentView = view;
  if (view === 'tool' && argument === 'timer' && timerRemaining > 0) {
    updateTimerDisplay();
    const startButton = document.querySelector('[data-action="timer-start"]');
    if (startButton) startButton.textContent = 'Resume timer';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(message) {
  const node = document.querySelector('.toast');
  if (!node) return;
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 2300);
}

function setMessage(id, message, error = false) {
  const node = document.getElementById(id);
  if (!node) return;
  node.textContent = message;
  node.classList.toggle('error', error);
}

function updateCounter(value) {
  const words = value.trim() ? value.trim().split(/\s+/u).length : 0;
  const sentences = value.trim() ? (value.match(/[.!?]+(?=\s|$)|[^.!?]+$/gu) || []).filter(part => part.trim()).length : 0;
  const paragraphs = value.trim() ? value.trim().split(/\n\s*\n/u).filter(part => part.trim()).length : 0;
  const nums = [words, value.length, sentences, paragraphs];
  document.querySelectorAll('#counter-stats .stat strong').forEach((el, index) => { el.textContent = nums[index]; });
}

function calculateAge(dateString) {
  const birth = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!dateString || Number.isNaN(birth.getTime()) || birth > today) return null;
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    const previousMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += previousMonthDays;
  }
  if (months < 0) { years -= 1; months += 12; }
  return `${years} years, ${months} months, ${days} days`;
}

function localDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function safeCalculate(expression) {
  const cleaned = expression.replace(/[×x]/g, '*').replace(/[÷]/g, '/').replace(/[−]/g, '-');
  if (!cleaned.trim() || !/^[\d\s+\-*/().%]+$/.test(cleaned)) throw new Error('Use numbers and basic math operators only.');
  if (/\/\s*0(?:\D|$)/.test(cleaned)) throw new Error('Division by zero is not allowed.');
  // The expression is restricted to numeric literals and arithmetic symbols before evaluation.
  const result = Function(`"use strict"; return (${cleaned})`)();
  if (!Number.isFinite(result)) throw new Error('That expression does not have a finite answer.');
  return result;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  if (display) display.textContent = formatTime(timerRemaining);
}

function syncTimerDuration() {
  if (timerRunning) return;
  const minutes = Number(document.getElementById('timer-minutes')?.value || 0);
  const seconds = Number(document.getElementById('timer-seconds')?.value || 0);
  const valid = Number.isInteger(minutes) && Number.isInteger(seconds) &&
    minutes >= 0 && minutes <= 999 && seconds >= 0 && seconds <= 59;

  // Editing a paused or finished timer starts a new duration instead of
  // accidentally resuming the previous countdown.
  timerInitial = 0;
  timerRemaining = valid ? minutes * 60 + seconds : 0;
  updateTimerDisplay();
  const startButton = document.querySelector('[data-action="timer-start"]');
  if (startButton) startButton.textContent = 'Start timer';
  setMessage('timer-message', valid ? '' : 'Enter whole minutes and seconds from 0–59.', !valid);
}

function secureRandomIndex(max) {
  const range = 0x100000000;
  const limit = range - (range % max);
  const word = new Uint32Array(1);
  do { crypto.getRandomValues(word); } while (word[0] >= limit);
  return word[0] % max;
}
function makePassword(groups, length) {
  const alphabet = groups.join('');
  const characters = groups.map(group => group[secureRandomIndex(group.length)]);
  while (characters.length < length) {
    characters.push(alphabet[secureRandomIndex(alphabet.length)]);
  }
  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomIndex(index + 1);
    [characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]];
  }
  return characters.join('');
}

function loadQrLibrary() {
  if (window.QRCode) return Promise.resolve();
  if (window.qrLibraryPromise) return window.qrLibraryPromise;
  window.qrLibraryPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    script.onload = () => window.QRCode ? resolve() : reject(new Error('The QR library did not initialize.'));
    script.onerror = () => reject(new Error('The QR library could not load. Check your connection and try again.'));
    document.head.append(script);
  });
  return window.qrLibraryPromise;
}

app.addEventListener('input', event => {
  if (event.target.id === 'tool-search') filterTools(event.target.value, '#tool-grid');
  if (event.target.id === 'all-tool-search') filterTools(event.target.value, '#all-tool-grid');
  if (event.target.id === 'counter-text') updateCounter(event.target.value);
  if (event.target.id === 'password-length') document.getElementById('length-value').textContent = event.target.value;
  if (event.target.id === 'percent-mode') updatePercentLabels();
  if (event.target.id === 'timer-minutes' || event.target.id === 'timer-seconds') syncTimerDuration();
});

function filterTools(query, gridSelector) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;
  const normalized = query.toLowerCase().trim();
  const filtered = tools.filter(tool => `${tool.name} ${tool.desc} ${tool.category}`.toLowerCase().includes(normalized));
  grid.innerHTML = filtered.length ? filtered.map(toolCard).join('') : '<div class="empty-results"><strong>No tools found just yet.</strong>Try a different word, like “text”, “time”, or “calculate”.</div>';
}

function updatePercentLabels() {
  const mode = document.getElementById('percent-mode')?.value;
  const a = document.getElementById('percent-label-a');
  const b = document.getElementById('percent-label-b');
  if (!a || !b) return;
  if (mode === 'of') { a.textContent = 'Percentage (X)'; b.textContent = 'Value (Y)'; }
  else if (mode === 'is') { a.textContent = 'Part (X)'; b.textContent = 'Whole (Y)'; }
  else { a.textContent = 'Starting value (X)'; b.textContent = 'New value (Y)'; }
}

app.addEventListener('click', async event => {
  const menu = event.target.closest('[data-menu]');
  if (menu) {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', nav.classList.contains('open'));
    return;
  }
  const pageLink = event.target.closest('[data-page]');
  if (pageLink) {
    event.preventDefault();
    const page = pageLink.dataset.page;
    document.querySelector('.nav-links')?.classList.remove('open');
    render(page);
    if (page === 'tools') history.replaceState(null, '', '#tools');
    else history.replaceState(null, '', page === 'home' ? '#home' : `#${page}`);
    return;
  }
  const card = event.target.closest('[data-tool]');
  if (card) {
    const id = card.dataset.tool;
    render('tool', id);
    history.replaceState(null, '', `#tool/${id}`);
    return;
  }
  const copyButton = event.target.closest('[data-copy]');
  if (copyButton) {
    const value = document.getElementById(copyButton.dataset.copy)?.value;
    if (!value) { toast('There is nothing to copy yet.'); return; }
    try { await navigator.clipboard.writeText(value); toast('Copied to clipboard.'); }
    catch { toast('Clipboard access is unavailable in this browser.'); }
    return;
  }
  const caseButton = event.target.closest('[data-case]');
  if (caseButton) {
    const input = document.getElementById('case-input').value;
    let output = input;
    if (caseButton.dataset.case === 'upper') output = input.toLocaleUpperCase();
    if (caseButton.dataset.case === 'lower') output = input.toLocaleLowerCase();
    if (caseButton.dataset.case === 'title') output = input.toLocaleLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, prefix, letter) => prefix + letter.toLocaleUpperCase());
    if (caseButton.dataset.case === 'sentence') output = input.toLocaleLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_, prefix, letter) => prefix + letter.toLocaleUpperCase());
    document.getElementById('case-output').value = output;
    setMessage('case-message', input ? 'Conversion ready.' : 'Enter some text to convert.', !input);
    return;
  }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;

  if (action === 'calculate-age') {
    const result = calculateAge(document.getElementById('birth-date').value);
    const box = document.getElementById('age-result');
    if (!result) { box.classList.add('hidden'); setMessage('age-message', 'Choose a valid date of birth, not in the future.', true); }
    else { box.classList.remove('hidden'); box.querySelector('.result-value').textContent = result; setMessage('age-message', 'Calculated locally in your browser.'); }
  }
  if (action === 'calculate') {
    try {
      const answer = safeCalculate(document.getElementById('calc-expression').value);
      const box = document.getElementById('calc-result');
      box.classList.remove('hidden'); box.querySelector('.result-value').textContent = Number(answer.toPrecision(12)).toString();
      setMessage('calc-message', 'Calculation complete.');
    } catch (error) { document.getElementById('calc-result').classList.add('hidden'); setMessage('calc-message', error.message || 'Check the expression and try again.', true); }
  }
  if (action === 'clear-calc') {
    document.getElementById('calc-expression').value = '';
    document.getElementById('calc-result').classList.add('hidden');
    setMessage('calc-message', '');
  }
  if (action === 'timer-start') {
    if (!timerRunning) {
      if (timerRemaining <= 0) {
        const mins = Number(document.getElementById('timer-minutes').value);
        const secs = Number(document.getElementById('timer-seconds').value);
        if (!Number.isInteger(mins) || !Number.isInteger(secs) || mins < 0 || secs < 0 || secs > 59 || mins > 999 || mins * 60 + secs === 0) {
          setMessage('timer-message', 'Enter a duration greater than zero (seconds must be 0–59).', true); return;
        }
        timerInitial = mins * 60 + secs;
        timerRemaining = timerInitial;
      }
      timerRunning = true;
      document.getElementById('timer-minutes').disabled = true;
      document.getElementById('timer-seconds').disabled = true;
      updateTimerDisplay();
      document.querySelector('[data-action="timer-start"]').textContent = 'Start timer';
      setMessage('timer-message', 'Timer is running.');
      timerInterval = setInterval(() => {
        if (timerRemaining > 0) timerRemaining -= 1;
        updateTimerDisplay();
        if (timerRemaining === 0) {
          clearInterval(timerInterval); timerRunning = false;
          document.getElementById('timer-minutes').disabled = false;
          document.getElementById('timer-seconds').disabled = false;
          document.querySelector('[data-action="timer-start"]').textContent = 'Start timer';
          setMessage('timer-message', 'Time is up.');
          toast('Timer finished.');
        }
      }, 1000);
    }
  }
  if (action === 'timer-pause') {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('timer-minutes').disabled = false;
      document.getElementById('timer-seconds').disabled = false;
      document.querySelector('[data-action="timer-start"]').textContent = 'Resume timer';
      setMessage('timer-message', 'Paused. Choose Resume timer to continue.');
    }
    else if (timerRemaining > 0) setMessage('timer-message', 'Timer is paused.');
  }
  if (action === 'timer-reset') {
    clearInterval(timerInterval); timerRunning = false;
    document.getElementById('timer-minutes').disabled = false;
    document.getElementById('timer-seconds').disabled = false;
    timerRemaining = timerInitial;
    if (timerInitial === 0) {
      const mins = Number(document.getElementById('timer-minutes').value || 0);
      const secs = Number(document.getElementById('timer-seconds').value || 0);
      if (!Number.isInteger(mins) || !Number.isInteger(secs) || mins < 0 || secs < 0 || secs > 59 || mins > 999) {
        setMessage('timer-message', 'Enter whole minutes and seconds from 0–59.', true);
        return;
      }
      timerRemaining = mins * 60 + secs;
    }
    updateTimerDisplay();
    document.querySelector('[data-action="timer-start"]').textContent = 'Start timer';
    setMessage('timer-message', 'Timer reset.');
  }
  if (action === 'generate-password') {
    const groups = [];
    if (document.getElementById('include-upper').checked) groups.push('ABCDEFGHJKLMNPQRSTUVWXYZ');
    if (document.getElementById('include-lower').checked) groups.push('abcdefghijkmnopqrstuvwxyz');
    if (document.getElementById('include-numbers').checked) groups.push('23456789');
    if (document.getElementById('include-symbols').checked) groups.push('!@#$%^&*()-_=+');
    const target = document.getElementById('password-results');
    if (!groups.length) { target.innerHTML = ''; setMessage('password-message', 'Select at least one character group.', true); return; }
    if (!window.crypto?.getRandomValues) { setMessage('password-message', 'Secure password generation is not available in this browser.', true); return; }
    const length = Number(document.getElementById('password-length').value);
    const count = Number(document.getElementById('password-count').value);
    const passwords = Array.from({ length: count }, () => makePassword(groups, length));
    target.innerHTML = passwords.map((password, index) => `<div class="result-box"><div class="result-label">Password ${index + 1}</div><div class="result-value mono">${password}</div><div class="action-row"><button class="button-secondary" data-copy-password="${index}">Copy password</button></div></div>`).join('');
    target.querySelectorAll('[data-copy-password]').forEach(button => {
      button.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(passwords[Number(button.dataset.copyPassword)]); toast('Password copied.'); }
        catch { toast('Clipboard access is unavailable in this browser.'); }
      });
    });
    setMessage('password-message', 'Generated on this device. It was not saved or sent.');
  }
  if (action === 'make-qr') {
    const text = document.getElementById('qr-content').value.trim();
    const result = document.getElementById('qr-result');
    const row = document.getElementById('qr-download-row');
    result.innerHTML = ''; result.classList.add('hidden'); row.classList.add('hidden');
    if (!text) { setMessage('qr-message', 'Enter some text or a URL to make a QR code.', true); return; }
    if (text.length > 1600) { setMessage('qr-message', 'This text is too long. Please keep it under 1,600 characters.', true); return; }
    setMessage('qr-message', 'Loading QR generator…');
    try {
      await loadQrLibrary();
      new window.QRCode(result, { text, width: 240, height: 240, colorDark: '#242644', colorLight: '#ffffff', correctLevel: window.QRCode.CorrectLevel.M });
      result.classList.remove('hidden'); row.classList.remove('hidden');
      setMessage('qr-message', 'QR code created in your browser. The text was not uploaded.');
    } catch (error) {
      window.qrLibraryPromise = null; // A retry can request the CDN library again after a network failure.
      setMessage('qr-message', error.message || 'QR generation failed. Please try again.', true);
    }
  }
  if (action === 'clear-qr') {
    document.getElementById('qr-content').value = '';
    document.getElementById('qr-result').innerHTML = '';
    document.getElementById('qr-result').classList.add('hidden');
    document.getElementById('qr-download-row').classList.add('hidden');
    setMessage('qr-message', '');
  }
  if (action === 'download-qr') {
    const canvas = document.querySelector('#qr-result canvas');
    const img = document.querySelector('#qr-result img');
    const dataUrl = canvas?.toDataURL('image/png') || img?.src;
    if (!dataUrl) { setMessage('qr-message', 'There is no QR code to download yet.', true); return; }
    const anchor = document.createElement('a'); anchor.href = dataUrl; anchor.download = 'toolnest-qr.png'; anchor.click();
  }
  if (action === 'reverse-text') {
    const value = document.getElementById('reverse-input').value;
    document.getElementById('reverse-output').value = Array.from(value).reverse().join('');
    setMessage('reverse-message', value ? 'Reversed text is ready.' : 'Enter some text to reverse.', !value);
  }
  if (action === 'clear-reverse') {
    document.getElementById('reverse-input').value = ''; document.getElementById('reverse-output').value = ''; setMessage('reverse-message', '');
  }
  if (action === 'clean-spaces') {
    const value = document.getElementById('spaces-input').value;
    const cleaned = value.split('\n').map(line => line.replace(/[ \t]+/g, ' ').trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    document.getElementById('spaces-output').value = cleaned;
    setMessage('spaces-message', value ? 'Extra spaces removed.' : 'Enter some text to tidy.', !value);
  }
  if (action === 'clear-spaces') {
    document.getElementById('spaces-input').value = ''; document.getElementById('spaces-output').value = ''; setMessage('spaces-message', '');
  }
  if (action === 'calculate-percent') {
    const a = Number(document.getElementById('percent-a').value);
    const b = Number(document.getElementById('percent-b').value);
    const mode = document.getElementById('percent-mode').value;
    const box = document.getElementById('percent-result');
    if (document.getElementById('percent-a').value === '' || document.getElementById('percent-b').value === '' || !Number.isFinite(a) || !Number.isFinite(b)) {
      box.classList.add('hidden'); setMessage('percent-message', 'Enter a number in both fields.', true); return;
    }
    let answer;
    if (mode === 'of') answer = `${(a / 100 * b).toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
    else if (mode === 'is') {
      if (b === 0) { box.classList.add('hidden'); setMessage('percent-message', 'The whole value cannot be zero.', true); return; }
      answer = `${(a / b * 100).toLocaleString(undefined, { maximumFractionDigits: 8 })}%`;
    } else {
      if (a === 0) { box.classList.add('hidden'); setMessage('percent-message', 'The starting value cannot be zero.', true); return; }
      answer = `${(((b - a) / Math.abs(a)) * 100).toLocaleString(undefined, { maximumFractionDigits: 8 })}%`;
    }
    box.classList.remove('hidden'); box.querySelector('.result-value').textContent = answer;
    setMessage('percent-message', 'Calculation complete.');
  }
});

app.addEventListener('submit', event => {
  if (event.target.id !== 'contact-form') return;
  event.preventDefault();
  const data = new FormData(event.target);
  const subject = encodeURIComponent(`ToolNest note from ${data.get('name') || 'a visitor'}`);
  const body = encodeURIComponent(`Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\n\n${data.get('message') || ''}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

function navigateHash() {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('tool/')) render('tool', hash.split('/')[1]);
  else if (['tools', 'about', 'contact', 'privacy'].includes(hash)) render(hash);
  else render('home');
}
window.addEventListener('hashchange', navigateHash);
window.addEventListener('popstate', navigateHash);
navigateHash();
