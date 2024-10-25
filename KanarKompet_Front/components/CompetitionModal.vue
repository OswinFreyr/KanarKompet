<script setup>
import { ref } from "vue";

const { data } = await useFetch("http://localhost:2000/api/v1/utilisateurs");

const commentText = ref("");
const errorMessage = ref("");

const props = defineProps({
  competition: {
    type: Object,
    required: true,
  },
});

async function onSubmit() {
  const commentaire = commentText.value;

  try {
    const resCom = await $fetch(
      "http://localhost:2000/api/v1/commentairesCompetition",
      {
        method: "POST",
        body: {
          commentaire: commentaire,
        },
      }
    );

    const resCompetition = await $fetch(
      `http://localhost:2000/api/v1/competitions/competitionCommentaireCompetition/${props.competition.id}/${resCom.id}`,
      {
        method: "POST",
      }
    );
    errorMessage.value = "";
  } catch (error) {
    // console.error('Error:', error);
    errorMessage.value =
      "Une erreur est survenue lors de la publication de votre commentaire.";
  }
}
</script>

<template>
  <div>
    <button
      class="btn bg-green-400 hover:bg-green-800 hover:text-white border-none btn-neutral text-xl"
      @click="openModal"
    >
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

    <dialog :id="`${competition.id}modal`" class="modal flex justify-center">
      <div class="modal-box dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
        <div class="">
          <img
            src="https://picsum.photos/500/200"
            class="rounded max-w-full max-h-48 object-contain"
            alt="Duck photo"
          />
          <br>
          <div class="ml-5 w-full">
            <h3 class=" font-bold text-white text-4xl">{{ competition.titre }}</h3>
            <br>
            <div class="text-start">
              <p class="text-white text-xl">
                {{ competition.description }}
              </p>
              <br>
              <p>
                <span class="font-bold text-white">Lieu :</span> {{ competition.lieu }}
              </p>
              <p>
                <span class="font-bold text-white">Date :</span>
                {{
                  new Date(competition.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                }}
              </p>
              <p>
                <span class="font-bold text-white"
                  >Heure de début > :</span
                >
                {{ competition.horaire }}
              </p>
              <p><span class="font-thin italic">(Arrivez 20 minutes avant)</span></p>
              <p>
                <span class="font-bold text-white">Nombre de participants :</span>
                {{ competition.max_participants }}
              </p>
              <p>
                <span class="font-bold text-white">Cash Prize :</span>
                {{ competition.recompense || 0 }}
              </p>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Fermer</button>
              </form>
            </div>
          </div>
        </div>
        <br>
        <hr>
        <div
          v-for="commentaire in competition.commentaireCompetitions"
          :key="id"
        >
          <!-- <p class="font-bold">{{ data[commentaire.utilisateurId -1].prenom }} {{ data[commentaire.utilisateurId -1].nom }} -</p> -->
          <p>{{ commentaire.commentaire }}</p>
          <br />
        </div>
        <div class="mt-4">
          <h4 class="font-bold text-lg mb-2 text-white">Laisser un commentaire :</h4>
          <form @submit.prevent="onSubmit">
            <textarea
              v-model="commentText"
              placeholder="Laisser votre commentaire ici..."
              class="textarea textarea-bordered w-full text-white"
              rows="3"
              required
            ></textarea>
            <button
              class="btn text-black bg-green-400 hover:bg-green-800 hover:text-white border-none btn-neutral mt-2"
              type="submit"
            >
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
    competition: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openModal() {
      const modal = document.getElementById(`${this.competition.id}modal`);
      if (modal) {
        modal.showModal(); // Show the modal if it exists
      } else {
        console.error("Modal not found:", `${this.competition.id}modal`);
      }
    },
  },
};
</script>
