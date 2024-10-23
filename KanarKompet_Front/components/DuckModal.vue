<template>
    <div>
        <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
        <dialog id="my_modal_1" class="modal flex justify-center">
            
            <div class="modal-box bg-white inline-flex">
                <img src="https://picsum.photos/204"class="rounded max-w-full max-h-48 object-contain" alt="Duck photo">
                <div class="ml-5 w-full">
                    <h3 class="text-lg font-bold">{{ canard.name }}</h3>
                    <hr class="mb-2">
                    <div>
                        <p><span class="font-bold">Titre :</span> {{ canard.title }}</p>
                        <p><span class="font-bold">Poids :</span> {{ canard.weight }}</p>
                        <p><span class="font-bold">Age :</span> {{ canard.age }}</p>
                        <p><span class="font-bold">Race :</span> {{ canard.race }}</p>
                        <p><span class="font-bold">Participations :</span> {{ canard.nb_participation }}</p>
                        <p><span class="font-bold">Victoires :</span> {{ canard.nb_win }}</p>
                        <p><span class="font-bold">Note :</span> {{ canard.rating }}</p>
                        

                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                        <button class="btn">Close</button>
                        </form>
                    </div>
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
    }
  }
};
</script>