import { createApp } from 'vue';
import App from './App.vue';


createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    const header = document.querySelector("#b_header");
    header.insertBefore(app, header.firstChild);
    // document.body.append(app);
    return app;
  })(),
);
