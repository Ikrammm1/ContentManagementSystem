<template>
  <div v-if="isSidebarOpen" id="Main" :class="sidebarClass" class="xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-screen w-full sm:w-64 bg-gray-900 flex-col">
  <div class="flex w-full justify-between"> 
    <div class="flex justify-start p-4  items-center space-x-3">
      <FeatherIcon icon="target" class="icon text-white"/>
      <p class="text-2xl leading-6 text-white">CMS</p>
    </div>
    <div class="hidden xl:flex justify-start p-6 items-center space-x-3">
      <FeatherIcon icon="x" class="icon" />
      <p class="text-2xl leading-6 text-white">CMS</p>
    </div>

    <div aria-label="toggler" class="flex justify-end items-center p-4">
      <button aria-label="close" id="close" @click="toggleSidebar(false)" class=" focus:outline-none focus:ring-2">
        <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 6L18 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
  <div class="nav-menu  h-screen">
    <div class="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full" v-for="(item, hearderidx) in menu ">
      <!-- Header -->
      <div class="focus:outline-none focus:text-indigo-400 text-left text-white flex justify-between items-center w-full py-5 space-x-14" v-if="item.category == 'Header'">
          <p class="text-sm text-left leading-5 uppercase">{{ item.name }}</p>
          <!-- <FeatherIcon v-if="item.items && item.items.length > 0" :class="{'transform rotate-90': item.isOpen}"  width="24" height="24" viewBox="0 0 24 24" icon="chevron-right"/> -->
      </div>

      <!-- Submenus under Header -->
      <div id="menu1" class="flex justify-start flex-col w-full md:w-auto items-start pb-1" v-for="(parent, parentIndex) in item.items" >
          <button @click.prevent="isParentActive(parent), navRoute(parent)" class="flex items-center justify-between hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52" :class="{ active: isActive(parent.url, parent) }"
           >
              <div class="flex items-center space-x-6">
                  <FeatherIcon :icon="parent.icon" class="icon" id="icon"/>
                  <p class="text-sm leading-4 text-left">{{ parent.name }}</p>
              </div>
              <FeatherIcon v-if="parent.submenu && parent.submenu.length > 0" icon="chevron-right" :class="{'transform rotate-90': parent.isOpen}" class="icon"/> 
          </button>

          <!-- Submenus under Parent -->
          <div v-if="parent.isOpen && parent.submenu && parent.submenu.length > 0" >
              <button class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52" 
              v-for="(submenu, subIndex) in parent.submenu" @click="navRoute(submenu)" :class="{ active: isActive(submenu.url, parent) }" >
                  <FeatherIcon :icon="submenu.icon" class="icon ml-3 mr-3" />
                  <p class="text-sm leading-2 text-left">{{ submenu.name }}</p>
              </button>
          </div>
      </div>
    </div>
  </div>

  
  <div class="flex flex-col justify-end items-end pt-2 pb-6   px-6  w-full  space-y-32 ">
    <div class=" flex justify-between items-center w-full">
      <div class="flex justify-center items-center  space-x-2">
        <div>
          <img class="rounded-full" :src="user.photo" alt="avatar" />
        </div>
        <div class="flex justify-start flex-col items-start">
          <p class="cursor-pointer text-sm leading-5 text-white">{{ user.name }}</p>
          <p class="cursor-pointer text-xs leading-3 text-gray-300">{{ user.email }}</p>
        </div>
      </div>
      <svg class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    </div>
  </div>
</div>

 <!-- Button untuk membuka sidebar -->
 <div class="h-full flex items-center justify-start">
    <button
      v-if="!isSidebarOpen"
      aria-label="open"
      id="open"
      @click="toggleSidebar(true)"
      @mousedown="startDrag"
      :style="{ top: buttonPosition.top + 'px', left: buttonPosition.left + 'px' }"
      class="fixed z-50 p-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2"
    >
      <FeatherIcon icon="arrow-right-circle" class="icon-arrow" />
    </button>
  </div>
</template>

<script >
import { Feather, HomeIcon, TrainFrontTunnelIcon } from 'lucide-vue-next';
import FeatherIcon from '../Components/FeatherIcon.vue';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';


