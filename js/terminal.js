import { PORTFOLIO_DATA, getProjectBySlug } from './data.js';
import {
  renderWelcome,
  renderAbout,
  renderSkills,
  renderProjectsList,
  renderProject,
  renderExperience,
  renderLeadership,
  renderAchievements,
  renderTimeline,
  renderResume,
  renderContact,
  renderSocials,
  renderHelp,
  renderThemeList,
  bindPreviewInteractions,
} from './preview.js';

const PROMPT = 'hussain@portfolio ❯';

export class Terminal {
  constructor(elements, callbacks = {}) {
    this.outputEl = elements.output;
    this.inputEl = elements.input;
    this.previewEl = elements.preview;
    this.bootEl = elements.boot;
    this.workspaceEl = elements.workspace;
    this.promptEl = elements.prompt;
    this.previewCloseEl = elements.previewClose;
    this.previewOverlayEl = elements.previewOverlay;
    this.autocompleteEl = elements.autocomplete;

    this.history = [];
    this.historyIndex = -1;
    this.currentTheme = localStorage.getItem('portfolio-theme') || 'cyan';
    this.onNotify = callbacks.onNotify || (() => {});
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.promptEl.textContent = PROMPT;
    this.applyTheme(this.currentTheme, false);
    this.bindEvents();
    this.runBoot();
  }

  bindEvents() {
    this.inputEl.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.inputEl.addEventListener('input', () => this.updateAutocomplete());
    this.bootEl.addEventListener('click', () => this.enterTerminal());
    document.addEventListener('keydown', (e) => {
      if (!this.bootEl.classList.contains('hidden') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.enterTerminal();
      }
    });

    if (this.previewCloseEl) {
      this.previewCloseEl.addEventListener('click', () => this.closePreviewOverlay());
    }

    document.addEventListener('theme-change', (e) => {
      this.applyTheme(e.detail);
      this.setPreview(renderThemeList(this.currentTheme));
    });

    document.addEventListener('copy-discord', (e) => {
      navigator.clipboard.writeText(e.detail).then(() => {
        this.printSuccess(`Copied ${e.detail}`);
      });
    });
  }

  async runBoot() {
    const bootOutput = this.bootEl.querySelector('.boot-output');
    const lines = ['Connecting to portfolio...', 'Session established.'];

    if (this.reducedMotion) {
      bootOutput.textContent = lines.join('\n');
      setTimeout(() => this.enterTerminal(), 600);
      return;
    }

    for (const line of lines) {
      bootOutput.textContent += (bootOutput.textContent ? '\n' : '') + line;
      await this.delay(400);
    }
    setTimeout(() => this.enterTerminal(), 1200);
  }

  enterTerminal() {
    this.bootEl.classList.add('hidden');
    this.workspaceEl.classList.remove('hidden');
    this.inputEl.focus();
    this.showWelcomeBanner();
    this.setPreview(renderWelcome());
  }

  showWelcomeBanner() {
    this.outputEl.innerHTML = `
      <div class="terminal-banner">
        <div class="terminal-banner-divider">────────────────────────────────────────</div>
        <div class="terminal-banner-title">Mohammed Hussain Portfolio OS</div>
        <div class="terminal-banner-muted">Version 4.0</div>
        <br>
        <div class="terminal-banner-success">Connected.</div>
        <br>
        <div class="terminal-banner-muted">Type "help" to view available commands.</div>
        <div class="terminal-banner-divider">────────────────────────────────────────</div>
      </div>`;
  }

