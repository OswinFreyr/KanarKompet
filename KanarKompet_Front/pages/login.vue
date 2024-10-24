<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
     <div class="flex justify-center mb-6">
       <img src="../assets/logo-transparent-png.png" alt="Logo" class="h-40 w-auto">
     </div>
        <h2 class="text-2xl font-bold mb-6 text-center">Se connecter</h2>
        
        <form>
          <div class="mb-4">
            <label for="nom" class="block text-gray-700 font-semibold mb-2">Adresse mail</label>
            <input type="text" id="mail" name="mail"  
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
      
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-semibold mb-2">Mot de passe</label>
            <input type="password" id="password" name="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
          </div>
  
          <div>
            <button type="submit" class="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50">
             Connexion
            </button>
          </div>

        </form>
      </div>
    </div>
  </template>
  
  
  