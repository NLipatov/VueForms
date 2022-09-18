<script setup>
    import config from '../config.json';
    import {ref} from 'vue';
    const columns = ref(null);
    const rawOwners = ref(null);
    const owners = ref([]);

    const fetchColumns = fetch(`${config.BackendService}/VueForms/DefineTableColumns`)
    .then((response) => response.json())
    .then((data) => {
        if(data.length > 0) {
            columns.value = data;
        }
    });

    const fetchOwners = fetch(`${config.BackendService}/VueForms/LoadAllOwners`)
    .then((response) => response.json())
    .then((data) => {
        if(data.length > 0) {
        rawOwners.value = data;
        parseServerOwnersResponse(data)
        }
    });

    const parseServerOwnersResponse = (response) => {
        for(let i = 0; i < response.length; i++) {
            const owner = JSON.parse(response[i].jsonString);
            owners.value.push(owner);
        }
    }


</script>

<template>
    <div class="view-container">
        <div class="up-divider">
        </div>
        <div class="table-container">
            <div class="interactive-container">
                <div class="searchbar">
                    <div class="input-option-block">
                        <span>Use inclusive search</span>
                        <input type="checkbox"/>
                    </div>
                    <div class="searchinput-container">
                        <input placeholder="divide search criterias with ';'" />
                        <button>Search</button>
                    </div>
                </div>
                <div class="table-content">
                    <table class="table">
                        <caption hidden>Table with all data from filled forms</caption>
                        <thead>
                            <tr class="center-caption">
                                <th scope="col">#</th>
                                <th v-for="item in columns" scope="col">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(owner, ownerIndex) in owners">
                                <td>{{ownerIndex.valueOf()+1}}</td>
                                <td v-for="column in columns">
                                    {{(owners[ownerIndex][column].length > 0) ? owners[ownerIndex][column] : 'NULL'}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .view-container {
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .table-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .up-divider {
        position: absolute;
        height: 50vh;
        width: 100vw;
        background-color: #41B883;
        z-index: -1;
    }
    .interactive-container {
        width: 70vw;
    }
    .searchbar {
        height: 30px;
        background-color: white;
        margin-bottom: 10px;
        display: flex;
        width: 100%;
        box-shadow: 0px 0px 60px 40px rgb(34 60 80 / 20%);
        border-radius: 10px;
    }
    .table-content {
        width: 100%;
        height: 60vh;
        box-shadow: 0px 0px 60px 40px rgb(34 60 80 / 20%);
        background-color: white;
        overflow: auto;
        border-radius: 25px;
    }
    thead {
        background-color: darkgray;
    }
    td {
        border: 1px solid lightgray;
    }
    th {
        border: 1px solid lightgray;
    }
    .center-caption tr th{
        display: flex;
        justify-content: center;
    }
    table {
        text-align: center;
    }
    .input-option-block {
        display: flex;
        gap: 10px;
        height: 100%;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        width: 30%;
        justify-content: center;
    }
    .searchinput-container{
        display: flex;
        align-items: center;
        width: 70%;
        justify-content: center;
        gap: 10px;
    }
    .searchinput-container input{
        height: 25px;
        width: 70%;
    }
    .searchinput-container button {
        height: 25px;
        display: flex;
        align-items: center;
        border: 1px solid black;
    }
    .searchinput-container button:hover {
        background-color: lightgray;
    }
    .searchinput-container button:active {
        color: rgb(83, 97, 102);
    }
</style>