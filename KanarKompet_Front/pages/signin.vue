<script setup lang="ts">
import { ref } from 'vue' 
import logo from '@/assets/logo-transparent-png.png';

const fields = [
  {
    name: 'lastname',
    type: 'text',
    label: 'Nom',
    placeholder: 'Viaire'
  },
  {
    name: 'firstname',
    type: 'text',
    label: 'Prénom',
    placeholder: 'Marie'
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'marieviaire@gmail.com'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Entrez votre mot de passe'
  }
];

const errorMessage = ref(''); 

const validate = (state: any) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

const loggedInAs = ref('Guest'); 

const updateLoggedInAs = () => {
  loggedInAs.value = localStorage.getItem('loggedInAs') || 'Guest';
  console.log("🚀 ~ loggedInAs:", loggedInAs.value); // Pour débogage
};

async function onSubmit(data: any) {
  const prenom = data.firstname;
  const nom = data.lastname;
  const e_mail = data.email;
  const mot_de_passe = data.password;
  const router = useRouter();
  try {
    const res = await $fetch('http://localhost:2000/api/v1/utilisateurs', {
      method: 'POST',
      body: {
        "nom": nom,
        "prenom": prenom,
        "e_mail": e_mail,
        "mot_de_passe": mot_de_passe
      }
    });
    errorMessage.value = ''; 

    localStorage.setItem('loggedInAs', 'User');
    updateLoggedInAs(); 

    await router.push('/');

  } catch (error) {
    // console.error('Error:', error);
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
        title="Bienvenue"
        align="top"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
      >

      <template #icon>
        <img :src="logo" alt="Logo" class="h-30 w-30 object-contain mx-auto" /> 
      </template>
        <template #description>
          Vous avez déjà un compte ? <NuxtLink to="/login" class="text-primary font-medium">Connexion</NuxtLink>.
        </template>

        <template #validation>
          <UAlert v-if="errorMessage" color="red" icon="i-heroicons-information-circle-20-solid" title="Problème lors de la création du compte">
            {{ errorMessage }}
          </UAlert>
        </template>

        <template #footer>
          En vous inscrivant, vous acceptez nos <NuxtLink to="/" class="text-primary font-medium">Condiditions d'utilisation</NuxtLink>.
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
    box-shadow: 0 4px 30px #4ade80 ;
  }
</style>
