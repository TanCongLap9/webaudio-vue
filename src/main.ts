import { createApp } from 'vue';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import "./assets/styles.css";

window.nodes = {};

createApp(App).mount('#app');