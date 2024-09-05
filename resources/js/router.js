// resources/js/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './Pages/Auth/Login.vue';
import Welcome from './Pages/Welcome.vue';
import store from '@/Store';
// import Dashbooard from './Pages/Welcome.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login,
  // },
  // { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    component: Welcome,
    children: [
      { 
        path: '/dashboard', 
        name: 'Dashboard', 
        component: () => import("./Pages/Dashboard.vue")
      },

      //===============MENU MANAGEMENT=============== 
      
      { path: '/menuManagement', 
        name: 'Menu', 
        component: () => import("./Pages/menuManagement/Index.vue")
       },

       //===============AUTHORIZATION GROUP=============== 

      { path: '/authorizationGroup', 
        name: 'Authorization', 
        component: () => import("./Pages/authorizationGroup/Index.vue")
       },
       //===============AUTHORIZATION GROUP=============== 

      { path: '/report/byyear', 
        name: 'ReportByYear', 
        component: () => import("./Pages/report/Index.vue")
       },
       
      // Tambahkan rute lain di sini

       //END
      { path: '', redirect: '/dashboard' },  // Redirect ke /dashboard sebagai default setelah login
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("./Pages/Landing.vue"),
  },
  //===============UNAUTHORIZATION=============== 

  { path: '/page-not-found', 
    name: 'Unauthorized', 
    component: () => import("./Pages/Unauthorized.vue")
   },
   {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: () => import("./Pages/Unauthorized.vue")
  },  // Wildcard route untuk menangani 404

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async(to, from, next) => {


  const token = localStorage.getItem('authToken');
  // const userMenus = JSON.parse(localStorage.getItem('userMenus') || '[]');
  const expiresIn = 3600 * 3000; 

  // console.log(userMenus)
  setTimeout(() => {
    localStorage.removeItem('authToken');
    // localStorage.removeItem('userMenus');
    localStorage.removeItem('userData');
    router.push('/login'); // Redirect ke halaman login
  }, expiresIn);

  // Fungsi untuk mengekstrak URL dari menu dan submenu
  const extractUrls = (menuItems) => {
    let urls = [];
    menuItems.forEach(item => {
      if (item.url) {
        urls.push(item.url);
      }
      if (item.items) {
        urls = urls.concat(extractUrls(item.items));
      }
      if (item.submenu) {
        urls = urls.concat(extractUrls(item.submenu));
      }
    });
    return urls;
  };

  let userPaths = [];
  const formData = new FormData();
    const parsedUser = JSON.parse(localStorage.getItem('userData'));

    if (parsedUser) {
      formData.append("id", parsedUser.id);

      try {
        const response = await store.dispatch("menuManagement/authlist", formData);
        userPaths = extractUrls(response); // Mengisi userPaths dengan URL dari respons
      } catch (error) {
        console.error("Error fetching menu:", error);
        next({ name: 'Login' });
        return;
      }
    }
  // Jika halaman yang diminta adalah login dan token belum ada, lanjutkan navigasi
  if (to.name === 'Login' && !token) {
    next();
  } 
  // Jika ada token dan mencoba mengakses login, arahkan ke dashboard
  else if (to.name === 'Login' && token) {
    next({ path: '/dashboard' });
  } 
  // Jika tidak ada token, arahkan ke halaman login
  else if (!token) {
    next({ name: 'Login' });
  }
  // Jika path yang diminta tidak ada di userPaths dan bukan halaman Unauthorized, arahkan ke Unauthorized
  else if (!userPaths.includes(to.path) && to.path !== '/page-not-found') {
    next({ path: '/page-not-found' });
  } 
  // Jika semua kondisi terpenuhi, lanjutkan navigasi
  else {
    next();
  }
});

export default router;
