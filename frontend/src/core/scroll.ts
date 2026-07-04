const SCROLL_STEP_PX = 120;
const PAGE_FRACTION = 0.9;


export function scrollByPage(el: HTMLElement | undefined, direction: 1 | -1): void {
  el?.scrollBy({
    top: direction * el.clientHeight * PAGE_FRACTION, behavior: 'smooth'
  });
}

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
