<script setup>
</script>

<template>
  <div class="up-divider"></div>
  <div class="content">
    <div class="survey-form">
      <div class="survey-edge">

      </div>
      <div class="survey-body">
        <div class="survey-row-block">
            <div class="sideblock-survey">
            <input placeholder="First name"/>
            <input placeholder="Last name"/>
            <input placeholder="Email"/>
          </div>
          <div class="sideblock-survey">
            <select name="cars" id="cars" placeholder="Your Country">
              <option value="volvo">United States</option>
              <option value="saab">Germany</option>
              <option value="mercedes">Russia</option>
              <option value="audi">China</option>
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
      <div class="survey-edge">
        <button type="button" class="btn btn-success">Success</button>
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
  height: 500px;
  width: 60vw;
  background-color: white;
  box-shadow: 0px 0px 60px 40px rgba(34, 60, 80, 0.2);
}

.survey-edge{
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 10%;
  background-color: lightgray;
}
.survey-edge .btn {
  --bs-btn-padding-y: .25rem;
  --bs-btn-padding-x: .5rem;
  --bs-btn-font-size: .75rem;
}

.survey-body {
  display: flex;
  flex-direction: column;
  height: 90%;
  padding: 10px;
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
}

.additional-sub-survey textarea {
  resize: none;
}

.consent-sub-survey {
  display: flex;
  gap: 10px;
}
</style>
