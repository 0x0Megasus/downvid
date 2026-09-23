export interface ToastItem {
  id: number;
  message: string;
}

type Listener = (items: ToastItem[]) => void;

let nextId = 1;
let items: ToastItem[] = [];
const listeners = new Set<Listener>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();

const TOAST_TTL_MS = 4500;

function emit() {
  for (const fn of listeners) fn([...items]);
}

export function pushToast(message: string): number {
  const clean = message.trim();
  if (!clean) return -1;
  // Collapse repeats of the same message into one toast.
  const existing = items.find((t) => t.message === clean);
  if (existing) {
    const timer = timers.get(existing.id);
    if (timer) {
      clearTimeout(timer);
      timers.set(
        existing.id,
        setTimeout(() => dismissToast(existing.id), TOAST_TTL_MS),
      );
    }
    return existing.id;
  }
  const id = nextId++;
  items = [...items.slice(-2), { id, message: clean }];
  timers.set(id, setTimeout(() => dismissToast(id), TOAST_TTL_MS));
  emit();
  return id;
}

export function dismissToast(id: number) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  if (!items.some((t) => t.id === id)) return;
  items = items.filter((t) => t.id !== id);
  emit();
}

export function subscribeToast(fn: Listener): () => void {
  listeners.add(fn);
  fn([...items]);
  return () => {
    listeners.delete(fn);
  };
}
