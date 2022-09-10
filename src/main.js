//Bootstrap imports:
import "bootstrap/dist/css/bootstrap.css";

//FontAwesome imports:
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

library.add(faPlane)

app.use(createPinia());

app.mount("#app");

import "bootstrap/dist/js/bootstrap"