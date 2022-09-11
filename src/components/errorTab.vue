<script setup>
  const props = defineProps({
    errorMessage: String
  });
</script>

<template>
    <div v-if="errorMessage">
        <div class="arrow-up"></div>
        <div class="error">
            <span>{{ errorMessage }}</span>
        </div>
    </div>
</template>

<style>
    .error{
      background-color: #dc3545;
      left: 0%;
      margin-top: 5px;
      border-radius: 3px;
      padding: 5px;
    }

    .arrow-up {
      position: absolute;
      margin-top: -5px;
      margin-left: 5px;
      width: 0; 
      height: 0; 
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      
      border-bottom: 5px solid #dc3545;
    }
</style>