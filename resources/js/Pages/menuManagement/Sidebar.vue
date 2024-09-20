<!-- src/components/SidebarMain.vue -->
<template>
  <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-9999 " v-if="splash"></div>
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
            
            <div class="form-container mb-6">
              <!-- Form fields here -->
              <div class="form-group mb-2">
                <Label for="category">Category</Label>
                <!-- <Input id="category" class="mt-2" placeholder="category" type="text" v-model="category" /> -->
                <select id="selectedCategory" v-model="selectedCategory" class="mt-2 border rounded p-2 w-full" >
                  <option value="" disabled>Select a category</option>
                  <option :value="cat" v-for="cat in category" placeholder="Select a category">{{ cat }}</option>
                </select>
              </div>
              <div class="form-group mb-2" v-if="selectedCategory != 'Header'">
                <Label for="parent">Parent</Label>
                <select id="selectedCategory" v-model="parent" class="mt-2 border rounded p-2 w-full">
                  <option value="" disabled>Select a parent</option>
                  <option :value="parent.id" v-for="parent in parentList">{{ parent.name }}</option>
                </select>
              </div>

              <div class="form-group mb-2">
                <Label for="name">Menu Name</Label>
                <FormInput 
                  id="name" 
                  name="Menu Name" 
                  placeholder="name" 
                  type="text" 
                  v-model="name" 
                  :required="true"/>
              
              </div>

              <div class="form-group mb-2">
                <Label for="icon">Icon</Label>
                <FormInput 
                  id="icon" 
                  name="Icon" 
                  placeholder="icon" 
                  type="text" 
                  v-model="icon" />
              </div>
              <div class="form-group mb-2">
                <Label for="url">Url</Label>
                <FormInput 
                  id="url" 
                  name="Url" 
                  placeholder="url" 
                  type="text" 
                  v-model="url" />
              </div>
              <div class="form-group">
                <Label for="sort_order">Sort</Label>
                <FormInput 
                  id="sort_order" 
                  name="sort_order" 
                  placeholder="sort_order" 
                  type="text"
                  v-model="sort_order" />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer flex flex-col md:flex-row w-full mb-6 p-4 bg-white">
            <Button class="w-full md:w-1/2 mb-3 md:mb-0 bg-gray-800 hover:bg-gray-600 text-white" type="submit" @click.stop="submitForm" :disabled="!isFormValid">
              <FeatherIcon icon="pocket" class="mr-3"/> Submit
            </Button>
            <Button variant="outline" class="w-full md:w-1/2 md:ml-3" @click.stop="resetForm">
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
import FormInput from "../../Components/ValidateProvider.vue";
// import { Input } from '@/Components/ui/input'
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
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { useNotification } from "@kyvg/vue3-notification";

const { notify }  = useNotification()

export default {
  components: {
    Sidebar,
    // Input,
    Label,
    Button,
    VueSpinner,
    FeatherIcon,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormInput
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
          id:"",
          name:"",
          category:["Header","Parent","Submenu"],
          selectedCategory:"",
          parent:"",
          icon:"",
          url:"",
          sort_order:"",
          isSidebarActive : true,
          splash:false,
          parentList : [],
          // formData: new FormData(),

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
                    sort_order,
                    category,
                    parent
                } = JSON.parse(JSON.stringify(this.data));
                this.id = id;
                this.name = name;
                this.url = url;
                // this.lastStock = last_stock
                this.icon = icon;
                this.sort_order = sort_order;
                this.selectedCategory = this.category.filter(
                    (item) => item == category
                )[0];
                // console.log(parent.id)
                this.selectedCategory != "Header" ?
                  this.parent = this.$store.state.menuManagement.datas.filter(
                    (item) => item.id = parent.id
                  )[0].id
                  : ""
                // console.log( this.parent)
            }
    },
    selectedCategory(){
      if(this.selectedCategory == 'Header'){
        this.parent = ''
      }
      this.getParent(this.selectedCategory)
    }
  },
  computed:{
    isFormValid(){
      return (
        this.name != "",
        this.selectedCategory !="",
        this.selectedCategory != "Header" ? this.parent != "" : this.parent ==""
        
      );
    }
  },
  methods: {
    resetForm(){
          this.id = "",
          this.name = "",
          this.selectedCategory = "",
          this.parent = "",
          this.icon = "",
          this.url = "",
          this.sort_order = null
          // this.formData = new FormData();
    },
    closeSidebar() {
      this.resetForm();
      this.$emit('update:isOpen', false); // Emit event untuk mengubah state di komponen parent
    },
    getParent(){

      let cat = null
      this.selectedCategory == 'Parent' ? cat = 'Header' : cat = 'Parent'
      // console.log(cat)
      this.parentList = this.$store.state.menuManagement.datas
      // this.parentList = this.$store.state.menuManagement.datas.filter(menu => menu.category == cat)
      // console.log(this.parentList)
    },
    async submitForm() {
      // console.log(this.parent)
      const formData = new FormData()
      const user = JSON.parse(localStorage.getItem('userData'));
      // console.log(user.id)
      

      formData.append('id', this.id)
      formData.append('category', this.selectedCategory)
      formData.append('parent_id', this.parent)
      formData.append('name', this.name)
      formData.append('icon', this.icon)
      formData.append('url', this.url)
      formData.append('sort_order', this.sort_order)
      formData.append('user_id', user.id)
      const id = this.id
     
      try{
        const result =await this.$store.dispatch("menuManagement/process", {formData,id})
        console.log(result)
        if(result.data){
          this.closeSidebar()
          notify(
          {
            title: "Success",
            text: "Data has been " + (!this.id ? "added" : "updated"),
            type: 'success',
            duration: 2000
          });
        }
         
      }catch(error){
          console.error('Error saving item:', error);
          notify({
            title: "Error!",
            // text: error.response.data.message,
            text: error,
            type: 'error',
          });
      }
    },
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
max-height: 70vh; /* Sesuaikan dengan kebutuhan */
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

/* .form-group {
  margin-bottom: 1rem;
} */

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
