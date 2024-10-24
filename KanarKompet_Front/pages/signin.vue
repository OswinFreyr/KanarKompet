<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        
     <div class="flex justify-center mb-1">
       <img src="../assets/logo-transparent-png.png" alt="Logo" class="h-40 w-auto">
     </div>
        <h2 class="text-2xl font-bold mb-2 text-center">Créer un compte</h2>
        
        <form>
          <div class="mb-4">
            <label for="nom" class="block text-gray-700 font-semibold mb-2">Nom</label>
            <input type="text" id="nom" name="nom"  
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
  
          <div class="mb-4">
            <label for="prenom" class="block text-gray-700 font-semibold mb-2">Prénom</label>
            <input type="text" id="prenom" name="prenom" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
  
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" id="email" name="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
      
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-semibold mb-2">Mot de passe</label>
            <input type="password" id="password" name="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
  
          <div class="mb-4">
            <label for="confirm-password" class="block text-gray-700 font-semibold mb-2">Confirmer le mot de passe</label>
            <input type="password" id="confirm-password" name="confirm-password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
  
          <div>
            <button type="submit" class="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50">
             Valider
            </button>
          </div>

        </form>
      </div>
    </div>
  </template>
  
  
  