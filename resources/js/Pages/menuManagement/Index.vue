<template>
    <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
  v-if="splash">
    <VueSpinner size="50" color="gray-900" />
  </div>
  <data-sidebar :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" :data="sidebarData"/>
    <div class="w-full h-full bg-slate-200 p-10">
        <h1 class="text text-left mb-10 uppercase text-2xl leading-6">Menu Management</h1>
        <div class="flex flex-row w-full items-center justify-end">
            <div class="w-full">
                <Button @click="addNewData" class=" bg-gray-800 hover:bg-gray-600 items-center text-white mb-3" type="submit">
                <FeatherIcon icon="plus"/> Add New
            </Button>
            </div>
            <div class="flex flex-row w-2/5">
                <div class="flex flex-row items-center justify-start w-full custom-search-input">
                    <FeatherIcon icon="search"/>
                    <input
                    type="text"
                    class="ml-2 w-full input-group"
                    v-model="searchQuery"
                    placeholder="Search data"
                    />
                </div>
               
            </div>
           
            
        </div>
        
            <div class="overflow-x-auto">
             <!-- <DataTable class="display bg-white"  v-if="datas">
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <slot :data="datas">
                    <tr v-for="(data, index) in datas" :key="index">
                        <td>{{ data.name }}</td>
                        <td>{{ data.url ? data.url : '-' }}</td>
                        <td>{{ data.parent ? data.parent.name : '-' }}</td>
                        <td class="flex flex-row items-cente">
                            <button class="flax flax-col w-1/2  hover:text-blue-800"@click.stop="editData(data)">
                            <feather-icon icon="edit" />
                            </button>
                            <button class="flax flax-col w-1/2 hover:text-red-500"  @click.stop="deleteData(data.id)" >
                                <feather-icon icon="trash-2" />
                            </button>

                        </td>
                    </tr>
                </slot>
                </tbody>
            </DataTable> -->
        
            <!-- <DataTable class="display bg-white" v-if="datas"> -->
            <!-- <div class="display bg-white p-4">
                <CustomTable :data="datas" ref="table">
                    <template #thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Parent</th>
                            <th>Action</th>
                        </tr>
                    </template>

                    <template #tbody="{ data }">
                        <tr :data="item" v-for="(item, index) in data" :key="index" >
                            <td>
                                <span class="truncate">{{ item.name }}</span>
                            </td>
                            <td>
                                <span class="truncate">{{ item.url }}</span>
                            </td>
                            <td>
                                <span class="truncate">{{ item.parent ? item.parent.name : '-' }}</span>
                            </td>
                            <td class="flex flex-row items-cente">
                                <button class="flax flax-col w-1/2  hover:text-blue-800"@click.stop="editData(item)">
                                <feather-icon icon="edit" />
                                </button>
                                <button class="flax flax-col w-1/2 hover:text-red-500"  @click.stop="deleteData(item.id)" >
                                    <feather-icon icon="trash-2" />
                                </button>

                            </td>
                        </tr>
                    </template>
                </CustomTable>
            </div> -->
                
            <!-- </DataTable> -->
            
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
                    <span v-if="props.column.field === 'url'">
                        {{ props.row.url ? props.row.url : '-' }}
                    </span>
                    <span v-if="props.column.field === 'parent'">
                        {{ props.row.parent ? props.row.parent.name : '-' }}
                    </span>
                    <span v-if="props.column.field === 'action'">
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
            headers: ['Name', 'URL', 'Parent', 'Action'],
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
                    label: 'URL',
                    field: 'url',
                },
                {
                    label: 'Parent',
                    field: 'parent',
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
            // console.log(this.$store.state.menuManagement.datas);

            const data = ref([])
            data.value = this.$store.state.menuManagement.datas; 

            // Menghapus reaktivitas menggunakan toRaw
            if (data.value.length > 0) {

                const rawData = ref([])
                rawData.value = toRaw(data.value);
                // console.log(rawData.value);
                this.$refs.table
                return rawData.value;
            }
            // console.log("kelar")
            // return this.$store.state.menuManagement.datas;
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
            formData.append("id", id);
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
                    this.$store.dispatch("menuManagement/delete", {formData, id})
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
        await this.$store.dispatch("menuManagement/list")
        // this.$refs.table
        this.splash = false
    },
    // async mounted() {
    //     await this.$store.dispatch("menuManagement/list")
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
  width: 100%;
  background-color: white;
}
.input-group:focus {
  outline: none; /* Menghapus outline default browser */
  border-color: transparent; /* Menghilangkan border saat fokus */
}

</style>
