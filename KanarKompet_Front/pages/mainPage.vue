<script setup>

const { canardData } = await useFetch("http://localhost:2000/api/v1/canards")


</script>

<template>
    <ULandingSection>
        <div class="relative">
          <img
            src="../assets/logo-transparent-png.png"
            class="w-full rounded-md shadow-x3 ring-1 ring-gray-300 dark:ring-gray-700"
            style="max-width: initial; margin: 0;"
          />
          <div class="overlay"></div>
          <div
            class="absolute inset-0 flex flex-col justify-center items-center text-center p-6"
          >
            <i class="text-6xl mb-4 text-white i-heroicons-sparkles"></i>
            <h1
              class="ext-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
            >
              KanarKompet
            </h1>
            <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
              Le meilleur site pour vos Kompetitions de Kanars ! 🪩
            </p>
          </div>
        </div>
      </ULandingSection>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center my-5">
    <div v-for="canard in canardData">
       <DuckCard :canard="canard" />
     </div>
  </div>
</template>