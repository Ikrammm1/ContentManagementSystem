<!-- src/components/Sidebar.vue -->
<template>
    <transition name="slide" appear>
      <div 
        v-if="isOpen" 
        class="sidebar" 
        :key="isOpen ? 'sidebar-open' : 'sidebar-closed'">
        <slot></slot> <!-- Menggunakan slot untuk konten dinamis -->
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: auto; /* Lebar otomatis berdasarkan konten */
    min-width: 500px; /* Atur batas lebar maksimum jika diperlukan */
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Layer yang lebih tinggi dari overlay */
  }
  
  /* Efek transisi slide untuk sidebar */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.4s ease;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
  </style>
  