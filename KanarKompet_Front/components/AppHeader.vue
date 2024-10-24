<script setup lang="ts">

let loggedInAs = "Guest"

</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-2">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img src="../assets/Logo(OnlyDuck).svg" class="w-20 mx-2.5" alt="Logo" />
      <span class="font-semibold text-xl tracking-tight">KanarKompet</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-200 text-white mr-4"
        >
          Accueil
        </a>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-200 text-white mr-4"
        >
          Compétitions
        </a>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-200 text-white"
        >
          Canards
        </a>
       
        <NuxtLink
               role="button" class="btn m-1 text-white"
                  v-show="loggedInAs !== 'User' && loggedInAs !== 'Admin'" to="/addCanard">
                  Ajouter un canard
        </NuxtLink>
        <NuxtLink
               role="button" class="btn m-1 text-white"
                  v-show="loggedInAs !== 'User' && loggedInAs !== 'Admin'" to="/addEvenement">
                  AJouter un événement
        </NuxtLink>
      </div>
      <div>
        <NuxtLink
               role="button" class="btn m-1 text-white"
                  v-show="loggedInAs !== 'User' && loggedInAs !== 'Admin'" to="./login">
                  Se connecter
        </NuxtLink>

        <span class="text-white mx-3"v-show="loggedInAs !== 'User' && loggedInAs !== 'Admin'">|</span>

        <NuxtLink
               role="button" class="btn m-1 text-white"
                  v-show="loggedInAs !== 'User' && loggedInAs !== 'Admin'" to="/signin">
                  Créer un compte
        </NuxtLink>
        <div class="dropdown dropdown-end" v-show="loggedInAs === 'User' || loggedInAs === 'Admin'">
          <div tabindex="0" role="button" class="btn m-1 text-white">
            Mon compte
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-white"
          >
            <li v-show="loggedInAs === 'User'"><a>Mes inscriptions</a></li>
            <li v-show="loggedInAs === 'User'"><a>Mes canards</a></li>
            <li v-show="loggedInAs === 'User'"><a>Favoris</a></li>
            <li><a>Mes informations</a></li>
            <li><a>Se déconnecter</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
