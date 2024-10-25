<template>
  <div>
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"
    >
      <a href="#">
        <img class="rounded-t-lg object-cover h-48 w-full" src="https://picsum.photos/400/200" alt="" />
      </a>

      <div class="p-5 flex flex-col justify-between h-60">
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
            v-if="canard && canard.nom"
          >
            {{ canard.nom }}
          </h5>
        </a>

        <div class="inline-flex space-x-5 mb-3">
          <p class="font-normal text-gray-700 dark:text-gray-400 text-base mb-4 mr-8">
            <span class="text-white font-semibold">Age :</span> {{ canard.age }} <br />
            <span class="text-white font-semibold">Poids :</span> {{ canard.poids }} kg
          </p>

          <p class="font-normal text-gray-700 dark:text-gray-400 text-base">
            <span class="text-white font-semibold">Race :</span> {{ canard.race ? canard.race.nom : "Non Renseignée" }} <br />

            <span class="text-white font-semibold">Dresseur :</span> {{ canard.utilisateur ? canard.utilisateur.prenom : "Non renseigné"}} {{ canard.utilisateur ? canard.utilisateur.nom : ""}}

          </p>
        </div>

        <DuckModal :canard="canard" />
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
