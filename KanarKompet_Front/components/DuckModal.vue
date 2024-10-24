<script setup>

  import { ref } from 'vue';

  const { data } = await useFetch("http://localhost:2000/api/v1/utilisateurs")

  const commentText = ref('');
  const errorMessage = ref('');

  const props = defineProps({
    canard: {
      type: Object,
      required: true,
    }
  });


  async function onSubmit() {

  const commentaire = commentText.value;

  try {
    const resCom = await $fetch('http://localhost:2000/api/v1/commentairesCanard', {
      method: 'POST',
      body: {
        "commentaire": commentaire,
      }
    });


    const resCanard = await $fetch(`http://localhost:2000/commentaireCanardCanard/${resCom.id}/${props.canard.id}`, {
      method: 'POST',
  });
    errorMessage.value = ''; 
  } catch (error) {
    // console.error('Error:', error);
    errorMessage.value = 'Une erreur est survenue lors de la publication de votre commentaire.'; 
  } 
  }


  
</script>

<template>
  <div>
    <button class="btn bg-green-400 hover:bg-green-800 hover:text-white border-none btn-neutral text-xl" @click="openModal">
      En savoir plus
      <svg
        class="rtl:rotate-180 w-4 h-4 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>

    <dialog :id="`${canard.id}modal`" class="modal flex justify-center">
      <div class="modal-box bg-white " >
        <div class="inline-flex">
          <img
            src="https://picsum.photos/300/200"
            class="rounded max-w-full max-h-48 object-contain"
            alt="Duck photo"
          />
          <div class="ml-5 w-full text-black">
            <h3 class="text-lg font-bold">{{ canard.nom }}</h3>
            <hr class="mb-2" />
            <div class="text-start">
              <p>
                <span class="font-bold">Titre :</span>
                {{ canard.titre || "Aucun" }}
              </p>
              <p><span class="font-bold">Poids :</span> {{ canard.poids }}</p>
              <p><span class="font-bold">Age :</span> {{ canard.age }}</p>
              <p><span class="font-bold">Race :</span> {{ canard.race ? canard.race.nom : "Non renseignée" }}</p>
              <p>
                <span class="font-bold">Dresseur :</span>
                {{ canard.utilisateur.prenom }} {{ canard.utilisateur.nom }}
              </p>
              <p>
                <span class="font-bold">Participations :</span>
                {{ canard.nb_participations || 0 }}
              </p>
              <p>
                <span class="font-bold">Victoires :</span>
                {{ canard.nb_victoires || 0 }}
              </p>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Fermer</button>
              </form>
            </div>
          </div>
        </div>
        <div v-for="commentaire in canard.commentaireCanards" :key="id">
          <p class="font-bold">{{ data[commentaire.utilisateurId -1].prenom }} {{ data[commentaire.utilisateurId -1].nom }} -</p>
          <p>{{ commentaire.commentaire }}</p>
          <br>
        </div>
        <div class="mt-4">
          <h4 class="font-bold text-lg mb-2">Laisser un commentaire pour {{ canard.nom }}:</h4>
          <form @submit.prevent="onSubmit">
            <textarea
              v-model="commentText"
              placeholder="Laisser votre commentaire ici..."
              class="textarea textarea-bordered w-full"
              rows="3"
              required
            ></textarea>
            <button class="btn bg-green-400 hover:bg-green-800 hover:text-white border-none btn-neutral mt-2" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  props: {
    canard: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openModal() {
      const modal = document.getElementById(`${this.canard.id}modal`);
      if (modal) {
        modal.showModal(); // Show the modal if it exists
      } else {
        console.error("Modal not found:", `${this.canard.id}modal`);
      }
    },
  },
};
</script>
