const nav = document.querySelector<HTMLElement>('nav[aria-label="Primary"]');
if (nav) {
  nav.dataset.ready = "true";
}

const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
if (themeToggle) {
  const applyTheme = (theme: "light" | "dark") => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.textContent = isDark ? "☀" : "◐";
  };

  applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
}

const tabs = document.querySelectorAll<HTMLButtonElement>('.tabs [role="tab"]');
for (const tab of tabs) {
  tab.addEventListener("click", () => {
    for (const other of tabs) {
      other.setAttribute("aria-selected", String(other === tab));
      const panel = document.getElementById(other.getAttribute("aria-controls") ?? "");
      panel?.toggleAttribute("hidden", other !== tab);
    }
    tab.focus();
  });
}
