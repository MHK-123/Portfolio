import { PORTFOLIO_DATA, getProjectBySlug } from './data.js';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderProjectIcon(project) {
  if (project.thumbnail) {
    return `<img src="${project.thumbnail}" alt="" class="project-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <span class="project-icon-fallback" style="display:none">${escapeHtml(project.name.charAt(0))}</span>`;
  }
  return `<span class="project-icon-fallback">${escapeHtml(project.name.charAt(0))}</span>`;
}

function renderThumbnail(project) {
  if (project.thumbnail) {
    return `<div class="preview-thumb"><img src="${project.thumbnail}" alt="${escapeHtml(project.name)}" onerror="this.parentElement.classList.add('${project.placeholderClass}'); this.remove();"></div>`;
  }
  return `<div class="preview-thumb ${project.placeholderClass}"><span>${escapeHtml(project.name.charAt(0))}</span></div>`;
}

function statusBadge(status) {
  if (status === 'live') return '<span class="badge badge-live">Live</span>';
  if (status === 'development') return '<span class="badge badge-dev">In Development</span>';
  return '';
}

function renderLinks(links) {
  if (!links.length) return '';
  return `<div class="preview-actions">${links
    .map(
      (link) =>
        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${escapeHtml(link.label)}</a>`
    )
    .join('')}</div>`;
}

function renderTechTags(tech) {
  return `<div class="tag-list">${tech.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`;
}

function renderList(items) {
  return `<ul class="preview-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

export function renderWelcome() {
  const { name, role, education } = PORTFOLIO_DATA.profile;
  return `
    <div class="preview-welcome">
      <div class="preview-welcome-icon">>_</div>
      <h2>Welcome</h2>
      <p>Type <code>help</code> to see available commands, or try <code>about</code>, <code>projects</code>, or <code>resume</code>.</p>
      <div class="preview-meta">
        <span>${escapeHtml(name)}</span>
        <span>${escapeHtml(role)}</span>
        <span>${escapeHtml(education)}</span>
      </div>
    </div>`;
}

export function renderAbout() {
  const { name, role, education, location, bio, interests, currentFocus, hobbies, avatar } =
    PORTFOLIO_DATA.profile;
  return `
    <div class="preview-section">
      <div class="preview-header-row">
        <div class="preview-avatar-wrap">
          <img src="${avatar}" alt="${escapeHtml(name)}" class="preview-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="preview-avatar-fallback" style="display:none">MH</div>
        </div>
        <div>
          <h2>${escapeHtml(name)}</h2>
          <p class="preview-subtitle">${escapeHtml(role)}</p>
          <p class="preview-muted">${escapeHtml(education)} · ${escapeHtml(location)}</p>
        </div>
      </div>
      ${bio.map((p) => `<p class="preview-text">${escapeHtml(p)}</p>`).join('')}
      <div class="preview-card">
        <h3>Current Focus</h3>
        ${renderList(currentFocus)}
      </div>
      <div class="preview-card">
        <h3>Interests</h3>
        <div class="tag-list">${interests.map((i) => `<span class="tag">${escapeHtml(i)}</span>`).join('')}</div>
      </div>
      <div class="preview-card">
        <h3>Hobbies</h3>
        <div class="tag-list">${hobbies.map((h) => `<span class="tag tag-muted">${escapeHtml(h)}</span>`).join('')}</div>
      </div>
    </div>`;
}

export function renderSkills() {
  const { skills } = PORTFOLIO_DATA;
  const categories = Object.entries(skills)
    .map(
      ([category, items]) => `
      <div class="preview-card">
        <h3>${escapeHtml(category)}</h3>
        <div class="tag-list">${items.map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>
      </div>`
    )
    .join('');
  return `<div class="preview-section"><h2>Skills & Technologies</h2>${categories}</div>`;
}

export function renderProjectsList() {
  const items = PORTFOLIO_DATA.projects
    .map(
      (p) => `
      <button type="button" class="project-list-item" data-slug="${p.slug}">
        <div class="project-icon-wrap">${renderProjectIcon(p)}</div>
        <div class="project-list-body">
          <strong>${escapeHtml(p.name)}</strong>
          <span>${escapeHtml(p.subtitle)}</span>
        </div>
        ${statusBadge(p.status)}
      </button>`
    )
    .join('');
  return `
    <div class="preview-section preview-animate-inner">
      <h2>Featured Projects</h2>
      <p class="preview-muted">Run <code>open &lt;slug&gt;</code> to view details</p>
      <div class="project-list">${items}</div>
    </div>`;
}

export function renderProject(slug) {
  const project = getProjectBySlug(slug);
  if (!project) {
    return `<div class="preview-section"><h2>Project Not Found</h2><p class="preview-muted">Try <code>projects</code> to see available slugs.</p></div>`;
  }
  return `
    <div class="preview-section preview-animate-inner">
      <div class="preview-header-row preview-header-stack">
        ${renderThumbnail(project)}
        <div>
          <div class="preview-title-row">
            <h2>${escapeHtml(project.name)}</h2>
            ${statusBadge(project.status)}
          </div>
          <p class="preview-subtitle">${escapeHtml(project.subtitle)}</p>
        </div>
      </div>
      <p class="preview-text">${escapeHtml(project.description)}</p>
      <div class="preview-card">
        <h3>Key Features</h3>
        ${renderList(project.features)}
      </div>
      <div class="preview-card">
        <h3>Tech Stack</h3>
        ${renderTechTags(project.tech)}
      </div>
      ${project.status === 'development' ? '<p class="preview-footnote">Public release coming soon.</p>' : ''}
      ${renderLinks(project.links)}
      <p class="preview-footnote">Source available on request — repository is private.</p>
    </div>`;
}

export function renderExperience() {
  const exp = PORTFOLIO_DATA.experience;
  return `
    <div class="preview-section">
      <h2>Experience</h2>
      <div class="preview-card">
        <h3>${escapeHtml(exp.title)}</h3>
        <p class="preview-subtitle">${escapeHtml(exp.organization)}</p>
        <p class="preview-muted">${escapeHtml(exp.duration)} · ${escapeHtml(exp.programLength)} · ${escapeHtml(exp.status)}</p>
        <p class="preview-text">${escapeHtml(exp.description)}</p>
        <h4>Responsibilities</h4>
        ${renderList(exp.responsibilities)}
        <h4>Technologies</h4>
        ${renderTechTags(exp.technologies)}
      </div>
    </div>`;
}

export function renderLeadership() {
  const lead = PORTFOLIO_DATA.leadership;
  return `
    <div class="preview-section">
      <h2>Leadership & Community</h2>
      <div class="preview-card">
        <h3>${escapeHtml(lead.role)} — ${escapeHtml(lead.organization)}</h3>
        <p class="preview-muted">${escapeHtml(lead.organizationFull)} · ${escapeHtml(lead.duration)}</p>
        <p class="preview-text">${escapeHtml(lead.description)}</p>
        <h4>Responsibilities</h4>
        ${renderList(lead.responsibilities)}
      </div>
    </div>`;
}

export function renderAchievements() {
  return `
    <div class="preview-section">
      <h2>Achievements</h2>
      <div class="preview-card">
        ${renderList(PORTFOLIO_DATA.achievements)}
      </div>
    </div>`;
}

export function renderTimeline() {
  const items = PORTFOLIO_DATA.timeline
    .map(
      (entry) => `
      <div class="timeline-item">
        <span class="timeline-year">${escapeHtml(entry.year)}</span>
        <span class="timeline-event">${escapeHtml(entry.event)}</span>
      </div>`
    )
    .join('');
  return `<div class="preview-section"><h2>Timeline</h2><div class="timeline">${items}</div></div>`;
}

export function renderResume() {
  const { viewUrl, downloadUrl } = PORTFOLIO_DATA.resume;
  return `
    <div class="preview-section">
      <h2>Resume</h2>
      <p class="preview-text">Download or view my resume in a new tab.</p>
      <div class="preview-actions">
        <a href="${viewUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Get Resume</a>
        <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Download PDF</a>
      </div>
    </div>`;
}

export function renderSocials() {
  const items = PORTFOLIO_DATA.social
    .map((s) => {
      if (s.copy) {
        return `<button type="button" class="social-item social-copy" data-copy="${escapeHtml(s.value)}">
          <span class="social-icon social-icon-${s.icon}"></span>
          <span>${escapeHtml(s.name)}</span>
          <code>${escapeHtml(s.value)}</code>
        </button>`;
      }
      return `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-item">
        <span class="social-icon social-icon-${s.icon}"></span>
        <span>${escapeHtml(s.name)}</span>
      </a>`;
    })
    .join('');
  return `<div class="preview-section"><h2>Social Links</h2><div class="social-grid">${items}</div></div>`;
}

export function renderContact() {
  return `
    <div class="preview-section">
      <h2>Contact</h2>
      <p class="preview-text">Ready to collaborate? Send a message or connect through social channels.</p>
      ${renderSocials()}
      <form class="contact-form" id="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required autocomplete="name">
          <span class="form-error" id="name-error"></span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required autocomplete="email">
          <span class="form-error" id="email-error"></span>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" required>
          <span class="form-error" id="subject-error"></span>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
          <span class="form-error" id="message-error"></span>
        </div>
        <button type="submit" class="btn btn-primary btn-submit">
          Send Message
        </button>
      </form>
    </div>`;
}

export function renderHelp() {
  const groups = PORTFOLIO_DATA.commandGroups
    .map(
      (group) => `
      <div class="help-group">
        <h3>${escapeHtml(group.title)}</h3>
        ${group.commands
          .map(
            (c) =>
              `<div class="help-row"><code>${escapeHtml(c.cmd)}</code><span>${escapeHtml(c.desc)}</span></div>`
          )
          .join('')}
      </div>`
    )
    .join('');
  return `<div class="preview-section preview-animate-inner"><h2>Commands</h2>${groups}</div>`;
}

export function renderThemeList(currentTheme) {
  const themes = PORTFOLIO_DATA.themes
    .map(
      (t) =>
        `<button type="button" class="theme-option ${t === currentTheme ? 'active' : ''}" data-theme="${t}">${escapeHtml(t)}</button>`
    )
    .join('');
  return `
    <div class="preview-section">
      <h2>Themes</h2>
      <p class="preview-muted">Run <code>theme &lt;name&gt;</code> or select below.</p>
      <div class="theme-grid">${themes}</div>
    </div>`;
}

export function bindPreviewInteractions(container, onProjectOpen) {
  container.querySelectorAll('.project-list-item').forEach((btn) => {
    btn.addEventListener('click', () => onProjectOpen(btn.dataset.slug));
  });

  container.querySelectorAll('.theme-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('theme-change', { detail: btn.dataset.theme }));
    });
  });

  container.querySelectorAll('.social-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('copy-discord', { detail: btn.dataset.copy }));
    });
  });
}
