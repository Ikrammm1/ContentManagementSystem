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
        <div class="sidebar-content">
        <!-- Header -->
        <div class="header w-full flex flex-row mt-5 mb-3">
          <h1 class="flex flex-col w-1/2 uppercase">
            {{
                    Object.entries(this.data).length === 0
                        ? "ADD NEW"
                        : "UPDATE"
                }}
          </h1>
          <div class="flex flex-col justify-end items-end w-1/2">
              <button @click="closeSidebar">
                  <FeatherIcon  icon="x"/>
              </button>
          </div>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="form-container">
            <!-- Form fields here -->
            <div class="form-group">
              <Label for="name">Menu Name</Label>
              <Input id="name" class="mt-2" placeholder="name" type="text" v-model="name" />
            </div>
            <div class="form-group">
              <Label for="category">Category</Label>
              <!-- <Input id="category" class="mt-2" placeholder="category" type="text" v-model="category" /> -->
              <select id="selectedCategory" v-model="selectedCategory" class="mt-2 border rounded p-2 w-full">
              <option :value="cat" v-for="cat in category" placeholder="Select a category">{{ cat }}</option>
            </select>
            </div>
            <div class="form-group">
              <Label for="parent">Parent</Label>
              <Input id="parent" class="mt-2" placeholder="parent" type="text" v-model="parent" />
            </div>
            <div class="form-group">
              <Label for="icon">Icon</Label>
              <Input id="icon" class="mt-2" placeholder="icon" type="text" v-model="icon" />
            </div>
            <div class="form-group">
              <Label for="url">Url</Label>
              <Input id="url" class="mt-2" placeholder="url" type="text" v-model="url" />
            </div>
            <div class="form-group">
              <Label for="short_order">Short</Label>
              <Input id="short_order" class="mt-2" placeholder="short" type="text" v-model="short_order" />
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer flex flex-col md:flex-row w-full mb-6 p-4 bg-white">
          <Button class="w-full md:w-1/2 mb-3 md:mb-0 bg-gray-800 hover:bg-gray-600 text-white" type="submit">
            <FeatherIcon icon="pocket" class="mr-3"/> Submit
          </Button>
          <Button variant="outline" class="w-full md:w-1/2 md:ml-3">
            <p class="text text-sm text-gray-800">Reset</p>
          </Button>
        </div>


      </div>

      

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'

export default {
  components: {
    Sidebar,
    Input,
    Label,
    Button,
    VueSpinner,
    FeatherIcon,
    Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  },
  props: {
    isOpen: Boolean,
    data: {
      type: Object,
      default: () => {},
    },
  },
  data(){
      return{
          name:"",
          category:["Header","Parent","Submenu"],
          selectedCategory:"",
          parent:"",
          icon:"",
          url:"",
          short_order:"",
          isSidebarActive : true

      }
  },
  watch:{
    data(val) {
            if (Object.entries(val).length === 0) {
                // this.resetField();
            } else {
                const {
                    id,
                    name,
                    url,
                    icon,
                    short_order,
                    category
                } = JSON.parse(JSON.stringify(this.data));
                this.id = id;
                this.name = name;
                this.url = url;
                // this.lastStock = last_stock
                this.icon = icon;
                this.short_order = short_order;
                this.selectedCategory = this.category.filter(
                    (item) => item.id === category
                )[0];
            }
        },
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
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.content {
max-height: 75vh; /* Sesuaikan dengan kebutuhan */
overflow-y: auto;
scrollbar-width: thin;
scrollbar-color: #4a5568 transparent;
}

.content::-webkit-scrollbar {
width: 8px;
}

.content::-webkit-scrollbar-thumb {
background-color: #4a5568;
border-radius: 4px;
}

.content::-webkit-scrollbar-track {
background-color: transparent;
}
.header, .footer {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.1);
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.footer {
  position: sticky;
  bottom: 0;
  z-index: 1000;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

/* .select-dropdown {
  position: sticky;
  z-index: 1000; 
  background-color: rgb(0, 0, 0); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
} */



/* Efek transisi fade untuk overlay
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
