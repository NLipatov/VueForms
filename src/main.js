//Bootstrap imports:
import "bootstrap/dist/css/bootstrap.css";

//FontAwesome imports:
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMars, faVenus, faTable, faPenToSquare, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Form from "./views/Form.vue";
import Table from "./views/Table.vue";

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {path: '/', name: 'Home', component: Home},
            {path: '/about', name: 'About', component: About},
            {path: '/form', name: 'Form', component: Form},
            {path: '/table', name: 'Table', component: Table},
        ]
    }
);

const app = createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon);

library.add(faMars, faVenus, faPenToSquare, faTable, faCircleCheck, faCircleXmark)

app.use(createPinia());

app.mount("#app");

import "bootstrap/dist/js/bootstrap"