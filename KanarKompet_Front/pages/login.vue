<script setup lang="ts">
import { ref } from 'vue'; 
import { useRouter } from 'vue-router';
import logo from '@/assets/logo-transparent-png.png';

// Champs du formulaire
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
  }
];

const errorMessage = ref('');

// Validation des champs
const validate = (state: any) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email requis' });
  if (!state.password) errors.push({ path: 'password', message: 'Mot de passe requis' });
  return errors;
};

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse {
  token?: string;
}

const router = useRouter(); 

// const accessToken = localStorage.getItem('access_token');

async function onSubmit(data: LoginData): Promise<void> {
  const e_mail = data.email;
  const mot_de_passe = data.password;

  try {
    const dataUser: ApiResponse = await $fetch('http://localhost:2000/api/v1/login/utilisateur', {
      method: 'POST',
      body: {
        "e_mail": e_mail,
        "mot_de_passe": mot_de_passe
      }
    });

    if (dataUser.token) {
      localStorage.setItem('access_token', dataUser.token); 
      await router.push('/');
    } 
    else {
      const dataAdmin: ApiResponse = await $fetch('http://localhost:2000/api/v1/login/admin', {
        method: 'POST',
        body: {
          "e_mail": e_mail,
          "mot_de_passe": mot_de_passe
        }
      });

      if (dataAdmin.token) {
        localStorage.setItem('access_token', dataAdmin.token); 
        await router.push('/');
      } 
      else {
        errorMessage.value = 'Email ou mot de passe incorrect.'; 
      }
    }
  } 
  catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Une erreur est survenue lors de la connexion.'; 
  }
}

</script>


<template>
  <div class="flex items-center justify-center min-h-screen">
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
