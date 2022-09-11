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
    country: yup.string().oneOf(["United States", "Russia", "Germany", "China"], "Sorry, We have temporarily suspended orders from this country"),
    birthDate: yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required()
    .max(new Date(), "Please pick a valid date")
    .min(`${new Date().getFullYear() - 120}-01-01`, "Please pick a valid date"),
    gender: yup.string().oneOf(["male", "female"], "Please choose a gender").required()
  });

// Create a form context with the validation schema
useForm({
  validationSchema: schema,
});
const log = (e) => {
  e.preventDefault();
  genderForm.value.handleChange()
  nameForm.value.handleChange()
}



const form = ref(null)
const genderForm = ref(null);
const nameForm = ref(null);
onMounted(() => {
  // genderForm.value.meta.valid = false;
  // genderForm.value.meta.dirty = true;
  // genderForm.value.meta.touched = true;
  // genderForm.value = 'female'
  console.log(genderForm.value.meta)
})

const sideblockInputFields = []; 
</script>

<template>
  <div class="up-divider"></div>
  <div class="content">
    <form ref="form">
      <div class="survey-form">
      <div class="survey-edge upperEdge">

      </div>
      <div class="survey-body">
        <div class="survey-row-block">
            <div class="sideblock-survey">
              <inputField ref="nameForm" name="firstname" titleBage="First name" componentType="input"/>
              <inputField name="lastname" titleBage="Last name" componentType="input"/>
              <inputField name="email" titleBage="Email" componentType="input"/>
            </div>
          <div class="sideblock-survey">
            <inputField ref="countrySelect" name="country" titleBage="Country" componentType="select"/>
            <!-- <select name="countries" placeholder="Your Country">\
              <option value="none" selected disabled hidden>Select a country</option>
              <option value="States">United States</option>
              <option value="Germany">Germany</option>
              <option value="Russia">Russia</option>
              <option value="China">China</option>
            </select> -->
            <div>
              <inputField name="birthDate" componentType="date"/>
              <!-- <label for="dateOfBirth">Date of Birth: </label>
              <input id="dateOfBirth" type="date" /> -->
            </div>
            <div>
              <inputField ref="genderForm" name="gender" componentType="gender-radio" />
            </div>
            <!-- <div class="gender-sub-survey">
              <span>
                Your biological gender:
              </span>
                <label for="html">Male</label>
                <input type="radio" id="html" name="fav_language" value="HTML">
                
                <label for="css">Female</label>
                <input type="radio" id="css" name="fav_language" value="CSS">
            </div> -->
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
        <button @click.prevent="log" type="submit" class="btn btn-success">Submit</button>
      </div>
    </div>
    </form>
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
  width: 50vw;
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
