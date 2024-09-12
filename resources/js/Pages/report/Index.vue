<template>
    <vue-good-table
      :columns="columns"
      :rows="datas"
    >
      <template v-slot:table-row="props">
        <span v-if="props.column.field === 'url'">
          {{ props.row.url ? props.row.url : '-' }}
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
  </template>
  
  <script>
  import FeatherIcon from '../../Components/FeatherIcon.vue';
  import { VueGoodTable } from 'vue-good-table-next';
  import 'vue-good-table-next/dist/vue-good-table-next.css';
  import { toRaw } from 'vue';
import { ref } from 'vue';
import {
  VueSpinner,
} from 'vue3-spinners';

  export default {
    name: 'CustomTable',
    components: {
      VueGoodTable,
      FeatherIcon
    },
    data() {
      return {
        splash:false,
        columns: [
          { label: 'URL', field: 'url' },
          { label: 'Action', field: 'action' },
          // Tambahkan kolom lainnya jika perlu
        ],
        rows: [
          { id: 1, url: 'http://example.com' },
          { id: 2, url: 'http://another-example.com' },
          // Tambahkan baris data lainnya jika perlu
        ],
      };
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
    },
    methods: {
      editData(row) {
        console.log('Edit:', row);
        // Implementasikan logika untuk mengedit data
      },
      deleteData(id) {
        console.log('Delete:', id);
        // Implementasikan logika untuk menghapus data
      },
    },
    async created() {
        this.splash = true
        await this.$store.dispatch("menuManagement/list")
        // this.$refs.table
        this.splash = false
    },
  };
  </script>
  