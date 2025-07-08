export const logger = {
  log: (...args: unknown[]) => {
    window.console.log("[LOG]", ...args);
  },
  error: (...args: unknown[]) => {
    window.console.error("[ERROR]", ...args);
  },
  warn: (...args: unknown[]) => {
    window.console.warn("[WARN]", ...args);
  },
};
