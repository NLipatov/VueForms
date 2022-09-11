<script setup>
  import { ref, onMounted } from 'vue'
  import { useField, useForm  } from 'vee-validate';
  import * as yup from 'yup';
  import inputField from './components/inputField.vue';

  // Define a validation schema
  const schema = yup.object({
    email: yup.string().required().email(),
    lastname: yup.string().matches(/^[A-Za-z]+$/, 'Only english letters allowed').required().trim(),
    firstname: yup.string().matches(/^[A-Za-z]+$/, 'Only english letters allowed').required().trim(),
  });

// Create a form context with the validation schema
useForm({
  validationSchema: schema,
});
const log = () => {
  const exposed = nameForm.value.meta;
  console.log(`dirty: ${exposed.dirty}\nvalid: ${exposed.valid}`);
  if(!exposed.valid) {
    console.log('not valid on submit')
    console.log(nameForm.value.errorMessage)
  }
}

const nameForm = ref(null)
onMounted(() => {
  
})

const sideblockInputFields = []; 
</script>

<template>
  <div class="up-divider"></div>
  <div class="content">
    <div class="survey-form">
      <div class="survey-edge upperEdge">

      </div>
      <div class="survey-body">
        <div class="survey-row-block">
            <div class="sideblock-survey">
              <inputField ref="nameForm" name="firstname" titleBage="First name"/>
              <inputField name="lastname" titleBage="Last name"/>
              <inputField name="email" titleBage="Email"/>
            </div>
          <div class="sideblock-survey">
            <select name="countries" placeholder="Your Country">\
              <option value="none" selected disabled hidden>Select a country</option>
              <option value="States">United States</option>
              <option value="Germany">Germany</option>
              <option value="Russia">Russia</option>
              <option value="China">China</option>
            </select>
            <div class="birthday-sub-survey">
              <label for="dateOfBirth">Date of Birth: </label>
              <input id="dateOfBirth" type="date" />
            </div>
            <div class="gender-sub-survey">
              <span>
                Your biological gender:
              </span>
                <label for="html">Male</label>
                <input type="radio" id="html" name="fav_language" value="HTML">
                
                <label for="css">Female</label>
                <input type="radio" id="css" name="fav_language" value="CSS">
            </div>
          </div>
        </div>
        <div class="additional-sub-survey">
          <label>We would be very thankful if you could provide any additional information:</label>
          <textarea id="additional information" rows="4"></textarea>
        </div>
        <div>
          <div class="consent-sub-survey">          
            <label for="communicationConsent">Would you like to receive electronic communication by email?</label>
            <input id="communicationConsent" type="checkbox">
          </div>

          <div class="consent-sub-survey">          
            <label for="personalData">Would you allow to process your personal information by our company?</label>
            <input id="personalData" type="checkbox">
          </div>
        </div>
      </div>
      <div class="survey-edge bottomEdge">
        <button @click="log" type="button" class="btn btn-success" >Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.up-divider {
  position: absolute;
  height: 50vh;
  width: 100vw;
  background-color: #00b7a5;
  z-index: -1;
}

.content {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.survey-form {
  display: flex;
  flex-direction: column;
  width: 60vw;
  background-color: transparent;
  box-shadow: 0px 0px 60px 40px rgba(34, 60, 80, 0.2);
  border-radius: 25px;
}

.survey-edge{
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 45px;
  background-color: lightgray;
}

.upperEdge {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

.bottomEdge {
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.survey-edge .btn {
  --bs-btn-padding-y: .25rem;
  --bs-btn-padding-x: .5rem;
  --bs-btn-font-size: .75rem;
}

.survey-body {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  padding: 10px;
  justify-content: center;
  background-color: white;
}

.sideblock-survey {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  gap: 10px;
}

.sideblock-survey select {
  height: 30px;
}
.sideblock-survey input {
  height: 30px;
}

.birthday-sub-survey {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.birthday-sub-survey input {
  width: 85%;
}
.birthday-sub-survey label {
  width: 50%;
}

.gender-sub-survey {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;
}

.survey-row-block {
  display: flex;
}

.additional-sub-survey {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.additional-sub-survey textarea {
  resize: none;
}

.consent-sub-survey {
  display: flex;
  gap: 10px;
  padding: 10px;
}
</style>
