<template>
    <div>
      <div
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img class="rounded-t-lg" src="https://picsum.photos/400/200" alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              v-if="canard && canard.nom"
            >
              {{ canard.nom }}
            </h5>
          </a>
          <div class="inline-flex space-x-5">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span class="text-white font-semibold">Age :</span> {{ canard.age }} <br> <span class="text-white font-semibold">Poids :</span> {{ canard.poids }} kg
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span class="text-white font-semibold">Race :</span> {{ canard.race ? canard.race.nom : "Non Renseignée" }} <br> <span class="text-white font-semibold">Dresseur :</span> {{ canard.utilisateur.prenom }} {{ canard.utilisateur.nom }}
            </p>
          </div>
          <DuckModal :canard="canard"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      canard: {
        type: Object,
        required: true,
      },
    },
  };
  </script>