<script setup lang="ts">
import logo from '@/assets/logo-transparent-png.png';

interface Race {
  id: number; 
  nom: string; 
}

const { data: races } = await useFetch<Race[]>("http://localhost:2000/api/v1/races");

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  min?: number;
  step?: number;
  options?: Array<{ label: string; value: any }>;
}

const fields: Field[] = [
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
    min: 1,
    required: true 
  },
  {
    name: 'race',
    label: 'Race',
    placeholder: 'Sélectionner une race',
    type: 'select',
    options: [
      { label: 'Inconnue', value: null }, 
      ...races.value.map((race: Race) => ({
        label: race.nom, 
        value: race.id
      }))
    ],
    required: true 
  }
];

const errorMessage = ref<string>(''); 
const successMessage = ref<string>('');

const validate = (state: Record<string, any>) => {
  const errors: Array<{ path: string; message: string }> = [];
  
  fields.forEach(field => {
    if (field.required && !state[field.name]) {
      errors.push({ path: field.name, message: `${field.label} est requis` });
    }
  });

  return errors;
};

interface FormData {
  name: string;
  age: number;
  gender: { value: string };
  weight: number;
  race: { value: any };
}

interface CanardResponse {
  id: number; 
}

async function onSubmit(data: FormData) {
  const nom = data.name;
  const age = data.age;
  const genre = data.gender.value; 
  const poids = data.weight;
  const race = data.race.value; 

  try {
    const resCanard = await $fetch<CanardResponse>('http://localhost:2000/api/v1/canards', {
      method: 'POST',
      body: {
        "nom": nom,
        "age": age,
        "genre": genre,
        "poids": poids,
      }
    });
    const idCanard = resCanard.id;
    await $fetch(`http://localhost:2000/api/v1/races/raceCanard/1/${idCanard}`, {
      method: 'POST',
    });

    await $fetch(`http://localhost:2000/api/v1/utilisateurs/utilisateurCanard/2/${idCanard}`, {
      method: 'POST',
    });

    
    
    errorMessage.value = ''; 
    successMessage.value = `${nom} a été ajouté(e) avec succès !`; 

  } catch (error) {
    successMessage.value = ''; 
    errorMessage.value = `Une erreur est survenue lors de l'ajout de ${nom}.`; 
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
          <UAlert v-if="errorMessage" color="red" icon="i-heroicons-information-circle-20-solid" >
            {{ errorMessage }}
          </UAlert>
          <UAlert v-if="successMessage" color="green" icon="i-heroicons-check-circle-20-solid" title="Canard créé avec succès">
            {{ successMessage }}
          </UAlert>
        </template>

        <div>
          <label class="font-bold">{{ fields[2].label }} <span class="text-red-500">*</span></label>
          <select v-model="formData.gender" name="gender" required>
            <option disabled value="">Sélectionnez un genre</option>
            <option v-for="option in fields[2].options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="font-bold">{{ fields[4].label }} <span class="text-red-500">*</span></label>
          <select v-model="formData.race" name="race" required>
            <option disabled value="">Sélectionnez une race</option>
            <option v-for="option in fields[4].options" :key="option.value" :value="option.value">
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

  .shadow-lg:hover {
    box-shadow: 0 4px 30px #4ade80 ;
  }

</style>
