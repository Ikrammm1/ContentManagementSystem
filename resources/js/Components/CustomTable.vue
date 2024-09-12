<template>
  <table class="custom-table">
    <thead>
      <slot name="thead"></slot>
    </thead>
    <tbody>
      <slot name="tbody" :data="data"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.custom-table th,
.custom-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e2e8f0;
}

.custom-table thead th {
  background-color: #f7fafc;
  color: #2d3748;
  font-weight: 600;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table tbody tr:hover {
  background-color: #edf2f7;
}

.custom-table tbody td {
  color: #4a5568;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px; /* Sesuaikan lebar sesuai kebutuhan */
}
</style>
