<script setup lang="ts">
import { ref } from 'vue'; 
import logo from '@/assets/logo-transparent-png.png';

const fields = ref([
  {
    name: 'title',
    type: 'text',
    label: 'Titre',
    placeholder: 'Super Kompetition'
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    placeholder: 'Une compétition à vous tenir en haleine.'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Adresse',
    placeholder: '4 rue des Canards, 33000 Bordeaux'
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'Sélectionner une date'
  },
  {
    name: 'hour',
    label: 'Heure',
    type: 'time',
    placeholder: 'Sélectionner une heure'
  },
  {
    name: 'trophee',
    label: 'Récompense',
    type: 'text',
    placeholder: 'Une récompense incroyable'
  },
  {
    name: 'max_participants',
    label: 'Maximum participants',
    type: 'number',
    min: 2,
    placeholder: '1'
  },
]);

const errorMessage = ref('');

async function onSubmit(data: any) {
  const titre = data.title;
  const description = data.description;
  const lieu = data.address;
  const date = data.date;
  const horaire = data.hour;
  const recompense = data.trophee;
  const max_participants = data.max_participants;

  try {
    const res = await $fetch('http://localhost:2000/api/v1/competitions', {
      method: 'POST',
      body: {
        "titre": titre,
        "description": description,
        "lieu": lieu,
        "date": date,
        "horaire": horaire,
        "recompense": recompense,
        "max_participants": max_participants,
      }
    });


    errorMessage.value = ''; 

  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la création de la compétition.'; 
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UCard class="max-w-sm w-full shadow-lg rounded-lg">
      <UAuthForm
        :fields="fields"
        title="Ajouter une compétition"
        align="top"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
      >
        <template #icon>
          <img :src="logo" alt="Logo" class="h-30 w-30 object-contain mx-auto" /> 
        </template>
        <template #description>
          Faites vibrer les foules.
        </template>
        <template #validation>
          <UAlert v-if="errorMessage" color="red" icon="i-heroicons-information-circle-20-solid" title="Problème lors de la création du compte">
            {{ errorMessage }}
          </UAlert>
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>

<style scoped>
.shadow-lg {
  box-shadow: 0 4px 30px rgba(156, 155, 155, 0.6);
}
.shadow-lg:hover {
  box-shadow: 0 4px 30px #4ade80;
}
</style>
