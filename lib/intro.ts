type Listener = () => void;

let revealed = false;
const listeners = new Set<Listener>();

export function markRevealed() {
  if (revealed) return;
  revealed = true;
  listeners.forEach((listener) => listener());
}

export function onReveal(listener: Listener) {
  if (revealed) listener();
  else listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isRevealed() {
  return revealed;
}
