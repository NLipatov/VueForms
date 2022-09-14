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
              <input @change="setFirstNameDirty" name="firstname" v-model="firstname" placeholder="First name"/>
              <div class="error-wrapper" v-if="errors.firstname && firstNameDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.firstname }}</span>
                </div>
              </div>
              <input @change="setLastNameDirty" name="lastname" v-model="lastname" placeholder="Last name"/>
              <div class="error-wrapper" v-if="errors.lastname && lastNameDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.lastname }}</span>
                </div>
              </div>
              <input @change="setEmailDirty" name="email" v-model="email" placeholder="Email" />
              <div class="error-wrapper" v-if="errors.email && emailDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.email }}</span>
                </div>
              </div>
            </div>
          <div class="sideblock-survey">
            <select
              ref="countrySelect"
              @change="updateInput"
            >
              <option disabled selected value>Select your country</option>
              <option
                  v-for="(optie) in countries"
                  :value="optie"
                >{{ optie }}
              </option>
            </select>
            
            <div class="error-wrapper" v-if="errors.selectedCounty && countryDirty">
                <div class="arrow-up"></div>
                <div class="error">
                    <span>{{ errors.selectedCounty }}</span>
                </div>
              </div>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; justify-content: space-between; height: 30px; margin-bottom: 10px;">
                <label for="dateOfBirth">Date of Birth: </label>
                <input @change="setbirthDateDirty" name="birthdate" v-model="birthdate" id="dateOfBirth" type="date" />
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
              <div @change="setGenderDirty" style="display: flex; width: 75%; border: 2px solid black; align-items: center;">
                <div style="width: 50%; justify-content: center; display: flex; gap: 5px; align-self: center;">
                  <label for="male">Male</label>
                  <input v-model="gender" type="radio" id="male" name="gender" value="male">
                </div>
                <div class="gender-divider"></div>
                <div style="width: 50%; justify-content: center; display: flex; gap: 5px; align-self: center;">
                  <label for="female">Female</label>
                    <input v-model="gender" type="radio" id="female" name="gender" value="female">
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
            <div class="consent-wrapper">
              <div class="consent-checkbox">
                <label for="personalData">Would you allow to process your personal information by our company?</label>
                <input @change="setPersonaldataDirty" v-model="personaldata" name="personaldata" id="personalData" type="checkbox">
              </div>
              <div class="error-wrapper" v-if="errors.personaldata && personaldataDirty">
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
        <button @click.prevent="log" type="submit" class="btn btn-success">Submit</button>
      </div>
    </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { onMounted, ref } from 'vue';

const updateInput = (e) => {
  selectedCounty.value = e.target.value;
  console.log(e.target.value);
  setCountryDirty();
};

const countries = ["United States", "Russia", "Germany", "China", "North Korea"];

// Define a validation schema
const simpleSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  firstname: yup.string().matches(/^[A-Za-z]+$/, 'Only english alphabet letters allowed').required().trim(),
  lastname: yup.string().matches(/^[A-Za-z]+$/, 'Only english alphabet letters allowed').required().trim(),
  selectedCounty: yup.string().oneOf(["United States", "Russia", "Germany", "China"], "Sorry, We have temporarily suspended orders from this country").required(),
  birthdate: yup.date()
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
    gender: yup.string().oneOf(["male", "female"], "Please choose a gender").required(),
    personaldata: yup.bool().isTrue().required("We need your consent to work with your personal data")
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

const firstNameDirty = ref(false)
const lastNameDirty = ref(false)
const emailDirty = ref(false)
const countryDirty = ref(false)
const genderDirty = ref(false)
const birthDateDirty = ref(false)
const personaldataDirty = ref(false)

const setFirstNameDirty = () => {
  firstNameDirty.value = true;
}

const setLastNameDirty = () => {
  lastNameDirty.value = true;
}

const setEmailDirty = () => {
  emailDirty.value = true;
}

const setCountryDirty = () => {
  countryDirty.value = true;
}

const setGenderDirty = () => {
  genderDirty.value = true;
}

const setbirthDateDirty = () => {
  birthDateDirty.value = true;
}

const setPersonaldataDirty = () => {
  personaldataDirty.value = true;
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
    margin-bottom: 15px;
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
  </style>