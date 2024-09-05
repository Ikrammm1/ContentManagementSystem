<!-- src/components/SidebarMain.vue -->
<template>
  <div>
    <!-- Overlay dengan efek fade -->
    <transition name="fade" appear>
      <div 
        v-if="isOpen" 
        class="overlay" 
        @click="closeSidebar" 
        :key="isOpen ? 'overlay-open' : 'overlay-closed'">
      </div>
    </transition>

    <Sidebar :isOpen="isOpen">
      <div class="container w-full h-full">
        <!-- <button @click="closeSidebar">Close</button> -->
        <div class="w-full flex flex-row mt-5 mb-3">
          <h1 class="flex flex-col w-1/2 uppercase">Add New</h1>
          <div class="flex flex-col justify-end items-end w-1/2">
              <button @click="closeSidebar">
                  <FeatherIcon  icon="x"/>
              </button>
          </div>
        </div>
        <hr>

        <!-- Konten sidebar lainnya dapat ditambahkan di sini -->
        <div class="scroll w-full mt-5">
          <div class="flexspace-y-2 w-full p-2">
              <Label for="name" >Menu Name</Label>
              <Input id="name" placeholder="name" type="text" v-model="name" class="mt-2"/>
          </div>
         
      </div>
      <select id="category" v-model="category" class="mt-2 border rounded p-2 w-full">
              <option value="" disabled>Select a category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>

      

      </div>
     
      

    </Sidebar>
  </div>
</template>

<script>
import Sidebar from '@/Components/SidebarTemplate.vue';
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import FeatherIcon from '../../Components/FeatherIcon.vue';
import { Button } from '@/Components/ui/button'
import {
VueSpinner,
} from 'vue3-spinners';

export default {
  components: {
    Sidebar,
    Input,
    Label,
    Button,
    VueSpinner,
    FeatherIcon,
  },
  props: {
    isOpen: Boolean
  },
  data(){
      return{
          name:"",
          category:"",
          parent:"",
          icon:"",
          url:"",
          short_order:"",
          isSidebarActive : true

      }
  },
  methods: {
    closeSidebar() {
      this.$emit('update:isOpen', false); // Emit event untuk mengubah state di komponen parent
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Background hitam dengan opacity 30% */
  z-index: 999; /* Layer yang lebih rendah dari sidebar */
}

.scroll {
max-height: 75vh; /* Sesuaikan dengan kebutuhan */
overflow-y: auto;
scrollbar-width: thin;
scrollbar-color: #4a5568 transparent;
}

.scroll::-webkit-scrollbar {
width: 8px;
}

.scroll::-webkit-scrollbar-thumb {
background-color: #4a5568;
border-radius: 4px;
}

.scroll::-webkit-scrollbar-track {
background-color: transparent;
}

/* Efek transisi fade untuk overlay
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
