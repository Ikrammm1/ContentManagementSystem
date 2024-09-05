<template>
  <div class="w-full bg-gray-200 p-2">
    <SearchInput v-model="formData.searchVal" />

    
  </div>
</template>

<script setup lang='ts'>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Button } from '@/Components/ui/button'
import FeatherIcon from '@/Components/FeatherIcon.vue'
import SearchInput from 'vue-search-input'
import 'vue-search-input/dist/styles.css'
import { reactive } from 'vue';


const formData = reactive({
    searchVal: '',
});
</script>