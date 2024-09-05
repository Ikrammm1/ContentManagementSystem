<!-- src/views/Index.vue -->
<template>
  <div>
    <button @click="toggleSidebar">Open Sidebar</button>
    <SidebarMain :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" />
    <button @click="showAlert">Hello world</button>
  </div>
</template>

<script>
import SidebarMain from './Sidebar.vue';

export default {
  components: {
    SidebarMain
  },
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    showAlert() {
      // Use sweetalert2
      this.$swal({
        title: 'Delete Data?',
                text: "Are you sure you want to delete this item!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete!'
      });
    },
  }
}
</script>
