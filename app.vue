<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>

<template>
  <div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  </div>
</template>
