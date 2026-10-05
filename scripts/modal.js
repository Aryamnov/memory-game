import { createElement } from './dom.js';

export function createModal() {
  const title = createElement('h2', { className: 'modalTitle' });
  const body = createElement('div', { className: 'modalBody' });
  const actions = createElement('div', { className: 'modalActions' });
  const closeButton = createElement('button', {
    className: 'button buttonSecondary',
    text: 'Закрыть',
    attributes: { type: 'button', autofocus: '' },
  });

  const content = createElement('div', {
    className: 'modalContent',
    children: [title, body, actions],
  });

  const dialog = createElement('dialog', {
    className: 'modal',
    children: [content],
  });

  function unlockScroll() {
    if (!dialog.open) {
      document.documentElement.classList.remove('modalOpen');
    }
  }

  function close() {
    dialog.close();
    unlockScroll();
  }

  function open({ title: heading, content: bodyContent, actions: extraActions = [] }) {
    title.textContent = heading;
    body.replaceChildren(bodyContent);
    actions.replaceChildren(...extraActions, closeButton);
    dialog.showModal();
    document.documentElement.classList.add('modalOpen');
  }

  closeButton.addEventListener('click', close);
  dialog.addEventListener('close', unlockScroll);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) {
      return;
    }

    const bounds = dialog.getBoundingClientRect();
    const isOutside = event.clientX < bounds.left
      || event.clientX > bounds.right
      || event.clientY < bounds.top
      || event.clientY > bounds.bottom;

    if (isOutside) {
      close();
    }
  });

  return { element: dialog, open, close };
}
