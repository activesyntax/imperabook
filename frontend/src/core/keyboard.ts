export type CommandKey = 'Tab' | 'Enter' | 'Escape' | 'PageDown' | 'PageUp' | 'ArrowDown' | 'ArrowUp' | 'Home' | 'End' | 'Backspace' | 'Delete';
export type KeyboardActions = Partial<Record<CommandKey, (e: KeyboardEvent) => void>>;

export function handleKeyboardEvent(event: KeyboardEvent, keyboardActions: KeyboardActions): void {
  const action = keyboardActions[event.key as CommandKey];
  if (action) {
    event.preventDefault();
    action(event);
  }
}

