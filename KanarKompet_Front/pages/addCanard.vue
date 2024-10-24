<template>
    <div>
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10 mb-10">
        <h2 class="text-2xl font-bold text-center mb-2">Ajouter un canard</h2>
        <hr class="border-gray-300 mb-6">
        
        
        <form @submit.prevent="submitForm"> 
          
          <div class="flex items-center mb-4">
            <label for="nom" class="w-20 text-gray-700">Nom :</label>
            <input
              v-model="nom" 
              type="text"
              id="nom"
              name="nom"
              class="border border-gray-300 rounded-lg p-2 w-full"/>
          </div>
  
          <div class="flex items-center mb-4">
            <label for="race" class="w-20 text-gray-700">Age :</label>
            <input
              v-model="age"
              type="text"
              id="age"
              name="age"
              class="border border-gray-300 rounded-lg p-2 w-full" />
          </div>
  
          <div class="flex items-center mb-4">
            <label for="titre" class="w-20 text-gray-700">genre :</label>
            <input
              v-model="genre" 
              type="text"
              id="genre"
              name="genre"
              class="border border-gray-300 rounded-lg p-2 w-full"/>
          </div>
  
          <div class="flex items-center mb-4">
            <label for="poids" class="w-20 text-gray-700">Poids :</label>
            <input
              v-model="poids" 
              type="text"
              id="poids"
              class="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Entrez le poids en kg"/>
          </div>
          
          <div class="text-center">
            <button
              type="submit"
              class="bg-green-400 py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'; // Importation des réactifs pour gérer les données du formulaire
  
  // Variables pour les données du formulaire
  const nom = ref('');
  const age = ref('');
  const genre = ref('');
  const poids = ref('');
  
  const submitForm = async () => {
    try {
        console.log(nom.value)
      // Utilisation de $fetch pour envoyer les données à l'API
      const response = await $fetch('http://localhost:2000/api/v1/canards', { 
        method: 'POST',
        body: {
          'nom': nom.value,
          'age': genre.value,
          'titre': genre.value,
          'poids': poids.value
        }
      });
      console.log('Canard ajouté avec succès :', response);
    } catch (error) {   
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };
  </script>
  