  handleKeydown(e) {
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      this.outputEl.innerHTML = '';
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      this.applyAutocomplete();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      this.hideAutocomplete();
      const value = this.inputEl.value.trim();
      if (value) this.executeCommand(value);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length === 0) return;
      if (this.historyIndex === -1) this.historyIndex = this.history.length - 1;
      else if (this.historyIndex > 0) this.historyIndex -= 1;
      this.inputEl.value = this.history[this.historyIndex];
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex === -1) return;
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex += 1;
        this.inputEl.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = -1;
        this.inputEl.value = '';
      }
    }
  }

  updateAutocomplete() {
    const value = this.inputEl.value.trim().toLowerCase();
    if (!value || !this.autocompleteEl) {
      this.hideAutocomplete();
      return;
    }

    const parts = value.split(/\s+/);
    const base = parts[0];
    const matches = PORTFOLIO_DATA.allCommands.filter((cmd) => cmd.startsWith(base)).slice(0, 6);

    if (matches.length === 0 || (matches.length === 1 && matches[0] === base && parts.length === 1)) {
      this.hideAutocomplete();
      return;
    }

    this.autocompleteEl.innerHTML = matches
      .map((m) => `<button type="button" class="autocomplete-item" data-value="${m}">${m}</button>`)
      .join('');
    this.autocompleteEl.classList.remove('hidden');
    this.autocompleteEl.querySelectorAll('.autocomplete-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rest = parts.slice(1).join(' ');
        this.inputEl.value = rest ? `${btn.dataset.value} ${rest}` : btn.dataset.value;
        this.hideAutocomplete();
        this.inputEl.focus();
      });
    });
  }

  applyAutocomplete() {
    const value = this.inputEl.value.trim().toLowerCase();
    if (!value) return;
    const parts = value.split(/\s+/);
    const match = PORTFOLIO_DATA.allCommands.find((cmd) => cmd.startsWith(parts[0]));
    if (match) {
      const rest = parts.slice(1).join(' ');
      this.inputEl.value = rest ? `${match} ${rest}` : match;
    }
    this.hideAutocomplete();
  }

  hideAutocomplete() {
    if (this.autocompleteEl) {
      this.autocompleteEl.classList.add('hidden');
      this.autocompleteEl.innerHTML = '';
    }
  }

  executeCommand(raw) {
    const input = raw.trim();
    if (!input) return;

    this.history.push(input);
    this.historyIndex = -1;
    this.printInput(input);

    const parts = input.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        this.printGroupedHelp();
        break;
      case 'about':
        this.setPreview(renderAbout());
        break;
      case 'skills':
        this.setPreview(renderSkills());
        break;
      case 'projects':
      case 'list':
        this.setPreview(renderProjectsList());
        break;
      case 'open':
        if (!arg) {
          this.printError('Usage: open <project>');
        } else {
          this.openProject(arg);
        }
        break;
      case 'experience':
        this.setPreview(renderExperience());
        break;
      case 'leadership':
      case 'community':
        this.setPreview(renderLeadership());
        break;
      case 'achievements':
        this.setPreview(renderAchievements());
        break;
      case 'timeline':
        this.setPreview(renderTimeline());
        break;
      case 'resume':
        this.setPreview(renderResume());
        break;
      case 'contact':
        this.setPreview(renderContact());
        document.dispatchEvent(new CustomEvent('contact-form-mounted'));
        break;
      case 'socials':
        this.setPreview(renderSocials());
        break;
      case 'theme':
        if (!arg) {
          this.printLine('Themes: cyan, matrix, purple, amber, white', 'muted');
          this.setPreview(renderThemeList(this.currentTheme));
        } else {
          this.applyTheme(arg);
          this.printSuccess(`Theme → ${this.currentTheme}`);
        }
        break;
      case 'clear':
        this.outputEl.innerHTML = '';
        break;
      case 'history':
        if (this.history.length === 0) {
          this.printLine('No history.', 'muted');
        } else {
          this.history.forEach((h, i) => this.printLine(`${i + 1}  ${h}`, 'muted'));
        }
        break;
      case 'whoami':
        this.printLine(`${PORTFOLIO_DATA.profile.name} · ${PORTFOLIO_DATA.profile.role}`);
        break;
      case 'neofetch':
        this.printNeofetch();
        this.setPreview(renderAbout());
        break;
      case 'github':
        window.open('https://github.com/MHK-123', '_blank', 'noopener,noreferrer');
        this.printSuccess('Opened GitHub');
        break;
      case 'linkedin':
        window.open(
          'https://www.linkedin.com/in/mohammed-hussain-6306a1334/',
          '_blank',
          'noopener,noreferrer'
        );
        this.printSuccess('Opened LinkedIn');
        break;
      default: {
        const project = getProjectBySlug(cmd);
        if (project) {
          this.openProject(cmd);
        } else {
          this.printError(`Command not found: ${input}`);
        }
      }
    }
  }

  openProject(slug) {
    const project = getProjectBySlug(slug);
    if (!project) {
      this.printError(`Project not found: ${slug}`);
      this.setPreview(renderProjectsList());
      return;
    }
    this.printSuccess(`→ ${project.name}`);
    this.setPreview(renderProject(slug));
  }

  printGroupedHelp() {
    PORTFOLIO_DATA.commandGroups.forEach((group) => {
      this.printLine(group.title, 'heading');
      this.printLine('─'.repeat(group.title.length), 'muted');
      group.commands.forEach(({ cmd, desc }) => {
        const line = document.createElement('div');
        line.className = 'terminal-line terminal-help-row';
        line.innerHTML = `<span class="cmd-name">${cmd.padEnd(16)}</span><span class="cmd-desc">${desc}</span>`;
        this.outputEl.appendChild(line);
      });
      this.printLine('', 'muted');
    });
    this.setPreview(renderHelp());
  }

  printNeofetch() {
    const skillCount = Object.values(PORTFOLIO_DATA.skills).flat().length;
    const projectCount = PORTFOLIO_DATA.projects.length;
    this.printLines([
      '       ┌────────────────┐',
      '       │ MH@portfolio   │',
      `       │ theme: ${this.currentTheme.padEnd(8)}│`,
      `       │ skills: ${String(skillCount).padEnd(7)}│`,
      `       │ projects: ${String(projectCount).padEnd(5)}│`,
      '       └────────────────┘',
    ]);
  }

  printInput(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line terminal-input-line';
    line.innerHTML = `<span class="prompt">${PROMPT}</span> <span class="input-cmd">${this.escape(text)}</span>`;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  printLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  printLines(lines) {
    lines.forEach((line) => this.printLine(line));
  }

  printError(text) {
    this.printLine(text, 'error');
  }

  printSuccess(text) {
    this.printLine(text, 'success');
  }

  setPreview(html) {
    this.previewEl.classList.remove('preview-animate');
    void this.previewEl.offsetWidth;
    this.previewEl.innerHTML = html;
    this.previewEl.classList.add('preview-animate');

    bindPreviewInteractions(this.previewEl, (slug) => {
      this.executeCommand(`open ${slug}`);
    });
  }

  closePreviewOverlay() {
    this.previewOverlayEl.classList.remove('open');
  }

  applyTheme(themeName, notify = true) {
    const theme = PORTFOLIO_DATA.themes.includes(themeName) ? themeName : 'cyan';
    this.currentTheme = theme;
    if (theme === 'cyan') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('portfolio-theme', theme);
    if (notify) this.printSuccess(`Theme → ${theme}`);
  }

  escape(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
