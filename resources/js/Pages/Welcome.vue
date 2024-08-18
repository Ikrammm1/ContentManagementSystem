<template>
  <!-- <div id="app"> -->
    <nav-menu :menu="menu" />
    <!-- <router-view /> -->
  <!-- </div> -->
</template>

<script>
// import FeatherIcon from '../Components/FeatherIcon.vue';// Pastikan path benar
import NavMenu from '../Layouts/NavMenu.vue'; // Pastikan path benar
import feather from 'feather-icons';

export default {
  components: {
    // FeatherIcon,
    NavMenu
  },
  data() {
    return {
      menu: []
    };
  },
  created() {
    // Ambil data dari localStorage
    const menus = localStorage.getItem('userMenus');

    // Parse JSON jika data ada
    if (menus) {
      this.menu = JSON.parse(menus);
    }
  }
};
</script>

<style>
/* Tambahkan styling global jika diperlukan */
</style>
