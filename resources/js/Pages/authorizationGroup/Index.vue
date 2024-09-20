<template>
  <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
v-if="splash">
  <VueSpinner size="50" color="gray-900" />
</div>
<data-sidebar :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" :data="sidebarData"/>
  <div class="w-full h-full bg-slate-200 p-10">
      <h1 class="text text-left mb-10 uppercase text-2xl leading-6">Authorizations Group</h1>
      <div class="flex flex-col md:flex-row w-full items-center justify-end md:justify-start mb-4">
  <!-- Button Add New -->
  <div class="flex flex-col md:flex-row w-1/2 md:w-full mb-4 md:mb-0 md:mr-4">
      <Button @click="addNewData" class="bg-gray-800 hover:bg-gray-600 items-center text-white" type="submit">
          <FeatherIcon icon="plus"/> 
          <span class="hidden sm:inline-flex ml-2">
              Add New
          </span>
      </Button>
  </div>
  <!-- Input pencarian -->
  <div class="flex flex-row items-center w-1/2 mb-4 md:mb-0 custom-search-input">
      <FeatherIcon icon="search"/>
      <input
          type="text"
          class="ml-2 input-group w-full"
          v-model="searchQuery"
          placeholder="Search data"
      />
  </div>
</div>
      
          <div class="overflow-x-auto">            
          <vue-good-table
              v-if="datas"
              :columns="columns"
              :rows="filteredData"
              class="rounded-table"
              styleClass="vgt-table condensed"
              :pagination-options="{
                  enabled: true,
                  perPageDropdown: [10, 20, 50],
                  mode: 'pages'
              }"
             >
              <template v-slot:table-row="props">
                  <span v-if="props.column.field === 'menus'">
                    <div class="flex flex-col md:flex-row md:flex-wrap">
                      <div class="flex flex-col" v-for="(item) in props.row.menus">
                      <div class="cardMenus bg-gray-200 p-1 m-1">
                        <p class="text text-sm ">{{ item.name }}</p>
                      </div>
                    </div>
                    </div>
                  </span>
                  <span v-if="props.column.field === 'action'">
                      <button
                          class="flax flax-col w-1/2 hover:text-blue-800"
                          @click.stop="addUser(props.row)"
                      >
                          <feather-icon icon="users" />
                      </button>
                      <button
                          class="flax flax-col w-1/2 hover:text-blue-800"
                          @click.stop="editData(props.row)"
                      >
                          <feather-icon icon="edit" />
                      </button>
                      <button
                          class="flax flax-col w-1/2 hover:text-red-500"
                          @click.stop="deleteData(props.row.id)"
                      >
                          <feather-icon icon="trash-2" />
                      </button>
                  </span>
              </template>
          </vue-good-table>
          
      </div>
  </div>
  
</template>

<script>
import { DataTable } from 'datatables.net-vue3';
import FeatherIcon from '@/Components/FeatherIcon.vue';
import { Button } from '@/Components/ui/button'
import { VueSpinner } from 'vue3-spinners';
import DataSidebar from './Sidebar.vue'
import { useNotification } from "@kyvg/vue3-notification";
import { toRaw } from 'vue';
import { ref } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

const { notify }  = useNotification()


export default {
  data() {
      return {
          splash:false,
          isSidebarOpen: false,
          searchQuery:null,
          sidebarData: {},
          columns: [
              {
                  label: 'Name',
                  field: 'name',
                  type: 'text',
              },
              {
                  label: 'Menu List',
                  field: 'menus',
              },
              {
                  label: 'Action',
                  field: 'action',
              },
          ],
      };
  },
  components: {
  FeatherIcon,
  Button,
  VueSpinner,
  DataSidebar,
  DataTable,
  VueGoodTable,
},
  computed: {
      datas() {
          // console.log(this.$store.state.authorizations.datas);

          const data = ref([])
          data.value = this.$store.state.authorizations.datas; 

          // Menghapus reaktivitas menggunakan toRaw
          if (data.value.length > 0) {

              const rawData = ref([])
              rawData.value = toRaw(data.value);
              // console.log(rawData.value);
              this.$refs.table
              return rawData.value;
          }
          // console.log("kelar")
          // return this.$store.state.authorizations.datas;
      },
      filteredData() {
          if (!this.searchQuery) return this.datas;
          
          const query = this.searchQuery.toLowerCase();
          
          // Filter data berdasarkan query pencarian
          return this.datas.filter(row =>
              Object.values(row).some(value =>
              String(value).toLowerCase().includes(query)
              )
          );
          }
  },
  methods: {
      addNewData() {
          this.sidebarData = {};
          this.toggleSidebar();
      },
      editData(data) {
          // console.log(data)
          this.sidebarData = data;
          this.toggleSidebar();
      },
      deleteData(id){
          const formData = new FormData();
          formData.append('id', id);
          // console.log(id)

          this.$swal({
              title: 'Delete Data?',
              text: "Are you sure you want to delete this item!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Delete!'
          }).then((result) => {
              if (result.isConfirmed) {
                  // console.log("success")
                  this.$store.dispatch("authorizations/delete", {formData, id})
                  .then((response) =>{
                      notify(
                      {
                          title: "Success",
                          type: 'success',
                          duration: 2000
                      });
                  }) .catch((error) => {
                      console.error('Error saving item:', error);
                      formData.splash = false
                      notify({
                          title: "Error!",
                          type: 'error',
                          duration: 2000
                      });
                      });
              }
          })
      },
      toggleSidebar() {
          this.isSidebarOpen = !this.isSidebarOpen;
      },
      // closeSidebar() {
      //     this.isSidebarOpen = false;
      // }
  },
  async created() {
      this.splash = true
      await this.$store.dispatch("authorizations/list")
      this.$store.dispatch("menuManagement/list")
      // this.$refs.table
      this.splash = false
  },
  // async mounted() {
  //     await this.$store.dispatch("authorizations/list")
  // },
}
</script>
<style>
.overflow-x-auto {
  overflow-x: auto;
}
.rounded-table .vgt-table {
  border-radius: 10px; /* Atur radius sesuai kebutuhan */
  overflow: hidden; /* Pastikan konten tidak melampaui radius */
}

.custom-search-input {
padding: 8px;
border: 1px solid #ddd;
border-radius: 10px;
/* width: auto; */
background-color: white;
}
.input-group:focus {
outline: none; /* Menghapus outline default browser */
border-color: transparent; /* Menghilangkan border saat fokus */
}

.cardMenus{
  /* background-color: gray-700; */
  border-radius: 10px;
  color: black;
}

</style>
