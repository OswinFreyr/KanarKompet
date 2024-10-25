<script setup>
const { data } = await useFetch("http://localhost:2000/api/v1/competitions");

const isAdmin = ref(false);

// Check if logged in as Admin on the client side
onMounted(() => {
  if (localStorage.getItem("loggedInAs") === "Admin") {
    isAdmin.value = true;
  }
});
</script>

<template>
  <!-- titre et bouton redirection creer canard -->
  <div class="flex justify-between items-center mb-5">
    <h2 class="text-3xl font-bold uppercase text-white">Nos compétitions</h2>
    <!-- v-show="loggedInAs == 'User' || loggedInAs == 'Admin'" -->
    <!-- CONDITIONNER LA VUE DU BOUTON  -->
    <router-link to="/addEvenement" v-show="isAdmin">
      <UButton
        icon="i-heroicons-plus-circle"
        size="sm"
        color="primary"
        variant="solid"
        label="Ajouter une compétition"
        :trailing="false"
      />
    </router-link>
  </div>

  <!-- affichege des cartes canards -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 justify-items-center my-5"
  >
    <div v-for="competition in data" :key="competition.id">
      <CompetitionCard :competition="competition" />
    </div>
  </div>
</template>