export default {
  props: {
    menu: Array,
    user: Object,
    isSidebarActive: Function
  },
  components: {
    FeatherIcon
  },
  
  data(){
    return{
      isOpen : true,
      isSidebarOpen: true,
      buttonPosition: { top: window.innerHeight / 2, left: 16 },
      dragging: false,
      offset: { x: 0, y: 0 },
      currentRoute: this.$route.path,

    }
  },
  computed: {
      // menu(){
    //   const menusData = this.$store.state.auth.userMenus;
    //   // console.log(menusData)
    //   return menusData
    // },
    sidebarClass() {
      return {
        'transform -translate-x-full': !this.isSidebarOpen,
        'transform translate-x-0': this.isSidebarOpen,
      };
    },
  },
  // mounted() {
  //   // Set default header terbuka
    
  // },
 
  emits: ['sidebarStatusChanged'],
  methods: {
    isParentActive(parent){
      return parent.isOpen = !parent.isOpen
    },
    isActive(path, parent) {
      return this.$route.path == path;
    },
    toggleSidebar(open) {
      this.$emit('sidebarStatusChanged', open);
      this.isSidebarOpen = open;
      // console.log("Emitting event with value:", this.isSidebarOpen); // Tambahkan log untuk debug
    },
    startDrag(event) {
      this.dragging = true;
      this.offset.x = event.clientX - this.buttonPosition.left;
      this.offset.y = event.clientY - this.buttonPosition.top;

      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    onDrag(event) {
      if (this.dragging) {
        this.buttonPosition.left = event.clientX - this.offset.x;
        this.buttonPosition.top = event.clientY - this.offset.y;
      }
    },
    stopDrag() {
      this.dragging = false;
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    navRoute(menu){
      if(menu.url != ''){
        this.$router.push(menu.url)
      }
      // console.log(menu.url)
      // this.$router.push(path)
    },
  },
  mounted() {
    
        // Function to check the screen size and toggle the sidebar
        const handleResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                // Jika ukuran layar berada dalam mode md atau lebih kecil, tutup sidebar
                // if(this.isSidebarOpen == true){
                //   this.toggleSidebar(false);
                // }
                this.toggleSidebar(false);
            }else{
              // console.log(this.isSidebarOpen)
              this.toggleSidebar(true)
            }
        };

        // Initial check when the page loads
        handleResize();

        // Event listener untuk mendeteksi perubahan ukuran layar
        window.addEventListener('resize', handleResize);

        // Bersihkan event listener ketika komponen dihancurkan
        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });
    },
 
  setup(props){
    const route = useRoute();
    // console.log(props)
    watch(
      ()=> props.menu,()=>{
        props.menu.forEach(item => {
        item.items.forEach( parent =>{
          if(parent.submenu){
            parent.submenu.forEach( submenu =>{
              if(submenu.url == route.path){
                parent.isOpen = TrainFrontTunnelIcon
              }
            })
          }
        })
      });
      }
    )
  },
  watch: {
    // Watch for window resizing and update button position for col-md screens
    '$vuetify.breakpoint.mdAndDown'(newVal) {
      if (newVal) {
        this.buttonPosition.top = 16;
        this.buttonPosition.left = 16;
      } else {
        this.buttonPosition.top = window.innerHeight / 2;
        this.buttonPosition.left = 16;
      }
    },
  },
};
</script>
<style scoped>
.active {
  /* Gaya untuk menu aktif */
  background-color : rgb(55, 65, 81);
  color : white;
  /* background-color: #ddd; */
}
/* Tambahkan gaya yang diperlukan di sini */
.translate-x-0 {
  transform: translateX(0);
}
.translate-x-full {
  transform: translateX(100%);
}
.rotate-180 {
  transform: rotate(180deg);
}
.hidden {
  display: none;
}
</style>

<style scoped>
/* Nav menu styles */
.nav-menu {
  max-height: 80vh; /* Sesuaikan dengan kebutuhan */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4a5568 transparent;
}

.nav-menu::-webkit-scrollbar {
  width: 8px;
}

.nav-menu::-webkit-scrollbar-thumb {
  background-color: #4a5568;
  border-radius: 4px;
}

.nav-menu::-webkit-scrollbar-track {
  background-color: transparent;
}

.bg-gray-700.text-white {
  background-color: #4a5568;
  color: #fff;
}

.bg-gray-700.text-white .icon {
  color: #fff;
}

.button:hover,
.button:focus {
  background-color: #2d3748;
  color: #fff;
}
/* Custom styles for active or focused state */
.bg-gray-700.text-white {
  background-color: #4a5568;
  color: #fff;
}

.bg-gray-700.text-white .icon {
  color: #fff;
}

.button:hover,
.button:focus {
  background-color: #2d3748;
  color: #fff;
}
#Main {
  position: fixed; /* Pastikan sidebar tetap berada di tempat saat scroll */
  z-index: 50; /* Z-index yang tinggi agar berada di depan */
  width: 250px; /* Atur lebar sesuai kebutuhan */
  height: 100%; /* Tinggi penuh layar */
}
.transform {
  transition: transform 0.2s ease-in-out;
}
.sidebar-menu {
  width: 250px;
  /* Style sidebar */
}

.menu-item, .sub-menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #333;
}

.icon {
  margin-right: 10px;
  /* Tambahkan style untuk ukuran dan warna ikon */
}

.menu-item:hover, .sub-menu-item:hover {
  background-color: #f0f0f0;
}

.sub-menu-item {
  padding-left: 30px; /* Indentasi untuk sub-menu */
}

.icon-arrow {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  /* col-md size (768px) and below */
  #open {
    top: 16px !important;
    left: 16px !important;
  }
}
</style>
