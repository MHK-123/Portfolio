import { PORTFOLIO_DATA } from './data.js';
import { Terminal } from './terminal.js';

function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  requestAnimationFrame(() => notification.classList.add('show'));
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelectorAll('.form-error').forEach((el) => {
      el.textContent = '';
    });

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
      document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
      isValid = false;
    }
    if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address';
      isValid = false;
    }
    if (subject.length < 5) {
      document.getElementById('subject-error').textContent = 'Subject must be at least 5 characters';
      isValid = false;
    }
    if (message.length < 10) {
      document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
      isValid = false;
    }

    if (!isValid) {
      showNotification('Please fix the errors above.', 'error');
      return;
    }

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(PORTFOLIO_DATA.formspree, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        showNotification('Message sent successfully!', 'success');
        form.reset();
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      showNotification('Falling back to email client...', 'info');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const terminal = new Terminal(
    {
      boot: document.getElementById('boot-screen'),
      workspace: document.getElementById('terminal-workspace'),
      output: document.getElementById('terminal-output'),
      input: document.getElementById('terminal-input'),
      preview: document.getElementById('preview-content'),
      prompt: document.getElementById('terminal-prompt'),
      chips: document.getElementById('command-chips'),
      previewOverlay: document.getElementById('preview-panel'),
      previewClose: document.getElementById('preview-close'),
    },
    {
      onNotify: showNotification,
    }
  );

  document.addEventListener('contact-form-mounted', initContactForm);

  window.portfolioTerminal = terminal;
});
