import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import App from './App.vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import router from './router.js';
import store from './Store';
import Notifications from '@kyvg/vue3-notification'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const optionsSwal = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
  };

 
DataTable.use(DataTablesCore);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./${name}.vue`, import.meta.glob('./**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(router)
            .use(store)
            .use(Notifications)
            .use(VueSidebarMenu)
            .use(PerfectScrollbarPlugin)
            .use(ZiggyVue)
            .component('DataTable', DataTable) 
            .use(VueSweetalert2, optionsSwal)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// createApp(App)
//   .use(router)
//   .mount('#app');
