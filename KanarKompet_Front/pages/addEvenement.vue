<template>
    <div>
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10 mb-10">
        <h2 class="text-2xl font-bold text-center mb-2">Ajouter un événement</h2>
        <hr class="border-gray-300 mb-6">
            <form>        
          <div class="flex items-center mb-4">
            <label for="titre" class="w-32 text-gray-700">Titre :</label>
            <input
              type="text"
              id="titre"
              name="titre"
              class="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
  
          <div class="flex items-center mb-4">
            <label for="description" class="w-32 text-gray-700">Description :</label>
            <textarea
              id="description"
              name="description"
              class="border border-gray-300 rounded-lg p-2 w-full"
            ></textarea>
          </div>
  
          <div class="flex items-center mb-4">
            <label for="adresse" class="w-32 text-gray-700">Adresse :</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              class="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
  
          <div class="flex items-center mb-4">
            <label for="date" class="w-32 text-gray-700">Date :</label>
            <input
              type="date"
              id="date"
              name="date"
              class="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
  
          <div class="flex items-center mb-4">
            <label for="heure" class="w-32 text-gray-700">Heure :</label>
            <input
              type="time"
              id="heure"
              name="heure"
              class="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div class="flex items-center mb-4">
            <label for="titre" class="w-32 text-gray-700">Prix :</label>
            <input
              type="text"
              id="prix"
              name="prix"
              class="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="en euros"
            />
          </div>
  
          <div class="text-center">
            <button
              type="submit"
              class="bg-green-400  py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  