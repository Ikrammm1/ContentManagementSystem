<template>
    <div class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
  v-if="splash">
    <VueSpinner size="50" color="gray-900" />
  </div>
  <data-sidebar :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" :data="sidebarData"/>
    <div class="w-full h-full bg-slate-200 p-10">
        <h1 class="text text-left mb-10 uppercase text-2xl leading-6">Menu Management</h1>
        <Button @click="addNewData" class=" bg-gray-800 hover:bg-gray-600 items-center text-white mb-3" type="submit">
            <FeatherIcon icon="plus"/> Add New</Button>

        <!-- <Card class="p-3 bg-white w-full"> -->
            <div class="overflow-x-auto">
            <DataTable class="display bg-white" v-if="datas.length">
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <slot :rows="datas">
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
            </DataTable>
        </div>
        <!-- </Card> -->

    </div>
    
</template>

<script>
import { DataTable } from 'datatables.net-vue3';
import FeatherIcon from '../../Components/FeatherIcon.vue';
import { Button } from '@/Components/ui/button'
import {
  VueSpinner,
} from 'vue3-spinners';
import DataSidebar from './Sidebar.vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'

export default {
    data() {
        return {
            headers: ['Name', 'URL', 'Parent', 'Action'],
            splash:false,
            isSidebarOpen: false,
            sidebarData: {},
        };
    },
    components: {
    FeatherIcon,
    Button,
    Card,
    VueSpinner,
    DataSidebar
  },
    computed: {
        datas() {
            // console.log(this.$store.state.menuManagement.datas);
            return this.$store.state.menuManagement.datas;
        },
    },
    methods: {
        addNewData() {
            this.sidebarData = {};
            this.toggleSidebar();
        },
        editData(data) {
            this.sidebarData = data;
            this.toggleSidebar();
        },
        deleteData(id){
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
                    console.log("success")
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
        await this.$store.dispatch("menuManagement/list").then((response)=>{
            this.splash = false
        });
    },
    // async mounted() {
    //     await this.$store.dispatch("menuManagement/list").then(response =>{
    //         // console.log("ada")
    //     });
    // },
}
</script>
<style>
.overflow-x-auto {
    overflow-x: auto;
}
</style>
