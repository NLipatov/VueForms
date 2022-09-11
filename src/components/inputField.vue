<template>
    <div>
      <input :class="inputClasses" v-model="value" type="text" :placeholder="titleBage" data-toggle="popover"/>
      <div class="error">
        <span>{{ errorMessage }}</span>
        <!-- <button @click="$emit('someEvent')">click me</button> -->
      </div>
    </div>
  </template>
  <script setup>
  import { useField } from 'vee-validate';
  import { defineProps, toRef } from 'vue';
  import * as yup from 'yup';

  const inputClasses = {
    "survey-input": true,
  }

  const props = defineProps({
    name: String,
    titleBage: String,
  });

  const nameRef = toRef(props, 'name');
  const { errorMessage, value, meta } = useField(nameRef, yup.string().email().required());

  defineExpose({
    meta,
    errorMessage
  })
  </script>

  <style>
    .survey-input {
      height: 30px;
      width: 100%;
      display: flex;
    }
    .error{
      color: red;
    }
  </style>