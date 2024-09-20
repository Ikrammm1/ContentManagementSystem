<!-- src/components/SidebarMain.vue -->
<template>
  <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-99999"
  v-if="splash">
    <VueSpinner size="50" color="gray-900" />
  </div>
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
                <Label for="name">Authorization Name</Label>
                <FormInput 
                  id="name" 
                  name="Authorization Name" 
                  placeholder="name" 
                  type="text" 
                  v-model="name" 
                  :required="true"/>
              
              </div>

              <div class="form-group mb-2">
                <Label for="Assign Menu">Assign Menu</Label>
                <vue-good-table
                  v-if="menus"
                  :columns="columns"
                  :rows="menus"
                  class="rounded-table"
                  styleClass="vgt-table condensed"
                  :pagination-options="{
                      enabled: true,
                      perPageDropdown: [10, 20, 50],
                      mode: 'pages'
                  }"
                >
                  <template v-slot:table-row="props">
                      <span v-if="props.column.field === 'url'">
                          {{ props.row.url ? props.row.url : '-' }}
                      </span>
                      <span v-if="props.column.field === 'assign'">
                        <!-- {{ props.row.id }} -->
                        <input type="checkbox" id="jack" :value=props.row.id v-model="assign" />
                      </span>
                  </template>
              </vue-good-table>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer flex flex-col md:flex-row w-full mb-6 p-4 bg-white">
            <Button class="w-full md:w-1/2 mb-3 md:mb-0 bg-gray-800 hover:bg-gray-600 text-white" type="submit" @click.stop="submitForm" >
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
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { toRaw } from 'vue';
import { ref } from 'vue';
import { Checkbox } from '@/Components/ui/checkbox'

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
    FormInput,
    VueGoodTable,
    Checkbox
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
          isSidebarActive : true,
          splash:false,
          assign:[],
          columns: [
                {
                    label: 'Assign',
                    field: 'assign',
                },
                {
                    label: 'Name',
                    field: 'name',
                    type: 'text',
                },
                {
                    label: 'URL',
                    field: 'url',
                },
              
                
            ],

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
  },
  computed:{
    isFormValid(){
      return (
        this.name != ""
      );
    },
    menus() {
      const data = ref([])
      data.value = this.$store.state.menuManagement.datas; 
      if (data.value.length > 0) {
          const rawData = ref([])
          rawData.value = toRaw(data.value);
          this.$refs.table
          return rawData.value;
      }
    },
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
   
    async submitForm() {
      console.log(this.assign)
      // // console.log(this.parent)
      // const formData = new FormData()
      // const user = JSON.parse(localStorage.getItem('userData'));
      // // console.log(user.id)
      

      // formData.append('id', this.id)
      // formData.append('category', this.selectedCategory)
      // formData.append('parent_id', this.parent)
      // formData.append('name', this.name)
      // formData.append('icon', this.icon)
      // formData.append('url', this.url)
      // formData.append('sort_order', this.sort_order)
      // formData.append('user_id', user.id)
      // const id = this.id
     
      // try{
      //   const result =await this.$store.dispatch("menuManagement/process", {formData,id})
      //   console.log(result)
      //   if(result.data){
      //     this.closeSidebar()
      //     notify(
      //     {
      //       title: "Success",
      //       text: "Data has been " + (!this.id ? "added" : "updated"),
      //       type: 'success',
      //       duration: 2000
      //     });
      //   }
         
      // }catch(error){
      //     console.error('Error saving item:', error);
      //     notify({
      //       title: "Error!",
      //       // text: error.response.data.message,
      //       text: error,
      //       type: 'error',
      //     });
      // }
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
