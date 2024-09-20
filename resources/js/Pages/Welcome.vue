<template>
  <div class="flex flex-row  bg-gray-200">
    <nav-menu 
      :menu="menu" 
      :user="user"  
      v-on:sidebarStatusChanged="isSidebarActive" 
    />
    <div  
    class="justify-start items-center" 
    :style="topBarStyle">
      <top-bar />
      <router-view/>
    </div>
  </div>
</template>


<script>
import NavMenu from '../Layouts/NavMenu.vue'; // Pastikan path benar
import TopBar from '../Layouts/topBar.vue'; // Pastikan path benar

export default {
  components: {
    NavMenu,
    TopBar
  },
  data() {
    return {
      user: null,
      menu: [],
      isSidebar: true,
      formData: new FormData(),
    };
  },
  computed: {
    topBarStyle() {
      // console.log(this.isSidebar)
      return {
        width: this.isSidebar ? 'calc(100% - 250px)' : '100%',
        marginLeft: this.isSidebar ? '250px' : '0',
        transition: 'margin-left 0.3s ease, width 0.3s ease'
      };
    }
  },
  methods: {
    isSidebarActive(isOpen) {
      // console.log("Event received in main.vue with value:", isOpen);
      this.isSidebar = isOpen;
    },
    handleResize() {
      // Menutup sidebar jika lebar layar berada di bawah ukuran col-md (769px)
      this.isSidebar = window.innerWidth >= 769;
    }
  },
  created() {
    // Ambil data dari localStorage
    const user = localStorage.getItem('userData');
    const parsedUser = JSON.parse(user);
    this.formData = new FormData();
    this.formData.append("id", parsedUser.id);
    this.$store.dispatch("menuManagement/authlist", this.formData)
      .then((response)=>{
        this.menu = response;
      });

    if (user) {
      this.user = JSON.parse(user);
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Panggil sekali saat komponen di-mount untuk memastikan status sidebar benar
    // console.log(this.handleResize)
    // console.log(this.isSidebar)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style>
.top-bar {
  transition: margin-left 0.3s ease, width 0.3s ease;
}

.w-full {
  width: 100%;
}

.ml-[nav-width] {
  margin-left: 250px; 
  width: calc(100% - 250px);
}
</style>
