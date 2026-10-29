// Keep keyboard and assistive-technology navigation inside an open modal.
export function manageDialogFocus(dialog) {
  if (!dialog) return;
  let previousFocus = null;
  let background = [];
  let open = false;
  const focusable = () => Array.from(dialog.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => element.getClientRects().length && !element.closest('[inert]'));

  dialog.addEventListener('modal-open', () => {
    if (open) return;
    open = true;
    previousFocus = document.activeElement;
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('tabindex', '-1');
    // Inert siblings at every ancestor level, including a drawer inside a header.
    for (let node = dialog; node.parentElement; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling !== node && !sibling.inert) {
          background.push(sibling);
          sibling.inert = true;
        }
      }
      if (node.parentElement === document.body) break;
    }
    (focusable()[0] || dialog).focus();
  });

  dialog.addEventListener('modal-close', () => {
    if (!open) return;
    open = false;
    background.forEach((element) => { element.inert = false; });
    background = [];
    dialog.removeAttribute('aria-modal');
    if (previousFocus?.isConnected) previousFocus.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (!open || event.key !== 'Tab') return;
    const elements = focusable();
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (!first) {
      event.preventDefault();
      dialog.focus();
    } else if (!elements.includes(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
