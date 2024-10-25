<script setup>

  import { ref, computed } from 'vue';

  const { data } = await useFetch("http://localhost:2000/api/v1/canards")
  let currentUserId = ref(2)

  const userDucks = computed(() => 
  data.value ? data.value.filter(canard => canard.utilisateur && canard.utilisateur.id === currentUserId.value) : []
);
</script>

<template>

  <!-- titre et bouton redirection creer canard -->
  <div class="flex justify-between items-center mb-5">
    <h2 class="text-3xl text-white font-bold uppercase">Mes Canards</h2>
      <!-- v-show="loggedInAs == 'User' || loggedInAs == 'Admin'" -->
       <!-- CONDITIONNER LA VUE DU BOUTON  -->
    <router-link
      to="/addCanard"
    >
      <UButton
        icon="i-heroicons-plus-circle"
        size="sm"
        color="primary"
        variant="solid"
        label="Ajouter un canard"
        :trailing="false"
      />
    </router-link>
  </div>

  <!-- affichege des cartes canards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center my-5">
    <div v-for="canard in userDucks" :key="canard.id">
      <DuckCard :canard="canard" 
      />
    </div>
  </div>
</template>

