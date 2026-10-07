const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function scrambleTo(element: HTMLElement, finalText: string, duration = 700) {
  const letters = finalText.split("");
  const start = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const settled = Math.floor(progress * letters.length);
    element.textContent = letters
      .map((letter, index) => {
        if (letter === " ") return " ";
        if (index < settled) return letter;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join("");

    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      element.textContent = finalText;
    }
  };

  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
    element.textContent = finalText;
  };
}
