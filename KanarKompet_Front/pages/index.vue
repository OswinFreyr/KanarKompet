<script setup>

import { computed } from 'vue';

// recuperations et gestions des competitions

const { data: competitionsData } = await useFetch("http://localhost:2000/api/v1/competitions");

const currentDate = new Date();

const upcomingCompetitions = computed(() => {
  if (competitionsData.value && competitionsData.value.length > 0) {
    // filtrer les compet qui ont lieu ap la date actuelle
    const filteredCompetitions = competitionsData.value.filter(comp => {
      const compDate = new Date(comp.date);
      return compDate >= currentDate;
    });

    // trier croissant
    const sortedCompetitions = filteredCompetitions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // trois premiers
    return sortedCompetitions.slice(0, 3);
  }
  return [];
});


// Recuperation et gestion des canards
const { data } = await useFetch("http://localhost:2000/api/v1/canards");

const canardsToShow = computed(() => {
  if (data.value && data.value.length > 0) {
    // selectionner trois canards aleatoires
    const shuffled = data.value.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
  return [];
});

</script>



<template>
  <!-- LANDING SECTION -->
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="w-full max-w-5xl mx-auto mb-12">
      <ULandingCTA
        title="Rejoignez la première communauté de compétitions de canards !"
        description="Inscrivez vos canards, participez à des compétitions, et découvrez ce que la communauté pense des champions à plumes. Notre plateforme réunit les passionnés et offre un espace de partage et d'évaluation des plus beaux canards et des compétitions les plus palpitantes."
        card
      />
    </div>

    <ULandingGrid class="grid grid-cols-12 gap-4 max-w-5xl">

        <ULandingCard
        class="col-span-6 row-span-2"
        icon="i-heroicons-puzzle-piece"
        title="Ajoutez vos Canards"
        description="Créez un profil pour chacun de vos canards, avec des photos, des descriptions, et montrez-les à la communauté."
      />
      
      <ULandingCard
        class="col-span-6 row-span-4"
        icon="i-heroicons-trophy"
        title="Inscrivez vos Canards à des Compétitions"
        description="Participez à des compétitions locales ou internationales et voyez si votre canard peut être couronné champion !"
      />

      <ULandingCard
        class="col-span-6 row-span-4"
        icon="i-heroicons-star"
        title="Notez et Commentez"
        description="Donnez votre avis sur les canards des autres membres et les compétitions. Chaque note compte !"
      />

      <ULandingCard
        class="col-span-6 row-span-2"
        icon="i-heroicons-eye"
        title="Découvrez les Meilleurs Canards"
        description="Explorez les canards les mieux notés et les plus appréciés par la communauté."
      />
    </ULandingGrid>
  </div>

  <!-- NOS CANARDS -->
  <div class="p-8 m-20">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-4xl font-bold uppercase">Nos canards</h2>
      <nuxt-link to="/canards" class="text-blue-500 font-semibold hover:underline">
        Voir plus
      </nuxt-link>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      <div v-for="canard in canardsToShow" :key="canard.id" class="w-full max-w-sm">
        <DuckCard :canard="canard" />
      </div>
    </div>
  </div>

  <!-- NOS PROCHAINES COMPETITIONS -->
  <div class="p-8 m-20">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-4xl font-bold uppercase">Nos Prochaines Compétitions</h2>
      <nuxt-link to="/competitions" class="text-blue-500 font-semibold hover:underline">
        Voir plus
      </nuxt-link>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      <div v-for="competition in upcomingCompetitions" :key="competition.titre" class="w-full max-w-sm">
        <CompetitionCard :competition="competition" />
      </div>
    </div>
  </div>
</template>
