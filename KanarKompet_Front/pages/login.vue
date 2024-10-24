<script setup lang="ts">
import { ref } from 'vue'; 
import logo from '@/assets/logo-transparent-png.png';
const fields = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'exemple@gmail.com'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Entrez votre mot de passe'
  },
  // {
  //   name: 'remember',
  //   label: 'Remember me',
  //   type: 'checkbox'
  // }
];

const errorMessage = ref(''); 

const validate = (state: any) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

async function onSubmit(data: any) {
  const e_mail = data.email;
  const mot_de_passe = data.password;

  try {
    const res = await $fetch('http://localhost:2000/api/v1/utilisateurs', {
      method: 'POST',
      body: {
        "e_mail": e_mail,
        "mot_de_passe": mot_de_passe
      }
    });
    errorMessage.value = ''; 
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Une erreur est survenue lors de la connexion.';
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <!-- <img :src="logo"/> -->
    <UCard class="max-w-sm w-full shadow-lg rounded-lg">
  <UAuthForm
    :fields="fields"
    :validate="validate"
    title="Vous revoilà !"
    align="top"
    :ui="{ base: 'text-center', footer: 'text-center' }"
    @submit="onSubmit"
  >
    <template #icon>
      <img :src="logo" alt="Logo" class="h-30 w-30 object-contain mx-auto" /> 
    </template>
    
    <template #description>
      Vous n'avez pas de compte ? <NuxtLink to="/signin" class="text-primary font-medium">Créer un compte</NuxtLink>.
    </template>

    <template #password-hint>
      <NuxtLink to="/" class="text-primary font-medium">Mot de passe oublié ?</NuxtLink>
    </template>

    <template #validation>
      <UAlert v-if="errorMessage" color="red" icon="i-heroicons-information-circle-20-solid" title="Erreur de connexion">
        {{ errorMessage }}
      </UAlert>
    </template>

    <template #footer>
      <NuxtLink to="/" class="text-primary font-medium">Conditions d'utilisations</NuxtLink>.
    </template>
  </UAuthForm>
</UCard>
  
  </div>
</template>

<style scoped>
.shadow-lg {
  box-shadow: 0 4px 30px rgba(156, 155, 155, 0.6);
}

.auth-form .icon {
  width: 50px; 
  height: 50px;
  object-fit: contain; 
}
</style>
