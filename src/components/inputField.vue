<template>
    <div v-if="componentType === 'input'">
      <input :class="inputClasses" v-model="value" type="text" :placeholder="titleBage"/>
      <errorTabVue v-bind:error-message="errorMessage"/>
      <!-- <div>
        <div v-if="errorMessage" class="arrow-up"></div>
        <div class="error">
          <span>{{ errorMessage }}</span>
          <button @click="$emit('someEvent')">click me</button>
        </div>
      </div> -->
    </div>
    <div v-else-if="componentType === 'select'">
      <select :class="inputClasses" v-model="value" name="countries" placeholder="Your Country">\
        <option value="none" selected disabled hidden>Select a country</option>
        <option value="United States">United States</option>
        <option value="Germany">Germany</option>
        <option value="Russia">Russia</option>
        <option value="China">China</option>
        <option value="North Korea">North Korea</option>
      </select>
      <errorTabVue v-bind:error-message="errorMessage"/>
    </div>
    <div v-else-if="componentType === 'date'">
      <div class="date-row">
        <label for="dateOfBirth">Date of Birth: </label>
        <input v-model="value" id="dateOfBirth" type="date" />
      </div>
      <errorTabVue v-bind:error-message="errorMessage"/>
    </div>
    <div v-else-if="componentType === 'gender-radio'">
      <div class="gender-sub-survey">
        <span>
        Gender:
        </span>
        <div style="display: flex; width: 75%; border: 2px solid black; align-items: center;">
          <div style="width: 50%; justify-content: center; display: flex; gap: 5px; align-self: center;">
            <label for="male">Male</label>
          <input v-model="value" type="radio" id="male" name="gender" value="male">
          </div>
          <div class="gender-divider"></div>
          <div style="width: 50%; justify-content: center; display: flex; gap: 5px; align-self: center;">
            <label for="female">Female</label>
          <input v-model="value" type="radio" id="female" name="gender" value="female">
          </div>
        </div>
      </div>
      <errorTabVue v-bind:error-message="errorMessage"/>
    </div>
  </template>
  <script setup>
  import { useField } from 'vee-validate';
  import { defineProps, toRef } from 'vue';
  import * as yup from 'yup';
  import errorTabVue from './errorTab.vue';

  const inputClasses = {
    "survey-input": true,
  }

  const props = defineProps({
    name: String,
    titleBage: String,
    componentType: String,
  });

  const nameRef = toRef(props, 'name');
  const { errorMessage, value, meta, handleChange } = useField(nameRef, yup.string().email().required());

  defineExpose({
    meta,
    errorMessage,
    handleChange
  })

  console.log(`my title is ${props.componentType}`)
  </script>

  <style>
    .survey-input {
      height: 30px;
      width: 100%;
      display: flex;
    }
    .birthday-sub-survey {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    .birthday-sub-survey input {
      width: 85%;
    }
    .birthday-sub-survey label {
      width: 50%;
    }
    .date-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .date-row input {
      width: 60%;
      height: 30px;
    }
    .gender-divider {
      height: 30px;
      width: 2px;
      background-color: black;
    }
    .gender-sub-survey {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
  </style>