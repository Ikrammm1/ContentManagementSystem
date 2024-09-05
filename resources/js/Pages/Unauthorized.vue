<template>
    <div class="unauthorized-wrapper flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <!-- Header -->
      <div class="error-header text-center mb-6">
        <h1 class="text-6xl font-bold text-red-600">404</h1>
        <h2 class="text-2xl font-semibold text-gray-800 mt-2">Page Not Found ⚠️</h2>
        <p class="text-lg text-gray-600 mt-2">We couldn't find the page you are looking for.</p>
      </div>
  
      <!-- Image -->
      <div class="image-container mb-6">
        <img
          src="/storage/images/404.png"
          alt="Page Not Found"
          class="max-w-lg w-full h-auto mx-auto"
        />
      </div>
  
      <!-- Button -->
      <div class="w-full text-center">
        <Button
          class="bg-gray-800 text-white hover:bg-gray-600 px-4 py-2 rounded transition-colors"
          type="button"
          @click="goHome"
        >
          Back To Home
        </Button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { Button } from '@/Components/ui/button'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // Define the function to redirect to home
  const goHome = () => {
  router.go(-1)
}
  </script>
  
  <style scoped>
  .unauthorized-wrapper {
    background-color: #f9f9f9;
  }
  
  .error-header h1 {
    color: #e53e3e; /* Red color for 404 */
  }
  
  .error-header h2 {
    color: #2d3748; /* Dark gray for the subtitle */
  }
  
  .error-header p {
    color: #4a5568; /* Medium gray for the description */
  }
  
  .image-container img {
    max-width: 50%;
    height: auto;
  }
  
  button {
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
  </style>
  