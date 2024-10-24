<script setup>

const { data } = await useFetch("http://localhost:2000/api/v1/canards")


</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center my-5">
    <div v-for="canard in data">
       <DuckCard :canard="canard" />
     </div>
  </div>
</template>

