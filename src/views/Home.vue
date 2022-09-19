<template>
    <div class="content">
        <h1>Hello!</h1>
        <p>Here's the quick guide on what to expect and how to use this testcase SPA.</p>
        <p class="line-divider"></p>
        <h3 style="margin-top: 50px;">I.The 'Fill A Form' component</h3>
        <p>This component is quite simple and contents a simple form with client-side validation.</p>
        <p>The form is looking kind of like this:</p>
        <img src="https://i.postimg.cc/TPzsq6KX/form.png" alt="form that user must fill on 'Fill A Form' component"/>
        <p>Form has some validation rules on its fields. For example, firstname and lastname fields must have string-typed content with only english alphabet letters in it. Date of birth aka DOB field must not contain value for tommorow or value of, lets say, 200 years from current date.</p>
        <p>Example of fields with invalid data in it:</p>
        <img src="https://i.postimg.cc/Jn8qz4yt/form.png" alt="sample of warning messages on fields that are not filled correctly by the user"/>
        <p>In case that form filled correctly, when user click on 'Submit' button, the form will be sent to backend.</p>
        <p>If backend gives us a success response code, we will see this component:</p>
        <img src="https://i.postimg.cc/ZYHm8whD/success.png" alt="page that represents a successful form sent to backend"/>
        <p>In other case we will see this one:</p>
        <img src="https://i.postimg.cc/285D2nkj/error.png" alt="page that represents a failure on senting a form to backend"/>
        <span class="line-divider"></span>
        <h3 style="margin-top: 50px;">II.The 'Table' component</h3>
        <p>Table itself is looking like this:</p>
        <img style="max-width: 500px;" src="https://i.postimg.cc/26pWxznm/table.png" alt="Sample image displaying forms filled by the user"/>
        <p>Every time table component renders, it is 'asking' backend on full list of filled forms. So first time we see all the filled forms data in this table.</p>
        <p>There is 2 ways to perform search (which is executed on backend): inclusive and exclusive search.</p>
        <p>Inclusive search by criteria 'Russia;United States' will return us a table with data in which every row will contain at least 1 cell that either contains 'Russia' value, either contains 'United States' value:</p>
        <img style="max-width: 500px;" src="https://i.postimg.cc/PxPtNZC5/form.png" alt="resulting table on inclusive search with 'Russia; United States' query" />
        <p>So inclusive search query is like asking backend 'give me a rows that contains 'Russia' in some of it values and rows that contains 'United States' in it's values combined in one table.</p>
        <p>The opposite way to search in stored on backend data is exclusive search. Exclusive search on 'Russia;United States' will return us nothing, if table remains the same as on images before, because we have no rows with 'Russia' and 'United States' in it at the same time.</p>
        <p>For example, if we want to see which of the registered users wants to receive email communications and is living in Russia, we will perform exclusive search with query 'Russia; $communications-true'.</p>
        <img style="max-width: 500px;" src="https://i.postimg.cc/rskY7222/form.png" alt="resulting table on inclusive search with 'Russia; $communications-true' query" />
        <p>As we can see from example above, if we are looking for some boolean data, like from checkbox-typed inputs, we must use the following query syntax:</p>
        <p>$<strong>{column name}</strong>-<strong>{boolean value(true or false)}</strong></p>
        <p>Another important thing to mention: search engine will not correctly search for 'Russia' in, lets say email 'ivanov@russia.com' property of stored data object. It will only search for some property that is starts with query-word. In this case for 'Russia' or 'russia' word. So 'ivanov@russia.com' will be guaranteed to be returned in resulting table with query 'ivan' or 'ivanov', or 'ivanov@russia.com' only.</p>
        <h1 class="ending-h1">That's it. Thank you for your attention.</h1>
    </div>
</template>

<style>
 .content {
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: auto;
    min-height: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0px 0px 60px 40px rgb(34 60 80 / 20%);
    border-radius: 25px;
 }
 .line-divider {
    width: 90%;
    height: 2px;
    background-color: grey;
 }
 img {
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
 }
 .ending-h1 {
   text-align: center;
   margin-top: 100px;
 }
</style>