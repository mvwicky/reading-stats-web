/// <reference types="svelte" />

console.log("Index!");

import "sanitize.css/sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";

import App from "./App.svelte";

var app = new App({
  target: document.body,
});

export default app;

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  console.log("Hot!");
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
