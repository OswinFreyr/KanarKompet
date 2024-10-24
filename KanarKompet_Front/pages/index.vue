<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <ULandingCTA
        title="Trusted and supported by our amazing community"
        description="We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success."
        card
        class="mb-12"
      />
      
      <ULandingGrid class="grid grid-cols-12 gap-4 max-w-5xl">
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-swatch"
          title="Color Palette"
          description="Choose a primary and a gray color from your Tailwind CSS color palette."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-heroicons-wrench-screwdriver"
          title="Fully Customizable"
          description="Change the style of any component in your App Config or with ui prop."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-heroicons-face-smile"
          title="Icons"
          description="Choose any of the 100k+ icons from the most popular icon libraries."
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-computer-desktop"
          title="Keyboard Shortcuts"
          description="Nuxt UI comes with a set of Vue composables to easily handle shortcuts."
        />
      </ULandingGrid>
    </div>
  </template>
  