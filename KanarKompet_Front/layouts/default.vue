<script setup lang="ts">
</script>

<template>
  <div class="dark" style="background-color: #111828;"> 
    <AppHeader style="margin-bottom: 20px;" />
    
    <div style="padding: 20px 0;">
      <slot/>
    </div>
    
    <AppFooter style="margin-top: 20px;" />
  </div>
</template>
