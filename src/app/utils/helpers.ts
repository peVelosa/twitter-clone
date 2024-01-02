export function adjustTextAreaHeight(el: HTMLElement | null) {
  if (!el) return;
  el.style.height = '0px';
  const scrollHeight = el.scrollHeight;
  el.style.height = scrollHeight + 'px';
}
export function focusInput(el: HTMLElement | null) {
  if (!el) return;
  el.focus();
}
export function getTime(updatedAt: Date) {
  enum TIME {
    day = 1000 * 60 * 60 * 24,
    hour = 1000 * 60 * 60,
    min = 1000 * 60,
    sec = 1000,
  }
  const now = new Date().getTime() - new Date(updatedAt).getTime();
  const days = Math.floor(now / TIME.day);
  const hours = Math.floor((now % TIME.day) / TIME.hour);
  const mins = Math.floor(((now % TIME.day) % TIME.hour) / TIME.min);
  const sec = Math.floor(
    (((now % TIME.day) % TIME.hour) % TIME.min) / TIME.sec,
  );
  if (days > 0) {
    return days + 'd';
  }
  if (hours > 0) {
    return hours + 'h';
  }
  if (mins > 0) {
    return mins + 'm';
  }
  return sec + 's';
}
