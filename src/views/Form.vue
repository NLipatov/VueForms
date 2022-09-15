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
              <div class="input-placeholder">
                  <input name="firstname" v-model="firstname" type="text" required>
                  <div class="placeholder">
                    <span>First name</span><span>*</span>
                  </div>
              </div>
              <div class="error-wrapper" v-if="errors.firstname && firstNameDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.firstname }}</span>
                </div>
              </div>
              <div class="input-placeholder">
                  <input name="lastname" v-model="lastname" type="text" required>
                  <div class="placeholder">
                    <span>Last name</span><span>*</span>
                  </div>
              </div>
              <div class="error-wrapper" v-if="errors.lastname && lastNameDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.lastname }}</span>
                </div>
              </div>
              <div class="input-placeholder">
                  <input name="email" v-model="email" type="text" required>
                  <div class="placeholder">
                    <span>Email</span><span>*</span>
                  </div>
              </div>
              <div class="error-wrapper" v-if="errors.email && emailDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.email }}</span>
                </div>
              </div>
            </div>
          <div class="sideblock-survey">
            <div class="countrySelect">
              <span>Country:</span>
              <select
                @change="updateInput"
              >
                <option disabled selected value>Select a country</option>
                <option
                    v-for="(optie) in countries"
                    :value="optie"
                  >{{ optie }}
                </option>
              </select>
            </div>
            <div class="error-wrapper" v-if="errors.selectedCounty && countryDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.selectedCounty }}</span>
                </div>
              </div>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; justify-content: space-between; height: 30px; margin-bottom: 10px;">
                <label for="dateOfBirth">Date of Birth: </label>
                <input name="birthdate" v-model="birthdate" id="dateOfBirth" type="date" />
              </div>
              <div class="error-wrapper" v-if="errors.birthdate && birthDateDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.birthdate }}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="gender-sub-survey">
              <span>
              Gender:
              </span>
              <div style="display: flex; width: 75%; align-items: center;">
                <div style="width: 50%; justify-content: center; display: flex; gap: 5px; align-self: center;">
                  <label for="male">
                    <font-awesome-icon :class="gender === 'male' ? '_choosen-gender' : null" class="gender-icon" icon="fa-mars" />
                  </label>
                  <input hidden v-model="gender" type="radio" id="male" name="gender" value="male">
                </div>
                <div class="gender-divider"></div>
                <div style="width: 50%; justify-content: center; display: flex; gap: 5px; align-self: center;">
                  <label for="female">
                    <font-awesome-icon :class="gender === 'female' ? '_choosen-gender' : null" class="gender-icon" icon="fa-venus" />
                  </label>
                  <input hidden v-model="gender" type="radio" id="female" name="gender" value="female">
                </div>
              </div>
            </div>
            </div>
            <div class="error-wrapper" v-if="errors.gender && genderDirty">
                  <div class="arrow-up"></div>
                  <div class="error">
                      <span>{{ errors.gender }}</span>
                  </div>
              </div>
          </div>
        </div>
        <div class="additional-sub-survey">
          <label>Few words about you:</label>
          <textarea v-model="additionalInformation" id="additional information" rows="4"></textarea>
        </div>
        <div>
          <div class="consent-sub-survey">          
            <label for="communicationConsent">Would you like to receive email communications?</label>
            <input v-model="communications" id="communicationConsent" type="checkbox">
          </div>

          <div class="consent-sub-survey">
            <div class="consent-wrapper">
              <div class="consent-checkbox">
                <label for="personalData">Would you allow us to store your personal data?</label>
                <input @change="setPersonaldataDirty" v-model="personaldata" name="personaldata" id="personalData" type="checkbox">
              </div>
              <div class="error-wrapper" v-if="personaldataDirty && errors.personaldata">
                  <div class="arrow-up"></div>
                  <div class="error">
                      <span>{{ errors.personaldata }}</span>
                  </div>
              </div>
            </div>          
          </div>
        </div>
      </div>
      <div class="survey-edge bottomEdge">
        <button @click.prevent="onSubmit" type="submit" class="btn btn-success">Submit</button>
      </div>
    </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const updateInput = (e) => {
  selectedCounty.value = e.target.value;
};

const countries = ["United States", "Russia", "Germany", "China", "North Korea"];

// Define a validation schema
const simpleSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  firstname: yup.string().matches(/^[A-Za-z]+$/, 'Only english alphabet letters allowed').trim().required("Please enter your name"),
  lastname: yup.string().matches(/^[A-Za-z]+$/, 'Only english alphabet letters allowed').trim().required("Please enter your lastname"),
  selectedCounty: yup.string().oneOf(countries.slice(0, -1), "Sorry, We have temporarily suspended orders from your country").required("Please select your country"),
  birthdate: yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required("Please select your birthdate")
    .max(new Date(), "Please pick a valid date")
    .min(`${new Date().getFullYear() - 120}-01-01`, "Please pick a valid date"),
    gender: yup.string().required("Please choose your gender"),
    personaldata: yup.bool().isTrue().required("We need your consent to process your personal data")
});
// Create a form context with the validation schema
const { errors, useFieldModel } = useForm({
  validationSchema: simpleSchema,
});

const email = useFieldModel('email');
const firstname = useFieldModel('firstname');
const lastname = useFieldModel('lastname');
const birthdate = useFieldModel('birthdate');
const gender = useFieldModel('gender');
const personaldata = useFieldModel('personaldata');
const selectedCounty = useFieldModel('selectedCounty');
const additionalInformation = ref("");
const communications = ref(false);

const firstNameDirty = ref(false)
const lastNameDirty = ref(false)
const emailDirty = ref(false)
const countryDirty = ref(false)
const genderDirty = ref(false)
const birthDateDirty = ref(false)
const personaldataDirty = ref(false)

const fieldDirtyAttributes = [firstNameDirty, lastNameDirty, emailDirty, countryDirty, genderDirty, birthDateDirty, personaldataDirty ]

const onSubmit = () => {
  console.log(errors)
  const form = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    country: selectedCounty.value,
    birthdate: birthdate.value,
    gender: gender.value,
    additionlInformation: additionalInformation.value,
    communications: communications.value,

  }
  console.log(form)

  fieldDirtyAttributes.map(x=>x.value = true)
}

onMounted(() => {
})
</script>

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
    width: auto;
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
    justify-content: center;
  }

  .consent-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .consent-checkbox {
    display: flex;
    gap: 10px;
  }
  .error{
    background-color: #dc3545;
    left: 0%;
    margin-top: 5px;
    border-radius: 3px;
    padding: 5px;
  }

  .arrow-up {
    position: absolute;
    margin-top: 0px;
    margin-left: 5px;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    
    border-bottom: 5px solid #dc3545;
  }

  .error-wrapper {
    margin-top: -10px;
  }

  .input-placeholder {
    position: relative;
  }
  .input-placeholder input {
    width: 100%;
  }
  .input-placeholder input:valid + .placeholder {
    display: none;
  }

  .placeholder {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    left: 0px;
    margin: auto;
    color: transparent;
    width: 100%;
  }

  .placeholder span:nth-child(1) {
    color: black;
  }

  .placeholder span:nth-child(2) {
    color: red;
  }

  .gender-icon{
    font-size: 20pt;
    color: lightgray;
  }
  ._choosen-gender {
    border-bottom: 2px solid #00b7a5;
    color: black;
  }
  input {
    padding: 5px;
  }
  .countrySelect {
    display: flex;
    justify-content: space-between;
  }
  </style>