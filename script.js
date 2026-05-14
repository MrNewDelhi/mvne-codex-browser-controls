const cases = {
  visual: {
    url: "localhost:3000/checkout",
    title: "Reproducing visual UI bugs",
    gif: "assets/use-cases/visual-bug-replay.gif",
    poster: "assets/use-cases/visual-bug-replay.png",
    alt: "Animated GIF showing visual bug replay browser workflow",
    description:
      "Codex opens the affected page, reproduces layout, spacing, overflow, alignment, or rendering issues, and returns concrete visual evidence.",
    steps: ["Open the reported route", "Replay the user sequence", "Capture evidence", "Gate with approval and domain policy"]
  },
  release: {
    url: "staging.example.com/release",
    title: "Release smoke-test assistant",
    gif: "assets/use-cases/release-smoke-test.gif",
    poster: "assets/use-cases/release-smoke-test.png",
    alt: "Animated GIF showing release smoke test route checks and pass meter",
    description:
      "Codex walks critical routes before shipping, records what passed, and flags broken navigation, missing states, or risky regressions.",
    steps: ["Load release checklist", "Visit key flows", "Summarize pass/fail", "Clear browser data after testing"]
  },
  forms: {
    url: "localhost:5173/forms",
    title: "Form workflow QA",
    gif: "assets/use-cases/form-workflow-qa.gif",
    poster: "assets/use-cases/form-workflow-qa.png",
    alt: "Animated GIF showing form workflow validation and submit verification",
    description:
      "Codex tests typing, dropdowns, validation messages, submits, modals, checkboxes, disabled states, and confirmation paths.",
    steps: ["Fill realistic inputs", "Trigger validation", "Submit safe test data", "Verify confirmation state"]
  },
  policy: {
    url: "approved-preview.internal",
    title: "Controlled browsing with allow/block rules",
    gif: "assets/use-cases/controlled-browsing.gif",
    poster: "assets/use-cases/controlled-browsing.png",
    alt: "Animated GIF showing approved and blocked domain browser policy checks",
    description:
      "Teams can keep repeat low-risk previews smooth while blocking production, identity, HR, finance, and customer-data systems.",
    steps: ["Check destination", "Apply allow/block list", "Ask before unreviewed URLs", "Log the decision"]
  },
  design: {
    url: "storybook.local/button",
    title: "Design-system drift detection",
    gif: "assets/use-cases/design-system-drift.gif",
    poster: "assets/use-cases/design-system-drift.png",
    alt: "Animated GIF showing design system drift detection in a component page",
    description:
      "Codex compares live UI against expected spacing, typography, radius, icon treatment, hierarchy, responsive behavior, and theme rules.",
    steps: ["Open component story", "Inspect variants", "Compare against rules", "Report visual drift"]
  },
  automation: {
    url: "localhost:3000/manual-test",
    title: "Manual-test-to-automation bridge",
    gif: "assets/use-cases/manual-to-automation.gif",
    poster: "assets/use-cases/manual-to-automation.png",
    alt: "Animated GIF showing manual browser steps converted into automated test code",
    description:
      "Codex runs a manual browser test first, then turns the observed steps into Playwright, Cypress, Selenium, or another automation path.",
    steps: ["Run manual scenario", "Record stable steps", "Draft automation", "Preserve evidence"]
  }
};

const buttons = document.querySelectorAll(".scenario-button");
const title = document.querySelector("#case-title");
const description = document.querySelector("#case-description");
const url = document.querySelector("#case-url");
const gif = document.querySelector("#case-gif");
const gifLink = document.querySelector("#case-gif-link");
const gifAsset = document.querySelector("#case-gif-asset");
const posterAsset = document.querySelector("#case-poster-asset");
const stepEls = [
  document.querySelector("#case-step-1"),
  document.querySelector("#case-step-2"),
  document.querySelector("#case-step-3"),
  document.querySelector("#case-step-4")
];

function setCase(key) {
  const next = cases[key];
  if (!next) return;

  buttons.forEach((button) => {
    const isActive = button.dataset.case === key;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  title.textContent = next.title;
  description.textContent = next.description;
  url.textContent = next.url;
  gif.src = `${next.gif}?v=${key}`;
  gif.alt = next.alt;
  gifLink.href = next.gif;
  gifAsset.href = next.gif;
  posterAsset.href = next.poster;
  stepEls.forEach((step, index) => {
    step.textContent = next.steps[index];
  });

  document.querySelector(".theater-stage")?.classList.remove("pulse");
  requestAnimationFrame(() => {
    document.querySelector(".theater-stage")?.classList.add("pulse");
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setCase(button.dataset.case));
});
