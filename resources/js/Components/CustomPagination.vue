<!-- CustomPagination.vue -->
<template>
    <div class="custom-pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalPages: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
    },
    methods: {
      nextPage() {
        this.$emit('changePage', this.currentPage + 1);
      },
      previousPage() {
        this.$emit('changePage', this.currentPage - 1);
      },
    },
  };
  </script>
  
  <style>
  .custom-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>
  