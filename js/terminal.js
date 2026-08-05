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

export class Terminal {
  constructor(elements, callbacks = {}) {
    this.outputEl = elements.output;
    this.inputEl = elements.input;
    this.previewEl = elements.preview;
    this.bootEl = elements.boot;
    this.workspaceEl = elements.workspace;
    this.promptEl = elements.prompt;
    this.chipsEl = elements.chips;
    this.previewCloseEl = elements.previewClose;
    this.previewOverlayEl = elements.previewOverlay;

    this.history = [];
    this.historyIndex = -1;
    this.currentTheme = localStorage.getItem('portfolio-theme') || 'cyan';
    this.onThemeChange = callbacks.onThemeChange || (() => {});
    this.onNotify = callbacks.onNotify || (() => {});
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme, false);
    this.renderQuickChips();
    this.bindEvents();
    this.runBoot();
  }

  bindEvents() {
    this.inputEl.addEventListener('keydown', (e) => this.handleKeydown(e));
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
        this.onNotify(`Copied "${e.detail}" to clipboard`, 'success');
      });
    });
  }

  renderQuickChips() {
    this.chipsEl.innerHTML = PORTFOLIO_DATA.quickCommands
      .map((cmd) => `<button type="button" class="cmd-chip" data-cmd="${cmd}">${cmd}</button>`)
      .join('');
    this.chipsEl.querySelectorAll('.cmd-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.inputEl.value = chip.dataset.cmd;
        this.executeCommand(chip.dataset.cmd);
      });
    });
  }

  async runBoot() {
    const lines = [
      'Initializing portfolio v2.0...',
      'Loading modules...',
      'Mounting terminal workspace...',
      'Ready.',
    ];
    const bootOutput = this.bootEl.querySelector('.boot-output');
    const bootTagline = this.bootEl.querySelector('.boot-tagline');

    if (this.reducedMotion) {
      bootOutput.innerHTML = lines.map((l) => `<div>${l}</div>`).join('');
      bootTagline.textContent = PORTFOLIO_DATA.profile.bootTaglines.join(' · ');
      setTimeout(() => this.enterTerminal(), 800);
      return;
    }

    for (const line of lines) {
      bootOutput.innerHTML += `<div>${line}</div>`;
      await this.delay(350);
    }

    let taglineIndex = 0;
    const cycleTagline = () => {
      bootTagline.textContent = PORTFOLIO_DATA.profile.bootTaglines[taglineIndex];
      taglineIndex = (taglineIndex + 1) % PORTFOLIO_DATA.profile.bootTaglines.length;
    };
    cycleTagline();
    const taglineInterval = setInterval(cycleTagline, 1200);

    setTimeout(() => {
      clearInterval(taglineInterval);
      this.enterTerminal();
    }, 3000);
  }

  enterTerminal() {
    this.bootEl.classList.add('hidden');
    this.workspaceEl.classList.remove('hidden');
    this.inputEl.focus();
    this.setPreview(renderWelcome());
    this.executeCommand('help', false);
  }

  handleKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
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

  executeCommand(raw, addToHistory = true) {
    const input = raw.trim();
    if (!input) return;

    if (addToHistory) {
      this.history.push(input);
      this.historyIndex = -1;
      this.printLine(input, true);
    }
    this.inputEl.value = '';

    const parts = input.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        this.printLines([
          'Available commands:',
          ...PORTFOLIO_DATA.commands.map((c) => `  ${c.cmd.padEnd(18)} ${c.desc}`),
        ]);
        this.setPreview(renderHelp());
        break;
      case 'about':
        this.printLine('Opening profile...');
        this.setPreview(renderAbout());
        break;
      case 'skills':
        this.printLine('Loading skills...');
        this.setPreview(renderSkills());
        break;
      case 'projects':
        this.printLine('Loading projects...');
        this.setPreview(renderProjectsList());
        break;
      case 'open':
        if (!arg) {
          this.printLine('Usage: open <slug>  (e.g. open blueprint)', false, 'error');
          this.setPreview(renderProjectsList());
        } else {
          this.openProject(arg);
        }
        break;
      case 'experience':
        this.printLine('Loading experience...');
        this.setPreview(renderExperience());
        break;
      case 'leadership':
      case 'community':
        this.printLine('Loading leadership...');
        this.setPreview(renderLeadership());
        break;
      case 'achievements':
        this.printLine('Loading achievements...');
        this.setPreview(renderAchievements());
        break;
      case 'timeline':
        this.printLine('Loading timeline...');
        this.setPreview(renderTimeline());
        break;
      case 'resume':
        this.printLine('Opening resume...');
        this.setPreview(renderResume());
        break;
      case 'contact':
        this.printLine('Opening contact...');
        this.setPreview(renderContact());
        document.dispatchEvent(new CustomEvent('contact-form-mounted'));
        break;
      case 'socials':
        this.printLine('Loading social links...');
        this.setPreview(renderSocials());
        break;
      case 'theme':
        if (!arg) {
          this.printLine('Available themes: cyan, matrix, purple, amber, white');
          this.setPreview(renderThemeList(this.currentTheme));
        } else {
          this.applyTheme(arg);
          this.printLine(`Theme switched to ${this.currentTheme}`);
          this.setPreview(renderThemeList(this.currentTheme));
        }
        break;
      case 'clear':
        this.outputEl.innerHTML = '';
        break;
      case 'history':
        if (this.history.length === 0) this.printLine('No command history yet.');
        else this.printLines(this.history.map((h, i) => `  ${i + 1}. ${h}`));
        break;
      case 'whoami':
        this.printLine(`${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.role}`);
        break;
      case 'neofetch':
        this.printNeofetch();
        break;
      case 'github':
        window.open('https://github.com/MHK-123', '_blank', 'noopener,noreferrer');
        this.printLine('Opening GitHub...');
        break;
      case 'linkedin':
        window.open(
          'https://www.linkedin.com/in/mohammed-hussain-6306a1334/',
          '_blank',
          'noopener,noreferrer'
        );
        this.printLine('Opening LinkedIn...');
        break;
      default: {
        const project = getProjectBySlug(cmd);
        if (project) {
          this.openProject(cmd);
        } else if (cmd === 'blueprint' || cmd === 'finvora' || cmd === 'fluxa' || cmd === 'scribe') {
          this.openProject(cmd);
        } else {
          this.printLine(`Command not found: ${input}. Type 'help' for available commands.`, false, 'error');
        }
      }
    }
  }

  openProject(slug) {
    const project = getProjectBySlug(slug);
    if (!project) {
      this.printLine(`Project not found: ${slug}`, false, 'error');
      this.setPreview(renderProjectsList());
      return;
    }
    this.printLine(`Opening ${project.name}...`);
    this.setPreview(renderProject(slug));
  }

  printNeofetch() {
    const skillCount = Object.values(PORTFOLIO_DATA.skills).flat().length;
    const projectCount = PORTFOLIO_DATA.projects.length;
    const art = [
      '   ┌──────────────┐',
      '   │  MH@portfolio │',
      '   │  ────────────│',
      `   │  role: dev    │`,
      `   │  theme: ${this.currentTheme.padEnd(7)}│`,
      `   │  skills: ${String(skillCount).padEnd(5)}│`,
      `   │  projects: ${String(projectCount).padEnd(3)}│`,
      '   └──────────────┘',
    ];
    this.printLines(art);
    this.setPreview(renderAbout());
  }

  printLine(text, isInput = false, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${isInput ? 'terminal-input-line' : ''} ${type}`;
    if (isInput) {
      line.innerHTML = `<span class="prompt">${this.promptEl.textContent}</span> ${this.escape(text)}`;
    } else {
      line.textContent = text;
    }
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  printLines(lines, type = '') {
    lines.forEach((line) => this.printLine(line, false, type));
  }

  setPreview(html) {
    this.previewEl.innerHTML = html;
    bindPreviewInteractions(this.previewEl, (slug) => {
      this.executeCommand(`open ${slug}`);
    });

    if (window.innerWidth <= 768) {
      this.previewOverlayEl.classList.add('open');
    }
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
    this.onThemeChange(theme);
    if (notify) this.onNotify(`Theme: ${theme}`, 'info');
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
