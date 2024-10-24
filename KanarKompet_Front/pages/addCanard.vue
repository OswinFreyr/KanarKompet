<script setup lang="ts">
import { ref } from 'vue' 
import logo from '@/assets/logo-transparent-png.png';

const races = await useFetch("http://localhost:2000/api/v1/races")

const fields = [
  {
    name: 'name',
    type: 'text',
    label: 'Nom',
    placeholder: 'Poupette',
    required: true 
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    placeholder: '8',
    min: 1,
    required: true 
  },
  {
    name: 'gender',
    label: 'Genre',
    placeholder: 'Sélectionner un genre',
    type: 'select', 
    options: [
      { label: 'Mâle', value: 'M' },
      { label: 'Femelle', value: 'F' }
    ],
    required: true 
  },
  {
    name: 'weight',
    label: 'Poids',
    type: 'number',
    placeholder: '4.6',
    step: 0.1,
    required: true 
  }
];

const errorMessage = ref(''); 
const successMessage = ref('');
const selectedGender = ref<string | null>(null); 
const validate = (state: any) => {
const errors: any = [];
  
  fields.forEach(field => {
    if (field.required && !state[field.name]) {
      errors.push({ path: field.name, message: `${field.label} est requis` });
    }
  });

  return errors;
};

async function onSubmit(data: any) {
  const nom = data.name;
  const age = data.age;
  const poids = data.weight;
  const genre = data.gender; 
  
  try {
    const res = await $fetch('http://localhost:2000/api/v1/canards', {
      method: 'POST',
      body: {
        "nom": nom,
        "age": age,
        "genre": genre,
        "poids": poids
      }
    });
    errorMessage.value = ''; 
    successMessage.value = `${nom} a été créé(e) avec succès !`; 

  } catch (error) {
    successMessage.value = ''; 
    errorMessage.value = 'Une erreur est survenue lors de la création de votre compte.'; 
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UCard class="max-w-sm w-full shadow-lg rounded-lg">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        title="Ajouter un canard"
        align="top"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
      >

      <template #icon>
        <img :src="logo" alt="Logo" class="h-30 w-30 object-contain mx-auto" /> 
      </template>
        <template #description>
          Présentez-nous votre compagnon.
        </template>

        <template #validation>
          <UAlert v-if="errorMessage" color="red" icon="i-heroicons-information-circle-20-solid" title="Problème lors de la création du compte">
            {{ errorMessage }}
          </UAlert>
          <UAlert v-if="successMessage" color="green" icon="i-heroicons-check-circle-20-solid" title="Canard créé avec succès">
            {{ successMessage }}
          </UAlert>
        </template>


        <div>
          <label class="font-bold">{{ fields[2].label }}</label>
          <select v-model="selectedGender" name="gender">
            <option disabled value="">Sélectionnez un genre</option>
            <option v-for="option in fields[2].options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </UAuthForm>
    </UCard>
  </div>
</template>

<style scoped>
.shadow-lg {
  box-shadow: 0 4px 30px rgba(156, 155, 155, 0.6);
}
</style>
