const SCROLL_STEP_PX = 120;


export function scrollByStep(el: HTMLElement | undefined, direction: 1 | -1): void {
  el?.scrollBy({ top: direction * SCROLL_STEP_PX, behavior: 'smooth' });
}

export function scrollToTop(el: HTMLElement | undefined): void {
  el?.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToBottom(el: HTMLElement | undefined): void {
  el?.scrollTo({
    top: el.scrollHeight, behavior: 'smooth'
  });
}
